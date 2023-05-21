<template>
  <section class="bg-white dark:bg-gray-900 mt-6 mb-10">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div
        class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8"
      >
        <a
          class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2"
        >
          <svg
            aria-hidden="true"
            class="w-3 h-3 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
            ></path>
          </svg>
          Organization
        </a>
        <h1
          class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2"
        >
          无痛音乐管理
        </h1>
        <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
	        高效管理本地电脑上的音乐文件，只需先设置音乐文件所对应的路径
        </p>
        <input
          ref="fileInput"
          hidden
          type="file"
          webkitdirectory
          @change="loadSongs"
        />
        <a
          class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 mr-4"
          @click="$refs.fileInput.click()"
        >
          添加文件夹
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
	    <div class="mt-4">
		    <div class="ml-4 text-gray-500 font-medium text-sm">
			    音乐文件夹
		    </div>
		    <button @click="deleteLS">delete localstorage</button>
		    <div class="mt-2 py-2 px-3 inline-block bg-gray-100 w-full rounded-[10px]"
		         v-for="(folder, index) in folders"
		    >
			    {{folder}}
			    {{folders}}
		    </div>
	    </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getMetadata } from '@/utils/metadata'
import { ref, computed } from 'vue'

const store = useStore()
const router = useRouter()

const UIshowPopup = ref(false)
const DevshowPopup = ref(false)

const folders = computed(() => store.state.folderName)

const loadSongs = async (event) => {
  const folder = event.target.files[0].webkitRelativePath.split('/')[0]
  store.commit('addFolderName', folder)
  const songs = await getSongs(event.target.files)
  displaySongs(songs)
}

const getSongs = async (files) => {
  const audioFiles = []
  for (const file of files) {
    if (file.type.startsWith('audio') && !file.path.includes('#')) {
      const metadata = await getMetadata(file.path)
      const { name, path } = file
      const { title, artist, album, duration } = metadata || {}
      audioFiles.push({ name, path, artist, title, album, duration })
    }
  }
  return audioFiles
}

const displaySongs = (songs) => {
  store.commit('setSongs', songs)
  router.push({ name: 'songList' })
}

const toggleUIDesc = () => {
  UIshowPopup.value = !UIshowPopup.value
  if (UIshowPopup.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

const toggleDevDesc = () => {
  // console.log('before value:', DevshowPopup)
  DevshowPopup.value = !DevshowPopup.value
  // console.log('after value:', DevshowPopup)
  if (DevshowPopup.value) {
    document.body.classList.add('overflow-hidden')
    // console.log('added!')
  } else {
    document.body.classList.remove('overflow-hidden')
    // console.log('removed!')
  }
}

const deleteLS = () => {
	localStorage.clear()
}
</script>
