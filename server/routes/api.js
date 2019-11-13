const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/', apiController.geolocation, apiController.yelp, (req, res) => {
	console.log(res.locals.businesses);
  res.status(200).json(res.locals.businesses);
});

module.exports = router;
