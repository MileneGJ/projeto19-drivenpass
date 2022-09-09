import prisma from "../database/database";
import { TWifiInsertDB } from "../typeModels/wifiTypes";

export async function insert (wifi:TWifiInsertDB) {
    await prisma.wifis.create({data:{...wifi}})
}