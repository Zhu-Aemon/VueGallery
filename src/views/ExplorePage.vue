<template>
  <div class="mt-20 mb-24">
    <div class="items-center flex">
      <div
        class="bg-gray-50 shadow-lg ml-20 inline-block px-14 py-4 rounded-[20px] items-center"
      >
        <div class="flex flex-row items-center">
          <div class="justify-center align-middle items-center mr-6">
            <img :src="avatarUrl" class="rounded-[10px]" alt="avatar" width="80" />
          </div>
          <li class="list-none mt-2 flex flex-col items-center">
            <h2 class="font-bold text-2xl text-gray-800">{{ username }}</h2>
            <span class="font-normal text-sm mt-2 text-gray-700 opacity-90">{{
              `${formatDate(createTime)}加入`
            }}</span>
          </li>
        </div>
      </div>
      <div
        class="bg-gray-50 shadow-lg ml-10 inline-block px-8 py-4 rounded-[20px] items-center"
      >
        <i class="fa-solid fa-file-invoice fa-2xl"></i>
        <div class="text-black font-bold text-3xl mt-6">
          {{ level }}
        </div>
        <div class="font-medium text-gray-700 text-xl">
          你的等级
        </div>
      </div>
      <div
        class="bg-gray-50 shadow-lg ml-10 inline-block px-8 py-4 rounded-[20px] items-center"
      >
        <i class="fa-solid fa-music fa-2xl"></i>
        <div class="text-black font-bold text-3xl mt-6">
          {{ listened }} 首
        </div>
        <div class="font-medium text-gray-700 text-xl">
          已经听过
        </div>
      </div>
      <div
        class="bg-gray-50 shadow-lg ml-10 inline-block px-8 py-4 rounded-[20px] items-center"
      >
        <i class="fa-solid fa-calendar-days fa-2xl"></i>
        <div class="text-black font-bold text-3xl mt-6">
          {{ createDayS }} 天
        </div>
        <div class="font-medium text-gray-700 text-xl">
          已经加入云村
        </div>
      </div>
      <div
        class="bg-gray-50 shadow-lg ml-10 mr-20 inline-block px-8 py-4 rounded-[20px] items-center"
      >
        <i class="fa-solid fa-heart fa-2xl"></i>
        <div class="text-black font-bold text-3xl mt-6">
          {{ likeList?.length || 0 }}
        </div>
        <div class="font-medium text-gray-700 text-xl">
          喜欢的音乐
        </div>
      </div>
    </div>
    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
    <div class="mt-4">
      <div class="ml-20 text-2xl font-bold"><span class="cursor-pointer hover:underline hover:text-blue-600">每日推荐</span></div>
      <div class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-6 ml-20 mr-20">
        <table class="w-full textho-gray-500 dark:text-gray-400">
          <thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
          <tr>
            <th class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left">
              Top Recommended
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
            v-for="(song, index) in songs.slice(0, 5)"
          >
            <th
              class="p-3 text-sm text-gray-900 text-left font-medium select-none"
            >
              <span class="cursor-pointer">{{ song.name }}</span>
            </th>
            <td
              class="p-3 text-sm text-gray-700 select-none"
            >
              <span v-for="ar in song.ar" v-if="song.ar.length > 1" class="cursor-pointer hover:underline hover:text-blue-600">
                {{ ar.name }} /
              </span>
              <span v-else class="cursor-pointer hover:underline hover:text-blue-600">
                {{ song.ar[0].name }}
              </span>
            </td>
            <td class="p-3 text-sm text-gray-700 select-none">
              <span class="cursor-pointer hover:underline hover:text-blue-600">{{ song.al.name }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import formatTime, { formatDate } from '../utils/timeParse'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const username = computed(() => store.state.userName)
const userId = computed(() => store.state.userId)
const avatarUrl = computed(() => store.state.userAvatar)
const createTime = computed(() => store.state.createTime)
const userCookie = computed(() => store.state.userCookie)

const level = ref(0)
const listened = ref(0)
const createDayS = ref(0)
const songs = ref(null)
const likeList = ref(null)

const get_user_info = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/user/account?timestamp=${Date.now()}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  // console.log('/user/account, ', response.data)
  const username = response.data.profile.nickname
  const userId = response.data.profile.userId
  const avatarUrl = response.data.profile.avatarUrl
  const createTime = response.data.profile.createTime
  // console.log(username, userId, avatarUrl, createTime)
  store.commit('setUserId', userId)
  store.commit('setUserName', username)
  store.commit('setUserAvatar', avatarUrl)
  store.commit('setCreateTime', createTime)
}

const get_detail = () => {
  axios
    .get(`http://localhost:3000/user/detail?uid=${userId.value}`)
    .then((response) => {
      // console.log(response.data)
      level.value = response.data.level
      listened.value = response.data.listenSongs
      createDayS.value = response.data.createDays
    })
}

const getRecommendedDaily = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/recommend/songs?timestamp=${Date.now()}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  console.log(response.data)
  songs.value = response.data.data.dailySongs
}

onMounted(() => {
  get_user_info()
  get_detail()
  getRecommendedDaily()
  get_user_likeList()
})

const logout = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/logout?timestamp=${Date.now()}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  // console.log('logout, ', response)
  store.commit('setLoginState', false)
  store.commit('setUserId', 0)
  store.commit('setUserName', '')
  store.commit('setUserAvatar', '')
  store.commit('setCreateTime', 0)
  store.commit('setUserCookie', '')
  await router.push({ name: 'login' })
}

const get_user_likeList = async () => {
  const cookie = userCookie.value
  const response = await axios({
    url: `http://localhost:3000/likelist/?uid=${userId.value}&timestamp=${Date.now()}`,
    method: 'post',
    data: {
      cookie,
    },
  })
  // console.log(response.data)
  likeList.value = response.data.ids
}
</script>

<style></style>
