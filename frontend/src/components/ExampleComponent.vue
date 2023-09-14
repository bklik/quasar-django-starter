<template>
    <pre>{{ appAuthStore.user }}</pre>
    <q-btn
        v-if="!appAuthStore.loggedOut"
        label="Logout"
        color="primary"
        @click="appAuthStore.logout()"
    ></q-btn>
</template>

<script setup lang="ts">
import { useAppAuthStore } from 'src/stores/useAppAuthStore';

const appAuthStore = useAppAuthStore();
</script>
