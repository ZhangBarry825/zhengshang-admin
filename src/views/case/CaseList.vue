<template>
    <div class="page">
      <MenuTitle title="客户案例列表"></MenuTitle>
      <MenuControl :right="{add:true,select:true}" path="/case/edit" :options="caseClassList" @selectChange="selectChange"></MenuControl>
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
        <el-table-column label="图片" width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img"
              fit="cover"
              :preview-src-list="[scope.row.img]"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="remark"
          width="300">
        </el-table-column>
        <el-table-column label="操作" >
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

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>

    </div>
</template>

<script>
    import MenuTitle from "@/components/MenuTitle/MenuTitle";
    import MenuControl from "@/components/MenuControl/MenuControl";
    import {deleteCaseDetail, deletePartner, fetchCaseClass, fetchCaseList} from "@/api/admin";

    export default {
        name: "CaseList",
      components: {
        MenuTitle,
        MenuControl
      },
      data() {
        return {
          pindex:'',
          total:0,
          pageNum:1,
          pageSize:10,
          loading:false,
          tableData: [{}],
          caseClassList:[]
        }
      },
      methods:{
        handleEdit(index, row) {
          console.log(index, row);
          this.$router.push('/case/edit?id='+row.id)
        },
        handleDelete(index, row) {
          let that = this
          console.log(index, row);
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteCaseDetail({id: row.id}).then(res=>{
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
        selectChange(e){
          this.pindex=e
          this.fetchData(1)
        },
        pageChange(e){
          console.log(e)
          this.fetchData(e)
        },
        async fetchCaseClass(){
          let that = this
          let res = await fetchCaseClass()
          res.data.unshift({
            index:"",
            title:"全部"
          })
          this.caseClassList=res.data
          console.log(res.data)
        },
        async fetchData(pageNum=1){
          let that = this
          this.loading=true
          let res = await fetchCaseList({
            page:pageNum,
            pindex:that.pindex,
            limit:that.pageSize
          })
          if(res.code ==1 ){
            this.pageNum=pageNum
            this.total=res.data.total
            this.tableData=res.data.rows || []
          }

          setTimeout(()=>{
            that.loading=false
          },500)
          console.log(res)
        }
      },

      mounted() {

        this.fetchCaseClass()
        this.fetchData()

      }
    }
</script>

<style scoped lang="scss">
.page{
  .pagination{
    width: 100%;
    padding: 50px 0;
  }
}
</style>
