<template>
  <div class="page">
    <MenuTitle title="页面配置"></MenuTitle>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="背景图片" prop="img">
        <Uploader :backImg="ruleForm.img" :limitNum="1" @handSubmit="imgSubmit" @handRemove="imgRemove"></Uploader>
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
  import {
    editBanner,
    editBusiness,
    editBusinessConfig,
    editCaseConfig,
    fetchBusinessConfig,
    fetchBusinessDetail, fetchCaseConfig
  } from "@/api/admin";

  export default {
    name: "CaseConfig",
    components: {
      MenuTitle,
      Uploader,
    },
    data(){
      return{
        ruleForm: {
          id:'',
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
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写详情信息', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      async fetchData(){
        let res=await fetchCaseConfig()
        console.log(res.data)
        this.ruleForm=res.data
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editCaseConfig({
              ...this.ruleForm,
            }).then(res=>{
              if(res.code==1){
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
              }
            })
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
      imgRemove(){
        this.ruleForm.imageUrl = ''
        ////console.log('成功删除！')
      },
    },
    mounted() {
      let id=this.$route.query.id
      this.ruleForm.id=id
      this.fetchData()
      console.log(id)
    }
  }
</script>

<style scoped lang="scss">

</style>
