<template>
  <v-card>
    <v-list three-line>
      <v-subheader v-text="title"></v-subheader>
      <SingleListItem
        v-for="question in pickedNewestQuestions"
        :item="question"
        :key="question._id"
      ></SingleListItem>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import SingleListItem from '@/components/SingleListItem'
export default {
  name: 'LatestQuestions',
  components: {
    SingleListItem
  },
  data () {
    return {
      title: 'Latest Questions'
    }
  },
  computed: {
    ...mapGetters([
      'newestQuestion'
    ]),
    pickedNewestQuestions () {
      return this.newestQuestion.slice(0, 3)
    }
  }
}
</script>
