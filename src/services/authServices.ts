import { ILoginBody, INewUserBody, INewUserDB } from "../typeModels/authInterfaces";
import bcrypt from 'bcrypt';
import * as authRepository from '../repositories/authRepository'
import jwt from 'jsonwebtoken'

export async function addNewUser (userData:INewUserBody) {
    await verifyEmailInUse(userData.email);
    const treatedPassword = await encryptPassword(userData.password as string)
    const treatedUserData = {
        name: userData.name,
        email: userData.email,
        password: treatedPassword
    }
    await authRepository.insert(treatedUserData);
}

async function verifyEmailInUse (email:string){
    const foundUser = await authRepository.findByEmail(email)
    if(foundUser){
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

export async function newLogin (userData:ILoginBody) {
   const user = await verifyAuthentication(userData)
   return createToken (user)
}

async function verifyAuthentication (userData:ILoginBody):Promise<INewUserDB> {
    const foundUser = await authRepository.findByEmail(userData.email)
    const encPassword = foundUser?.password as string || ""
    const passwordsMatch = await bcrypt.compare(userData.password as string,encPassword)
    if(!foundUser||!passwordsMatch){
        throw {code: 'Unauthorized', message: 'Incorrect email or password'}
    }
    return foundUser
}

function createToken (user:INewUserDB) {
    const secret = process.env.TOKEN_SECRET || 'secret'
    const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: "12h",
      });
      return token;
}