// The following code has been copied from the instructor
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5000);

// End of instructor's code

app.get('/', function(req, res) {
  // URL data
  var paramsURL = [];
  for (var i in req.query) {
    paramsURL.push({'name': i, 'value': req.query[i]})
  }
  var context = {};
  context.dataURL = paramsURL;
  context.type = 'GET';
  if (paramsURL.length != 0) {
    context.URL = true;
  }
  res.render('home', context);
});

app.post('/', function(req, res) {
  // URL data
  var paramsURL = [];
  for (var j in req.query) {
    paramsURL.push({'name': j, 'value': req.query[j]})
  }
  // Data from form body
  var paramsBody = [];
  for (var i in req.body) {
    paramsBody.push({'name': i, 'value': req.body[i]})
  }
  var context = {};
  context.dataURL = paramsURL;
  context.dataBody = paramsBody;
  context.type = 'POST';
  // Allows home page to show additional body data for POST requests
  if (paramsURL.length != 0) {
    context.URL = true;
  }
  if (paramsBody != 0) {
    context.Body = true; 
  }
  res.render('home', context);
});

// More instructor code
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




