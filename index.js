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
const filter = {
  'name': new RegExp('paper')
};
var url = "mongodb://ennio:ennio@172.30.45.178:27017/sampledb";
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err);
  db = database.db("sampledb"); // whatever your database name is
  app.listen(3000, () => {
  console.log('listening on 3000')}
)});
app.get('/', (req, res) => {
  db.collection('sampledb').find().toArray(function(err, results) {
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
/*
app.listen(3000, function() {
  console.log('listening on 3000')
})
*/
/*
var risposta = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sampledb");
  return new Promise (function(resolve, reject) { dbo.collection("sampledb").find(filter).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    resolve();
  })});
});
Promise.all(risposta)
.then(function() { console.log('fatto)'); })
.catch(console.error);
/*
MongoClient.connect(
  'mongodb://ennio:ennio@localhost:34000/sampledb',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('sampledb').collection('sampledb');
    coll.find({}, (cmdErr, result) => {
      assert.equal(null, cmdErr);
      console.log(result);
    });
    client.close();
  });
  */
/*
var client = require('mongodb').MongoClient;
client.connect("mongodb://ennio:ennio@localhost:34000/sampledb", function(error, sampledb) {
   if(! error) {
      console.log('success');

   }
});
*/
/*
var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(JSON.stringify (risultato));
});
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');*/