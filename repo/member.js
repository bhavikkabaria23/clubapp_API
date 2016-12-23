var MembersSchema = require('../models/Member');
var resources = require('../resource.json');
var mongoose = require('mongoose');
var result = {};
var MemberMethods = function () {
    var _get = function (serviceName, callback) {
        result = {};
        if (serviceName) {
            var Members = require('./CustomMemberSchema')(serviceName);
            if (Members) {
                Members.find({ isActive: true }, function (err, members) {
                    if (err) {
                        result.error = err;
                        callback(result);
                    }
                    else {
                        result.members = members;
                        callback(result);
                    }
                });
            }
            else {
                result.error = 'Member is not defined';
                callback(result);
            }
        }
        else {
            result.error = 'Service is not defined';
            callback(result);
        }
    }

    var _getById = function (serviceName, memberID, callback) {
        result = {};
        if (serviceName) {
            var serviceName = serviceName;
            var Members = require('./CustomMemberSchema')(serviceName);
            //var Members = mongoose.model(serviceName, MembersSchema, serviceName);
            if (Members) {
                Members.findById(memberID, function (err, member) {
                    if (err) {
                        result.error = err;
                        callback(result);
                    }
                    else {
                        result.member = member;
                        callback(result);
                    }
                });
            }
            else {
                result.error = 'Member is not defined';
                callback(result);
            }
        }
        else {
            result.error = 'Service is not defined';
            callback(result);
        }
    }

    var _post = function (serviceName, membersBody, callback) {
        result = {};
        if (serviceName) {
            var Members = require('./CustomMemberSchema')(serviceName);
            if (Members) {
                var memberObject = new Members(membersBody);
                memberObject.save(function (err) {
                    if (err) {
                        result.error = err;
                        result.status = false;
                    } else {
                        result.status = true;
                    }
                    callback(result);
                });
            }
            else {
                result.error = 'Member is not defined';
                result.status = false;
                callback(result);
            }
        }
        else {
            result.error = 'Service is not defined';
            result.status = false;
            callback(result);
        }
    }

    var _put = function (serviceName, membersBody, callback) {
        result = {};
        if (serviceName) {
            var Members = require('./CustomMemberSchema')(serviceName);
            if (Members) {
                Members.findByIdAndUpdate(membersBody._id, {
                    $set:
                    {
                        givenName: membersBody.givenName,
                        additionalName: membersBody.additionalName,
                        familyName: membersBody.familyName,
                        email: membersBody.email,
                        telephone: membersBody.telephone,
                        createdBy: membersBody.createdBy,
                        modifiedBy: membersBody.modifiedBy,
                        address: membersBody.address,
                        //password: membersBody.password,
                        //salt: membersBody.salt,
                        image: membersBody.image,
                        //isActive: membersBody.isActive
                    }
                }, { new: true }, function (err, member) {
                    if (err) {
                        result.error = err;
                        result.status = false;
                    } else {
                        result.status = true;
                    }
                    callback(result);
                });
            }
            else {
                result.error = 'Member is not defined';
                result.status = false;
                callback(result);
            }
        }
        else {
            result.error = 'Service is not defined';
            result.status = false;
            callback(result);
        }
    }

    var _remove = function (serviceName, memberID, callback) {
        result = {};
        if (serviceName) {
            var Members = require('./CustomMemberSchema')(serviceName);
            if (Members) {
                Members.findById(memberID, function (err, member) {
                    if (member) {
                        member.isActive = false;
                        member.save(function (err) {
                            if (err) {
                                result.error = err;
                                result.status = false;
                            } else {
                                result.status = true;
                            }
                            callback(result);
                        });
                    }
                    else {
                        result.error = 'Member is not defined';
                        result.status = false;
                        callback(result);
                    }
                });
            }
            else {
                result.error = 'Member is not defined';
                result.status = false;
                callback(result);
            }
        }
        else {
            result.error = 'Service is not defined';
            result.status = false;
            callback(result);
        }
    }


    return {
        get: _get,
        post: _post,
        put: _put,
        getById: _getById,
        remove: _remove
    }
} ();
module.exports = MemberMethods;