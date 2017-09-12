<template>
  <v-layout row>
    <v-flex xs1 class="text-xs-right">
      <v-btn v-if="user._id == userId" icon @click="remove">
        <v-icon class="red--text">delete</v-icon>
      </v-btn>
      <v-icon v-else>comment</v-icon>
    </v-flex>
    <v-flex class="spacer">
      <v-card>
        <v-layout>
          <v-flex class="spacer pa-0">
            <v-card-text class="pb-0">
              <span class="grey--text text--darken-4">{{ body }}</span>
            </v-card-text>
            <v-card-text class="pb-0">
              <span class="grey--text">{{ new Date(createdAt).toLocaleString() }}</span>
              -
              <span class="grey--text">{{ user.name }}</span>
            </v-card-text>
          </v-flex>
          <div class="pa-2">
            <v-layout column class="text-xs-center">
              <v-flex xs12 class="pa-0">
                <v-btn icon class="ma-0" :disabled="(downVoted === isLoggedIn)" @click="vote('up')">
                  <v-icon :class="{'green--text': upVoted}">arrow_upward</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 class="pa-1">
                <strong>{{ votesAmount }}</strong>
              </v-flex>
              <v-flex xs12 class="pa-0">
                <v-btn icon class="ma-0" :disabled="(upVoted === isLoggedIn)" @click="vote('down')">
                  <v-icon :class="{'red--text': downVoted}">arrow_downward</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['answer', 'questionId'],
  data () {
    return {
      ...this.answer
    }
  },
  computed: {
    ...mapState([
      'isLoggedIn'
    ]),
    userId () {
      return this.$store.state.user._id
    },
    votesAmount () {
      return Math.abs(this.upVotes.length - this.downVotes.length)
    },
    upVoted () {
      return this.upVotes.includes(this.$store.state.user._id)
    },
    downVoted () {
      console.log('downvoted', this.$store.state.user._id)
      console.log('asdasd', this.downVotes.includes(this.$store.state.user._id))
      return this.downVotes.includes(this.$store.state.user._id)
    }
  },
  methods: {
    remove () {
      this.$http.delete(`/answer/${this.answer._id}`, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        this.$store.commit('removeAnswer', {
          id: this.questionId,
          data: this.answer._id
        })
        this.$emit('removeAnswer', this.answer._id)
      })
      .catch(err => console.log(err))
    },

    vote (val) {
      console.log('send token', typeof this.$store.state.token, this.$store.state.token)

      this.$http.patch(`/answer/${this.answer._id}/${val}vote`, {}, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        console.log(data)
        let userId = this.$store.state.user._id
        if (this[`${val}Voted`]) {
          // if already voted, remove data in answer.upVotes
          this[`${val}Votes`].splice(this[`${val}Votes`].indexOf(userId), 1)
        } else {
          // else, update component's data
          this[`${val}Votes`].push(userId)
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
