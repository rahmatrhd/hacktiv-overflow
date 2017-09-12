<template>
  <div id="app">
    <v-app toolbar>
      <v-navigation-drawer
        persistent
        v-model="drawer"
        v-if="useDrawer"
        light
        overflow
      >
        <v-list dense>
          <v-list-tile :to="{name: 'Home'}">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{name: 'Home'}" v-if="!isLoggedIn">
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout" v-if="isLoggedIn">
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark
        class="amber--text"
      >
        <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            :to="{name: 'Home'}"
            flat
          >
            Home
          </v-btn>
          <v-btn
            :to="{name: 'Login'}"
            v-if="!isLoggedIn"
            flat
          >
            Login
          </v-btn>
          <v-btn
            @click="logout"
            v-if="isLoggedIn"
            flat
          >
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <main>
        <router-view></router-view>
      </main>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      title: 'Hacktiv Overflow',
      drawer: false,
      navs: [{
        label: 'Home',
        to: 'Home'
      }, {
        label: 'Login',
        to: 'Login'
      }]
    }
  },
  computed: {
    useDrawer () {
      return !this.$vuetify.breakpoint.mdAndUp
    },
    ...mapState([
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapActions([
      'checkLoginState',
      'getQuestions',
      'getUser'
    ]),
    ...mapMutations([
      'updateToken',
      'deleteUser'
    ]),
    logout () {
      this.$store.commit('updateLoginState', {status: 'logout'})
      localStorage.removeItem('token')
      this.updateToken()
      this.deleteUser()
    }
  },
  created () {
    // facebook init
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '267530537085939',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
    }

    this.getQuestions()
    this.updateToken()
    if (this.$store.state.isLoggedIn) {
      this.getUser()
    }
  }
}
</script>
