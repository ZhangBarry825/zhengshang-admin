<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :http-request="uploadRequest"
        class="editor-slide-upload"
        :action="uploadUrl"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

import axios from 'axios'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      uploadUrl:this.$imgBaseUrl+'/admin/upload/save',
      baseImgUrl:this.$imgBaseUrl,
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
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
      let formData = new FormData();
      // 文件对象
      formData.append("image", file);
      return new Promise((resolve, reject) => {

        axios.post(that.uploadUrl,formData).then(res => {
          if (res.data || res.code == 1) {
            resolve(res.data)
          }
        }).catch((e) => {
          reject(e)
        })
      })
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      console.log(this.listObj)
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      console.log(arr,999)
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传完毕，如有问题请刷新后重试!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      console.log(123123123)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url =response.data
          this.listObj[objKeyArr[i]].hasSuccess = true
          console.log(this.listObj[objKeyArr[i]],i)
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {

      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {


        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }

        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
