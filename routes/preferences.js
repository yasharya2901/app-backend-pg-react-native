const express = require('express');
const router = express.Router();
const { getMenuOptions, saveUserPreference,getUserPreferencesForTomorrow, getUserCountsForTomorrow } = require('../controllers/preferences');

router.get('/options', getMenuOptions);
router.post('/save', saveUserPreference);
router.get('/counts', getUserCountsForTomorrow);
router.get('/check', getUserPreferencesForTomorrow);

module.exports = router;
