import Joi  from 'joi';

export const createUpdateUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({tlds: {allow: true}}).required(),
    role_id: Joi.number().required(),
    department_id: Joi.number().required()
})


