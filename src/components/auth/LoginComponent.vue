<template>
    <div class="container">
        <form class="form-signin" @submit.prevent="login">
        <h2>Login Page</h2>
        <input
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            placeholder="Email Address"
            required
        />
        <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required
        />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>
        <br>
        <p> {{ error.toUpperCase() }} </p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
        ...mapActions(['loginAction']),
        login() {
            this.loginAction({
                email: this.email,
                password: this.password
            }).then(() => {
                this.$router.push('/');
            }).catch(e => {
                this.error = e.response.data.error;
            })
            
        }
    },
    }
</script>

<style lang="scss" scoped>

</style>