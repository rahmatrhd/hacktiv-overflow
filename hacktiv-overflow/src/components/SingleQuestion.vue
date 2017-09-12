<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card raised class="amber lighten-5">
        <v-layout row justify-center>
          <v-dialog v-model="editDialog" width="50%">
            <v-card>
              <form @submit="editQuestion">
                <v-card-title>
                  <span class="headline">Edit Question</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-xs>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Title" v-model="editTitle" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Body" v-model="editBody" multi-line required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click.native="editDialog = false">Close</v-btn>
                  <v-btn class="blue--text darken-1" flat type="submit">Submit</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
        </v-layout>
        <v-layout>
          <v-flex class="spacer pa-0">
            <v-card-title primary-title class="pb-0">
              <div>
                <div class="headline amber--text text--darken-4">{{ data.title }}</div>
                <span class="grey--text text--darken-4">{{ data.body }}</span>
              </div>
            </v-card-title>
            <v-card-text>
              <span class="grey--text">{{ new Date(data.updatedAt || data.createdAt).toLocaleString() }}</span>
              -
              <span class="grey--text">{{ data.user.name }}</span>
              <span v-if="data.user._id == userId">
                <v-btn icon @click.native.stop="editDialog = true">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn icon @click="removeQuestion">
                  <v-icon class="red--text">delete</v-icon>
                </v-btn>
              </span>
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

    <v-flex xs12
      v-for="answer in answersByVotes"
      :key="answer._id"
    >
      <Answer :answer="answer" :questionId="id" @removeAnswer="removeAnswer"></Answer>
    </v-flex>

    <v-flex xs12 v-if="$store.state.isLoggedIn">
      <v-layout row>
        <v-flex xs1 class="text-xs-right">
          <v-icon>comment</v-icon>
        </v-flex>
        <v-flex class="spacer">
          <PostAnswer :questionId="id" @newAnswer="newAnswer"></PostAnswer>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Answer from '@/components/Answer'
import PostAnswer from '@/components/PostAnswer'
export default {
  props: ['id'],
  components: {
    Answer,
    PostAnswer
  },
  data () {
    return {
      editDialog: false,
      editTitle: null,
      editBody: null,
      data: {
        user: {},
        upVotes: [],
        downVotes: [],
        answers: []
      }
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
      return Math.abs(this.data.upVotes.length - this.data.downVotes.length)
    },
    upVoted () {
      return this.data.upVotes.includes(this.$store.state.user._id)
    },
    downVoted () {
      return this.data.downVotes.includes(this.$store.state.user._id)
    },

    answersByVotes () {
      return this.data.answers.sort((a, b) => {
        return (a.upVotes.length - a.downVotes.length) < (b.upVotes.length - b.downVotes.length) ? 1 : (a.upVotes.length - a.downVotes.length) === (b.upVotes.length - b.downVotes.length) ? 0 : -1
      })
    }
  },
  methods: {
    ...mapMutations([
      'removeAQuestion'
    ]),

    getOneQuestion () {
      this.$http.get(`/question/${this.id}`)
      .then(({data}) => {
        this.data = data
      })
      .catch(err => console.log(err))
    },

    vote (val) {
      this.$http.patch(`/question/${this.data._id}/${val}vote`, {}, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        let userId = this.$store.state.user._id
        if (this[`${val}Voted`]) {
          // if already voted, remove data in data.upVotes
          this.data[`${val}Votes`].splice(this.data[`${val}Votes`].indexOf(userId), 1)
        } else {
          // else, update component's data
          this.data[`${val}Votes`].push(userId)
        }
        this.$store.commit('voteQuestion', {
          val,
          id: this.id,
          votes: this.data[`${val}Votes`]
        })
      })
      .catch(err => console.log(err))
    },

    editQuestion (e) {
      e.preventDefault()
      this.$http.put(`/question/${this.id}`, {
        title: this.editTitle,
        body: this.editBody
      }, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        this.$store.commit('updateQuestion', {
          id: this.id,
          title: this.editTitle,
          body: this.editBody
        })

        this.data.title = this.editTitle
        this.data.body = this.editBody

        this.editDialog = false
      })
      .catch(err => console.log(err))
    },

    removeQuestion () {
      this.$http.delete(`/question/${this.id}`, {
        headers: {
          token: this.$store.state.token
        }
      })
      .then(({data}) => {
        this.removeAQuestion(this.id)
        this.$router.push({name: 'Home'})
      })
      .catch(err => console.log(err))
    },

    newAnswer (payload) {
      this.data.answers.push(payload)
    },

    removeAnswer (id) {
      this.data.answers = this.data.answers.filter(answer => answer._id !== id)
    }
  },
  created () {
    this.getOneQuestion()
  },
  watch: {
    editDialog (newVal) {
      if (newVal === false) {
        this.editTitle = null
        this.editBody = null
      } else {
        this.editTitle = this.data.title
        this.editBody = this.data.body
      }
    }
  }
}
</script>
