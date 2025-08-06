import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import store from '@/store'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
export default createVuetify({
  components,
  directives,
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: store.state.theme,
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          primary: '#1976D2',
          secondary: '#424242',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          primary: '#BB86FC',
          secondary: '#03DAC6',
        },
      },
    },
  }
})