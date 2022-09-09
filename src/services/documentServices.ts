import { TDocumentBody } from "../typeModels/documentTypes";
import * as userService from '../services/authServices'
import dayjsUtils from "../utils/dayjsUtils";
import * as documentRepository from '../repositories/documentRepository'

export async function addNewDocument (document:TDocumentBody, userId:number) {
    await userService.verifyUserExists(userId)

    dayjsUtils.validateEmissionDate(document.emissionDate,'DD/MM/YYYY')
    dayjsUtils.validateExpirationDate(document.expirationDate,'DD/MM/YYYY')

    await documentRepository.insert({...document,userId})
}

