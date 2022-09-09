import prisma from "../database/database";
import { TDocumentBody, TDocumentInsertDB } from "../typeModels/documentTypes";

export async function insert(document:TDocumentInsertDB) {
    await prisma.documents.create({data:{...document}})
}

