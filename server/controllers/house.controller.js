const houseModel = require('../models/house.model');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');

exports.testing = (req, res, next) => {
    res.send('Admin Router works well!');
}

exports.list = (req, res, next) => {
    houseModel.find()
    .then((response) => {
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(404).send("No houses available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByPhoneNumberOfFirstTenant = (req, res, next) => {
    houseModel.find({ phoneNumberOfFirstTenant: req.query.phoneNumberOfFirstTenant })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No houses available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByVerified = (req, res, next) => {
    houseModel.find({ verified: req.query.verified })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No houses available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByUsername = (req, res, next) => {
    houseModel.find({ username: req.query.username })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No house available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByNumber = (req, res, next) => {
    houseModel.find({number: req.query.number})
    .then(response=> {
        res.status(200).send(response);
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findById = (req, res, next) => {
    houseModel.findById(req.query.id)
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No houses available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByLocation = (req, res, next) => {
    houseModel.find({ location: req.query.location })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No houses available in this location")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByTenant = (req, res, next) => {
    houseModel.find({ tenantOne: req.query.tenant, tenantTwo: req.query.tenant})
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No house available with is tenant")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.broadSearch = (req, res, next) => {
    houseModel.find({ 
        type: req.query.type, 
        location: req.query.location,
        rent: req.query.rent,
        rooms: req.query.rooms,
        bathRooms: req.query.bathRooms,
        furniture: req.query.furniture,
        status: req.query.status        
    })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No house available for this filter.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

/**MULTER CONFIGURATION ------------------------------------ */
//Image storage Path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `img-${moment(new Date()).format('DD-MM-YYYY')}-${file.originalname}`)
    }
})

//Image filter
const isImage = function(req, file, callback) {
    if(file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Only images are allowed!'))
    }
}

exports.upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})

/**--------------------------------------------------------- */
exports.save = (req, res, next) => {
    new houseModel({...req.body, photo: req.file.filename }).save()
    .then(response=> {
        res.status(200).send({ 
            message: 'House saved!', 
            house: response 
        })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    houseModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response=> {
        res.status(200).send({ message: 'House updated!', house: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.removeHouse = (req, res, next) => {
    houseModel.findByIdAndDelete(req.query.id)
    .then(response=> {
        res.status(200).send({ message: 'House deleted!', house: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}
