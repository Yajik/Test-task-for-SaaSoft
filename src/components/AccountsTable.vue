<script setup lang="ts">
    import { NGrid, NGridItem } from 'naive-ui';
    import { computed } from 'vue';
    import { useAccountsStore } from '../store/accounts';
    import type { IUser } from '../const/type';
    import user from './user.vue';
    const accountsData = useAccountsStore();
    const account = computed(() => accountsData.getAllUsers);

    const props = defineProps<{ newUser: IUser | null }>();
    const emit = defineEmits(['update:newUser']); 
    const removeNewUser = (payload: boolean) => {
    if (payload) {
        emit('update:newUser', null); 
    }
};

</script>

<template>
    <n-grid :x-gap="12" :y-gap="8" :cols="1">
        <n-grid-item>
            <n-grid :x-gap="12" :y-gap="8" :cols="4">
                <n-grid-item>
                    <p>Метки</p>
                </n-grid-item>

                <n-grid-item>
                    <p>Тип записи</p>
                </n-grid-item>

                <n-grid-item>
                    <p>Логин</p>
                </n-grid-item>

                <n-grid-item>
                    <p>Пароль</p>
                </n-grid-item>
            </n-grid>
        </n-grid-item>

        <n-grid-item v-for="(account, index) in account" :key="index">
            <user :id="account.id" :data="account.userInfo" />
        </n-grid-item>

        <n-grid-item v-if="props.newUser">
            <user :data="props.newUser" @custom-event="removeNewUser"/>
        </n-grid-item>
    </n-grid>
</template>

<style>

</style>