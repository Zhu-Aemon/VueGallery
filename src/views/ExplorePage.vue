<template>
  <LoginPage v-if="LoginNeeded"/>
</template>

<script setup>
import LoginPage from "./LoginPage.vue";
import { useStore } from 'vuex'
import { computed } from "vue";

const store = useStore()
const LoginNeeded = computed(() => !store.state.userLoggedIn)
</script>
