<template>
  <v-card hover @click="toSingleQuestion">
    <v-layout>
      <v-flex class="spacer pa-0">
        <v-card-title primary-title class="pb-0">
          <div>
            <div class="headline amber--text text--darken-2">{{ title }}</div>
          </div>
        </v-card-title>
        <v-card-text>
          <span class="grey--text">{{ new Date(updatedAt || createdAt).toLocaleString() }}</span>
          -
          <span class="grey--text">{{ user.name }}</span>
        </v-card-text>
      </v-flex>
      <div class="pa-2">
        <v-layout column>
          <v-flex xs12>
            <v-icon>comment</v-icon> <strong>{{ answers.length }}</strong>
          </v-flex>
          <v-flex xs12>
            <v-icon :class="vote.color">{{ vote.icon }}</v-icon> <strong>{{ vote.count }}</strong>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['question'],
  data () {
    return {
      ...this.question
    }
  },
  computed: {
    vote () {
      const voteIcon = ['arrow_downward', 'arrow_upward', 'arrow_upward']
      const color = ['red--text', '', 'green--text']
      let voteCalc = this.upVotes.length > this.downVotes.length ? 1 : this.upVotes.length === this.downVotes.length ? 0 : -1
      return {
        icon: voteIcon[voteCalc + 1],
        color: color[voteCalc + 1],
        count: Math.abs(this.upVotes.length - this.downVotes.length)
      }
    }
  },
  methods: {
    toSingleQuestion () {
      this.$router.push({name: 'SingleQuestion', params: {id: this.question._id}})
    }
  }
}
</script>
