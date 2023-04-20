<template>
  <div class='mt-20 mb-24'>
    <div class='justify-center flex'>
      <div class='bg-gray-50 shadow-lg inline-block px-14 py-8 rounded-[20px] items-center'>
        <div class='flex flex-col items-center'>
          <div class='justify-center align-middle items-center'>
            <img :src='avatarUrl' class='rounded-[10px]' alt='avatar' />
          </div>
          <li class='list-none mt-2 flex flex-col items-center'>
            <h2 class='font-bold text-2xl text-gray-800'>{{ username }}</h2>
            <span class='font-normal text-sm text-gray-700 opacity-90'>{{`${formatDate(createTime)}加入`}}</span>
          </li>
        </div>
        <div class='mt-8'>
          <div class='flex justify-between'>
            <div class='flex flex-col items-center'>
              <div class='text-black font-medium'>{{ level }}</div>
              <div class='text-sm'>等级</div>
            </div>
            <div class='flex flex-col items-center'>
              <div class='text-black font-medium'>{{ listened }}</div>
              <div class='text-sm'>听过的歌</div>
            </div>
            <div class='flex flex-col items-center'>
              <div class='text-black font-medium'>{{ createDayS }}</div>
              <div class='text-sm'>天</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from "vue"
import axios from 'axios'
import { formatDate } from '../utils/timeParse'

const store = useStore()

const username = computed(() => store.state.userName)
const userId = computed(() => store.state.userId)
const avatarUrl = computed(() => store.state.userAvatar)
const createTime = computed(() => store.state.createTime)

const level = ref(0)
const listened = ref(0)
const createDayS = ref(0)

const get_user_info = () => {
  axios.get(`http://localhost:3000/user/account`)
    .then((response) => {
      // console.log(response.data)
      const username = response.data.profile.nickname
      const userId = response.data.profile.userId
      const avatarUrl = response.data.profile.avatarUrl
      const createTime = response.data.profile.createTime

      store.commit('setUserId', userId)
      store.commit('setUserName', username)
      store.commit('setUserAvatar', avatarUrl)
      store.commit('setCreateTime', createTime)
    })
}

const get_detail = () => {
  axios.get(`http://localhost:3000/user/detail?uid=${userId.value}`)
    .then((response) => {
      // console.log(response.data)
      level.value = response.data.level
      listened.value = response.data.listenSongs
      createDayS.value = response.data.createDays

      const username = response.data.profile.nickname
      const userId = response.data.profile.userId
      const avatarUrl = response.data.profile.avatarUrl
      const createTime = response.data.profile.createTime

      store.commit('setUserId', userId)
      store.commit('setUserName', username)
      store.commit('setUserAvatar', avatarUrl)
      store.commit('setCreateTime', createTime)
    })
}

onMounted(() => {
  // get_user_info()
  get_detail()
})
</script>

<style>

</style>