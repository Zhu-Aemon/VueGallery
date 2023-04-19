<template>
  <div class="mt-20 mb-8">
    <div
      class="items-center justify-start hidden px-20 py-6 text-gray-500 dark:text-gray-400 md:flex"
    >
      <img alt="Cover" class="h-48 mr-3 rounded-xl" :src="picURL" />
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
            <span>{{
              `评论数：${albumComment || 0} 分享数：${albumShare}`
            }}</span>
          </div>
          <div class="font-medium ml-12 mt-1 text-sm text-black">
            <span v-if='trackNumber > 1'>{{
                `${ formatDate(publishDate)} · ${trackNumber} Songs `
              }}</span>
            <span v-else>{{
                `${ formatDate(publishDate)} · 1 Song `
              }}</span>
          </div>
          <div class="font-bold ml-12 mt-3 text-sm text-black">
            {{ albumDesc }}
          </div>
        </div>
      </li>
    </div>
  </div>
  <h1 class="text-2xl font-bold ml-20">单曲</h1>
  <div class="rounded-lg shadow ml-20 mr-20 mt-6">
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
          v-for="(song, index) in songs"
        >
          <th
            class="p-3 text-sm text-gray-900 whitespace-nowrap text-left font-medium select-none"
            :key="index"
            @dblclick="songDblClicked(song)"
            v-if="song && song.album === route.query.album"
          >
            <span class="cursor-pointer">{{ song.title }}</span>
          </th>
          <td
            class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
            v-if="song && song.album === route.query.album"
          >
            <span
              class="lg:hover:text-blue-600 lg:hover:underline"
              v-if="song.artist.includes('/')"
              v-for="(artist, index) in processedArtists(song)"
              @click="showArtist(artist)"
            >
              {{ artist }} /
            </span>
            <span
              class="lg:hover:text-blue-600 lg:hover:underline"
              v-else
              @click="showArtist(song.artist)"
            >
              {{ song.artist }}
            </span>
          </td>
          <td
            class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
            v-if="song && song.album === route.query.album"
          >
            <span
              class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline"
              @click="showAlbum(song.album)"
              >{{ song.album }}</span
            >
          </td>
          <td
            class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
            v-if="song && song.album === route.query.album"
          >
            {{ formatTime(song.duration) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h1 class="text-2xl font-bold ml-20 mt-5">评论</h1>
  <div class="rounded-lg shadow ml-20 mr-20 mt-6 mb-28">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="w-1/4 px-6 py-3">
          用户名
        </th>
        <th scope="col" class="w-3/4 px-6 py-3">
          评论
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for='(comment, index) in hotComments'
      >

        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 dark:text-white">
          <img class="w-10 h-10 rounded-full" :src="comment.user.avatarUrl" alt="Jese image">
          <div class="pl-3">
            <div class="text-base font-semibold">{{ comment.user.nickname }}</div>
            <div class="font-normal text-gray-500">{{ comment.timeStr }}</div>
          </div>
        </th>
        <td class="px-6 py-4 text-black font-medium">
          {{ comment.content }}
          <div class="font-normal text-gray-500">{{ `❤️ ${comment.likedCount}` }}</div>
        </td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import formatTime from '../utils/timeParse'
import { formatDate } from '../utils/timeParse'

const route = useRoute()
const router = useRouter()
const store = useStore()

let artistData = ref({})
let artistDetail = ref({})
let artistId = ref(0)
let albumDetail = ref({})
let comments = ref({})
const songs = computed(() => store.state.songs)
const picURL = computed(
  () =>
    artistDetail.value?.album?.picUrl ||
    'https://flowbite.com/docs/images/logo.svg'
)
const publishDate = computed(
  () =>
    artistDetail.value?.album?.publishTime
)
const trackNumber = computed(
  () =>
    artistDetail.value?.album?.size
)
const albumName = computed(
  () => artistDetail.value?.album?.name || '404 NOT FOUND'
)
const albumDesc = computed(() => artistDetail.value?.album?.description || '')
const albumArtist = computed(
  () => artistDetail.value?.album?.artists[0].name || ''
)
const albumComment = computed(() => albumDetail.value?.commentCount)
const albumShare = computed(() => albumDetail.value?.shareCount)
const hotComments = computed(() => comments.value.hotComments)

const processedArtists = (song) => {
  if (song.artist.includes('/')) {
    return song.artist.split('/')
  }
  return [song.artist]
}

onMounted(() => {
  const artist = route.query.album
  const artistName = route.query.artist

  // http://localhost:3000/cloudsearch?keywords=keyword&type=10
  // 100: 专辑
  axios
    .get(
      `http://localhost:3000/cloudsearch?keywords=${encodeURIComponent(
        artist
      )}&type=10&limit=100`
    )
    .then((response) => {
      // console.log(response)
      artistData.value = response.data
      for (const al of artistData.value.result.albums) {
        // console.log(artistName, al.artist.name)
        if (artistName.includes(al.artist.name)) {
          artistId.value = al.id
          // console.log(artistId.value)
          return true
        }
      }
      // console.log(artistData.result.artists[0].id)
    })
    .catch((error) => {
      console.error(error)
    })

  watch(artistId, (newValue, oldValue) => {
    if (newValue !== 0) {
      // http://localhost:3000/album?id=id
      axios
        .get(`http://localhost:3000/album?id=${artistId.value}`)
        .then((response) => {
          // console.log(response)
          artistDetail.value = response.data
          // console.log(artistDetail.value.album)
        })

      axios
        .get(`http://localhost:3000/album/detail/dynamic?id=${artistId.value}`)
        .then((response) => {
          albumDetail.value = response.data
          // console.log(albumDetail.value.commentCount)
        })

      axios
        .get(`http://localhost:3000/comment/album?id=${artistId.value}`)
        .then((response) => {
          comments.value = response.data
          // console.log(comments.value.hotComments[0])
        })
    }
  })
})

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
</script>
