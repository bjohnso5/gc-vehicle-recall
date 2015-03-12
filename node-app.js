'use strict';

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var morgan = require('morgan'); // formerly express.logger
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
//var compression = require('compression');
var favicon = require('serve-favicon');

var app = express();

// Gzip support
//app.use(compression({
//  threshold: 512
//}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
// expose bower_components (vendor files) on the /bower_components route
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
// allow serving of minified files for local testing of distributable package
//app.use('/dist',  express.static(__dirname + '/dist'));
// allow serving of language resources
//app.use('/i18n', express.static(__dirname + '/i18n'));
// allow serving of API docs
//app.use('/docs', express.static(__dirname + '/docs'));

// development only
if ('development' === app.get('env')) {
  app.use(errorhandler());
}

app.get('/', routes.index);

var port = app.get('port');
http.createServer(app).listen(port, function () {
	console.log('Server listening on port ' + port);
});
