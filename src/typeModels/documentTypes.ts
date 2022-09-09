export type DocTypes =
| "CNH"
| "RG";

export interface INewDocumentDB {
    id: number;
    type: DocTypes;
    number: string;
    fullName: string;
    emissionDate: string;
    expirationDate: string;
    emissionInstitution: string;
    userId: number;
    createdAt: Date;
}

export type TDocumentBody = Omit<INewDocumentDB, 'id' | 'createdAt' | 'userId'>

export type TDocumentInsertDB = Omit<INewDocumentDB, 'id' | 'createdAt'>

export type TDocumentReturnDB = Omit<INewDocumentDB, 'createdAt' | 'userId'>