var resources = require('../resource.json');
var mongoose = require('mongoose');
var Owner = mongoose.model('Owner');
var passport = require('passport');
var result = {};
var OwnerMethods = function () {
    var _get = function (callback) {
        result = {};
        Owner.find(function (err, owners) {
            if (err) {
                result.error = err;
            }
            result.owners = owners;
            callback(result);
        });
    }

    var _getById = function (ownerID, callback) {
        result = {};
        Owner.find({ _id: ownerID }, function (err, owners) {
            if (err) {
                result.error = err;
            }
            result.owners = owners;
            callback(result);
        });
    }

    var _post = function (ownerBody, callback) {
        result = {};
        if (!ownerBody.email || !ownerBody.password) {
            result.status = false;
            result.statusCode = 400;
            result.message = resources.message.blank_fields;
            callback(result);
        } else {
            var owner = new Owner();
            owner.email = ownerBody.email;
            owner.setPassword(ownerBody.password)
            owner.save(function (err) {
                if (err) {
                    result.status = false;
                    result.error = err;
                } else {
                    result.token = owner.generateJWT();
                    result.ownerID = owner._id;
                    result.status = true;

                }
                callback(result);
            });
        }

    }

    var _signin = function (req, res, next, callback) {
        result = {};
        if (!req.body.email || !req.body.password) {
            result.status = false;
            result.message = resources.message.blank_fields;
            result.statusCode = 400;
            callback(result);
        } else {
            passport.authenticate('local', function (err, owner, info) {                
                if (err) {
                    result.error = err;
                    result.status = false;
                } else {
                    if (owner) {
                        if (info && info.message == resources.message.incorrect_password) {
                            result.status = false;                            
                            result.message = resources.message.incorrect_password;
                        }
                        else {
                            result.token = owner.generateJWT();
                            result.ownerID = owner._id;
                            result.status = true;
                        }
                    } else {
                        result.status = false;
                    }
                }
                callback(result);
            })(req, res, next);
        }

    }

    return {
        get: _get,
        post: _post,
        getById: _getById,
        signin: _signin
    }
} ();
module.exports = OwnerMethods;