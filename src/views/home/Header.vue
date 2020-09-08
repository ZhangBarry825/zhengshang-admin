<template>
  <div class="page">
    <MenuTitle title="导航信息"></MenuTitle>
    <el-tabs type="border-card">
      <el-tab-pane label="定时任务补偿" v-for="(item,index) in ruleForm">
        <span slot="label">{{item.title}}</span>
        <el-table
          v-loading="loading"
          :data="item.config"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            width="280">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                disabled
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import MenuTitle from "@/components/MenuTitle/MenuTitle";
  import Uploader from "@/components/Article/uploader/uploader";
  import {editBanner, editFooterInfo, editHeaderDetail, fetchFooterInfo, fetchHeaderDetail} from "@/api/admin";

  export default {
    name: "Footer",
    components: {
      MenuTitle,
      Uploader,
    },
    data() {
      return {
        loading:false,
        ruleForm: {
          qq: '',
        },
        siteInfo: null,
        rules: {
          qq: [
            {required: true, message: '请填写QQ邮箱', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/home/banner/edit?id='+row.id)
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      fetchData() {
        this.loading=true
        let that = this
        fetchHeaderDetail().then((res) => {
          console.log(res.data)
          that.ruleForm = res.data
          that.loading=false
        })
      },
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData={
              qq: that.ruleForm.qq,
            }
            editHeaderDetail({
              ...formData,
            }).then(res => {
              if (res.code == 1) {
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
    },
    mounted() {
      this.fetchData()
    }

  }
</script>

<style scoped>

</style>
