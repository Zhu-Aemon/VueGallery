<template>

</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const artist = route.query.artist
</script>