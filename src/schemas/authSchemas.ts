import joi from 'joi';
import { TNewUserBody } from '../typeModels/authTypes';

export const newUserSchema = joi.object<TNewUserBody>({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})