import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

type LoginFormType = {
    username: string;
    password: string;
};

type UserType = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    permissions: Array<string>;
};

type AuthCheckType = {
    isAuthenticated: boolean;
    user?: UserType;
};

export const useAppAuthStore = defineStore('app_auth', {
    state: () => ({
        loggedOut: true,
        error: '' as string,
        user: {} as UserType,
        loading: false,
        authInterval: null as ReturnType<typeof setInterval> | null,
    }),
    getters: {},
    actions: {
        async login(credentials: LoginFormType) {
            this.loading = true;
            await api
                .post('/app_auth/login/', credentials)
                .then(() => {
                    this.authCheck();
                })
                .catch((error) => {
                    console.error(error.response.data);
                    this.error = error.response.data.error;
                    this.loggedOut = true;
                    this.user = {} as UserType;
                    this.loading = false;
                });
        },
        async authCheck() {
            this.loading = true;
            await api
                .get('/app_auth/auth-check')
                .then((response) => {
                    const data = response.data as AuthCheckType;
                    if (data.isAuthenticated && data.user) {
                        this.user = data.user;
                        this.error = '';
                        this.loggedOut = false;
                        this.loading = false;

                        if (!this.authInterval) {
                            this.authInterval = setInterval(() => {
                                this.authCheck();
                            }, 1000 * 60 * 21); // 21 minutes in miliseconds
                        }
                    } else {
                        this.error = '';
                        this.loggedOut = true;
                        this.loading = false;
                        this.authInterval = null;
                    }
                })
                .catch((error) => {
                    console.error(error.response.data);
                    this.error = error;
                    this.loggedOut = true;
                    this.loading = false;
                });
        },
        async logout() {
            this.loading = true;
            await api
                .get('/api-auth/logout/')
                .then(() => {
                    this.authCheck();
                })
                .catch((error) => {
                    console.error(error.response.data);
                    this.error = error.response.data.error;
                    this.loading = false;
                });
        },
    },
});
