const menu = require('../models/menu');
const moment = require('moment');

const getTodayMenu = async (req, res) => {
    try {
        let today = moment().startOf('day').toDate();
        let menuToday = await menu.find({
            date: today
        });
        menuToday = await parseWeek(menuToday);
        res.status(200).json({menuToday});
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

const getAllMenu = async (req, res) => {
    try {
        let menus = await menu.find();
        menus = await parseWeek(menus)
        res.status(200).json({menus});
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}


const getCurrentWeekMenu = async (req,res) => {
    try{
        let startOfWeek = moment().startOf('isoWeek').toDate();
        let endOfWeek = moment().endOf('isoWeek').toDate();
        let weeklyMenu = await menu.find({
        date: {
            $gte: startOfWeek,
            $lte: endOfWeek
        }
        });
        weeklyMenu = await parseWeek(weeklyMenu);
        res.status(200).json({weeklyMenu})
    }
    catch(err){
        console.log(`Error: ${error.message}`);
    }
  };

  const parseWeek = async (menus) => {
    return menus.map(menuItem => {
            return {
                id: menuItem._id,
                date: moment(menuItem.date).format('DD-MM-YYYY HH:mm:ss'),
                day: menuItem.day,
                meals: menuItem.meals.map(meal => {
                    return {
                        name: meal.name,
                        startTime: moment(meal.startTime).format('DD-MM-YYYY HH:mm:ss'),
                        endTime: moment(meal.endTime).format('DD-MM-YYYY HH:mm:ss'),
                        price: meal.price,
                        mealItems: meal.mealItems
                    }
                })
            }
   });
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


module.exports = {getAllMenu, createMenu, getCurrentWeekMenu, getTodayMenu};