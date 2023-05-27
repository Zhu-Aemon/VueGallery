<template>
	<div class="mt-20 ml-20 mr-20 mb-28">
		<div>
			<div class="ml-6 text-gray-800 font-medium select-none">
				音质设置
			</div>
			<div class="w-full mt-2 inline-block bg-gray-100 rounded-xl py-2 px-6">
				<span class="font-medium text-gray-800 select-none">
					默认播放时使用的音质：
				</span>
				<div class="inline-block rounded-xl py-1 px-2 select-none cursor-pointer ml-4" v-for="(quality, index) in qualityChineseList"
				     :id="index"
				     :class="index === qualityList.indexOf(currentQualitySetting) ? 'bg-blue-100 font-bold' : 'bg-gray-200'"
				     @click="setQuality(qualityList[index])"
				>
					{{quality}}
					<span v-if="index === qualityList.indexOf(currentQualitySetting)"> ✔️</span>
				</div>
			</div>
			<div class="text-sm text-gray-800 font-medium ml-6 mt-2">
				当一首歌没有音质设置中所设置的音源时，会自动以网易云能提供的最高规格的音源播放
			</div>
		</div>
		<div>
			<div class="ml-6 text-gray-800 font-medium select-none mt-4">

			</div>
		</div>
	</div>
</template>

<script setup>
import {computed} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex"

const router = useRouter()
const store = useStore()

const currentQualitySetting = computed(() => store.state.qualitySetting)

const qualityList = ['standard', 'higher', 'exhigh', 'lossless', 'hires', 'jyeffect', 'jymaster']
const qualityChineseList = ['标准音质', '较高音质', '极高音质', '无损音质', 'Hi-Res', '鲸云臻音', '鲸云母带']

const setQuality = (quality) => {
	// console.log(quality)
	// console.log(currentQualitySetting.value)
	store.commit('setQualitySetting', quality)
}
</script>