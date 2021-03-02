const rules = {  // 手机号格式是否正确  isMobilePhone(value) {    const reg = /^1[3|4|5|7|8][0-9]{9}$/    if (reg.test(value)) {      return true    }    return false  },  // 身份证格式是否正确  isMobileIdcard(value) {    const card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/    if (card.test(value)) {      return true    }    return false  },
  // 判断值是否为空
  isNull(value) {
    if (value=='' || value==null || value==undefined) {
      return true
    }
    return false
  },}export default rules
