<template>
  <div class="app-wrapper">
    <tab-bar @tabTo="tabTo"></tab-bar>
    <!-- 定义路由模板视图 这个是用来加载组件的-->
    <router-view class="r-box"></router-view>
  </div>
</template>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
  }
  .app-wrapper{
    background-color: #f4f4f4;
  }
  .r-box{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>

<script>
    const modal = weex.requireModule('modal');
    import tabBar from './tabBar.vue';



    export default {
        data () {
            return {
            }
        },
        components: {
            'tab-bar': tabBar
        },
        methods: {
            tabTo(_result){
                let _key = _result.data.key || '';
                this.$router && this.$router.push('/'+_key)
            }
        }
    }
</script>
