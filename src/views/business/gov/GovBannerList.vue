<template>
    <div class="page">
      <MenuTitle title="政务云-轮播图"></MenuTitle>
      <MenuControl :right="{add:true}" path="/business/gov/edit"></MenuControl>
      <el-table
        v-loading="loading"
        :data="tableData"
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
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img"
              fit="cover"
              :preview-src-list="[scope.row.img]"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="详情"
          prop="content"
          width="300">
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
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    import MenuTitle from "@/components/MenuTitle/MenuTitle";
    import Uploader from "@/components/Article/uploader/uploader";
    import {deleteGovBanner, deletePartner, fetchBannerList, fetchGovBanner} from "@/api/admin";
    import MenuControl from "@/components/MenuControl/MenuControl";
    export default {
      name: "GovBannerList",
      components: {
        MenuTitle,
        Uploader,
        MenuControl
      },
      data(){
        return{
          loading:false,
          tableData: [{}]
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
          this.$router.push('/business/gov/edit?id='+row.id)
        },
        handleDelete(index, row) {
          let that = this
          console.log(index, row);
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteGovBanner({id: row.id}).then(res=>{
              if(res.code == 1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                that.fetchData()
              }else {
                this.$message({
                  type: 'info',
                  message: '删除异常'
                });
              }
            })
          }).catch(() => { })
        },
        async fetchData(){
          let that = this
          this.loading=true
          let res = await fetchGovBanner()
          this.tableData=res.data || []
          setTimeout(()=>{
            that.loading=false
          },500)
          console.log(res)
        }
      },
      mounted() {
        this.fetchData()
      }
    }
</script>

<style scoped lang="scss">

</style>
