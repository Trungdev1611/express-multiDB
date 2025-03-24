import Joi  from 'joi';

export const createUpdateUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({tlds: {allow: true}}).required(),
    role_id: Joi.number().required(),
    department_id: Joi.number().required()
})


export const emailSchema = Joi.object({
    to: Joi.string().email({tlds: {allow: true}}).required(),
    subject: Joi.string().required(),
    content: Joi.string().required()
})

export const sendEmailSchemaList = Joi.object({
    listUser: Joi.array().items(Joi.string().email({tlds: {allow: true}}).required()).min(1).required(),
    subject: Joi.string().required(),
    content: Joi.string().required(),
    timeout: Joi.number().integer().min(60000).optional(), // Cho phép có hoặc không, tối thiểu là 0 phút
    isCronjob: Joi.boolean().optional()
})