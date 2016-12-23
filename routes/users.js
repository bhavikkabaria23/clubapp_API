var express = require('express');
var router = express.Router();
var users = require('../repo/users'); //users.js is the name of the file
/* GET users listing. */
router.get('/', function(req, res, next) {
    users.get(function(result) {
        if (result.error) {
            res.json(result.error)
        }
        res.json(result.users);
    });
});

router.get('/:userID', function(req, res, next) {
    var userID = req.params.userID;
    users.getById(userID, function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.users);
    });

});

router.get('/getByFFANumber/:fFANumber', function(req, res, next) {
    users.getByFFANumber(req.params.fFANumber, function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.users);
    });
});

router.post('/createRootUser', function(req, res, next) {
    users.createRootUser(function(result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function(req, res, next) {
    users.put(req.body, function(result) {        
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.post('/signup', function(req, res, next) {
    users.signUp(req.body, function(result) {
        res.json({ status: result.status, error: result.error, token: result.token, userID: result.userID });
    });
});
router.post('/signin', function(req, res, next) {    
    users.signin(req, res, next, function(result) {        
        if (result.hasOwnProperty('statusCode') && result.statusCode == 400) {
            res.status(400).json({
                message: result.message,
                status: result.status
            })
        }
        res.json({
            status: result.status,
            token: result.token,
            role: result.role,
            fFANumber: result.fFANumber,
            _id: result._id,
            details: result.details,
            coach: result.coach,
            player: result.player,
            message: result.message
        })
    });
});

module.exports = router;
