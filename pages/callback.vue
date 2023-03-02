<template>
  <div class="dark:bg-white">
    <h1 class="text-xl">Cargando ...</h1>
    <ul v-if="authStore.errors.length > 0">
      <li v-for="error in authStore.errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
authStore.resetErrors();
const route = useRoute();
const code = ref(route.query.code?.toString() || '');
const authCookie = useCookie('auth');
authCookie.value = null;

onMounted(async () => {
  await authStore.setCode(code.value);
  await authStore.getAccessToken().then(async () => {
    if (authStore.errors.length == 0) await navigateTo('/');
  });
});
</script>