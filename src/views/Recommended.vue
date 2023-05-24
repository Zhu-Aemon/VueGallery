<template>
  <div class="mb-28">
    <div class="text-2xl font-bold mt-24 ml-20">每日歌单</div>
    <div class="grid grid-cols-5 gap-x-12 gap-y-8 ml-20 mr-20 mt-4">
      <div v-for="(pl, index) in RecommendedPlaylist">
        <img
          class="h-auto max-w-full rounded-[30px] cursor-pointer"
          :src="pl.picUrl"
          alt=""
          @click="
          showPlaylist(pl.id, pl.creator.nickname, pl.createTime, pl.picUrl, pl.name)
        "
        />
        <div class="ml-2 mt-0.5 font-bold text-base select-none">
          {{ pl.name }}
        </div>
        <div class="ml-2 font-medium text-sm text-gray-500 select-none">
          by {{ pl.creator.nickname }}
        </div>
      </div>
    </div>
    <div class="mt-8 text-2xl font-bold ml-20">
      曲风偏好
    </div>
    <div class="mt-4 ml-20">
      <div class="flex">
        <div v-for="(tag, index) in tagPreference" class="px-2 mr-5 cursor-pointer py-1 inline-block bg-gray-100 rounded-xl">
          <div @click="tagClicked(tag)" class="font-bold select-none" :class="tag.tagName === currentClass ? 'text-blue-800' : ''">{{`${tag.tagName} ${tag.ratio}%`}}</div>
          <div v-show="currentClass === tag.tagName" :id="tag.tagName" class="h-1.5 rounded-full"></div>
        </div>
      </div>
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
          v-for="(song, index) in recommendedSongs"
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import formatTime from "@/utils/timeParse";

const store = useStore()
const router = useRouter()

const userCookie = computed(() => store.state.userCookie)
const tagPreference = ref(null)
const currentClass = ref('电子')
const currentTagId = ref(1015)
const RecommendedPlaylist = ref([])
const recommendedSongs = ref([])

onMounted(async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/recommend/resource`,
    method: 'post',
    data: {
      cookie
    }
  })
  // console.log(response.data)
  RecommendedPlaylist.value = response.data.recommend
  await getUserPreference()
  assignClassProperty()
  await getSongsByTag()
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

const getUserPreference = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/style/preference`,
    method: 'post',
    data: {
      cookie
    }
  })
  // console.log(response.data)
  tagPreference.value = response.data.data.tagPreferenceVos
  // console.log(tagPreference.value)
}

function calculate(percentage) {
  const white = { r: 104, g: 132, b: 242 };
  const blue = { r: 0, g: 0, b: 255 };

  let result = {};

  Object.keys(white).forEach((key) => {
    let start = white[key];
    let end = blue[key];
    let offset = (start - end) * percentage;

    if (offset >= 0) {
      offset = Math.abs(offset);
    }

    result[key] = Math.round(start - offset).toString(16).padStart(2, '0');
  });

  return `#${result.r}${result.g}${result.b}`;
}



const assignClassProperty = () => {
  for (const tag of tagPreference.value) {
    if (tag.tagName === currentClass.value) {
      const element = document.getElementById(tag.tagName)
      element.style.setProperty('background-color', calculate(tag.ratio / 100))
    }
  }
}

const tagClicked = async (tag) => {
  currentClass.value = tag.tagName
  currentTagId.value = tag.tagId
  assignClassProperty()
  await getSongsByTag()
}

const getSongsByTag = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/style/song?tagId=${currentTagId.value}&sort=0`,
    method: 'post',
    data: {
      cookie
    }
  })
  recommendedSongs.value = response.data.data.songs
  // console.log(recommendedSongs.value)
}

const songDblClicked = async (song) => {
  store.commit('setPlayLocal', false)
  store.commit('setCurrentMetadata', {
    name: song.name,
    album: song.al.name,
    artist: joinNames(song.ar),
  })
  store.commit('setNeteaseList', recommendedSongs.value)
  store.commit('setCurrentSong', song)
}

function joinNames(arr) {
  // 使用map方法获取每个对象的name属性，然后使用join方法将它们连接起来
  return arr.map((item) => item.name).join('/')
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
