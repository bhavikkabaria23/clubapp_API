var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
var service = require('../repo/service');//service.js is the name of the file
/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send('Node API Sample');
});

/*router.route('/services')
    .post(auth, function (req, res, next) {
        var service = new Service(req.body);
        service.save(function (err) {
            if (err) { return next(err); }
            res.json({ status: true });
            // res.json(service);
        });
    })
    .get(auth, function (req, res, next) {
        Service.find({ isActive: true },  function (err, posts) {
            if (err) { return next(err); }
            res.json(posts);
        });
    });*/

router.param('ownerID', function (req, res, next, id) {
    service.ownerParams(id, function (result) {
        if (result.error) {
            return next(result.error);
        }
        req.owner = result.owner;
        return next();
    });
});
router.route('/owner/services/:ownerID')
    .get(auth,function (req, res, next) {
        service.getServiceByOwnerId(req.params.ownerID, function (result) {
            res.json(result.services);
        });
    })
    // .post(function (req, res, next) {
    //     service.post(req, function (result) {
    //         res.json({ status: result.status });
    //     });
    // })
    .post(auth,function (req, res, next) {
        service.post(req.body,req.owner, function (result) {
            res.json({ status: result.status });
        });
    })

// This API is not used for app. Just for backed data
// router.route('/allservices')
//     .get(function (req, res, next) {
//         service.allServices(function (result) {
//             res.json(result.services);
//         });
//     });

// This is not in use, just for testing purpose
// router.route('/allservices/:serviceID')
//     .put(auth, function (req, res, next) {
//         service.testUpdate(req.params.serviceID, function (result) {
//             res.json({ status: result.status });
//         });
//     })
//     .delete(function (req, res) {
//         service.removeById(req.params.serviceID, function (result) {
//             res.json({ message: result.message });
//         });
//     });

router.route('/services/:serviceID')
    .get(auth, function (req, res, next) {
        service.getById(req.params.serviceID, function (result) {
            res.json(result.service);
        });
    })
    .put(auth, function (req, res, next) {
        service.put(req.params.serviceID, req.body, function (result) {
            res.json({ status: result.status });
        });
    })
    .delete(auth, function (req, res, next) {
        service.removeServiceByServiceId(req.params.serviceID, function (result) {
            res.json({ status: result.status });
        });

    })


module.exports = router;
