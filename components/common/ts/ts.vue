<template>
    <div class="ts" v-if='judgment.jbol' @click='ts' @touchmove='move'>
        <img src="./img/arrow.png" alt="" class="arrow" v-if="judgment.isarrow">
        <p v-html="judgment.msg"></p>
        <a href="index.html" class="ts-btn" v-if="judgment.ifbtn">查看其他拼团</a>
    </div>
</template>

<script>
    export default {
        //judgment.jbol
        props: ['judgment'],
        methods: {
            ts: function () {
                this.judgment.msg = '',
                this.judgment.jbol = false
            },
            move: function (e) {
                e.preventDefault();
            }

        }
    }
</script>

<style>
    .ts {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgb(0, 0, 0);
        z-index: 20;
    }

    .ts > p {
        margin-top: 200px;
        padding: 0 15px;
        font-size: 18px;
        color: #fff;
        text-align: center;
    }

    .arrow {
        width: 64px;
        position: absolute;
        top: 20px;
        right: 10%;
    }

    .ts-btn {
        display: block;
        margin: 30px 15px 0;
        height: 44px;
        line-height: 44px;
        background: #d40711;
        border-radius: 5px;
        font-size: 15px;
        color: #fff;
        text-align: center;
    }
</style>
