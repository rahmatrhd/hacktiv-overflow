<template>
  <v-card class="amber lighten-5">
    <v-card-actions>
      <v-btn class="amber--text text--darken-4" block flat @click.native="showPostQuestion = !showPostQuestion">
        <v-icon left>{{ showPostQuestion ? 'clear' : 'question_answer'}}</v-icon>{{ showPostQuestion ? 'Cancel' : 'Ask a Question'}}
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-container fluid class="pa-0" v-show="showPostQuestion">
        <form @submit="post">
          <v-layout wrap>
            <v-flex xs12 class="pa-0">
              <v-divider></v-divider>
              <v-text-field
                label="Title"
                v-model="postTitle"
                single-line
                full-width
                hide-details
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="pa-0">
              <v-divider></v-divider>
              <v-text-field
                label="Body"
                v-model="postBody"
                full-width
                multi-line
                single-line
                hide-details
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-btn block flat class="amber--text text--darken-4" type="submit">
              Post <v-icon right>send</v-icon>
            </v-btn>
          </v-card-actions>
        </form>
      </v-container>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      showPostQuestion: false,
      postTitle: null,
      postBody: null
    }
  },
  methods: {
    post (e) {
      e.preventDefault()
      this.$http.post('/question', {
        title: this.postTitle,
        body: this.postBody
      }, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        this.postTitle = null
        this.postBody = null
        this.showPostQuestion = false
        data.user = this.$store.state.user
        this.$emit('newQuestion', data)
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
