<template>
  <div class="page">
    <MenuTitle title="底部信息"></MenuTitle>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="QQ邮箱" prop="qq">
        <el-input v-model="ruleForm.qq"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="copyright" prop="copyright">
        <el-input v-model="ruleForm.copyright"></el-input>
      </el-form-item>
      <el-form-item label="icp备案" prop="icp">
        <el-input v-model="ruleForm.icp"></el-input>
      </el-form-item>
      <el-form-item label="公司总部" >
        <el-input v-model="ruleForm.companys[0].name"></el-input>
      </el-form-item>
      <el-form-item label="总部地址" >
        <el-input v-model="ruleForm.companys[0].place"></el-input>
      </el-form-item>
      <el-form-item label="公司分部一" >
        <el-input v-model="ruleForm.companys[1].name"></el-input>
      </el-form-item>
      <el-form-item label="分部地址">
        <el-input v-model="ruleForm.companys[1].place"></el-input>
      </el-form-item>
      <el-form-item label="公司分部二">
        <el-input v-model="ruleForm.companys[2].name"></el-input>
      </el-form-item>
      <el-form-item label="分部地址">
        <el-input v-model="ruleForm.companys[2].place"></el-input>
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
  import {editBanner, editFooterInfo, fetchFooterInfo} from "@/api/admin";

  export default {
    name: "Footer",
    components: {
      MenuTitle,
      Uploader,
    },
    data() {
      return {
        ruleForm: {
          icp: '',
          qq: '',
          copyright: '',
          companys: [
            {
            name: '',
            place: ''
          },
            {
              name: '',
              place: ''
            },
            {
              name: '',
              place: ''
            }]
        },
        siteInfo: null,
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          copyright: [
            {required: true, message: '请输入copyright', trigger: 'blur'}
          ],
          qq: [
            {required: true, message: '请填写QQ邮箱', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '请填写联系电话', trigger: 'blur'}
          ],
          icp: [
            {required: true, message: '请填写icp备案信息', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      fetchData() {
        let that = this
        fetchFooterInfo().then((res) => {
          console.log(res.data)
          that.ruleForm = res.data
        })
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData={
              icp: that.ruleForm.icp,
              qq: that.ruleForm.qq,
              tel: that.ruleForm.tel,
              copyright: that.ruleForm.copyright,
              companys: JSON.stringify(that.ruleForm.companys)
            }
            editFooterInfo({
              ...formData,
            }).then(res => {
              if (res.code == 1) {
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
    },
    mounted() {
      this.fetchData()
    }

  }
</script>

<style scoped>

</style>
