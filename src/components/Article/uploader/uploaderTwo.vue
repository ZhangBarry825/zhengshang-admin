<template>
    <div class="uploader">
      <el-upload
        class="upload-demo"
        action="#"
        :http-request="uploadRequest"

        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="backImgs"
        list-type="picture">
        <el-button size="small" type="primary">上传</el-button>
<!--        <div slot="tip" class="el-upload__tip">You can only upload jpg/png,and no more than 2MB</div>-->
      </el-upload>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Uploader",
      data(){
          return{
            baseUrl:this.$imgBaseUrl,
            fileList:[],
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
        backImgs:{
          default:()=>{
            return []
          },
          type:Array
        },
      },
      methods:{
        uploadRequest(params) {
          //console.log(this.backImgs,9900)
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
          axios.post(that.uploadUrl,form).then(res => {
            if (res.data || res.code == 1) {
              this.$emit('handSubmit',res.data)
              this.ifHidden=true
            }
          }).catch(() => {

          })
        },
        handleRemove(file, fileList) {
          let newList=[]
          let length=this.baseUrl.length
          for (let i = 0; i <fileList.length ; i++) {
            newList.push(fileList[i].url.substring(length))
          }
          this.$emit('handRemove',newList)
        },
        handlePictureCardPreview(file) {
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
