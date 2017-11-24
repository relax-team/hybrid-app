<template>
  <div class="app">
    <list class="list">
      <cell>
        <text class="title">Morg SDK2.0</text>
      </cell>
      <cell>
        <div class="item">
          <text class="item-title">配置信息</text>
          <text class="item-content">{{weexCfg}}</text>
        </div>
        <div class="item">
          <text class="item-title">定位信息</text>
          <text class="item-content">{{gpsInfo}}</text>
        </div>
        <div class="item">
          <text class="item-title">用户信息</text>
          <text class="item-content">{{userInfo}}</text>
        </div>
        <div class="item">
          <text class="item-title">打开weex页面(v4.3.0)</text>
          <div class="item-content">
            <wxc-button type="normal" text="openWeex" @wxcButtonClicked="openWeex"></wxc-button>
          </div>
        </div>
        <div class="item">
          <text class="item-title">清除系统缓存(v4.3.0)</text>
          <div class="item-content">
            <wxc-button type="normal" text="一键清除" @wxcButtonClicked="clearCache"></wxc-button>
          </div>
        </div>
      </cell>
    </list>
  </div>
</template>

<style scoped>
  .app {
    padding-top: 15px;
    padding-right: 10px;
    padding-bottom: 15px;
    padding-left: 10px;
    background-color: #f2f2f2;
  }

  .title {
    margin-bottom: 10px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    border-left-style: solid;
    border-left-width: 2px;
    border-left-color: #323240;
  }

  .item-title {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    margin-bottom: 10px;
    color: #fff;
    background-color: #3e3e40;
  }

  .item-content {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    margin-bottom: 10px;
    color: #000;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import {WxcButton} from '../../weex-ui/index';

  export default {
    data() {
      return {
        weexCfg: weex.config,
        gpsInfo: null,
        userInfo: null,
      }
    },
    components: {
      WxcButton
    },
    methods: {
      //打开weex页面
      openWeex() {
        this.open({
          type: 3,
          target: "openWeex",
          params: {
            page: 'activityTemplate', //拿到page字段，从配置文件中找到js文件，可缓存在客户端
            data: {pageId: '5a02723a2971dc6c9969ff1e'},   //业务需要的参数，weex页面需要用到
            h5: 'https://m.morg.cn/xhtml/page/20171108/5a02723a2971dc6c9969ff1e.html'  //降级跳转的h5页面
          },
          callback: function (res) {
            console.log(res)
          }
        });
      },
      //清除系统缓存
      clearCache() {
        this.open({
          type: 1,
          target: "clearCache",
          callback: function (res) {
            let msg = typeof res === 'string' ? res : (res.error || '清除成功');
            modal.toast({message: msg, duration: 2});
          }
        });
      }
    },
    created() {
      const me = this;

      //获取gps信息
      me.open({
        type: 1,
        target: 'getGps',
        callback(res) {
          me.gpsInfo = res;
        }
      });

      //获取用户信息
      me.open({
        type: 1,
        target: 'getUserInfo',
        callback(res) {
          me.userInfo = res;
        }
      });

    }
  }
</script>
