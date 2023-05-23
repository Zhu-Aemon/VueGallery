<template xmlns:span="http://www.w3.org/1999/html">
  <div class="text-2xl font-bold mt-24 ml-20">时下流行</div>
  <div class="grid grid-cols-5 gap-x-12 gap-y-8 ml-20 mr-20 mt-4">
    <div v-for="(pl, index) in specialPlaylistDetail">
      <img
        class="h-auto max-w-full rounded-[30px] cursor-pointer"
        :src="pl.coverUrl"
        alt=""
        @click="
          showPlaylist(pl.id, pl.nickname, pl.createTime, pl.coverUrl, pl.name)
        "
      />
      <div class="ml-2 mt-0.5 font-bold text-base select-none">
        {{ pl.name }}
      </div>
      <div class="ml-2 font-medium text-sm text-gray-500 select-none">
        by {{ pl.nickname }}
      </div>
    </div>
  </div>
  <div class="text-2xl font-bold mt-8 ml-20">
    <span class="cursor-pointer" :class="section === 'all' ? 'text-blue-700 py-2 px-1 cursor-pointer bg-gray-100 rounded-xl' : 'hover:bg-gray-100 hover:rounded-xl py-2 px-1'"
          @click="switchToAll"
    >历史Top 100</span>
    <span class="ml-4 cursor-pointer" :class="section === 'chinese' ? 'text-blue-700 py-2 px-1 cursor-pointer bg-gray-100 rounded-xl' : 'hover:bg-gray-100 hover:rounded-xl py-2 px-1'"
          @click="switchToChinese"
    >华语Top 100</span>
  </div>
  <div
    class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-4 ml-20 mr-20 mb-28"
  >
    <table class="w-full textho-gray-500 dark:text-gray-400">
      <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
      <tr>
        <th
          class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left"
        >
          最热单曲
        </th>
        <th
          class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left"
        >
          艺人
        </th>
        <th
          class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left"
        >
          专辑
        </th>
        <th
          class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left"
        >
          时长
        </th>
      </tr>
      </thead>
      <tbody class="divide-y bg-white">
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        v-for="(song, index) in songList"
      >
        <th
          class="p-3 text-sm text-gray-900 text-left font-medium select-none"
          @dblclick="songDblClickedAll(song)"
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
                  class="cursor-pointer hover:underline hover:text-blue-600"
                  @click="showAlbum(song.al.id)"
                >{{ song.al.name }}</span
                >
        </td>
        <td class="p-3 text-sm text-gray-700 select-none">
          {{formatTime(song.dt / 1000)}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import formatTime from "../utils/timeParse";

const store = useStore()
const router = useRouter()

const userCookie = computed(() => store.state.userCookie)
const specialPlaylist = [60198, 2774950802, 19723756, 3812895, 180106]
const specialPlaylistDetail = ref([])
const songList = ref([])
const section = ref('all')

onMounted(async () => {
  const cookie = userCookie.value
  for (const id of specialPlaylist) {
    const response = await axios({
      url: `http://localhost:3000/playlist/detail?id=${id}`,
      method: 'post',
      data: {
        cookie,
      },
    })
    specialPlaylistDetail.value.push({
      id: id,
      name: response.data.playlist.name,
      coverUrl: response.data.playlist.coverImgUrl,
      createTime: response.data.playlist.createTime,
      nickname: response.data.playlist.creator.nickname,
    })
  }
  await getSongList()
})

const showPlaylist = (playlistId, nickname, createTime, cover, name) => {
  router.push({
    name: 'playlist',
    query: {
      id: playlistId,
      creator: nickname,
      createTime: createTime,
      cover: cover,
      name: name,
    },
  })
}

const getSongList = async () => {
  const cookie = userCookie.value
  let id = 117586346
  if (section.value === 'all') {
    id = 117586346
  } else if (section.value === 'chinese') {
    id = 7638106051
  }
  // console.log(id)
  const response = await axios({
    url: `http://localhost:3000/playlist/track/all?id=${id}`,
    method: 'post',
    data: {
      cookie
    }
  })
  songList.value = response.data.songs
}

const songDblClickedAll = async (song) => {
  store.commit('setPlayLocal', false)
  store.commit('setCurrentMetadata', {
    name: song.name,
    album: song.al.name,
    artist: joinNames(song.ar),
  })
  store.commit('setNeteaseList', songList.value)
  store.commit('setCurrentSong', song)
}

function joinNames(arr) {
  // 使用map方法获取每个对象的name属性，然后使用join方法将它们连接起来
  return arr.map((item) => item.name).join('/')
}

const switchToChinese = async () => {
  section.value = 'chinese'
  // console.log(section.value)
  await getSongList()
}

const switchToAll = async () => {
  section.value = 'all'
  await getSongList()
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
