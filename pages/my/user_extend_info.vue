<template>
	<view>
		<view class="list-content">
			<view class="uni-flex list-item">
				<view class="uni-column">学历信息</view>
				<view class="uni-column right-column">
					<uni-icons type="arrowright" @click="gotoUserInfo('education')"></uni-icons>
				</view>
			</view>
			<view class="uni-flex list-item">
				<view class="uni-column">工作履历</view>
				<view class="uni-column right-column">
					<uni-icons type="arrowright" @click="gotoUserInfo('work')"></uni-icons>
				</view>
			</view>
			<view class="uni-flex list-item">
				<view class="uni-column">职业资格</view>
				<view class="uni-column right-column">
					<uni-icons type="arrowright" @click="gotoUserInfo('professional')"></uni-icons>
				</view>
			</view>
			<view class="uni-flex list-item">
				<view class="uni-column">家庭成员</view>
				<view class="uni-column right-column">
					<uni-icons type="arrowright" @click="gotoUserInfo('family')"></uni-icons>
				</view>
			</view>
			<view class="uni-flex list-item">
				<view class="uni-column">户籍信息</view>
				<view class="uni-column right-column">
					<uni-icons type="arrowright" @click="gotoUserInfo('home')"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		},
		onLoad(options){
			
		},
		methods: {
			gotoUserInfo(type){
				if(type == "education"){
					uni.navigateTo({
						url: '/pages/my/educationInfoList'
					});
				}else if(type == "work"){
					uni.navigateTo({
						url: '/pages/my/workInfoList'
					});
				}else if(type == "professional"){
					uni.navigateTo({
						url: '/pages/my/professionalList'
					});
				}else if(type == "family"){
					uni.navigateTo({
						url: '/pages/my/familyInfoList'
					});
				}else if(type == "home"){
					uni.navigateTo({
						url: '/pages/my/homeInfoEdit'
					});
				}
			}
		}
	}
</script>

<style>
</style>
