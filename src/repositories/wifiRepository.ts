import prisma from "../database/database";
import { TWifiInsertDB, TWifiReturnDB } from "../typeModels/wifiTypes";

export async function findByUserId (userId:number):Promise<TWifiReturnDB[]> {
    const wifis = await prisma.wifis.findMany({
        where:{userId},
        select:{
            id:true,
            title:true,
            name:true,
            password:true
        }
    })
    return wifis
}

export async function findByIdAndUserId (id:number, userId:number):Promise<TWifiReturnDB>{
    const wifi = await prisma.wifis.findFirst({
        where:{
        AND:[
            {id},
            {userId}
        ]},
        select:{
            id:true,
            title:true,
            name:true,
            password:true
        }
    })
    return wifi as TWifiReturnDB
}

export async function insert (wifi:TWifiInsertDB) {
    await prisma.wifis.create({data:{...wifi}})
}

export async function deleteOne (id:number) {
    await prisma.wifis.delete({where:{id}})
}