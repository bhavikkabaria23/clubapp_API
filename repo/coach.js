var mongoose = require('mongoose');
var CoachProfile = mongoose.model('CoachProfile');
var jwt = require('express-jwt');
var passport = require('passport');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});
var resources = require('../resource.json');
var result = {};
var CoachMethods = function () {
    var _tempcoach = function (coachID, callback) {
        CoachProfile.remove({
            _id: coachID
        }, function (err, coach) {
            if (err) {
                result.error = err;
            }
            result.message = "Successfully deleted";
            callback(result);
        });
    }
    var _get = function (callback) {
        result = {};
        CoachProfile.find(function (err, coaches) {
            if (err) {
                result.error = err;
            }
            result.coaches = coaches;
            callback(result);
        });
    }

    var _getById = function (coachID, callback) {
        result = {};
        CoachProfile.findById(coachID, function (err, coach) {
            if (err) {
                result.error = err;
            }
            result.coach = coach;
            callback(result);
        });
    }

    var _post = function (Coaches, callback) {
        result = {};
        var coachObject = new CoachProfile();
        // var imageArray = [];
        // if (Coaches.images) {
        //     for (var i = 0; i < Coaches.images.length; i++) {
        //         imageArray.push(Coaches.images[i]);
        //     }
        // }
        coachObject.coachName = Coaches.coachName;
        coachObject.givenName = Coaches.givenName;
        coachObject.familyName = Coaches.familyName;
        coachObject.birthDate = Coaches.birthDate;
        coachObject.fFANumber = Coaches.fFANumber;
        coachObject.coachingLicence = Coaches.coachingLicence;
        coachObject.childrenRegistration = Coaches.childrenRegistration;
        coachObject.gender = Coaches.gender;
        coachObject.images = Coaches.imageArray;
        // coachObject.imageManager = imageArray;
        coachObject.residentialAddress = Coaches.residentialAddress;
        coachObject.homeNumber = Coaches.homeNumber;
        coachObject.mobileNumber = Coaches.mobileNumber;
        coachObject.email = Coaches.email;
        coachObject.contactPerson.push({
            personName: Coaches.contact1_personName,
            relationship: Coaches.contact1_relationship,
            contactNumber: Coaches.contact1_contactNumber,
            email: Coaches.contact1_email
        });

        coachObject.clubHistory.push({
            year: 2015,
            details: Coaches.previousClub2015,
        });
        coachObject.clubHistory.push({
            year: 2016,
            details: Coaches.previousClub2016,
        });

        coachObject.suspensionsDetails = Coaches.suspensionsDetails;        
        coachObject.save(function (err, coachDetails) {
            if (err) {
                if (err.hasOwnProperty('name') && err.hasOwnProperty('code')) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate email                      
                        result.message = resources.message.duplicateEmail;
                    }
                    result.error = err;
                    result.status = false;
                    // return res.status(500).json({
                    //     succes: false,
                    //     message: 'duplicateEmail'
                    // });
                } else {
                    result.status = true;
                }
                callback(result);
            }
            else {
                result.status = true;
                result.message = resources.message.coach_registered;
                callback(result);
                // var sendMail = require('./SendMail')(coachDetails);
                // if (sendMail) {
                //     res.json({
                //         status: true,
                //         message: 'coach registered successfully.'
                //     });
                // }
                // else {
                //     res.json({
                //         status: false
                //     });
                // }
            }
        });
    }

    var _put = function (Coaches, callback) {        
        result = {};
        var contactPerson1 = {
            personName: Coaches.contact1_personName,
            relationship: Coaches.contact1_relationship,
            contactNumber: Coaches.contact1_contactNumber,
            email: Coaches.contact1_email
        };
        var contactPerson = [];
        contactPerson.push(contactPerson1);

        var clubHistory1 = {
            year: 2015,
            details: Coaches.previousClub2015,
        };
        var clubHistory2 = {
            year: 2016,
            details: Coaches.previousClub2016,
        };
        var clubHistory = [];
        clubHistory.push(clubHistory1);
        clubHistory.push(clubHistory2);
        CoachProfile.findByIdAndUpdate(Coaches._id, {
            $set: {
                coachName: Coaches.coachName,
                givenName: Coaches.givenName,
                familyName: Coaches.familyName,
                birthDate: Coaches.birthDate,
                fFANumber: Coaches.fFANumber,
                coachingLicence: Coaches.coachingLicence,
                childrenRegistration: Coaches.childrenRegistration,
                gender: Coaches.gender,
                residentialAddress: Coaches.residentialAddress,
                homeNumber: Coaches.homeNumber,
                images: Coaches.images,
                mobileNumber: Coaches.mobileNumber,
                email: Coaches.email,
                contactPerson: contactPerson,
                clubHistory: clubHistory,
                suspensionsDetails: Coaches.suspensionsDetails,
                modifiedDate: Date.now()
            }
        }, {
                new: true
            }, function (err, coach) {
                if (err) {
                    result.error = err;
                    result.status = false;
                } else {
                    result.message = resources.message.coach_updated;
                    result.status = true;
                }

                callback(result);
            });
    }

    var _exists = function (email, callback) {
        result = {};
        CoachProfile.count({
            "email": email
        }, function (err, count) {
            if (err) {
                result.error = err;
                result.status = false;
            } else {
                if (count > 0) {
                    result.status = true;
                }
                else {
                    result.status = false;
                }
            }
            callback(result);
        });
    }

    var _assignToSession = function (Coaches, callback) {
        result = {};
        CoachProfile.findByIdAndUpdate(Coaches._id, {
            $set: {
                sessions: Coaches.sessions
            }
        }, {
                new: true
            }, function (err, details) {
                if (err) {
                    result.error = err;
                    result.status = false;
                } else {
                    result.status = true;
                }

                callback(result);
            });
    }
    // This is not in use. coach can sign as a user.
    // var _signin = function (req, res, next, callback) {
    //     result = {};
    //     if (!req.body.email || !req.body.fFANumber) {
    //         result.message = resources.message.blank_fields;
    //         result.status = false;
    //         result.statusCode = 400;
    //     } else {
    //         passport.authenticate('local-coach', function (err, coach, info) {
    //             if (err) {
    //                 result.status = false;
    //                 result.error = err;
    //                 callback(result);
    //             } else {
    //                 if (coach) {
    //                     result.status = true;
    //                     result.token = coach.generateJWT();
    //                     result.coachID = coach._id
    //                 }
    //                 else {
    //                     result.status = false;
    //                 }
    //                 callback(result);
    //             }
    //         })(req, res, next);
    //     }
    // }
    // This is not in use
    var _getCoachesBySession = function (sessionKey, callback) {
        result = {};
        CoachProfile.find({
            sessions: {
                $in: [
                    {
                        "sessionKey": sessionKey
                    }
                ]
            }
        }, function (err, coaches) {
            if (err) {
                result.error = err;
            }

            result.coaches = coaches;
            callback(result);
        });
    }

    return {
        get: _get,
        post: _post,
        put: _put,
        exists: _exists,
        assignToSession: _assignToSession,
        tempcoach: _tempcoach,
        //signin: _signin,
        getById: _getById,
        getCoachesBySession: _getCoachesBySession
    }
} ();
module.exports = CoachMethods;