<template>
  <div class="page">
    <MenuTitle title="编辑行业解决方案"></MenuTitle>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <Uploader :backImg="ruleForm.img" :limitNum="1" @handSubmit="imgSubmit" @handRemove="imgRemove"></Uploader>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input  v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="功能一" >
        <el-input  v-model="ruleForm.config[0].key"></el-input>
      </el-form-item>
      <el-form-item label="描述一" >
        <el-input  v-model="ruleForm.config[0].value"></el-input>
      </el-form-item>
      <el-form-item label="功能二" >
        <el-input  v-model="ruleForm.config[1].key"></el-input>
      </el-form-item>
      <el-form-item label="描述二" >
        <el-input  v-model="ruleForm.config[1].value"></el-input>
      </el-form-item>
      <el-form-item label="功能三" >
        <el-input  v-model="ruleForm.config[2].key"></el-input>
      </el-form-item>
      <el-form-item label="描述三" >
        <el-input  v-model="ruleForm.config[2].value"></el-input>
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
  import MenuControl from "@/components/MenuControl/MenuControl";
  import {editBanner, editSolveMethod, fetchSolveMethods, fetchSolveMethodsDetail} from "@/api/admin";
  import Uploader from "@/components/Article/uploader/uploader";

  export default {
    name: "SolveMethodEdit",
    components: {
      MenuTitle,
      MenuControl,
      Uploader,
    },
    data() {
      return {
        baseImgUrl: this.$imgBaseUrl,
        ruleForm: {
          id:'',
          title: '',
          content: '',
          img:'',
          config:{}
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写描述信息', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async fetchData() {
        let that = this
        this.loading=true
        let res=await fetchSolveMethodsDetail({id:this.ruleForm.id})
        this.ruleForm=res.data

        console.log(res)
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData={
              id:this.ruleForm.id,
              title:this.ruleForm.title,
              content:this.ruleForm.content,
              config:JSON.stringify(this.ruleForm.config),
              img:this.ruleForm.img,
              link:this.ruleForm.link,
            }
            editSolveMethod({
              ...formData,
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
      this.ruleForm.id=this.$route.query.id
      this.fetchData()
    }
  }
</script>

<style scoped lang="scss">

</style>
