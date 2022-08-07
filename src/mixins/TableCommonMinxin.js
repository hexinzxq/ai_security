import { downFile } from '@/api/manage'
import {
  getTableData
} from '@/api/table'
// import request from '@/utils/request'
export const TableMinxin = {
  data() {
    return {
      // 上传图片接口
      handleUrl: process.env.VUE_APP_BASE_API + 'digital-mine/sys/oss/file/upload',
      uploadUrl: process.env.VUE_APP_BASE_API + 'digital-mine/sys/oss/file/downFile',
      acceptType: '.zip,.png,.jpg,.jpeg,.pdf,.doc,.docx,.xlsx,.xls',
      acceptHeaderType: '.png,.jpg,.jpeg'
    }
  },
  computed: {
    headers() {
      return {
        'X-Access-Token': localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 获取所有车牌号
    getAllVehicleNumber(params) {
      getTableData('digital-mine/vehicle/getVehicleNumber', params).then((res) => {
        for (const item of this.topSearchConfig.eleComponents) {
          if (item.name === 'vehicleNumber') {
            item.options = []
            for (const value of res.result) {
              item.options.push({ value })
            }
          }
        }
      })
    },
    // 判断是否为json
    isJson(value) {
      try {
        const obj = JSON.parse(value)
        return obj && typeof obj === 'object'
      } catch (error) {
        return false
      }
    },
    // 视频导出
    handleExport2() {
      if (!this.btnFlag) return
      const params = this.exportParams
      params.subscript = this.selectIndexArr.join(',')
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      const firstData = {}
      downFile(this.urlList.exportXlsUrl, firstData, params).then((data) => {
        this.exportCommonMethod(data)
      })
        .catch(() => {
          return
        })
    },
    handleExport(ref) {
      if (!this.btnFlag) return
      const params = { ...this.exportParams }
      params.subscript = this.$refs[ref].selectIndexArr.join(',')
      params.pageNum = this.$refs[ref].pageNum
      params.pageSize = this.$refs[ref].pageSize
      const firstData = {}
      if (this.switchValue && this.switchValue === '车内摄像头') {
        downFile(this.urlList.exportCameraXlsUrl, firstData, params).then((data) => {
          this.exportCommonMethod(data)
        })
          .catch(() => {
            return
          })
      } else {
        downFile(this.urlList.exportXlsUrl, firstData, params).then((data) => {
          this.exportCommonMethod(data)
        })
          .catch(() => {
            return
          })
      }
    },
    // 导出公共方法
    exportCommonMethod(data) {
      let fileName = localStorage.getItem('fileName')
      if (!fileName || typeof fileName !== 'string') {
        fileName = '导出文件'
      }
      if (!data) {
        this.$message.warning('文件下载失败')
        return
      }
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName)
      } else {
        const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blob对象
      }
    }
    // 自定义文件上传方法
    // uploadFile(params) {
    //   this.percentFlag = true
    //   const file = params.file
    //   // const limitSize = file / 1024 / 1024 < 2
    //   const formData = new FormData()
    //   formData.append('file', file)
    //   const that = this
    //   request({
    //     url: that.handleUrl,
    //     method: 'POST',
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //     data: formData,
    //     onUploadProgress: progressEvent => {
    //       that.percent = (progressEvent.loaded / progressEvent.total * 100 | 0)
    //     }
    //   })
    //     .then((res) => {

    //     })
    // }
  }
}
