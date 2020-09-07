<template>
<div class="page">
  <MenuTitle :title="isAdd?'添加合作伙伴':'编辑合作伙伴'"></MenuTitle>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="名称" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
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
  import Uploader from '@/components/Article/uploader/uploader'
  import {addPartner, editBanner, editPartner, fetchPartnerDetail} from "@/api/admin";
    export default {
      name: "PartnerEdit",
      components: {
        MenuTitle,
        Uploader,
      },
      data(){
        return{
          isAdd:false,
          ruleForm: {
            id:'',
            title: '',
            img:''
          },
          rules: {
            title: [
              { required: true, message: '请输入标题', trigger: 'blur' },
              { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
            ],
            img: [
              { required: true, message: '请上传图片', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        imgSubmit(path){
          this.ruleForm.img = path
          ////console.log(path,'成功提交！')
        },
        imgRemove(){
          this.ruleForm.imageUrl = ''
          ////console.log('成功删除！')
        },
        async fetchData(){
          let res=await fetchPartnerDetail({id:this.ruleForm.id})
          this.ruleForm.id=res.data.id
          this.ruleForm.img=res.data.img
          this.ruleForm.title=res.data.title
          this.ruleForm.sort=res.data.sort
          this.ruleForm.link=res.data.link
        },
        submitForm(formName) {
          let that = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(that.isAdd){
                addPartner({
                  ...this.ruleForm,
                }).then(res=>{
                  if(res.code==1){
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    setTimeout(()=>{
                      that.$router.back()
                    },1000)
                  }
                })
              }else {
                editPartner({
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
      },
      mounted() {
        if(this.$route.query.id){
          this.ruleForm.id=this.$route.query.id
          this.fetchData()
        }else {
          this.isAdd=true
        }
      }
    }
</script>

<style scoped>

</style>
