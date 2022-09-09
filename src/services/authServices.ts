import { TNewUserBody, INewUserDB } from "../typeModels/authTypes";
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository'
import jwt from 'jsonwebtoken'

export async function addNewUser (userData:TNewUserBody) {
    await verifyEmailInUse(userData.email);
    const treatedUserData = userData
    treatedUserData.password = await encryptPassword(userData.password as string)
    await userRepository.insert(treatedUserData);
}

async function verifyEmailInUse (email:string){
    const foundUser = await userRepository.findByEmail(email)
    if(foundUser){
        throw {code: 'Conflict', message: 'Email already in use'}
    }
}

export async function verifyUserExists (id:number) {
    const foundUser = await userRepository.findById(id)
    if(!foundUser){
        throw {code: 'NotFound', message: 'User not found'}
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

export async function newLogin (userData:TNewUserBody) {
   const user = await verifyAuthentication(userData)
   return createToken (user)
}

async function verifyAuthentication (userData:TNewUserBody):Promise<INewUserDB> {
    const foundUser = await userRepository.findByEmail(userData.email)
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