<template>
  <v-layout wrap>
    <v-flex xs12>
      <PostQuestion></PostQuestion>
    </v-flex>
    <v-flex xs12>
      <v-card hover>
        <v-layout>
          <v-flex class="spacer pa-0">
            <v-card-title primary-title class="pb-0">
              <div>
                <div class="headline amber--text text--darken-2">Top western road trips</div>
              </div>
            </v-card-title>
            <v-card-text>
              <span class="grey--text">rahmat</span>
            </v-card-text>
          </v-flex>
          <div class="pa-2">
            <v-layout column>
              <v-flex xs12>
                <v-icon>comment</v-icon> <span>2</span>
              </v-flex>
              <v-flex xs12>
                <v-icon>arrow_upward</v-icon> <span>2</span>
              </v-flex>
              <v-flex xs12>
                <v-icon>visibility</v-icon> <span>2</span>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PostQuestion from '@/components/PostQuestion'
export default {
  components: {
    PostQuestion
  }
}
</script>
