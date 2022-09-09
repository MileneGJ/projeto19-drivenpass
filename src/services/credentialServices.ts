import { TCredentialBody, TCredentialReturnDB } from "../typeModels/credentialInterfaces";
import * as userService from "./authServices";
import * as credentialRepository from '../repositories/credentialRepository'
import Cryptr from "cryptr";

export async function newCredential (credential:TCredentialBody,userId:number) {
    await userService.verifyUserExists(userId)
    await verifyTitleInUse(credential.title,userId)
    const treatedCredential = {...credential,userId}
    treatedCredential.password = encryptPassword(treatedCredential.password)
    await credentialRepository.insert(treatedCredential)
}

async function verifyTitleInUse (title:string,userId:number) {
    const userCredentialMatch = await credentialRepository.findByTitleAndUserId(title,userId)
    if(userCredentialMatch){
        throw {code:'Conflict', message: 'A credential with the given title already exists for this user'}
    }
}

function encryptPassword (password:string):string {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.encrypt(password)
}

export async function getAllCredentials (userId:number) {
    const credentials = await credentialRepository.findByUserId(userId)
    const treatedCredentials = credentials.map(c=>{
        c.password = decryptPassword(c.password)
    })
    return treatedCredentials
}


function decryptPassword (password:string):string {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.decrypt(password)
}

export async function getOneCredential (credentialId:number,userId:number) {
    const credential = await userCredentialExists(credentialId, userId)
    credential.password = decryptPassword(credential.password)
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