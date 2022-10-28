const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

exports.validateSignin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    })
    return schema.validate(data)
}

exports.validateSignup = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)
}