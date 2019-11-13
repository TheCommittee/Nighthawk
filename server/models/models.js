const { Pool } = require('pg');

// use dontenv to hide pg_uri when ready 
const PG_URI = process.env.PG_URI;

const pool = new Pool({
    connectionString: 'postgres://kwqwovjz:5KiuhVnbx4dXGxkmeXS-nJw1kE_V4twU@salt.db.elephantsql.com:5432/kwqwovjz'
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
