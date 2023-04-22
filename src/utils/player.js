import { computed, watch, defineEmits } from 'vue'
import store from '@/store'
import { Howl } from 'howler'
import EventBus from '@/utils/eventBus'
import axios from 'axios'

const playing = computed(() => store.state.playing)
const currentSong = computed(() => store.state.currentSong)
const volume = computed(() => store.state.volume)
const emit = defineEmits(['song-end'])
let currentHowl = null
const userCookie = computed(() => store.state.userCookie)

watch(playing, (newValue, oldValue) => {
  if (newValue === true) {
    playMusic()
  } else {
    pauseMusic()
  }
})

const playMusic = () => {
  if (currentHowl) {
    currentHowl.play()
    store.commit('startPlay')
  }
}

const pauseMusic = () => {
  if (currentHowl) {
    currentHowl.pause()
    store.commit('stopPlay')
  }
}

watch(currentSong, async (newValue, oldValue) => {
  // console.log('old value is ', oldValue)
  // console.log('currentSong changed to', newValue)
  let url = ''
  if (store.state.playLocal) {
    url = `file://${newValue.path}`
  } else {
    url = await getPlayUrl(newValue.id)
    // console.log(url)
  }
  const howl = new Howl({
    src: [url],
    html5: true,
    volume: volume.value / 100,
    onerror: (error) => {
      console.error(error)
    },
    onend: () => {
      EventBus.emit('song-end')
    },
  })
  if (currentHowl && currentHowl.playing()) {
    // console.log('pause music and play', newValue)
    pauseMusic()
    currentHowl = howl
    playMusic()
  } else {
    // console.log('play new music', newValue)
    currentHowl = howl
    playMusic()
  }
})

const getPlayUrl = async (id) => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/song/url?id=${id}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  // console.log(response)
  return response.data.data[0].url
}