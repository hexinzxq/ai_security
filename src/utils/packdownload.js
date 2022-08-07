import JSZip from 'jszip'
import FileSaver from 'file-saver'

var imgBase64 = {}
// jszip打包下载图片
export const saveImgZip = async(imgUrlArrs) => {
  var imgUrlArr = [] // 图片列表
  imgUrlArr = imgUrlArrs
  // 存放转成base64的图片，采用键值对形式就行存储，不采用数组。因为数组在异步中会导致存取数据的无序，数据混乱
  var imgNameArr = [] // 图片名称
  var imageSuffix = [] // 图片后缀
  for (var i = 0; i < imgUrlArrs.length; i++) {
    // 图片后缀
    var suffix = imgUrlArrs[i].substring(imgUrlArrs[i].lastIndexOf('.'))
    imageSuffix.push(suffix)
    // 获取文件的名称
    var startIndex = imgUrlArrs[i].lastIndexOf('/')
    var endIndex = imgUrlArrs[i].lastIndexOf('.')
    var fileName = imgUrlArrs[i].substring(startIndex + 1, endIndex)
    imgNameArr.push(fileName)
  }
  // 创建JSZip对象
  var zip = new JSZip()
  // 创建文件夹
  var img = zip.folder('images')
  // 读取图片返回base64
  for (let i = 0; i < imgUrlArr.length; i++) {
    await getBase64(imgUrlArr[i], i)
  }
  function downloadZip() {
    setTimeout(function() {
      if (imgUrlArr.length === Object.keys(imgBase64).length) {
        for (var i = 0; i < imgUrlArr.length; i++) {
          img.file(imgNameArr[i] + imageSuffix[i], imgBase64[i], { base64: true })
        }
        zip.generateAsync({ type: 'blob' }).then(function(content) {
          FileSaver.saveAs(content, '告警信息.zip') // zip包命名
        })
      } else {
        downloadZip()
      }
    }, 100)
  }
  downloadZip()
}

// 图片转base64; 传入图片路径，返回base64
function getBase64(img, index) {
  var image = new Image()
  image.crossOrigin = 'Anonymous'
  image.src = img
  if (img) {
    image.onload = function() {
      // 执行成功回调
      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      var dataURL = canvas.toDataURL()
      imgBase64[index] = dataURL.substring(22)
      return dataURL
    }
  }
}
