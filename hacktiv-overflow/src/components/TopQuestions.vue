<template>
  <v-card>
    <v-list three-line>
      <v-subheader v-text="title"></v-subheader>
      <v-list-tile avatar ripple v-for="(item, index) in items" v-bind:key="item.title" @click="">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title class="grey--text text--darken-4">{{ item.headline }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
          <v-icon class="grey--text text--lighten-1">star_border</v-icon>
        </v-list-tile-action>
        <v-divider v-if="index + 1 < items.length"></v-divider>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      title: 'Top Questions',
      items: [{
        action: '15 min',
        headline: 'I\'ll be in your neighborhood doing asdasd asad...',
        title: 'How to blablabla',
        subtitle: 'rahmat'
      }, {
        action: '2 hr',
        headline: 'Summer BBQ',
        title: 'me, Scrott, Jennifer',
        subtitle: 'Wish I could come, but I\'m out of town this weekend.'
      }, {
        action: '6 hr',
        headline: 'Oui oui',
        title: 'Sandra Adams',
        subtitle: 'Do you have Paris recommendations? Have you ever been?'
      }]
    }
  }
}
</script>
