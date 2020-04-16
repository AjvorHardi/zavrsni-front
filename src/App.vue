<template>
  <div id="app">
    <the-navbar v-if="!this.$store.state.user"/>
    <the-navbar-two v-if="this.$store.state.user"/>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import TheNavbarTwo from './components/TheNavbarTwo.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheNavbarTwo
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
