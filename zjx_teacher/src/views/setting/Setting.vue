<template>
  <div class="app-container">
    {{ teacher }}
  </div>
</template>

<script>
import teacherApi from '@/api/person/teacher'

export default {
  name: 'Setting',

  data() {
    return {
      teacher: {
      }
    }
  },

  mounted() {
    this.getUserInfo()
  },

  methods: {
    getUserInfo() {
      teacherApi.getUserInfo().then(response => {
        this.teacher = response.data.item
      })
    }
  }
}
</script>

<style scoped>

</style>
