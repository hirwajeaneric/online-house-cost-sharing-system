const mongoose = require('mongoose');

const rentRequestSchema = new mongoose.Schema({
    name: {type: String, require: true},
    username: {type: String, require: true},
    phoneNumber: {type: String, require: true},
    email: {type: String, require: true},
    houseId: {type: String, require: true},
    rent: {type: String, require: true},
    houseNumber: {type: String, require: true},
    houseOwner: {type: String, require: true},
    gender: {type: String, required: true},
    comment: {type: String, require: false},
    willFindPatner: {type: String, require: true},
    sendDate: {type: String, require: true},
    approved: {type: String, require: true},
});

const RentRequest = mongoose.model('rentRequet', rentRequestSchema);

module.exports = RentRequest