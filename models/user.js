const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressLine1: { 
    type: String, required: true 
    },
  addressLine2: {
     type: String 
    },
  city: { 
    type: String, required: true 
},
  state: {
     type: String, required: true 
    },
  pincode: {
     type: String, required: true
    },
  country: { 
     type: String, required: true 
    },
});

const userSchema = new mongoose.Schema({
  name: {
     type: String, required: true 
    },
  phoneNumber: { 
    type: String, required: true 
    },
    alternatePhone: { 
    type: String, required: false 
    },
  roomNumber: { 
    type: String, required: true 
    },
  address: { 
    type: addressSchema, required: true 
    },
  foodPreference: { 
    type: String, enum: ['veg', 'non-veg'], required: true 
    },
  foodStatus: { 
    type: String, enum: ['opt-in', 'opt-out'], required: true 
    },
  userType:{
    type: String, enum: ['user', 'staff','admin'], required: true
    }
});

module.exports = mongoose.model('User', userSchema);

