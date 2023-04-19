<template>
  <div>
    <NavBar />
    <RouterView :key="componentKey" />
    <PlayBar />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import PlayBar from '@/components/PlayBar.vue'
import NavBar from '@/components/NavBar.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const componentKey = computed(() => store.state.componentKey)
</script>
