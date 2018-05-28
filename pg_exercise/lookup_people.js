const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const args = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...")
  client.query(`SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name='${args}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name '${args}':`)
    result.rows.forEach(function(item, index) {
      const fullName = item.first_name + ' ' + item.last_name;
      const birthdate = item.birthdate.getFullYear() + '-' + item.birthdate.getMonth() + '-' + item.birthdate.getDate();
      console.log(`- ${index+1}: ${fullName}, born '${birthdate}'`)
    })
    client.end();
  });
});