const joinRequirementModel = require('../models/joiningRequirements.model');

exports.testing = (req, res, next) => {
    res.send('Join requirements router works well!');
}

exports.list = (req, res, next) => {
    joinRequirementModel.find()
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

exports.broadSearch = (req, res, next) => {
    joinRequirementModel.find({ 
        age: req.query. age, 
        gender: req.query.gender,
        maritalStatus: req.query.maritalStatus,
        languages: req.query.languages,
        nationality: req.query.bathRooms,
        occupation: req.query.occupation,
        hasPet: req.query.hasPet,
        specialMedicalConditions: req.query.specialMedicalConditions,
        handicaped: req.query.handicaped,
        drink: req.query.drink,
        smoke: req.query.smoke,
        party: req.query.party,
        postDate: req.query.postDate,
        numberOfJoinRequests: req.query.numberOfJoinRequests     
    })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No post available for this filter.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.save = async(req, res, next) => {
    try {
        const res = await joinRequirementModel.create(req.body);   
        res.status(201).send({message: 'House Post Created', dataResponse: res});
        // const fetchedHouse = await require('../models/house.model').findOne({email: req.body.email});   
        
        // console.log("The already saved house.");
        // console.log(fetchedHouse);
        
        // fetchedHouse.joinPost = req.body._id;
        
        // console.log("After adding the join post.");
        // console.log(fetchedHouse);

        // const response = await require('../models/house.model').findByIdAndUpdate(fetchedHouse._id, fetchedHouse);        
        // console.log("The Output.");
        // console.log(response);
        // res.status(201).send({message: 'House Post Created', data: response});
    } catch (error) {
        res.status(500).send(`Server Error: ${error}`);
    }
}

exports.update = (req, res, next) => {
    joinRequirementModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(200).send({ message: 'Joining requirements updated!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.deleteRequest = (req, res, next) => {
    joinRequirementModel.findByIdAndDelete(req.query.id)
    .then(response => {
        res.status(200).send({ message: 'Joining requirements deleted!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}
