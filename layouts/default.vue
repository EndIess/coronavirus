<template>
  <v-app dark>
    <v-main>
      <navbar />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: {
    Navbar,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss"></style>
