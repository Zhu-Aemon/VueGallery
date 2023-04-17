<template>
  <div class="bg-white px-10 w-full py-2 mt-20 mb-24">
    <h1 class="text-3xl mb-3 font-bold">Local Songs</h1>
    <div class="relative overflow-auto rounded-lg shadow">
      <table class="w-full text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
          <tr>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Song
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Artist
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Album
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
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
              class="w-32 p-3 text-sm text-gray-900 whitespace-nowrap text-left font-medium cursor-pointer select-none"
              :key="index"
              @dblclick="songDblClicked(song)"
            >
              {{ song.title }}
            </th>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ song.artist }}</td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ song.album }}</td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
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

const store = useStore()
const songs = store.state.songs

const songDblClicked = (song) => {
  store.commit('setCurrentSong', song)
  // console.log('set currentSong as ', song.name)
}
</script>
