import type { IUser } from "./type"
export const InitialAccounts: IUser[] = [
    {
        note: [{text: 'Пользователь 1'}, {text: 'он человек'}],
        type: 'Локальная',
        login: 'SomeUser1',
        password: '12345'
    },
    {
        note: [{text: 'Пользователь 2'}],
        type: 'LDAP',
        login: 'SomeUser2',
        password: null
    }
]

export const userTemplate: IUser = {
    note: [],
    type: 'Локальная',
    login: '',
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