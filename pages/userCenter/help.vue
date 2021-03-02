<template>
	<view>
		<!-- topBar -->
		<cu-custom style="background:transparent; color:#fff;" :isBack="true"></cu-custom>
		<!--  -->
		<view class="padding padding-bottom-xs padding-top-xs">
			<view class="helpCon bg-white padding" >
				<view>客服电话：<text class="text-blue">0631-7572039</text></view>
				<view>地址：<text class="text-blue">荣成市文化东路85号</text></view>
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
			
		},
		onLoad() {
        }
	}
</script>

<style scoped>
	page{
		background: #fff url(../../static/image/help.jpg) no-repeat top;
    	background-size: contain; height: 900rpx;
	}
	.helpCon{
		border-radius:20rpx; box-shadow: 0px 4px 15px 0 rgba(181, 179, 177, 0.35);
		margin-top: 300rpx; position: relative; z-index: 999;
	}
</style>
