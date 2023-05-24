<template>
  <div class="mt-20 mb-28 ml-20 mr-20">
    <div class="text-2xl font-bold">搜索结果</div>
    <div class="flex justify-between">
      <div>
        <div class="text-xl font-bold mt-2">歌手</div>
        <div class="flex">
          <div class="mr-4 mt-2" v-if="artistResult" v-for="(artist, index) in artistResult.artists">
            <!--      {{artist}}-->
            <img
              class="h-48 w-48 rounded-full cursor-pointer"
              :src="artist.img1v1Url"
              alt=""
              @click="
          showArtist(artist.id)
        "
            />
            <div class="font-medium w-48 flex justify-center">{{artist.name}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-xl font-bold mt-2">专辑</div>
        <div class="flex">
          <div class="mr-4 mt-2" v-if="albumResult" v-for="(album, index) in albumResult">
            <!--      {{artist}}-->
            <img
              class="h-48 w-48 rounded-[15px] cursor-pointer"
              :src="album.picUrl"
              alt=""
              @click="
          showAlbum(album.id)
        "
            />
            <div class="font-medium ml-1 text-sm w-48">{{album.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-xl font-bold mt-4">播放列表</div>
    <div class="flex">
      <div class="mr-4 mt-2" v-if="playlistResult" v-for="(playlist, index) in playlistResult">
        <!--      {{artist}}-->
        <img
          class="h-48 w-48 rounded-[15px] cursor-pointer"
          :src="playlist.coverImgUrl"
          alt=""
          @click="
          showPlaylist(playlist.id, playlist.creator.nickname, 0, playlist.coverImgUrl, playlist.name)
        "
        />
        <div class="font-medium ml-1 text-sm w-48">{{playlist.name}}</div>
      </div>
    </div>
    <div class="text-2xl font-bold mt-4">
      单曲
    </div>
    <div
      class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-4 mb-28"
    >
      <table class="w-full textho-gray-500 dark:text-gray-400">
        <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
        <tr>
          <th
            class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left"
          >
            单曲
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
          v-for="(song, index) in songResult"
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
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue"
import {useStore} from "vuex"
import {useRouter, useRoute} from "vue-router"
import axios from "axios"
import formatTime from "@/utils/timeParse";

const store = useStore()
const router = useRouter()
const route = useRoute()

const userCookie = computed(() => store.state.userCookie)

const searchContent = ref('Martin Garrix')
const albumResult = ref(null)
const artistResult = ref(null)
const songResult = ref(null)
const playlistResult = ref(null)

onMounted(async () => {
  searchContent.value = route.query.content
  const cookie = userCookie.value

  const response = await axios({
    url: `http://localhost:3000/search?keywords=${searchContent.value}&type=1018`,
    method: 'post',
    data: {
      cookie
    }
  })

  console.log(response)
  albumResult.value = response.data.result.album.albums
  artistResult.value = response.data.result.artist
  songResult.value = response.data.result.song.songs
  playlistResult.value = response.data.result.playList.playLists
})

const showArtist = (artist) => {
  store.commit('increaseKey')
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

const songDblClicked = (song) => {
  store.commit('setCurrentSong', song)
  // console.log('set currentSong as ', song.name)
}
</script>
