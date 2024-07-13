const mongoose = require('mongoose');
const moment = require('moment');

const mealItems = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Meal name is required.']
    },
    type: {
        type: String,
        required: [true, 'Meal type is required.'],
        enum: ['veg', 'non-veg', 'common']
    }
})


const meals = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Meal type is required.'],
        enum: ['Breakfast', 'Lunch', 'Dinner'],
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required.']
    },
    endTime: {
        type: Date,
        required: [true, 'End time is required.']
    },
    price: {
        type: Number,
        required: [true, 'Price is required.']
    },
    mealItems: [mealItems]
})




const menu = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Date is required.']
    },
    day: {
        type: String,
        required: [true, 'Day is required.']
    },
    meals: [meals]
    
})


module.exports = mongoose.model('menu', menu);