<script setup lang="ts">
//import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import { oktaSignIn } from '../main'
import { onMounted, onUnmounted, nextTick } from 'vue'

onMounted(() => {
  nextTick(() => {
    oktaSignIn.showSignInAndRedirect(
      { el: '#okta-signin-container' },
    )
  })
})

onUnmounted(() => {
  oktaSignIn.remove()
})

</script>

<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<style scoped>

</style>
