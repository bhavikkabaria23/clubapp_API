var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var UsersSchema = new mongoose.Schema({
    salt: String,
    fFANumber: {
        type: String,
        unique: true,
        require: true
    },
    password: String,
    role: Number,
    address: String,
    mobileNumber: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UsersSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.createHash('md5').update(this.salt + password).digest('hex');
    return this.password;
};

UsersSchema.methods.validPassword = function (password) {
    var passwordHash = crypto.createHash('md5').update(this.salt + password).digest('hex');
    return this.password === passwordHash;
};

// Generate JWT token
UsersSchema.methods.generateJWT = function () {

    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.fFANumber,
        exp: parseInt(exp.getTime() / 1000),
    }, 'SECRET');
};

var Users = mongoose.model('Users', UsersSchema, 'Users');
