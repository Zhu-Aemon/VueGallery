<template>
  <div>
    <NavBar />
    <RouterView />
    <PlayBar />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import PlayBar from '@/components/PlayBar.vue'
import NavBar from '@/components/NavBar.vue'
</script>
