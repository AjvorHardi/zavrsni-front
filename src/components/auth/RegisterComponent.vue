<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="register">
      <h2>Register Page</h2>
      <input
        v-model="firstName"
        type="text"
        class="form-control"
        name="firstName"
        placeholder="First Name"
        required
      />
      <input
        v-model="lastName"
        type="text"
        class="form-control"
        name="lastName"
        placeholder="Last Name"
        required
      />
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
      <input
        v-model="password_confirmation"
        type="password"
        class="form-control"
        name="password_confirmation"
        placeholder="Confirm Password"
        required
      />

      <div class="form-check text-left">
        <input type="checkbox" class="form-check-input" id="terms">
        <label class="form-check-label" for="terms">Accepted terms and conditions</label>
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    </form>
    
        <p v-for="(error, index) in errors" 
        :key="index">
        {{error[0]}}
        </p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: []
        }
    },
    methods: {
        ...mapActions(['registerAction']),
        register() {
            this.registerAction({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }).then(() => {
                this.$router.push('/');
            }).catch(e => {
                this.errors = []
                const err = Object.values(e.response.data);
                err.forEach(error => {
                    this.errors.push(error);
                });
            });
        },
    }
};
</script>

<style lang="scss" scoped>
</style>