<template>
	<div class="text-2xl font-bold mt-20 ml-20">
		时下流行
	</div>
	<div class="grid grid-cols-5 gap-x-12 gap-y-8 ml-20 mr-20 mt-8"
	>
		<div v-for='(pl, index) in specialPlaylistDetail'>
			<img class="h-auto max-w-full rounded-[30px] cursor-pointer" :src="pl.coverUrl" alt=""
			     @click="showPlaylist(pl.id, pl.nickname, pl.createTime, pl.coverUrl, pl.name)"
			>
			<div class='ml-2 mt-0.5 font-bold text-base select-none'>
				{{ pl.name }}
			</div>
			<div class='ml-2 font-medium text-sm text-gray-500 select-none'>
				by {{ pl.nickname }}
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {useRouter} from "vue-router"
import {useStore} from "vuex"
import axios from "axios";

const store = useStore()
const router = useRouter()

const userCookie = computed(() => store.state.userCookie)
const specialPlaylist = [60198, 2774950802, 19723756, 3812895]
const specialPlaylistDetail = ref([])

onMounted(async () => {
	const cookie = userCookie.value
	for (const id of specialPlaylist) {
		console.log(id)
		const response = await axios({
			url: `http://localhost:3000/playlist/detail?id=${id}`,
			method: 'post',
			data: {
				cookie
			}
		})
		specialPlaylistDetail.value.push({
			id: id,
			name: response.data.playlist.name,
			coverUrl: response.data.playlist.coverImgUrl,
			createTime: response.data.playlist.createTime,
			nickname: response.data.playlist.creator.nickname,
		})
	}
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

</script>