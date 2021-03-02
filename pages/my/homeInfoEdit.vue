<template>
	<view class="input-view">
		<form @submit="formSubmit" @reset="formReset">
			<input style="display: none;" name="id" v-model="id" />
			<input style="display: none;" name="mem_id" v-model="mem_id" />
			<view class="uni-flex input-item">
				<view class="input-title">现住地省市<font color="red" style="margin-left: 5px;">*</font></view>
				<vv-select-area v-model="homeInfo.home_pc" :level="level" :list="$regionList" placeholder="请选择现住地省市"></vv-select-area>
				<input style="display: none;" v-model="homeInfo.home_pc" name="home_pc" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">现住地具体地址<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" class="info-input" v-model="homeInfo.home_address" name="home_address" placeholder="请输入现住地具体地址" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">户籍所在地省市<font color="red" style="margin-left: 5px;">*</font></view>
				<vv-select-area v-model="homeInfo.home_register_pc" :level="level" :list="$regionList" placeholder="请选择户籍所在地省市"></vv-select-area>
				<input style="display: none;" v-model="homeInfo.home_register_pc" name="home_register_pc" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">户籍所在地具体地址<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" class="info-input" v-model="homeInfo.home_register_address" name="home_register_address" placeholder="请输入户籍所在地具体地址" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">原户籍省市</view>
				<vv-select-area v-model="homeInfo.original_home_pc" :level="level" :list="$regionList" placeholder="请选择原户籍省市"></vv-select-area>
				<input style="display: none;" v-model="homeInfo.original_home_pc" name="original_home_pc" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">原户籍具体地址</view>
				<input type="text" class="info-input" v-model="homeInfo.original_home_address" name="original_home_address" placeholder="请输入原户籍具体地址" />
			</view>
			<view class="uni-btn-v">
				<button type="primary" form-type="submit">保存</button>
				<button type="warn" form-type="reset">重置</button>
				<button type="default" @click="deleteHome()">删除</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				homeInfo: {},
				id: '',
				mem_id: '',
				level: 2
			}
		},
		onLoad(options){
			this.mem_id = this.$eap_user.mem_id;
			this.getHomeInfo();
		},
		methods: {
			async getHomeInfo(){
				const {data:res} = await this.$http({
					url:'/rcwx.getHomeInfo.phtml',
					data: {mem_id: this.mem_id},
					header: {'token': this.$eap_user_token}
				});
				if(res.homeInfo){
					this.homeInfo = res.homeInfo;
					this.id = res.homeInfo.id;
					
					this.homeInfo.home_pc = [this.homeInfo.home_province,this.homeInfo.home_city];
					this.homeInfo.home_register_pc = [this.homeInfo.home_register_province,this.homeInfo.home_register_city];
					this.homeInfo.original_home_pc = [this.homeInfo.original_home_province,this.homeInfo.original_home_city];
				}
			},
			async formSubmit(e){
				if(this.validateForm()){
					const {data:res} = await this.$http({
						url:'/rcwx.saveHomeInfo.phtml',
						data: e.detail.value,
						header: {
							'token': this.$eap_user_token,
							'Content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST'
					});
					if(res.success == "1"){
						uni.showModal({
							title: '提示',
							content: '保存成功',
							showCancel: false,
							complete: function(){
								uni.redirectTo({
									url: '/pages/my/user_extend_info'
								});
							}
						});
					}else{
						uni.showModal({
							title: '错误',
							content: '保存失败',
							showCancel: false
						});
					}
				}
			},
			formReset(){
				this.homeInfo = {};
			},
			validateForm(){
				if(!this.homeInfo.home_pc){
					uni.showToast({
						title: "请选择现住地省市",
						icon: 'none'
					});
					return false;
				}
				if(!this.homeInfo.home_address){
					uni.showToast({
						title: "请填写现住地具体地址",
						icon: 'none'
					});
					return false;
				}
				if(!this.homeInfo.home_register_pc){
					uni.showToast({
						title: "请选择户籍所在地省市",
						icon: 'none'
					});
					return false;
				}
				if(!this.homeInfo.home_register_address){
					uni.showToast({
						title: "请填写户籍所在地具体地址",
						icon: 'none'
					});
					return false;
				}
				if(this.homeInfo.original_home_pc){
					if(!this.homeInfo.original_home_address){
						uni.showToast({
							title: "请填写原户籍具体地址",
							icon: 'none'
						});
						return false;
					}
				}
				return true;
			},
			async deleteHome(){
				const {data:res} = await this.$http({
					url:'/rcwx.deleteHome.phtml',
					data: {
						'id': this.id
					},
					header: {
						'token': this.$eap_user_token
					}
				});
				if(res.success == "1"){
					uni.showModal({
						title: '提示',
						content: '删除成功',
						showCancel: false,
						complete: function(){
							uni.redirectTo({
								url: '/pages/my/user_extend_info'
							});
						}
					});
				}else{
					uni.showModal({
						title: '错误',
						content: '删除失败',
						showCancel: false
					});
				}
			}
		}
	}
</script>

<style>
	.uni-btn-v {
		display: flex;
	}
	.uni-btn-v button {
		width: 100%;
		margin-top: 30px;
	}
</style>
