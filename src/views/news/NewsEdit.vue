<template>
  <div class="page">
    <MenuTitle :title="isAdd?'新增客户案例':'编辑客户案例'"></MenuTitle>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="title">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="title">
        <el-select v-model="ruleForm.pindex" placeholder="请选择">
          <el-option
            v-for="item in caseClassList"
            :key="item.index"
            :label="item.title"
            :value="item.index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="img">
        <Uploader :backImg="ruleForm.img" :limitNum="1" @handSubmit="imgSubmit" @handRemove="imgRemove"></Uploader>
      </el-form-item>
      <el-form-item label="详情" prop="content">
        <Editor v-model="ruleForm.content" :height="300"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import MenuTitle from "@/components/MenuTitle/MenuTitle";
  import Uploader from "@/components/Article/uploader/uploader";
  import Editor from '@/components/Article/Tinymce/index'
  import {
    addCaseDetail, addNewsDetail,
    editBanner,
    editBusiness,
    editCaseDetail, editNewsDetail,
    fetchBusinessDetail,
    fetchCaseClass,
    fetchCaseDetail, fetchNewsClass, fetchNewsDetail
  } from "@/api/admin";

  export default {
    name: "NewsEdit",
    components: {
      MenuTitle,
      Uploader,
      Editor
    },
    data(){
      return{
        isAdd:false,
        ruleForm: {
          id:'',
          remark:'',
          title: '',
          content: '',
          img:'',
          sort:'',
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入简介', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写新闻详情', trigger: 'blur' }
          ]
        },
        caseClassList:[]
      }
    },
    methods:{
      async fetchData(){
        let res=await fetchNewsDetail({id:this.ruleForm.id})
        console.log(res.data)
        this.ruleForm=res.data
      },
      async fetchCaseClass(){
        let that = this
        let res = await fetchNewsClass()
        this.caseClassList=res.data
        console.log(res.data)
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(that.isAdd){
              addNewsDetail({
                ...this.ruleForm,
              }).then(res=>{
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                setTimeout(()=>{
                  that.$router.back()
                },1000)
              })
            }else {
              editNewsDetail({
                ...this.ruleForm,
              }).then(res=>{
                if(res.code==1){
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    that.$router.back()
                  },1000)
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      imgSubmit(path){
        this.ruleForm.img = path
        ////console.log(path,'成功提交！')
      },
      imgSubmit2(path){
        this.ruleForm.content = path
        ////console.log(path,'成功提交！')
      },
      imgRemove(){
        this.ruleForm.imageUrl = ''
        ////console.log('成功删除！')
      },
      imgRemove2(){
        this.ruleForm.content = ''
        ////console.log('成功删除！')
      },
    },
    mounted() {
      this.fetchCaseClass()
      let id=this.$route.query.id
      if(id){
        this.ruleForm.id=id
        this.fetchData()
      }else {
        this.isAdd=true
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
