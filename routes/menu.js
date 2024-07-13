const express = require('express');
const router = express.Router();

const {getAllMenu, createMenu} = require('../controllers/menu');

router.route('/').get(getAllMenu).post(createMenu);

module.exports = router;