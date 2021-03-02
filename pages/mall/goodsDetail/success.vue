<template>
	<view>
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="false">
		    <!-- <block slot="backText">返回</block> -->
		    <block slot="content">订单提交成功</block>
		</cu-custom>
		<!-- 内容 -->
		<view class="success-content flex flex-direction align-center">
			<view class="icon-area  text-center animation-scale-up">
				<text class="lg cuIcon-roundcheckfill text-green"></text>
			</view>
			<view class="des-area text-center">
				恭喜！<br>您的兑换订单已成功提交，订单详情可在“个人中心-兑换记录”中查看
			</view>
			<view class="ope-area">
				<button class="cu-btn round bg-gradual-orange lg" @click="goIndex">返回商城</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				totalNum:0
			}
		},
		onLoad() {
		},
		methods: {
			/* 跳转详情 */
			goIndex(){
				uni.switchTab({
					url:`/pages/mall/index`
				})
			}
		}
	}
</script>

<style lang="scss">
page{background-color: #ffffff;height: 100%}	
.success-content{
	height: 100%;
	padding: 0 60rpx;
	.icon-area{font-size: 110px;}
	.des-area{color:#666}
	.ope-area{
		margin-top: 100rpx;
		.cu-btn{
			padding: 0 90rpx;
		}
	}
}
</style>

