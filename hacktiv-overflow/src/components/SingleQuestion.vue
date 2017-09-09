<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card raised class="amber lighten-5">
        <v-layout>
          <v-flex class="spacer pa-0">
            <v-card-title primary-title class="pb-0">
              <div>
                <div class="headline amber--text text--darken-4">Top western road trips</div>
                <span class="grey--text text--darken-4">1,000 miles of wonder</span>
              </div>
            </v-card-title>
            <v-card-text>
              <span class="grey--text">rahmat</span>
            </v-card-text>
          </v-flex>
          <div class="pa-2">
            <v-layout column class="text-xs-center">
              <v-flex xs12 class="pa-0">
                <v-btn icon class="ma-0">
                  <v-icon>arrow_upward</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 class="pa-1">
                2
              </v-flex>
              <v-flex xs12 class="pa-0">
                <v-btn icon class="ma-0">
                  <v-icon>arrow_downward</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-layout row>
        <v-flex xs1 class="text-xs-right">
          <v-icon>comment</v-icon>
        </v-flex>
        <v-flex class="spacer">
          <Answer></Answer>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs1 class="text-xs-right">
          <v-icon>comment</v-icon>
        </v-flex>
        <v-flex class="spacer">
          <Answer></Answer>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <v-layout row>
        <v-flex xs1 class="text-xs-right">
          <v-icon class="amber--text">comment</v-icon>
        </v-flex>
        <v-flex class="spacer">
          <PostAnswer></PostAnswer>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Answer from '@/components/Answer'
import PostAnswer from '@/components/PostAnswer'
export default {
  components: {
    Answer,
    PostAnswer
  }
}
</script>
