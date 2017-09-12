<template>
  <v-card>
    <form @submit="post" >
      <v-container fluid class="pa-0">
        <v-layout wrap>
          <v-flex xs12 class="pa-0">
            <v-subheader>Your Answer</v-subheader>
          </v-flex>
          <v-flex xs12 class="pa-0">
            <v-divider></v-divider>
            <v-text-field
              label="Message"
              v-model="body"
              full-width
              multi-line
              single-line
              hide-details
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn block flat class="amber--text" type="submit">
          Post <v-icon right>send</v-icon>
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  props: ['questionId'],
  data () {
    return {
      body: null
    }
  },
  methods: {
    post (e) {
      e.preventDefault()
      this.$http.post(`/answer/q/${this.questionId}`, {
        body: this.body
      }, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        data.user = this.$store.state.user
        // update store
        this.$store.commit('addAnswer', {
          id: this.questionId,
          data: data._id
        })
        // update components
        this.$emit('newAnswer', data)
        this.body = null
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
