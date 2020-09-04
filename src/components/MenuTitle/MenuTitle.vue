<template>
  <div class="page">
    <el-page-header @back="goBack" title="返回" :content="title"></el-page-header>
  </div>
</template>

<script>
  export default {
    name: "MenuTitle",
    props:{
      title:{
        type:String,
        default:'标题'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    width: 100%;
    padding:0 0 20px 0;
  }

</style>
