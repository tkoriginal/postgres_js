const {Client} = require('pg');

const settings = require("./settings");

const client = new Client ({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.host,
  port: settings.port,
  ssl: settings.ssl
});


client.connect((err) => {
  if (err) return console.log('Connection Error', err);
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) return console.error('error running query', err);
    console.log(result.rows);
    client.end();
  })
})