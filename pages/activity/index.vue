<template>
	<view>
		<!-- <view class="top-user-view" @click="toUserCenter()">
			<image src="/static/image/user/user.png"></image>
			<view style="font-size: 14px;">个人中心</view>
		</view> -->
		<!-- 轮播图 -->
		<view class="swiper-focus">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500">
				<swiper-item>
					<image class="swiper-item" src="/static/image/activity/index_banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="list-domain">
			<view class="head-center">
				<view class="sort-view">
					<image src="/static/image/activity/hdzn.png"></image>
					<view class="sort-title">活动指南</view>
				</view>
				<view class="sort-view">
					<image src="/static/image/activity/scan.png" ></image>
					<view class="sort-title">扫一扫</view>
				</view>
				<view class="sort-view">
					<image src="/static/image/activity/my-score.png" @click="gotoList('credit_log')"></image>
					<view class="sort-title">我的信用分</view>
				</view>
			</view>
			<view>
				<swiper class="swiper-sort" indicator-dots="true">
					<swiper-item>
						<view class="swiper-sort-item  grid col-2">
							<view class="swiper-sort-title" v-for="(item,index) in firstList" :key="index"  @click="gotoList(index)">
								<view class="item shadow-blur">
									<image class="image" :src ="item.picture_url"></image>
									<view class="text">
										<text class="f-12 padding-right-xs">信用 +</text>
										<text class="name">{{item.title.substring(3)}}</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-sort-item  grid col-2">
							<view class="swiper-sort-title" v-for="(item,index) in secondlist" :key="index"  @click="gotoList(index+6)">
								<view class="item shadow-blur">
									<image class="image" :src ="item.picture_url"></image>
									<view class="text">
										<text class="f-12 padding-right-xs">信用 +</text>
										<text class="name">{{item.title.substring(3)}}</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				firstList:[],
				secondlist:[],
				dataarr:[]
			}
		},
		onLoad(options){
			this.getworkInfo();
			console.log(this.firstList)
		},
		methods: {
			async getworkInfo(){
				const {data:res} = await this.$http({url:'/xyj.xyjAllDomainListMobile.phtml'});
				this.dataarr = res.domainList
				var First =  res.domainList.slice(0,6)
				var Second =  res.domainList.slice(6,12)
				for (let i = 0; i < First.length; i++) {
					First[i].picture_url = this.$baseUrl + First[i].picture_url
				}
				this.firstList = First
				for (let i = 0; i < Second.length; i++) {
					Second[i].picture_url = this.$baseUrl + Second[i].picture_url
				}
				this.secondlist = Second
			},
			toUserCenter(){
				var eap_user = uni.getStorageSync("eap_user");
				if(eap_user){
					uni.navigateTo({
						url: "/pages/my/my"
					});
				}else{
					uni.navigateTo({
						url: "/pages/login/login"
					});
				}
			},

			
			gotoList(index){
				if (index == 0) {
					uni.navigateTo({
				 		url: "/pages/activity/credit_money?id="+this.dataarr[index].id
					});
				}else if (index == 8) {
					uni.navigateTo({
						url: "/pages/activity/credit_cy?id="+this.dataarr[index].id
					});
				}else if(typeof(index)=="number"){
					uni.navigateTo({
						url: "/pages/activity/businessList?id="+this.dataarr[index].id+"&index=" + index
					});
				}
				if(index == "credit_log"){
				 	uni.navigateTo({
						 url: "/pages/activity/creditscore/index"
					 });
				}
			}
		}
	}
</script>

<style lang="scss">
	// page{background-color: #ffffff;}
	/* 轮播图 */
	.swiper-focus .swiper {
		height: 460rpx;
		position: relative;
		z-index: 1;
		overflow: hidden;
		uni-image{
			height: 100%;
			width: 100%;
		}
	}
	
	.swiper-focus .swiper-item {
		height: 460rpx;
		line-height: 460rpx;
		text-align: center;
	}

	/**
	 * 活动项
	 */
	.list-domain{
		padding: 0 30rpx;
	}
	
	/* 信用分图标区域 */
	.head-center {
		background: url(/static/image/activity/activity-head-sort.png) no-repeat bottom;
		background-size: cover;
		display: flex;
		text-align: center;
		position: relative;
		box-shadow: 0 0 32rpx 0 rgba(0, 0, 0, 0.1);
		height: 240rpx;
		border-radius: 12rpx;
		margin:-140rpx 0 30rpx 0;
		z-index: 999;
	}
	
	.sort-view {
		width: 33.33333%;
		padding-top: 30rpx;
	}
	
	.sort-title {
		width: 100%;
		line-height: normal;
		font-size: 28rpx;
		margin-top: -14rpx;
	}
	
	.head-center image {
		height: 120rpx;
		border: 0;
		width: 120rpx;
	}
	
	/* 场景列表 */
	
	.swiper-sort {
		height: 580rpx;
	}
	.swiper-sort-item{
		margin: 0 -16rpx;
		
	}
	.swiper-sort-title {
		padding: 16rpx;
		.item{
			border: 1px solid #EEEEEE;
			background-color: #fff;
			border-radius: 12rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 36rpx 0;
			.text{
				font-size: 32rpx;
				margin-left: 30rpx;
				.name{color:#333}
			}
			.image{
				height: 50rpx;
				border: 0;
				width: 50rpx;
			}
		}
	}
	/deep/ {
		.uni-swiper-dot.uni-swiper-dot-active {
		    background-color: #fd692a;
		}
		.uni-swiper-dot{
			background:rgba(0,0,0,0.2)
		}
	}
</style>
