var mongoose = require('mongoose');
var Assessment = mongoose.model('Assessment');
var result = {};
var AssessmentMethods = function () {
    var _get = function (callback) {
        result = {};
        Assessment.find({
            isActive: true
        }, function (err, assessment) {
            if (err) {
                result.error = err;
            }
            result.assessment = assessment;
            callback(result);
        });
    }

    var _post = function (assessments, callback) {        
        result = {};
        var assessment = new Assessment();
        assessment.player_id = assessments.player_id;
        assessment.coach_id = assessments.coach_id;
        assessment.assessments = assessments.assessments;
        assessment.sessionKey = assessments.sessionKey;
        assessment.position = assessments.position;
        assessment.note = assessments.note;
        assessment.save(function (err, assessment) {            
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

    var _put = function (assessments, callback) {
        result = {};
        Assessment.findByIdAndUpdate(assessments._id, {
            $set: {
                note: assessments.note,
                assessments: assessments.assessments,
                position: assessments.position,
                modifiedDate: Date.now()
            }
        }, function (err, assessment) {
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

    var _exists = function (assessments, callback) {
        result = {};
        if (assessments.coach_id) {
            Assessment.find({
                player_id: assessments.player_id,
                coach_id: assessments.coach_id,
                sessionKey: assessments.sessionKey
            }, function (err, assessment) {
                if (err) {
                    result.error = err;
                    result.status = false;
                }
                else {
                    result.status = true;
                    result.assessment = assessment;
                }
                callback(result);
            });
        } else {
            Assessment.find({
                player_id: assessments.player_id,
                sessionKey: assessments.sessionKey
            }, function (err, assessment) {
                if (err) {
                    result.error = err;
                    result.status = false;
                }
                else {
                    result.status = true;
                    result.assessment = assessment;
                }
                callback(result);
            });
        }
    }  

    var _removeAll = function (callback) {
        result = {};
        Assessment.remove(function (err, session) {
            if (err) {
                result.error = err;
                result.status = false;
            }
            result.status = true;
            callback(result);
        });
    }

    return {
        get: _get,
        post: _post,
        put: _put,
        exists: _exists,        
        removeAll: _removeAll
    }
} ();
module.exports = AssessmentMethods;