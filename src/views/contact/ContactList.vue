<template>
  <div class="page">
    <MenuTitle title="客户案例列表"></MenuTitle>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="详情"
        prop="remark">
      </el-table-column>
      <el-table-column
        label="电话"
        prop="mobile">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="ctime">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            disabled
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
  import {
    deleteCaseDetail,
    deleteContactDetail,
    deletePartner,
    fetchCaseClass,
    fetchCaseList,
    fetchContactList
  } from "@/api/admin";

  export default {
    name: "ContactList",
    components: {
      MenuTitle,
      MenuControl
    },
    data() {
      return {
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
          deleteContactDetail({id: row.id}).then(res=>{
            if(res.code == 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.fetchData(1)
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
      async fetchData(pageNum=1){
        let that = this
        this.loading=true
        let res = await fetchContactList({
          page:pageNum,
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
