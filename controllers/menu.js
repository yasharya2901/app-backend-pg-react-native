const menu = require('../models/menu');
const moment = require('moment');

const getAllMenu = async (req, res) => {
    try {
        const menus = await menu.find();
        res.status(200).json({menus});
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

const createMenu = async (req, res) => {
    try {
        await validateMenu(req.body);
        const menuItem = new menu(req.body);
        await menuItem.save();
        res.status(201).json({
            sucess: true,
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

const validateMenu = async (menuItem) => {
    // Parse and validate the date
    const parsedDate = moment(menuItem.date, 'DD-MM-YYYY HH:mm:ss', true);
    console.log(menuItem.date);
    if (!parsedDate.isValid()) {
        throw new Error('Invalid date.');
    }
    menuItem.date = parsedDate.toDate();

    // Parse and validate the meal times
    if (menuItem.meals) {
        menuItem.meals.forEach(meal => {
            const parsedStartTime = moment(meal.startTime, 'DD-MM-YYYY HH:mm:ss', true);
            const parsedEndTime = moment(meal.endTime, 'DD-MM-YYYY HH:mm:ss', true);

            if (!parsedStartTime.isValid() || !parsedEndTime.isValid()) {
                throw new Error('Invalid meal time.');
            }

            meal.startTime = parsedStartTime.toDate();
            meal.endTime = parsedEndTime.toDate();
        });
    }
}


module.exports = {getAllMenu, createMenu};