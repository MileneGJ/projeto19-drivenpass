import prisma from "../database/database";
import { INewAnnotationDB, TAnnotationInsertToDB, TAnnotationReturnedDB } from "../typeModels/annotationTypes";

export async function findByUserId(userId:number):Promise<TAnnotationReturnedDB[]> {
    const annotations = await prisma.annotations.findMany({
        where:{userId},
        select:{
            id:true,
            title:true,
            text:true
        }
    })
    return annotations
}

export async function findByIdAndUserId (id:number,userId:number):Promise<INewAnnotationDB> {
    const credential = await prisma.annotations.findFirst({
        where:{
            AND: [
                {id}, 
                {userId}
            ]
        },
        select:{
            id:true,
            title:true,
            text:true
        }
    })
    return credential as INewAnnotationDB
}

export async function findByTitleAndUserId (title:string,userId:number):Promise<INewAnnotationDB> {
    const credential = await prisma.annotations.findFirst({
        where:{
            AND: [
                {title}, 
                {userId}
            ]
        }
    })
    return credential as INewAnnotationDB
}

export async function insert (annotation:TAnnotationInsertToDB){
    await prisma.annotations.create({data:{...annotation}})
}

export async function deleteOne (id:number) {
    await prisma.annotations.delete({where:{id}})
}
