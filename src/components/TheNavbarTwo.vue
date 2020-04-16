<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light fixed-top " style="background-color: #e3f2fd;">
        <router-link to="/" class="navbar-brand">GradebookApp</router-link>
        <div  class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
        </ul>
        </div>
        </nav>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>