const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    number: {type: String, require: true},
    type: {type: String, required: true},
    username: {type: String, required: true},
    location: {type: String, required: true},
    tenantOne: {type: String, required: false},
    tenantTwo: {type: String, required: false},
    photo: {type: String, required: false},
    phoneNumberOfFirstTenant: {type: String, required:false},
    description: {type: String, required: true},
    rent: {type: String, required: false},
    verified: {type: String, required: false},
    rooms: {type: String, required: true},
    bathRooms: {type: String, required: true},
    hasFurniture: {type: String, required: true},
    images: {type: String, required: false},
    joinPost: {type: String, required: false},
    joinRequests: {type: String, required: false},
});

const House = mongoose.model('house', houseSchema);

module.exports = House