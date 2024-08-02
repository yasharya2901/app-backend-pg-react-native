const menu = require('../models/menu');
const moment = require('moment-timezone');

// Function to get today's menu, adjusted for IST
const getTodayMenu = async (req, res) => {
    try {
        // Get today's date in IST and convert it to UTC
        let today = moment().tz('Asia/Kolkata').startOf('day').utc().toDate();
        let menuToday = await menu.find({
            date: today
        });
        menuToday = await parseWeek(menuToday);
        res.status(200).json({ menuToday });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching today\'s menu' });
    }
}

// Function to get all menus
const getAllMenu = async (req, res) => {
    try {
        let menus = await menu.find().sort({date: 1 });
        menus = await parseWeek(menus);
        res.status(200).json({ menus });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching all menus' });
    }
}

// Function to get the current week's menu, adjusted for IST
const getCurrentWeekMenu = async (req, res) => {
    try {
        // Get the start and end of the current week in IST and convert them to UTC
        let startOfWeek = moment().tz('Asia/Kolkata').startOf('isoWeek').utc().toDate();
        let endOfWeek = moment().tz('Asia/Kolkata').endOf('isoWeek').utc().toDate();
        let weeklyMenu = await menu.find({
            date: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        }).sort({date: 1 });
        weeklyMenu = await parseWeek(weeklyMenu);
        res.status(200).json({ weeklyMenu });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching current week\'s menu' });
    }
};

// Function to parse menus and convert dates and times to IST for display
const parseWeek = async (menus) => {
    return menus.map(menuItem => {
        return {
            id: menuItem._id,
            date: moment(menuItem.date).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss'),
            day: menuItem.day,
            meals: menuItem.meals.map(meal => {
                return {
                    name: meal.name,
                    startTime: moment(meal.startTime).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss'),
                    endTime: moment(meal.endTime).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss'),
                    price: meal.price,
                    mealItems: meal.mealItems
                }
            })
        }
    });
}

// Function to create a new menu
const createMenu = async (req, res) => {
    try {
        // Validate and adjust the menu date and times
        await validateMenu(req.body);
        const menuItem = new menu(req.body);
        await menuItem.save();
        res.status(201).json({
            success: true,
            message: 'Menu created successfully.'
        });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).json({
            success: false,
            message: 'Menu creation failed.'
        });
    }
}

// Function to validate and adjust menu dates and times to UTC for saving
const validateMenu = async (menuItem) => {
    // Parse and validate the date in IST
    const parsedDate = moment.tz(menuItem.date, 'DD-MM-YYYY HH:mm:ss', 'Asia/Kolkata');
    if (!parsedDate.isValid()) {
        throw new Error('Invalid date.');
    }
    menuItem.date = parsedDate.utc().toDate(); // Convert to UTC for saving

    // Parse and validate the meal times in IST
    if (menuItem.meals) {
        menuItem.meals.forEach(meal => {
            const parsedStartTime = moment.tz(meal.startTime, 'DD-MM-YYYY HH:mm:ss', 'Asia/Kolkata');
            const parsedEndTime = moment.tz(meal.endTime, 'DD-MM-YYYY HH:mm:ss', 'Asia/Kolkata');

            if (!parsedStartTime.isValid() || !parsedEndTime.isValid()) {
                throw new Error('Invalid meal time.');
            }

            meal.startTime = parsedStartTime.utc().toDate(); // Convert to UTC for saving
            meal.endTime = parsedEndTime.utc().toDate(); // Convert to UTC for saving
        });
    }
}

module.exports = { getAllMenu, createMenu, getCurrentWeekMenu, getTodayMenu };
