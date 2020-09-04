<template>
  <div class="page">
    <el-button-group>
      <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
      <el-button type="primary" size="small" icon="el-icon-share">分享</el-button>
      <el-button type="primary" size="small" icon="el-icon-delete">删除</el-button>
    </el-button-group>
  </div>
</template>

<script>
  export default {
    name: "MenuControl",
    props:{
      title:{
        type:String,
        default:'标题'
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .page {
    width: 100%;
    padding: 10px 10px 10px 0;
  }

</style>
