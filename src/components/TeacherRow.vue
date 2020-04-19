<template>
  <div>
          <router-link
        :to="`/teachers/${teacher.id}`"
        class="card-title"><h4>{{teacher.firstName}} {{ teacher.lastName}}</h4>
        </router-link>
      
      <p>{{ razred }}</p>
  </div>
</template>

<script>
export default {
  props: {
    teacher: {
      type: Object,
      required: true
    }
  },
  computed: {
    razred() {
      if (!this.teacher.gradebook) {
        return "Teacher is available" 
      } else {
        return this.teacher.gradebook.title
      }
    }
  },
};
</script>