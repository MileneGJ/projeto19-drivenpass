import prisma from "../database/database";
import { ICardDB, TCardInsertToDB, TCardReturnDB } from "../typeModels/cardInterfaces";

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

export async function findByUserId (userId:number):Promise<TCardReturnDB[]> {
    const cards = await prisma.cards.findMany({
        where:{userId},
        select:{
            id:true,
            title:true,
            number:true,
            cardholderName:true,
            securityCode:true,
            expirationDate:true,
            password:true,
            isVirtual:true,
            type:true
        }})
    return cards
}