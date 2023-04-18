<template>
  <div class="mt-20 mb-8">
    <div
      class="items-center justify-start hidden px-20 py-6 text-gray-500 dark:text-gray-400 md:flex"
    >
      <img
        alt="Cover"
        class="h-48 mr-3 rounded-xl"
        :src="artistDetail.avatar"
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
          <div class="font-bold ml-12 mt-3 text-sm text-gray-700">
            {{ artistDetail.briefDesc }}
          </div>
        </div>
      </li>
    </div>
  </div>
  <h1 class="text-2xl font-bold ml-20">单曲</h1>
  <div class="rounded-lg shadow ml-20 mr-20 mt-6 mb-28">
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
          v-if="song && song.artist.includes(route.query.artist)"
        >
          <span class="cursor-pointer">{{ song.title }}</span>
        </th>
        <td
          class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
          v-if="song && song.artist.includes(route.query.artist)"
        >
            <span
              class="lg:hover:text-blue-600 lg:hover:underline"
              v-if='song.artist.includes("/")'
              v-for="(artist, index) in processedArtists(song)"
              @click='showArtist(artist)'
            >
              {{ artist }} /
            </span>
          <span
            class="lg:hover:text-blue-600 lg:hover:underline"
            v-else
            @click='showArtist(song.artist)'
          >
              {{ song.artist }}
            </span>
        </td>
        <td
          class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
          v-if="song && song.artist.includes(route.query.artist)"
        >
            <span
              class="cursor-pointer lg:hover:text-blue-600 lg:hover:underline"
              @click="showAlbum(song.album)"
            >{{ song.album }}</span
            >
        </td>
        <td
          class="p-3 text-sm text-gray-700 whitespace-nowrap select-none"
          v-if="song && song.artist.includes(route.query.artist)"
        >
          {{ formatTime(song.duration) }}
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

const route = useRoute()
const router = useRouter()
const store = useStore()

let artistData = ref({})
let artistDetail = ref({})
let artistId = ref(0)
const songs = computed(() => store.state.songs)
const processedArtists = (song) => {
  if (song.artist.includes('/')) {
    return song.artist.split('/');
  }
  return [song.artist];
};

onMounted(() => {
  const artist = route.query.artist

  // http://localhost:3000/cloudsearch?keywords=keyword&type=100
  // 100: 歌手
  axios
    .get(
      `http://localhost:3000/cloudsearch?keywords=${encodeURIComponent(
        artist
      )}&type=100`
    )
    .then((response) => {
      // console.log(response)
      artistData.value = response.data
      artistId.value = artistData.value.result.artists[0].id
      // console.log(artistData.result.artists[0].id)
    })
    .catch((error) => {
      console.log(error)
    })

  watch(artistId, (newValue, oldValue) => {
    if (newValue !== 0) {
      // http://localhost:3000/artist/detail?id=$id
      axios
        .get(`http://localhost:3000/artist/detail?id=${artistId.value}`)
        .then((response) => {
          // console.log(response)
          artistDetail.value = response.data.data.artist
          console.log(artistDetail)
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
  router.push({
    name: 'artistPage',
    query: {
      artist: artist,
    },
  })
}
</script>
