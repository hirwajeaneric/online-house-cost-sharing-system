const mongoose = require('mongoose');

const joiningRequirementsSchema = new mongoose.Schema({
    names: {type: String, require: true},
    tenantGender: {type: String, require: true},
    email: {type: String, require: true},
    phoneNumber: {type: String, require: true},
    age: {type: String, require: true},
    gender: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    languages: {type: String, required: true},
    nationality: {type: String, required: true},
    occupation: {type: String, required: true},
    hasPet: {type: String, required: true},
    specialMedicalConditions: {type: String, required: true},
    handicaped: {type: String, required: true},
    drink: {type: String, required: true},
    smoke: {type: String, required: true},
    party: {type: String, required: true},
    moreDescriptions: {type: String, required: false},
    postDate: {type: String, required: true},
    numberOfJoinRequests: {type: String, required: true},
    reffererEmail: {type: String, required: true},
    reffererPhoneNumber: {type: String, required: true}
});

const JoiningRequirements = mongoose.model('joiningRequirements', joiningRequirementsSchema);

module.exports = JoiningRequirements