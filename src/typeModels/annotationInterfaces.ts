export interface INewAnnotationDB {
    id:number;
    title:string;
    text:string;
    userId:number;
    createdAt:Date;
}

export type TAnnotationBody = Omit<INewAnnotationDB,'id'|'userId'|'createdAt'>

export type TAnnotationInsertToDB = Omit<INewAnnotationDB, 'id'|'createdAt'>