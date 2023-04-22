<template>
  <div
    class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600"
  >
    <!-- Album Cover and Song Description-->
    <div
      class="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex"
    >
      <img
        id="cover"
        alt="Cover"
        class="h-16 mr-3 rounded-xl"
        src="https://flowbite.com/docs/images/logo.svg"
      />
      <li class="list-none">
        <div class="text-gray-600 dark:text-gray-400">
          <div class="text-base font-normal">
            <span class="font-medium text-gray-900 dark:text-white">{{
              title
            }}</span>
          </div>
          <div class="text-sm font-normal">
            {{ artist }}
          </div>
        </div>
      </li>
    </div>
    <!-- 5 middle buttons-->
    <div class="flex items-center w-full">
      <div class="w-full">
        <div class="flex items-center justify-center mx-auto mb-1">
          <!-- Shuffle Song Button-->
          <button
            class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            data-tooltip-target="tooltip-shuffle"
            type="button"
            @click="shuffleMusic"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
                :fill="shuffleState === 'shuffle' ? 'blue' : 'currentColor'"
              />
            </svg>
            <span class="sr-only">Shuffle Song</span>
          </button>
          <div
            id="tooltip-shuffle"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            role="tooltip"
          >
            Shuffle Song
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!-- Previous Song Button-->
          <button
            class="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            data-tooltip-target="tooltip-previous"
            type="button"
            @click="playPrevious"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 320 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"
                fill="currentColor"
              />
            </svg>
            <span class="sr-only">Previous Song</span>
          </button>
          <div
            id="tooltip-previous"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            role="tooltip"
          >
            Previous Song
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!-- Play or Pause Button-->
          <button
            class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            data-tooltip-target="tooltip-pause"
            type="button"
            @click="togglePlay"
          >
            <svg
              aria-hidden="true"
              class="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 10 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="playing"
                clip-rule="evenodd"
                d="M0.625 1.375C0.625 1.02982 0.904823 0.75 1.25 0.75H2.5C2.84518 0.75 3.125 1.02982 3.125 1.375V12.625C3.125 12.9702 2.84518 13.25 2.5 13.25H1.25C1.08424 13.25 0.925268 13.1842 0.808058 13.0669C0.690848 12.9497 0.625 12.7908 0.625 12.625L0.625 1.375ZM6.875 1.375C6.875 1.02982 7.15482 0.75 7.5 0.75H8.75C8.91576 0.75 9.07473 0.815848 9.19194 0.933058C9.30915 1.05027 9.375 1.20924 9.375 1.375L9.375 12.625C9.375 12.9702 9.09518 13.25 8.75 13.25H7.5C7.15482 13.25 6.875 12.9702 6.875 12.625V1.375Z"
                fill="currentColor"
                fill-rule="evenodd"
              />
              <path
                v-else
                d="M1 1.375L11 7L1 12.625Z"
                clip-rule="evenodd"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Toggle Play</span>
          </button>
          <div
            id="tooltip-pause"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            role="tooltip"
          >
            Toggle Play
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!-- Next Song Button-->
          <button
            class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            data-tooltip-target="tooltip-next"
            type="button"
            @click="playNext"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 320 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"
                fill="currentColor"
              />
            </svg>
            <span class="sr-only">Next Song</span>
          </button>
          <div
            id="tooltip-next"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            role="tooltip"
          >
            Next Song
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!-- LoopSong Button-->
          <button
            class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
            data-tooltip-target="tooltip-restart"
            type="button"
            @click="loopSong"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"
                :fill="shuffleState === 'one' ? 'blue' : 'currentColor'"
              />
            </svg>
            <span class="sr-only">Loop Song</span>
          </button>
          <div
            id="tooltip-restart"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            role="tooltip"
          >
            Loop Song
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <!-- ProgressBar Component-->
        <div class="flex items-center justify-between space-x-2">
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{
            progressTimeDisplayed === 'NaN:NaN' ? '0:00' : progressTimeDisplayed
          }}</span>
          <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
            <div
              class="bg-blue-600 h-1.5 rounded-full"
              :style="progressBarStyle"
            ></div>
          </div>
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{
            displayTime
          }}</span>
        </div>
      </div>
    </div>
    <!-- 4 right buttons-->
    <div class="items-center justify-center hidden ml-auto md:flex">
      <!-- View PlayList Button-->
      <button
        v-if="false"
        class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            fill-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">View playlist</span>
      </button>
      <!-- ??Show Caption-->
      <button
        v-if="false"
        class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
        data-tooltip-target="tooltip-captions"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 576 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"
            fill="currentColor"
          />
        </svg>
        <span class="sr-only">Captions</span>
      </button>
      <div
        id="tooltip-captions"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        role="tooltip"
      >
        Toggle captions
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <!-- ??expand Button-->
      <button
        v-if="false"
        class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
        data-tooltip-target="tooltip-expand"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"
            fill="currentColor"
          />
        </svg>
        <span class="sr-only">Expand</span>
      </button>
      <div
        id="tooltip-expand"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        role="tooltip"
      >
        Full screen
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <!--Adjust Volume-->
      <button
        v-if="false"
        class="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
        data-popover-target="sound-slider"
        data-popover-trigger="click"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
            fill-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Adjust volume</span>
      </button>
      <div
        data-popover
        id="sound-slider"
        role="tooltip"
        class="absolute z-10 invisible inline-block w-auto text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <!--        <vue-slider-->
        <!--          v-model="volume"-->
        <!--          :min="0"-->
        <!--          :max="100"-->
        <!--          direction="btt"-->
        <!--        ></vue-slider>-->
        <div data-popper-arrow></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, watch, ref, onMounted } from 'vue'
import readMetadataAndSetCover from '../utils/metadata'
import formatTime from '../utils/timeParse'
import EventBus from '@/utils/eventBus'

const store = useStore()

const duration = computed(() => store.state.currentDuration)
const playing = computed(() => store.state.playing)
const title = computed(() => store.state.currentSongName)
const album = computed(() => store.state.currentSongAlbum)
const artist = computed(() => store.state.currentSongArtist)
const shuffleState = computed(() => store.state.shuffle)
const volume = computed(() => store.state.volume)
let displayTime = ref(formatTime(duration.value))
let progressTime = ref(0)
let intervalId = null
let currentSong = computed(() => store.state.currentSong)
let progressTimeDisplayed = ref(formatTime(progressTime))
let currentPlayList = computed(
  () => {
    if (store.state.playLocal) {
      return store.state.songs
    } else {
      return store.state.neteaseList
    }
  }
)

watch(artist, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // console.log(newValue)
  }
})

watch(title, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // console.log(newValue)
  }
})

watch(album, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // console.log(newValue)
  }
})

watch(currentSong, (newValue, oldValue) => {
  progressTime.value = 0
  if (store.state.playLocal) {
    readMetadataAndSetCover(newValue.path)
  } else {
    store.commit('setCurrentMetadata', {
      name: newValue.name,
      album: newValue.al.name,
      artist: joinNames(newValue.ar),
    })
    const coverImg = document.getElementById('cover')
    coverImg.src = newValue.al.picUrl
  }
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
  if (playing.value === true) {
    intervalId = setInterval(() => {
      progressTime.value += 1
      // console.log(progressTime.value)
    }, 1000)
  }
})

function joinNames(arr) {
  // 使用map方法获取每个对象的name属性，然后使用join方法将它们连接起来
  return arr.map(item => item.name).join('/');
}

watch(playing, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // console.log('state changed to', newValue)
    if (newValue === false) {
      // console.log('clear interval!')
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    } else {
      intervalId = setInterval(() => {
        progressTime.value += 1
        // console.log(progressTime.value)
      }, 1000)
    }
  }
})

watch(duration, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    displayTime.value = formatTime(newValue)
  }
})

watch(progressTime, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    progressTimeDisplayed.value = formatTime(newValue)
    // console.log(
    //   Math.floor((Number(progressTime.value) / Number(duration.value)) * 100)
    // )
  }
})

const progressBarStyle = computed(() => {
  const widthPercentage = Math.floor(
    (Number(progressTime.value) / Number(duration.value)) * 100
  )
  return {
    width: `${widthPercentage}%`,
  }
})

const shuffleMusic = () => {
  if (shuffleState.value !== 'shuffle') {
    store.commit('setShuffle', 'shuffle')
  } else {
    store.commit('setShuffle', 'loop')
  }
}

const loopSong = () => {
  if (shuffleState.value !== 'one') {
    store.commit('setShuffle', 'one')
  } else {
    store.commit('setShuffle', 'loop')
  }
  // console.log(shuffleState.value === 'one')
}

const playPrevious = () => {
  const tobeIndexed = currentSong.value
  const list = currentPlayList.value
  const index = list.indexOf(tobeIndexed) || 0
  store.commit('setCurrentSong', list[index - 1])
}

const togglePlay = () => {
  store.commit('togglePlayState')
}

const playNext = () => {
  if (shuffleState.value === 'loop') {
    const tobeIndexed = currentSong.value
    const list = currentPlayList.value
    const index = list.indexOf(tobeIndexed) || 0
    store.commit('setCurrentSong', list[index + 1])
  } else if (shuffleState.value === 'one') {
    const tobeIndexed = currentSong.value
    const list = currentPlayList.value
    const index = list.indexOf(tobeIndexed) || 0
    store.commit('setCurrentSong', list[index])
  } else {
    const list = currentPlayList.value
    const currentIndex = list.indexOf(currentSong.value) || 0
    let randomIndex = currentIndex
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * list.length)
    }
    store.commit('setCurrentSong', list[randomIndex])
  }
}

onMounted(() => {
  EventBus.on('song-end', songEnd)
})

const songEnd = () => {
  console.log('end!')
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
  playNext()
}
</script>
