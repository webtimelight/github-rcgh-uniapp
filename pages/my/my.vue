<template>
	<view style="height: 100%;">
		<view class="my-head-view">
			<view class="uni-flex uni-row row-head">
				<image src="/static/image/user/login-user.png" style="height: 50px;width: 50px;margin-top: 15px;margin-left: 10px;"></image>
				<text style="margin-top: 20px;margin-left: 5px;color: #FFFFFF;font-size: 16px;">{{memInfo.mem_name}}</text>
			</view>
			<view class="uni-flex uni-row">
				<view class="uni-flex uni-column head-user-info" style="border-right: 1px solid #FFFFFF;">
					<view>姓名</view>
					<view>{{memInfo.fullname}}</view>
				</view>
				<view class="uni-flex uni-column head-user-info">
					<view>证件号码</view>
					<view>{{memInfo.ukeyid}}</view>
				</view>
			</view>
		</view>
		<view class="my-content-view">
			<view class="uni-flex content-head">
				<view class="content-head-sort">
					<image src="/static/image/user/report.png"></image>
					<view>申报记录</view>
				</view>
				<view class="content-head-sort">
					<image src="/static/image/user/star.png"></image>
					<view>参与记录</view>
				</view>
				<view class="content-head-sort">
					<image src="/static/image/user/edit.png"></image>
					<view>异议记录</view>
				</view>
				<view class="content-head-sort">
					<image src="/static/image/user/headset.png"></image>
					<view>授权记录</view>
				</view>
			</view>
			<view class="list-content">
				<view class="uni-flex list-item">
					<view class="uni-column">用户名</view>
					<view class="uni-column right-column">{{memInfo.mem_name}}</view>
				</view>
				<view class="uni-flex list-item">
					<view class="uni-column">姓名</view>
					<view class="uni-column right-column">{{memInfo.fullname}}</view>
				</view>
				<view class="uni-flex list-item">
					<view class="uni-column">证件号码</view>
					<view class="uni-column right-column">{{memInfo.ukeyid}}</view>
				</view>
				<view class="uni-flex list-item">
					<view class="uni-column">手机号码</view>
					<view class="uni-column right-column">{{memInfo.mem_mphone}}</view>
				</view>
				<view class="uni-flex list-item">
					<view class="uni-column">个人信息</view>
					<view class="uni-column right-column">
						<uni-icons type="arrowright" @click="gotoUserInfo()"></uni-icons>
					</view>
				</view>
				<button type="primary" style="margin-top: 20px;" @click="loginOut();">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				memInfo: {}
			}
		},
		onLoad(options){
			this.memInfo = uni.getStorageSync("eap_user");
		},
		methods: {
			gotoUserInfo(){
				uni.navigateTo({
					url: "/pages/my/user_extend_info?mem_id=" + this.memInfo.mem_id
				});
			},
			loginOut(){
				uni.switchTab({
					url: '/pages/index/index',
					complete: function(){
						uni.removeStorageSync("eap_user");
						uni.removeStorageSync("eap_user_token");
					}
				});
			}
		}
	}
</script>

<style>
	.my-head-view{
		height: 30%;
		width: 100%;
		background: url(http://wechat.jncredit.jinan.gov.cn/images/2020/06/20200615231425946.jpg) no-repeat top;
		background-size: cover;
	}
	.head-user-info {
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}
	.uni-column view{
		font-size: 14px;
	}
	.row-head{
		height: 30%;
	}
	.my-content-view {
		height: 70%;
	}
	.content-head {
		background: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		text-align: center;
		position: relative;
		width: 94%;
		height: 105px;
		margin: -20% 3% 20px 3%;
		text-align: center;
	}
	.content-head-sort {
		width: 25%;
		margin-top: 30px;
	}
	.content-head-sort image {
		height: 30px;
		width: 30px;
		border: 0;
	}
	.content-head-sort view {
		font-size: 14px;
		font-family: 黑体;
	}
</style>
