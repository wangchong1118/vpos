<template>
  <div id="indexPage">
    <LeftNav />
    <Main />
  </div>
</template>

<script>
  import LeftNav from '@/components/LeftNav'
  import Main from '@/components/Main'

  export default {
    name: 'index',
    components: {
      LeftNav,
      Main
    }
  }
</script>

<style scoped>
  #indexPage{
    height: 100%;
    width: 100%;
    float: left;
    overflow: hidden;
  }
</style>
