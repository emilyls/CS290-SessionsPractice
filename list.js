var express = require('express');
var http = require('http');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var apiKey ='fa7d80c48643dfadde2cced1b1be6ca1';

app.use(bodyParser.urlencoded({ extended: false} ));
app.use(session({secret:'Emily'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res, next){
  var context = {};
  if(!req.session.name) {
    res.render('newSession', context);
    return;
  }
  context.name = req.session.name;
  context.listCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(context.toDo);
  res.render('todo', context);
});

app.post('/', function(req, res) {
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item']) {
    req.session.toDo.push({"name":req.body.name, "city":req.body.city, "temperature":req.body.weather, "id":req.session.curId});
    req.session.curId++; 
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var options = {
      host: 'http://api.openweathermap.org',
      path: '/data/2.5/weather?q=' + city + '&appid=' + apiKey
    };
    callback = function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function() {
        console.log(str);
      });
    }
    http.request(options,callback).end();
    var data = JSON.parse(response.Content);
    if (data.main.temp >= ((req.body.weather + 459.67) * (5/9))) {
      city.style.color = green;
    }
 }

  if(req.body['Done']) {
    req.session.toDo = req.session.toDo.filter(function(e) {
      console.log('test');
      return e.id != req.body.id;
    })
  }
  
  context.name = req.session.name;
  context.listCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  res.render('todo', context);
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
