<template>
  <v-list-tile ripple @click="" :to="{name: 'SingleQuestion', params: {id: item._id}}">
    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.body }}</v-list-tile-sub-title>
      <v-list-tile-sub-title>{{ item.user.name }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-list-tile-action-text>{{ new Date(item.updatedAt || item.createdAt).toLocaleDateString() }}</v-list-tile-action-text>
      <span>
        <v-icon class="grey--text text--lighten-1">comment</v-icon>
        <v-list-tile-action-text>{{ item.answers.length }}</v-list-tile-action-text>
      </span>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: ['item']
}
</script>
