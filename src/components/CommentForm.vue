<template>
  <div>
    <form @submit.prevent="createNewComment">
      <div class="form-group">
        <label for="comment">Unesite komentar</label>
        <textarea v-model="newComment.body" class="form-control" id="comment" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            newComment: {}
        }
    },
    methods: {
        ...mapActions(['createComment']),
        createNewComment() {
            this.newComment.gradebook_id = this.$route.params.id;
            this.createComment(this.newComment).then(() => {
                this.newComment = {};
            })
        }
    },
    created() {
        this.getSingleGradebook(this.$route.params.id);
    }
};
</script>

<style lang="scss" scoped>
</style>