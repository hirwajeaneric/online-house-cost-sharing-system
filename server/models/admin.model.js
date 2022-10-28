const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username: {type: String, require: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profilePicture: {type: String, required: false},
});

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'})
    return token
};

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin