<template>
  <div class="mt-20 mb-8">
    <div
      class="items-center justify-start hidden px-20 py-6 text-gray-500 dark:text-gray-400 md:flex"
    >
      <img
        :src="artistDetail.avatar"
        alt="Cover"
        class="h-48 mr-3 rounded-[25px]"
      />
      <li class="list-none">
        <div class="text-gray-600 dark:text-gray-400">
          <div class="text-base mb-5">
            <span
              class="font-extrabold text-4xl text-black dark:text-white ml-12"
              >{{ artistDetail.name }}</span
            >
          </div>
          <div class="font-bold ml-12 text-2xs text-gray-700">艺人</div>
          <div
            ref="albumDescElement"
            class="font-bold ml-12 mt-3 text-sm text-gray-700 max-h-limited line-clamp-limited overflow-hidden relative"
          >
            {{ artistDetail.briefDesc }}
          </div>
          <button
            v-if="isTruncated"
            ref="expandButton"
            class="ellipsis-below font-medium text-sm cursor-pointer ml-12 text-gray-500 hover:text-blue-600 hover:underline"
            type="button"
            @click="toggleFullDesc"
          >
            Click To Expand
          </button>
          <div
            v-show="showPopup"
            class="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center"
            @click="toggleFullDesc"
          >
            <div
              class="bg-white border-gray-700 w-3/4 max-h-96 mx-auto rounded-lg drop-shadow-lg p-6 overflow-y-auto custom-scrollbar"
              @click.stop
            >
              <p class="font-bold text-2xl">{{ artistDetail.name }}</p>
              <p class="font-medium text-2xs mt-3">
                {{ artistDetail.briefDesc }}
              </p>
              <button
                class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click="toggleFullDesc"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  </div>
  <div class="ml-20 text-xl font-medium">
    <span
      :class="
        showHottest === true
          ? 'cursor-pointer bg-gray-200 rounded-2xl py-2 px-4 text-blue-700 font-bold'
          : 'cursor-pointer hover:bg-gray-200 hover:rounded-2xl py-2 px-4 font-bold'
      "
      @click="setHottest"
      >最热单曲</span
    >
    <span
      :class="
        showHottest === false
          ? 'cursor-pointer bg-gray-200 rounded-2xl py-2 px-4 text-blue-700 font-bold ml-1'
          : 'cursor-pointer hover:bg-gray-200 hover:rounded-2xl py-2 px-4 font-bold ml-1'
      "
      @click="setAll"
      >全部单曲</span
    >
  </div>
  <div
    class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-6 ml-20 mr-20 mb-28"
  >
    <table class="w-full text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
        <tr>
          <th class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left">
            Song
          </th>
          <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
            Artist
          </th>
          <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
            Album
          </th>
          <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
            Duration
          </th>
        </tr>
      </thead>
      <tbody class="divide-y bg-white">
        <tr
          v-for="(song, index) in artistSongs"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            class="p-3 text-sm text-gray-900 text-left font-medium select-none"
            @dblclick="songDblClicked(song)"
          >
            <span class="cursor-pointer">{{ song.name }}</span>
          </th>
          <td class="p-3 text-sm text-gray-700 select-none">
            <span
              v-for="(artist, index) in song.ar"
              v-if="song.ar.length === 1"
              class="lg:hover:text-blue-600 lg:hover:underline cursor-pointer"
              @click="showArtist(artist.id)"
            >
              {{ artist.name }}
            </span>
            <span v-for="(artist, index) in song.ar" v-else>
              <span
                class="lg:hover:text-blue-600 lg:hover:underline cursor-pointer"
                @click="showArtist(artist.id)"
                >{{ artist.name }}</span
              >
              <span v-if="index !== song.ar.length - 1"> / </span>
            </span>
          </td>
          <td class="p-3 text-sm text-gray-700 select-none">
            <span
              class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline"
              @click="showAlbum(song.al.id)"
              >{{ song.al.name }}</span
            >
          </td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap select-none">
            {{ formatTime(song.dt / 1000) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import formatTime from '../utils/timeParse'

const route = useRoute()
const router = useRouter()
const store = useStore()

let resizeObserver = null
let artistData = ref({})
let artistDetail = ref({})
let artistSongs = ref([])
const artistId = ref(0)
let showPopup = ref(false)
let isTruncated = ref(false)
const albumDescElement = ref(null)
const showHottest = ref(true)
const songs = computed(() => store.state.songs)

const processedArtists = (song) => {
  if (song.artist.includes('/')) {
    return song.artist.split('/')
  } else if (song.artist.includes('&')) {
    return song.artist.split('&')
  }
  return [song.artist]
}

onMounted(async () => {
  artistId.value = route.query.artist
  // console.log(artistId.value)

  // http://localhost:3000/cloudsearch?keywords=keyword&type=100
  // 100: 歌手
  // axios
  // 	.get(
  // 		`http://localhost:3000/cloudsearch?keywords=${encodeURIComponent(
  // 			artist
  // 		)}&type=100`
  // 	)
  // 	.then((response) => {
  // 		// console.log(response)
  // 		artistData.value = response.data
  // 		artistId.value = artistData.value.result.artists[0].id
  // 		// console.log(artistData.result.artists[0].id)
  // 	})
  // 	.catch((error) => {
  // 		console.log(error)
  // 	})

  // http://localhost:3000/artist/detail?id=$id
  await axios
    .get(`http://localhost:3000/artist/detail?id=${artistId.value}`)
    .then((response) => {
      // console.log(response)
      artistDetail.value = response.data.data.artist
      // console.log(artistDetail)
    })

  await axios
    .get(`http://localhost:3000/artist/top/song?id=${artistId.value}`)
    .then((response) => {
      artistSongs.value = response.data.songs
    })

  if (!('ResizeObserver' in window)) return

  checkIfTruncated()
  resizeObserver = new ResizeObserver(() => {
    checkIfTruncated()
  })
  resizeObserver.observe(albumDescElement.value)
})

const showAlbum = (album) => {
  router.push({
    name: 'albumPage',
    query: {
      album: album,
    },
  })
  console.log(artist)
}

const songDblClicked = (song) => {
  store.commit('setCurrentSong', song)
  // console.log('set currentSong as ', song.name)
}

const showArtist = (artist) => {
  store.commit('increaseKey')
  router.push({
    name: 'artistPage',
    query: {
      artist: artist,
    },
  })
}

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

function checkIfTruncated() {
  if (!albumDescElement.value) return

  isTruncated.value =
    albumDescElement.value.scrollHeight > albumDescElement.value.clientHeight
  // console.log(isTruncated.value)
}

const toggleFullDesc = () => {
  showPopup.value = !showPopup.value
  if (showPopup.value) {
    document.body.classList.add('overflow-hidden')
    // console.log('added!')
  } else {
    document.body.classList.remove('overflow-hidden')
    // console.log('removed!')
  }
}

const setHottest = async () => {
  showHottest.value = true

  await axios
    .get(`http://localhost:3000/artist/top/song?id=${artistId.value}`)
    .then((response) => {
      artistSongs.value = response.data.songs
    })
}

const setAll = async () => {
  showHottest.value = false

  await axios
    .get(`http://localhost:3000/artist/songs?id=${artistId.value}&limit=200`)
    .then((response) => {
      artistSongs.value = response.data.songs
      // console.log(artistSongs.value)
    })
}
</script>

<style scoped>
.ellipsis-below {
  display: inline-block;
  /*padding-left: 0.25rem;*/
}

.custom-scrollbar::-webkit-scrollbar {
  width: 0.5rem;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 1rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Firefox scrollbar styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
