import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      state: '',
      access_token: '',
      refresh_token: '',
      code: '',
      errors: [],
    };
  },
  actions: {
    setState(newState: string) {
      this.state = newState;
    },
    setCode(newCode: any) {
      this.code = newCode;
    },
    resetErrors() {
      this.errors = [];
    },
    async setAccessToken(newAccessToken: string) {
      this.access_token = await newAccessToken;
    },
    setRefreshToken(newRefreshToken: string) {
      this.refresh_token = newRefreshToken;
    },
    logout() {
      this.access_token = '';
      this.refresh_token = '';
      const authCookie = useCookie('auth');
      authCookie.value = null;
    },
    async getAccessToken() {
      type r = {
        access_token: string;
        refresh_token: string;
      };

      // try {
        const response: r = await $fetch('/api/token', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: {
            code: this.code,
          },
        });

        await this.setAccessToken(response.access_token);
        await this.setRefreshToken(response.refresh_token);
      // } catch (error) {
      //   console.log(error);
      //   console.log('TIPO', typeof error);
      //   // this.errors.push(error as never);
      // }
    },
  },
  persist: true,
});
