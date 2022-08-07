<template>
  <div class="submitFormS">
    <el-dialog width="51%" :title="title" :close-on-click-modal="false" :visible.sync="visible" :destroy-on-close="true" @close="handleDialogClose">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm" size="mini">
        <el-form-item label="事件" prop="eventType">
          <span>{{ ruleForm.eventType || '--' }}</span>
        </el-form-item>
        <el-form-item label="事件编号" prop="eventCode">
          <span>{{ ruleForm.eventCode || '--' }}</span>
        </el-form-item>
        <el-form-item label="确认人" prop="affirmant">
          <span>{{ ruleForm.affirmant || '--' }}</span>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <span>{{ ruleForm.deviceName|| '--' }}</span>
        </el-form-item>
        <el-form-item label="发生时间" prop="eventTime">
          <span>{{ ruleForm.eventTime|| '--' }}</span>
        </el-form-item>
        <el-form-item label="处理证明" prop="recordFile">
          <div v-if="isAdd ==='submitDetail'" class="fileContaier">
            <img v-if="viewFileTypeNew === 'img'" :src="ruleForm.recordFile" width="120">
            <span v-if="viewFileTypeNew !== 'img'">{{ ruleForm.recordFile || '无证明文件' }}</span>
            <a
              v-if="viewFileTypeNew !== 'img'&&viewFileTypeNew !== 'pdf'&&ruleForm.recordFile && ruleForm.recordFile!=='因超时系统自动确认'"
              :href="ruleForm.recordFile"
              style="
                  margin: 0 12px;
                  padding: 3px 0;
                  color: #66b1ff;
                  border-bottom: 1px solid #66b1ff;
                  height:30px;
                "
              :downLoad="`${ruleForm.recordFile.substring(ruleForm.recordFile.lastIndexOf('/')+1)}`"
            >下载</a>
            <a
              v-if="ruleForm.recordFile&& viewFileTypeNew === 'pdf'"
              style="
                  margin: 0 12px;
                  padding: 3px 0;
                  color: #66b1ff;
                  border-bottom: 1px solid #66b1ff;
                  height:30px;
                "
              class="downLoadContent"
              @click="downLoadPdf(ruleForm.recordFile)"
            >下载</a>
            <a
              v-if="ruleForm.recordFile&&viewFileTypeNew === 'img' && ruleForm.recordFile!=='因超时系统自动确认'"
              style="
                  margin: 0 12px;
                  padding: 3px 0;
                  color: #66b1ff;
                  border-bottom: 1px solid #66b1ff;
                  height:30px;
                "
              class="downLoadContent"
              @click="handleDownLoad(ruleForm.recordFile)"
            >下载</a>
          </div>
          <el-upload
            v-else
            ref="my-upload"
            class="upload-demo"
            :limit="1"
            action="#"
            :on-change="handleChange"
            :http-request="httpRequest"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            accept=".png,.jpg,.jpeg,.pdf,.xls,.xlsx,.doc,.docx,.zip"
          >
            <el-button slot="trigger" size="mini" type="primary">浏览</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              请上传png、jpg、jpeg、xls、xlsx、pdf、doc、docx、zip格式的文件！
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="处理记录" prop="record">
          <span v-if="isAdd ==='submitDetail'">{{ ruleForm.eventRecord || '--' }}</span>
          <el-input
            v-else
            v-model="ruleForm.record"
            type="textarea"
            autosize
            placeholder="已处理(默认)"
          />
        </el-form-item>
        <el-form-item v-if="isAdd ==='submitDetail'" label="处理人" prop="eventHandler">
          <span>{{ ruleForm.eventHandler || '--' }}</span>
        </el-form-item>
        <el-form-item v-if="isAdd ==='submitDetail'" label="处理时间" prop="eventHandleTime">
          <span>{{ ruleForm.eventHandleTime || '--' }}</span>
        </el-form-item>
        <!-- <div v-if="ruleForm&&ruleForm.fileList" style="margin-left: 148px;margin-top: -20px">
          <div class="container_list">
            <a>
              <i class="el-icon-paperclip" />
              <span style="color: #347fff;margin-left:10px">{{ ruleForm.fileList.filename }}</span>
              <i style="margin-left: 10px" class="el-icon-close show" @click="DeleteFiles(ruleForm.fileList.id)" />
            </a>
          </div>
        </div> -->
        <el-form-item v-if="isAdd ==='submit'" class="button">
          <el-button type="primary" class="viewButton" @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" class="viewButton" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: String,
      default: ''
    },
    viewFileType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      viewFileTypeNew: 'img',
      fileList: {},
      files: [],
      arr: [],
      ruleForm: {
        deviceName: '',
        eventCode: '',
        eventType: '',
        eventTime: '',
        record: ''
      },
      rules: {
        record: [
          { required: false, trigger: 'change', max: 100, message: '长度最多100个字符' }
        ]
      }
      // rules: {
      //   lpn: [
      //     { required: true, message: '请输入车牌号', trigger: 'blur' }
      //   ],
      //   carType: [
      //     { required: true, message: '请输入种类', trigger: 'blur' }
      //   ],
      //   ownerName: [
      //     { required: true, message: '请输入司机姓名', trigger: 'blur' }
      //   ],
      //   phone: [
      //     { required: true, message: '请输入联系方式', trigger: 'blur' }
      //   ]
      // },
    }
  },
  watch: {
    visible() {
      this.ruleForm = Object.assign({}, this.data)
      this.viewFileTypeNew = this.viewFileType || 'img'
      // if (!this.isAdd) {
      //   this.flag = false
      //   this.isHidden = false
      //   this.ruleForm = Object.assign({}, this.data)
      // } else {
      //   this.ruleForm = {}
      //   this.active = ''
      //   this.resetForm('ruleForm')
      //   this.isHidden = true
      // }
    }
  },
  created() {
    this.ruleForm = Object.assign({}, this.data)
    // if (!this.isAdd) {
    //   this.ruleForm = Object.assign({}, this.data)
    // } else {
    //   this.ruleForm = {
    //     name: '22',
    //     eventCode: '333',
    //     type: '1212',
    //     createTime: '2020-01-11'
    //   }
    // }
  },
  methods: {
    downLoadPdf(url) {
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      const oReq = new XMLHttpRequest()
      oReq.open('GET', url, true)
      oReq.responseType = 'blob'
      oReq.onload = function() {
        const file = new Blob([oReq.response], {
          type: 'application/pdf'
        })

        const FileSaver = require('file-saver')
        FileSaver.saveAs(file, fileName)
      }
      oReq.send()
    },
    // 下载图片到本地
    handleDownLoad(url) {
      const img = new Image()
      const fileName = url.substring(url.lastIndexOf('/') + 1)
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = url
      img.onload = function(data) {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        const url = canvas.toDataURL('image/png')
        var link,
          evt
        link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        if (document.fireEvent) {
          window.open(link.href)
        } else {
          evt = document.createEvent('MouseEvents')
          evt.initEvent('click', true, true)
          link.dispatchEvent(evt)
        }
      }
    },
    // 字数的最大长度
    // change(e) {
    //   if (e.length >= 40) {
    //     this.$message({
    //       message: '最多只能输入40字',
    //       type: 'warning'
    //     })
    //   }
    // },
    handleRemove(file) {
      if (file) {
        for (let i = 0; i < this.arr.length; i++) {
          if (file.uid === this.arr[i].uid) {
            this.arr.splice(i, 1)
          }
        }
        this.fileList = {}
      }
    },
    // 删除文件
    beforeRemove() {
      return new Promise((res, rej) => {
        this.$confirm(`确定删除后当前内容将无法找回,请谨慎操作`, '确认要删除这条内容吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return res()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
          return rej()
        })
      })
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '只能上传一个附件',
        type: 'warning'
      })
    },
    // 自定义方法上传
    httpRequest() {

    },
    // 文件上传时候或者改变时候的勾子
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList[fileList.length - 1]
      }
      // this.files = fileList // 多个文件
    },
    // 关闭按钮
    handleDialogClose() {
      this.$emit('close-callback')
      this.fileList = {}
      this.ruleForm.recordFile = ''
    },
    // 处理 - 确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 添加操作
          const formData = new FormData()
          const fileNew = this.fileList && this.fileList.raw
          formData.set('file', fileNew)
          // type 1:人员  0:事件
          formData.set('type', 0)
          if (this.fileList.name) {

          } else {
            const params = {}
            params.states = '已处理'
            params.ids = this.data.eventId
            params.records = this.ruleForm.record || '已处理'
          }
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.$emit('close-callback')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.handleCancel()
      this.fileList = {}
    }
  }
}
</script>

<style scoped lang="scss">
.fileContaier{
  display: flex;
}
.submitFormS{
  .downLoadContent{
    margin-left: 15px;
    height: 34px;
  }
::v-deep .el-input {
    width: 400px;
  }
   ::v-deep .el-textarea__inner{
    min-height: 57px !important;
  }
    .viewButton{
      position: absolute;
     right: 5px;
  }
}
</style>
