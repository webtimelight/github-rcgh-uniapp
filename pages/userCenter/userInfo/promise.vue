<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">信用承诺</block>
			<block slot="right"><text class="cuIcon-writefill text-white margin-right-lg"></text></block>
		</cu-custom>
		<view class="cu-list menu margin sm-border">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">信用承诺图片</text>
				</view>
				<view class="action">
					<text class="text-grey "></text>
				</view>
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
			let user = this.$checkLogin('/pages/userCenter/userInfo/promise',1); // 页面加载时验证登录
			if(!user) return
        }
	}
</script>

<style>

</style>
