import joi from 'joi';

export const newUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})