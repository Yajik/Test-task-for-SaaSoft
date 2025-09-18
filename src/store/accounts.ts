import { defineStore } from "pinia";
import type { IUser } from "../const/type";
import type { Account } from "../const/type";

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[]
  }),

  getters: {
    getAllUsers: (state) => state.accounts,
  },

  actions: {
    addUser(user: IUser) {
      const userId: number = this.accounts.length+1
      const account: Account = {
        id: userId,
        userInfo: user
      }
      this.accounts.push(account);
    },

    deleteUser(id: number){
      this.accounts = this.accounts.filter(user => user.id !== id);
    },

    updateUser(id: number, userInfo: IUser) {
      const user = this.accounts.find(user => user.id === id);
      if (user) {
         Object.assign(user.userInfo, userInfo);
      }
    }
  }
})