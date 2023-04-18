<template>
  <div class="bg-white px-10 w-full py-2 mt-20 mb-24">
    <h1 class="text-3xl mb-3 font-bold" v-if="!searchQuery">Local Songs</h1>
    <h1 class="text-3xl mb-3 font-bold" v-if="searchQuery">Search Results</h1>
    <div class="relative overflow-auto rounded-lg shadow">
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
              class="p-3 text-sm text-gray-900 whitespace-nowrap text-left font-medium select-none"
              :key="index"
              @dblclick="songDblClicked(song)"
              v-if="song && (song.title.includes(searchQuery) || song.artist.includes(searchQuery) || song.album.includes(searchQuery))"
            >
              <span class="cursor-pointer">{{ song.title }}</span>
            </th>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
                v-if="song && (song.title.includes(searchQuery) || song.artist.includes(searchQuery) || song.album.includes(searchQuery))"
            >
              <span class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline">{{ song.artist }}</span>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
                v-if="song && (song.title.includes(searchQuery) || song.artist.includes(searchQuery) || song.album.includes(searchQuery))"
            >
              <span class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline">{{ song.album }}</span>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
                v-if="song && (song.title.includes(searchQuery) || song.artist.includes(searchQuery) || song.album.includes(searchQuery))"
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
import {computed} from "vue";

const store = useStore()
const songs = store.state.songs
const searchQuery = computed(() => store.state.searchContent)

const songDblClicked = (song) => {
  store.commit('setCurrentSong', song)
  // console.log('set currentSong as ', song.name)
}
</script>
