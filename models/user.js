const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Define the User schema
const user = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  alternatePhone: { type: String },
  roomNumber: { type: String, required: true },
  address: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true }
  },
  foodPreference: { type: String, enum: ['veg', 'non-veg'], required: true },
  foodStatus: { type: String, enum: ['opt-in', 'opt-out'], required: true },
  userType: { type: String, enum: ['user', 'staff', 'admin'], required: true },
  password: { type: String, required: true },
  preferences: {
    today: {
        breakfast: { type: String, enum: ['veg', 'non-veg', 'skip'], default: '' },
        lunch: { type: String, enum: ['veg', 'non-veg', 'skip'], default: '' },
        dinner: { type: String, enum: ['veg', 'non-veg', 'skip'], default: '' }
    },
    tomorrow: {
        breakfast: { type: String, enum: ['veg', 'non-veg', 'skip'], default: '' },
        lunch: { type: String, enum: ['veg', 'non-veg', 'skip'], default: '' },
        dinner: { type: String, enum: ['veg', 'non-veg', 'skip'], default: '' }
    }
  }
});

// Pre-save middleware to set default preferences based on foodPreference
user.pre('save', async function(next) {
  if (this.isNew || this.isModified('foodPreference')) {
    const today = moment().tz('Asia/Kolkata').startOf('day').toDate();
    const tomorrow = moment().tz('Asia/Kolkata').add(1, 'day').startOf('day').toDate();

    this.preferences = {
      today: {
        mealPreferences: {
          breakfast: this.foodPreference,
          lunch: this.foodPreference,
          dinner: this.foodPreference
        }
      },
      tomorrow: {
        mealPreferences: {
          breakfast: this.foodPreference,
          lunch: this.foodPreference,
          dinner: this.foodPreference
        }
      }
    };
  }
  next();
});

module.exports = mongoose.model('User', user);
