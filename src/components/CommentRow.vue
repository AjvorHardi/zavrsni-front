<template>
    <div>
        <ul>
        <li class="text-left">
           {{comment.id}} {{comment.body}} {{comment.user}} 
        <button v-if="isAuthor" @click="deleteThisComment" class="btn-danger">Delete</button>
        </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
    export default {
    props: {
        comment: {
            type: Object
            }
    },
    computed: {
        ...mapGetters(['user']),
        isAuthor() {
            const user = this.user;
            return this.comment.user_id === user.id
        }
    },
    methods: {
        ...mapActions(['getUser', 'deleteComment']),
        deleteThisComment() {
            this.deleteComment(this.$route.params.id, this.comment.id);
        }
    },
    
}
</script>

<style lang="scss" scoped>

</style>