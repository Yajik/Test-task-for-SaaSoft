<script setup lang="ts">
import { ref, computed } from 'vue';
import { NInput, NSelect, NGrid, NGridItem, NButton, NIcon } from 'naive-ui';
import type { IUser } from '../const/type';
import { selectOptions } from '../const/data';
import { useAccountsStore } from '../store/accounts';
import { TrashOutline as TrashIcon } from '@vicons/ionicons5'

const emit = defineEmits<{
  (e: 'deleteNewUser', payload: boolean): void;
}>();

const accountsData = useAccountsStore();

const props = defineProps<{ id?: number; data: IUser }>();

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
    handleValidate();
  }

  if (field === 'note') {
    user.value.note = stringToArray(value);
  } else {
    user.value[field] = value;
  }
};

const handleValidate = () => {
  // Позже переделать эту пирамиду из условий
  if (props.id) {
    if (validate()) {
      accountsData.updateUser(props.id, user.value);
    }
  } else {
    if (user.value.type !== 'LDAP') {
      if (user.value.login !== '' && user.value.password != '') {
        accountsData.addUser({ ...user.value })
        emit('deleteNewUser', true);
      }
    }
    else {
      if (user.value.login != '') {
        accountsData.addUser({ ...user.value })
        emit('deleteNewUser', true);
      }
    }
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
  <n-grid x-gap="20" :cols="5" style="align-items: center; text-align: left;">
    <n-grid-item>
      <n-input type="textarea" v-model:value="noteText" size="small" :autosize="{
        minRows: 2,
        maxRows: 5,
      }" @update:value="handleChange('note', $event)" @blur="handleValidate" />
    </n-grid-item>

    <n-grid-item>
      <n-select v-model:value="user.type" :options="selectOptions" @update:value="handleChange('type', $event)" />
    </n-grid-item>

    <n-grid-item :span="showPasswordField ? 1 : 2">
      <n-input type="text" v-model:value="user.login" @update:value="handleChange('login', $event)"
        @blur="handleValidate" :placeholder="user.login ? '' : 'Введите логин'"
        :status="errors.login ? 'error' : undefined" />
    </n-grid-item>

    <n-grid-item v-if="showPasswordField">
      <n-input type="text" v-model:value="user.password" @update:value="handleChange('password', $event)"
        @blur="handleValidate" :placeholder="user.password ? '' : 'Введите пароль'"
        :status="errors.password ? 'error' : undefined" />
    </n-grid-item>

    <n-grid-item v-if="id" style="text-align: center;">
      <n-button strong circle type="error" @click="accountsData.deleteUser(id)">
        <template #icon>
          <n-icon>
            <TrashIcon />
          </n-icon>
        </template>
      </n-button>
      <!-- <button @click="accountsData.deleteUser(id)">Удалить</button> -->
    </n-grid-item>


  </n-grid>
</template>

<style>
.row {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>