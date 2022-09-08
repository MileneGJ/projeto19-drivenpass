import { TAnnotationBody } from "../typeModels/annotationInterfaces";
import * as userService from '../services/authServices'
import * as annotationRepository from '../repositories/annotationRepository'

export async function newAnnotation (annotation:TAnnotationBody, userId:number) {
    await userService.verifyUserExists(userId);
    await verifyTitleInUse(annotation.title,userId);
    validateContent(annotation);
    const treatedAnnotation = {
        title:annotation.title,
        text:annotation.text,
        userId
    }
    await annotationRepository.insert(treatedAnnotation)
}

async function verifyTitleInUse (title:string,userId:number) {
    const userAnnotations = await annotationRepository.findByUserId(userId)
    const titleAnnotations = userAnnotations.map(c=>c.title)
    if(titleAnnotations.includes(title)){
        throw {code:'Conflict', message: 'An annotation with the given title already exists for this user'}
    }
}

function validateContent(annotation:TAnnotationBody) {
    if(annotation.title.length>50){
        throw {code:'InvalidInput', message:'Annotation title must have 50 characters or less'}
    }
    if(annotation.text.length>1000) {
        throw {code:'InvalidInput', message:'Annotation text must have 1000 characters or less'}
    }
}