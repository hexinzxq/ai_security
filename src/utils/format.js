/**
 *
 * @param {(number|string|Object)} time
 * @param {string} format
 * @returns
 */
export function format(time, format = 'yyyy-MM-dd HH:mm:ss') {
  const t = new Date(time)
  const tf = function(i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        break
      case 'mm':
        return tf(t.getMinutes())
        break
      case 'dd':
        return tf(t.getDate())
        break
      case 'HH':
        return tf(t.getHours())
        break
      case 'ss':
        return tf(t.getSeconds())
        break
    }
  })
}

export function getMyDate(str) {
  const date = new Date(str)
  const MyYear = date.getFullYear() // 年
  const MyMonth = date.getMonth() + 1 // 月
  const MyDay = date.getDate() // 日
  const h = date.getHours() // 小时
  const m = date.getMinutes() // 分钟
  const s = date.getSeconds()// 秒数
  // 以自己需要的方式拼接
  const MyTime = MyYear + '-' + getZero(MyMonth) + '-' + getZero(MyDay) + ' ' + getZero(h) + ':' + getZero(m) + ':' + getZero(s)// 最后拼接时间
  return MyTime
}

export function getZero(num) {
  // 单数前面加0
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}
