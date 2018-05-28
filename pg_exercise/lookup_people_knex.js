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

const args = process.argv[2];
console.log("Searching ...")
knex.select('first_name', 'last_name', 'birthdate').from('famous_people').where('first_name', args).asCallback(function(err, result){
  if(err){
    return console.log(err);
  }
  console.log(`Found ${result.length} person(s) by the name '${args}':`)
  result.forEach(function(item, index) {
    const fullName = item.first_name + ' ' + item.last_name;
    const birthdate = item.birthdate.getFullYear() + '-' + item.birthdate.getMonth() + '-' + item.birthdate.getDate();
    console.log(`- ${index+1}: ${fullName}, born '${birthdate}'`)
  })
})