const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    number: {type: String, require: true},
    approvedOn: {type: String, required: true},
    createdOn: {type: String, required: false},
    status: {type: String, required: false},
    houseNumber: {type: String, required: true},
    ownerUsername: {type: String, required: true},
    houseOwner: {type: String, required: false},
    tenantOneUsername: {type: String, required: false},
    tenantOne: {type: String, required: false},
    tenantOneSignDate: {type: String, required: false},
    tenantTwoUsername: {type: String, required: false},
    tenantTwo: {type: String, required: false},
    tenantTwoSignDate: {type: String, required: false},
    description: {type: String, required: false}
});

const Contract = mongoose.model('contract', contractSchema);

module.exports = Contract