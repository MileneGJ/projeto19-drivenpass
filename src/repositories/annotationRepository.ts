import prisma from "../database/database";
import { INewAnnotationDB, TAnnotationBody, TAnnotationInsertToDB } from "../typeModels/annotationInterfaces";

export async function findByUserId(userId:number):Promise<INewAnnotationDB[]> {
    const annotations = await prisma.annotations.findMany({where:{userId}})
    return annotations
}

export async function findById (id:number):Promise<INewAnnotationDB> {
    const credential = await prisma.annotations.findUnique({where:{id}})
    return credential as INewAnnotationDB
}

export async function insert (annotation:TAnnotationInsertToDB){
    await prisma.annotations.create({data:{
        title:annotation.title,
        text:annotation.text,
        userId:annotation.userId
    }})
}

export async function deleteOne (id:number) {
    await prisma.annotations.delete({where:{id}})
}
