var mongoose = require('mongoose');
var Skills = mongoose.model('Skills');

var SkillsMethods = function () {
    var _get = function (callback) {
        result = {};
        Skills.find({
            isActive: true
        }, function (err, skills) {
            if (err) {
                result.error = err;
            }
            result.skills = skills;
            callback(result);
        });
    }

    var _post = function (skills, callback) {
        result = {};
        var skill = new Skills();
        skill.name = skills.name;
        skill.instructions = skills.instructions;
        skill.save(function (err, skill) {
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

    var _put = function (skills, callback) {
        result = {};
        Skills.findByIdAndUpdate(skills._id, {
            $set: {
                name: skills.name,
                instructions: skills.instructions,
                modifiedDate: Date.now()
            }
        }, {
                new: true
            }, function (err, skills) {
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

    var _getById = function (skillId, callback) {
        result = {};
        Skills.findById(skillId, function (err, skill) {
            if (err) {
                result.error = err;
            }
            result.skill = skill;
            callback(result);
        });
    }

    var _removeAll = function (callback) {
        result = {};
        Skills.remove(function (err, skill) {
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
        getById: _getById,
        removeAll: _removeAll
    }
} ();
module.exports = SkillsMethods;