<!-- LocalSongs.vue -->
<template>
  <div>
    <h1>Local Songs</h1>
    <ul>
      <li v-for="(song, index) in songs" :key="index" @dblclick="play(song)">
        {{ song.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const songs = store.state.songs

const play = (song) => {
  window.electron.ipcRenderer.send('play-song', song.path)
  console.log(song.path)
}
</script>
