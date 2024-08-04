const Menu = require('../models/menu'); // Ensure correct model import
const User = require('../models/user');
const moment = require('moment-timezone');



// Fetch menu options for tomorrow
const getMenuOptions = async (req, res) => {
    try {
        const today = moment().tz('Asia/Kolkata').startOf('day').toDate();
        const tomorrow = moment(today).add(1, 'day').toDate();

        const menuForTomorrow = await Menu.findOne({
            date: {
                $gte: tomorrow,
                $lt: moment(tomorrow).add(1, 'day').toDate()
            }
        });

        if (!menuForTomorrow) {
            return res.status(404).json({ success: false, message: 'No menu found for tomorrow.' });
        }

        const mealOptions = menuForTomorrow.meals.map(meal => ({
            mealType: meal.name, // 'Breakfast', 'Lunch', 'Dinner'
            options: meal.mealItems.filter(item => item.type === 'veg' || item.type === 'non-veg').map(item => ({
                name: item.name,
                type: item.type
            }))
        }));

        res.status(200).json({ success: true, mealOptions });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching menu options' });
    }
};

const saveUserPreference = async (req, res) => {
    try {
        const { userId, preference } = req.body; // Expecting { breakfast, lunch, dinner }
        const tomorrow = moment().tz('Asia/Kolkata').add(1, 'day').startOf('day').toDate();

        const now = moment().tz('Asia/Kolkata');
        if (now.hour() >= 23) {
            return res.status(400).json({ success: false, message: 'Preferences can only be set until 4 PM.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let menuTomorrow = await Menu.findOne({ date: tomorrow });
        if (!menuTomorrow) {
            menuTomorrow = new Menu({
                date: tomorrow,
                day: moment(tomorrow).format('dddd'),
                userCounts: {
                    breakfast: { veg: 0, nonVeg: 0, skip: 0 },
                    lunch: { veg: 0, nonVeg: 0, skip: 0 },
                    dinner: { veg: 0, nonVeg: 0, skip: 0 }
                }
            });
        }

        // Check if preference for tomorrow exists
        const existingPreference = user.preferences.tomorrow;

        if (existingPreference) {
            // Decrement old preference counts
            const oldPreferences = existingPreference.mealPreferences;
            ['breakfast', 'lunch', 'dinner'].forEach(meal => {
                getCounts(oldPreferences[meal], menuTomorrow.userCounts[meal], -1);
            });

            // Update the preference
            user.preferences.tomorrow.mealPreferences = preference;
        } else {
            user.preferences.tomorrow = {
                mealPreferences: preference
            };
        }

        // Increment new preference counts
        ['breakfast', 'lunch', 'dinner'].forEach(meal => {
            getCounts(preference[meal], menuTomorrow.userCounts[meal], 1);
        });

        await user.save();
        await menuTomorrow.save();

        res.status(200).json({ success: true, message: 'Preference saved successfully' });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error saving preference' });
    }
};

// Utility function to update counts in menu
const getCounts = (preference, counts, increment = 1) => {
    if (preference === 'veg') {
        counts.veg += increment;
    } else if (preference === 'non-veg') {
        counts.nonVeg += increment;
    } else if (preference === 'skip') {
        counts.skip += increment;
    }
};


// Get total count of users and their preferences for tomorrow
const getUserCountsForTomorrow = async (req, res) => {
    try {
        const tomorrow = moment().tz('Asia/Kolkata').add(1, 'day').startOf('day').toDate();

        const menuTomorrow = await Menu.findOne({ date: tomorrow });
        if (!menuTomorrow) {
            return res.status(404).json({ success: false, message: 'No menu found for tomorrow' });
        }

        const usersWithPreferences = await User.find({
            'preferences.date': tomorrow
        });

        const totalUsers = usersWithPreferences.length;
        const counts = {
            breakfast: { veg: 0, nonVeg: 0, skip: 0 },
            lunch: { veg: 0, nonVeg: 0, skip: 0 },
            dinner: { veg: 0, nonVeg: 0, skip: 0 }
        };

        usersWithPreferences.forEach(user => {
            const preference = user.preferences.find(p => p.date.getTime() === tomorrow.getTime());
            if (preference) {
                // Breakfast counts
                getCounts(preference.mealPreference.breakfast, counts.breakfast);
                // Lunch counts
                getCounts(preference.mealPreference.lunch, counts.lunch);
                // Dinner counts
                getCounts(preference.mealPreference.dinner, counts.dinner);
            }
        });

        res.status(200).json({
            success: true,
            totalUsers,
            breakfastCounts: counts.breakfast,
            lunchCounts: counts.lunch,
            dinnerCounts: counts.dinner
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching user counts' });
    }
};

// Get user preferences for tomorrow
const getUserPreferencesForTomorrow = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log('Fetching user with ID:', userId); // Log the userId

        const user = await User.findById(userId);
        if (!user) {

            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const preference = user.preferences.tomorrow.mealPreferences;

        if (preference) {
            res.status(200).json({ success: true, preference });
        } else {
            res.status(404).json({ success: false, message: 'No preference set for tomorrow' });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching user preferences' });
    }
};


module.exports = { getMenuOptions, saveUserPreference, getUserCountsForTomorrow, getUserPreferencesForTomorrow };
