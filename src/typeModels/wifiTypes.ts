export interface INewWifiDB {
    id: number;
    title: string;
    name: string;
    password: string;
    userId: number;
    createdAt: Date;
}

export type TWifiBody = Omit<INewWifiDB, 'id' | 'createdAt' | 'userId' >

export type TWifiInsertDB = Omit<INewWifiDB, 'id' | 'createdAt' >

export type TWifiReturnDB = Omit<INewWifiDB, 'createdAt' | 'userId' >