var express = require('express');
var router = express.Router();
var sessions = require('../repo/sessions'); //sessions.js is the name of the file

router.get('/', function (req, res, next) {
    sessions.get(function (result) {
        res.json(result.sessions);
    });
});

router.get('/:id', function (req, res, next) {
    var sessionID = req.params.id;
    sessions.getById(sessionID, function (result) {
        res.json(result.session);
    });
});

router.put('/closesession/:id', function (req, res, next) {
    sessions.closesession(req.params.id, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

// This method is not is use, just for testing purpose
router.delete('/deleteall', function (req, res, next) {
    sessions.removeAll(function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

router.post('/', function (req, res, next) {
    sessions.post(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function (req, res, next) {
    sessions.put(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

/*
    get session and all coaches and players by session
*/
router.get('/getAllBySession/:sessionKey', function (req, res, next) {
    sessions.getAllBySession(req.params.sessionKey, function (result) {
      res.json(result.sessionResult);
    });

});


module.exports = router;