<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">基本信息</block>
			<block slot="right" >
				<text @tap="edit" v-if="!showEdit" class="cuIcon-writefill text-white margin-right-lg"></text>
				<text v-if="showEdit" class="text-white margin-right-lg"  @tap="save">完成</text>
			</block>
		</cu-custom>
		<!-- 
			返回值：
			{
			主键 "id":"f492634ca65d4abe9e0838f39504bb48",
			企业信息关联ID "information_id":"60633cfc76ad43a5a13513766a047c77",
			姓名 "name":"王洪光",
			身份证号 "id_number":"370102199905143712",
			性别 "sex":"0",
			出生日期 "date_of_birth":"2020-12-16 00:00:06",
			民族 "national":"",
			手机号 "phone_number":"15264118982",
			部门 "department":"技术部",
			职务 "position":"职员",
			居住地址 "residential_address":"山东省济南市历下区",
			所属单位 "subordinate_units":"威海海源电力工程有限公司荣成工程分公司工会委员会",
			审核状态"user_activation":"1"
			}
		 -->
		<view class="cu-list menu margin sm-border">
			<view class="cu-item">
				<view class="content minWidth">姓名</view>
				<view class="action">
					<input v-if="showEdit" class="text-right padding-right-0 size-26 width-400" v-model="userInfo.name" placeholder="请输入姓名" name="input" />
					<text v-if="!showEdit">{{userInfo.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content minWidth">性别</view>
				<view class="action">
					<radio-group v-if="showEdit" class="radiolist" v-model="userInfo.sex">
						<radio @click="sexCheck(0)" class='blue radio margin-right-sm' :class="radio=='0'?'checked':''" :checked="radio=='C'?true:false" value="0"></radio> 
						<text>男</text>
						<radio @click="sexCheck(1)" class='blue radio margin-left-sm margin-right-sm' :class="radio=='1'?'checked':''" :checked="radio=='D'?true:false" value="1"></radio> 
						<text>女</text>
					</radio-group>
					<text v-if="!showEdit">{{userInfo.sex=='0'?'男':'女'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content minWidth">民族</view>
				<view class="action">
					<picker v-if="showEdit" @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:userInfo.national}}
						</view>
					</picker>
					<text v-if="!showEdit">{{userInfo.national=='undefined'?'汉族':userInfo.national}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content minWidth">身份证号码</view>
				<view class="action">
					<input v-if="showEdit" class="text-right padding-right-0 size-26 width-400" v-model="userInfo.id_number" placeholder="请输入身份证号码" name="input" />
					<text v-if="!showEdit">{{userInfo.id_number}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content minWidth">所属工会</view>
				<view class="action text-right">
					<textarea v-if="showEdit" maxlength="-1" class="size-26 titarea padding-right-lg" v-model="userInfo.subordinate_units" @input="textareaBInput" placeholder="请输入所属工会"></textarea>
					<text v-if="!showEdit">{{userInfo.subordinate_units}}</text>
				</view>
			</view>
			<view v-if="!showEdit" class="cu-item">
				<view  class="content minWidth">联系电话</view>
				<view class="action">
					<!-- <input v-if="showEdit" class="text-right padding-right-0 size-26 width-400" v-model="userInfo.phone_number" placeholder="请输入联系电话" name="input" /> -->
					<text v-if="!showEdit">{{userInfo.phone_number}}</text>
				</view>
			</view>


			<view class="cu-item">
				<view class="content minWidth">电子邮箱</view>
				<view class="action">
					<input v-if="showEdit" class="text-right padding-right-0 size-26 width-400" v-model="userInfo.email" placeholder="请输入电子邮箱" name="email" />
					<text v-if="!showEdit">{{userInfo.email}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content minWidth">出生日期</view>
				<view class="action">
					<picker v-if="showEdit" mode="date" :value="date_of_birth" @change="bindDateChange">
                        <view class="uni-input">{{userInfo.date_of_birth}}</view>
                    </picker>
					<text v-if="!showEdit">{{userInfo.date_of_birth}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content minWidth">部门</view>
				<view class="action">
					<input v-if="showEdit" class="text-right padding-right-0 size-26 width-400" v-model="userInfo.department_name" placeholder="请输入部门" name="input" />
					<text v-if="!showEdit">{{userInfo.department_name}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content minWidth">职务</view>
				<view class="action">
					<input v-if="showEdit" class="text-right padding-right-0 size-26 width-400" v-model="userInfo.position" placeholder="请输入职务" name="input" />
					<text v-if="!showEdit">{{userInfo.position}}</text>
				</view>
			</view>
			<button class="cu-btn block bg-blue margin-tb-sm lg" v-if="showEdit" @tap="save">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				radio: '',
				picker: ['汉族','壮族','藏族','裕固族','彝族','瑶族','锡伯族','乌孜别克族','维吾尔族','佤族','土家族','土族','塔塔尔族','塔吉克族','水族','畲族','撒拉族','羌族','普米族','怒族','纳西族','仫佬族','苗族','蒙古族','门巴族','毛南族','满族','珞巴族',
							'僳僳族','黎族','拉祜族','柯尔克孜族','景颇族','京族','基诺族','回族','赫哲族','哈萨克族','哈尼族','仡佬族','高山族','鄂温克族','俄罗斯族','鄂伦春族','独龙族','东乡族','侗族','德昂族','傣族','达斡尔族','朝鲜族','布依族','保安族','布朗族','白族','阿昌族'],
				index: -1, 
				showEdit:false,
				sex:"0",
				date_of_birth: "",
				national:"请选择民族"
			}
		},
		methods: {
			edit(){
				this.showEdit = !this.showEdit
				console.log(this.userInfo.national,9090);
			},
			async save(){
				//点提交时获取到最新的内容
				console.log(this.sex)
				// console.log(this.userInfo.sex)
				// 测试个人信息修改
				//判断手机号即身份证号是否正确
				if(this.$rules.isMobilePhone(this.userInfo.id_number) || this.$rules.isMobileIdcard(this.userInfo.id_number)){
					const {data:res} = await this.$http({
						url:'/targetmanage.employee_informationpost_huiyuan.phtml?viewId=json',
						method:'POST',
						data: {
							"mem_id":"d30b462e0b394adebd317cbe03c65778",
							//   "information_id":"60633cfc76ad43a5a13513766a047c77",
							  "name":this.userInfo.name,  //姓名
							  "id_number":this.userInfo.id_number, //身份证号
							  "sex":this.userInfo.sex, //性别
							  "date_of_birth":this.userInfo.date_of_birth, //出生日期
							  "national":this.userInfo.national,  //民族
							  "phone_number":this.userInfo.phone_number,  //手机号
							  "department":this.userInfo.department, //部门
							  "position":this.userInfo.position, //职务
							//   "residential_address":this.userInfo.residential_address,  //居住地址
							  "subordinate_units":this.userInfo.subordinate_units, //所属单位
							  "email":this.userInfo.email, //邮箱
						}
					});
					console.log(this.userInfo.region);
					console.log(res);
					if (res.success == 'true') {
						uni.showToast({
						title: '基本信息修改成功',
						icon: 'none',
					});
						this.getUserInfo()
						this.showEdit = !this.showEdit
					}
				}else{
					uni.showToast({
						title: '手机号或身份证号不正确',
						icon: 'none',
					});
				}
				
			},
			
			async getUserInfo(){
				const {data:res} = await this.$http({
					url:'/targetmanage.employee_information_huiyuandetail.phtml?viewId=json',
					data: {
						mem_id : this.$eap_user.mem_id
					}
				});
				console.log('res');
				console.log(res);
				this.userInfo = res
					
				// if(this.userInfo.national == 'undefined'){
				// 	this.userInfo.national == '汉族'
				// }
				console.log(this.userInfo)
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.userInfo.national=this.picker[this.index]
				console.log(this.index)
			},
			 bindDateChange: function(e) {
				this.userInfo.date_of_birth = e.target.value
			},
			sexCheck(e){
				this.userInfo.sex=e;
			},
		},
		async onLoad() {
			let user =  this.$checkLogin('/pages/userCenter/userInfo/baseInfo',1); // 页面加载时验证登录
			if(!user) return
			await this.getUserInfo()
        },
	}
</script>

<style scoped>
	.minWidth{
		min-width: 200rpx;
	}
	.size-26{
		font-size: 26rpx;
	}
	.titarea{
		width: 480rpx; height: 105rpx;
	}
	.padding-right-0{
		padding-right: 0; 
	}
	.width-400{
		width:400rpx
	}

</style>
