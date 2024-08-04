const mongoose = require('mongoose');

const mealItems = new mongoose.Schema({
    name: { type: String, required: [true, 'Meal name is required.'] },
    type: { type: String, required: [true, 'Meal type is required.'], enum: ['veg', 'non-veg', 'common'] }
});

const meals = new mongoose.Schema({
    name: { type: String, required: [true, 'Meal type is required.'], enum: ['Breakfast', 'Lunch', 'Dinner'] },
    startTime: { type: Date, required: [true, 'Start time is required.'] },
    endTime: { type: Date, required: [true, 'End time is required.'] },
    price: { type: Number, required: [true, 'Price is required.'] },
    mealItems: [mealItems]
});

const menu = new mongoose.Schema({
    date: { type: Date, required: [true, 'Date is required.'] },
    day: { type: String, required: [true, 'Day is required.'] },
    meals: [meals],
    userCounts: {
        breakfast: {
            veg: { type: Number, default: 0 },
            nonVeg: { type: Number, default: 0 },
            skip: { type: Number, default: 0 }
        },
        lunch: {
            veg: { type: Number, default: 0 },
            nonVeg: { type: Number, default: 0 },
            skip: { type: Number, default: 0 }
        },
        dinner: {
            veg: { type: Number, default: 0 },
            nonVeg: { type: Number, default: 0 },
            skip: { type: Number, default: 0 }
        }
    }
});

module.exports = mongoose.model('Menu', menu);
