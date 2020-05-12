const pad = (val, len) => (val + '').length < len ? pad('0' + val, len) : val

/**
 * 格式化日期
 * @param {Date | String} d 
 * @param {String} format 
 */
const formatDate = (d, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (!d) return ''
  if (!(d instanceof Date)) d = new Date(d)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()
  let day = d.getDay()
  let hours = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  let ms = d.getMilliseconds()
  let zone = d.getTimezoneOffset()
  let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let shortMonthNames = monthNames.map(_ => _.slice(0, 3))
  let shortDayNames = dayNames.map(_ => _.slice(0, 3))

  return format
    .replace(/yyyy/g, () => year) // 年份（四位）
    .replace(/yy/g, () => (year + '').slice(2)) // 年份（两位）
    .replace(/MMMM/g, () => monthNames[month - 1]) // 月份（英文）
    .replace(/MMM/g, () => shortMonthNames[month - 1]) // 月份（英文简写
    .replace(/MM/g, () => pad(month, 2)) // 月份（两位）
    .replace(/M/g, () => month) // 月份（一位）
    .replace(/dddd/g, () => dayNames[day]) // 星期（英文）
    .replace(/ddd/g, () => shortDayNames[day]) // 星期（英文简写）
    .replace(/dd/g, () => pad(date, 2)) // 日期（两位）
    .replace(/d/g, () => date) // 日期（一位）
    .replace(/DD/g, () => '0' + day) // 星期（两位）
    .replace(/D/g, () => day) // 星期（一位）
    .replace(/HH/g, () => pad(hours, 2)) // 小时（24小时制两位）
    .replace(/H/g, () => hours) // 小时（24小时制一位）
    .replace(/hh/g, () => pad(hours > 12 ? hours - 12 : hours, 2)) // 小时（12小时制两位）
    .replace(/h/g, () => hours > 12 ? hours - 12 : hours) // 小时（12小时制一位）
    .replace(/mm/g, () => pad(minutes, 2)) // 分钟（两位）
    .replace(/m/g, () => minutes) // 分钟（一位）
    .replace(/ss/g, () => pad(seconds, 2)) // 秒钟（两位）
    .replace(/s/g, () => seconds) // 秒钟（一位）
    .replace(/SSS/g, () => pad(ms, 3)) // 毫秒（三位）
    .replace(/SS/g, () => pad(Math.round(ms / 10), 2)) // 毫秒（两位）
    .replace(/S/g, () => Math.round(ms / 100)) // 毫秒（一位）
    .replace(/A/g, () => hours > 12 ? 'PM' : 'AM') // 上午与下午（大写）
    .replace(/a/g, () => hours > 12 ? 'pm' : 'am') // 上午与下午（小写）
    .replace(/ZZ/g, () => (zone > 0 ? '-' : '+') + pad(Math.floor(Math.abs(zone) / 60) * 100 + Math.abs(zone) % 60, 4)) // 时区
}

/**
 * 根据name获取父组件
 * @param {import('vue').default} vm 
 * @param {String} name 
 */
const getParentComponent = (vm, name) => {
  let parent = vm.$parent
  while (parent) {
    if (parent.$options.name === name) {
      return parent
    }
    parent = parent.$parent
  }
}

/**
 * 获取所有子组件
 * @param {import('vue').default} vm 
 * @param {String?} name 若提供 则获取所有指定name的子组件
 * @returns {import('vue').default[]} 子组件数组
 */
const getChildComponents = (vm, name) => {
  const childs = name ? vm.$children.filter(_ => _.$options.name === name) : vm.$children
  return childs.reduce((acc, _) => [...acc, _, ...(_.$children.length ? getChildComponents(_, name) : [])], [])
}

/**
 * 截取指定长度字符 按照1个汉字等于2个字符长度
 * @param {String} str 
 * @param {Number} byteLen 
 */
const getSubStr = (str, byteLen) => {
  // eslint-disable-next-line
  let num = 0, rtnStr = '', getLen = c => c.replace(/[^\x00-\xff]/g, '**').length
  for (let i = 0, len = str.length; i < len; i++) {
    let char = str.charAt(i)
    let tempLen = num + getLen(char)
    if (tempLen > byteLen) return rtnStr
    rtnStr += char
    num = tempLen
  }
  return rtnStr
}

/**
 * 获取尺寸 如果为数值或数值字符串 添加px单位 否则 直接返回
 * @param {String | Number} size
 */
const getSize = size => size && isNaN(size) ? size : `${+size}px`

/* ===================== 高阶函数部分 ===================== */

/**
 * 获取路由
 * 该方法为解决：页面加载时 我们无法通过this.$route获取到正确的动态加载的路由
 * @param {import('vue-router').default} router
 */
const getRoute = router => () => {
  return router.resolve(router.mode === 'hash' ? location.hash.slice(1) : location.pathname).route
}

const REG_IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
const REG_IP_PORT = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/

/**
 * 创建IP验证规则
 * @param {{
 *    trigger: String, 
 *    required: Boolean, 
 *    port: Boolean,
 *    msg: String,
 *    regmsg: String, 
 *    remoteMethod: Function
 *  }} options
 */
const createIpValidateRule = (options = {}) => {
  let { trigger = null, required = true, port } = options
  let msgPrefix = port ? '（含端口号）' : ''
  let msg = options.msg || `请输入IP地址${msgPrefix}`
  let regmsg = options.regmsg || `请输入合法的IP地址${msgPrefix}`
  return [
    {
      trigger,
      required,
      validator(rule, value, callback) {
        if (value) {
          if ((port ? REG_IP_PORT : REG_IP).test(value)) {
            options.remoteMethod ? options.remoteMethod(rule, value, callback) : callback()
          } else {
            callback(new Error(regmsg))
          }
        } else {
          required ? callback(new Error(msg)) : callback()
        }
      }
    }
  ]
}

const creratePortValidateRule = (options = {}) => {

}

export {
  formatDate,
  getParentComponent,
  getChildComponents,
  getSubStr,
  getRoute,
  getSize,
  createIpValidateRule,
  creratePortValidateRule
}