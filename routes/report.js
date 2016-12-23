var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BasicDetails = mongoose.model('BasicDetails');
var ContactPerson1 = mongoose.model('ContactPerson1');
var ContactPerson2 = mongoose.model('ContactPerson2');
var StudyWorkDetails = mongoose.model('StudyWorkDetails');
var PlayingHistory = mongoose.model('PlayingHistory');
var FootballAcademyDetails = mongoose.model('FootballAcademyDetails');
var AgeGroup = mongoose.model('AgeGroup');
var AgeGroupShortName = require('../models/AgeGroupShortName.json');
var PlayerProfile = mongoose.model('PlayerProfile');

router.get('/', function(req, res, next) {
    BasicDetails.find(function(err, details) {
        if (err) {
            return next(err);
        }
        res.json(details);
    });
});

module.exports = router;