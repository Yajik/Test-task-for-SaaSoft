<script setup lang="ts">
import { computed, ref } from 'vue';
import { InitialAccounts } from './const/data';
import { userTemplate } from './const/data';
import { useAccountsStore } from './store/accounts';
import AccountsTable from './components/AccountsTable.vue';
import type { IUser } from './const/type';

const accountsData = useAccountsStore();
accountsData.initializeAccounts(InitialAccounts);
const account = computed(() => accountsData.getAllUsers);

const showStore = () => {
  console.log(account.value); 
};

const newUser = ref<IUser | null>(null);

const addUser = () => {
  newUser.value = { ...userTemplate };
};
</script>

<template>
  <button @click="addUser">Добавить</button>
  <button @click="showStore">Показать записи</button>
  <AccountsTable :new-user="newUser" @update:new-user="newUser = $event" />
</template>

<style scoped>
</style>