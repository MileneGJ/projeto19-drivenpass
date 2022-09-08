import { INewUserBody } from "../typeModels/authInterfaces";
import bcrypt from 'bcrypt';
import * as authRepository from '../repositories/authRepository'

export async function addNewUser (userData:INewUserBody) {
    await verifyEmail(userData.email);
    const treatedPassword = await encryptPassword(userData.password as string)
    const treatedUserData = {
        name: userData.name,
        email: userData.email,
        password: treatedPassword
    }
    await authRepository.insert(treatedUserData);
}

async function verifyEmail (email:string) {
    const foundUser = await authRepository.findByEmail(email)
    if(foundUser.length>0){
        throw {code: 'Conflict', message: 'Email already in use'}
    }
}

async function encryptPassword (password: string) {
    if(password.length<10){
        throw {code:'InvalidInput', message:'Password must contain 10 characters or more'}
    }
    const saltRound = Number(process.env.BCRYPT_SALT) || 20
    const salt = await bcrypt.genSalt(saltRound)
    return await bcrypt.hash(password,salt)
}