export default {
  /*
  * weex环境
  * */
  isMMH() {
    let {appName} = weex.config.env;
    return /morg.cn/i.test(appName);
  },
  isAppWeb(){
    const {platform, userAgent} = weex.config.env;
    return /web/i.test(platform) && /morg.cn/gi.test(userAgent);
  },
  isWeb() {
    let {platform} = weex.config.env;
    return /web/i.test(platform);
  },
  isIOS() {
    let {platform} = weex.config.env;
    return /ios/i.test(platform);
  },
  isAndroid() {
    let {platform} = weex.config.env;
    return /android/i.test(platform);
  },
  /*
   * 判断是否包含http协议
   * */
  isHttp(url){
    return /^http/i.test(url);
  },
  /*
  * 时间对象的格式化
  * 使用:
  * this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
  * */
  formatDate(date, b) {
    const c = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      S: this.getMilliseconds()
    };
    if (/(y+)/.test(b)) {
      b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let a in c) {
      if (new RegExp("(" + a + ")").test(b)) {
        b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length));
      }
    }
    return b;
  },

  /*
  * 扩展Array方法
  * 数组去重，支持数组内存储的是对象
  * */
  uniqueArray() {
    const res = [], json = {}, len = this.length;
    for (let i = 0; i < len; i++) {
      let key = this[i];
      if (Object.prototype.toString.call(this[i]) == '[object Object]') {
        key = JSON.stringify(this[i]);
      }
      if (!json[key]) {
        res.push(this[i]);
        json[key] = 1;
      }
    }
    return res;
  }
}
