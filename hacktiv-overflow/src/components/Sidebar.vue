<template>
  <v-layout column wrap>
    <v-flex>
      <LatestQuestions></LatestQuestions>
    </v-flex>
    <v-flex>
      <TopQuestions></TopQuestions>
    </v-flex>
  </v-layout>
</template>

<script>
import LatestQuestions from '@/components/LatestQuestions'
import TopQuestions from '@/components/TopQuestions'

export default {
  components: {
    LatestQuestions,
    TopQuestions
  }
}
</script>
