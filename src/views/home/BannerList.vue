<template>
  <div class="page">
    <MenuTitle title="轮播列表"></MenuTitle>
    <MenuControl :right="{}"></MenuControl>
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
            disabled
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
  import {fetchBannerList} from "@/api/admin";

  export default {
    name: "BannerList",
    components: {
      MenuTitle,
      MenuControl
    },
    data() {
      return {
        loading:false,
        tableData: [{}]
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
      async fetchData(){
        let that = this
        this.loading=true
        let res = await fetchBannerList()
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
