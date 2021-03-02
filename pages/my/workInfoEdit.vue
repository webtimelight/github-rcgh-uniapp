<template>
	<view class="input-view">
		<form @submit="formSubmit" @reset="formReset">
			<input style="display: none;" name="id" v-model="id" />
			<input style="display: none;" name="mem_id" v-model="mem_id" />
			<view class="uni-flex input-item">
				<view class="input-title">单位名称<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="unit_name" class="info-input" v-model="workInfo.unit_name" placeholder="请输入单位名称" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">职位<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="position" class="info-input" v-model="workInfo.position" placeholder="请输入职位" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">职业<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="occupation" class="info-input" v-model="workInfo.occupation" placeholder="请输入职业" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">入职时间<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="entry_time" v-model="entry_time" class="info-input" @click="openCalendar('entry_time')" disabled="true" placeholder="请选择入职时间" />
				<view>
					<uni-calendar ref="entry_time" :insert="false" :lunar="true" @confirm="setEntryTime"/>
				</view>
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">离职时间</view>
				<input type="text" name="leave_time" v-model="leave_time" class="info-input" @click="openCalendar('leave_time')" disabled="true" placeholder="请选择离职时间" />
				<view>
					<uni-calendar ref="leave_time" :insert="false" :lunar="true" @confirm="setLeaveTime"/>
				</view>
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">单位地址<font color="red" style="margin-left: 5px;">*</font></view>
				<input type="text" name="unit_address" class="info-input" v-model="workInfo.unit_address" placeholder="请输入单位地址" />
			</view>
			<view class="uni-flex input-item">
				<view class="input-title">所在工会</view>
				<input type="text" name="belong_union" class="info-input" v-model="workInfo.belong_union" placeholder="请输入所在工会" />
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
				entry_time: '',
				leave_time: '',
				workInfo: {},
				id: '',
				mem_id: ''
			}
		},
		onLoad(options){
			this.id = options.id;
			this.mem_id = this.$eap_user.mem_id;
			this.getworkInfo();
		},
		methods: {
			async getworkInfo(){
				if(this.id != ""){
					const {data:res} = await this.$http({
						url:'/rcwx.getworkInfo.phtml',
						data: {id: this.id},
						header: {'token': this.$eap_user_token}
					});
					if(res.workInfo){
						this.workInfo = res.workInfo;
						this.entry_time = res.workInfo.entry_time;
						this.leave_time = res.workInfo.leave_time;
					}
				}
			},
			async formSubmit(e){
				if(this.validateForm()){
					const {data:res} = await this.$http({
						url:'/rcwx.saveWorkInfo.phtml',
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
									url: '/pages/my/workInfoList'
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
				this.workInfo = {};
				this.entry_time = "";
				this.leave_time = "";
			},
			openCalendar(type){
				if(type == "entry_time"){
					this.$refs.entry_time.open();
				}else if(type == "leave_time"){
					this.$refs.leave_time.open();
				}
			},
			setEntryTime(e){
				this.entry_time = e.fulldate;
			},
			setLeaveTime(e){
				this.leave_time = e.fulldate;
			},
			validateForm(){
				var msg = "";
				if(this.workInfo.unit_name == "" || this.workInfo.unit_name == undefined){
					msg = "请填写单位名称";
				}else if(this.workInfo.position == "" || this.workInfo.position == undefined){
					msg = "请填写职位";
				}else if(this.workInfo.occupation == "" || this.workInfo.occupation == undefined){
					msg = "请填写职业";
				}else if(this.entry_time == ""){
					msg = "请选择入职时间";
				}else if(this.workInfo.unit_address == "" || this.workInfo.unit_address == undefined){
					msg = "请填写单位地址";
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
