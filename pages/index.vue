<template>
  <div>
    <div class="container" v-if="!authStore.access_token">
      <div id="login" class="text-content-between m-5">
        <h1 class="text-xl m-2 dark:text-white">This is an example of the Authorization Code flow</h1>
        <button class="bg-blue-400 px-4 py-2 rounded text-white" @click="login()">Log in with Spotify</button>
      </div>
    </div>
    <div class="container" v-else>
      <form @submit.prevent="">
        <label class="relative block">
          <span class="sr-only">Buscar</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.5"
              stroke="currentColor" class="h-5 w-5 fill-slate-300">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Busca tu canción favorita ..." type="text" name="search" v-model="search" />
        </label>
      </form>
      <section class="py-10 bg-gray-100" v-if="tracks.length > 0">
        <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
            v-for="track in tracks" :key="track.id">
            <a href="#">
              <div class="relative flex items-end overflow-hidden rounded-xl">
                <img :src="track.album.images[0].url" :alt="track.album.name" />
                <div
                  class="flex items-center space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white duration-100 hover:bg-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <button class="text-sm">Agregar a la Playlist</button>
                </div>
              </div>

              <div class="mt-1 p-2">
                <h2 class="text-slate-700">{{ track.name }}</h2>
                <p class="mt-1 text-sm text-slate-400">{{ track.artists[0].name }}</p>
                <div class="mt-3 flex items-end justify-between">
                  <div
                    class="flex items-center space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white duration-100 hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <button class="text-sm">Agregar a la Playlist</button>
                  </div>
                </div>
              </div>
            </a>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import querystring from 'querystring';
const authStore = useAuthStore();
const config = useRuntimeConfig();
const generateRandomString = (length: number): string => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const login = () => {
  const redirect_uri = config.SPOTIFY_REDIRECT_URI
  const client_id = config.SPOTIFY_CLIENT_ID
  const scope = 'user-read-private user-read-email'
  const state = generateRandomString(16);

  window.location.href = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
}

const search = ref('');
const tracks: Ref<Track[]> = ref([]);
const searching = async (query: string) => {
  try {
    // await authStore.getAccessToken();
    const response = await useFetch('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track'
      },
      headers: {
        'Authorization': `Bearer ${authStore.access_token}`
      }
    })

    type Item = {
      items: Track[];
    }

    type r = {
      tracks: Item;
    }
    const data: Ref<r> = await response.data as Ref<r>;
    tracks.value = await data.value.tracks.items
  } catch (error) {
    console.error(error)
  }
}
watch(search, (newSearch) => {
  if (newSearch.length >= 3) {
    searching(newSearch);
  }
});
onMounted(() => {
  console.log('ACCESS TOKEN', authStore.access_token);
  if (authStore.access_token === '') {
    const authCookie = useCookie('auth')
    authCookie.value = null
  }
});
</script>