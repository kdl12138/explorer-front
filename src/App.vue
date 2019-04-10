<template>
  <div id="app">
    <div class="wraper">
      <isHead></isHead>
      <router-view/>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import isHead from '@/components/head.vue'
import foot from '@/components/footer.vue'

export default {
  name: 'App',
  components: {
    isHead,
    foot
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1e2022;
  .wraper {
    min-height: 100vh;
    padding-bottom: 256px;
  }
}
</style>
