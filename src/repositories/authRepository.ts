import prisma from "../database/database";
import { INewUserBody } from "../typeModels/authInterfaces";

export async function insert (userData:INewUserBody) {
    await prisma.users.create({data:{
        name:userData.name,
        email:userData.email,
        password:userData.password as string
    }})
}

export async function findByEmail (email:string) {
    return await prisma.users.findMany({where:{email}})
}