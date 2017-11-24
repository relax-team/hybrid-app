/*
* 尽可能的确保 JS 引擎的长效内存管理，对一个通用的全局对象进行了 Object.freeze() 冻结操作，不支持prototype对象扩展。
* by xqs
* */
import util from './util';

export default {
  methods: Object.assign(util, {
    /*
    * weex页面内跳转
    * */
    jump(to) {
      if (this.$router) {
        this.$router.push(to)
      }
    }
  })
}
