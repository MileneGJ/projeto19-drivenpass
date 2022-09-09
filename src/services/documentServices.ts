import { TDocumentBody } from "../typeModels/documentTypes";
import * as userService from '../services/authServices'
import dayjsUtils from "../utils/dayjsUtils";
import * as documentRepository from '../repositories/documentRepository'

export async function addNewDocument(document: TDocumentBody, userId: number) {
    await userService.verifyUserExists(userId)

    dayjsUtils.validateEmissionDate(document.emissionDate, 'DD/MM/YYYY')
    dayjsUtils.validateExpirationDate(document.expirationDate, 'DD/MM/YYYY')
    validateDocNumber(document.number, document.type)

    await documentRepository.insert({ ...document, userId })
}

function validateDocNumber(number: string, type: string) {
    if (type === 'RG') {
        const regex = /^[0-9]{1,8}\-[A-Za-z0-9]{1}$/
        if (!regex.test(number)) {
            throw { code: 'InvalidInput', message: 'RG must not contain separators except a "-" before the last digit' }
        }
    }
    if(type === 'CNH') {
        const regex = /[ `!@#$%^&*\-()_+=\[\]{};':"\\|,.<>\/?~]/
        if(regex.test(number)){
            throw { code: 'InvalidInput', message: 'CNH must not contain special characters' }
        }
    }
}

export async function getAllDocuments (userId:number) {
    const documents = await documentRepository.findByUserId(userId)
    return documents
}

export async function getOneDocument (documentId:number, userId:number) {
    const document = await documentRepository.findByIdandUserId(documentId,userId)
    return document
}