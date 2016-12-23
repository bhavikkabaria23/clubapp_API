

var config = {};

config.mongoURI = {
    development: 'mongodb://localhost/ProfileDB',
    test: 'mongodb://localhost/ProfileDB-test',
    //    test: process.env.MONGODB_URI + "-test" || process.env.MONGOLAB_URI + "-test" || process.env.IP + "-test"
};

config.setMongoURI = function () {        
    if (process.argv[2] != undefined && process.argv[2] == '[testdb]') {
        return config.mongoURI['test'];
    }
    else {
        return config.mongoURI['development'];
    }
}


module.exports = config;    