<template>
  <div class="page">
    <el-button-group>
      <el-button type="primary" size="small" icon="el-icon-edit" @click="add" :disabled="!right.add">新增</el-button>
<!--      <el-button type="primary" size="small" icon="el-icon-share">分享</el-button>-->
      <el-button type="primary" size="small" icon="el-icon-delete" :disabled="!right.delete">删除</el-button>
    </el-button-group>
    <el-select @change="selectChange" v-if="right.select" v-model="value" size="small" placeholder="请选择" class="selector">
      <el-option
              v-for="item in options"
              :key="item.index"
              :label="item.title"
              :value="item.index">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "MenuControl",
    props:{
      path:{
        type:String,
        default:''
      },
      right:{
        type:Object,
        default(){
          return{
            add:false,
            delete:false,
            select:false
          }
        }
      },
      options:{
        type:Array,
        default(){
          return [{
            index: 'none',
            title: '暂无数据'
          }]
        }
      }

    },
    data(){
      return{
        value: ''
      }
    },
    methods: {
      selectChange(e){
        this.$emit('selectChange',e)
      },
      add(){
        if(this.path!=''){
          this.$router.push({
            path:this.path
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    width: 100%;
    padding: 10px 10px 20px 0;
    .selector{
      margin-left: 50px;
    }
  }

</style>
