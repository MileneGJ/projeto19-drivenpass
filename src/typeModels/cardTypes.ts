export type CardTypes =
  | "credit"
  | "debit"
  | "both";

export interface ICardDB {
    id:number;
    title:string;
    number:string;
    cardholderName:string;
    securityCode:string;
    expirationDate:string;
    password:string;
    isVirtual:boolean;
    type:CardTypes;
    userId:number;
    createdAt:Date;
}

export type TCardBody = Omit<ICardDB, 'id' | 'createdAt' | 'userId'> 

export type TCardInsertToDB = Omit<ICardDB, 'id' | 'createdAt'> 

export type TCardReturnDB = Omit<ICardDB, 'userId' | 'createdAt'>