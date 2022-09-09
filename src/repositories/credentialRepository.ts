import prisma from "../database/database";
import { ICredentialDB, TCredentialInsertToDB, TCredentialReturnDB } from "../typeModels/credentialInterfaces";

export async function findByUserId (userId:number):Promise<TCredentialReturnDB[]> {
    const credentials = await prisma.credentials.findMany({
        where:{userId},
        select:{
            id:true,
            title:true,
            url:true,
            username:true,
            password:true
        }
    })
    return credentials
}

export async function findByIdAndUserId (id:number,userId:number):Promise<TCredentialReturnDB> {
    const credential = await prisma.credentials.findFirst({
        where:{
            AND:[
                {id},
                {userId}
            ]
        },
        select:{
            id:true,
            title:true,
            url:true,
            username:true,
            password:true
        }
    })
    return credential as TCredentialReturnDB
}

export async function findByTitleAndUserId (title:string,userId:number):Promise<ICredentialDB> {
    const credential = await prisma.credentials.findFirst({
        where:{
            AND:[
                {title},
                {userId}
            ]
        }})
    return credential as ICredentialDB
}

export async function insert (newCredential:TCredentialInsertToDB){
    await prisma.credentials.create({data:{...newCredential}})
}

export async function deleteOne (id:number) {
    await prisma.credentials.delete({where:{id}})
}
