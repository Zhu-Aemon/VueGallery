<template>
	<div
		class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600"
	>
		<!-- Album Cover and Song Description-->
		<div
			class="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex"
		>
			<img
				id="cover"
				alt="Cover"
				class="h-16 mr-3 rounded-xl"
				src="https://flowbite.com/docs/images/logo.svg"
			/>
			<li class="list-none">
				<div class="text-gray-600 dark:text-gray-400">
					<div class="text-base font-normal">
            <span class="font-medium text-gray-900 dark:text-white">{{
		            title
	            }}</span>
						<span class="inline-block bg-blue-100 py-1 px-2 rounded-xl ml-2 select-none">
							{{'🔥'.repeat(getSongPopularity())}}
						</span>
					</div>
					<div class="text-sm font-normal">
						{{ artist }}
					</div>
				</div>
			</li>
		</div>
		<!-- 5 middle buttons-->
		<div class="flex items-center w-full">
			<div class="w-full">
				<div class="flex items-center justify-center mx-auto mb-1">
					<!-- Shuffle Song Button-->
					<button
						class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
						data-tooltip-target="tooltip-shuffle"
						type="button"
						@click="shuffleMusic"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 512 512"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								:fill="shuffleState === 'shuffle' ? 'blue' : 'currentColor'"
								d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
							/>
						</svg>
						<span class="sr-only">Shuffle Song</span>
					</button>
					<div
						id="tooltip-shuffle"
						class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
						role="tooltip"
					>
						Shuffle Song
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<!-- Previous Song Button-->
					<button
						class="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
						data-tooltip-target="tooltip-previous"
						type="button"
						@click="playPrevious"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 320 512"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"
								fill="currentColor"
							/>
						</svg>
						<span class="sr-only">Previous Song</span>
					</button>
					<div
						id="tooltip-previous"
						class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
						role="tooltip"
					>
						Previous Song
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<!-- Play or Pause Button-->
					<button
						class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
						data-tooltip-target="tooltip-pause"
						type="button"
						@click="togglePlay"
					>
						<svg
							aria-hidden="true"
							class="w-4 h-4 text-white"
							fill="currentColor"
							viewBox="0 0 10 14"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								v-if="playing"
								clip-rule="evenodd"
								d="M0.625 1.375C0.625 1.02982 0.904823 0.75 1.25 0.75H2.5C2.84518 0.75 3.125 1.02982 3.125 1.375V12.625C3.125 12.9702 2.84518 13.25 2.5 13.25H1.25C1.08424 13.25 0.925268 13.1842 0.808058 13.0669C0.690848 12.9497 0.625 12.7908 0.625 12.625L0.625 1.375ZM6.875 1.375C6.875 1.02982 7.15482 0.75 7.5 0.75H8.75C8.91576 0.75 9.07473 0.815848 9.19194 0.933058C9.30915 1.05027 9.375 1.20924 9.375 1.375L9.375 12.625C9.375 12.9702 9.09518 13.25 8.75 13.25H7.5C7.15482 13.25 6.875 12.9702 6.875 12.625V1.375Z"
								fill="currentColor"
								fill-rule="evenodd"
							/>
							<path
								v-else
								clip-rule="evenodd"
								d="M1 1.375L11 7L1 12.625Z"
								fill="currentColor"
								fill-rule="evenodd"
							/>
						</svg>
						<span class="sr-only">Toggle Play</span>
					</button>
					<div
						id="tooltip-pause"
						class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
						role="tooltip"
					>
						Toggle Play
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<!-- Next Song Button-->
					<button
						class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
						data-tooltip-target="tooltip-next"
						type="button"
						@click="playNext"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 320 512"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"
								fill="currentColor"
							/>
						</svg>
						<span class="sr-only">Next Song</span>
					</button>
					<div
						id="tooltip-next"
						class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
						role="tooltip"
					>
						Next Song
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<!-- LoopSong Button-->
					<button
						v-if="false"
						class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
						data-tooltip-target="tooltip-restart"
						type="button"
						@click="loopSong"
					>
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 512 512"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								:fill="shuffleState === 'one' ? 'blue' : 'currentColor'"
								d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"
							/>
						</svg>
						<span class="sr-only">Loop Song</span>
					</button>
					<button
						v-if="!songLiked"
						class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
						type="button"
						@click="likeMusic"
					>
						<i class="fa-regular fa-heart fa-lg"></i>
					</button>
					<!-- ?liked button-->
					<button
						v-if="songLiked"
						class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
						data-tooltip-target="tooltip-captions"
						type="button"
						@click="cancelLike"
					>
						<i class="fa-solid fa-heart fa-lg"></i>
					</button>
				</div>
				<!-- ProgressBar Component-->
				<div class="flex items-center justify-between space-x-2">
          <span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{
		          progressTimeDisplayed === 'NaN:NaN' ? '0:00' : progressTimeDisplayed
	          }}</span>
					<div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
						<div
							:style="progressBarStyle"
							class="bg-blue-600 h-1.5 rounded-full"
						></div>
					</div>
					<span class="text-sm font-medium text-gray-500 dark:text-gray-400">{{
							displayTime
						}}</span>
				</div>
			</div>
		</div>
		<!-- 4 right buttons-->
		<div class="items-center justify-center hidden ml-auto md:flex">
			<div
				id="tooltip-captions"
				class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
				role="tooltip"
			>
				Toggle captions
				<div class="tooltip-arrow" data-popper-arrow></div>
			</div>
			<!-- ??expand Button-->
			<div
				class="mr-2"
				v-if="isVIPSong"
			>
				<span class="relative inline-block py-1 px-2 bg-blue-100 text-sm font-medium rounded-xl">
					<span class="select-none">VIP歌曲</span>
				</span>
			</div>
			<div
				class="mr-2"
				v-if="purchaseAlbumNeeded"
			>
				<span class="relative inline-block py-1 px-2 bg-blue-100 text-sm font-medium rounded-xl">
					需购买专辑
				</span>
			</div>
			<!--soundQuality-->
			<div class="relative inline-block">
				<button id="soundQualitySelection"
				        class="text-sm font-medium py-1 px-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200"
				        type="button"
				        @click="toggleSoundSelection"
				>
					{{qualityChineseList[qualityList.indexOf(currentQuality)]}}
				</button>
				<ul
					v-if="showSoundSelection"
					class="absolute right-0 z-10 mt-2 w-32 origin-top-right bottom-10 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<li v-for="(quality, index) in qualityChineseList">
						<a
							v-if="qualityList.indexOf(maxQuality) >= index"
							:id="index"
							:class="currentQuality === qualityList[index] ? 'bg-gray-100 rounded-xl' : ''"
							class="block w-full select-none cursor-pointer px-4 py-2 text-sm font-normal hover:bg-gray-200 hover:rounded-xl"
							@click="setQuality(index)"
						><span>{{ quality }}</span>
							<span v-if="currentQuality === qualityList[index]"> ✔️</span>
						</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, onMounted, ref, watch, defineEmits} from 'vue'
import formatTime from '../utils/timeParse'
import EventBus from '@/utils/eventBus'
import axios from 'axios'
import {useRouter} from "vue-router"

const router = useRouter()
const store = useStore()
const emit = defineEmits(['replay'])

const duration = computed(() => store.state.currentDuration)
const playing = computed(() => store.state.playing)
const title = computed(() => store.state.currentSongName)
const album = computed(() => store.state.currentSongAlbum)
const artist = computed(() => store.state.currentSongArtist)
const shuffleState = computed(() => store.state.shuffle)
const volume = computed(() => store.state.volume)
const userCookie = computed(() => store.state.userCookie)
const userId = computed(() => store.state.userId)
let currentSong = computed(() => store.state.currentSong)
let currentPlayList = computed(() => {
	if (store.state.playLocal) {
		return store.state.songs
	} else {
		return store.state.neteaseList
	}
})
const currentQuality = computed(() => store.state.defaultQuality)
const qualitySetting = computed(() => store.state.qualitySetting)

let displayTime = ref(formatTime(duration.value))
let progressTime = ref(0)
let progressTimeDisplayed = ref(formatTime(progressTime))
const likeList = ref([])
const showSoundSelection = ref(false)
const isVIPSong = ref(false)
const purchaseAlbumNeeded = ref(false)
const songPopularity = ref(0)
const hasCopyright = ref(false)
const publishTime = ref(0)
const chargeInfo = ref(null)
const maxQuality = ref('lossless')
const noneVIPCanListen = ref(true)

let intervalId = null

watch(artist, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		// console.log(newValue)
	}
})

watch(title, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		// console.log(newValue)
	}
})

watch(album, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		// console.log(newValue)
	}
})

watch(currentSong, async (newValue, oldValue) => {
	// console.log(newValue, oldValue)
	await StartPlaySong()
	await getCurrentSongInfo()
})

function joinNames(arr) {
	// 使用map方法获取每个对象的name属性，然后使用join方法将它们连接起来
	return arr.map((item) => item.name).join('/')
}

watch(playing, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		// console.log('state changed to', newValue)
		if (newValue === false) {
			// console.log('clear interval!')
			if (intervalId !== null) {
				clearInterval(intervalId)
			}
		} else {
			intervalId = setInterval(() => {
				progressTime.value += 1
				// console.log(progressTime.value)
			}, 1000)
		}
	}
})

watch(duration, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		displayTime.value = formatTime(newValue)
	}
})

watch(progressTime, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		progressTimeDisplayed.value = formatTime(newValue)
		// console.log(
		//   Math.floor((Number(progressTime.value) / Number(duration.value)) * 100)
		// )
	}
})

const progressBarStyle = computed(() => {
	const widthPercentage = Math.floor(
		(Number(progressTime.value) / Number(duration.value)) * 100
	)
	return {
		width: `${widthPercentage}%`,
	}
})

const shuffleMusic = () => {
	if (shuffleState.value !== 'shuffle') {
		store.commit('setShuffle', 'shuffle')
	} else {
		store.commit('setShuffle', 'loop')
	}
}

const loopSong = () => {
	if (shuffleState.value !== 'one') {
		store.commit('setShuffle', 'one')
	} else {
		store.commit('setShuffle', 'loop')
	}
	// console.log(shuffleState.value === 'one')
}

const playPrevious = () => {
	store.commit('setQuality', qualitySetting.value)
	const tobeIndexed = currentSong.value
	const list = currentPlayList.value
	const index = list.indexOf(tobeIndexed) === 0 ? 1 : list.indexOf(tobeIndexed)
	store.commit('setCurrentSong', list[index - 1])
}

const togglePlay = () => {
	store.commit('togglePlayState')
}

const playNext = () => {
	store.commit('setQuality', qualitySetting.value)
	if (shuffleState.value === 'loop') {
		const tobeIndexed = currentSong.value
		const list = currentPlayList.value
		const index = list.indexOf(tobeIndexed) || 0
		store.commit('setCurrentSong', list[index + 1])
	} else if (shuffleState.value === 'one') {
		const tobeIndexed = currentSong.value
		const list = currentPlayList.value
		const index = list.indexOf(tobeIndexed) || 0
		store.commit('setCurrentSong', list[index])
	} else {
		const list = currentPlayList.value
		const currentIndex = list.indexOf(currentSong.value) || 0
		let randomIndex = currentIndex
		while (randomIndex === currentIndex) {
			randomIndex = Math.floor(Math.random() * list.length)
		}
		store.commit('setCurrentSong', list[randomIndex])
	}
}

onMounted(async () => {
	EventBus.on('song-end', songEnd)
	await getLikeList()
})

const songEnd = () => {
	console.log('end!')
	if (intervalId !== null) {
		console.log('clear interval!')
		clearInterval(intervalId)
	}
	playNext()
}

const likeMusic = async () => {
	const cookie = userCookie.value
	await axios({
		url: `http://localhost:3000/like?id=${
			currentSong.value.id
		}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie,
		},
	})
	// console.log(response)
	await getLikeList()
}

const getLikeList = async () => {
	const cookie = userCookie.value
	const response = await axios({
		url: `http://localhost:3000/likelist?uid=${
			userId.value
		}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie,
		},
	})
	// console.log(response)
	likeList.value = response.data.ids
	// console.log(likeList.value)

	// const response1 = await axios({
	// 	url: `http://localhost:3000/song/detail?ids=${currentSong.value.id}`,
	// 	method: 'post',
	// 	data: {
	// 		cookie,
	// 	},
	// })
	// console.log(response1)
}

const songLiked = computed(() => {
	// console.log(currentSong.value.id)
	return likeList.value.includes(currentSong.value.id)
})

const cancelLike = async () => {
	const cookie = userCookie.value
	const response = await axios({
		url: `http://localhost:3000/like?id=${
			currentSong.value.id
		}&like=false&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie,
		},
	})
	console.log(response)
	await getLikeList()
}

const toggleSoundSelection = () => {
	showSoundSelection.value = !showSoundSelection.value
}

const getCurrentSongInfo = async () => {
	const cookie = userCookie.value
	const response = await axios({
		url: `http://localhost:3000/song/detail?ids=${currentSong.value.id}`,
		method: 'post',
		data: {
			cookie
		}
	})
	isVIPSong.value = response.data.songs[0].fee === 1
	purchaseAlbumNeeded.value = response.data.songs[0].fee === 4
	noneVIPCanListen.value = response.data.songs[0].fee === 8
	songPopularity.value = response.data.songs[0].pop
	hasCopyright.value = response.data.songs[0].noCopyrightRcmd === null
	publishTime.value = response.data.songs[0].publishTime
	chargeInfo.value = response.data.privileges[0].chargeInfoList
	maxQuality.value = response.data.privileges[0].playMaxBrLevel
	// console.log(qualityList.indexOf(maxQuality.value))
}

const setQuality = async (index) => {
	const quality = qualityList[index]
	store.commit('setQuality', quality)
	showSoundSelection.value = false
	EventBus.emit('replay')
	await StartPlaySong()
}

const qualityList = ['standard', 'higher', 'exhigh', 'lossless', 'hires', 'jyeffect', 'jymaster']
const qualityChineseList = ['标准音质', '较高音质', '极高音质', '无损音质', 'Hi-Res', '鲸云臻音', '鲸云母带']

const StartPlaySong = async () => {
	progressTime.value = 0
	store.commit('setCurrentMetadata', {
		name: currentSong.value.name,
		album: currentSong.value.al.name,
		artist: joinNames(currentSong.value.ar),
	})
	const coverImg = document.getElementById('cover')
	coverImg.src = currentSong.value.al.picUrl

	if (intervalId !== null) {
		clearInterval(intervalId)
	}
	if (playing.value === true) {
		intervalId = setInterval(() => {
			progressTime.value += 1
			// console.log(progressTime.value)
		}, 1000)
	}
}


const getSongPopularity = () => {
	const popularityIndex = songPopularity.value / 2
	const popularityCount = popularityIndex.toString()[0]
	return Number(popularityCount)
}
</script>
