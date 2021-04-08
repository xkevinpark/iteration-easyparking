const { Pool } = require('pg');
const PG_URI = 'postgres://dxdrlmec:JnQgRDLCzBiqGS708chEK4v7B_epxPcS@ziggy.db.elephantsql.com:5432/dxdrlmec';

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });

  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };