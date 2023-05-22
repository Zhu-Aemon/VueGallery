import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

const store = createStore({
  state: {
    showWelcomePage: true,
    folderName: [],
    songs: [],
    playing: false,
    currentSong: '',
    currentDuration: 180,
    currentSongName: '',
    currentSongAlbum: '',
    currentSongArtist: '',
    shuffle: 'loop',
    volume: 100,
    searchContent: '',
    componentKey: 0,
    userLoggedIn: false,
    userId: 0,
    userName: '',
    userAvatar: '',
    createTime: '',
    userCookie: '',
    playLocal: true,
    neteaseList: [],
    exploreSection: '',
  },
  mutations: {
    addFolderName(state, folderName) {
      if (!state.folderName.includes(folderName)) {
        state.folderName.push(folderName)
      }
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    togglePlayState(state) {
      state.playing = !state.playing
    },
    setCurrentSong(state, currentSong) {
      // console.log('set current!')
      state.currentSong = currentSong
      let url = ''
      if (state.playLocal) {
        url = `file://${currentSong.path}`
        const howl = new Howl({
          src: [url],
          html5: true,
          volume: state.volume / 100,
          onload: () => {
            state.currentDuration = howl.duration()
            console.log(state.currentDuration)
          },
        })
      } else {
        url = getPlayUrl(currentSong.id)
        state.currentDuration = currentSong.dt / 1000
      }
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
    },
    setShuffle(state, shuffle) {
      state.shuffle = shuffle
    },
    setVolume(state, volume) {
      state.volume = volume
    },
    setSearchContent(state, searchContent) {
      state.searchContent = searchContent
    },
    increaseKey(state) {
      state.componentKey++
    },
    setLoginState(state, loginState) {
      state.userLoggedIn = loginState
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setUserName(state, username) {
      state.userName = username
    },
    setUserAvatar(state, url) {
      state.userAvatar = url
    },
    setCreateTime(state, timestamp) {
      state.createTime = timestamp
    },
    setUserCookie(state, cookie) {
      state.userCookie = cookie
    },
    setPlayLocal(state, playLocal) {
      state.playLocal = playLocal
    },
    setNeteaseList(state, list) {
      state.neteaseList = list
    },
    setSection(state, section) {
      state.exploreSection = section
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

const getPlayUrl = async (id) => {
  const response = await axios.get(`http://localhost:3000/song/url?id=${id}`)
  return response.data.data.url
}

export default store
