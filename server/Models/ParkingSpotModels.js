const { Pool } = require('pg');
<<<<<<< HEAD
const PG_URI = 'postgres://xxdkheau:O-2ll3t5QrTsGOfT-JUYn5fqDUzK4W00@kashin.db.elephantsql.com:5432/xxdkheau';
=======
const PG_URI = 'postgres://dxdrlmec:JnQgRDLCzBiqGS708chEK4v7B_epxPcS@ziggy.db.elephantsql.com:5432/dxdrlmec';
>>>>>>> 078324dbde35b2107ec5de528b2e711a199fc380

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