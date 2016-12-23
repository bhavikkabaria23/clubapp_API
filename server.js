var express = require('express');
var cors = require('cors')
var path = require('path');
var fs = require('fs'),
  fileData;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// For swagger below packages are required
// "swagger-node-express": "~2.0",
//     "minimist": "*",
// var argv = require('minimist')(process.argv.slice(2));
// var swagger = require("swagger-node-express");
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');

/**
 * Reading resource.json file and send to the callback
 */
var resources = require('./resource.json');

/**
 * Connect to MongoDB.
 */
var config = require('./config');
// *** mongoose *** ///
mongoose.connect(config.setMongoURI());

mongoose.connection.on('error', () => {
  console.error(resources.message.mongodb_connection_error);
  process.exit(1);
});

require(resources.path.services_model);
require(resources.path.ageGroup_model);
require(resources.path.skills_model);
require(resources.path.assessment_model);
require(resources.path.users_model);
require(resources.path.owners_model);
require(resources.path.members_model);
require(resources.path.registration_model);
require(resources.path.contactPerson_model);
require(resources.path.playingHistory_model);
require(resources.path.studyWorkDetail_model);
require(resources.path.footballAcademyDetails_model);
require(resources.path.playerprofile_model);
require(resources.path.coachProfile_model);
require(resources.path.session_model);
require(resources.path.passport_config);

var serviceroute = require(resources.path.service);
var member = require(resources.path.member);
var owner = require(resources.path.owner);
var users = require(resources.path.users);
var registration = require(resources.path.registration);
var playerprofile = require(resources.path.playerprofile);
var coach = require(resources.path.coach);
var session = require(resources.path.session);
var skills = require(resources.path.skills);
var assessment = require(resources.path.assessment);

var app = express();

app.use(cors());

// var subpath = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

var port = process.env.PORT || resources.system.defaultPort; // set our port

app.use(passport.initialize());
app.use(resources.route.home, serviceroute);
app.use(resources.route.members, member);
app.use(resources.route.owners, owner);
app.use(resources.route.playerprofile, playerprofile);
app.use(resources.route.registration, registration);
app.use(resources.route.coach, coach);
app.use(resources.route.users, users);
app.use(resources.route.skills, skills);
app.use(resources.route.assessments, assessment);
app.use(resources.route.sessions, session);
app.use(passport.initialize());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error(resources.message.app_not_fount);
  err.status = 404;

  next(err);
});


// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// swagger.configure("http://localhost:8080/", '1.0.0');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE");
//   next();
// });

app.listen(port);
console.log(resources.message.app_start + port);

module.exports = app;
