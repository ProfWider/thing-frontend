<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="nameField" placeholder="Name" type="text">
    <input v-model="priceField" placeholder="Price" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="items.length === 0">
        <td colspan="2">No products yet</td>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
      </tr>
      <tr>
        <td>{{ nameField }}</td>
        <td>{{ priceField }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import type {AxiosResponse} from 'axios'
import type {Thing} from '@/types'
import type {Ref} from 'vue'
import { useAuth } from '@okta/okta-vue'
import type { UserClaims } from '@okta/okta-auth-js'

defineProps<{
  title: string
}>()

const items: Ref<Thing[]> = ref([])
const nameField = ref('')
const priceField = ref(0)

const $auth = useAuth()
const email = ref('')

async function loadThings (owner: string = '') {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/things' + '?owner=' + owner
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Thing[] = response.data;
  responseData.forEach((thing: Thing) => {
    items.value.push(thing)
  })
}

async function save () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/things'
  const data: Thing = {
    name: nameField.value,
    price: priceField.value,
    owner: email.value
  }
  const response: AxiosResponse = await axios.post(endpoint, data);
  const responseData: Thing = response.data;
  console.log('Success:', responseData)
}

// Lifecycle hooks
onMounted(async () => {
  let userClaims: UserClaims | undefined = undefined
  try {
    userClaims = await $auth.getUser()
  } catch (e) {
    console.log('Error:', e)
  }
  const owner = (userClaims === undefined || userClaims.email === undefined) ? '' : userClaims.email.toString()
  email.value = owner
  await loadThings(owner)
})
</script>

<style scoped>
h3 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
button {
  color: blue;
}
</style>
