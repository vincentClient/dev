const Client = require('fortnite');
const fortnite = new Client('8d7a84bf-70d8-4e93-ab6f-f000152fd525');
const apiKey = '1aaa3cb5ef057e5a585c82a0e06deda9';
const bodyParser = require('body-parser');
const request = require('request');
const nodeWhere = require('node-where');
let express = require('express');
const app = express();


app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res) {
  console.log('/index');
  res.render('index', {title: 'Home Page' })
});


//Weather Condition route
app.get('/weather', function(req, res) {
  res.render('Weather', {title: 'WeatherApp' });
  console.log('/weather')
})

app.post('/weather', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
  request(url, function (err, response, body) {
    if(err){
      console.log('error! Trouble parsing body')
    } else {
      let weather = JSON.parse(body);
      let weatherTemp = `${weather.main.temp} °`;


      nodeWhere.is(city, function(err, result) {
        if (result) {
          res.render('weather', {
            error: null,
             title: 'WeatherApp',
              output: weather.weather[0].id,
               description: weather.weather[0].main,
                 temp: `Temperature: ${weatherTemp}`,
                   humidity: `Humidity: ${weather.main.humidity}`,
                     city: `City: ${result.attributes.city}`,
                       state: `State: ${result.attributes.region}/${result.attributes.regionCode}`,
                         zip: `Zipcode: ${result.attributes.postalCode}`=== '' ? console.log('Zip(undefined/null)') : console.log('Zip(Found)')
           });
      } else if(err) {
        console.log('Error pulling the provided name');
      }
      });      
    }
  });
})
user = 'user'
app.get('/fortnite', function(req, res) {
  console.log('/fortnite')
  res.render('Fortnite', {
    user
  });
  
});

app.post('/fortnite', function(req, res) {
  let username = req.body.name;
  let select = req.body.select;

  if(username){
    user = username;
  }

  res.render('fortnite', {
    username,
    platform: select
  });
});

app.listen(3000, () => console.log('Server now running!'));
