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
          Effortless Music Management
        </h1>
        <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
          Streamline your music library with our intuitive software, designed to
          make categorizing, searching, and maintaining your digital music
          collection a breeze.
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
          Get Started
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
        <a
          class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 ml-4"
          href="https://github.com/Zhu-Aemon/VueGallery"
        >
          Read Doc
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
      <div class="grid md:grid-cols-2 gap-8">
        <div
          class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12"
        >
          <a
            class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2"
          >
            <svg
              aria-hidden="true"
              class="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                fill-rule="evenodd"
              ></path>
            </svg>
            Design
          </a>
          <h2
            class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2"
          >
            Powered by Card UI
          </h2>
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
            Embrace the elegance of our Card UI design, providing a visually
            appealing and user-friendly interface that enhances your music
            management experience with style and simplicity.
          </p>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            @click="toggleUIDesc"
            type="button"
          >
            Read More
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2 -mr-1"
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
          </button>
          <div
            v-show="UIshowPopup"
            class="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center"
            @click="toggleUIDesc"
          >
            <div
              class="bg-white border-gray-700 w-3/4 max-h-96 mx-auto rounded-lg drop-shadow-lg p-6 overflow-y-auto custom-scrollbar"
              @click.stop
            >
              <p class="font-bold text-2xl">Card UI Design</p>
              <p class="font-medium text-2xs mt-3">A card UI design is an entire interface based largely or
                exclusively on presenting the user content on cards. The
                logic behind this is to avoid long texts and render content
                more scannable. Even though users might not be familiar with
                the concept of a card from a design point of view – they
                instantly know how to use UI cards.</p>
              <p class="font-medium text-2xs mt-3">This is because, before becoming prolific in digital UI
                design, physical cards were already a popular way of
                conveying specific chunks of information. Used to
                communicate a myriad of different types of information,
                cards became an easy way to scan or memorize parts of
                information. Business cards helped us remember the minute
                details of a florist down the road or the name and stats of
                a baseball player.</p>
              <button
                class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click="toggleUIDesc"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div
          class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12"
        >
          <a
            class="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2"
          >
            <svg
              aria-hidden="true"
              class="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                fill-rule="evenodd"
              ></path>
            </svg>
            Code
          </a>
          <h2
            class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2"
          >
            Developed using Vue.js
          </h2>
          <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
            Built on the robust foundation of Vue.js, our platform harnesses the
            power and flexibility of this cutting-edge framework to deliver a
            smooth, high-performance music management experience that adapts to
            your needs.
          </p>
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="toggleDevDesc"
          >
            Read More
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2 -mr-1"
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
          </button>
          <!-- UI Description Modal-->
          <div
            v-show="DevshowPopup"
            class="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center"
            @click="toggleDevDesc"
          >
            <div
              class="bg-white border-gray-700 w-3/4 max-h-96 mx-auto rounded-lg drop-shadow-lg p-6 overflow-y-auto custom-scrollbar"
              @click.stop
            >
              <p class="font-bold text-2xl">Refactor Project with Vue.js</p>
              <div
                class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              >
                <time
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >November 13th, 2022</time
                >
                <ol
                  class="mt-3 divide-y divider-gray-200 dark:divide-gray-700"
                >
                  <li>
                    <a
                      class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img
                        class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                        src="src/assets/TZ_Avatar.jpg"
                        alt="TZ"
                      />
                      <div class="text-gray-600 dark:text-gray-400">
                        <div class="text-base font-normal">
                            <span
                              class="font-medium text-gray-900 dark:text-white"
                            >王天柱</span
                            >
                          started developing gallery using PySide2 and Python
                        </div>
                        <div class="text-sm font-normal">
                          Application Performance is compromised
                        </div>
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
              <div
                class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              >
                <time
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >December 20th, 2022</time
                >
                <ol
                  class="mt-3 divide-y divider-gray-200 dark:divide-gray-700"
                >
                  <li>
                    <a
                      class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img
                        class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                        src="src/assets/TZ_Avatar.jpg"
                        alt="Jese Leos image"
                      />
                      <div class="text-gray-600 dark:text-gray-400">
                        <div class="text-base font-normal">
                            <span
                              class="font-medium text-gray-900 dark:text-white"
                            >王天柱</span
                            >
                          finished Gallery Development using PySide2
                        </div>
                        <div class="text-sm font-normal">
                          The packaged application is too large
                        </div>
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
              <div
                class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              >
                <time
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >March 3rd, 2023</time
                >
                <ol
                  class="mt-3 divide-y divider-gray-200 dark:divide-gray-700"
                >
                  <li>
                    <a
                      class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <img
                        class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0"
                        src="src/assets/TZ_Avatar.jpg"
                        alt="Jese Leos image"
                      />
                      <div class="text-gray-600 dark:text-gray-400">
                        <div class="text-base font-normal">
                            <span
                              class="font-medium text-gray-900 dark:text-white"
                            >王天柱</span
                            >
                          started to refactor project using Vue.js and
                          Electron
                        </div>
                        <div class="text-sm font-normal">
                          Use Tailwindcss to build amazing CSS
                        </div>
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
              <button
                class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click="toggleDevDesc"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getMetadata } from '../utils/metadata'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()

const UIshowPopup = ref(false)
const DevshowPopup = ref(false)

const loadSongs = async (event) => {
  const folder = event.target.files[0].webkitRelativePath.split('/')[0]
  store.commit('setFolderName', folder)
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
</script>
