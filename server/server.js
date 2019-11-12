require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const dbRouter = require('./routes/dbRouter.js');
const apiRouter = require('./routes/api');

const PORT = 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// When we have assets
// app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

// Database calls
app.use('/dbRouter', dbRouter);

// Yelp API calls
app.use('/api', apiRouter);

app.use('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/index.html')))


// 404 handler
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});


// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})


module.exports = app;
