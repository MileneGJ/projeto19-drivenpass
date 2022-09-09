import Joi from 'joi';
import JoiDateFactory from '@joi/date';

const joi = Joi.extend(JoiDateFactory)

export const newDocumentSchema = joi.object({
    type: joi.string().valid('CNH','RG'),
    number:joi.string().required(),
    fullName: joi.string().required(),
    emissionDate: joi.date().format('DD/MM/YYYY').required(),
    expirationDate:joi.date().format('DD/MM/YYYY').required(),
    emissionInstitution:joi.string().required()
})