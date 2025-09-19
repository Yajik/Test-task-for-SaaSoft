<script setup lang="ts">
import { ref } from 'vue';
import { InitialAccounts } from './const/data';
import { userTemplate } from './const/data';
import { useAccountsStore } from './store/accounts';
import AccountsTable from './components/AccountsTable.vue';
import type { IUser } from './const/type';
import { NFlex, NButton, NIcon } from 'naive-ui';
import { Add as AddIcon } from '@vicons/ionicons5'
import { HelpCircleOutline as HelpIcon } from '@vicons/ionicons5'

const accountsData = useAccountsStore();
accountsData.initializeAccounts(InitialAccounts);

const newUser = ref<IUser | null>(null);

const addUser = () => {
  newUser.value = { ...userTemplate };
};
</script>

<template>
  <n-flex :vertical="true" :size="35" style="max-width: 1050px;">
    <n-flex align="center">
      <h1>Учетные записи</h1>

      <n-button strong circle type="info" @click="addUser">
        <template #icon>
          <n-icon>
            <AddIcon />
          </n-icon>
        </template>
      </n-button>
    </n-flex>

    <n-flex align="center" class="information">
      <n-icon size="35">
        <HelpIcon />
      </n-icon>

      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </n-flex>

    <AccountsTable :new-user="newUser" @update:new-user="newUser = $event" />
  </n-flex>
</template>

<style>
.information {
  background: rgba(184, 228, 241, 0.422);
  padding-left: 10px;
  border-radius: 8px;
}
</style>