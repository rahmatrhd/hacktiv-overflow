<template>
  <v-card>
    <v-container fluid class="pa-0">
      <v-layout wrap>
        <v-flex xs12 class="pa-0">
          <v-subheader>Your Answer</v-subheader>
        </v-flex>
        <v-flex xs12 class="pa-0">
          <v-divider></v-divider>
          <v-text-field
            label="Message"
            v-model="title"
            full-width
            multi-line
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn block flat class="amber--text">
        Post <v-icon right>send</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
}
</script>
