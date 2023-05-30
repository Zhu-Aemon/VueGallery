import { computed, watch, defineEmits } from 'vue'
import store from '@/store'
import { Howl } from 'howler'
import EventBus from '@/utils/eventBus'
import axios from 'axios'

const playing = computed(() => store.state.playing)
const currentSong = computed(() => store.state.currentSong)
const volume = computed(() => store.state.volume)
const userCookie = computed(() => store.state.userCookie)
const soundQuality = computed(() => store.state.defaultQuality)

const emit = defineEmits(['song-end'])
let currentHowl = null

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
  await ReplaySong()
})

const getPlayUrl = async (id) => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/song/url/v1?id=${id}&level=${soundQuality.value}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  // console.log(response)
  if (response.data.data[0].level !== soundQuality.value) {
    store.commit('setQuality', response.data.data[0].level)
  }
  return response.data.data[0].url
}

const ReplaySong = async () => {
  let url = await getPlayUrl(currentSong.value.id)
  const howl = new Howl({
    src: [url],
    html5: true,
    volume: volume.value / 100,
    onerror: (error) => {
      console.error(error)
    },
    onend: () => {
      EventBus.emit('song-end')
      console.log('song ends!')
    },
  })
  if (currentHowl && currentHowl.playing()) {
    pauseMusic()
    currentHowl = howl
    playMusic()
  } else {
    currentHowl = howl
    playMusic()
  }
}

EventBus.on('replay', ReplaySong)
