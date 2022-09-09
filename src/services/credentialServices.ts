import { TCredentialBody, TCredentialReturnDB } from "../typeModels/credentialTypes";
import * as userService from "./authServices";
import * as credentialRepository from '../repositories/credentialRepository'
import cryptrUtils from '../utils/cryptrUtils'

export async function addNewCredential (credential:TCredentialBody,userId:number) {
    await userService.verifyUserExists(userId)
    await verifyTitleInUse(credential.title,userId)
    const treatedCredential = {...credential,userId}
    treatedCredential.password = cryptrUtils.encryptString(treatedCredential.password)
    await credentialRepository.insert(treatedCredential)
}

async function verifyTitleInUse (title:string,userId:number) {
    const userCredentialMatch = await credentialRepository.findByTitleAndUserId(title,userId)
    if(userCredentialMatch){
        throw {code:'Conflict', message: 'A credential with the given title already exists for this user'}
    }
}

export async function getAllCredentials (userId:number) {
    const credentials = await credentialRepository.findByUserId(userId)
    const treatedCredentials = credentials.map(c=>{
        c.password = cryptrUtils.decryptString(c.password)
        return c
    })
    return treatedCredentials
}

export async function getOneCredential (credentialId:number,userId:number) {
    const credential = await userCredentialExists(credentialId, userId)
    credential.password = cryptrUtils.decryptString(credential.password)
    return credential
}

async function userCredentialExists (credentialId:number, userId:number):Promise<TCredentialReturnDB> {
    const credential = await credentialRepository.findByIdAndUserId(credentialId,userId)
    if(!credential){
        throw {code:'NotFound', message:'No credentials were found with given id'}
    }
    return credential
}

export async function deleteCredential (credentialId:number, userId:number) {
    await userCredentialExists(credentialId,userId)
    await credentialRepository.deleteOne(credentialId)
}