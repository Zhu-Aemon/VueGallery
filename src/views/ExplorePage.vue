<template>
	<div class="mt-20 mb-28">
		<div class="items-center flex">
			<div
				class="bg-gray-50 shadow-lg ml-20 inline-block px-8 py-4 rounded-[20px] items-center"
			>
				<div class="flex flex-row items-center">
					<div class="justify-center align-middle items-center mr-6">
						<img
							:src="avatarUrl"
							alt="avatar"
							class="rounded-[10px]"
							width="80"
						/>
					</div>
					<li class="list-none mt-2 flex flex-col items-center">
						<h2 class="font-bold text-2xl text-gray-800">{{ username }}</h2>
						<span class="font-normal text-sm mt-1 text-gray-700 opacity-90">{{
								`${formatDate(createTime)}加入`
							}}</span>
						<button
							class="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							type="button"
							@click="logout"
						>
							退出登录
						</button>
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
				<div class="font-medium text-gray-700 text-xl">你的等级</div>
			</div>
			<div
				class="bg-gray-50 shadow-lg ml-10 inline-block px-8 py-4 rounded-[20px] items-center"
			>
				<i class="fa-solid fa-music fa-2xl"></i>
				<div class="text-black font-bold text-3xl mt-6">{{ listened }} 首</div>
				<div class="font-medium text-gray-700 text-xl">已经听过</div>
			</div>
			<div
				class="bg-gray-50 shadow-lg ml-10 inline-block px-8 py-4 rounded-[20px] items-center"
			>
				<i class="fa-solid fa-calendar-days fa-2xl"></i>
				<div class="text-black font-bold text-3xl mt-6">
					{{ createDayS }} 天
				</div>
				<div class="font-medium text-gray-700 text-xl">已经加入云村</div>
			</div>
			<div
				class="bg-gray-50 shadow-lg ml-10 mr-20 inline-block px-8 py-4 rounded-[20px] items-center"
			>
				<i class="fa-solid fa-heart fa-2xl"></i>
				<div class="text-black font-bold text-3xl mt-6">
					{{ likeList?.length || 0 }}
				</div>
				<div class="font-medium text-gray-700 text-xl">喜欢的音乐</div>
			</div>
		</div>
		<div class="mt-10">
			<div class="ml-20 text-xl font-medium">
				<div class="flex">
					<div
						:class="
            section === 'daily'
              ? 'cursor-pointer bg-gray-200 rounded-2xl py-2 px-4 text-blue-700 font-bold'
              : 'cursor-pointer hover:bg-gray-200 hover:rounded-2xl py-2 px-4 font-bold bg-gray-100 rounded-2xl'
          "
						@click="setDaily"
					>每日推荐</div
					>
					<div
						:class="
            section === 'playlist'
              ? 'cursor-pointer bg-gray-200 rounded-2xl py-2 px-4 text-blue-700 font-bold ml-1'
              : 'cursor-pointer hover:bg-gray-200 hover:rounded-2xl py-2 px-4 font-bold ml-1 bg-gray-100 rounded-2xl'
          "
					>
	        <span @click="setPlayList">
		        所有播放列表
	        </span>
						<span @click="showDropdown">
	        </span>
					</div>
					<div
						:class="
            section === 'myPlaylist'
              ? 'cursor-pointer bg-gray-200 rounded-2xl py-2 px-4 text-blue-700 font-bold ml-1'
              : 'cursor-pointer hover:bg-gray-200 hover:rounded-2xl py-2 px-4 font-bold ml-1 bg-gray-100 rounded-2xl'
          "
					>
	        <span @click="setMyPlaylist">
		        我创建的播放列表
	        </span>
						<span @click="showDropdown">
	        </span>
					</div>
				</div>
				<div>
				</div>
			</div>
			<div
				v-if="section === 'daily'"
				class="relative overflow-auto custom-scrollbar rounded-lg shadow mt-6 ml-20 mr-20"
			>
				<table class="w-full textho-gray-500 dark:text-gray-400">
					<thead class="bg-gray-100 border-b-2 border-gray-200 text-gray-700">
					<tr>
						<th
							class="w-2/5 p-3 text-sm font-semibold tracking-wide text-left"
						>
							Top Recommended
						</th>
						<th
							class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left"
						>
							Artist
						</th>
						<th
							class="w-1/5 p-3 text-sm font-semibold tracking-wide text-left"
						>
							Album
						</th>
					</tr>
					</thead>
					<tbody class="divide-y bg-white">
					<tr
						v-for="(song, index) in songs"
						v-if="songs"
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
					>
						<th
							class="p-3 text-sm text-gray-900 text-left font-medium select-none"
							@dblclick="songDblClickedRecommend(song)"
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
		<div
			v-if="section === 'myPlaylist' || section === 'playlist'"
			class="grid grid-cols-5 gap-x-12 gap-y-8 ml-20 mr-20 mt-8"
		>
			<div v-for="(pl, index) in playlist" v-if="section !== 'myPlaylist'">
				<img
					:src="pl.coverImgUrl"
					alt=""
					class="h-auto max-w-full rounded-[30px] cursor-pointer"
					@click="
            showPlaylist(
              pl.id,
              pl.creator.nickname,
              pl.createTime,
              pl.coverImgUrl,
              pl.name
            )
          "
				/>
				<div class="ml-2 mt-0.5 font-bold text-base select-none">
					<span>{{ `${pl.name} ` }}</span>
					<span v-if="pl.privacy === 10"><i class="fa-solid fa-lock"></i></span>
				</div>
				<div class="ml-2 font-medium text-sm text-gray-500 select-none">
					by {{ pl.creator.nickname }}
				</div>
			</div>
			<div v-for="(pl, index) in playlist?.filter(pl => pl.creator.userId === userId)" v-if="section === 'myPlaylist'">
				<img
					:src="pl.coverImgUrl"
					alt=""
					class="h-auto max-w-full rounded-[30px] cursor-pointer"
					@click="
            showPlaylist(
              pl.id,
              pl.creator.nickname,
              pl.createTime,
              pl.coverImgUrl,
              pl.name
            )
          "
				/>
				<div class="ml-2 mt-0.5 font-bold text-base select-none">
					{{ `${pl.name} ` }}
					<span v-if="pl.privacy === 10">
						<i class="fa-solid fa-lock"></i>
					</span>
				</div>
				<div class="ml-2 font-medium text-sm text-gray-500 select-none">
					by {{ pl.creator.nickname }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import axios from 'axios'
import {formatDate} from '@/utils/timeParse'
import {useRouter} from 'vue-router'

const store = useStore()
const router = useRouter()

const username = computed(() => store.state.userName)
const userId = computed(() => store.state.userId)
const avatarUrl = computed(() => store.state.userAvatar)
const createTime = computed(() => store.state.createTime)
const userCookie = computed(() => store.state.userCookie)
const artist = computed(() => store.state.currentSongArtist)
const album = computed(() => store.state.currentSongAlbum)
const section = computed(() => store.state.exploreSection)

const level = ref(0)
const listened = ref(0)
const createDayS = ref(0)
const songs = ref(null)
const likeList = ref(null)
const playlist = ref(null)
const showOption = ref(false)

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
	// console.log(response.data)
	songs.value = response.data.data.dailySongs
}

onMounted(() => {
	get_user_info()
	get_detail()
	getRecommendedDaily()
	get_user_likeList()
	getUserPlayList()
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
	await router.push({name: 'login'})
}

const get_user_likeList = async () => {
	const cookie = userCookie.value
	const response = await axios({
		url: `http://localhost:3000/likelist/?uid=${
			userId.value
		}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie,
		},
	})
	// console.log(response.data)
	likeList.value = response.data.ids
}

const songDblClickedRecommend = (song) => {
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

const showArtist = (artistId) => {
	router.push({
		name: 'artistPage',
		query: {
			artist: artistId,
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

const getUserPlayList = async () => {
	const cookie = userCookie.value
	const response = await axios({
		url: `http://localhost:3000/user/playlist?uid=${userId.value}&timestamp=${Date.now()}`,
		method: 'post',
		data: {
			cookie,
		},
	})
	playlist.value = response.data.playlist
	// console.log(response.data)
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

const setDaily = () => {
	store.commit('setSection', 'daily')
}

const setPlayList = () => {
	store.commit('setSection', 'playlist')
}

const setMyPlaylist = () => {
	store.commit('setSection', 'myPlaylist')
}

const showDropdown = () => {
	showOption.value = !showOption.value
}
</script>

<style></style>
