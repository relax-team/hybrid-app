<template>
    <div class="wrapper">
        <div class="bar-item" @click="tabTo('index')">
            <image class="bar-img" :style="testCS"
                   src="https://img.mamahao.com/s/topic/2017/1011/images/iocn_01_1.png"></image>
            <text class="bar-txt">主会场</text>
        </div>
        <div class="bar-item" @click="tabTo('category')">
            <image class="bar-img" src="https://img.mamahao.com/s/topic/2017/1011/images/iocn_02.png"></image>
            <text class="bar-txt">全部会场</text>
        </div>
        <div class="bar-item act" @click="tabTo('hot')">
            <image class="bar-img" src="https://img.mamahao.com/s/topic/2017/1011/images/iocn_03.png"></image>
            <text class="bar-txt">爆款清单</text>
        </div>
    </div>
</template>
<style scoped>
    .wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        border-top-width: 1px;
        border-top-color: #d9d9d9;
        background-color: #fafafa;
    }

    .bar-item {
        flex: 1;
        padding-top: 10px;
        padding-bottom: 10px;
        align-items: center;
    }

    .bar-img {
        width: 50px;
        height: 50px;
    }

    .bar-txt {
        padding-top: 2px;
        margin: 0 auto;
        text-align: center;
    }
</style>
<script>

    const modal = weex.requireModule('modal');
    export default {
        computed: {
            testCS: function () {
                return this.pIndexKey == 'index' ? 'color:#b4282d;' : ''
            }
        },
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            tabTo(_key) {
                if (this.pIndexKey == _key) return;
                this.pIndexKey = _key;
                this.$emit('tabTo', {
                    status: 'tabTo',
                    data: {
                        key: _key
                    }
                })
            }
        }
    }
</script>
