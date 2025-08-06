<template>
  <v-container>
    <v-chip class="mb-2" size="large" color="primary" text-color="white" label><h2>Cart: {{ cartItemsCount }}</h2></v-chip>
    <v-row>
      <v-col v-for="product in state.productList" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="product-card">
          <v-img :src="`/images/${product.image}`" height="200" cover></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>₹{{ product.price }}</v-card-subtitle>
          <v-card-text>
            <div>{{ product.description }}</div>
            <div>⭐ {{ product.rating }}</div>
          </v-card-text>
          <v-card-actions class="cart-button">
            <v-btn color="primary mt-auto" @click="addToCart(product)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const state = reactive({
  productList: []
})
const addToCart = (product) => {
  store.commit('addToCart', product)
}
onMounted(() => {
  state.productList = store.getters['getProducts']
})
const cartItemsCount = computed(() => {
  let items = store.getters['getCartItems']
  return items.length
})
</script>
<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  .cart-button {
    margin-top: auto;
    padding-bottom: 16px; 
  }
}
</style>
