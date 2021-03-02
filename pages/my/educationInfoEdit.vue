<template>
	<view class="input-view">
		<form @submit="formSubmit" @reset="formReset">
			<input style="display: none;" name="id" v-model="id" />
			<input style="display: none;" name="mem_id" v-model="mem_id" />
			<view class="uni-flex input-item">
				<view class="input-title">毕业院校<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="school" class="info-input" v-model="educationInfo.school" placeholder="请输入毕业院校" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">所学专业</view>
				<input type="text" name="major" class="info-input" v-model="educationInfo.major" placeholder="请输入所学专业" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">入学时间<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="admission_time" v-model="admission_time" class="info-input" @click="openCalendar('admission_time')" disabled="true" placeholder="请选择入学时间" />
				<view>
					<uni-calendar ref="admission_time" :insert="false" :lunar="true" @confirm="setAdmissionTime"/>
				</view>
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">毕业时间</view>
				<input type="text" name="graduation_time" v-model="graduation_time" class="info-input" @click="openCalendar('graduation_time')" disabled="true" placeholder="请选择毕业时间" />
				<view>
					<uni-calendar ref="graduation_time" :insert="false" :lunar="true" @confirm="setGraduationTime"/>
				</view>
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">学历<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="education" class="info-input" v-model="educationInfo.education" placeholder="请输入学历" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">学位</view>
				<input type="text" name="degree" class="info-input" v-model="educationInfo.degree" placeholder="请输入学位" />
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
				admission_time: '',
				graduation_time: '',
				educationInfo: {},
				id: '',
				mem_id: ''
			}
		},
		onLoad(options){
			this.id = options.id;
			this.mem_id = this.$eap_user.mem_id;
			this.getEducationInfo();
		},
		methods: {
			async getEducationInfo(){
				if(this.id != ""){
					const {data:res} = await this.$http({
						url:'/rcwx.getEducationInfo.phtml',
						data: {id: this.id},
						header: {'token': this.$eap_user_token}
					});
					if(res.educationInfo){
						this.educationInfo = res.educationInfo;
						this.admission_time = res.educationInfo.admission_time;
						this.graduation_time = res.educationInfo.graduation_time;
					}
				}
			},
			async formSubmit(e){
				if(this.validateForm()){
					const {data:res} = await this.$http({
						url:'/rcwx.saveEducation.phtml',
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
									url: '/pages/my/educationInfoList'
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
				this.educationInfo = {};
				this.admission_time = "";
				this.graduation_time = "";
			},
			openCalendar(type){
				if(type == "admission_time"){
					this.$refs.admission_time.open();
				}else if(type == "graduation_time"){
					this.$refs.graduation_time.open();
				}
			},
			setAdmissionTime(e){
				this.admission_time = e.fulldate;
			},
			setGraduationTime(e){
				this.graduation_time = e.fulldate;
			},
			validateForm(){
				const msg = "";
				if(this.educationInfo.school == "" || this.educationInfo.school == undefined){
					msg = "请填写毕业院校";
				}else if(this.admission_time == ""){
					msg = "请选择入学时间";
				}else if(this.educationInfo.education == "" || this.educationInfo.education == undefined){
					msg = "请填写学历";
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
