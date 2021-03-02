<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">积分说明</block>
		</cu-custom>
		<view class="artical">
			<view class="tit">
				什么是信用分？
			</view>
			<view class="con">
				信用分，通过信用正面信息和负面信息的采集累计加、减分综合得出，信用激励的线下活动和商品兑换需要满足一定信用分作为前置条件才能参与。
			</view>
			<view class="tit">
				什么是会员积分？
			</view>
			<view class="con">
				会员积分，可以在信用商城兑换商品，兑换后扣除相应积分。会员积分可通过每日登录、参与平台发布的活动任务，或者信用分的提升来获得。
			</view>
			<view class="tit">
				商城兑换会影响信用分吗？
			</view>
			<view class="con">
				不会，商品兑换只会消耗会员积分，不会影响您的信用分。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{background: #fff;}
	.artical{
		padding: 30rpx;
		background: #fff;
		text-align:justify;
		.tit{
			color:#333;
			font-weight: bold;
			font-size: 30rpx;
		}
		.con{
			color:#666;
			margin-bottom: 30rpx;
		}
	}	

</style>
