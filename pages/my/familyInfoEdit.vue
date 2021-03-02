<template>
	<view class="input-view">
		<form @submit="formSubmit" @reset="formReset">
			<input style="display: none;" name="id" v-model="id" />
			<input style="display: none;" name="mem_id" v-model="mem_id" />
			<view class="uni-flex input-item">
				<view class="input-title">姓名<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="name" class="info-input" v-model="familyInfo.name" placeholder="请输入姓名" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">与本人关系<font color="red" style="margin-left: 5px;">*</font></view>
				<vv-select v-model="familyInfo.relationship" placeholder="请选择与本人关系" :list="relationship_array" valueKey="enum_value" label="enum_name"></vv-select>
				<input style="display: none;" v-model="familyInfo.relationship" name="relationship" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">身份证号<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="id_card" class="info-input" v-model="familyInfo.id_card" placeholder="请输入身份证号" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">政治面貌<font color="red" style="margin-left: 5px;">*</font></view>
				<vv-select v-model="familyInfo.political_level" placeholder="请选择政治面貌" 
					:list="political_level_array" valueKey="enum_value" label="enum_name"></vv-select>
					<input style="display: none;" v-model="familyInfo.political_level" name="political_level" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">性别<font color="red" style="margin-left: 5px;">*</font></view>
				<vv-select v-model="familyInfo.sex" placeholder="请选择性别" :list="sex_array" valueKey="enum_value" label="enum_name"></vv-select>
				<input style="display: none;" v-model="familyInfo.sex" name="sex" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">联系电话</view>
				<input type="text" name="phone" class="info-input" v-model="familyInfo.phone" placeholder="请输入联系电话" />
			</view><view class="uni-flex input-item">
				<view class="input-title">单位名称</view>
				<input type="text" name="unit_name" class="info-input" v-model="familyInfo.unit_name" placeholder="请输入单位名称" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">职位</view>
				<input type="text" name="position" class="info-input" v-model="familyInfo.position" placeholder="请输入职位" />
			</view>
			<view class="uni-btn-v">
				<button type="primary" form-type="submit">保存</button>
				<button type="warn" form-type="reset">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				relationship_array: [],
				political_level_array: [],
				sex_array: [],
				familyInfo: {},
				id: '',
				mem_id: ''
			}
		},
		onLoad(options){
			this.getEnumList("relationship");
			this.getEnumList("political_level");
			this.getEnumList("sex");
			
			this.id = options.id;
			this.mem_id = this.$eap_user.mem_id;
			this.getFamilyInfo();
		},
		methods: {
			async getFamilyInfo(){
				if(this.id != ""){
					const {data:res} = await this.$http({
						url:'/rcwx.getFamilyInfo.phtml',
						data: {id: this.id},
						header: {'token': this.$eap_user_token}
					});
					if(res.familyInfo){
						this.familyInfo = res.familyInfo;
					}
				}
			},
			async formSubmit(e){
				if(this.validateForm()){
					const {data:res} = await this.$http({
						url:'/rcwx.saveFamilyInfo.phtml',
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
									url: '/pages/my/familyInfoList'
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
				this.familyInfo = {};
			},
			validateForm(){
				if(this.familyInfo.name == "" || this.familyInfo.name == undefined){
					uni.showToast({
						title: "请填写姓名",
						icon: 'none'
					});
					return false;
				}
				if(this.familyInfo.relationship == "" || this.familyInfo.relationship == undefined){
					uni.showToast({
						title: "请选择与本人关系",
						icon: 'none'
					});
					return false;
				}
				if(this.familyInfo.id_card == "" || this.familyInfo.id_card == undefined){
					uni.showToast({
						title: "请填写身份证号",
						icon: 'none'
					});
					return false;
				}
				if(this.familyInfo.id_card != "" || this.familyInfo.id_card != undefined){
					var idCardReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
					if(!idCardReg.test(this.familyInfo.id_card)){
						uni.showToast({
							title: "请填写正确的身份证号码",
							icon: 'none'
						});
						return false;
					}
				}
				if(this.familyInfo.political_level == "" || this.familyInfo.political_level == undefined){
					uni.showToast({
						title: "请选择政治面貌",
						icon: 'none'
					});
					return false;
				}
				if(this.familyInfo.sex == "" || this.familyInfo.sex == undefined){
					uni.showToast({
						title: "请选择性别",
						icon: 'none'
					});
					return false;
				}
				if(this.familyInfo.phone != "" && this.familyInfo.phone != undefined){
					var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if(!phoneReg.test(this.familyInfo.phone)){
						uni.showToast({
							title: "请填写正确的电话号码",
							icon: 'none'
						});
						return false;
					}
				}
				return true;
			},
			async getEnumList(enum_id){
				const {data:res} = await this.$http({
					url:'/rcwx.getEnumList.phtml',
					data: {
						'enum_id': enum_id
					}
				});
				if(res.enumList){
					if(enum_id == "relationship"){
						this.relationship_array = res.enumList;
					}else if(enum_id == "political_level"){
						this.political_level_array = res.enumList;
					}else if(enum_id == "sex"){
						this.sex_array = res.enumList;
					}
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
