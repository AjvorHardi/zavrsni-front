<template>
  <div>
    <h1>{{ teacher.lastName }}</h1>
    <h4>{{ teacher.firstName }}</h4>
    <h3>
      <router-link v-if="ifGradebook"
        :to="`/gradebooks/${teacher.gradebook.id}`"
        class="card-title">
        {{ teacher.gradebook.title }}
        </router-link><p>Broj ucenika: {{ teacher.gradebook.student }}</p>
    </h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["getSingleTeacher"])
  },
  computed: {
    ...mapGetters(["teacher"]),
    ifGradebook() {
      return this.teacher.gradebook.id
    }
  },
  created() {
    this.getSingleTeacher(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>