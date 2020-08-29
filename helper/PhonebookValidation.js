const Joi = require('@hapi/joi');

const phonebookValidation = data => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required().messages({
            'string.base': 'Invalid Type, Plesae enter name',
            'string.empty': 'Pleasse enter name',
            'string.min': 'Name must be at least {#limit} long',
            'string.max': 'Name must be at most {#limit} long',
        }),
        mobile: Joi.string().min(11).max(14).regex(/^(?:\+88|01)?(?:\d{11}|\d{13})$/).required().messages({
            'string.base': 'Invalid Type, Plesae enter mobile no',
            'string.empty': 'Pleasse enter mobile no',
            'string.min': 'Mobile no must be at least {#limit} long',
            'string.max': 'Mobile no must be at most {#limit} long',
            'string.pattern.base': 'Please enter Bangladeshi mobile no, i.e: 01911650510',
        }),

    });
    return schema.validate(data);

};


module.exports.phonebookValidation = phonebookValidation;
