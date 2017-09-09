<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex d-flex md8 class="pa-0">
        <v-container class="pa-0">
          <router-view></router-view>
        </v-container>
      </v-flex>
      <v-flex d-flex md4 class="pa-0">
        <v-container class="pa-0">
          <Sidebar></Sidebar>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>
