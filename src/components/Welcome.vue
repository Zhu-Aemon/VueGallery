<template>
  <div>
    <div>
      <i class="fa-solid fa-sun fa-2xl"></i>
    </div>
    <h1>Welcome to Gallery!</h1>
    <h2>
      Gallery is a dedicated project aims at providing the best experience for
      local music management
    </h2>
    <h2>Start by select the music folder in your PC</h2>
    <input
      type="file"
      webkitdirectory
      @change="loadSongs"
      hidden
      ref="fileInput"
    />
    <button @click="$refs.fileInput.click()">Select Folder</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const loadSongs = async (event) => {
  const folder = event.target.files[0].webkitRelativePath.split('/')[0]
  store.commit('setFolderName', folder)
  const songs = await getSongs(event.target.files)
  displaySongs(songs)
}

const getSongs = async (files) => {
  const audioFiles = []
  for (const file of files) {
    if (file.type.startsWith('audio')) {
      audioFiles.push(file)
    }
  }
  return audioFiles
}

const displaySongs = (songs) => {
  store.commit('setSongs', songs)
  router.push({ name: 'songList' })
}
</script>
