const express = require('express');
const router = express.Router();

const {getAllMenu, createMenu, getCurrentWeekMenu, getTodayMenu} = require('../controllers/menu');

router.route('/').get(getAllMenu).post(createMenu);
router.route("/week").get(getCurrentWeekMenu);
router.route("/today").get(getTodayMenu);

module.exports = router;