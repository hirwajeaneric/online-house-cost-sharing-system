const adminModel = require('../models/admin.model');
const { validateSignin, validateSignup} = require('../services/signinSignupValidation');
const bcrypt = require('bcrypt');

exports.testing = (req, res, next) => {
    res.send('Admin Router working ...');
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateSignin(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message })}       

        const admin = await adminModel.findOne({username: req.body.username});
        if (!admin) { return res.status(401).send({message: "Invalid Username or Password"}) }

        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validPassword) { return res.status(401).send({message: "Invalid Username or Password"}) }

        const token = admin.generateAuthToken();
        res.status(200).send({
            token: token, 
            user: admin
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error :"+error })
    }
}

exports.signup = async (req, res, next) => {
    try {
        const { error } = validateSignup(req.body);
        if (error) { return res.status(400).send({ message: error.details[0].message }) };

        const emailAlreadyRegistered = await adminModel.findOne({ email: req.body.email });
        if (emailAlreadyRegistered) { return res.status(409).send({ message: "This email is already registerd." }) };

        const usernameAlreadyRegistered = await adminModel.findOne({ username: req.body.username });
        if (usernameAlreadyRegistered) { return res.status(409).send({ message: "Username is taken. Choose another one."})};

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new adminModel({ ...req.body, password: hashedPassword })
        res.status(201).send({ message: "Account created"});
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error: "+error });
    }
}

exports.list = (req, res, next) => {
    adminModel.find()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err=> {
        res.status(500).send('Server error: '+err);
    })
}


exports.deleteAccount = (req, res, next) => {
    const userId = req.query.id;
    adminModel.findByIdAndRemove(userId)
    .then(response => {
        res.status(200).send("Account deleted");
    })
    .catch(err=> {
        res.status(500).send('Server error: '+err);
    })
}

exports.updateAccount = (req, res, next) => {
    const userId = req.query.id;
    adminModel.findByIdAndUpdate(userId, req.body)
    .then(response => {
        res.status(200).send("Account updated");
    })
    .catch(err=> {
        res.status(500).send('Server error: '+err);
    })
}

