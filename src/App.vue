<template>
  <div>
    <RouterView />
    <PlayBar />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import PlayBar from '@/components/PlayBar.vue'
</script>
