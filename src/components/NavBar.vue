<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <!-- Icon and Page Title-->
      <a class="flex items-left">
        <span
          class="self-center px-4 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-xl"
          @click="navigateBack"
        >
          <i class="fa-sharp fa-solid fa-arrow-left fa-lg"></i>
        </span>
        <span
          class="self-center px-4 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-xl"
          @click="navigateForward"
        >
          <i class="fa-solid fa-arrow-right fa-lg"></i>
        </span>
      </a>
      <!-- Search Bar SR-ONLY-->
      <div class="flex md:order-2">
        <button
          aria-controls="navbar-search"
          aria-expanded="false"
          class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          data-collapse-toggle="navbar-search"
          type="button"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="relative hidden md:block">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            id="search-navbar"
            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            type="text"
            @keyup.enter="search($event.target.value)"
          />
        </div>
        <button
          aria-controls="navbar-search"
          aria-expanded="false"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          data-collapse-toggle="navbar-search"
          type="button"
        >
          <span class="sr-only">Open menu</span>
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Search bar and Tabs-->
      <div
        id="navbar-search"
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      >
        <!-- search input-->
        <div class="relative mt-3 md:hidden">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            id="search-navbar"
            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            type="text"
            @keyup.enter="search($event.ta.value)"
          />
        </div>
        <!-- Tabs-->
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              :class="
                $route.name === 'explorePage'
                  ? 'select-none text-blue-600 inline-block bg-gray-100 px-2 rounded-xl py-1 cursor-pointer'
                  : 'select-none text-black inline-block hover:bg-gray-100 hover:rounded-xl px-2 py-1 cursor-pointer'
              "
              @click="navigateToExplore"
              >资源库</a
            >
          </li>
          <li>
            <a
              :class="
                $route.name === 'trending'
                  ? 'select-none text-blue-600 inline-block bg-gray-100 px-2 rounded-xl py-1 cursor-pointer'
                  : 'select-none text-black inline-block hover:bg-gray-100 hover:rounded-xl px-2 py-1 cursor-pointer'
              "
              @click="navigateToTrending"
              >时下流行</a
            >
          </li>
          <li>
            <a
              :class="
                $route.name === 'recommended'
                  ? 'select-none text-blue-600 inline-block bg-gray-100 px-2 rounded-xl py-1 cursor-pointer'
                  : 'select-none text-black inline-block hover:bg-gray-100 hover:rounded-xl px-2 py-1 cursor-pointer'
              "
              @click="navigateToRecommended"
            >为你推荐</a
            >
          </li>
	        <li>
		        <a
			        :class="
                $route.name === 'settings'
                  ? 'select-none text-blue-600 inline-block bg-gray-100 px-2 rounded-xl py-1 cursor-pointer'
                  : 'select-none text-black inline-block hover:bg-gray-100 hover:rounded-xl px-2 py-1 cursor-pointer'
              "
			        @click="navigateToSettings"
		        >
			        <i class="fa-solid fa-gear fa-lg"></i>
		        </a
		        >
	        </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const store = useStore()
const router = useRouter()

const loggedIn = computed(() => store.state.userLoggedIn)
const userId = computed(() => store.state.userId)

const search = (content) => {
  router.push({
    name: 'searchResults',
    query: {
      content: content
    }
  })
}

const navigateToExplore = () => {
  if (userId.value === 0) {
    store.commit('setLoginState', false)
  }
	// console.log(loggedIn.value)
	// console.log(typeof loggedIn.value)
  if (loggedIn.value === 'false') {
    // console.log('?')
    router.push({ name: 'login' })
    // console.log('push to login!')
  } else if (loggedIn.value === false) {
	  router.push({ name: 'login' })
  } else {
	  router.push({ name: 'explorePage' })
  }
}

const navigateToHome = () => {
  router.push({ name: 'home' })
}

const navigateBack = () => {
  router.go(-1)
}

const navigateForward = () => {
  router.go(1)
}

const navigateToTrending = () => {
  router.push({ name: 'trending' })
}

const navigateToRecommended = () => {
  router.push({ name: 'recommended'})
}

const navigateToSettings = () => {
	router.push({ name: 'settings'})
}
</script>
