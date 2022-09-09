import joi from 'joi';
import { TCredentialBody } from '../typeModels/credentialTypes';

export const newCredentialSchema = joi.object<TCredentialBody>({
    title: joi.string().required(),
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required()
})