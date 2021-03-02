<template>
	<view class="body">
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">补充申报</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名：</view>
				<view class="">{{dataForm.name}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号:</view>
				<view class="">{{dataForm.identitycard.replace(/^(.{6})(?:\d+)(.{4})$/,"$1********$2")}}</view>
			</view>
			<view class="cu-form-group flex-direction align-start">
				<view class="title margin-bottom">信息属性<text class="text-red margin-left-xs">*</text></view>
				<radio-group @change="radioChange" class="flex margin-bottom">
					<label class="flex margin-right" v-for="(v, i) in declareAttr" :key="i">
						<view class="padding-right-xs  radio-icon">
							<radio :value="JSON.stringify(v)" :checked="v.value == dataForm.attribute" />
						</view>
						<view>{{v.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="cu-form-group flex-direction align-start" v-if="dataForm.attribute&&declareType.length">
				<view class="title">指标类别<text class="text-red margin-left-xs">*</text></view>
				<picker class="com-pick" @change="picker1" :value="declareTypeIndex" :range="declareType"
				 range-key="name">
					<view class="picker">
						{{declareTypeIndex>-1?declareType[declareTypeIndex].name:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group flex-direction align-start" v-if="declareTypeIndex>-1&&declareName.length">
				<view class="title">指标名称<text class="text-red margin-left-xs">*</text></view>
				<picker class="com-pick" @change="picker2" :value="declareNameIndex" :range="declareName"
				 range-key="target_content">
					<view class="picker">
						{{declareNameIndex>-1?declareName[declareNameIndex].target_content:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group flex-direction align-start" v-if="declareNameIndex>-1&&declareQuan.length&&declareName[declareNameIndex].quantification_type!='3'">
				<view class="title">请选择成绩<text class="text-red margin-left-xs">*</text></view>
				<picker class="com-pick" @change="picker3" :value="declareQuanIndex" :range="declareQuan"
				 range-key="enum_name">
					<view class="picker">
						{{declareQuanIndex>-1?declareQuan[declareQuanIndex].enum_name:'请选择'}}
					</view>
				</picker>
			</view>
			<!-- 特殊范围值-->
			<view class="cu-form-group flex-direction align-start" v-if="declareNameIndex>-1&&declareName[declareNameIndex].quantification_type=='3'">
				<view class="title">完成量(时间/小时、或金额/元、或人次/人)<text class="text-red margin-left-xs">*</text></view>
				<input class="com-input" type="hidden" v-model="dataForm.quantification_value" name="input" placeholder="请输入条件"></input>
			</view>

			<view class="cu-form-group flex-direction align-start">
				<view class="title">事件描述：</view>
				<textarea v-model="dataForm.describes" maxlength="-1"  placeholder="请输入事件描述"></textarea>
			</view>
		</form>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				证明材料：
			</view>
			<view class="action">
				{{fileTempList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in fileTempList" :key="index" @tap="viewImage" :data-url="fileTempList[index]">
					<image :src="fileTempList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImage" v-if="fileTempList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">事件发生日期<text class="text-red margin-left-xs">*</text></view>
				<picker @change="dateChange($event,'start_time')" mode="date" :value="dataForm.start_time" :start="startDate" :end="endDate">
					<view class="picker">
						<block v-if="dataForm.start_time">
							{{dataForm.start_time}}
						</block>
						<text v-else class="text-gray">请选择事件发生日期</text>
					</view>
				</picker>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">事件到期日期<text class="text-red margin-left-xs">*</text></view>
				<picker @change="dateChange($event,'end_time')" mode="date" :value="dataForm.end_time" :start="startDate" :end="endDate">
					<view class="picker">
						<block v-if="dataForm.end_time">
							{{dataForm.end_time}}
						</block>
						<text v-else class="text-gray">请选择事件到期日期</text>
					</view>
				</picker>
			</view> -->
			<view class="cu-form-group flex-direction align-start margin-bottom">
				<view class="title">备注：</view>
				<textarea v-model="dataForm.bz" maxlength="-1" placeholder="请输入备注信息"></textarea>
			</view>
		</form>
		<view class="btn-bottom">
			<view class="cu-btn bg-orange lg block radius" @click="submit()">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: "",
				fileList:[],
				fileTempList:[],
				// 属性
				declareAttrIndex: -1,
				declareAttr: [{name: '守信信息',value: 'redcodeid'}, {name: '失信信息',value: 'blackcodeid'}],
				//一级
				declareTypeIndex: -1,
				declareType: [],
				//二级
				declareNameIndex: -1,
				declareName: [],
				//三级
				declareQuanIndex: -1,
				declareQuan: [],
				attrInfo: '',
				// 提交
				dataForm: {
					reviewer_state: '0',
					submit_type: '2',
					name: '',
					cardid:'',
					identitycard: '',
					mem_id: '',
					attribute: 'redcodeid',
					category: '',
					target_name: '',
					target_score:0,
					quantification_type: '',
					quantification_value: '',
					describes: '',
					enclosure_path:'',
					start_time:'',
					end_time:'',
					bz: ''
				},
				flag:false
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		async onLoad(options) {
			let user =  this.$checkLogin('/pages/activity/creditscore/scorecredit',2); // 页面加载时验证登录
			if(!user) return
			await this.getMemInfo()
			await this.getDeclareType(this.dataForm.attribute)
		},
		methods: {
			async getMemInfo() {
				const {data: res} = await this.$http({
					url: `/targetmanage.employee_information_huiyuandetail.phtml?viewId=json`
				});
				this.dataForm.mem_id=res.mem_id
				this.dataForm.name=res.name
				this.dataForm.identitycard=res.id_number
			},
			// 单选
			async radioChange(e) {
				this.declareTypeIndex = -1
				this.declareNameIndex = -1
				this.declareQuanIndex = -1
				this.declareType = []
				this.declareName = []
				this.declareQuan = []
				this.dataForm.quantification_type=''
				this.dataForm.quantification_value=''
				this.dataForm.target_name = ''
				this.dataForm.target_score=0
				//属性
				this.dataForm.attribute = JSON.parse(e.detail.value).value
				//类别
				this.getDeclareType(this.dataForm.attribute)
			},
			// pickers
			picker1(e){
				this.declareTypeIndex=e.detail.value
				if (this.declareTypeIndex > -1) {
					this.dataForm.category = this.declareType[this.declareTypeIndex].id
					this.getDeclareName(this.dataForm.category)
					this.declareNameIndex=-1
					this.dataForm.target_name = ''
					this.dataForm.target_score=0
					this.dataForm.quantification_type=''
				}	
			},
			picker2(e){
				this.declareNameIndex=e.detail.value
				if (this.declareNameIndex > -1) {
					this.dataForm.target_name = this.declareName[this.declareNameIndex].id
					this.dataForm.target_score=this.declareName[this.declareNameIndex].scor
					this.dataForm.quantification_type=this.declareName[this.declareNameIndex].quantification_type
					this.getdeclareQuan(this.dataForm.target_name)
					this.declareQuanIndex=-1
					this.dataForm.quantification_value=''
				}	
			},
			picker3(e){
				this.declareQuanIndex=e.detail.value
				if(this.declareQuan.length){
					this.dataForm.quantification_value=this.declareQuan[this.declareQuanIndex].id
				}
			},
			/* 一级 */
			async getDeclareType(parId) {
				const {data: res} = await this.$http({
					url: `/targetmanage.targetModelNodeSelectListjson.phtml`,
					data: {
						parentid: parId
					}
				})
				this.declareType = res.success.map(item => {
					if (item.targeted == '01') {
						item.name += '(市级指标)'
					} else {
						item.name += '(单位指标)'
					}
					return item
				})
			},
			/* 二级*/
			async getDeclareName(parId) {
				const {data: res} = await this.$http({
					url: `/targetmanage.targetModelNodenameSelectListjson.phtml`,
					data: {
						target: parId
					}
				})
				this.declareName = res.success
			},
			/* 三级*/
			async getdeclareQuan(parId) {
				const {data: res} = await this.$http({
					url: `/targetmanage.targetenumlist.phtml`,
					data: {
						fkid_select: parId,
						viewId: 'json'
					}
				})
				this.declareQuan = res.rows
			},
			// 验证
			validateForm() {
				let msg = "";
				if (!this.dataForm.attribute) {
					msg = "请选择信息属性";
				} else if (!this.dataForm.category) {
					msg = "请选择指标类别";
				} else if (!this.dataForm.target_name) {
					msg = "请选择指标名称";
				} else if (this.dataForm.quantification_type=='1'&&!this.dataForm.quantification_value) {
					msg = "请选择成绩";
				} else if(this.dataForm.quantification_type=='3'&&!this.dataForm.quantification_value){
					msg = "请输入条件";
				}else if (!this.dataForm.start_time||!this.dataForm.end_time) {
					msg = "请选择事件开始和到期日期";
				}
				if (msg) {
					uni.showToast({
						title: msg,
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			// 选图
			chooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'], //从相册选择
					success: (res) => {
						if(res.tempFilePaths){
							this.fileTempList = this.fileTempList.concat(res.tempFilePaths)
						}else{
							this.fileTempList = res.tempFilePaths
						}
					}
				});
			},
			// 预览
			viewImage(e) {
				uni.previewImage({
					urls: this.fileTempList,
					current: e.currentTarget.dataset.url
				});
			},
			// 删除
			delImg(e) {
				uni.showModal({
					title: '确认',
					content: '确定要删除吗',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.fileTempList.splice(e.currentTarget.dataset.index, 1)
							this.fileList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 提交
			async submit() {
				
				if (this.validateForm()) {
					await this.upImage()
					if(!this.flag) return
					this.dataForm.enclosure_path=this.fileList.join(',')
					const {data: res} = await this.$http({
						url: `/targetmanage.targetnaturaldeclarepost.phtml`,
						data: this.dataForm,
						method: 'POST'
					})
					if (res.success == "true") {						
						uni.showModal({
							title: '提示',
							content: '补充申报信息提交成功，可在“个人中心-补充申报”查看处理状态',
							showCancel: false,
							complete: function() {
								uni.redirectTo({
									url: '/pages/activity/creditscore/declaration'
								});
							}
						})
					} else {						
						uni.showModal({
							title: '提示',
							content: "保存失败，请重试",
							showCancel: false
						});
					}
				}
			},
			// 上传
			async upImage(){
				for(let i=0;i<this.fileTempList.length;i++){
					// 转base64
					const [error, localres] =await uni.request({
						url:this.fileTempList[i], //本地路径
						method: 'GET',
						responseType: 'arraybuffer',
					}) 
					let base64 = uni.arrayBufferToBase64(localres.data);
					base64 ='data:image/jpeg;base64,'+base64
					// 上传接口
					const {data:upRes}=await this.$http({
						url:`/common.uploadimagebase64.phtml`,
						method:'POST',
						data:{
							imageStr: base64,
							savepath: 'applyImages'
						}
					})
					if(upRes.success=='0'){
						this.fileList=this.fileList.concat(upRes.save_name)
						this.flag=true
					}else{
						this.flag=false
						uni.showToast({
							title:'证明材料上传失败，请重试',
							icon:'none'
						})
					}
				}
				if(this.fileTempList.length==0){
					this.flag=true
				}
			},
			// 日期
			dateChange(e,str){
				this.dataForm[str]=e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 80;
				} else if (type === 'end') {
					year = year + 10;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 120rpx;
	}
	.radio-icon {
		transform: scale(0.75);
	}
	.com-pick {
		width: 100%;
		flex: 1;
		padding-right: 0;
		.picker {
			text-align: left;
			font-size: 30rpx;
			padding: 26rpx 40rpx 26rpx 0;
			overflow: auto;
			white-space: normal;
			line-height: normal;
		}
	}
	.com-input {
		width: 100%;
		flex: 1;
		padding: 26rpx 0 26rpx 0;
		height: auto;
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
