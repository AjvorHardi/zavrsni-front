<template>
  <div>
    <form @submit.prevent="onSubmit" @reset="onReset" >
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="newGradebook.title" type="text" class="form-control" id="title" placeholder="Gradebook Title">
      </div>
      <div class="form-group">
        <label for="teacher">Izaberi razrednog staresinu:</label>
        <select v-model="newGradebook.teacher_id" class="form-control" id="teacher">
          <option v-for="teacher in availableTeachers" :key="teacher.id" :value="teacher.id">{{teacher.firstName}}</option>
        </select>
      </div>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
      
    </form>
      <p> {{error[0]}} </p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            newGradebook: {},
            error: ""
        }
    },
    methods: {
        ...mapActions(['getTeachers', 'getGradebooks', 'createGradebook']),
        onSubmit() {
            this.createGradebook(this.newGradebook).then(() => {
              this.$router.push("/gradebooks");
            }).catch(e => {
              this.error = e.response.message
            })
        },
        onReset() {
            this.$router.push("/gradebooks");
        }
    },
    computed: {
        ...mapGetters(['availableTeachers'])
    },
    beforeRouteEnter(to, form, next) {
        next(vm => {
          vm.getTeachers();
          vm.getGradebooks();
          });
    }
};
</script>

<style lang="scss" scoped>
</style>