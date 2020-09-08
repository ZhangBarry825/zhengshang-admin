<template>
  <div class="dashboard-container">
    <div class="center">
      <div class="text">正尚网络科技</div>
      <div class="text2">用户: {{ name }}</div>
    </div>
    <el-calendar v-model="value" class="calendar"></el-calendar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .center{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      .text {
        font-weight: bolder;
        font-size: 30px;
        line-height: 46px;
      }
      .text2{
        font-size: 18px;
        line-height: 46px;
      }

    }
    .calendar{
      background-color: rgba(221,221,221,0.15) !important;
    }
  }

}
</style>
