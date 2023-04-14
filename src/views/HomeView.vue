<template>
  <main>
    <Welcome v-if="showWelcomePage" />
  </main>
</template>

<script setup>
import Welcome from '../components/Welcome.vue'
import { useStore } from 'vuex'

const store = useStore()
const showWelcomePage = store.state.showWelcomePage
</script>
