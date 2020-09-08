<template>
  <div class="page">
    <MenuTitle :title="isAdd?'添加轮播图':'编辑轮播图'"></MenuTitle>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <Uploader :backImg="ruleForm.img" :limitNum="1" @handSubmit="imgSubmit" @handRemove="imgRemove"></Uploader>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
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
  import {
    addGovBannerDetail,
    editBanner,
    editGovBannerDetail,
    fetchBannerDetail,
    fetchGovBannerDetail
  } from "@/api/admin";
  import Uploader from '@/components/Article/uploader/uploader'
  export default {
    name: "GovBannerEdit",
    components: {
      MenuTitle,
      Uploader,
    },
    data(){
      return{
        isAdd:false,
        baseImgUrl: this.$imgBaseUrl,
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
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写描述信息', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      fetchData(){
        let that = this
        fetchGovBannerDetail({id:that.ruleForm.id}).then((res)=>{
          that.ruleForm.title=res.data.title
          that.ruleForm.img=res.data.img
          that.ruleForm.content=res.data.content
          that.ruleForm.sort=res.data.sort
        })
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(that.isAdd){
              addGovBannerDetail({
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
              editGovBannerDetail({
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
      imgRemove(){
        this.ruleForm.imageUrl = ''
        ////console.log('成功删除！')
      },
    },
    mounted() {
      let id=this.$route.query.id
      if(id){
        this.ruleForm.id=id
        this.fetchData()
        console.log(id)
      }else {
        this.isAdd=true
      }

    }
  }
</script>

<style scoped lang="scss">
  .page {

  }
</style>
