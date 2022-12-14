import joi from 'joi';
import { TAnnotationBody } from '../typeModels/annotationTypes';

export const newAnnotationSchema = joi.object<TAnnotationBody>({
    title: joi.string().max(50).required(),
    text: joi.string().max(1000).required()
})