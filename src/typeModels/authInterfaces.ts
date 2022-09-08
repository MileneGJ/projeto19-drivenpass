export interface INewUserDB {
    id:number;
    name:string;
    email:string;
    password:string | Promise<string>;
    createdAt:Date;
}

export type INewUserBody = Omit<INewUserDB, "id" | "createdAt">

export type ILoginBody = Omit<INewUserBody, "name">