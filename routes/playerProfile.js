var express = require('express');
var router = express.Router();
var playerProfile = require('../repo/playerProfile'); //skills.js is the name of the file
router.get('/', function (req, res, next) {
    playerProfile.get(function (result) {
        res.json(result.players);
    });
});

router.post('/', function (req, res, next) {
    playerProfile.post(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function (req, res, next) {
    playerProfile.put(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.post("/emailExist", function (req, res, next) {
    playerProfile.emailExist(req.body, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

router.put('/addToSession', function (req, res, next) {
    playerProfile.addToSession(req.body, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

router.get('/:id', function (req, res, next) {
    var playerId = req.params.id;
    playerProfile.getById(playerId, function (result) {
        res.json(result.player);
    });
});

// This is not in use, just for testing purpose
router.delete('/:id', function (req, res, next) {
    var playerProfileID = req.params.id;
    playerProfile.removeLogicalById(playerProfileID, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

// This is not in use, just for testing purpose
router.delete('/', function (req, res, next) {
    playerProfile.removeAll(function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

// delete player as physically. It is used for testing purpose only.
router.delete('/tempplayer/:playerID', function (req, res) {
    playerProfile.removePhysicalByIdId(req.params.playerID, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

// router.get('/getPlayersBySession/:sessionKey', function(req, res, next) {
//     PlayerProfile.find({
//         sessionKey: req.params.sessionKey
//     }, function(err, details) {
//         if (err) {
//             return next(err);
//         }
//         res.json(details);
//     });
// });


module.exports = router;
