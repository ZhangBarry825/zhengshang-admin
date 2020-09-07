<template>
  <div class="page">
    <MenuTitle title="合作伙伴列表"></MenuTitle>
    <MenuControl :right="{add:true}" :path="'/home/partner/edit'"></MenuControl>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="伙伴名称"
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
  import MenuControl from "@/components/MenuControl/MenuControl";
  import {deletePartner, deleteSolveMethod, fetchPartner} from "@/api/admin";

  export default {
    name: "PartnerList",
    components: {
      MenuTitle,
      MenuControl
    },
    data() {
      return {
        loading:false,
        tableData: []
      }
    },
    methods: {
      async fetchData() {
        let res = await fetchPartner()
        console.log(res.data)
        this.tableData = res.data
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push('/home/partner/edit?id=' + row.id)
      },
      handleDelete(index, row) {
        let that = this
        console.log(index, row);
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePartner({id: row.id}).then(res=>{
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
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped>

</style>
