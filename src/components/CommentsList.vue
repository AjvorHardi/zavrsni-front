<template>
  <div>
    <br />
    <br />
    <h3 class="text-left">Comments</h3>
        <comment-row v-for="comment in comments" :key="comment.id" :comment="comment" class="text-left">
        </comment-row>
    <comment-form/>
  </div>
</template>

<script>
import CommentForm from './CommentForm'
import CommentRow from './CommentRow'

export default {
    components: {
        CommentForm,
        CommentRow
    },
    props: {
        comments: {
            type: Array
        }
  }
};
</script>

<style lang="scss" scoped>
</style>