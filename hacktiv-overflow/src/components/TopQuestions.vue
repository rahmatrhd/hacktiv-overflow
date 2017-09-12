<template>
  <v-card>
    <v-list three-line :to="{name: 'SingleQuestion'}">
      <v-subheader v-text="title"></v-subheader>
      <SingleListItem
        v-for="question in pickedTopQuestions"
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
  data () {
    return {
      title: 'Top Questions'
    }
  },
  components: {
    SingleListItem
  },
  computed: {
    ...mapGetters([
      'topQuestions'
    ]),
    pickedTopQuestions () {
      return this.topQuestions.slice(0, 3)
    }
  }
}
</script>
