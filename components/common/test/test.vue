<template>
    <div class="test vbase" style="display: none">
        <transition name="fade" v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
            <div class="testMain" v-if="Show.show">
                <div class="testMainFir">
                	<div class="password">
                		<input type="tel" placeholder="请输入商家验证码" v-model='pass'/>
                	</div>
                	<slot></slot>
                	<!--<div class="countdown">
                		<p v-cloak class="testBut1" v-if='Show.testBut'>{{Show.countdown}}s</p>
                    	<p @click='settime' class="testBut" v-else>重新发送</p>
                	</div>-->
                	<p class="iphone">验证码已发至商家手机：<span v-cloak>{{telphone}}</span></p>
                    <p class="sureorder">
                    	<button 
                    	:class={okbutton:okbut,but:!okbut} 
                    	@click='sureOrder' 
                    	:disabled='disable'>确认下单</button>	
                    </p>
                    
                </div>
                <bubble :moudel="BShow" :msg="msg"></bubble>
            </div>

        </transition>
    </div>
</template>

<script>
    import bubble from '../../common/bubble/bubble'
    import publicMethod from '../../../common/publicMethod.js'
    let reg = /^1[34578]\d{9}$/;
    export default {
        //Show.show, successFn:function
        props: ['Show','telphone'],
        components: {
            bubble
        },
        data(){
            return {
                disable:false,
                okbut: false,
                del: false,
                pass: '',
                disable: true,
                BShow: {
                    show: false
                },
                msg: '您的输入有误',
                bol:false
            }
        },
        methods: {
            beforeEnter(){
                document.querySelector('.test').style.display = 'block';
            },
            afterLeave(){
                document.querySelector('.test').style.display = 'none';
            },
            deldte: function () {
                this.del = false;
                this.telphone = ''
            },
            sureOrder: function () {
            	let param = {
					fromUserId:publicMethod.getItem('userId'),
					identifyCode:publicMethod.getItem('identifyCode'),
					identifyKey:publicMethod.getItem('identifyKey')
				}
            	let params = {
					userId:publicMethod.getItem('userId'),
					cityId:publicMethod.getItem('cityId'),
					bigClassId:publicMethod.getItem('bigClassId'),
					deviceId:publicMethod.getItem('deviceId'),
					serviceClassId:publicMethod.getItem('serviceClassId'),
					model:0,
					workDate:publicMethod.getItem('workDate'),
					startTime:publicMethod.getItem('startTime'),
					endTime:publicMethod.getItem('endTime'),
					guid:publicMethod.getItem('uid'),
					userAddressId:publicMethod.getItem('userAddressId'),
					empType:1,
					operId:publicMethod.getItem('userId'),
					operUser:publicMethod.getItem('username'),
					merchantEntity:{
						merchantId:publicMethod.getItem('bussinessId'),
        				bearTheCost: 0
					},
					serviceItemEntity:{
						num:publicMethod.getItem('bussinessId'),
						serviceClassId:publicMethod.getItem('serviceClassId'),
						serviceMoney:0,
						serviceItemId:publicMethod.getItem('serviceItemId')
					},
					sourceCode:17,
					orderType:105,
					activityId:0,
					channelId:0,
					orderOperationRole:4,
					companyId:publicMethod.getItem('companyId')
				}
				this.$http.post(this.apiUrl.makeorder.judgeIdentifyCode,param,{emulateJSON: true}).then((res) => {
					if(res.body.code == 200){
            			this.$http.post(this.apiUrl.makeorder.createThreePartOrder,{param:JSON.stringify(params)},{emulateJSON: true}).then((res) => {
                    		if(res.body.code == 200){
                    			this.Show.show = false
            					this.pass = ''
            					publicMethod.setItem('workOrderNo',res.body.data.workOrderNo)
                    			window.location.href = 'orderSuccess.html'
                    		}else if(res.body.code == 503){
                    			this.BShow.show = true;
                    			this.msg ='温馨提示：当前地址已超出服务范围，如有问题可以联系95158'
                    		}else if(res.body.code == 504){
                    			this.BShow.show = true;
                    			this.msg = '预约时间已失效，请重新选择'
                    		}else if(res.body.code == 1001){
                    			this.BShow.show = true;
                    			this.msg = '创建订单失败'
                    		}else if(res.body.code == 9003){
                    			this.BShow.show = true;
                    			this.msg = '当前地址和品类存在未支付的订单哦'
                    		}else{
                    			this.BShow.show = true;
                    			this.msg = res.body.message
                    		}
                    	})
					}else{
						this.BShow.show = true;
                    	this.msg = res.body.message
					}
				})
            }
        },
        mounted(){
        	
        },
        watch: {
            telphone(val, oldVal){
                if (val != '') {
                    this.del = true;
                } else {
                    this.del = false;
                }
            },
            pass(val, oldVal){
                if (val != '') {
                    this.okbut = true;
                    this.disable = false
                } else {
                    this.okbut = false;
                    this.disable = true
                }
            },
            telnum(val,oldval){
                if(val){
                    this.telphone=val
                }
            }
        }
    }
    
</script>

<style>
    .test {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 20;
        text-align: center;
    }

    .testMain {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        width: 8.125rem;
        font-size: 0;
    }

    .testMainFir {
        width: 100%;
        background: #fff;
        margin-bottom: 15px;
        border-radius: 4px;
        text-align: left;
        padding: 42px 0 20px 0;
    }
	.password{
		width: 4.0625rem;
		margin: 0 auto;
	}
	.password input{
		width: 100%;
		border: 0;
		border-bottom: 1px solid #666666;
		-webkit-appearance: none;
		border-radius: 0;
		text-align: center;
		padding-bottom: 10px;
		font-size: 15px;
		letter-spacing:3px;
	}
    ::-webkit-input-placeholder {
        color: #dedede;
        font-size: 15px;
        letter-spacing:0px;
    }
	.countdown{
		margin-top: 26px;
		text-align: center;
		font-size: 15px;
	}
	.testBut1{
		color: #222222;
	}
	.testBut{
		color: #da0d00;
	}
	.iphone{
		font-size: 13px;
		line-height: 50px;
		color: #222222;
		text-align: center;
	}
	.sureorder{
		text-align: center;
		width: 100%;
	}
	.sureorder button{
		border: 0;
		outline: none;
		width: 120px;
		height: 40px;
		border-radius: 3px;
		font-size: 18px;
	}
    .but {
        background: #ffa69e;
    }

    .okbutton {
        background-color: rgba(218, 13, 0, 1);
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
