<template>
	<view>
		<!-- topBar -->
		<!-- <cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">用户中心</block>
			<block slot="right"><text @tap="goIndex" class="cuIcon-homefill text-white margin-right-lg"></text></block>
		</cu-custom> -->
		<!-- 用户头像 -->
		<view class="flex flex-wrap padding padding-bottom-xs padding-top-xs text-white top-box">
			<view class="basis-xs padding-sm margin-xs">
				<view class="cu-avatar lg round userLogo" style="background-image:url(../../../../static/image/user/login-user.png);"></view>
			</view>
			<view class="padding-sm margin-xs">
				<view>{{mem_name}}</view>
				<text><text class="cuIcon-vip bg-orange round text-white margin-right-xs"></text> 已认证</text>
			</view>
			<view class="back-icon" @click="goIndex()"><text class="lg text-white cuIcon-homefill"></text></view>
		</view>
		<!-- 用户姓名及证件号码 -->
		<view class="flex text-white " >
			<view class="flex-sub text-center border-right-white-opcity">
				<view>姓名</view>
				<text>{{userInfo.name}}</text>
			</view>
			<view class="flex-sub text-center">
				<view>证件号码</view>
				<text>{{userInfo.id_number==null ? '暂无' : userInfo.id_number}}</text>
			</view>
		</view>
		<!-- 三个图标 -->
		<view class="padding padding-bottom-xs ">
			<view class="cu-list grid radius-top col-3 padding-top-sm no-border">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="navTo(item.href)">
					<view><image class="uImg" :src="item.imgSrc" /></view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 功能列表 -->
		<view class="cu-list menu margin-left-lg margin-right-lg sm-border">
			<view class="cu-item arrow" >
				<view class="content" @click="navTo('/pages/userCenter/userInfo/index?perfect='+perfect)">
					<text class="cuIcon-myfill text-green margin-right-xs"></text>
					<text class="text-grey">个人信息</text>
				</view>
				<view class="action" v-if="!perfect">
					<view class="cu-tag round bg-orange light" @click="navTo('/pages/userCenter/userInfo/index?perfect='+perfect)">待完善</view>
				</view>
			</view>
			<view class="cu-item arrow" @click="navTo('/pages/userCenter/changePassWord')">
				<view class="content">
					<text class="cuIcon-settingsfill text-orange"></text>
					<text class="text-grey">修改密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="navTo('/pages/userCenter/changePhone')">
				<view class="content">
					<text class="cuIcon-mobilefill text-cyan"></text>
					<text class="text-grey">修改手机号</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="navTo('/pages/mall/exchangeRecords/list')">
				<view class="content">
					<text class="cuIcon-rankfill text-red"></text>
					<text class="text-grey">兑换记录</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="navTo('/pages/userCenter/collectList')">
				<view class="content">
					<text class="cuIcon-babyfill text-orange"></text>
					<text class="text-grey">收藏列表</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @click="navTo('/pages/activity/activityList')">
				<view class="content">
					<text class="cuIcon-babyfill text-orange"></text>
					<text class="text-grey">活动列表</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @click="navTo('/pages/userCenter/address')">
				<view class="content">
					<text class="cuIcon-writefill text-cyan"></text>
					<text class="text-grey">收货地址</text>
				</view>
			</view>
				<view class="cu-item arrow" @click="navTo('/pages/infoswap/infoswapList')">
				<view class="content">
					<text class="cuIcon-commentfill text-olive"></text>
					<text class="text-grey">我有话说</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="navTo('/pages/userCenter/help')">
				<view class="content">
					<text class="cuIcon-questionfill text-red"></text>
					<text class="text-grey">帮助中心</text>
				</view>
			</view>
				<view class="cu-item arrow" @click="navTo('/pages/login/privacyPolicy')">
				<view class="content">
					<text class="cuIcon-formfill text-blue"></text>
					<text class="text-grey">隐私政策</text>
				</view>
			</view>
				<view class="cu-item arrow" @click="navTo('/pages/login/mzState')">
				<view class="content">
					<text class="cuIcon-infofill text-red"></text>
					<text class="text-grey">免责声明</text>
				</view>
			</view>			
				<view class="content">				
						<view class="cu-form-group margin-top">
				<view class="title"><text class="text-grey">个人信用信息是否公开</text></view>
				<switch class="blue" @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
				</view>
			
		</view>
		<view class="padding flex flex-direction margin-bottom">
			<button class="cu-btn bg-red lg shadow" @click="logOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cuIconList: [{
					name: '异议申请',
					imgSrc: '../../static/image/userCenterIcon_01.png',
					href: '/pages/userCenter/objectionApply'
				}, {
					name: '补充申报',
					imgSrc: '../../static/image/userCenterIcon_02.png',
					href: '/pages/userCenter/apply/apply'
				}, {
					name: '参与记录',
					imgSrc: '../../static/image/userCenterIcon_03.png',
					href: '/pages/userCenter/joinRecord/joinRecord'
				}],
				userInfo:'',
				perfect:null,
				mem_name:'',
				switchA:null,
				
			};
		},
		methods: {
			// 个人信息是否公开
			async SwitchA(e) {
				let ztId=this.userInfo.id;				
				if (e.detail.value){
		         this.switchA=1
	         } else {
		         this.switchA=0
	               }				  
				   console.log(this.switchA)
				   console.log(ztId)
				     var infoData = {
						id:ztId,
						jurisdiction:this.switchA,
				   }				 
				   const {data:res} = await this.$http({
						url:'/targetmanage.targetjurisdiction.phtml',
						method:'POST',
						data: infoData						
					});	
					console.log(res)			
			},
		
			async getUserInfo(){
				let memId=this.$eap_user.mem_id;
				const {data:res} = await this.$http({url:`/targetmanage.employee_information_huiyuandetail.phtml?viewId=json&mem_id=${memId}`});
				res.id_number = res.id_number.replace(/^(.{6})(?:\d+)(.{4})$/,"$1********$2")
				console.log('个人基本信息');
				console.log(res);
				this.userInfo = res;
				console.log(res);					
				if (this.userInfo.jurisdiction==1){
		         this.switchA=true
	                 } else {
		         this.switchA=flase
	                }
								
				// 判断基本信息是否已完善
				
				var tag = 0
				for (const k in res) {
					if (k==''||k=='belong_dept'||k=='check_audit'||k=='education'||k=='information_id'||k=='politics_status'||k=='reason'||k=='region'||k=='user_activation') {
						continue
					}
					if (res[k] == ''||res[k] == undefined) {
						tag++
					}
				}
				console.log('[[[[[[[[[[[[[[[[[[[[[[')
				console.log(tag);
				if (tag == 0) {
					this.perfect = true
				}else{
					this.perfect = false
				}
			},
			// 去首页
			goIndex(){
				uni.switchTab({ url: '/pages/userIndex/userIndex' })
			},
			// 普通跳转
			navTo(url){
				uni.navigateTo({
					url
				})
			},
		
			// 退出登录
			logOut(){				
				uni.removeStorageSync("eap_user");
				uni.removeStorageSync("eap_user_token");						
				uni.redirectTo({
					url:'/pages/login/login'
				})
				
			}
		},		

		async onLoad() {
			/** 
			 * $checkLogin参数说明：
			 * backpage：'/pages/userCenter/index' 登录成功后返回的路由
			 * backtype:1：switchTab 如果页面定义在了tabBar中，则跳转方式需要定义为1  2：redirectTo普通跳转 
			 * */
			let user =  this.$checkLogin('/pages/userCenter/index',2); // 页面加载时验证登录
			if(!user) return
			await this.getUserInfo()
		},
		onShow() {					
			this.mem_name = uni.getStorageSync("eap_user").mem_name
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff url(../../static/image/userCenterTopBg.jpg) no-repeat top;
    	background-size: contain;
	}
	.radius-top{
		border-top-left-radius: 15rpx; border-top-right-radius: 15rpx;
	}
	.border-right-white-opcity{
		border-right: 1px rgba(255, 255, 255, 0.47) solid;
	}
	.userLogo{
		border: 6rpx rgba(255,255,255,0.9) solid;
	}
	.uImg{
		width: 70rpx; height: 70rpx;
	}
    .back-icon{
		position: absolute;
		right:15px;
		top:16px;
	}
	.top-box{
		position: relative;
	}
</style>
