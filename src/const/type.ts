type accoutType = 'Локальная' | 'LDAP'

export interface INote{
    text: string
}

export interface Account{
    id: number,
    userInfo: IUser
}

export interface IUser{
    note: INote[];
    type: accoutType;
    login: string;
    password?: any
}