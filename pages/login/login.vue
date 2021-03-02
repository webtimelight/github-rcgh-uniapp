<template>
	<view>
		<!-- topBar -->
		<!-- <cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">用户登录</block>
		</cu-custom> -->
		<view class="cu-avatar xl round userLogo" style="background-image:url(../../../../static/image/user/login-user.png);"></view>


		<view class="outter bg-white">
			<scroll-view scroll-x class=" nav text-center border-btm"  v-show="TabCur == 0 || TabCur == 1">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabTit" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			<!-- 账号登录 -->
			<view class="input-view" v-show="TabCur == 0">
				<view class="uni-flex input-item">
					<input type="text" class="loginInput" name="username" id="username" v-model.trim="username" placeholder="请输入账号" />
				</view>
				<view class="uni-flex input-item">
					<input type="password" class="loginInput" name="password" id="password" v-model.trim="password" placeholder="请输入密码" />
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue lg shadow margin-top-sm" @click="loginAjax">登录</button>
					<!-- <text class="jh-text" @click="gotoJH()">点击此处前往激活</text> -->
					<text class="jh-text" @tap="showModal" data-target="bottomModal">点击此处前往激活</text>
			
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
<checkbox-group >
	
	    <label>
                        <checkbox @click="gotoJH()"  style="transform:scale(0.7)"/>我已阅读并同意<text class="text-blue" @click="navTo('/pages/login/privacyPolicy')">《隐私政策》</text><text class="text-blue" @click="navTo('/pages/login/mzState')">《免责声明》</text>
                    </label>
</checkbox-group>
				

				</view>
			</view>
		</view>
				</view>
			
			<!-- 手机号登录 -->
			<view class="input-view" v-show="TabCur == 1">
				<view class="uni-flex input-item">
					<input type="text" class="loginInput" name="mem_phone" id="mem_phone" v-model="mem_phone" placeholder="请输入手机号码" />
				</view>
				<view class="input-item relative">
					<input type="text" class="loginInput" name="validatecode" id="validatecode" v-model="validatecode" placeholder="请输入验证码" />
					<button class="cu-btn round bg-orange getPhoneCodeBtn" id="getPhoneCodeBtn" v-bind:disabled="phoneCodeBtnDisable" @click="getPhoneCode">{{toastMeg}}</button>
				</view>
				<view class="padding flex flex-direction margin-top-sm">
					<button class="cu-btn bg-blue lg shadow" @click="loginAjax_mobile">登录</button>
					<text class="jh-text" @tap="showModal" data-target="bottomModal01">点击此处前往激活</text>
							<view class="cu-modal bottom-modal" :class="modalName=='bottomModal01'?'show':''">
			<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
<checkbox-group class="block">
	    <label>
                        <checkbox @click="gotoJH()"  style="transform:scale(0.7)"/>我已阅读并同意<text class="text-blue" @click="navTo('/pages/login/privacyPolicy')">《隐私政策》</text><text class="text-blue" @click="navTo('/pages/login/mzState')">《免责声明》</text>
                    </label>
</checkbox-group>
					
				</view>
			</view>
		</view>
				</view>
			</view>
			
			<!-- 账号激活 -->
			<view class="input-view" v-show="TabCur == 2">
				<view class="uni-flex input-item">
					<input type="text" class="loginInput" v-model="mem_phone_jh" placeholder="请输入手机号码" />
				</view>
				<view class="input-item relative">
					<input type="text" class="loginInput" v-model="validatecode_jh" placeholder="请输入验证码" />
					<button class="cu-btn round bg-orange getPhoneCodeBtn" id="getPhoneCodeBtn" v-bind:disabled="phoneCodeBtnDisable" @click="getPhoneCodeForJH">{{toastMeg}}</button>
				</view>
				<view class="cu-form-group margin-top">
				<view class="title"><text class="text-grey">个人信用信息是否公开</text></view>
				<switch class="blue" @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
				<view class="padding flex flex-direction margin-top-sm">
					<button class="cu-btn bg-blue lg shadow" @click="jhUser()">激活</button>
				</view>
				
			</view>
			<!-- 账号登录 -->
			<view class="input-view" v-show="TabCur == 3">
				<view class="uni-flex input-item">
					<input type="password" class="loginInput" v-model.trim="password_jh" placeholder="请输入密码" />
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue lg shadow margin-top-sm" @click="setPass">保存</button>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import md5 from '../../common/md5.js'
	export default {
		data(){
			return {
				TabTit: ['账号登录','手机号登录'],
				TabCur: 0,
				scrollLeft: 0,
				username:'',
				password:'',
				timestart: 90,
				timestep: -1,
				mem_phone: '',
				validatecode: '',
				toastMeg: '获取验证码',
				phoneCodeBtnDisable: false,
				backpage:'', // 将要返回的页面
				backtype:'' ,// 返回页面的跳转方式
				mem_phone_jh: '',// 激活时手机号
				validatecode_jh: '',//激活时验证码
				password_jh: '',//激活时密码
				modalName: null,
				switchA: 0,
		
			}
		},
		onLoad(options) {
			console.log(options);
            this.backpage = options.backpage;
            this.backtype = options.backtype;
            console.log(this.backpage,this.backtype,'backage and backtype');
        },
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 个人信息是否公开
			SwitchA(e) {
				if (e.detail.value){
		         this.switchA=1
	         } else {
		         this.switchA=0
	               }				
			},	
			// Tab 切换
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
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
			async getPhoneCode(){
				if(this.validatePhone(this.mem_phone)){
					//倒计时90s
					this.timestart = 90;
					this.timecount();
					
					const {data:res} = await this.$http({url:'/common.sendvalidatecodesms.phtml',data: {mem_phone: this.mem_phone,loginflag: '1'}});
					if(res.success != "1"){
						uni.showModal({
							title: '错误',
							content: '短信发送失败，原因：' + res.error_message,
							showCancel: false
						});
					}else{
						uni.showToast({
							title: '短信发送成功'
						});
					}
				}
			},
			timecount() {
				var _this = this;
				_this.timestart += _this.timestep;
				
				if(_this.timestart == 0){
					_this.toastMeg = "重新发送";
					_this.phoneCodeBtnDisable = false;
				}else{
					_this.toastMeg = "重新发送(" + _this.timestart + ")";
					_this.phoneCodeBtnDisable = true;
					setTimeout(function(){
						_this.timecount();
					},1000);
				}
			},
			async loginAjax_mobile(){
				if(this.validatePhone(this.mem_phone)){
					if(this.validatecode == ""){
						uni.showToast({
							title: "请输入验证码！",
							icon: 'none'
						});
						return;
					}
					const {data:res} = await this.$http({url:'/common.appLoginAjax.phtml',
						data: {login_type: 'phone',phone_vcode: this.validatecode,mem_phone: this.mem_phone}});
					if(res.success){
						uni.setStorageSync("eap_user",res.user);
						uni.setStorageSync("eap_user_token",res.token);
						//登录成功调用加分接口
						this.$http({url:`/points.pointsdetailedpost.phtml?points_type=login`});
						uni.redirectTo({
							url: '/pages/my/my'
						});
					}else{
						uni.showModal({
							title: '错误',
							content: '登录失败，失败原因：' + res.msg,
							showCancel: false
						});
					}
				}
			},
			async loginAjax(){
				if(this.userName == '' || this.password == ''){
					uni.showToast({
						title: '用户名或密码不能为空',
						icon: 'none'
					});
					return
				}
				const {data:res} = await this.$http({url:'/common.apiloginajax.phtml',
					data: {
						username : this.username,
						password : md5(this.password),
					}
				});
				if(res.success){
					console.log('-----------------------')
					console.log(res)
					uni.setStorageSync("eap_user",res.user);
					uni.setStorageSync("eap_user_token",res.token);
					//登录成功调用加分接口
					 await this.$http({url:`/points.pointsdetailedpost.phtml?points_type=login`});					
					// 登录成功后,如果有需要返回的页面则返回，如果没有，则跳转到首页
					if (this.backpage == undefined) {
						uni.switchTab({ url:'/pages/userIndex/userIndex'})
					}else{
						if(this.backtype == '1'){
							uni.switchTab({ url: this.backpage });
						}else{

							console.log(this.backpage);							
							uni.redirectTo({ url: this.backpage });
						}
					}
				}else{
					uni.showToast({
						title:'登录失败，失败原因：' + res.msg,
						icon: 'none',
					});
					return
				}
			},
			gotoJH(){
				this.TabCur = 2;
			},
			async getPhoneCodeForJH(){
				if(this.validatePhone(this.mem_phone_jh)){
					const {data:res} = await this.$http({url:'/targetmanage.checkphone.phtml',data: {mem_phone : this.mem_phone_jh},method: "POST"});
					if(res.success == "true"){
						//倒计时90s
						this.timestart = 90;
						this.timecount();
						
						const {data:res} = await this.$http({url:'/common.sendvalidatecodesms.phtml',data: {mem_phone: this.mem_phone_jh,loginflag: '1'}});
						if(res.success != "1"){
							uni.showModal({
								title: '错误',
								content: '短信发送失败，原因：' + res.error_message,
								showCancel: false
							});
						}else{
							uni.showToast({
								title: '短信发送成功'
							});
						}
					}else{
						uni.showModal({
							title: '提示',
							content: '未查询到该用户，请先录入职员信息!',
							showCancel: false
						});
					}
				}
			},
			async jhUser(){
				if(this.validatePhone(this.mem_phone_jh)){
					if(this.validatecode_jh == ""){
						uni.showToast({
							title: "请输入验证码！",
							icon: 'none'
						});
						return;
					}
					const {data:res} = await this.$http({url:'/targetmanage.SendAndCheck.phtml',
						data: {
							mem_phone: this.mem_phone_jh,
							validateCode: this.validatecode_jh,
							sign: "check"
						}
					});
					if(res.success == "true"){
						this.TabCur = 3;
					}else{
						uni.showToast({
							title:'验证码错误，请重新输入',
							icon: 'none',
							duration: 2000
						});
					}
				}
			},
			async setPass(){
				const {data:res} = await this.$http({url:'/targetmanage.employee_UpdateUser.phtml',
					data: {
						mem_phone: this.mem_phone_jh,
						mem_pass: md5(this.password_jh),
						jurisdiction:this.switchA,			

					}
				});
			  
				if(res.success == "true"){
					uni.showModal({
						title: '提示',
						content: '密码修改成功，是否前往登录。',
						confirmText: '去登录',
						success: (_res)=>{
							if (_res.confirm) {
								this.TabCur = 0;
							} else if (_res.cancel) {
								// console.log('取消');
							}
						}
					});
				}else{
					uni.showToast({
						title:'密码修改失败！',
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 普通跳转
			navTo(url){
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style scoped>
	page{
		background: #f6f6f6 url(../../static/image/userCenterTopBg.jpg) no-repeat top;
    	background-size: 100% auto;
	}
	.outter{
		margin-left: 50rpx; margin-right: 50rpx; box-shadow: 0 10rpx 30rpx rgba(180,180,180,0.3);
		padding: 30rpx; border-radius: 15rpx;
	}
	.userLogo{
		border: 10rpx #4a87fc solid; margin: 120rpx auto 80rpx auto; display: block; 
		width: 160rpx; height: 160rpx; 
		/* box-shadow: 0 15rpx 30rpx rgba(73,113,255,1); */
	}
	.border-btm{
		border-bottom: 1px #ddd solid;
	}
	.loginInput{
		background-color: #fff; border: 1px #ddd solid; width: 100%; height: 80rpx;
		border-radius: 80rpx; padding-left: 30rpx;
	}
	.getPhoneCodeBtn{
		position: absolute; top: 5rpx; right: 6rpx; height: 72rpx!important; width: 200rpx!important;
	}
	.cu-btn.lg{
		height: 90rpx;
	}
	.input-item button {
		height: 30px;
		width: 150px;
		font-size: 12px;
	}
	.login-button {
		margin-left: 10px;
		margin-top: 50px;
		margin-right: 10px;
	}
	.jh-text {
		color: #0081FF;
		font-size:16px;
		text-align: center;
		margin-top: 10px;
	}
	.input-item{
		border-bottom: 1px solid transparent;
	}
		button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
	uni-checkbox .uni-checkbox-input{
		width: 18px!important;
		height:18px!important;
		margin-right:12px;
	}
</style>
