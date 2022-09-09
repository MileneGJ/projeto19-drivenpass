import prisma from "../database/database";
import { TDocumentInsertDB, TDocumentReturnDB } from "../typeModels/documentTypes";


export async function findByUserId (userId:number):Promise<TDocumentReturnDB[]> {
    const documents = await prisma.documents.findMany({
        where:{userId},
        select:{
            id:true,
            type: true,
            number:true,
            fullName: true,
            emissionDate: true,
            expirationDate: true,
            emissionInstitution: true
        }
    })
    return documents
}

export async function findByIdandUserId (id:number, userId:number):Promise<TDocumentReturnDB> {
    const document = await prisma.documents.findFirst({
        where:{
            AND:[
                {id},
                {userId}
            ]},
        select:{
            id:true,
            type: true,
            number:true,
            fullName: true,
            emissionDate: true,
            expirationDate: true,
            emissionInstitution: true
        }
    })
    return document as TDocumentReturnDB
}

export async function insert(document:TDocumentInsertDB) {
    await prisma.documents.create({data:{...document}})
}

export async function deleteOne (id:number) {
    await prisma.documents.delete({where:{id}})
}