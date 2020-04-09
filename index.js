const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.set('view engine', 'ejs');
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
app.use(bodyParser.urlencoded({extended: true}));
/* inserimento parte template */
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null) {
  var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
  // If using plane old env vars via service discovery
  if (process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    mongoUser = process.env[mongoServiceName + '_USER'];

  // If using env vars from secret from service binding  
  } else if (process.env.database_name) {
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }
  }

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}
/* fine inserimento parte template */


const filter = {
  'name': new RegExp('paper')
};
/*var url = "mongodb://mongouser:mongouser@172.30.45.178:27017/sampledb";
console.log(url);*/
MongoClient.connect(mongoURL, (err, database) => { 
  if (err) return console.log(err);
  db = database.db(mongoDatabase); // whatever your database name is*/
  app.listen(8080, () => {
  console.log('listening on 8080 webhook test n3')}
)});
app.get('/', (req, res) => {
  db.collection('avengers').find().toArray(function(err, results) {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {sampledb: results});
    console.log(results);
    // send HTML file populated with quotes here
  });
});
app.post('/insert', (req, res) => {
  db.collection('sampledb').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
