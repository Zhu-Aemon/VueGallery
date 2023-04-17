import { computed, watch } from 'vue'
import store from '@/store'
import { Howl } from 'howler'

const playing = computed(() => store.state.playing)
const currentSong = computed(() => store.state.currentSong)
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

watch(currentSong, (newValue, oldValue) => {
  // console.log('old value is ', oldValue)
  // console.log('currentSong changed to', newValue)
  if (newValue !== oldValue) {
    const url = `file://${newValue.path}`
    // console.log(url)
    const howl = new Howl({
      src: [url],
      html5: true,
      volume: 1,
      onerror: (error) => {
        console.error(error)
      },
    })
    // console.log(howl)
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
  }
})
