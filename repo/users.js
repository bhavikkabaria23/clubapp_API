var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var CoachProfile = mongoose.model('CoachProfile');
var PlayerProfile = mongoose.model('PlayerProfile');
var resources = require('../resource.json');
var mongoose = require('mongoose');
var result = {};
var UserMethods = function () {
    var _get = function (callback) {
        result = {};
        Users.find({
            isActive: true
        }, function (err, users) {
            if (err) {
                result.error = err;
            }
            result.users = users;
            callback(result);
        });
    }

    var _getById = function (userID, callback) {
        result = {};
        Users.findById(userID, function (err, users) {
            if (err) {
                result.error = err;
            }
            result.users = users;
            callback(result);
        });
    }

    var _getByFFANumber = function (ffaNumber, callback) {
        result = {};
        Users.findOne({
            fFANumber: ffaNumber
        },
            function (err, users) {
                if (result.error) {
                    result.error = err;
                }
                result.users = users;
                callback(result);
            });
    }

    var _createRootUser = function (callback) {
        result = {};
        var users = new Users();
        users.fFANumber = "1234567890";
        users.role = 1;
        users.setPassword("test@123");
        users.address = "test";
        users.mobileNumber = "1234567890";
        users.save(function (err, users) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    result.message = 'duplicateFFANumber';
                }
                result.status = false;
                result.error = err;
            } else {
                result.status = true;
            }
            callback(result);
        });
    }

    var _put = function (user, callback) {
        result = {};
        var manager = new Users();
        Users.findByIdAndUpdate(user._id, {
            $set:
            {
                fFANumber: user.fFANumber,
                role: user.role,
                address: user.address,
                mobileNumber: user.mobileNumber,
                password: manager.setPassword(user.password)
            }
        }, { new: true }, function (err, users) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    result.message = 'duplicateFFA';
                }
                result.status = false;
                result.error = err;
            } else {
                result.status = true;
            }
            callback(result);
        });
    }

    var _signUp = function (userBody, callback) {
        result = {};
        var users = new Users();
        users.fFANumber = userBody.fFANumber;
        users.role = userBody.role;
        users.setPassword(userBody.password);
        users.address = userBody.address;
        users.mobileNumber = userBody.mobileNumber;
        users.save(function (err, userDetail) {
            if (err) {
                if (err.hasOwnProperty('name') && err.hasOwnProperty('code')) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate sessionKey                       
                        result.message = 'duplicateFFANumber';
                    }
                }
                result.error = err;
                result.status = false;
                callback(result);
            }
            else if (users.role == 3) {
                var coach = new CoachProfile();
                coach.fFANumber = userDetail.fFANumber;
                coach.residentialAddress = userDetail.address;
                coach.mobileNumber = userDetail.mobileNumber;
                coach.save(function (err, coachDetails) {
                    if (err) {
                        result.status = false;
                        result.error = err;
                    } else {
                        result.token = users.generateJWT();
                        result.userID = userDetail._id;
                        result.status = true;
                    }
                    callback(result);
                });
            }
            else {
                result.token = users.generateJWT();
                result.userID = userDetail._id;
                result.status = true;
                callback(result);
            }
        });
    }

    var getCoach = function (users, callback) {
        if (users.role == 3) {
            CoachProfile.findOne({ fFANumber: users.fFANumber }, function (err, coachDetail) {
                if (err) {
                    callback(err, null);
                }
                callback(err, coachDetail);
            });
        }
        else {
            callback("error", null);
        }
    }

    // var getPlayer = function (users, callback) {
    //     if (users.role == 5) {
    //         PlayerProfile.findOne({ fFANumber: users.fFANumber }, function (err, playerDetail) {
    //             if (err) {
    //                 callback(err, null);
    //             }
    //             callback(err, playerDetail);
    //         });
    //     }
    //     else {
    //         callback("error", null);
    //     }
    // }

    var _signin = function (req, res, next, callback) {
        result = {};
        if (!req.body.fFANumber || !req.body.password) {
            result.message = resources.message.blank_fields;
            result.status = false;
            result.statusCode = 400;
            callback(result);
        } else {
            passport.authenticate('local-user', function (err, users, info) {
                if (err) {
                    result.error = err;
                    result.status = false;
                    callback(result);
                } else {
                    var coach = {};
                    var player = {};
                    if (users) {
                        if (info && info.message == resources.message.incorrect_password) {
                            result.status = false;
                            result.message = resources.message.incorrect_password;
                            callback(result);
                        }
                        else {
                            switch (users.role) {
                                case 1:
                                    //root
                                    result.status = true;
                                    result.token = users.generateJWT();
                                    result.role = users.role;
                                    result.fFANumber = users.fFANumber;
                                    result._id = users._id;
                                    result.details = users.details;
                                    result.coach = null;
                                    result.player = null;
                                    callback(result);
                                    break;
                                case 2:
                                    //admin
                                    result.status = true;
                                    result.token = users.generateJWT();
                                    result.role = users.role;
                                    result.fFANumber = users.fFANumber;
                                    result._id = users._id;
                                    result.details = users.details;
                                    result.coach = null;
                                    result.player = null;
                                    callback(result);
                                    break;
                                case 3:
                                    //coach            
                                    getCoach(users, function (err, coachDetail) {
                                        if (err) {
                                            result.error = err;
                                            result.status = false;
                                            callback(result);
                                        }
                                        else {
                                            result.status = true;
                                            result.token = users.generateJWT();
                                            result.role = users.role;
                                            result.fFANumber = users.fFANumber;
                                            result._id = users._id;
                                            result.details = users.details;
                                            result.coach = coachDetail;
                                            result.player = null;
                                            callback(result);
                                        }
                                    });
                                    break;
                                case 4:
                                    //tech director
                                    result.status = true;
                                    result.token = users.generateJWT();
                                    result.role = users.role;
                                    result.fFANumber = users.fFANumber;
                                    result._id = users._id;
                                    result.details = users.details;
                                    result.coach = null;
                                    result.player = null;
                                    callback(result);
                                    break;
                                case 5:
                                    //player
                                    // getPlayer(users, function (err, playerDetail) {
                                    //     if (err) {
                                    //         result.error = err;
                                    //         result.status = false;
                                    //         callback(result);
                                    //     }
                                    //     else {                                        
                                    //         result.status = true;
                                    //         result.token = users.generateJWT();
                                    //         result.role = users.role;
                                    //         result.fFANumber = users.fFANumber;
                                    //         result._id = users._id;
                                    //         result.details = users.details;
                                    //         result.coach = null;
                                    //         result.player = playerDetail;
                                    //         callback(result);
                                    //     }
                                    // });
                                    result.status = true;
                                    result.token = users.generateJWT();
                                    result.role = users.role;
                                    result.fFANumber = users.fFANumber;
                                    result._id = users._id;
                                    result.details = users.details;
                                    result.coach = null;
                                    result.player = null;
                                    callback(result);
                                    break;
                            }
                        }
                    }
                    else {
                        result.status = false;
                        result.message = "User Undefined";
                        callback(result);
                    }
                }
            })(req, res, next);
        }

    }

    return {
        get: _get,
        signUp: _signUp,
        put: _put,
        getById: _getById,
        createRootUser: _createRootUser,
        getByFFANumber: _getByFFANumber,
        signin: _signin
    }
} ();
module.exports = UserMethods;