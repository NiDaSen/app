<template>
  <div id="app">
    <MyHeaders />
    <router-view></router-view>
    <hr>
    <MyFooters v-show='$route.meta.show' />
  </div>
  </div>
</template>

<script>
  import MyHeaders from './components/Header/index.vue'
  import MyFooters from './components/Footer/index.vue'
  export default {
    name: 'App',
    components: { MyHeaders, MyFooters },
    mounted() {
      this.$store.dispatch('category/cateforyList');
    },
  }
</script>

<style>

</style>
