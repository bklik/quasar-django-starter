<template>
    <q-dialog v-model="appAuthStore.loggedOut" persistent>
        <q-card class="login-form">
            <q-form @submit="submitLogin()">
                <q-card-section>
                    <div class="text-h4">Sign in</div>
                </q-card-section>
                <q-card-section class="column q-gutter-md">
                    <q-input
                        type="text"
                        label="Username"
                        required
                        autofocus
                        v-model="loginModel.username"
                        :rules="[
                            (val) =>
                                (val && val.length > 0) || 'Required field.',
                        ]"
                    ></q-input>
                    <q-input
                        type="password"
                        label="Password"
                        required
                        v-model="loginModel.password"
                        :rules="[
                            (val) =>
                                (val && val.length > 0) || 'Required field.',
                        ]"
                    ></q-input>
                    <div v-if="appAuthStore.error" class="text-negative">
                        <q-icon :name="mdiAlertCircle" size="sm"></q-icon>
                        {{ appAuthStore.error }}
                    </div>
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                    <q-btn
                        type="submit"
                        color="primary"
                        :loading="appAuthStore.loading"
                        label="Sign in"
                        :icon="mdiLoginVariant"
                    ></q-btn>
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<style lang="scss">
.login-form {
    width: 100%;

    & input:required + .q-field__label::after {
        color: $negative;
        content: ' *';
    }
}
</style>

<script lang="ts" setup>
import { reactive } from 'vue';
import { mdiAlertCircle, mdiLoginVariant } from '@quasar/extras/mdi-v6';
import { useAppAuthStore } from 'src/stores/useAppAuthStore';

type LoginFormType = {
    username: string;
    password: string;
};

const defaultModel = {
    username: '',
    password: '',
};

const appAuthStore = useAppAuthStore();
const loginModel = reactive<LoginFormType>({ ...defaultModel });

function submitLogin() {
    appAuthStore.login(loginModel).then(() => {
        if (appAuthStore.error === '') {
            Object.assign(loginModel, { ...defaultModel });
        }
    });
}
</script>
