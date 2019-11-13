const express = require('express');
const dbController = require('../controllers/dbController.js');
const router = express.Router();
const path = require('path');

router.post('/signup', dbController.bcryptify, dbController.createUser, (req, res) => {
    console.log('successfully created new user')	// why is this a separate page?
    res.status(200).sendFile(path.resolve(__dirname, '../../src/index.html'));
});

router.post('/login', dbController.bcryptify, dbController.verifyUser, (req, res) => {
    console.log('user successfully logged in')
    res.status(200).sendFile(path.resolve(__dirname, '../../src/index.html'));
});

router.post('/getFavorites', dbController.getFavorites, (req, res) => {
    console.log('successfully retrieved favorites')
    res.status(200).json(res.locals.favorites);
});

router.post('/addFavorite', dbController.addFavorite, (req, res) => {
    console.log('successfully added favorite')
    res.sendStatus(200);
});

router.post('/removeFavorite', dbController.removeFavorite, (req, res) => {
    console.log('successfully removed favorite')
    res.sendStatus(200);
});

// router.post('/getWaitTimes', dbController.getWaitTimes, (req, res) => {
//     console.log('successfully retrieved wait times')
//     res.status(200).json(res.locals.results);
// })

// router.post('/addWaitTime', dbController.addVenue, dbController.addWaitTime, (req, res) => {
//     console.log('successfully added venue and stored wait time')
//     res.sendStatus(200);
// })

module.exports = router;
