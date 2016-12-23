var express = require('express');
var router = express.Router();
var assessments = require('../repo/assessment');//assessment.js is the name of the file

router.get('/', function (req, res, next) {
    assessments.get(function (result) {
        if (result.error) {
            res.json(result.error)
        }
        res.json(result.assessment);
    });
});

router.post('/', function (req, res, next) {
    assessments.post(req.body, function (result) {        
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function (req, res, next) {
    assessments.put(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.post('/exists', function (req, res, next) {
    assessments.exists(req.body, function (result) {
        res.json(result.assessment);
    });
});

// This is not in use, just for testing
router.delete('/', function (req, res, next) {
    assessments.removeAll(function (result) {
        res.json(result);
    });
});

module.exports = router;