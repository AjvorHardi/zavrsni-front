<template>
    <div>
        <teacher-row v-for="teacher in teachersToShow" :key="teacher.id" :teacher="teacher"></teacher-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TeacherRow from './TeacherRow';

export default {
    components: {
        TeacherRow
    },
    computed: {
        ...mapGetters(['teachers', 'teachersToShow'])
    },
    methods: {
        ...mapActions(['getTeachers'])
    },
    beforeRouteEnter(to, form, next) {
        next(vm => vm.getTeachers());
    }
};
</script>

<style lang="scss" scoped>

</style>