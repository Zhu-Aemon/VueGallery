<template>
  <div class="bg-white px-10 w-full py-2 mt-20 mb-24">
    <h1 class="text-3xl mb-3 font-bold" v-if="!searchQuery">本地歌曲</h1>
    <h1 class="text-3xl mb-3 font-bold" v-if="searchQuery">搜索结果</h1>
    <div class="relative overflow-auto custom-scrollbar rounded-lg shadow">
      <table class="w-full text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
          <tr>
            <th class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left">
              Song
            </th>
            <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
              Artist
            </th>
            <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
              Album
            </th>
            <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
              Duration
            </th>
          </tr>
        </thead>
        <tbody class="divide-y bg-white">
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="(song, index) in songs"
          >
            <th
              class="p-3 text-sm text-gray-900 text-left font-medium select-none"
              :key="index"
              @dblclick="songDblClicked(song)"
              v-if="
                song &&
                (song.title.includes(searchQuery) ||
                  song.artist.includes(searchQuery) ||
                  song.album.includes(searchQuery))
              "
            >
              <span class="cursor-pointer">{{ song.title }}</span>
            </th>
            <td
              class="p-3 text-sm text-gray-700 select-none"
              v-if="
                song &&
                (song.title.includes(searchQuery) ||
                  song.artist.includes(searchQuery) ||
                  song.album.includes(searchQuery))
              "
            >
              <span
                class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline"
                v-if="song.artist.includes('/') || song.artist.includes('&')"
                v-for="(artist, index) in processedArtists(song)"
                @click="showArtist(artist)"
              >
                {{ artist }} /
              </span>
              <span
                class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline"
                v-else
                @click="showArtist(song.artist)"
              >
                {{ song.artist }}
              </span>
            </td>
            <td
              class="p-3 text-sm text-gray-700 select-none"
              v-if="
                song &&
                (song.title.includes(searchQuery) ||
                  song.artist.includes(searchQuery) ||
                  song.album.includes(searchQuery))
              "
            >
              <span
                class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline"
                @click="showAlbum(song.album, song.artist)"
                >{{ song.album }}</span
              >
            </td>
            <td
              class="p-3 text-sm text-gray-700 select-none"
              v-if="
                song &&
                (song.title.includes(searchQuery) ||
                  song.artist.includes(searchQuery) ||
                  song.album.includes(searchQuery))
              "
            >
              {{ formatTime(song.duration) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import formatTime from '../utils/timeParse'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const songs = store.state.songs
const searchQuery = computed(() => store.state.searchContent)

const songDblClicked = (song) => {
  store.commit('setCurrentSong', song)
  // console.log('set currentSong as ', song.name)
}

const showArtist = (artist) => {
  router.push({
    name: 'artistPage',
    query: {
      artist: artist,
    },
  })
}

const showAlbum = (album, artist) => {
  router.push({
    name: 'albumPage',
    query: {
      album: album,
      artist: artist,
    },
  })
}

const processedArtists = (song) => {
  if (song.artist.includes('/')) {
    return song.artist.split('/')
  } else if (song.artist.includes('&')) {
    return song.artist.split('&')
  }
  return [song.artist]
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 0.5rem;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 1rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Firefox scrollbar styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
