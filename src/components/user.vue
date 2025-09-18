<script setup lang="ts">
import { ref } from 'vue';
import { NInput, NSelect } from 'naive-ui';
import type { IUser } from '../const/type';
import { selectOptions } from '../const/data';
import { useAccountsStore } from '../store/accounts';

const accountsData = useAccountsStore();

const props = defineProps<{ id: number; data: IUser }>();

const user = ref<IUser>({
  note: props.data.note,
  type: props.data.type,
  login: props.data.login,
  password: props.data.password,
});

const errors = ref({
  login: false,
  password: false,
});

const validate = (): boolean => {
  let isValid = true;

  errors.value.login = false;
  errors.value.password = false;

  if (!user.value.login.trim()) {
    errors.value.login = true;
    isValid = false;
  }

  if(user.value.type=='Локальная' && !user.value.password){
    errors.value.password = true
    isValid = false
  }

  return isValid;
};

const handleChange = (field: keyof IUser, value: string) => {
  user.value[field] = value;

  if(field=='type' && value=='LDAP'){
    user.value.password = null
  }

  handleValidate();
};

const handleValidate = () => {
  if (validate()) {
    accountsData.updateUser(props.id, user.value);
  }
};
</script>

<template>
  <div class="row">
    <p>{{ user.note }}</p>
    <n-select
      v-model:value="user.type"
      :options="selectOptions"
      @update:value="handleChange('type', $event)"
    />
    <n-input
      type="text"
      v-model:value="user.login"
      @update:value="handleChange('login', $event)"
      @blur="handleValidate"
      :placeholder="user.login ? '' : 'Введите логин'"
      :status="errors.login ? 'error' : undefined"
    />
    <n-input
      v-if="user.type !== 'LDAP'"
      type="text"
      v-model:value="user.password"
      @update:value="handleChange('password', $event)"
      @blur="handleValidate"
      :placeholder="user.password ? '' : 'Введите пароль'"
      :status="errors.password ? 'error' : undefined"
    />
    <button @click="accountsData.deleteUser(id)">Удалить</button>
  </div>
</template>

<style>
.row {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>