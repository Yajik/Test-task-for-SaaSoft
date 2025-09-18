type accoutType = 'Локальная' | 'LDAP'

export interface Account{
    id: number,
    userInfo: IUser
}

export interface IUser{
    note: string[];
    type: accoutType;
    login: string;
    password?: any
}