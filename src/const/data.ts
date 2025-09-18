import type { IUser } from "./type"
export const InitialAccounts: IUser[] = [
    {
        note: ['Пользователь 1'],
        type: 'Локальная',
        login: 'SomeUser1',
        password: '12345'
    },
    {
        note: ['Пользователь 2'],
        type: 'LDAP',
        login: 'SomeUser2',
        password: null
    }
]

export const userTemplate: IUser = {
    note: [],
    type: 'Локальная',
    login: 'Значение',
    password: '',
};

export const selectOptions = [
   {
    label: 'Локальная',
    value: 'Локальная'
  },
  {
    label: 'LDAP',
    value: 'LDAP'
  },
]