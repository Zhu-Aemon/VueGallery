<!-- LocalSongs.vue -->
<template>
  <div>
    <h1>Local Songs</h1>
    <ul>
      <li v-for="(song, index) in songs" :key="index" @click="play(song)">
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
  // blob:http://localhost:8080/1be4fdf3-3f1e-4ef4-95e6-54896cc52c02
}
</script>
