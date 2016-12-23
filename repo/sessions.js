var mongoose = require('mongoose');
var Session = mongoose.model('Session');
var PlayerProfile = mongoose.model('PlayerProfile');
var CoachProfile = mongoose.model('CoachProfile');

var result = {};
var SessionsMethods = function () {
    var _get = function (callback) {
        result = {};
        Session.find({
            isActive: true
        }, function (err, sessions) {
            if (err) {
                result.error = err;
            }
            result.sessions = sessions;
            callback(result);
        });
    }

    var _post = function (session, callback) {
        var sessionPost = new Session();
        result = {};
        sessionPost.sessionKey = session.sessionKey;
        sessionPost.save(function (err, session) {
            if (err) {
                if (err.hasOwnProperty('name') && err.hasOwnProperty('code')) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate sessionKey                       
                        result.message = 'duplicatsessionKey';
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

    var _put = function (sessions, callback) {        
        result = {};
        Session.findByIdAndUpdate(sessions._id, {
            $set: {
                sessionKey: sessions.sessionKey,
                skills: sessions.skills,
                startDateTime: sessions.startDateTime,
                modifiedDate: Date.now()
            }
        }, {
                new: true
            }, function (err, session) {
                if (err) {
                    if (err.hasOwnProperty('name') && err.hasOwnProperty('code')) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            // Duplicate sessionKey                       
                            result.message = 'duplicatsessionKey';
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

    var _getById = function (Id, callback) {        
        result = {};
        Session.findById(Id, function (err, session) {
            if (err) {
                result.error = err;
            }
            result.session = session;
            callback(result);
        });
    }

    var _removeAll = function (callback) {
        result = {};
        Session.remove(function (err, session) {
            if (err) {
                result.error = err;
                result.status = false;
            }
            result.status = true;
            callback(result);
        });
    }

    var _closesession = function (id, callback) {
        result = {};
        Session.findByIdAndUpdate(id, {
            $set: {
                ended: true,
                modifiedDate: Date.now()
            }
        }, {
                new: true
            }, function (err, session) {
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
    }

    var _getAllBySession = function (sessionKey, callback) {
        result = {};
        var sessionResult = {
            session: {},
            players: [],
            coaches: []
        }
        Session.findOne({ sessionKey: sessionKey }, function (err, session) {
            if (err) {
                result.error = err;
                callback(result);
            }
            else {
                sessionResult.session = session;
                PlayerProfile.find({
                    sessionKey: sessionKey
                }, function (err, details) {
                    if (err) {
                        result.error = err;
                        callback(result);
                    }
                    else {
                        sessionResult.players = details;
                        CoachProfile.find({
                            "sessions.sessionKey": sessionKey
                        }, function (err, details) {
                            if (err) {
                                result.error = err;
                                callback(result);
                            }
                            else {
                                sessionResult.coaches = details;
                                result.sessionResult = sessionResult
                                callback(result);
                            }
                        });
                    }
                });
            }
        });
    }
    return {
        get: _get,
        post: _post,
        put: _put,
        getById: _getById,
        removeAll: _removeAll,
        closesession: _closesession,
        getAllBySession: _getAllBySession
    }
} ();
module.exports = SessionsMethods;