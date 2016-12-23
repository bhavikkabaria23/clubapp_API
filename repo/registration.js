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
var result = {};

var PlayersMethods = function () {
    var _get = function (callback) {
        result = {};
        BasicDetails.find(function (err, registrations) {
            if (err) {
                result.error = err;
            }
            result.registrations = registrations;
            callback(result);
        });
    }

    var _post = function (registration, callback) {
        result = {};
        var contactPerson1 = new ContactPerson1();
        var basicDetailsObject = new BasicDetails();
        basicDetailsObject.playerName = registration.playerName;
        basicDetailsObject.fFANumber = registration.fFANumber;
        basicDetailsObject.birthDate = registration.birthDate;
        // ageGroupEnum["enum"][registration.preferredPlayingPosition]
        basicDetailsObject.images = registration.images;
        basicDetailsObject.preferredPlayingPosition = registration.preferredPlayingPosition;
        basicDetailsObject.gender = registration.gender;
        basicDetailsObject.ageGroup = registration.ageGroup;
        basicDetailsObject.residentialAddress = registration.residentialAddress;
        basicDetailsObject.homeNumber = registration.homeNumber;
        basicDetailsObject.mobileNumber = registration.mobileNumber;
        basicDetailsObject.email = registration.email;
        basicDetailsObject.objectivesAmbitions = registration.objectivesAmbitions;        
        basicDetailsObject.contactPerson1 = new ContactPerson1({
            personName: registration.contact1_personName,
            relationship: registration.contact1_relationship,
            contactNumber: registration.contact1_contactNumber,
            email: registration.contact1_email
        });
        //basicDetailsObject.contactPerson1.save();
        basicDetailsObject.contactPerson2 = new ContactPerson2({
            personName: registration.contact2_personName,
            relationship: registration.contact2_relationship,
            contactNumber: registration.contact2_contactNumber,
            email: registration.contact2_email
        });
        //basicDetailsObject.contactPerson2.save();
        basicDetailsObject.studyWorkDetails = new StudyWorkDetails({
            schoolDetails: registration.schoolDetails,
            employementDetails: registration.employementDetails
        });
        //basicDetailsObject.studyWorkDetails.save();
        basicDetailsObject.playingHistory = new PlayingHistory({
            previousClub2016: registration.previousClub2016,
            previousClub2015: registration.previousClub2015,
            suspensionsDetails: registration.suspensionsDetails,
            injuriesDetails: registration.injuriesDetails
        });
        //basicDetailsObject.playingHistory.save();
        basicDetailsObject.footballAcademyDetails = new FootballAcademyDetails({
            headCoachName: registration.headCoachName,
            contactDetails: registration.contactDetails,
            academicSessionPerWeekCount: registration.academicSessionPerWeekCount,
            arrangedBy: registration.arrangedBy,
            destination: registration.destination,
            purposeOfTrip: registration.purposeOfTrip,
        });
        //basicDetailsObject.footballAcademyDetails.save();
        basicDetailsObject.save(function (err, basicDetails) {
            if (err) {
                if (err.hasOwnProperty('name') && err.hasOwnProperty('code')) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate email                       
                        result.message = 'duplicateEmail';
                    }
                }
                result.error = err;
                result.status = false;
                callback(result);
            }
            else {
                basicDetailsObject.contactPerson1.save();
                basicDetailsObject.contactPerson2.save();
                basicDetailsObject.studyWorkDetails.save();
                basicDetailsObject.playingHistory.save();
                basicDetailsObject.footballAcademyDetails.save();
                var sendMail = require('./SendMail')(basicDetails);
                if (sendMail) {
                    result.status = true;
                    result.playerID = basicDetails.id;
                    callback(result);
                }
                else {
                    result.status = false;
                    callback(result);
                }
            }
        });
    }

    var _put = function (registration, callback) {
        result = {};
        if (registration.contactPerson1_id) {
            ContactPerson1.findByIdAndUpdate(registration.contactPerson1_id, {
                $set: {
                    personName: registration.contact1_personName,
                    relationship: registration.contact1_relationship,
                    contactNumber: registration.contact1_contactNumber,
                    email: registration.contact1_email
                }
            }, {
                    new: true
                }, function (err, details) {
                    if (err) console.log(err);
                });
        }
        if (registration.contactPerson2_id) {
            ContactPerson2.findByIdAndUpdate(registration.contactPerson2_id, {
                $set: {
                    personName: registration.contact2_personName,
                    relationship: registration.contact2_relationship,
                    contactNumber: registration.contact2_contactNumber,
                    email: registration.contact2_email
                }
            }, {
                    new: true
                }, function (err, details) {
                    if (err) console.log(err);
                });
        }
        if (registration.studyWorkDetails_id) {
            StudyWorkDetails.findByIdAndUpdate(registration.studyWorkDetails_id, {
                $set: {
                    schoolDetails: registration.schoolDetails,
                    employementDetails: registration.employementDetails
                }
            }, {
                    new: true
                }, function (err, details) {
                    if (err) console.log(err);
                });
        }
        if (registration.playingHistory_id) {
            PlayingHistory.findByIdAndUpdate(registration.playingHistory_id, {
                $set: {
                    previousClub2016: registration.previousClub2016,
                    previousClub2015: registration.previousClub2015,
                    suspensionsDetails: registration.suspensionsDetails,
                    injuriesDetails: registration.injuriesDetails
                }
            }, {
                    new: true
                }, function (err, details) {
                    if (err) console.log(err);
                });
        }
        if (registration.footballAcademyDetails_id) {
            FootballAcademyDetails.findByIdAndUpdate(registration.footballAcademyDetails_id, {
                $set: {
                    headCoachName: registration.headCoachName,
                    contactDetails: registration.contactDetails,
                    academicSessionPerWeekCount: registration.academicSessionPerWeekCount,
                    arrangedBy: registration.arrangedBy,
                    destination: registration.destination,
                    purposeOfTrip: registration.purposeOfTrip,
                }
            }, {
                    new: true
                }, function (err, details) {
                    if (err) console.log(err);
                });
        }
        if (registration._id) {
            BasicDetails.findByIdAndUpdate(registration._id, {
                $set: {
                    images: registration.images,
                    playerName: registration.playerName,
                    fFANumber: registration.fFANumber,
                    birthDate: registration.birthDate,
                    preferredPlayingPosition: registration.preferredPlayingPosition,
                    gender: registration.gender,
                    ageGroup: registration.ageGroup,
                    residentialAddress: registration.residentialAddress,
                    homeNumber: registration.homeNumber,
                    mobileNumber: registration.mobileNumber,
                    email: registration.email,
                    objectivesAmbitions: registration.objectivesAmbitions,
                    modifiedDate: Date.now()
                }
            }, {
                    new: true
                }, function (err, details) {
                    if (err) {
                        result.error = err;
                        result.status = false;
                    }
                    else {
                        result.status = true;
                    }
                    callback(result);
                });
        }
        else {
            result.status = false;
            callback(result);
        }
    }

    var _emailExist = function (registration, callback) {
        result = {};
        BasicDetails.count({
            "email": registration.email
        }, function (err, count) {
            if (err) {
                result.error = err;
                result.status = false;
            }

            if (count > 0) {
                result.status = true;
            }
            else {
                result.status = false;
            }
            callback(result);
        });
    }

    var appendZero = function (value) {
        if (value < 10) {
            return '00' + value.toString();
        }
        else if (value < 100) {
            return '0' + value.toString();
        }
        else {
            return value.toString();
        }
    }

    // This not in use.
    // var getPlayerID = function (basicDetails, callback) {
    //     PlayerProfile.count({
    //         isActive: true
    //     }, function (err, result) {
    //         if (err) {
    //             callback(err, null);
    //         }
    //         if (result == 0) {
    //             var playerID = AgeGroupShortName["enum"][basicDetails.ageGroup] + appendZero((1)).toString();
    //             callback(err, playerID);
    //         }
    //         else {
    //             PlayerProfile.aggregate([{
    //                 $match: {
    //                     isActive: true
    //                 }
    //             }, {
    //                     $group: {
    //                         _id: '$ageGroup', //$region is the column name in collection
    //                         count: {
    //                             $sum: 1
    //                         }
    //                     }
    //                 }], function (err, result) {
    //                     if (err) {
    //                         next(err);
    //                     }
    //                     else {
    //                         result.filter(function (value) {
    //                             return value._id == basicDetails.ageGroup;
    //                         });
    //                         if (result.length > 0) {
    //                             //profile.ageGroup = result[0]._id + (appendZero(result[0].count + 1)).toString();
    //                             playerID = AgeGroupShortName["enum"][result[0]._id] + appendZero((result[0].count + 1)).toString();
    //                             callback(err, playerID);
    //                         }
    //                     }
    //                 });
    //         }
    //     });
    // }

    var generatePlayerID = function (basicDetails, callback) {
        PlayerProfile.count({
            isActive: true,
            ageGroup: basicDetails.ageGroup
        }, function (err, result) {
            if (err) {
                callback(err, null);
            }
            if (result == 0) {
                var playerID = AgeGroupShortName["enum"][basicDetails.ageGroup] + appendZero((1)).toString();
                callback(err, playerID);
            }
            else {
                playerID = AgeGroupShortName["enum"][basicDetails.ageGroup] + appendZero((result + 1)).toString();
                callback(err, playerID);
            }
        });
    }

    var _getById = function (registrationId, callback) {        
        result = {};
        BasicDetails
            .findOne({
                _id: registrationId
            })
            .populate('contactPerson1')
            .populate('contactPerson2')
            .populate('footballAcademyDetails')
            .populate('studyWorkDetails')
            .populate('playingHistory')
            .exec(function (err, basicDetails) {
                if (err) {
                    result.error = err;
                    callback(result);
                }
                else {
                    generatePlayerID(basicDetails, function (err, playerID) {
                        if (err) {
                            result.error = err;
                            callback(result);
                        }
                        else {
                            basicDetails.playerID = playerID;
                            result.registration = basicDetails;
                            callback(result);
                        }
                    });
                }
            });
    }

    // This is not in use, just for testing purpose
    var _removePhysicalById = function (registrationId, callback) {
        result = {};
        BasicDetails.remove({
            _id: registrationId
        }, function (err, registration) {
            if (err) {
                result.error = err;
                result.status = false;
            }
            else {
                result.status = true;
            }
            callback(result);
        });
    }

    var _getAgeGroup = function (maxAge, callback) {
        result = {};
        if (maxAge > 19) {
            var ageGroupResult = [{
                ageGroup: "1st Grade",
                maxAge: 20
            }];
            result.ageGroup = ageGroupResult;
            callback(result);
        }
        else
            if (maxAge < 16) {
                AgeGroup.find({
                    "maxAge": {
                        $eq: maxAge
                    }
                }).sort({
                    "maxAge": 'ascending'
                }).exec(function (err, ageGroups) {
                    if (err) {
                        result.error = err;
                    }
                    result.ageGroup = ageGroups;
                    callback(result);
                });
            }
            else
                if (maxAge == 16) {
                    AgeGroup.find({
                        "maxAge": {
                            $eq: 17
                        }
                    }).sort({
                        "maxAge": 'ascending'
                    }).exec(function (err, ageGroups) {
                        if (err) {
                            result.error = err;
                        }
                        result.ageGroup = ageGroups;
                        callback(result);
                    });
                }
                else {
                    AgeGroup.find({
                        "maxAge": {
                            $gte: maxAge
                        }
                    }).sort({
                        "maxAge": 'ascending'
                    }).exec(function (err, ageGroups) {
                        if (err) {
                            result.error = err;
                        }
                        result.ageGroup = ageGroups;
                        callback(result);
                    });
                }
    }

    // This is not in use, just for testing purpose
    var _removeAgeGroup = function (callback) {
        result = {};
        AgeGroup.remove(function (err, ageGroups) {
            if (err) {
                result.error = err;
                result.status = false;
            }
            else {
                result.status = true;
            }
            callback(result);
        });
    }

    // This not in use for club app, just to add mocj data.
    var _saveAgeGroup = function (callback) {
        result = {};
        // Mock Data for AgeGroup
        var ageGroup = [];
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 9s",
                maxAge: 8
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 10s",
                maxAge: 9
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 11s",
                maxAge: 10
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 12s",
                maxAge: 11
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 13s",
                maxAge: 12
            }));

        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 14s",
                maxAge: 13
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 15s",
                maxAge: 14
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 16s",
                maxAge: 15
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 18s",
                maxAge: 16
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 18s",
                maxAge: 17
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "Under 20s",
                maxAge: 19
            }));
        ageGroup.push(
            new AgeGroup({
                ageGroup: "1st Grade",
                maxAge: 20
            }));

        ageGroup.forEach(function (item) {
            item.save(function (err) { });
        });
        result.status = true;
        callback(result);
    }
    // This is not use in club app,just use to export to excel externaly
    var _exportToCsv = function (callback) {
        result = {};
        BasicDetails
            .find()
            .populate('contactPerson1')
            .populate('contactPerson2')
            .populate('footballAcademyDetails')
            .populate('studyWorkDetails')
            .populate('playingHistory')
            .exec(function (err, registrations) {
                if (err) {
                    result.error = err;
                }
                result.registrations = registrations;
                callback(result);
                // generatePlayerID(basicDetails, function(err, playerID) {
                //     if (err) {
                //         return next(err);
                //     }
                //     else {
                //         basicDetails.playerID = playerID;
                //         res.json(basicDetails);
                //     }
                // });
            });
    }
    return {
        get: _get,
        post: _post,
        emailExist: _emailExist,
        put: _put,
        getById: _getById,
        removePhysicalById: _removePhysicalById,
        getAgeGroup: _getAgeGroup,
        removeAgeGroup: _removeAgeGroup,
        saveAgeGroup: _saveAgeGroup,
        exportToCsv: _exportToCsv
    }
} ();
module.exports = PlayersMethods;