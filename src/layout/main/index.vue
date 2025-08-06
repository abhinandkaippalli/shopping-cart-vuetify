<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover permanent rail>
        <v-list>
          <v-list-item prepend-avatar="/images/profile.jpg" subtitle="abhi@gmailcom" title="Abhi"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item to="/" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          <v-list-item to="/products" prepend-icon="mdi-shopping" title="Products" value="products"></v-list-item>
          <v-list-item to="/cart" prepend-icon="mdi-cart" title="Cart" value="cart">
            <template #append>
              <v-chip v-if="cartItemsCount > 0" size="small" color="primary" text-color="white" label>
                {{ cartItemsCount }}
              </v-chip>
            </template>
          </v-list-item>
          <v-list-item @click="toggleTheme" :prepend-icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" title="Theme" value="theme"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <div class="main-container">
          <RouterView />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useTheme } from 'vuetify'
import { RouterView } from 'vue-router'
const store = useStore()
const theme = useTheme()
const isDark = computed(() => store.state.theme === 'dark')
const toggleTheme = () => {
  store.commit('toggleTheme')
  theme.change(store.state.theme)
}
const cartItemsCount = computed(() => {
  let items = store.getters['getCartItems']
  return items.length
})
watch(() => store.state.theme, (newTheme) => { theme.change(newTheme) }, { immediate: true })
</script>