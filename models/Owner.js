
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var OwnerSchema = new mongoose.Schema({
    salt: String,
    legalName: String,
    email: { type: String, unique: true },
    address: String,
    password: String,
    telephone: String,
    founder: String,
    modifiedDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now },
    logo: { data: Buffer, contentType: String },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
});

OwnerSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.createHash('md5').update(this.salt + password).digest('hex'); 
};

OwnerSchema.methods.validPassword = function (password) {    
    var passwordHash = crypto.createHash('md5').update(this.salt + password).digest('hex'); 
    return this.password === passwordHash;
};

// Generate JWT token
OwnerSchema.methods.generateJWT = function () {

    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.legalName,
        exp: parseInt(exp.getTime() / 1000),
    }, 'SECRET');
};
mongoose.model('Owner', OwnerSchema);