import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

const config = {
  apiKey: 'AIzaSyCNXcEmTZHd3v_cU3sXQx8k9LVDMDmiQDM',
  authDomain: 'hacktiv-overflow-firebase.firebaseapp.com',
  databaseURL: 'https://hacktiv-overflow-firebase.firebaseio.com',
  projectId: 'hacktiv-overflow-firebase',
  storageBucket: 'hacktiv-overflow-firebase.appspot.com',
  messagingSenderId: '167749513323'
}
const firebase = Firebase.initializeApp(config)

Vue.prototype.$db = firebase.database()

const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token') !== null
  },
  mutations: {
    updateLoginState (state, response) {
      state.isLoggedIn = response.status === 'connected'
    }
  },
  actions: {
    checkLoginState (context) {
      context.commit('updateLoginState', {
        status: localStorage.getItem('token') !== null ? 'connected' : 'logout'
      })
    }
  }
})

export default store
