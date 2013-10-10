var fs = require('fs'),
	express = require('express'),
	mongoose = require('mongoose'), 
	nodepath = require('path'),
	passport = require('passport');
 
var app = express();
module.exports = app;

// conf
app.configure('development', function(){
	console.log('development mode');
	app.set('db-uri', 'mongodb://211.110.61.140/db-diamond');
  	mongoose.set('debug', true);
});

// connect to mongoose
mongoose.connect(app.set('db-uri'));

// middleware
app.use(express.favicon());
app.use(express.logger({ format: ':date :remote-addr :method :url :status :req[Accept] :res[Content-Length]' }));
app.use(express.bodyParser({keepExtensions: true, uploadDir: __dirname + '/public/uploads'}));
app.use(express.cookieParser());
app.use(express.session({ secret: 'helloworld' }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs-locals'));

// authentication
require(__dirname + '/auth')(passport);

// router
require(__dirname + '/route')();

// server start
app.listen(3000);
console.log("Diamond server %s listening on port %d", express.version, 3000);

