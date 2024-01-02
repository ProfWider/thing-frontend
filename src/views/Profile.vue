<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@okta/okta-vue'
import type { CustomUserClaim } from '@okta/okta-auth-js'

const $auth = useAuth()
const claims = ref<{claim: string, value: CustomUserClaim |  CustomUserClaim[]}[]>([{
  claim: 'Loading...',
  value: ''
}])

onMounted(async () => {
  const userClaims = await $auth.getUser()
  for (const claim in userClaims) {
    claims.value.push({
      claim,
      value: userClaims[claim]
    })
  }
})

</script>

<template>
  <div id="profile">
    <h1>My User Profile (ID Token Claims)</h1>
    <p>
      Below is the information from your ID token.
    </p>
    <table>
      <thead>
      <tr>
        <th>Claim</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(claim, index) in claims" :key="index">
        <td>{{claim.claim}}</td>
        <td :id="'claim-' + claim.claim">{{claim.value}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
