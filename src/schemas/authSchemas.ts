import joi from 'joi';
import { TNewUserBody } from '../typeModels/authTypes';

export const newUserSchema = joi.object<TNewUserBody>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})