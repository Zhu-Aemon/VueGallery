<!--suppress ALL -->
<template>
  <div class="mt-24 mb-4 items-center justify-center flex">
    <img src="../assets/ncm.png" alt="ncm" width="70" />
  </div>
  <div class="mt-2">
    <h1 class="justify-center items-center flex font-bold text-2xl">登录网易云账号</h1>
  </div>
  <div class="flex justify-center items-center mt-10">
    <div class="bg-qrbg p-4 rounded-[20px] inline-block">
      <canvas id="qrcode" ref="qrcodeCanvas">
      </canvas>
    </div>
  </div>
  <div class="mt-4 flex justify-center items-center font-medium text-2xs">
    请打开手机网易云音乐扫码登录
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import QRCode from 'qrcode'
import router from "../router";

const unikey = ref('')
const qrurl = ref('')
const qrcodeCanvas = ref(null)
const qrcodeStatus = computed(() => logInResponse.value.code)
const logInResponse = ref({ data: { code: null } });

onMounted(() => {
  axios.get(`http://localhost:3000/login/qr/key?timestamp=${Date.now()}`)
    .then((response) => {
      // console.log(response)
      unikey.value = response.data.data.unikey
      // console.log(unikey.value.data.unikey)
    })

  watch(unikey, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      axios.get(`http://localhost:3000/login/qr/create?key=${unikey.value}&timestamp=${Date.now()}`)
        .then((response) => {
          // console.log(response.data.data.qrurl)
          qrurl.value = response.data.data.qrurl
        })
    }
  })

  watch(qrurl, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      generateQRCode(newValue)
    }
  })

  watch(
    () => qrcodeStatus,
    (newValue, oldValue) => {
      console.log('detected new login status', newValue)
      if (newValue === 803) {
        console.log('login successful!')
        router.push({ name: 'explorePage' })
      }
  }
  )
})

const generateQRCode = async (url) => {
  // const element = document.getElementById('qrcode')
  const options = {
    margin: 1,
    width: 200,
    color: {
      dark: '#3d5ee2',
      light: '#ebeffc',
    }
  }
  await QRCode.toCanvas(qrcodeCanvas.value, url, options)
}

const getLoginState = async (key) => {
  try {
    const result = await axios.get(`http://localhost:3000/login/qr/check?key=${key}&timestamp=${Date.now()}`)
    logInResponse.value = result.data
    console.log('get data!', logInResponse.value.code)
    if (logInResponse.value.code === 803) {
      console.log(result)
      console.log('login successful!')
      router.push({ name: 'explorePage' })
      // store.commit('setLoginState', true)
      clearInterval(IntervalId)
    }
  } catch(error) {
    console.error(error)
  }
}

const IntervalId = setInterval(async () => {
  if (unikey.value !== '') {
    await getLoginState(unikey.value)
  }
}, 1000)

// onUnmounted(() => {
//   clearInterval(IntervalId)
// })

</script>
