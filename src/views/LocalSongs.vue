<template>
  <div>
    <h1>Local Songs</h1>
    <div class="relative min-w-full overflow-x-auto columns-1">
      <table class="table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 min-w-[40%]">
            Song
          </th>
          <th scope="col" class="px-6 py-3 min-w-[20%]">
            Artist
          </th>
          <th scope="col" class="px-6 py-3 min-w-[20%]">
            Album
          </th>
          <th scope="col" class="px-6 py-3 min-w-[20%]">
            Duration
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(song, index) in songs">
          <th scope="row" class="px-6 py-1.5 font-medium text-gray-900 whitespace-nowrap dark:text-white min-w-[40%]" :key='index' @dblclick='play(song)'>
            {{ song.name }}
          </th>
          <td class="px-6 py-1.5 min-w-[20%]">
            Artist here
          </td>
          <td class="px-6 py-1.5 min-w-[20%]">
            Album here
          </td>
          <td class="px-6 py-1.5 min-w-[20%]">
            Duration here
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { useStore } from 'vuex'
import { Howl } from 'howler'

const store = useStore()
const songs = store.state.songs
let currentHowl = null

const play = (song) => {
  if (currentHowl) {
    currentHowl.pause()
  }

  const howl = new Howl({
    src: [song.path],
    html5: true,
    volume: 1,
    onerror: (error) => {
      console.error('Howl error:', error)
    }
  })

  howl.play()
  currentHowl = howl
}
</script>
