var express = require('express');
var mongoose = require('mongoose');
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

var dropDatabase = function()
{
  mongoose.connection.db.dropDatabase(function (err, result) {
    console.log("drop database")
});
}

