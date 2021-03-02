<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>
		<!-- 表单 -->
		<view class="cu-form-group">
			<view class="title leftTit">原始密码：</view>
			<input placeholder="请输入原始密码" name="input" v-model.trim="oldPsw" @blur="checkOldPass" />
		</view>
		<view class="cu-form-group">
			<view class="title leftTit">新密码：</view>
			<input placeholder="请输入新密码" name="input" v-model.trim="newPsw" />
		</view>
		<view class="cu-form-group">
			<view class="title leftTit">确认密码：</view>
			<input placeholder="请再次输入新密码" name="input" v-model.trim="confimNewPsw" />
		</view>
		<!-- 按钮 -->
		<view class="padding text-center">
			<button class="cu-btn bg-blue margin-tb-sm margin-right-sm" @click="save">保存</button>
			<button class="cu-btn bg-orange margin-tb-sm margin-left-sm" @click="reset">重置</button>
		</view>
	</view>
</template>

<script>
	import md5 from '../../common/md5.js'
	export default {
		data() {
			return {
				oldPsw:'',
				newPsw:'',
				confimNewPsw:'' ,
			}
		},
		methods: {
			// 验证原密码是否正确
			async checkOldPass(){
				const {data:res} = await this.$http({url:'/common.login.passwordcheck.dhtml',
					data: {
						old_password : md5(this.oldPsw),
					}
				});
				if (!res.valid) {
					uni.showToast({
						title:"原密码错误，请重新输入",
						icon: 'none'
					});
					this.oldPsw = ''
				}
			},
			async save(){
				if (this.oldPsw == this.newPsw) {
					uni.showToast({
						title:"新密码不能与原密码相同！",
						icon: 'none'
					});
					this.newPsw = ''
					this.confimNewPsw = ''
					return
				}
				if (this.newPsw.length < 6) {
					uni.showToast({
						title:"密码不能少于6位！",
						icon: 'none'
					});
					this.newPsw = ''
					this.confimNewPsw = ''
					return
				}
				if (this.newPsw != this.confimNewPsw) {
					uni.showToast({
						title:"两次输入密码不一致，请重新输入",
						icon: 'none'
					});
					this.confimNewPsw = ''
					return
				}
				if (this.newPsw == '' || this.confimNewPsw == '') {
					uni.showToast({
						title:"密码不能为空！",
						icon: 'none'
					});
					return
				}
				const {data:res} = await this.$http({url:'/common.login.changepassword.phtml',
					method:'POST',
					data: {
						old_password: md5(this.oldPsw),
						password: md5(this.newPsw),
						mem_id: this.$eap_user.mem_id
					}
				});
				if (res._state == '1') {
					uni.showToast({
						title:"密码修改成功，请重新登录！",
						icon: 'none'
					});
					setTimeout(uni.navigateTo({url:'/pages/login/login'}), 1000)
				} else {
					uni.showToast({
						title:"密码修改失败，请重试！",
						icon: 'none'
					});
				}
			}
		
		},
		onLoad() {
			let user =  this.$checkLogin('/pages/userCenter/changePassWord',1); // 页面加载时验证登录
			if(!user) return;			
        }
	}
</script>

<style>
	.leftTit{
		width:200rpx;text-align:right;
	}
</style>
