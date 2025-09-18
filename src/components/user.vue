<script setup lang="ts">
import { ref, computed } from 'vue';
import { NInput, NSelect, NGrid, NGridItem, NFlex } from 'naive-ui';
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

const noteText = ref(user.value.note.map(item => item.text).join('; '));
const showPasswordField = computed(() => user.value.type !== 'LDAP');

const validate = (): boolean => {
  let isValid = true;

  errors.value.login = false;
  errors.value.password = false;

  if (!user.value.login.trim()) {
    errors.value.login = true;
    isValid = false;
  }

  if (user.value.type === 'Локальная' && !user.value.password) {
    errors.value.password = true;
    isValid = false;
  }

  return isValid;
};

const handleChange = (field: keyof IUser, value: string) => {
  if (field === 'type' && value === 'LDAP') {
    user.value.password = null;
  }

  if (field === 'note') {
    user.value.note = stringToArray(value);
  } else {
    user.value[field] = value;
  }

  handleValidate();
};

const handleValidate = () => {
  if (validate()) {
    accountsData.updateUser(props.id, user.value);
  }
};

const stringToArray = (inputString: string): Array<{ text: string }> => {
  return inputString
    .split(';')
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(text => ({ text }));
};
</script>

<template>
  <n-grid x-gap="12" :cols="4">
    <n-grid-item>
        <n-input
      type="textarea"
      v-model:value="noteText"
      size="small"
      :autosize="{
        minRows: 1,
        maxRows: 5,
      }"
      @update:value="handleChange('note', $event)"
      @blur="handleValidate"
    />
    </n-grid-item>

    <n-grid-item>
            <n-select
      v-model:value="user.type"
      :options="selectOptions"
      @update:value="handleChange('type', $event)"
    />
    </n-grid-item>

    <n-grid-item :span="showPasswordField ? 1 : 2">
            <n-input
      type="text"
      v-model:value="user.login"
      @update:value="handleChange('login', $event)"
      @blur="handleValidate"
      :placeholder="user.login ? '' : 'Введите логин'"
      :status="errors.login ? 'error' : undefined"
    />
    </n-grid-item>

    <n-grid-item v-if="showPasswordField">
        <n-input
      
      type="text"
      v-model:value="user.password"
      @update:value="handleChange('password', $event)"
      @blur="handleValidate"
      :placeholder="user.password ? '' : 'Введите пароль'"
      :status="errors.password ? 'error' : undefined"
    />
    </n-grid-item>

    <!-- <n-grid-item>
            <button @click="accountsData.deleteUser(id)">Удалить</button>
    </n-grid-item> -->
  </n-grid>
</template>

<style>
.row {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>