import { createStore } from 'vuex'
import productData from '@/assets/data/products.json'
export default createStore({
  state: {
    products: [],
    cart: [],
    theme: 'light',
    productList: productData
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    addToCart(state, product) {
      state.cart.push(product)
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(p => p.id !== productId)
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    updateQuantity(state, { id, amount }) {
      const item = state.cart.find(item => item.id === id)
      if (item) {
        item.quantity += amount
        if (item.quantity < 1) {
          state.cart = state.cart.filter(p => p.id !== id)
        }
      }
    }
  },
  actions: {
    setProducts({ commit }, product) {
      const products = product
      commit('setProducts', products)
    }
  },
  getters: {
    cartTotal: state => state.cart.reduce((total, product) => total + (product.price * product.quantity), 0),
    getProducts: state => state.productList,
    getCartItems: state => state.cart
  },
})