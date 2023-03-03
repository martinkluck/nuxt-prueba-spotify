<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const showSideDrawer = ref(false)
const router = useRouter()
const colorMode = useColorMode()

router.afterEach(() => {
  showSideDrawer.value = false
})

const setColorTheme = (newTheme: Theme) => {
  colorMode.preference = newTheme
}

const logout = () => {
  authStore.logout();
  navigateTo('/');
}

</script>

<template>
  <div class="navbar relative dark:bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between border-b-2 border-gray-100">
        <div class="flex justify-between min-w-full md:min-w-0">
          <div class="md:hidden mt-4">
            <button @click="showSideDrawer = true" type="button"
              class="bg-white rounded-md p-2 inline-flex  text-gray-400 hover:text-gray-500 dark:bg-black dark:text-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false">
              <span class="sr-only dark:bg-black">Open menu</span>
              <svg class="h-6 w-6 dark:bg-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div class="">
            <nuxt-link to="/">
              <span class="sr-only">Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="h-20 flex-no-shrink fill-current ml-2">
                <path fill="#1ed760"
                  d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z" />
                <path
                  d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
              </svg>
            </nuxt-link>
          </div>
        </div>
        <nav class="hidden md:flex justify-between space-x-10 align-bottom mt-14">
        </nav>
        <div class="flex justify-end space-x-5 align-bottom mt-14">
          <span class="hidden md:block cursor-pointer"
            @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
            <svg v-if="$colorMode.value == 'dark'" xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-50 hidden lg:block hover:dark:text-yellow-400 hover:text-yellow-400"
              viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg v-if="$colorMode.value == 'light'" xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hidden lg:block hover:dark:text-yellow-400 hover:text-yellow-400" viewBox="0 0 20 20"
              fill="currentColor ">
              <path fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd" />
            </svg>
          </span>
          <span class="hidden md:block cursor-pointer" @click="logout()" v-if="authStore.access_token">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 dark:text-gray-50 hidden lg:block">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <!-- drawer component -->
    <div id="drawer-navigation my-12" :class="{ hidden: !showSideDrawer }"
      class="fixed z-40 top-0 h-screen  transition-all duration-700   p-4 overflow-y-auto bg-white w-80 dark:bg-black"
      tabindex="-1" aria-labelledby="drawer-navigation-label">

      <button @click="showSideDrawer = false" type="button" data-drawer-dismiss="drawer-navigation"
        aria-controls="drawer-navigation"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 dark:text-gray-200 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-black dark:hover:text-white">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>

      <div class="py-4 overflow-y-auto my-12">
        <ul class="space-y-2">
          <li>
            <div class="flex justify-end space-x-5 align-bottom mt-14">
              <span class="cursor-pointer"
                @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
                <svg v-if="$colorMode.value == 'dark'" xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-gray-50 hover:dark:text-yellow-400 hover:text-yellow-400"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <svg v-if="$colorMode.value == 'light'" xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 hover:dark:text-yellow-400 hover:text-yellow-400" viewBox="0 0 20 20"
                  fill="currentColor ">
                  <path fill-rule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clip-rule="evenodd" />
                </svg>
              </span>
              <span class="cursor-pointer dark:text-white flex" @click="logout()" v-if="authStore.access_token">
                Salir
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 dark:text-gray-50">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
