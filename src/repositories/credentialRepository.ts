import prisma from "../database/database";
import { ICredentialDB, TCredentialInsertToDB } from "../typeModels/credentialInterfaces";

export async function findByUserId (userId:number):Promise<ICredentialDB[]> {
    const credentials = await prisma.credentials.findMany({where:{userId}})
    return credentials
}

export async function insert (newCredential:TCredentialInsertToDB){
    await prisma.credentials.create({data:{
        title:newCredential.title,
        url:newCredential.url,
        username:newCredential.username,
        password:newCredential.password as string,
        userId:newCredential.userId
    }})
}