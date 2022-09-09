import prisma from "../database/database";
import { TNewUserBody, INewUserDB } from "../typeModels/authTypes";

export async function insert (userData:TNewUserBody) {
    await prisma.users.create({data:{
        name:userData.name,
        email:userData.email,
        password:userData.password as string
    }})
}

export async function findByEmail (email:string):Promise<INewUserDB> {
    const user = await prisma.users.findFirst({where:{email}})
    return user as INewUserDB
}

export async function findById (id:number):Promise<INewUserDB> {
    const user = await prisma.users.findUnique({where:{id}})
    return user as INewUserDB
}