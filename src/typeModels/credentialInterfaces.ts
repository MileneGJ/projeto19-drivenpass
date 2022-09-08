export interface ICredentialDB {
    id:number;
    title:string;
    url:string;
    username:string;
    password:string | Promise<string>;
    userId:number;
    createdAt:Date;
}

export type TCredentialBody = Omit<ICredentialDB,'id' | 'createdAt' | 'userId'>

export type TCredentialInsertToDB = Omit<ICredentialDB,'id' | 'createdAt'>