<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" sm="6" class="d-flex align-center">
        <v-chip class="mb-2" size="large" color="primary" text-color="white" label>
          <h2 class="m-0">Cart: {{ cartItemsCount }}</h2>
        </v-chip>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-sm-end">
        <div style="width: 300px">
          <v-select v-model="sortBy" :items="sortOptions" label="Sort by" variant="outlined" dense hide-details clearable />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="product in sortedProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
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
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const state = reactive({
  productList: []
})
const sortBy = ref(null)
const sortOptions = [
  { title: 'Category (A-Z)', value: 'categoryAsc' },
  { title: 'Category (Z-A)', value: 'categoryDesc' },
  { title: 'Price: Low to High', value: 'priceAsc' },
  { title: 'Price: High to Low', value: 'priceDesc' },
  { title: 'Rating: Low to High', value: 'ratingAsc' },
  { title: 'Rating: High to Low', value: 'ratinDesc' },
]
const addToCart = (product) => {
  store.commit('addToCart', product)
}
onMounted(() => {
  state.productList = store.getters['getProducts']
})
const sortedProducts = computed(() => {
  let products = [...state.productList]
  switch (sortBy.value) {
    case 'priceAsc':
      return products.sort((a, b) => a.price - b.price)
    case 'priceDesc':
      return products.sort((a, b) => b.price - a.price)
    case 'ratingAsc':
      return products.sort((a, b) => a.rating - b.rating)
    case 'ratinDesc':
      return products.sort((a, b) => b.rating - a.rating)
    case 'categoryAsc':
      return products.sort((a, b) => a.category.localeCompare(b.category))
    case 'categoryDesc':
      return products.sort((a, b) => b.category.localeCompare(a.category))
    default:
      return products
  }
})
const cartItemsCount = computed(() => store.getters['getCartItems'].length)
</script>
