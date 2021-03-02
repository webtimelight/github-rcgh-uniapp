<template>
	<view>
		<form>
			<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">提出异议</block>
			</cu-custom>
			<view class="cu-form-group">
				<view class="title">姓名:</view>
				<input disabled class="text" name="input">{{infoArr.name}}</input>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号:</view>
				<view>{{infoArr.id_number.replace(/^(.{6})(?:\d+)(.{4})$/,"$1********$2")}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话:</view>
				<input disabled class="text" name="input">{{infoArr.phone_number}}</input>
			</view>
			<view class="cu-form-group flex-direction align-start margin-bottom">
				<view class="title">异议内容：</view>
				<textarea v-model="conter" maxlength="-1" placeholder="请输入异议内容"></textarea>
			</view>
		</form>
		<view class="btn-bottom">
			<view class="cu-btn bg-orange lg block radius" @click="sub">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoArr: [],
				conter: ""
			}
		},
		methods: {
			async onLoad(options) {
				this.getinfo()
			},
			validateForm(){
				let msg = "";
				if(this.conter=="" || this.conter==null){
					msg = "请填写异议内容";
				}
				if(msg != ""){
					uni.showToast ({
						title: msg,
						icon: 'none'
					});
					return false;
				}
				return true;
				},
			async getinfo() {
				const {
					data: res
				} = await this.$http({
					url: '/targetmanage.employee_information_huiyuandetail.phtml?viewId=json'
				});
				this.infoArr = res
			},

			async sub() {
				if(this.validateForm()){
					const {data: data} = await this.$http({
						url: '/targetmanage.targetobjectionpost.phtml',
						method: 'post',
						data: {
							name: this.infoArr.name,
							id_number: this.infoArr.id_number,
							phone_number: this.infoArr.phone_number,
							objection_content: this.conter
						}
					});
					if (data.success) {
						uni.showModal({
							title: '提示',
							content: '异议信息提交成功，可在“个人中心-异议申请”查看处理状态',
							showCancel: false,
							complete: function() {
								uni.redirectTo({
									url: '/pages/activity/creditscore/index'
								});
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: "异议信息提交失败，请重试",
							showCancel: false
						});
					}
				}
			}
		}
	}
</script>

<style>
page {
	padding-bottom: 120rpx;
}

.cu-form-group .title {
	min-width:180rpx;
}
/* 底部 */
.btn-bottom {
	position: fixed;
	z-index: 2;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 15rpx 30rpx;
	background: #ffffff;
	box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.03);
}
</style>
