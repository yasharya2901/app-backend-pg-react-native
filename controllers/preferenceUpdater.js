const cron = require('node-cron');
const moment = require('moment-timezone');
const User = require('../models/user');

// Schedule a job to run every day at 00:00 IST
cron.schedule('0 0 * * *', async () => {
    try {
        const today = moment().tz('Asia/Kolkata').startOf('day').toDate();
        const tomorrow = moment().tz('Asia/Kolkata').add(1, 'day').startOf('day').toDate();
        const dayAfterTomorrow = moment().tz('Asia/Kolkata').add(2, 'days').startOf('day').toDate();

        // Update user preferences for each user
        const users = await User.find({});

        for (const user of users) {
            let { preferences } = user;

            // Update the 'today' preference to be the 'tomorrow'
            preferences.today = preferences.tomorrow;

            // Update 'tomorrow' preference to the default foodPreference
            preferences.tomorrow = {
                mealPreferences: {
                    breakfast: user.foodPreference,
                    lunch: user.foodPreference,
                    dinner: user.foodPreference
                }
            };

            // Save updated user preferences
            user.preferences = preferences;
            await user.save();
        }

        console.log('User preferences updated successfully');
    } catch (error) {
        console.error('Error updating user preferences:', error);
    }
});
