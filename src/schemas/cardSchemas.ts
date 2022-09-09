import Joi from 'joi';
import JoiDateFactory from '@joi/date';

const joi = Joi.extend(JoiDateFactory)

export const newCardSchema = joi.object({
    title:joi.string().required(),
    number:joi.string().required(),
    cardholderName:joi.string().required(),
    securityCode:joi.string().length(3).required(),
    expirationDate:joi.date().format('MM/YY').required(),
    password:joi.string().min(4).required(),
    isVirtual:joi.boolean().required(),
    type:joi.string().valid('credit','debit','both').required()
})