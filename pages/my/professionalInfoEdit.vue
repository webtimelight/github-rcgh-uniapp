<template>
	<view class="input-view">
		<form @submit="formSubmit" @reset="formReset">
			<input style="display: none;" name="id" v-model="id" />
			<input style="display: none;" name="mem_id" v-model="mem_id" />
			<view class="uni-flex input-item">
				<view class="input-title">职业资格名称<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="professional_name" class="info-input" v-model="professionalInfo.professional_name" placeholder="请输入职业资格名称" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">证书编号<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="certificate_num" class="info-input" v-model="professionalInfo.certificate_num" placeholder="请输入证书编号" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">级别<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="level" class="info-input" v-model="professionalInfo.level" placeholder="请输入级别" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">类别<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="category" class="info-input" v-model="professionalInfo.category" placeholder="请输入类别" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">获得时间<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="start_time" v-model="start_time" class="info-input" @click="openCalendar('start_time')" disabled="true" placeholder="请选择获得时间" />
				<view>
					<uni-calendar ref="start_time" :insert="false" :lunar="true" @confirm="setStartTime"/>
				</view>
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">到期时间</view>
				<input type="text" name="end_time" v-model="end_time" class="info-input" @click="openCalendar('end_time')" disabled="true" placeholder="请选择到期时间" />
				<view>
					<uni-calendar ref="end_time" :insert="false" :lunar="true" @confirm="setEndTime"/>
				</view>
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">颁发机构<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="award_organ" class="info-input" v-model="professionalInfo.award_organ" placeholder="请输入颁发机构" />
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
				start_time: '',
				end_time: '',
				professionalInfo: {},
				id: '',
				mem_id: ''
			}
		},
		onLoad(options){
			this.id = options.id;
			this.mem_id = this.$eap_user.mem_id;
			this.getProfessionalInfo();
		},
		methods: {
			async getProfessionalInfo(){
				if(this.id != ""){
					const {data:res} = await this.$http({
						url:'/rcwx.getProfessionalInfo.phtml',
						data: {id: this.id},
						header: {'token': this.$eap_user_token}
					});
					if(res.professionalInfo){
						this.professionalInfo = res.professionalInfo;
						this.start_time = res.professionalInfo.start_time;
						this.end_time = res.professionalInfo.end_time;
					}
				}
			},
			async formSubmit(e){
				if(this.validateForm()){
					const {data:res} = await this.$http({
						url:'/rcwx.saveProfessionalInfo.phtml',
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
									url: '/pages/my/professionalList'
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
				this.professionalInfo = {};
				this.start_time = "";
				this.end_time = "";
			},
			openCalendar(type){
				if(type == "start_time"){
					this.$refs.start_time.open();
				}else if(type == "end_time"){
					this.$refs.end_time.open();
				}
			},
			setStartTime(e){
				this.start_time = e.fulldate;
			},
			setEndTime(e){
				this.end_time = e.fulldate;
			},
			validateForm(){
				var msg = "";
				if(this.professionalInfo.professional_name == "" || this.professionalInfo.professional_name == undefined){
					msg = "请填写职业资格";
				}else if(this.professionalInfo.certificate_num == "" || this.professionalInfo.certificate_num == undefined){
					msg = "请填写证书编号";
				}else if(this.professionalInfo.level == "" || this.professionalInfo.level == undefined){
					msg = "请填写级别";
				}else if(this.professionalInfo.category == "" || this.professionalInfo.category == undefined){
					msg = "请填写类别";
				}else if(this.start_time == ""){
					msg = "请选择获得时间";
				}else if(this.professionalInfo.award_organ == "" || this.professionalInfo.award_organ == undefined){
					msg = "请填写颁发机构";
				}
				if(msg != ""){
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					return false;
				}
				return true;
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
