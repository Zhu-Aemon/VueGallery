<template>
  <div class="mt-20 mb-8">
    <div
      class="items-center justify-start hidden px-20 py-6 text-gray-500 dark:text-gray-400 md:flex"
    >
      <img alt="Cover" class="h-48 mr-3 rounded-[25px]" :src="picURL" />
      <li class="list-none">
        <div class="text-gray-600 dark:text-gray-400">
          <div class="text-base mb-5">
            <span
              class="font-extrabold text-4xl text-black dark:text-white ml-12"
              >{{ albumName }}</span
            >
          </div>
          <div class="ml-12 text-2xs text-black">
            <span class="font-medium">{{ `Album by ` }}</span>
            <span class="font-bold">{{ `${albumArtist}` }}</span>
          </div>
          <div class="font-medium ml-12 mt-1 text-sm text-black">
            <span>{{ `评论数：${commentCount || 0}` }}</span>
          </div>
          <div class="font-medium ml-12 mt-1 text-sm text-black">
            <span v-if="trackNumber > 1">{{
              `${formatDate(publishDate)} · ${trackNumber} Songs `
            }}</span>
            <span v-else>{{ `${formatDate(publishDate)} · 1 Song ` }}</span>
          </div>
          <div
            class="font-bold ml-12 mt-3 text-sm text-black max-h-limited line-clamp-limited overflow-hidden relative"
            ref="albumDescElement"
          >
            {{ albumDetail }}
          </div>
          <button
            v-if="isTruncated"
            class="ellipsis-below font-medium text-sm cursor-pointer ml-12 text-gray-500 hover:text-blue-600 hover:underline"
            @click="toggleFullDesc"
            type="button"
            ref="expandButton"
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
              <p class="font-bold text-2xl">{{ albumName }}</p>
              <p class="font-medium text-2xs mt-3">{{ albumDetail }}</p>
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
  <h1 class="text-2xl font-bold ml-20">单曲</h1>
  <div
    class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-6 ml-20 mr-20 mb-8"
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
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="(song, index) in albumSongs"
        >
          <th
            class="p-3 text-sm text-gray-900 whitespace-nowrap text-left font-medium select-none"
            @dblclick="songDblClicked(song)"
          >
            <span class="cursor-pointer">{{ song.name }}</span>
          </th>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap select-none">
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
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap select-none">
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
  <h1 class="text-2xl font-bold ml-20 mt-5">网易云评论</h1>
  <div
    class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-6 ml-20 mr-20 mb-28"
  >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="w-1/4 px-6 py-3">用户名</th>
          <th scope="col" class="w-3/4 px-6 py-3">评论</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(comment, index) in hotComments"
        >
          <th
            scope="row"
            class="flex items-center px-6 py-4 text-gray-900 dark:text-white"
          >
            <img
              class="w-10 h-10 rounded-full"
              :src="comment.user.avatarUrl"
              alt="Jese image"
            />
            <div class="pl-3">
              <div class="text-base font-semibold">
                {{ comment.user.nickname }}
              </div>
              <div class="font-normal text-gray-500">{{ comment.timeStr }}</div>
            </div>
          </th>
          <td class="px-6 py-4 text-black font-medium">
            {{ comment.content }}
            <div class="font-normal text-gray-500">
              {{ `❤️ ${comment.likedCount}` }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, watch, computed, nextTick, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import formatTime from '../utils/timeParse'
import { formatDate } from '../utils/timeParse'

const route = useRoute()
const router = useRouter()
const store = useStore()

let resizeObserver = null
let artistData = ref({})
let artistDetail = ref({})
let artistId = ref(0)
let albumDetail = ref(null)
let comments = ref({})
let isTruncated = ref(false)
let showPopup = ref(false)
const albumDescElement = ref(null)

const songs = computed(() => store.state.songs)
const picURL = ref(null)
const publishDate = ref(0)
const trackNumber = ref(0)
const albumName = ref(null)
const albumDesc = computed(() => artistDetail.value?.album?.description || '')
const albumArtist = ref(null)
const hotComments = computed(() => comments.value.hotComments)
const albumId = ref(0)
const commentCount = ref(0)
const albumSongs = ref()

const processedArtists = (song) => {
  if (song.artist.includes('/')) {
    return song.artist.split('/')
  } else if (song.artist.includes('&')) {
    return song.artist.split('&')
  }
  return [song.artist]
}

onMounted(async () => {
  albumId.value = route.query.album

  await axios
    .get(`http://localhost:3000/album/album?id=${albumId.value}`)
    .then((response) => {
      albumDetail.value = response.data.album.description
      // console.log(response.data)
      picURL.value = response.data.album.picUrl
      commentCount.value = response.data.album.info.commentCount
      albumName.value = response.data.album.name
      albumArtist.value = response.data.album.artist.name
      publishDate.value = response.data.album.publishTime
      trackNumber.value = response.data.songs.length
      albumSongs.value = response.data.songs
    })

  await axios
    .get(`http://localhost:3000/comment/album?id=${albumId.value}`)
    .then((response) => {
      comments.value = response.data
      // console.log(comments.value.hotComments[0])
    })

  if (!('ResizeObserver' in window)) return

  checkIfTruncated()
  resizeObserver = new ResizeObserver(() => {
    checkIfTruncated()
  })
  resizeObserver.observe(albumDescElement.value)
})

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

const showAlbum = (album) => {
  router.push({
    name: 'albumPage',
    query: {
      album: album,
    },
  })
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
</script>

<style scoped>
.ellipsis-below {
  display: inline-block;
  /*padding-left: 0.25rem;*/
}
</style>

<style scoped>
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
