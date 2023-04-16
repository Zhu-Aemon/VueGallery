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
      const howl = new Howl({
        src: [currentSong.path],
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
