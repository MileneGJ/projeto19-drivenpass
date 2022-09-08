export interface INewUserDB {
    id:number;
    name:string;
    email:string;
    password:string | Promise<string>;
    createdAt:Date;
}

export type TNewUserBody = Omit<INewUserDB, "id" | "createdAt">

export type TLoginBody = Omit<TNewUserBody, "name">

export interface IUserToken {
    id:number;
} 