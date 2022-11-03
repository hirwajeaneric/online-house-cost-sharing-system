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
        firstname: Joi.string().required().label('First name'),
        lastname: Joi.string().required().label('Last name'),
        username: Joi.string().required().label('Username'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })
    return schema.validate(data)
}