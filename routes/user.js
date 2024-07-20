const express = require('express');
const router = express.Router();

const {getAllUsers, createUser, getUserById, deleteUser} = require('../controllers/user');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).delete(deleteUser);

module.exports = router;