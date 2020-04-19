<template>
  <div>
      <gradebook-card v-for="gradebook in gradebooksToShow" :key="gradebook.id" :gradebook="gradebook"/>
      <button v-if="!loadButtonNeeded" @click="loadMore">Load more</button>
      <p v-if="ifNoGradebooks">Nema dnevnika</p>
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
        ...mapGetters(['gradebooks', 'gradebooksToShow', 'endIndex', 'loadButtonNeeded']),
        ifNoGradebooks() {
            return this.gradebooks.length === 0
        }
    },
    methods: {
        ...mapActions(['getGradebooks', 'load']),
        loadMore() {
            this.load()
        }
    },
    beforeRouteEnter(to, form, next) {
        next(vm => vm.getGradebooks());
    }
};
</script>

<style lang="scss" scoped>
</style>