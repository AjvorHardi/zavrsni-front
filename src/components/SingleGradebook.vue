<template>
    <div>
        <div class="text-left">
        <button @click="addStudentsForm" type="button" class="btn btn-light">Add New Students</button>
        </div>
        <h1> {{ gradebook.title }} </h1>
        <h4 v-if="razredni"> {{ gradebook.teacher.firstName }} {{ gradebook.teacher.lastName }} </h4>
        <ul class="list-group">
            <li v-for="student in gradebook.student" :key="student.id" class="list-group-item text-left">
                {{student.firstName}} {{student.lastName}}
            </li>
        </ul>
        <div class="text-left">
        <br>
        <button @click="deleteThisGradebook" type="button" class="btn btn-danger">Delete Gradebook</button>
        </div>
        <comments-list :comments="gradebook.comment"/>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CommentsList from './CommentsList'

    export default {
        components: {
            CommentsList,
        },
        methods: {
            ...mapActions(['getSingleGradebook', 'deleteGradebook']),
            addStudentsForm() {
                this.$router.push(`/gradebooks/${this.$route.params.id}/students/create`)
            },
            deleteThisGradebook() {
                this.deleteGradebook(this.$route.params.id);
                this.$router.push('/gradebooks');
            }
        },
        computed: {
            ...mapGetters(['gradebook']),
            razredni() {
                return this.gradebook.teacher
            }
        },
        created() {
            this.getSingleGradebook(this.$route.params.id);
        }
        
    }
</script>

<style lang="scss" scoped>

</style>