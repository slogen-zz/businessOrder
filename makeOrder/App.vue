<template>
	<div class="makeorder">
		<div class="address" @click="goaddreslist">
			<div class="noaddres" >
				<div class="addicon">
					<img src="./img/positioning.png"/>
				</div>
				<div class="newaddres" v-if="!address">新建地址</div>
				<div class="detailaddress" v-else>
					<p>
						<span class="addresname"  v-cloak>{{userName}}</span>
						<span  v-cloak>{{phone}}</span>
					</p>
					<p class="addresdetail"  v-cloak>{{address}}</p>	
				</div>
				<div class="arrow">
					<img src="./img/arrow.png" alt="" />
				</div>
			</div>
		</div>
		<div class="service-project">
			<div class="project-top" @click="goProject">
				<div class="project-icon">
					<img src="./img/project.png" alt="" />
				</div>
				<div class="project-title">
					<p>
						<span class="title">服务项目</span>
						<span class="describe" v-if="describe">{{describe}}</span>
					</p>
					<div class="arrow1">
						<img src="./img/arrow.png" alt="" />
					</div>
				</div>
			</div>
			<div class="project-count">
				<div class="count-icon">
					<img src="./img/calculation.png" alt="" />
				</div>
				<div class="count-title">
					<div class="number">
						<span class="title">数量</span>
					</div>
					<div class="countnum" v-show="describe">
						<i class="less" v-show="countmark > 1" @click="less"></i>
						<span class="countmark">{{countmark}}</span>
						<i class="add" @click="add"></i>
					</div>
				</div>
			</div>
			<div class="content">
				<textarea 
				placeholder="请详细描述您的需求(限100个字)"
				 maxlength="100" 
				class="textarea">
				</textarea>
			</div>
			
		</div>
		<div class="appointment">
			<div class="appoint-top" @click="getTime">
				<div class="appoint-icon">
					<img src="./img/appoint.png" alt="" />
				</div>
				<div class="appoint-title">
					<ul class="title-time">
						<li class="destitle">预约时间</li>
						<li class="appointtime" v-if="appointTimeNum === 1">{{appointTime}} <span class="red" v-if="!workDateList">(推荐)</span></li>
						<li class="appointtime" v-if="appointTimeNum === 0"><span class="red">(繁忙)</span></li>
					</ul>
					<div class="arrow">
						<img src="./img/arrow.png" alt="" />
					</div>
				</div>
			</div>
		</div>
		<p class="havetime" v-if="appointTimeNum === 1 && !workDateList">师傅会按系统给您推荐的时间尽快上门哦～</p>
		<p class="notime" v-if="appointTimeNum === 0">目前没有空闲师傅，晚会再试试吧~</p>
		<div class="sure-tips">
			<p class="warn" v-if="appointTimeNum === 1 && !workDateList">系统推荐时间2分钟有效～</p>
			<div class="sure">
	            <button :class={okbutton:ok,but:!ok} @click='appointOrder' :disabled='dis'>预约下单</button>
	        </div>
		</div>
		
        <test :Show='Show' :telphone="telphone">
        	<div class="countdown">
        		<p v-cloak class="testBut1" v-if='testBut'>{{countdown}}s</p>
            	<p @click='settime' class="testBut" v-else>重新发送</p>
        	</div>
        </test>
        <bubble :moudel="BShow" :msg="msg"></bubble>
	</div>
</template>

<script>
	import '../common/base-1.3.css'
	import test from '../components/common/test/test'
	import bubble from '../components/common/bubble/bubble'
	import publicMethod from '../common/publicMethod.js'
	
	var mobileNum,cityId,userId,latitude,longitude,communityName
	export default {
		data(){
			return{
				address:'',
				userName:'',
				phone:'',
				describe:'',
				appointTime:'',
				appointTimeNum:2,
				haveTime:false,
				noTime:false,
				ok:false,
				dis:true,
				Show:{
					show:false
				},
				countdown:0,
				testBut:true,
				BShow: {
                    show: false
                },
                msg: '',
                countmark:1,
                telphone:'',
                workDateList:''
			}
		},
		components:{
			test,
			bubble
		},
		methods:{
			goaddreslist(){
				window.location.href ='newAddress.html'
			},
			add(){
				this.countmark++
				publicMethod.setItem('countmark',this.countmark)
			},
			less(){
				if(this.countmark>1){
					this.countmark--
					publicMethod.setItem('countmark',this.countmark)
				}
			},
			goProject(){
				if(this.address){
					window.location.href = 'serviceProject.html'
				}else{
					this.BShow.show = true;
                    this.msg = '请添加服务地址'
				}
				
			},
			appointOrder(){
				this.Show.show = true
				if(this.countdown===0){
					this.testBut = true;
					this.countdown = 60;
					let timer = setInterval(() => {
	                    this.countdown--;
	                    if (this.countdown == 0) {
	                        this.testBut = false;
	                        clearInterval(timer)
	                    }
	                }, 1000);
				}
				let param = {
					typeOfUse:2,
					fromUserId:userId,
					fromUserTelephone:this.phone,
					toUserTelephone:mobileNum
				}
				this.$http.post(this.apiUrl.makeorder.getIdentifyCode,param,{emulateJSON: true}).then((res) => {
					if(res.body.code == 200){
						let reslut = res.body.data
						publicMethod.setItem('identifyCode',reslut.identifyCode)
						publicMethod.setItem('identifyKey',reslut.identifyKey)
					}else{
						this.BShow.show = true;
                    	this.msg = res.body.message
					}
				})
			},
			getTime(){
				if(this.describe && this.address){
					if(this.appointTimeNum ==1){
						window.location.href = 'appointmentTime.html'
					}
				}else{
					this.BShow.show = true;
                    this.msg = '请将地址和服务项目填写完毕'
				}
			},
			settime() {
				this.testBut = true;
				this.countdown = 60;
                let timer = setInterval(() => {
                    this.countdown--;
                    if (this.countdown == 0) {
                        this.testBut = false;
                        clearInterval(timer)
                    }
                }, 1000);
            },
		},
		mounted(){
			publicMethod.setItem('bussinessId',publicMethod.getBussinessId())
			let bussinessId = publicMethod.getItem('bussinessId')
			let serviceItemName = publicMethod.getItem('serviceItemName')
			let bigClassId = publicMethod.getItem('bigClassId')
			let serviceClassId = publicMethod.getItem('serviceClassId')
			if(publicMethod.getItem('serveplace') && publicMethod.getItem('detailplace')){
				this.address = publicMethod.getItem('serveplace')+publicMethod.getItem('detailplace')
				this.userName = publicMethod.getItem('username')
				this.phone = publicMethod.getItem('telnum')
				userId = publicMethod.getItem('userId')
			}
			this.$http.post(this.apiUrl.makeorder.bussinessInfo,{bussinessId:bussinessId},{emulateJSON: true}).then((res) => {
                if(res.body.code==200){
                	let reslut = res.body.data
                	mobileNum = reslut.mobileNo
                	if(mobileNum){
		        		this.telphone = mobileNum.substr(0,3)+"****"+mobileNum.substr(7)
		        		
		        	}
                }
          	})
			if(publicMethod.getItem('scity')){
				let scity = JSON.parse(publicMethod.getItem('scity'))
				cityId = scity.cityId
				publicMethod.setItem('cityId',cityId)
				latitude = scity.latitude
				longitude = scity.longitude
				communityName = scity.cityName
			}else if(publicMethod.getItem('defcity')){
				let defcity = JSON.parse(publicMethod.getItem('defcity'))
				cityId = defcity.cityId
				publicMethod.setItem('cityId',cityId)
				latitude = defcity.latitude
				longitude = defcity.longitude
				communityName = defcity.cityName
			}
			if(this.address && serviceItemName){
				let uid = publicMethod.getItem('uid')
//				alert(uid)
				publicMethod.setItem('countmark',this.countmark)
				this.describe = serviceItemName
				let params = {
					cityId:cityId,
					userId:userId,
					bigClassId:bigClassId,
					serviceClassId:serviceClassId,
					latitude:latitude,
					longitude:longitude,
					communityName:communityName,
					uid:uid
//					cityId:2088,
//					userId:1354980,
//					bigClassId:996,
//					serviceClassId:1138,
//					latitude:'38.064927000000000',
//					longitude:'114.493993000000000',
//					communityName:"和平家园",
//					uid:'12311122'
				}
				if(!publicMethod.getItem('workDate')){
					this.$http.post(this.apiUrl.makeorder.getRecommendTime,params,{emulateJSON: true}).then((res) => {
		                if(res.body.code==200){
		                	this.appointTimeNum = 1
		                	let result = res.body.data
		                	this.appointTime = result.workDate+' '+result.workTime
		                	let arr = result.workTime.split("~")
		                	publicMethod.setItem('workDate',result.workDate)
		                	publicMethod.setItem('startTime',arr[0])
		                	publicMethod.setItem('endTime',arr[1])
		                }else{
		                	this.appointTimeNum = 0
		                }
	          		})
				}else{
					this.appointTimeNum = 1
					this.appointTime = publicMethod.getItem('workDate')+' '+publicMethod.getItem('startTime')+'~'+publicMethod.getItem('endTime')
					if(publicMethod.getItem('workDateList')){
						this.workDateList = publicMethod.getItem('workDateList')
						this.appointTime = publicMethod.getItem('workDateList')+' '+publicMethod.getItem('startTimeList')+'~'+publicMethod.getItem('endTimeList')
					}
				}
			}else{
				this.describe = ''
			}
		},
		watch:{
			appointTimeNum(val,oldVal){
				if(val == 1){
					this.ok = true
					this.dis = false
				}else{
					this.ok = false
					this.dis = true
				}
			}
		}
	}
</script>

<style>
body,html{
	width: 100%;
	height: 100%;
	background: #f3f3f3;
}
.address{
	width: 10rem;
	height: 2.5625rem;
	background: url(img/address.jpg) no-repeat;
	background-position: center;
	background-size: cover;
	padding: 0.390625rem 10px 0.3125rem 0;
	box-sizing: border-box;
	font-size: 0;
}
.address>div{
	width: 100%;
	height: 100%;
	align-items:center;
	display: -webkit-flex;
	display: flex;
	position: relative;
	top: 0;
	left: 0;
}
.addicon{
	width: 17px;
	margin: 0 10px;
}
.detailaddress{
	font-size: 15px;
	line-height: 100%;
	margin-right: 19px;
}
.addresname{
	margin-right: 34px;
}
.addicon>img,.positioning>img{
	width:17px;
}
.newaddres{
	font-size: 15px;
	line-height: 100%;
}
.arrow{
	position: absolute;
	top: 50%;
	right: 0;
	margin-top: -8px;
	width: 9px;
}
.arrow>img{
	width: 100%;
}
.addresdetail{
	margin-top: 12px;
	font-size: 14px;
	color: #666666;
	display:block;
	word-break: break-all;
	word-wrap: break-word;
}
.service-project{
	padding-left: 10px;
	box-sizing: border-box;
	font-size: 0;
	background: #fff;
	margin: 10px 0;
}
.project-top{
	border-bottom: 1px solid #eee;
}
.project-top,.project-count{
	height: 45px;
	align-items:center;
	display: -webkit-flex;
	display: flex;
	box-sizing: border-box;
	font-size: 0;
}
.project-top>div{
	display: inline-block;
}
.project-icon,.count-icon{
	margin-right: 10px;
}
.project-icon>img,.count-icon>img{
	width: 17px;
}
.project-title{
	height: 45px;
	box-sizing: border-box;
	position: relative;
	top: 0;
	left: 0;
	width: calc(100% - 27px);
	font-size: 0;
}
.project-title .arrow1{
	display: inline-block;
	width: 9px;
	margin-left: 10px;
	margin-right: 10px;
	vertical-align: middle;
}
.arrow1>img{
	width: 100%;
}
.project-title p{
	display: inline-block;
	height: 100%;
	width: calc(100% - 19px - 10px);
	line-height: 45px;
	font-size: 0;
	box-sizing: border-box;
}
.count-title{
	width: 100%;
	padding-right: 10px;
}
.number{
	float: left;
}
.countnum{
	font-size: 15px;
	color: #666666;
	float: right;
}
.countmark{
	display: inline-block;
	vertical-align: middle;
	margin: 0 15px;
}
.less{
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(img/less.png) no-repeat;
	background-position: center;
	background-size: cover;
	vertical-align: middle;
}
.add{
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(img/add.png) no-repeat;
	background-position: center;
	background-size: cover;
	vertical-align: middle;
}
.title{
	vertical-align: middle;
	display: inline-block;
	font-size: 15px;
}
.describe{
	width: calc(100% - 70px);
	margin-left: 10px;
	text-align: right;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
	box-sizing: border-box;
}
.describe{
	vertical-align: middle;
	font-size: 13px;
	display: inline-block;
	color: #666666;
}
.appointtime{
	font-size: 13px;
	float: right;
	color:#666666 ;
}
.destitle{
	float: left;
	font-size: 15px;
}
.content{
	padding: 0 10px 15px 0px;
}
.textarea{
	width:100%;
	height: 75px;
	padding-top:10px ;
	box-sizing: border-box;
	padding-left:10px;
	resize : none;
	line-height: 20px;
	background-color: rgba(245, 245, 245, 1);
	border: 0;
	-webkit-appearance: none;
	border-radius: 0;
	font-size: 13px;
}
::-webkit-input-placeholder {
    color: #cacaca;
    font-size: 13px;
  
}
.appointment{
	padding-left: 10px;
	height: 45px;
	background: #fff;
}
.appointment>div{
	font-size: 0;
}

.appoint-top{
	height: 45px;
	box-sizing: border-box;
	font-size: 0;
	align-items:center;
	display: -webkit-flex;
	display: flex;
}
.appoint-icon{
	width: 17px;
	margin-right: 10px;
}
.appoint-icon>img{
	width: 100%;
}
.appoint-title{
	height: 45px;
	box-sizing: border-box;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
}
.appoint-title .arrow{
	position: absolute;
	top: 50%;
	right: 10px;
	margin-top: -8px;
	width: 9px;
}
.appoint-title .title-time{
	/*width: 7.9rem;*/
	margin-right:calc(19px + 10px);
	line-height: 45px;
}
.red{
	color: #da0d00;
}
.havetime,.notime{
	font-size: 12px;
	color: #acacac;
	margin:11px 0 0 10px;
}
.sure-tips{
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
}
.sure {
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;
}

.sure button {
    width: calc(100% - 22px);
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 4px;
    position: absolute;
    top: 8px;
    left: 11px;
    /*border: 1px solid #00f;*/
}
.warn{
	font-size: 12px;
	width: 100%;
	height: 25px;
	line-height: 25px;
	padding-left:10px ;
	background: #fdfeee;
	border: 1px solid #f8edc7;
	color: #d5891a;
}
.but {
    color: #ffe2e0;
    background: #ffa69e;
}

.okbutton {
    color: #ffe2e0;
    background: #d91f16;
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
</style>