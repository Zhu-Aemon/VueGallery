import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    showWelcomePage: true,
    folderName: '',
    songs: [],
    playing: false,
    currentSong: '',
    currentDuration: 180,
    currentSongName: '',
    currentSongAlbum: '',
    currentSongArtist: '',
  },
  mutations: {
    setFolderName(state, folderName) {
      state.folderName = folderName
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    togglePlayState(state) {
      state.playing = !state.playing
    },
    setCurrentSong(state, currentSong) {
      state.currentSong = currentSong
      const url = `file://${currentSong.path}`
      const howl = new Howl({
        src: [url],
        onload: () => {
          state.currentDuration = howl.duration()
          // console.log(state.currentDuration)
        },
      })
    },
    stopPlay(state) {
      state.playing = false
    },
    startPlay(state) {
      state.playing = true
    },
    setCurrentMetadata(state, { name, album, artist }) {
      state.currentSongName = name
      state.currentSongAlbum = album
      state.currentSongArtist = artist
      // console.log('commited data:', name, album, artist)
    }
  },
  actions: {
    // your actions here
  },
  getters: {
    // your getters here
  },
  plugins: [createPersistedState()],
})

export default store
