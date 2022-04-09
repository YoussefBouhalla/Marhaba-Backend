const Joi = require('joi');

const UserSchema = Joi.object({
    user_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    first_name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    repeat_password: Joi.ref('password'),

    phone_number: Joi.number()
        .integer()
        .required(),
    
    role: Joi.string()
        .required(),

    image: Joi.string()
        .required(),

    address: Joi.string()
        .min(10)
        .max(100)
})
    .with('password', 'repeat_password');


module.exports = {
    UserSchema
}