import prisma from "../database/database";
import { INewUserBody, INewUserDB } from "../typeModels/authInterfaces";

export async function insert (userData:INewUserBody) {
    await prisma.users.create({data:{
        name:userData.name,
        email:userData.email,
        password:userData.password as string
    }})
}

export async function findByEmail (email:string):Promise<INewUserDB> {
    const user = await prisma.users.findMany({where:{email}})
    return user[0]
}