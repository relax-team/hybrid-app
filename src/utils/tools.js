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
    date = typeof date === 'object' ? date : new Date(date);
    const c = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    if (/(y+)/.test(b)) {
      b = b.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
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
  uniqueArray(arr) {
    const res = [], json = {}, len = arr.length;
    for (let i = 0; i < len; i++) {
      let key = arr[i];
      if (Object.prototype.toString.call(arr[i]) == '[object Object]') {
        key = JSON.stringify(arr[i]);
      }
      if (!json[key]) {
        res.push(arr[i]);
        json[key] = 1;
      }
    }
    return res;
  }
}
