import prisma from "../database/database";
import { ICredentialDB, TCredentialInsertToDB } from "../typeModels/credentialInterfaces";

export async function findByUserId (userId:number):Promise<ICredentialDB[]> {
    const credentials = await prisma.credentials.findMany({where:{userId}})
    return credentials
}

export async function findByIdAndUserId (id:number,userId:number):Promise<ICredentialDB> {
    const credential = await prisma.credentials.findFirst({
        where:{
            AND:[
                {id},
                {userId}
            ]
        }})
    return credential as ICredentialDB
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

export async function deleteOne (id:number) {
    await prisma.credentials.delete({where:{id}})
}
