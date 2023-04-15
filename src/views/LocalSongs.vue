<template>
  <div>
    <h1>Local Songs</h1>
    <div>
      <table class="table-auto border-x border-b">
        <thead>
        <tr>
          <th class="font-bold p-2 border-b border-l border-indigo-700 text-left bg-indigo-700 text-white tracking-wide">
            Song
          </th>
          <th class="font-bold p-2 border-b border-l border-indigo-700 text-left bg-indigo-700 text-white tracking-wide">
            Artist
          </th>
          <th class="font-bold p-2 border-b border-l border-indigo-700 text-left bg-indigo-700 text-white tracking-wide">
            Album
          </th>
          <th class="font-bold p-2 border-b border-l border-indigo-700 text-left bg-indigo-700 text-white tracking-wide">
            Duration
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd:bg-gray-100 hover:!bg-stone-200 py-1.5" v-for="(song, index) in songs">
          <th class="border-b border-l text-left py-1.5" :key='index' @dblclick='play(song)'>
            {{ song.name }}
          </th>
          <td class="px-2 border-b border-l text-left py-1.5">
            Artist here
          </td>
          <td class="px-2 border-b border-l text-left py-1.5">
            Album here
          </td>
          <td class="px-2 border-b border-l text-left py-1.5">
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
