
const user = require("../models/user");

const getAllUsers = async (req, res) => {
    try {
        let users = await user.find();
        res.status(200).json({ users });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching all users' });
    }
}

const getUserById = async (req, res) => {
    try {
        let user = await user.findById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error fetching user by ID' });
    }
}

const createUser = async (req, res) => {
    try {
        let newUser = await user.create(req.body);
        res.status(201).json({ newUser });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
}


const deleteUser = async (req, res) => {
    try {
        let deletedUser = await user.findByIdAndDelete(req.params.id);
        res.status(200).json({ deletedUser });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
}

module.exports = {createUser, getAllUsers, getUserById, deleteUser};