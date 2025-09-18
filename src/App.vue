<script setup lang="ts">
import { computed } from 'vue';
import { InitialAccounts } from './const/data';
import { userTemplate } from './const/data';
import { useAccountsStore } from './store/accounts';
import user from './components/user.vue';

const accountsData = useAccountsStore();

InitialAccounts.map((account) => {
  accountsData.addUser(account);
});

const account = computed(() => accountsData.getAllUsers);

const showStore = () => {
  console.log(account.value); 
};

const addUser = () => {
  accountsData.addUser(userTemplate);
};


</script>

<template>
    <button @click="addUser">Добавить</button>
    <button @click="showStore">Показать записи</button>
    <user v-for="(account, index) in account" :key="index" :id="account.id" :data="account.userInfo" />
</template>

<style scoped>

</style>
