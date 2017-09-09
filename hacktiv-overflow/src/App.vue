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
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>chat</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>My Questions</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
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
            v-for="(nav, index) in navs"
            :key="index"
            :to="{name: nav.to}"
            v-if="!(nav.label == 'Login' && isLoggedIn)"
            flat
          >{{ nav.label }}</v-btn>
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
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions([
      'checkLoginState'
    ]),
    logout () {
      this.$store.commit('updateLoginState', {status: 'logout'})
      localStorage.removeItem('token')
    }
  },
  computed: {
    useDrawer () {
      return !this.$vuetify.breakpoint.mdAndUp
    },
    isLoggedIn () {
      return this.$store.state.isLoggedIn
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
  }
}
</script>
