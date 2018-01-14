var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var UglifyJS = require("uglify-js2");
var fs = require('fs');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
//var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');
var appClientFiles = [
  'app_client/app.js',
  'app_client/home/home.controller.js',
  'app_client/about/about.controller.js',
  'app_client/dishDetail/dishDetail.controller.js',
  'app_client/commentModal/commentModal.controller.js',
  'app_client/common/services/wictData.service.js',
  'app_client/common/services/geolocation.service.js',
  'app_client/common/filters/addHtmlLineBreaks.filter.js',
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/directives/likesCount/likesCount.directive.js',
  'app_client/common/directives/wictFooter/wictFooter.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js'
];
var uglified = UglifyJS.minify(appClientFiles, { compress : false });
fs.writeFile('public/angular/wict.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: wict.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// EXPRESS ROUTES app.use('/', routes);
app.use('/api', routesApi);
//app.use('/users', users);
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
