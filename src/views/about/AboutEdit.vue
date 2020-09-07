<template>
    <div class="page">
      <MenuTitle title="关于我们"></MenuTitle>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input disabled v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <Uploader :backImg="ruleForm.img" :limitNum="1" @handSubmit="imgSubmit" @handRemove="imgRemove"></Uploader>
        </el-form-item>
        <el-form-item label="详情" prop="content">
          <el-input :rows="10" type="textarea" v-model="ruleForm.content"></el-input>
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
    import {editAboutDetail, editBusiness, fetchAboutDetail, fetchBusinessDetail} from "@/api/admin";
    import Uploader from "@/components/Article/uploader/uploader";

    export default {
        name: "AboutEdit",
      components: {
        MenuTitle,
        Uploader,
      },
      data(){
          return{
            ruleForm: {
              title: '',
              content: '',
              img:'',
            },
            rules: {
              title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
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
          let res=await fetchAboutDetail({id:this.ruleForm.id})
          console.log(res.data)
          this.ruleForm=res.data
        },
        submitForm(formName) {
          let that = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              editAboutDetail({
                ...this.ruleForm,
              }).then(res=>{
                if(res.code==1){
                  this.$message({
                    message: '保存成功',
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
