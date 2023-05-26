import { createStore } from 'vuex'
import axios from 'axios'

const state = {
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
  defaultQuality: 'jymaster',
  qualitySetting: 'jymaster',
}

const showWelcomePage = localStorage.getItem('showWelcomePage')
if (showWelcomePage) {
  state.showWelcomePage = showWelcomePage
  console.log(showWelcomePage)
}

const songs = localStorage.getItem('songs')
if (songs) {
  state.songs = songs
}

// const playing = localStorage.getItem('playing')
// if (playing) {
//   state.playing = playing
// }

const currentSong = localStorage.getItem('currentSong')
if (currentSong) {
  state.currentSong = currentSong
}

const currentDuration = localStorage.getItem('currentDuration')
if (currentDuration) {
  state.currentDuration = currentDuration
}

const currentSongName = localStorage.getItem('currentSongName')
if (currentSongName) {
  state.currentSongName = currentSongName
}

const currentSongAlbum = localStorage.getItem('currentSongAlbum')
if (currentSongAlbum) {
  state.currentSongAlbum = currentSongAlbum
}

const currentSongArtist = localStorage.getItem('currentSongArtist')
if (currentSongArtist) {
  state.currentSongArtist = currentSongArtist
}

const userLoggedIn = localStorage.getItem('userLoggedIn')
if (userLoggedIn) {
  state.userLoggedIn = userLoggedIn
}

const userId = localStorage.getItem('userId')
if (userId) {
  state.userId = userId
}

const userName = localStorage.getItem('userName')
if (userName) {
  state.userName = userName
}

const userAvatar = localStorage.getItem('userAvatar')
if (userAvatar) {
  state.userAvatar = userAvatar
}

const createTime = localStorage.getItem('createTime')
if (createTime) {
  state.createTime = createTime
}

const userCookie = localStorage.getItem('userCookie')
if (userCookie) {
  state.userCookie = userCookie
}

const defaultQuality = localStorage.getItem('defaultQuality')
if (defaultQuality) {
  state.defaultQuality = defaultQuality
}

const store = createStore({
  state: state,
  mutations: {
    addFolderName(state, folderName) {
      if (!state.folderName.includes(folderName)) {
        state.folderName.push(folderName)
      }
    },
    setSongs(state, songs) {
      state.songs = songs
      localStorage.setItem('songs', songs)
    },
    togglePlayState(state) {
      state.playing = !state.playing
    },
    setCurrentSong(state, currentSong) {
      // console.log('set current!')
      state.currentSong = currentSong
      localStorage.setItem('currentSong', currentSong)
      let url = ''
      if (state.playLocal) {
        url = `file://${currentSong.path}`
        const howl = new Howl({
          src: [url],
          html5: true,
          volume: state.volume / 100,
          onload: () => {
            state.currentDuration = howl.duration()
            localStorage.setItem('currentDuration', state.currentDuration)
            console.log(state.currentDuration)
          },
        })
      } else {
        url = getPlayUrl(currentSong.id)
        state.currentDuration = currentSong.dt / 1000
        localStorage.setItem('currentDuration', state.currentDuration)
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
      localStorage.setItem('currentSongName', name)
      localStorage.setItem('currentSongAlbum', album)
      localStorage.setItem('currentSongArtist', artist)
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
      localStorage.setItem('userLoggedIn', loginState)
    },
    setUserId(state, userId) {
      state.userId = userId
      localStorage.setItem('userId', userId)
    },
    setUserName(state, username) {
      state.userName = username
      localStorage.setItem('userName', username)
    },
    setUserAvatar(state, url) {
      state.userAvatar = url
      localStorage.setItem('userAvatar', url)
    },
    setCreateTime(state, timestamp) {
      state.createTime = timestamp
      localStorage.setItem('createTime', timestamp)
    },
    setUserCookie(state, cookie) {
      state.userCookie = cookie
      localStorage.setItem('userCookie', cookie)
    },
    setPlayLocal(state, playLocal) {
      state.playLocal = playLocal
    },
    setNeteaseList(state, list) {
      state.neteaseList = list
    },
    setSection(state, section) {
      state.exploreSection = section
    },
    setQuality(state, quality) {
      state.defaultQuality = quality
    },
    setQualitySetting(state, quality) {
      state.defaultQuality = quality
      localStorage.setItem('defaultQuality', quality)
    }
  },
  actions: {
    // your actions here
  },
  getters: {
    // your getters here
  },
})

const getPlayUrl = async (id) => {
  const response = await axios.get(`http://localhost:3000/song/url?id=${id}`)
  return response.data.data.url
}

export default store
