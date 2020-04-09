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
var url = "mongodb://mongouser:mongouser@172.30.45.178:27017/sampledb";
console.log(url);
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err);
  db = database.db("sampledb"); // whatever your database name is
  app.listen(8080, () => {
  console.log('listening on 8080 webhook test n2')}
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
