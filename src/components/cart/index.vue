<template>
  <v-container>
    <h2>Your Cart List</h2>
    <v-data-table v-if="cartItems.length > 0" :headers="headers" :items="cartItems" class="elevation-1" hide-default-footer>
      <template #item.image="{ item }">
        <v-img :src="`/images/${item.image}`" height="50" width="50" cover />
      </template>
      <template #item.price="{ item }">₹{{ item.price }}</template>
      <template #item.quantity="{ item }">
        <div class="d-flex align-center">
          <v-btn icon="mdi-minus" size="x-small" variant="text" @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1" />
          <span class="mx-2">{{ item.quantity }}</span>
          <v-btn icon="mdi-plus" size="x-small" variant="text" @click="increaseQuantity(item.id)" />
        </div>
      </template>
      <template #item.rowTotal="{ item }">₹{{ item.price * item.quantity }}</template>
      <template #item.actions="{ item }">
        <v-btn icon="mdi-delete" color="error" @click="removeItem(item.id)" />
      </template>
    </v-data-table>
    <v-alert v-else type="info" class="mt-4">Your cart is empty.</v-alert>
    <v-divider class="my-4" />
    <div v-if="cartItems.length > 0" class="d-flex justify-space-between align-center">
      <div class="text-h6">Total: ₹{{ cartTotal }}</div>
      <v-btn color="primary">Checkout</v-btn>
    </div>
  </v-container>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const cartItems = computed(() => store.getters['getCartItems'])
const cartTotal = computed(() => store.getters['cartTotal'])
const removeItem = (id) => {
  store.commit('removeFromCart', id)
}
const headers = [
  { title: 'Image', key: 'image', sortable: false },
  { title: 'Product Name', key: 'name' },
  { title: 'Price', key: 'price' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Total', key: 'rowTotal' },
  { title: 'Actions', key: 'actions', sortable: false }
]
const increaseQuantity = (id) => {
  store.commit('updateQuantity', { id, amount: 1 })
}
const decreaseQuantity = (id) => {
  store.commit('updateQuantity', { id, amount: -1 })
}
</script>
