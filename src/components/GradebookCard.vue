<template>
  <div>
    <div class="card" style="width: auto">
      <div class="card-body">
        <h3><router-link :to="`/gradebooks/${gradebook.id}`" class="card-title">{{gradebook.title}}</router-link></h3>
        <h4><router-link v-if="razredni" :to="`/teachers/${gradebook.teacher.id}`" class="card-subtitle mb-2">{{razredni.firstName}} {{razredni.lastName}}</router-link></h4> 
        <h4 v-if="!razredni">Nema razrednog</h4>
        <p> {{ vreme }} </p>
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
      },
    vreme() {
      const utcDate =  this.gradebook.created_at;
      const localDate = new Date(utcDate);
      return localDate.toLocaleString()
    }
    }
};
</script>