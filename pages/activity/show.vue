<template>
	<view>
		<cu-custom :isBack="true" >
			<block slot="right"><text @click="goIndex()" class="cuIcon-homefill text-white margin-right-lg"></text></block>
		</cu-custom>
		<view  style="position: absolute;top: 0;right: 0;left: 0;">
			<image :src="topUrl" mode="" ></image>
		</view>
		<!-- <view class="boxCon">
			<view class="boxtop center">请将该页面向商家展示</view>
			<view class="flex flex-wrap center">
				<view class="swal2-icon swal2-success swal2-animate-success-icon" style="display: block; margin-top: 80rpx;">
					   <view class="swal2-success-circular-line-left" style="background: rgb(255, 255, 255);">
					   </view>
					   <span class="swal2-success-line-tip swal2-animate-success-line-tip"></span><span class="swal2-success-line-long swal2-animate-success-line-long"></span>
					   <view class="swal2-success-ring">
					   </view>
					   <view class="swal2-success-fix" style="background: rgb(255, 255, 255);">
					   </view>
					   <view class="swal2-success-circular-line-right" style="background: rgb(255, 255, 255);">
					   </view>
				</view>
				<view class="basis-sm box-left" style="width: 50%;">
					<image :src="Con.qrcode_img" mode=""></image>
				</view>
				<view  style=" width: 23%; margin-top: 88rpx;">用户{{Con.inv_name}}满足该优惠措施！</view>
			</view>
			<view style="width: 90%;margin-left: 5%;color: #000;">
				<view class="margin-bottom">
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="flex-sub">
							<text>参与人姓名：</text>
						</view>
						<view class="flex-twice">{{Con.inv_name}}</view>
					</view>
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="flex-sub">
							<text>参与时间：</text>
						</view>
						<view class="flex-twice">{{Con.inv_time}}</view>
					</view>
				</view>
				<view class="margin-bottom">
					
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="flex-sub">
							<text>门店名称：</text>
						</view>
						<view class="flex-twice">{{mdxinxi.place_name}}</view>
					</view>
				
				</view>
				<view class="margin-bottom">
					<view class="flex  p-xs margin-bottom-sm mb-sm">
						<view class="flex-sub">
							<text>活动名称：</text>
						</view>
						<view class="flex-twice">{{canshu.title}}</view>
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="card-wrap shadow">
			<view class="card-con">
				<view class="card-top text-center text-white bg-gradual-green">
					<image class="card-code" :src="Con.qrcode_img" mode="aspectFit"></image>
					<view class="card-company">请将该页面向商家展示</view>
				</view>
				<view class="card-content flex flex-direction">
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-peoplefill padding-right-sm text-blue"></text>参与人</view>
						<view class="value">{{Con.inv_name}}</view>
					</view>
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-countdownfill padding-right-sm text-red"></text>参与时间</view>
						<view class="value">{{Con.inv_time}}</view>
					</view>
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-shopfill padding-right-sm text-green"></text>门店名称</view>
						<view class="value">{{mdxinxi.place_name}}</view>
					</view>
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-evaluate_fill padding-right-sm text-orange"></text>活动名称</view>
						<view class="value">{{canshu.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
			data() {
				return {
					arrCon:[],	
					Con:{},
					canshu:{},
					memId:"",
					youhui:{},//优惠信息
					mdxinxi:{},//门店信息
					memName: "",
					idNumber: "",
					topUrl:"",
				}
			},
			async onLoad(options) {
				this.canshu = options
				console.log(this.canshu)
				this.youhui = JSON.parse(options.youhui) 
				console.log(this.youhui)
				this.mdxinxi = JSON.parse(options.xinxi) 
				console.log(this.mdxinxi)
				await this.getWorkInfoList()
				this.topUrl = options.topUrl
			},
			
			methods: {
				
				async getWorkInfoList(){
					this.memId = uni.getStorageSync('mem_id')
					console.log(this.memId);
					
					const {data:resMem} = await this.$http({
						url:'/targetmanage.employee_information_huiyuandetail.phtml?viewId=json',
					});
					if(resMem){
						this.memName = resMem.name;
						this.idNumber = resMem.id_number;
					}
					// console.log(res)
				// localStorage.getItem()
				const {data:res} = await this.$http({
					url:'/xyj.xyjIncentiveRecordAdd.phtml',
					data: {
						incentive_ln_id:this.canshu.incentive_ln_id,
						domain_id:this.canshu.domain_id,
						vend_id:this.canshu.vend_id,
						incentive_id:this.canshu.incentive_id,
						place_id: this.canshu.place_id,
						mem_id: this.memId,
						inv_name: this.memName,
						inv_id_number: this.idNumber
					},
					header: {'token': this.$eap_user_token}
				});
				console.log(res)
				this.Con = res.incentiveRecord
				this.Con.qrcode_img = this.$baseUrl+this.Con.qrcode_img
				console.log(this.Con)
				},
					// 去首页
			goIndex(){
				uni.switchTab({ url: '/pages/userIndex/userIndex' })
			},
				
			},
			
	}
	
</script>

<style lang="scss" scoped>
	@import url('@/common/css/rotate.css');
	.swal2-icon[data-v-3ad21fd4]{
		margin: 40rpx 0 0 0rpx;
	}
	page{
		background-color:rgb(247,247,247);
	}
	uni-image{
		width: 750rpx;
	}
	/deep/.cu-bar.fixed, .nav.fixed{
		position: absolute;
	}
	.box-left uni-image[data-v-3ad21fd4] {
	    width: 320rpx;
	    height: 320rpx;
	}
	.center{
		text-align: center;
	}
	.boxCon{
		position: relative;
		top: 160rpx;
		bottom: 0;
		// height: auto;
		width: 96%;
		background-color: #fff;
		margin-left: 2%;
		padding: 32rpx 20rpx;
		box-shadow: 0 14rpx 78rpx 0 rgba(4,0,0,0.14);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		overflow: hidden;
		// width: 90%;
		// margin-left: 5%;
		// background-color: #fff;
		// margin-top: 40rpx;
		// border-radius: 20px;
	}
	.boxtop{
		padding: 16rpx 0;
		background-color: rgb(247,247,247);
		
	}
	.box-left image{
		width: 200rpx;
		height: 200rpx;
	}
	.box-center image{
		width: 100rpx;height: 100rpx;margin-top: 50rpx;
	}
	/deep/.cuIcon-back:before {
	    color: #fff;
	    content: "\e679";
	}


	// 弹出二维码参与
	.card-wrap{
		position: relative;
		z-index: 2;
		top:160rpx;
		padding: 50rpx;
		.card-con{
			border-radius: 18rpx;
			overflow: hidden;
			border:0rpx solid #6f59fb;
			box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.20);
		}
	}
	.card-content{
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		background: #ffffff;
		.card-text-item{
			padding:10rpx 40rpx;
			justify-content: space-between;
			.name{}
			.value{text-align: right;}
			&.first{
				.name,.value,.dep{line-height: 1;}
			}
		}
	}
	.card-top{
		padding-top: 80rpx;
		padding-bottom: 20rpx;
		.card-code{
			background: #fff;
		}
		.card-company{
			line-height:1.4;
			padding: 30rpx 30rpx 20rpx 30rpx;
		}
	}
	.card-code{
		width: 300rpx;
		height: 300rpx;
		border:0rpx solid #fff;
		margin: 0 auto;
		border-radius: 10rpx;
		box-shadow: 0 -10rpx 30rpx rgba(66,44,228,0.15);
	}
</style>
