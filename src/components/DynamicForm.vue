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
import type {Ref} from 'vue'

defineProps<{
  title: string
}>()

type Thing = { id?: number, name: string, price: number }

const items: Ref<Thing[]> = ref([])
const nameField = ref('')
const priceField = ref(0)

function loadThings () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/things'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach((thing: Thing) => {
        items.value.push(thing)
      }))
      .catch(error => console.log('error', error))
}

function save () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/things'
  const data: Thing = {
    name: nameField.value,
    price: priceField.value
  }
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => console.log('error', error))
}

// Lifecycle hooks
onMounted(() => {
  loadThings()
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
