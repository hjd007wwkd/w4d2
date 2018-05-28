const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];

knex.insert({first_name: firstName, last_name: lastName, birthdate: date}).into('famous_people')
.asCallback((err) => {
  if(err){
    return console.log(err);
  }
  console.log('inserted!')
});