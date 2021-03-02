<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改手机号</block>
		</cu-custom>
		<!-- 表单 -->
		<view class="cu-form-group">
			<view class="title leftTit">手机号：</view>
			<input placeholder="请输入手机号" name="input" v-model="userInfo.phone_number" />
		</view>
		<view class="padding text-center">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="save">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				modalName: null,
			}
		},
		methods: {
			validatePhone(mem_phone){
				if(mem_phone == ""){
					uni.showToast({
						title: "请输入手机号码！",
						icon: 'none'
					});
					return false;
				}
				var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!phoneReg.test(mem_phone)){
					uni.showToast({
						title: "请输入正确的手机号码！",
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			async getUserInfo(){
				let memId=this.$eap_user.mem_id;
				const {data:res} = await this.$http({url:`/targetmanage.employee_information_huiyuandetail.phtml?viewId=json&mem_id=${memId}`});
				this.userInfo = res;
				console.log(this.userInfo.id)
			},
			async save(){								
				//判断手机号是否正确
				if(this.validatePhone(this.userInfo.phone_number) ){					
					const {data:res} = await this.$http({
						url:'/targetmanage.targetupdatenumber.phtml',
						method:'POST',
						data: {
							 "id":this.userInfo.id,				
						     "number":this.userInfo.phone_number,  //手机号							  
						}
					});					
					console.log(res);
					if (res.success == 'true') {
					
					uni.showModal({
							title: '温馨提示',
							content: `手机号修改成功，请重新登录`,
							confirmText: '去登录',
							showCancel: false,
							success: (_res)=>{
								if (_res.confirm) {
									uni.reLaunch({
										url: '/pages/login/login'
									})
								} 
							}
						})
					// uni.removeStorageSync("eap_user");
					// await this.$http({url:`/common.login.logout.phtml`});		
					// uni.redirectTo({url:'/pages/login/login'});					    	
										
				}else{
				uni.showModal({
							title: '温馨提示',
							content: res.msg,
							showCancel: false
						});
				}
			

				}

			},
			async onLoad() {			
			let user =  this.$checkLogin('/pages/userCenter/changePhone',2); // 页面加载时验证登录
			if(!user) return
			await this.getUserInfo()
			console.log(this.$eap_user)
		}
		}
	}
</script>

<style>

</style>
