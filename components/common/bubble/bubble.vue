<template>
    <div class="bubble-tip" style="display: none">
        <div class="bubble-flex">
            <transition name="fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave"
                        v-on:after-enter="afterEnter">
                <div class="bubble-tip-con" v-if="moudel.show">
                    <p class="bubble-tip-msg">{{msg}}</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: ['msg', 'moudel'],
        methods: {
            beforeEnter(){
                document.querySelector('.bubble-tip').style.display = 'block';
            },
            afterEnter(){
                setTimeout(() => {
                    this.moudel.show = false;
                }, 2000)
            },
            afterLeave(){
                document.querySelector('.bubble-tip').style.display = 'none';
            }
        }
    }
</script>

<style>
    .bubble-tip {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
    }

    .bubble-flex {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bubble-tip-con {
        max-width: 80%;
        padding: 16px 15px;
        background: #333;
        border-radius: 5px;
        text-align: center;
    }

    .bubble-tip-msg {
        line-height: 18px;
        font-size: 12px;
        color: #fff;
    }

    .fade-enter-active, .fade-leave-active {
        -webkit-transition: all .2s;
        transition: all .2s;
    }

    .fade-enter, .fade-leave-active {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
</style>
