<template>
    <!--<div>-->
        <!--<text>爆款清单</text>-->
    <!--</div>-->
    <div class="wxc-demo">
        <scroller class="scroller">
            <title title="wxc-loading"></title>
            <category title="局部Loading配置"></category>
            <div class="loading">
                <wxc-part-loading :show="partShow"
                                  :width="width"
                                  :height="height"></wxc-part-loading>
            </div>
            <wxc-cell :has-top-border="true"
                      title="开启局部Loading">
                <switch :checked="partShow"
                        slot="value"
                        @change="partShow= !partShow"></switch>
            </wxc-cell>
            <wxc-cell :has-top-border="false"
                      title="长度">
                <input class="input"
                       slot="value"
                       placeholder="局部Loading长度，默认36"
                       :value="width"
                       @input="width=$event.value"></input>
            </wxc-cell>
            <wxc-cell :has-top-border="false"
                      title="高度">
                <input class="input"
                       slot="value"
                       placeholder="局部Loading高度，默认36"
                       :value="height"
                       @input="height=$event.value"></input>
            </wxc-cell>
            <div class="blank"></div>
            <category title="页面Loading配置"></category>
            <wxc-cell :has-top-border="false"
                      title="开启Loading">
                <switch :checked="isShow"
                        slot="value"
                        @change="isShow= !isShow"></switch>
            </wxc-cell>
            <wxc-cell :has-top-border="false"
                      title="切换飞猪">
                <switch :checked="type === 'trip'"
                        slot="value"
                        @change="type=(type === 'trip'? 'default' : 'trip')"></switch>
            </wxc-cell>
            <wxc-cell :has-top-border="false"
                      :has-arrow="true"
                      @wxcCellClicked="openIntervalLoading"
                      title="延迟加载"></wxc-cell>

            <wxc-cell :has-top-border="false"
                      title="配置文案">
                <input class="input"
                       slot="value"
                       placeholder="配置文案，默认无"
                       :value="loadingText"
                       @input="loadingText=$event.value"></input>
            </wxc-cell>
        </scroller>
        <wxc-loading :show="isShow"
                     :type="type"
                     :loading-text="loadingText"
                     :interval="interval"></wxc-loading>
    </div>
</template>
<style scoped>

</style>

<script>

    const navigator = weex.requireModule('navigator');

    import { WxcLoading, WxcPartLoading, WxcCell } from '../../weex-ui/index';
    export default {
        data () {
            return {
            }
        },
        components: {WxcLoading, WxcCell, WxcPartLoading },
        methods: {
        }
    }
</script>
