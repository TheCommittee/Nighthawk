const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/', apiController.geolocation, apiController.yelp, (req, res) => {
  res.status(200).json(res.locals.businesses);
});

module.exports = router;
