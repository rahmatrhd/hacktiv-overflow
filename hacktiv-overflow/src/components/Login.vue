<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex sm6 lg4>
        <v-btn block large class="blue" dark @click="login">Login Using Facebook</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'checkLoginState',
      'getUser'
    ]),
    ...mapMutations([
      'updateToken'
    ]),
    login () {
      window.FB.login(response => {
        this.statusChangeCallback(response)
      }, {scope: 'public_profile'})
    },
    statusChangeCallback (response) {
      if (response.status === 'connected') {
        this.$http.post('/user/login', {}, {
          headers: {
            fbaccesstoken: response.authResponse.accessToken,
            fbid: response.authResponse.userID
          }
        })
        .then(({data}) => {
          localStorage.setItem('token', data)
          this.checkLoginState()
          this.updateToken()
          this.getUser()
          this.$router.push({name: 'Home'})
        })
        .catch(err => console.log(err))
      }
    }
  },
  created () {
    if (this.$store.state.isLoggedIn) {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>
