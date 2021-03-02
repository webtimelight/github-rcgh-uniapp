<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">兑换记录</block>
			<block slot="right"><text class="cuIcon-homefill text-white margin-right-lg"></text></block>
		</cu-custom>
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
			let user =  this.$checkLogin('/pages/userCenter/exchangeRecord',1); // 页面加载时验证登录
			if(!user) return
        }
	}
</script>

<style>

</style>
