const express = require('express');
const router = express.Router();

const {getAllMenu, createMenu, getCurrentWeekMenu} = require('../controllers/menu');

router.route('/').get(getAllMenu).post(createMenu);
router.route("/week").get(getCurrentWeekMenu);

module.exports = router;