import { TAnnotationBody } from "../typeModels/annotationTypes";
import * as userService from '../services/authServices'
import * as annotationRepository from '../repositories/annotationRepository'

export async function addNewAnnotation (annotation:TAnnotationBody, userId:number) {
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
    const userAnnotationMatch = await annotationRepository.findByTitleAndUserId(title,userId)
    if(userAnnotationMatch){
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

export async function getAllAnnotations (userId:number) {
    const annotations = await annotationRepository.findByUserId(userId)
    return annotations
}

export async function getOneAnnotation (annotationId:number,userId:number) {
    const annotation = await userAnnotationExists(annotationId, userId)
    return annotation
}

async function userAnnotationExists (annotationId:number, userId:number) {
    const annotation = await annotationRepository.findByIdAndUserId(annotationId,userId)
    if(!annotation){
        throw {code:'NotFound', message:'No annotations were found with given id'}
    }
    return annotation
}

export async function deleteAnnotation (annotationId:number, userId:number) {
    await userAnnotationExists(annotationId, userId)
    await annotationRepository.deleteOne(annotationId)
}