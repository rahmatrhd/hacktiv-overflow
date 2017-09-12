<template>
  <v-layout wrap>
    <v-flex xs12 v-if="$store.state.isLoggedIn">
      <PostQuestion @newQuestion="newQuestion"></PostQuestion>
    </v-flex>
    <v-flex
      xs12
      v-for="question in newestQuestion"
      :key="question._id"
    >
      <Question :question="question"></Question>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import PostQuestion from '@/components/PostQuestion'
import Question from '@/components/Question'
export default {
  components: {
    PostQuestion,
    Question
  },
  computed: {
    ...mapGetters([
      'newestQuestion'
    ])
  },
  methods: {
    newQuestion (question) {
      this.$store.commit('addQuestion', question)
    }
  }
}
</script>
