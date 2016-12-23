var resources = require('../resource.json');
var mongoose = require('mongoose');
var Owner = mongoose.model('Owner');
var Service = mongoose.model('Service');
var passport = require('passport');
var result = {};
var ServiceMethods = function () {
    var _ownerParams = function (id, callback) {
        result = {};
        var query = Owner.findById(id);
        query.exec(function (err, owner) {
            if (err) {
                result.error = err;
            } else {
                if (!owner) {
                    result.error = "can not find owner";
                } else {
                    result.owner = owner;
                }
            }
            callback(result);
        });
    }

    var _getServiceByOwnerId = function (ownerID, callback) {
        result = {};
        Service.find({ owner: ownerID, isActive: true }, function (err, services) {
            if (err) {
                result.error = err;
            }
            result.services = services;
            callback(result);
        });
    }

    // This is not in use, just for testing purpose
    // var _testUpdate = function (serviceID, callback) {
    //     result = {};
    //     Service.findByIdAndUpdate(serviceID, {
    //         $set: {
    //             isActive: true
    //         }
    //     }, {
    //             new: true
    //         }, function (err, services) {
    //             if (err) {
    //                 result.error = err;
    //                 result.status = false;
    //             }
    //             else {
    //                 result.status = true;
    //             }
    //             callback(result);
    //         });
    // }

    // This is not in use, just for testing purpose
    // var _removeById = function (serviceID, callback) {
    //     result = {};
    //     Service.remove({
    //         _id: serviceID
    //     }, function (err, service) {
    //         if (err) {
    //             result.error = err;
    //             result.status = false;
    //             result.message = 'Not deleted'
    //         } else {
    //             result.message = 'Successfully deleted'
    //         }
    //         callback(result);
    //     });
    // }

    // This is not in use, just for testing purpose
    // var _allServices = function (callback) {
    //     result = {};
    //     Service.find({ isActive: false }, function (err, services) {
    //         if (err) {
    //             result.error = err;
    //         }
    //         result.services = services;
    //     });
    //     callback(result);
    // }

    var _put = function (serviceID, serviceBody, callback) {
        result = {};
        Service.findById(serviceID, function (err, service) {
            if (err) {
                result.error = err;
                result.status = false;
                callback(result);
            } else {
                service.description = serviceBody.description;
                service.image = serviceBody.image;
                service.save(function (err, services) {
                    if (err) {
                        result.error = err;
                        result.status = false;
                    } else {
                        result.status = true;
                    }
                    callback(result);
                });
            }

        });
    }

    var _getById = function (serviceID, callback) {
        result = {};
        Service.findById(serviceID, function (err, service) {
            if (err) {
                result.error = err;
            } else {
                result.service = service;
            }
            callback(result);
        });
    }

    // var _post = function (req, callback) {
    //     result = {};
    //     var service = new Service(req.body);
    //     service.owner = req.owner;
    //     service.save(function (err, service) {
    //         if (err) {
    //             result.error = err;
    //             result.status = false;
    //         } else {
    //             result.service = service;
    //         }
    //         req.owner.services.push(service);
    //         req.owner.save(function (err, owner) {
    //             if (err) {
    //                 result.error = err;
    //                 result.status = false;
    //             } else {
    //                 result.status = true;
    //             }
    //             callback(result);
    //         });
    //     });

    // }

    var _post = function (service, owner, callback) {
        result = {};
        if (owner) {
            var service = new Service(service);
            service.owner = owner;
            service.save(function (err, service) {
                if (err) {
                    result.error = err;
                    result.status = false;
                } else {
                    result.service = service;
                }
                owner.services.push(service);
                owner.save(function (err, owner) {
                    if (err) {
                        result.error = err;
                        result.status = false;
                    } else {
                        result.status = true;
                    }
                    callback(result);
                });
            });
        }
        else {
            result.error = 'owner is not defined';
            result.status = false;
            callback(result);
        }
    }

    var _removeServiceByServiceId = function (serviceID, callback) {
        result = {};
        Service.findById(serviceID, function (err, service) {
            if (err) {
                result.error = err;
                result.status = false;
                callback(result);
            } else {
                service.isActive = false;
                service.save(function (err) {
                    if (err) {
                        result.error = err;
                        result.status = false;
                    } else {
                        result.status = true;
                    }
                    callback(result);
                });
            }

        });
    }

    return {
        post: _post,
        ownerParams: _ownerParams,
        getById: _getById,
        getServiceByOwnerId: _getServiceByOwnerId,
        //allServices: _allServices,
        //testUpdate: _testUpdate,
        //removeById: _removeById,
        put: _put,
        removeServiceByServiceId: _removeServiceByServiceId
    }
} ();
module.exports = ServiceMethods;