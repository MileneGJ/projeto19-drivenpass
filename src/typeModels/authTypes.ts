export interface INewUserDB {
    id:number;
    email:string;
    password:string | Promise<string>;
    createdAt:Date;
}

export type TNewUserBody = Omit<INewUserDB, "id" | "createdAt">

export interface IUserToken {
    id:number;
} 