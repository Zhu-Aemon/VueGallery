// store.js or store/index.js
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state: {
    showWelcomePage: true,
    folderName: '',
    songs: [],
  },
  mutations: {
    setFolderName(state, folderName) {
      state.folderName = folderName
    },
    setSongs(state, songs) {
      state.songs = songs
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
