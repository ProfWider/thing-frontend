import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import OktaSignIn from '@okta/okta-signin-widget'

const oktaSignIn = new OktaSignIn({
  baseUrl: 'https://dev-4978011.okta.com',
  clientId: '0oa3hzj56gAYGbvN25d7',
  redirectUri: 'http://localhost:5173/login/callback',
  authParams: {
    pkce: true,
    issuer: 'https://dev-4978011.okta.com/oauth2/default',
    display: 'page',
    scopes: ['openid', 'profile', 'email']
  },
  features: { registration: true },
  useInteractionCodeFlow: false,
  useClassicEngine: true,
})

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-4978011.okta.com/oauth2/default',
  clientId: '0oa3hzj56gAYGbvN25d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email']
})

const app = createApp(App)

app.use(OktaVue, {
  oktaAuth,
  onAuthRequired: () => {
    router.push('/login')
  },
  onAuthResume: () => {
    router.push('/login')
  } })
app.use(router)

app.mount('#app')

export { oktaAuth, oktaSignIn }
