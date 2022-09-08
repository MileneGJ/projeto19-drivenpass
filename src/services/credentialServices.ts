import { TCredentialBody } from "../typeModels/credentialInterfaces";
import * as userService from "./authServices";
import * as credentialRepository from '../repositories/credentialRepository'
import Cryptr from "cryptr";

export async function newCredential (credential:TCredentialBody,userId:number) {
    await userService.verifyUserExists(userId)
    await verifyTitleInUse(credential.title,userId)
    const treatedCredential = {
        title:credential.title,
        url:credential.url,
        username:credential.username,
        password:encryptPassword(credential.password as string),
        userId
    }
    await credentialRepository.insert(treatedCredential)
}

async function verifyTitleInUse (title:string,userId:number) {
    const userCredentials = await credentialRepository.findByUserId(userId)
    const titleCredentials = userCredentials.map(c=>c.title)
    if(titleCredentials.includes(title)){
        throw {code:'Conflict', message: 'A credential with the given title already exists for this user'}
    }
}

function encryptPassword (password:string) {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.encrypt(password)
}

export async function getAllCredentials (userId:number) {
    const credentials = await credentialRepository.findByUserId(userId)
    const treatedCredentials = credentials.map(c=>({
        id:c.id,
        title:c.title,
        url:c.url,
        username:c.username,
        password:decryptPassword(c.password as string)
    }))
    return treatedCredentials
}


function decryptPassword (password:string) {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.decrypt(password)
}

export async function getOneCredential (credentialId:number,userId:number) {
    const credential = await userCredentialExists(credentialId, userId)
    const treatedCredential = {
        id:credential.id,
        title:credential.title,
        url:credential.url,
        username:credential.username,
        password:decryptPassword(credential.password as string)
    }
    return treatedCredential
}

async function userCredentialExists (credentialId:number, userId:number) {
    const credential = await credentialRepository.findById(credentialId)
    if(!credential || credential.userId !== userId){
        throw {code:'NotFound', message:'No credentials were found with given id'}
    }
    return credential
}

export async function deleteCredential (credentialId:number, userId:number) {
    await userCredentialExists(credentialId,userId)
    await credentialRepository.deleteOne(credentialId)
}