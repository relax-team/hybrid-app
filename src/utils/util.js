import cfg from '../config/index.js';
import ApiList from '../config/api';
import base64 from './base64';
import tools from './tools';

/*======== 扩展Object =======*/
/*
 * 将浮点数去除小数点，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param n {number} 浮点数
 * return {object}
 * {num: 314, times: 100}
 * */
const fnMathExt = function () {

  function toInt(n) {
    n = +n;
    let res = {num: n, times: 1};
    if (n !== (n | 0)) { //判断浮点数，n===parseInt(n)
      const arr = ('' + n).split('.');
      const len = arr[1].length; //小数长度
      res.times = Math.pow(10, len); //需要乘的倍数=>10的指数
      res.num = Math.round(n * res.times); //四舍五入取整
    }
    return res;
  }

  function operation(a, b, op) {
    let result; //最终计算的值
    const o1 = toInt(a), o2 = toInt(b);

    const n1 = o1.num, t1 = o1.times;
    const n2 = o2.num, t2 = o2.times;

    const max = Math.max(t1, t2);

    switch (op) {
      case 'add':
        if (t1 > t2) {
          result = n1 + n2 * (t1 / t2);
        } else {
          result = n2 + n1 * (t2 / t1);
        }
        result = result / max;
        break;
      case 'subtract':
        if (t1 > t2) {
          result = n1 - n2 * (t1 / t2);
        } else {
          result = n1 * (t2 / t1) - n2;
        }
        result = result / max;
        break;
      case 'multiply':
        result = (n1 * n2) / (t1 * t2);
        return result;
      case 'divide':
        result = (n1 / n2) * (t2 / t1);
        return result;

    }
    return result;
  }

  /*加*/
  function add(a, b) {
    return operation(a, b, 'add');
  }

  /*减*/
  function subtract(a, b) {
    return operation(a, b, 'subtract');
  }

  /*乘*/
  function multiply(a, b) {
    return operation(a, b, 'multiply');
  }

  /*除*/
  function divide(a, b) {
    return operation(a, b, 'divide');
  }

  //exports
  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  };
};
Object.assign(Math, fnMathExt());


/*
* 扩展JSON对象
* */
Object.assign(JSON, {
  /**
   * 序列化json对象为string
   * {a: 1, b: 2} --> a=1&b=2
   */
  param: function (n) {
    const e = [];
    for (let o in n) e.push(encodeURIComponent(o) + "=" + encodeURIComponent(null == n[o] ? "" : n[o]));
    return e.join("&").replace(/%20/g, "+")
  }
});


/*======== Function ========*/

/*
 * 兼容获取请求url
 * */
function getApi(url) {
  let reqUrl;
  const api = ApiList[url];
  if (!api) {
    if (tools.isHttp(url)) {
      reqUrl = url;
    } else {
      console.error('[config/api.js]中未配置', url, '映射');
    }
  } else {
    reqUrl = tools.isHttp(api) ? api : (cfg.api + api);
  }
  return reqUrl;
}

/*
* fetch请求，显示loading
* */
function showLoading() {

}

/*
* 获取地理位置信息
* */
async function getGeo() {
  return cfg.location.defaults;
}


/*
* 获取用户信息，未登录则跳转到登录界面
* 使用：
* this.login().then(user=>{console.log(user)})
* */
function login() {
  const me = this;
  return new Promise((resolve, reject) => {
    open({
      type: 1,
      target: 'getUserInfo',
      callback(res) {
        if (res && res.memberId) {
          //已登录
          resolve(res);
        } else {
          //未登录，跳转到登录页
          open({
            type: 1,
            target: 'login',
            data: {
              type: 0
            },
            callback(info) {
              resolve(info);
            }
          })
        }
      }
    })
  })
}

/*
 * request请求
 * 使用：
 * import fetch from '../../utils/fetch';
 * fetch({
 *   url: 'bind',
 *   data: {memberId: 379, vcode: 521588}
 * }).then(res=>{}, res=>{});
 *
 * 使用async/await:
 * const res = await fetch({params});
 * */
async function fetch(opt) {
  // 获取请求url
  const reqUrl = getApi(opt.url);
  if (!reqUrl) return;

  const option = {
    url: reqUrl,
    method: (opt.method || "POST").toUpperCase(),
    type: opt.type || 'json',
    headers: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, opt.headers || {}),
    body: ''
  };

  //是否需要用户登录信息
  if (opt.login) {
    let mmhUser = await login();
    if (mmhUser) {
      const {memberId, token} = mmhUser;
      Object.assign(option.headers, {memberId, token});
    }
  }

  //是否需要地理位置信息
  const location = opt.location ? await getGeo() : cfg.location.defaults;
  const {lat, lng, areaId} = location;
  opt.data = Object.assign(opt.data || {}, {lat, lng, areaId});

  if (option.method === 'POST') {
    option.body = JSON.param(opt.data || {});
  } else {
    if (opt.data) {
      option.url += '?' + JSON.param(opt.data);
    }
  }

  //设置loading
  showLoading(opt);

  //request
  return await request(option);
}

/*
* stream.fetch
* */
function request(option) {
  return new Promise((resolve, reject) => {
    const stream = weex.requireModule('stream');
    stream.fetch(option, (res) => {
      let errInfo, status = res.status;
      console.info(option.url, status, '=> ', res);

      //处理请求出错的情况
      if (status !== 200) {
        let errMsg = '抱歉，当前网络不佳~', errCode = status || 1000;
        if (/timeout/gi.test(res.errMsg)) {
          errCode = 1001;
        }
        res.data = {
          error_code: errCode,
          error: [errMsg, ' #', errCode].join('')
        };
      }

      const {error_code, error} = res.data;
      if (error_code) {
        errInfo = {error_code, error};
        return reject(errInfo);
      }

      return resolve(res);
    })
  });
}


/*
* 跳转新页面，基于sdk交互。
* 使用：
* this.open({
*   type: 3,
*   target: "openWeex",
*   params: {
*     page: 'activity', //拿到page字段，从配置文件中找到js文件，可缓存在客户端
*     data: {pageId: '5a02723a2971dc6c9969ff1e'},   //业务需要的参数，weex页面需要用到
*     h5: 'https://m.morg.cn/xhtml/page/20171108/5a02723a2971dc6c9969ff1e.html'  //降级跳转的h5页面
*   },
*   callback: function (res) {}
* });
* */
function open(opt) {
  if (opt.params) {
    opt.params = base64.encode(JSON.stringify(opt.params));
  }

  //判断当前环境，执行不同的跳转处理
  //type: 0.native 1.tools 2.web 3 weex
  let uri, error;
  if (tools.isWeb()) {
    //web浏览器或app内webView
    if (tools.isAppWeb()) {
      //App内部webView
      uri = 'http://m.morg.cn/routes/?' + JSON.param(opt);
    } else {
      //web浏览器
      switch (opt.type) {
        case 1:
          //不支持tools, type: 1
          error = '该浏览器暂不支持调用app内部tools方法: ' + opt.target;
          opt.callback && opt.callback(error);
          break;
        case 2:
          //web page跳转
          /*weex.open({
            type: 2,
            target: "openWebview",
            params: {
              data: "https://m.morg.cn/xhtml/page/20171108/5a02723a2971dc6c9969ff1e.html?screen=true",  //打开全屏webview
              close: 1    // 可不传，打开新的webview的同时关闭之前 n 层webview，
            }
          });*/
          uri = opt.params.data;
          break;
        case 0:
        case 3:
          //外部或微信内浏览器打开app内native或weex页面
          uri = 'https://api.morg.cn/routes/?' + JSON.param(opt);
          break;
      }
    }

    if(uri){
      window.location.href = uri;
    }

  } else if (tools.isMMH()) {
    //app内部weex页面
    //协议格式：http://m.morg.cn/routes/?type=3&target=openWeex&params={json}&&callback=MMH_1223523355
    uri = 'http://m.morg.cn/routes/?' + JSON.param(opt);

    const event = weex.requireModule('event');
    event.openURL(uri, opt.callback || null);
  } else {
    //第三方终端
    error = '该终端暂不支持调用妈妈好app sdk协议';
    opt.callback && opt.callback(error);
  }

}

export default {
  fetch,
  open,
  login
}

