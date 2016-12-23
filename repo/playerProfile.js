var mongoose = require('mongoose');
var PlayerProfile = mongoose.model('PlayerProfile');
var BasicDetails = mongoose.model('BasicDetails');
var ContactPerson1 = mongoose.model('ContactPerson1');
var ContactPerson2 = mongoose.model('ContactPerson2');
var StudyWorkDetails = mongoose.model('StudyWorkDetails');
var PlayingHistory = mongoose.model('PlayingHistory');
var FootballAcademyDetails = mongoose.model('FootballAcademyDetails');

var result = {};
var PlayersMethods = function () {
    var _get = function (callback) {
        result = {};
        PlayerProfile.find({
            isActive: true
        }, function (err, players) {
            if (err) {
                result.error = err;
            }
            result.players = players;
            callback(result);
        });
    }

    var _post = function (player, callback) {
        var playerProfile = new PlayerProfile();
        result = {};

        playerProfile.images = player.images;
        //playerProfile.dateOfApplication = player.dateOfApplication;
        playerProfile.playerID = player.playerID;
        playerProfile.playerName = player.playerName;
        playerProfile.givenName = player.givenName;
        playerProfile.familyName = player.familyName;
        playerProfile.fFANumber = player.fFANumber;
        playerProfile.birthDate = player.birthDate;
        playerProfile.ageGroup = player.ageGroup;
        playerProfile.preferredPlayingPosition = player.preferredPlayingPosition;
        playerProfile.gender = player.gender;
        playerProfile.objectivesAmbitions = player.objectivesAmbitions;
        playerProfile.residentialAddress = player.residentialAddress;
        playerProfile.homeNumber = player.homeNumber;
        playerProfile.mobileNumber = player.mobileNumber;
        playerProfile.email = player.email;
        playerProfile.contactPerson.push({
            personName: player.contact1_personName,
            relationship: player.contact1_relationship,
            contactNumber: player.contact1_contactNumber,
            email: player.contact1_email
        });        
        playerProfile.contactPerson.push({
            personName: player.contact2_personName,
            relationship: player.contact2_relationship,
            contactNumber: player.contact2_contactNumber,
            email: player.contact2_email
        });
        //playerProfile.coaches = player.assessedCoaches;
        playerProfile.schoolDetails = player.schoolDetails;
        playerProfile.employementDetails = player.employementDetails;
        playerProfile.clubHistory.push({
            year: 2015,
            details: player.previousClub2015,
        });
        playerProfile.clubHistory.push({
            year: 2016,
            details: player.previousClub2016,
        });
        // playerProfile.imageManager = imageArray;
        playerProfile.suspensionsDetails = player.suspensionsDetails;
        playerProfile.injuriesDetails = player.injuriesDetails;
        playerProfile.headCoachName = player.headCoachName;
        playerProfile.contactDetails = player.contactDetails;
        playerProfile.academicSessionPerWeekCount = player.academicSessionPerWeekCount;
        playerProfile.arrangedBy = player.arrangedBy;
        playerProfile.destination = player.destination;
        playerProfile.purposeOfTrip = player.purposeOfTrip;
        //playerProfile.createdDate = player.createdDate;
        //playerProfile.modifiedDate = player.modifiedDate;

        playerProfile.save(function (err, playerdetail) {
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
                ContactPerson1.remove({
                    _id: (player.contactPerson1_id) ? player.contactPerson1_id : null
                }, function (err, register) {
                    if (err) console.log(err);
                    ContactPerson2.remove({
                        _id: (player.contactPerson2_id) ? player.contactPerson2_id : null
                    }, function (err, register) {
                        if (err) console.log(err);
                        StudyWorkDetails.remove({
                            _id: (player.studyWorkDetails_id) ? player.studyWorkDetails_id : null
                        }, function (err, register) {
                            if (err) console.log(err);
                            PlayingHistory.remove({
                                _id: (player.playingHistory_id) ? player.playingHistory_id : null
                            }, function (err, register) {
                                if (err) console.log(err);
                                FootballAcademyDetails.remove({
                                    _id: (player.footballAcademyDetails_id) ? player.footballAcademyDetails_id : null
                                }, function (err, register) {
                                    if (err) console.log(err);
                                    BasicDetails.remove({
                                        _id: (player._id) ? player._id : null
                                    }, function (err, register) {
                                        if (err) {
                                            result.error = err;
                                            result.status = false;
                                            callback(result);
                                        }
                                        else {
                                            result.status = true;                                            
                                            callback(result);
                                        }
                                    });
                                });
                            });
                        }); ``
                    });
                });
            }
        });
    }

    var _put = function (player, callback) {
        result = {};
        var contactPerson1 = {
            personName: player.contact1_personName,
            relationship: player.contact1_relationship,
            contactNumber: player.contact1_contactNumber,
            email: player.contact1_email
        };
        var contactPerson2 = {
            personName: player.contact2_personName,
            relationship: player.contact2_relationship,
            contactNumber: player.contact2_contactNumber,
            email: player.contact2_email
        };

        var contactPerson = [];
        contactPerson.push(contactPerson1);
        contactPerson.push(contactPerson2);
        var clubHistory1 = {
            year: 2015,
            details: player.previousClub2015,
        };
        var clubHistory2 = {
            year: 2016,
            details: player.previousClub2016,
        };

        var clubHistory = [];
        clubHistory.push(clubHistory1);
        clubHistory.push(clubHistory2);
        PlayerProfile.findByIdAndUpdate(player._id, {
            $set: {
                //dateOfApplication: player.dateOfApplication,
                playerID: player.playerID,
                playerName: player.playerName,
                givenName: player.givenName,
                familyName: player.familyName,
                fFANumber: player.fFANumber,
                birthDate: player.birthDate,
                ageGroup: player.ageGroup,
                preferredPlayingPosition: player.preferredPlayingPosition,
                gender: player.gender,
                objectivesAmbitions: player.objectivesAmbitions,
                residentialAddress: player.residentialAddress,
                homeNumber: player.homeNumber,
                mobileNumber: player.mobileNumber,
                email: player.email,
                contactPerson: contactPerson,
                schoolDetails: player.schoolDetails,
                employementDetails: player.employementDetails,
                clubHistory: clubHistory,
                suspensionsDetails: player.suspensionsDetails,
                injuriesDetails: player.injuriesDetails,
                headCoachName: player.headCoachName,
                contactDetails: player.contactDetails,
                images: player.images,
                academicSessionPerWeekCount: player.academicSessionPerWeekCount,
                arrangedBy: player.arrangedBy,
                destination: player.destination,
                purposeOfTrip: player.purposeOfTrip,
                modifiedDate: Date.now()
            }
        }, {
                new: true
            }, function (err, player) {
                if (err) {
                    if (err.hasOwnProperty('name') && err.hasOwnProperty('code')) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            // Duplicate email                       
                            result.message = 'duplicateEmail';
                        }
                    }
                    result.error = err;
                    result.status = false;
                }
                else {
                    result.status = true;
                }
                callback(result);
            });
    }

    var _emailExist = function (player, callback) {
        result = {};
        PlayerProfile.count({
            "email": player.email
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

    var _addToSession = function (player, callback) {
        result = {};
        PlayerProfile.findByIdAndUpdate(player._id, {
            $set: {
                sessionKey: player.sessionKey
            }
        }, {
                new: true
            }, function (err, player) {
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

    var _getById = function (playerId, callback) {
        result = {};
        PlayerProfile.findById(playerId, function (err, player) {
            if (err) {
                result.error = err;
            }
            result.player = player;
            callback(result);
        });
    }

    // This is not in use, just for testing purpose
    var _removeAll = function (callback) {
        result = {};
        PlayerProfile.remove(function (err, player) {
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

    // This is not in use, just for testing purpose
    var _removePhysicalById = function (playerId, callback) {
        result = {};
        PlayerProfile.remove({
            _id: playerId
        }, function (err, player) {
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

    // This is not in use, just for testing purpose
    var _removeLogicalById = function (playerId, callback) {
        result = {};
        PlayerProfile.findById(playerId, function (err, player) {
            player.isActive = false;
            player.save(function (err) {
                if (err) {
                    console.log("error occured while saving :" + err);
                    result.error = err;
                    result.status = false;
                }
                else {
                    result.status = true;
                }
                callback(result);
            });
        });
    }
    return {
        get: _get,
        post: _post,
        emailExist: _emailExist,
        put: _put,
        getById: _getById,
        addToSession: _addToSession,
        removeAll: _removeAll,
        removePhysicalById: _removePhysicalById,
        removeLogicalById: _removeLogicalById,
    }
} ();
module.exports = PlayersMethods;