const contractModel = require('../models/contract.model');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.list = (req, res, next) => {
    contractModel.find()
    .then((response) => {
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send("No contracts available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByNumber = (req, res, next) => {
    contractModel.findOne({number: req.query.number})
    .then(response=> {
        res.status(200).send(response);
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByHouseNumber = (req, res, next) => {
    contractModel.find({houseNumber: req.query.houseNumber})
    .then(response=> {
        res.status(200).send(response);
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}


exports.findById = (req, res, next) => {
    contractModel.findById(req.query.id)
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No contracts available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByOwnerId = (req, res, next) => {
    contractModel.find({ ownerId: req.query.ownerId })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No contracts available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByTenantId = (req, res, next) => {
    contractModel.find({ tenantOneId: req.query.tenantOneId, tenantTwoId: req.query.tenantTwoId})
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No contract available with is tenant")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByOwnerUsername = (req, res, next) => {
    contractModel.find({ ownerUsername: req.query.ownerUsername})
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No contract available with is tenant")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByTenantTwoUsername = (req, res, next) => {
    contractModel.find({ tenantTwoUsername: req.query.tenantTwoUsername })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No contract available with is tenant")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByTenantOneUsername = (req, res, next) => {
    contractModel.find({ tenantOneUsername: req.query.tenantOneUsername })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No contract available with is tenant")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.save = (req, res, next) => {
    contractModel.create(req.body)
    .then(response=> {
        res.status(200).send({ 
            message: 'Contract saved!', 
            contract: response 
        })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    contractModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response=> {
        res.status(200).send({ message: 'Contract Signed!', contract: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.deleteContract = (req, res, next) => {
    contractModel.findByIdAndDelete(req.query.id)
    .then(response=> {
        res.status(201).send({ message: 'contract deleted!', contract: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.deleteByContractNumber = (req, res, next) => {
    contractModel.findOneAndRemove({number: req.query.number})
    .then(response=> {
        res.status(201).send(response)
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}
