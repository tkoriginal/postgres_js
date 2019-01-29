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
})

function getFamousName(name, callback) {
  client.query(`SELECT * FROM famous_people fp
    WHERE fp.first_name = $1::text`, [name], callback)
}

function outputPrinter (err, result) {
  if (err) return console.error('Error in query');
  console.log(`Searching...`)
  console.log(`Found ${result.rows.length} person(s) by name`)
  result.rows.forEach( row => {
    console.log( `${row.id}: ${row.first_name} ${row.last_name} ${row.birthdate}`);
    client.end();
})
}

getFamousName('Paul', outputPrinter);

