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
    <div class="mt-4 text-2xl font-bold ml-20">
      曲风偏好
    </div>
    <div class="mt-2 ml-20">
      <div class="flex">
        <div v-for="(tag, index) in tagPreference" class="px-2 mr-5 cursor-pointer py-1 inline-block bg-gray-100 rounded-xl">
          <div>{{`${tag.tagName} ${tag.ratio}%`}}</div>
          <div v-if="currentClass === tag.tagName" class="bg-blue-600 h-1.5 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import axios from 'axios'

const store = useStore()
const router = useRouter()

const userCookie = computed(() => store.state.userCookie)
const tagPreference = ref(null)
const currentClass = ref('电子')

const RecommendedPlaylist = ref([])

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
  console.log(tagPreference.value)
}
</script>
