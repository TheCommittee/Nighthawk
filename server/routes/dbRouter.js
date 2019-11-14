const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();
const path = require('path');

router.post('/signup', dbController.bcryptify, dbController.createUser, dbController.verifyUser, (req, res) => {
    res.status(200).json({ userData: res.locals.userData });
})

router.post('/login', dbController.verifyUser, (req, res) => {
    res.status(200).json({ userData: res.locals.userData });
})

router.post('/getWaitTimes', dbController.getWaitTimes, (req, res) => {
    console.log('successfully retrieved wait times')
    res.status(200).json(res.locals.results);
})

router.post('/addWaitTime', dbController.addVenue, dbController.addWaitTime, (req, res) => {
    console.log('successfully added venue and stored wait time')
    res.sendStatus(200);
})

module.exports = router;
