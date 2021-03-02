<template>
	<view class="page-wrap">
		<!-- 顶部 -->
		<cu-custom :isBack="true">
			<block class="bg-red" ></block>
		</cu-custom>
		<!-- <view class="search-area">
			<view class="top-search flex">
				<input class="input" placeholder="请输入商品关键字" placeholder-class="placeholder-style" disabled @click="navTo('/pages/activity/goodsSearch/goodsSearch')"/>
				<uni-icons color="#bbb" class="icon" size="18" type="search" />
			</view>
		</view> -->
		<!-- center -->
		<!-- <view class="centerTop"> -->
			<!-- <view class="flex align-center">
				<view class="line"></view>
				<view class="text-black text-bold margin-left tetile">信用+金融</view>
			</view> -->
			<!-- <view class="text-blue margin-top">联合餐饮商家，项信用状况良好的守信主题提供更加优惠的消费途径、更加优质的就餐服务、让守信行为在消费中便发“有价”</view> -->
			<!-- 列表 -->
			<view class="margin-top">
				<view class="cu-card topred article shadow" :class="isCard?'no-card':''">
					<view class="cu-item  shadow">
						<view class="cu-item shadow">
							<view class="flex-sub text-center">
								<view class="padding text-xl">
									信用<view class="add  text-xl">+</view>创业</view>
							</view>
							<view class="padding text-index">一、济南市创业指导中心以政府购买服务的方式，聘请不同行业领域内的专家为创业导师，采取线下一对一“坐诊”、多名专家“会诊”和“巡诊”服务活动、线上开展互联网+创业指导服务相结合方式开展工作，通过线上线下平台为创业者免费提供：</view>
							<view class="padding-left">1、创业导师预约</view>
							<view class="padding-left">2、线上指导服务</view>
							<view class="padding-left">3、创业政策解读</view>
							<view class="padding-left">4、创业服务活动</view>
							<view class="padding-left">5、优秀创业示范项目展示</view>
							<view class="padding-left">6、法律金融咨询服务</view>
							<view class="padding-left">7、创业指导服务的项目经过审核可优先推荐入驻创业孵化基地</view>
							<view class="padding-left">咨询单位：济南市创业指导中心</view>
							<view class="padding-left">电话：</view>
							<view class="padding text-index">二、齐鲁银行开通个人创业担保贷绿色审批通道，针对“个人信用分”700分以上的客户，原则上审批速度提高50%。+创业指导服务相结合方式开展工作，通过线上线下平台为创业者免费提供：</view>
							<view class="padding-left">详情请咨询服务热线： </view>
						</view>
					</view>
				</view>
			</view>
			
	</view>
	
	
</template>

<script>
	import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				isCard: false,
				busarr:[{

				}]
			};
		},
		async onload(option){
			await getinfo()
		},
		methods: {
			async getinfo(){
				// const{data:res} = await this.$http({
				// 	url:'/xyj.xyjVendList.phtml',
				// 	data: {
				// 		viewId:"json",
				// 		page:1,
				// 		def_domain:"bf451a6f0420414db9f3c25624ea3388",
				// 		// def_domain:this.id,
				// 		status:2
				// 	}
				// })
			}
			/* 页面跳转 */
			// navTo(url){
			// 	console.log(url)
			// 	uni.navigateTo({
			// 		url
			// 	})
			// },
		}
		
	};
</script>


<style lang="scss" scoped>
/deep/ .cu-bar .action:first-child{
	margin-top: 32rpx;
	font-size: 32rpx;
}
/deep/ .cuIcon-back:before{
	font-size: 40rpx;
	color: #fff;
}
/deep/ .cu-bar.fixed, .nav.fixed{
	position: static;
}
uni-page-body{
	height: 300rpx;
	background: url(/static/image/activity/xyjcy_banner.png) no-repeat;
	background-size: 100%;
}
.margin-top{
	margin-top: 120rpx;
}
.text-index{
	text-indent: 2em;
}
.add{
	display: inline-block;
	font-weight: bolder;
}
// .top-search{
// 	background-color: #fff;
// }
// .search{
// 	width: 100%!important;
// }
// .search-area {
// 		width: 67%;
// 		.placeholder-style{color:rgba(0,0,0,0.5)}/*微信bug组件内外都要指定*/
// 		align-items: center;
// 		padding: 30rpx 30rpx 0;
// 		position: absolute;
// 		top: -5rpx;
// 		left: 20%;
// 		.top-search{
// 			flex: 1;
// 			align-items: center;
// 			padding:6rpx 16rpx;
// 			background: rgba(255,255,255,1);
// 			border-radius: 72rpx;
// 			.icon{padding-left: 24rpx;}
// 			.placeholder-style{color:rgba(0,0,0,0.5)}
// 			.input {
// 				padding: 0 30rpx 0 20rpx;
// 				font-size: 28rpx;
// 				width: 100%;
// 				color:#fff;
// 				line-height: normal;
// 			}
// 		}
// 	}
	// .centerTop{
	// 	margin-top: 230rpx;
	// 	padding: 0 30rpx;
		// .line{
		// 	background-color: #f7b242;
		// 	width: 15rpx;
		// 	height: 40rpx;
			
		// }
		// .tetile{
		// 	color: #2f74e7;
		// }
		// .text{
		// 	margin-top: 10px;
		// 	color: #6ea3d9;
		// 	font-size: 28rpx;
		// 	line-height: 40rpx;
		// }
	// }

</style>
