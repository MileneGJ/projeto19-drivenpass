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
    const cryptrKey = process.env.CRYPTR_KEY as string //|| 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.encrypt(password)
}