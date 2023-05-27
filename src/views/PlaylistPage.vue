<template>
  <div class="mt-20 mb-28">
    <div
      class="items-center justify-start hidden px-20 py-6 text-gray-500 dark:text-gray-400 md:flex"
    >
      <img alt="Cover" class="h-48 mr-3 rounded-[25px]" :src="coverUrl" />
      <li class="list-none">
        <div class="text-gray-600 dark:text-gray-400">
          <div class="text-base mb-5">
            <span
              class="font-extrabold text-4xl text-black dark:text-white ml-12"
              >{{ playlistName }}</span
            >
	          <span class="font-medium inline-block ml-4 text-black py-1 px-2 bg-blue-100 rounded-xl select-none"
	                v-if="privacy === 10"
	          >
		          隐私歌单
	          </span>
          </div>
          <div class="ml-12 text-2xs text-black">
            <span class="font-medium">{{ `PlayList by ` }}</span>
            <span class="font-bold">{{ creator || '' }}</span>
	          <span class="font-medium ml-4 inline-block py-1 px-2 bg-gray-100 rounded-xl select-none cursor-pointer" v-if="subscribed && creatorId !== userId" @click="cancelSub">取消收藏</span>
	          <span class="font-medium ml-4 inline-block py-1 px-2 bg-gray-100 rounded-xl select-none cursor-pointer" v-if="!subscribed && creatorId !== userId" @click="sub">收藏</span>
          </div>
          <div class="font-medium ml-12 mt-1 text-sm text-black">
            <span v-if="trackNumber > 1">{{
              `${formatDate(Number(createTime)) || ''} · ${trackNumber} 首 · ${playCount} 播放`
            }}</span>
            <span v-else>{{
              `${formatDate(Number(createTime)) || ''} · 1 首 · ${playCount} 播放`
            }}</span>
          </div>
	        <div class="ml-12 mt-2 text-black font-medium max-h-limited overflow-hidden"
	             ref="playlistDescElement"
	        >
		        {{desc}}
	        </div>
	        <button
		        v-if="isTruncated"
		        ref="expandButton"
		        class="ellipsis-below font-medium text-sm cursor-pointer ml-12 text-gray-500 hover:text-blue-600 hover:underline"
		        type="button"
		        @click="toggleFullDesc"
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
			        <p class="font-bold text-2xl text-black">{{ playlistName }}</p>
			        <p class="font-medium text-2xs mt-3">
				        {{ desc }}
			        </p>
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
    <div class="ml-20 text-2xl font-bold">歌单内容</div>
    <div
      class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-4 ml-20 mr-20"
    >
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
              @dblclick="songDblClickedPlaylist(song)"
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import {computed, ref, onMounted, onBeforeUnmount} from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { formatDate } from '../utils/timeParse'

const router = useRouter()
const route = useRoute()
const store = useStore()

let resizeObserver = null

const playlistId = ref(route.query.id)
const creator = ref(route.query.creator)
const createTime = ref(route.query.createTime)
const coverUrl = ref(route.query.cover)
const playlistName = ref(route.query.name)
const privacy = ref(0)
const songs = ref(null)
const desc = ref('')
const playCount = ref(0)
const subscribed = ref(false)
const playlistDescElement = ref(null)
const showPopup = ref(false)
const creatorId = ref(0)
let isTruncated = ref(false)

const trackNumber = computed(() => songs?.value?.length || 0)
const userCookie = computed(() => store.state.userCookie)
const userId = computed(() => store.state.userId)

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

	const privacyRes = await axios({
		url: `http://localhost:3000/playlist/detail?id=${playlistId.value}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie
		}
	})

	privacy.value = privacyRes.data.playlist.privacy
	desc.value = privacyRes.data.playlist.description
	playCount.value = privacyRes.data.playlist.playCount
	subscribed.value = privacyRes.data.playlist.subscribed
	creatorId.value = privacyRes.data.playlist.creator.userId
	console.log(privacyRes.data)
}

onMounted(async () => {
  await getSongs()

  if (createTime.value === '0') {
    await axios.get(`http://localhost:3000/playlist/detail?id=${playlistId.value}`).then((response) => {
      createTime.value = response.data.playlist.createTime
    })
  }

	if (!('ResizeObserver' in window)) return

	checkIfTruncated()
	resizeObserver = new ResizeObserver(() => {
		checkIfTruncated()
	})
	resizeObserver.observe(playlistDescElement.value)
})

onBeforeUnmount(() => {
	if (resizeObserver) {
		resizeObserver.disconnect()
	}
})

function checkIfTruncated() {
	if (!playlistDescElement.value) return

	isTruncated.value =
		playlistDescElement.value.scrollHeight > playlistDescElement.value.clientHeight
	// console.log(isTruncated.value)
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

const songDblClickedPlaylist = (song) => {
  store.commit('setPlayLocal', false)
  store.commit('setCurrentMetadata', {
    name: song.name,
    album: song.al.name,
    artist: joinNames(song.ar),
  })
  store.commit('setNeteaseList', songs.value)
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

const cancelSub = async () => {
	const cookie = userCookie.value
	await axios({
		url: `http://localhost:3000/playlist/subscribe?t=2&id=${playlistId.value}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie
		}
	})
	await getSongs()
}

const sub = async () => {
	const cookie = userCookie.value
	await axios({
		url: `http://localhost:3000/playlist/subscribe?t=1&id=${playlistId.value}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie
		}
	})
	await getSongs()
}
</script>

<style scoped>
.ellipsis-below {
	display: inline-block;
	/*padding-left: 0.25rem;*/
}

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
