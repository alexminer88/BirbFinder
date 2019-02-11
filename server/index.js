const express = require('express');
const bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
const morgan = require('morgan')
const app = express();
const axios = require('axios');
const { birdAPIKey, googleAPIKey } = require('../birdAPI.js');

// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/birdsByCounty/:county', (req, res) => {
  console.log('hello');
  console.log(req.params.county);
  axios.get(`https://ebird.org/ws2.0/data/obs/US-CA-001/recent/notable`, {
    headers: { 'X-eBirdApiToken': birdAPIKey },
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});


app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(4000, function() {
  console.log('listening on port 4000!');
});

