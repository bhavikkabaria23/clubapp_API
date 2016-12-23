var express = require('express');
var router = express.Router();
var skills = require('../repo/skills'); //skills.js is the name of the file
router.get('/', function (req, res, next) {
    skills.get(function (result) {
        res.json(result.skills);
    });
});

router.post('/', function (req, res, next) {
    skills.post(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function (req, res, next) {
    skills.put(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.get('/:id', function (req, res, next) {
    var skillID = req.params.id;
    skills.getById(skillID, function (result) {
        res.json(result.skill);
    });
});

// This is not in use, just for testing
router.delete('/', function (req, res, next) {
    skills.removeAll(function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

module.exports = router;
