const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const tenantSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, require: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String, required: false},
    houseNumber: {type: String, required: false},
    profilePicture: {type: String, required: false},
});

tenantSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'})
    return token
};

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant