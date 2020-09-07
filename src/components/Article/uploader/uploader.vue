<template>
    <div class="uploader">
      <el-upload
        action="#"
        :http-request="uploadRequest"
        list-type="picture-card"
        :limit="limitNum"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <div :class="{'hidden':ifHidden}" class="img"  :style="'background-image: url('+backImg+')'"  slot="trigger">
          <i class="el-icon-plus"></i>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
    import {uploadFile} from "@/api/admin";
    import axios from 'axios'
    export default {
        name: "Uploader",
      data(){
          return{
            baseImgUrl: this.$imgBaseUrl,
            dialogImageUrl: '',
            dialogVisible: false,
            ifHidden:false,
          }
      },
      props:{
        limitNum:{
          default:1,
          type:Number
        },
        backImg:{
          default:'',
          type:String
        },
      },
      methods:{
        uploadRequest(params) {
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
          const form = new FormData();
          // 文件对象
          form.append("image", file);
          axios.post(this.baseImgUrl+'/admin/upload/save',form).then(res=>{
            if (res.data || res.code == 1) {
              this.$emit('handSubmit',res.data.data)
              this.ifHidden=true
            }
          })
        },
        handleRemove(file, fileList) {
          //console.log(file, fileList);
          this.$emit('handRemove')
        },
        handlePictureCardPreview(file) {
          //console.log(file.url)
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
      }
    }
</script>

<style scoped lang="scss">
.uploader{
  .hidden{
    background: none !important;
  }
  .img{
    /*position: absolute;*/
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

</style>
