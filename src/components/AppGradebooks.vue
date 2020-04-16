<template>
  <div>
      <gradebook-card v-for="gradebook in gradebooks" :key="gradebook.id" :gradebook="gradebook"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GradebookCard from './GradebookCard';

export default {
    components: {
        GradebookCard
    },
    computed: {
        ...mapGetters(['gradebooks'])
    },
    methods: {
        ...mapActions(['getGradebooks'])
    },
    beforeRouteEnter(to, form, next) {
        next(vm => vm.getGradebooks());
    }
};
</script>

<style lang="scss" scoped>
</style>