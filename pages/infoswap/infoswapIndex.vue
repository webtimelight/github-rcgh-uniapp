<template>
	  <view class="body">
		  <!-- topBar -->
	  <cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
	  	<block slot="backText">返回</block>
	  	<block slot="content">我有话说</block>
		  		<block slot="right" >
				<text @click="navTo('/pages/infoswap/infoswapList')" class="cuIcon-list text-white margin-right-lg"></text>			
			</block>
	  </cu-custom>
		   <form>
      <view class="cu-form-group margin-top">
        <view class="title">姓名：</view>
		<view>{{dataForm.name}}</view>      
		
      </view>
      <view class="cu-form-group">
        <view class="title">手机号：</view>
        <view>{{dataForm.phone}}</view>
      </view>
	  <view class="cu-form-group">
        <view class="title">邮箱：</view>
         <view>{{dataForm.email}}</view>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">标题<text class="text-red margin-left-xs">*</text></view>
        <input  class="text" name="input" v-model="dataForm.title" placeholder="请输入标题"></input>
      </view>
	  		<view class="cu-form-group flex-direction align-start">
				<view class="title">留言内容<text class="text-red margin-left-xs">*</text></view>
				<textarea  maxlength="-1" v-model="dataForm.content" placeholder="请输入留言内容"></textarea>
			</view>
					<view class="cu-form-group flex-direction align-start">
				<view class="title margin-bottom">是否公开：</view>					
		      <radio-group name="sex" @change="radioChange" class="flex margin-bottom">		
			 <label class="flex margin-right">
				 <view class="padding-right-xs  radio-icon">
				<radio value="1" checked="checked" />
				 </view>
				<view>是</view>									
			</label>
			 <label class="flex margin-right">
				 <view class="padding-right-xs  radio-icon">
				<radio value="0" />
				 </view>
				<view>否</view>							
			</label>
		</radio-group>

			</view>
	  </form>
	  	<view class="btn-bottom margin-top">
			<view class="cu-btn bg-orange lg block radius" @tap="save">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					// 提交
				dataForm: {					
					name: '',
					phone:'',
					email:'',
					title:'',
					content:'',
					isOpen:''	
				}				
			}
		},	
			
		methods: {
		// 是否公开
		radioChange: function(evt) {
		this.dataForm.isOpen=evt.detail.value
		},
		
		async getMemInfo() {
				const {data: res} = await this.$http({
					url: `/targetmanage.employee_information_huiyuandetail.phtml?viewId=json`
				});				
				this.dataForm.name=res.name
				this.dataForm.phone=res.phone_number
				this.dataForm.email=res.email
			},
		async save(){
			 if(this.$rules.isNull(this.dataForm.title)){
					uni.showToast({
						title:"请输入标题",
						icon: 'none',
					});
				}else if(this.$rules.isNull(this.dataForm.content)){
					uni.showToast({
						title:"请输入留言内容",
						icon: 'none',
					});
				}
				else{
		                var infoData = {
						sender_name:this.dataForm.name,
						sender_phone:this.dataForm.phone,	
						sender_email:this.dataForm.email,					
						info_title:this.dataForm.title,
						info_content:this.dataForm.content,
						is_open:this.dataForm.isOpen
					}				
					const {data:res} = await this.$http({
						url:'/49.infoswap.ycInfoswapadd.phtml',
						method:'POST',
						data: infoData
					});
					console.log(res);	
					if (res.success == '1') {
						uni.showToast({
							title: "提交成功",
							icon: 'none',
						});							
					uni.navigateTo({ url:'/pages/infoswap/infoswapList'})
					}		
				
			}
		
		},
		// 普通跳转
			navTo(url){
				uni.navigateTo({
					url
				})
			}
		
	},
		async onLoad() {
		
			let user =  this.$checkLogin('/pages/infoswap/infoswapIndex',2); // 页面加载时验证登录
			if(!user) return
			await this.getMemInfo()			
		}
	
	}
</script>

<style>
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
	.radio-icon {
		transform: scale(0.75);
	}
</style>