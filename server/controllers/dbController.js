const db = require('../models/models.js');

const dbController = {};

dbController.createUser = (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    console.log('hit createUser controller')
    const queryStr = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    `;

    // db currently does not save two accounts with the same username, but does not notify second user that username is already taken
    db.query(queryStr, [username, password], (err, data) => {
        if (err) {
            return next({
                log: `dbController.createUser: ERROR: ${err}`,
                message: { err: 'Error occurred in dbController.createUser.' }
            });
        }
    })

    return next();
}

dbController.verifyUser = (req, res, next) => {
    
}

dbController.addVenue = async (req, res, next) => {
    const { venueId, venueName } = req.body;
    try {
        const queryStr = `
        INSERT INTO Venues (VenueID, venue)
        VALUES ($1, $2)
        ON CONFLICT (VenueID)
        DO NOTHING
        `;
        // const params = [ req.body.venueId, req.body.venueName ];
        const result = await db.query(queryStr, [ venueId, venueName ]);
        return next();
    }
    catch (err) {
        next({
            log: `dbController.addVenue: ERROR: ${err}`,
            message: { err: 'Error occurred in dbController.addVenue.' }
        });
    }
}

// issue with duplicate unique primary key for venue; does adding a findVenue method or joining tables help fix this?

dbController.addWaitTime = (req, res, next) => {
    const { waitTime, venueId } = req.body;

    // later, add a third column for createdby username
    const queryStr = `
        INSERT INTO WaitTimes (WaitTime, VenueID)
        VALUES ($1, $2)
        RETURNING *
        `;

    db.query(queryStr, [ waitTime, venueId ], (err, data) => {
        if (err) {
            return next({
                log: `dbController.addWaitTime: ERROR: ${err}`,
                message: { err: 'Error occurred in dbController.addWaitTime.' }
            });
        }
        res.locals.results = data;
        // console.log(res.locals.results);
        return next();
    })

    // need to add async before (req, resp, next) if doing below method
    // try {
    //     const queryStr = `
    //     INSERT INTO WaitTimes (WaitTime, VenueID)
    //     VALUES ($1, $2)
    //     RETURNING *
    //     `;
    //     const params = [ waitTime, venueId ];
    //     const result = await db.query(queryStr, params);
    //     res.locals.results = result.rows[0];
    //     console.log(res.locals.results);
    //     return next();
    // }
    // catch (err) {
    //     next({
    //         log: `dbController.addWaitTime: ERROR: ${err}`,
    //         message: { err: 'Error occurred in dbController.addWaitTime.' }
    //     });
    // }
}

dbController.getWaitTimes = async (req, res, next) => {
  const { venueId } = req.body;
  try {
      const queryStr = `
      SELECT WaitTime, TimeStamp
      FROM waittimes
      WHERE VenueId='${venueId}'
      ORDER BY WaitTimeId DESC
      LIMIT 5
      `;
      const result = await db.query(queryStr);
      res.locals.results = result.rows;
      return next();
  }
  catch (err) {
      next({
          log: `dbController.getWaitTimes: ERROR: ${err}`,
          message: { err: 'Error occurred in dbController.getWaitTimes.' }
      });
  }
}

module.exports = dbController;


