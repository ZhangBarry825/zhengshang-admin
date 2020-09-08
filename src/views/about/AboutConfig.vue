<template>
  <div class="page">
    <MenuTitle title="页面配置"></MenuTitle>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="背景图片" prop="img">
        <Uploader :backImg="ruleForm.img" :limitNum="1" @handSubmit="imgSubmit" @handRemove="imgRemove"></Uploader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
      <el-form-item label="项目开发经验" prop="first">
        <el-input v-model="ruleForm2.first" ></el-input>
      </el-form-item>
      <el-form-item label="技术团队" prop="first">
        <el-input v-model="ruleForm2.second" ></el-input>
      </el-form-item>
      <el-form-item label="合作客户" prop="first">
        <el-input v-model="ruleForm2.third" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm2('ruleForm2')">保存</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="ruleForm3"  ref="ruleForm3" label-width="120px" class="demo-ruleForm">
      <el-form-item label="公司图片" prop="img">
        <el-upload
          :action="baseUrl+'/admin/upload/save'"
          list-type="picture-card"
          name="image"
          :limit="6"
          :file-list="fileList3"
          :http-request="uploadRequest3"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm3('ruleForm3')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import MenuTitle from "@/components/MenuTitle/MenuTitle";
  import Uploader from "@/components/Article/uploader/uploader";
  import {
    editAboutConfig, editAboutConfigData, editAboutConfigEnv,
    fetchAboutConfig, fetchAboutConfigData, fetchAboutConfigEnv,
  } from "@/api/admin";
  import axios from "axios";

  export default {
    name: "AboutConfig",
    components: {
      MenuTitle,
      Uploader,
    },
    data(){
      return{
        baseUrl:this.$imgBaseUrl,
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm3:{
          img1:'',
          img2:'',
          img3:'',
          img4:'',
          img5:'',
          img6:'',
        },
        fileList3:[],
        ruleForm2:{
          first:0,
          second:0,
          third:0
        },
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
        },
        rules2: {
          first: [
            { required: true, message: '请输入项目开发经验', trigger: 'blur' },
          ],
          second: [
            { required: true, message: '请输入技术团队', trigger: 'blur' },
          ],
          third: [
            { required: true, message: '请输入合作客户', trigger: 'blur' },
          ],
        },
      }
    },
    methods:{
      async fetchData(){
        let res=await fetchAboutConfig()
        console.log(res.data)
        this.ruleForm=res.data

        let res2=await fetchAboutConfigData()
        this.ruleForm2=res2.data

        let res3=await fetchAboutConfigEnv()
        this.ruleForm3=res3.data
        for (const key3 in res3.data) {
          if(res3.data[key3]!=''){
            this.fileList3.push({
              name:key3,
              url:res3.data[key3]
            })
          }
        }
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editAboutConfig({
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
      submitForm2(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editAboutConfigData({
              ...that.ruleForm2,
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
      submitForm3(formName) {
        let that = this
        that.formatRuleForm3()
        console.log(that.ruleForm3,3333333333333)

        this.$refs[formName].validate((valid) => {
          if (valid) {
            editAboutConfigEnv({
              ...that.ruleForm3,
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
      imgSubmit(path){
        this.ruleForm.img = path
        ////console.log(path,'成功提交！')
      },
      imgRemove(){
        this.ruleForm.imageUrl = ''
        ////console.log('成功删除！')
      },
      imgSubmit3(path){
        this.ruleForm3.img = path
        ////console.log(path,'成功提交！')
      },
      imgRemove3(){
        this.ruleForm.imageUrl = ''
        ////console.log('成功删除！')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.ruleForm3[file.name]=''
        console.log(this.ruleForm3,888)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadRequest3(params) {
        console.log(123123)
        let that = this
        const file = params.file,
          fileType = file.type,
          isImage = fileType.indexOf("image") != -1,
          isLt2M = file.size / 1024 / 1024 < 2;
        // 这里常规检验，看项目需求而定
        if (!isImage) {
          this.$message.error("文件类型仅限png,jpg和gif!");
          return;
        }
        if (!isLt2M) {
          this.$message.error("文件大小必须小于2M");
          return;
        }
        // 根据后台需求数据格式
        let formData = new FormData();
        // 文件对象
        formData.append("image", file);
        return new Promise((resolve, reject) => {
          axios.post(that.baseUrl+'/admin/upload/save',formData).then(res => {
            if (res.data || res.data.code == 1) {
              that.appendRuleForm3(res.data.data)
              resolve(res.data)
            }
          }).catch((e) => {
            reject(e)
          })
        })
      },
      appendRuleForm3(url){
        for (const key in this.ruleForm3) {
          if(this.ruleForm3[key]==''){
            this.ruleForm3[key]=url
            console.log(key)
            break
          }
        }
      },
      formatRuleForm3(){
        let newArr=[]
        for (const key in this.ruleForm3) {
          if(this.ruleForm3[key]!=''){
            newArr.push(this.ruleForm3[key])
          }
        }
        console.log(newArr,6666)
        this.ruleForm3={
          img1:'',
          img2:'',
          img3:'',
          img4:'',
          img5:'',
          img6:'',
        }
        for (let i =0;i<newArr.length;i++){
          this.ruleForm3['img'+(i+1)+'']=newArr[i]
        }
      }
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
