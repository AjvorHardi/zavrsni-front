<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top " style="background-color: #e3f2fd;">
      <router-link to="/" class="navbar-brand">GradebookApp</router-link>
      
      <div v-if="isAuthenticated" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/gradebooks">Gradebooks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/teachers">All Professors</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gradebook/1">Blank</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gradebooks/create">Add Gradebook</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/teachers/create">Add Teacher</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0 .mr-5" type="submit">Search</button>
          <button type="button" class="btn btn-info .ml-5" @click="logout">Logout</button>
        </form>
      </div>

    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
    isLoggedIn() {
      return localStorage.getItem('token');
    }
  },
  methods: {
    ...mapActions(['logoutAction']),
    logout() {
      this.logoutAction();
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>