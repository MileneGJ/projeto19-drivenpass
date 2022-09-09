export interface ICredentialDB {
    id:number;
    title:string;
    url:string;
    username:string;
    password:string;
    userId:number;
    createdAt:Date;
}

export type TCredentialBody = Omit<ICredentialDB,'id' | 'createdAt' | 'userId'>

export type TCredentialInsertToDB = Omit<ICredentialDB,'id' | 'createdAt'>

export type TCredentialReturnDB = Omit<ICredentialDB,'userId' | 'createdAt'>