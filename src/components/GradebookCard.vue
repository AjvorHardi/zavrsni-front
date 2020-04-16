<template>
  <div>
    <div class="card" style="width: auto">
      <div class="card-body">
        <h3><router-link :to="`/gradebooks/${gradebook.id}`" class="card-title">{{gradebook.title}}</router-link></h3>
        <router-link v-if="razredni" :to="`/teachers/${gradebook.teacher.id}`" class="card-subtitle mb-2 text-muted">{{razredni.firstName}} {{razredni.lastName}}</router-link>  
        <h4 v-if="!razredni">Nema razrednog</h4>
        <p> {{gradebook.created_at.toLocaleString()}} </p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gradebook: {
      type: Object,
      required: true
    }
  },
  computed: {
    razredni() {
      return this.gradebook.teacher
      }
    }
};
</script>