import prisma from "../database/database";
import { ICardDB, TCardInsertToDB } from "../typeModels/cardInterfaces";

export async function insert (card:TCardInsertToDB) {
    await prisma.cards.create({data:{...card}})
}

export async function findByIdAndUserId (id:number, userId:number):Promise<ICardDB> {
    const card = await prisma.cards.findFirst({
        where:{
            AND: [
                {id},
                {userId}
            ]
        }
    })
    return card as ICardDB
}

export async function findByTitleAndUserId (title:string, userId:number):Promise<ICardDB> {
    const card = await prisma.cards.findFirst({
        where:{
            AND: [
                {title},
                {userId}
            ]
        }
    })
    return card as ICardDB
}