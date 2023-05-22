<template>
  <div class="mt-20 mb-28">
    <div
      class="items-center justify-start hidden px-20 py-6 text-gray-500 dark:text-gray-400 md:flex"
    >
      <img alt="Cover" class="h-48 mr-3 rounded-xl" :src="coverUrl" />
      <li class="list-none">
        <div class="text-gray-600 dark:text-gray-400">
          <div class="text-base mb-5">
            <span
              class="font-extrabold text-4xl text-black dark:text-white ml-12"
            >{{ playlistName }}</span
            >
          </div>
          <div class="ml-12 text-2xs text-black">
            <span class="font-medium">{{ `PlayList by ` }}</span>
            <span class="font-bold">{{ creator || '' }}</span>
          </div>
          <div class="font-medium ml-12 mt-1 text-sm text-black">
            <span v-if="trackNumber > 1">{{
                `${formatDate(Number(createTime)) || ''} · ${trackNumber} Songs `
              }}</span>
            <span v-else>{{ `${formatDate(Number(createTime)) || ''} · 1 Song ` }}</span>
          </div>
        </div>
      </li>
    </div>
    <div class="ml-20 text-2xl font-bold">
      歌单内容
    </div>
    <div class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-4 ml-20 mr-20">
      <table class="w-full textho-gray-500 dark:text-gray-400">
        <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
        <tr>
          <th class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left">
            Songs
          </th>
          <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
            Artist
          </th>
          <th class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left">
            Album
          </th>
        </tr>
        </thead>
        <tbody class="divide-y bg-white">
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-if="songs"
          v-for="(song, index) in songs"
        >
          <th
            class="p-3 text-sm text-gray-900 text-left font-medium select-none"
            @dblclick='songDblClickedPlaylist(song)'
          >
            <span class="cursor-pointer">{{ song.name }}</span>
          </th>
          <td
            class="p-3 text-sm text-gray-700 select-none"
          >
              <span
	              v-for="(artist, index) in song.ar"
	              v-if="song.ar.length === 1"
	              class="lg:hover:text-blue-600 lg:hover:underline cursor-pointer"
	              @click="showArtist(artist.id)"
              >
              {{ artist.name }}
            </span>
	          <span
		          v-for="(artist, index) in song.ar"
		          v-else
	          >
		          <span class="lg:hover:text-blue-600 lg:hover:underline cursor-pointer"
		                @click="showArtist(artist.id)">{{ artist.name }}</span>
		          <span v-if="index !== song.ar.length - 1"> / </span>
            </span>
          </td>
          <td class="p-3 text-sm text-gray-700 select-none">
            <span class="cursor-pointer hover:underline hover:text-blue-600" @click='showAlbum(song.al.id)'>{{ song.al.name }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { useStore } from 'vuex'
import axios from 'axios'
import { formatDate } from "../utils/timeParse";

const router = useRouter()
const route = useRoute()
const store = useStore()

const playlistId = ref(route.query.id)
const creator = ref(route.query.creator)
const createTime = ref(route.query.createTime)
const coverUrl = ref(route.query.cover)
const playlistName = ref(route.query.name)

const songs = ref(null)
const trackNumber = computed(() => songs?.value?.length || 0)

const userCookie = computed(() => store.state.userCookie)

const getSongs = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/playlist/track/all?id=${playlistId.value}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  songs.value = response.data.songs
}

onMounted(() => {
  getSongs()
})

const songDblClickedPlaylist = (song) => {
  store.commit('setPlayLocal', false)
  store.commit('setCurrentMetadata', {
    name: song.name,
    album: song.al.name,
    artist: joinNames(song.ar)
  })
  store.commit('setNeteaseList', songs.value)
  store.commit('setCurrentSong', song)
}

function joinNames(arr) {
  // 使用map方法获取每个对象的name属性，然后使用join方法将它们连接起来
  return arr.map(item => item.name).join('/');
}

const showArtist = (artist) => {
  router.push({
    name: 'artistPage',
    query: {
      artist: artist,
    },
  })
}

const showAlbum = (album) => {
  router.push({
    name: 'albumPage',
    query: {
      album: album,
    },
  })
}

</script>
