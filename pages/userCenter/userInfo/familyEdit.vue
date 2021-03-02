<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">家庭成员{{topTit}}</block>
		</cu-custom>
		<!-- "id":"08d4f29a66a445d48b23eb4a63707358",
		"mem_id":"d30b462e0b394adebd317cbe03c65778",
		
		"school":"山大",  （毕业院校）
		"major":"汽修",  （所学专业）
		"school_start":"2020-12-01 15:05:32",  （入学时间）
		"school_end":"2020-12-02 05:25:32",  （入学结束）
		"education":"",  （学历）
		"academic_degree":"",  （学位）

		"create_time":"",  （创建时间）
		"is_del":"0",  (删除标志位 0未删除 1删除 默认0)
		"audit_state":"1",  审核状态(0-未审核,1-审核通过,2-驳回)
		"audit_name":"5929ff3304a44c5bb673bb2238f700a9",  (审核人)
		"audit_time":"2020-12-18 11:52:17",  (审核时间)
		"audit_opinion":"aaaaaaa",  (审核意见)
		"name":"王洪光",  （职工姓名）
		"id_number":"370102199905143712"  （身份证号） -->
		<view class="cu-form-group">
			<view class="title leftSide">家成员姓名：</view>
			<input placeholder="请输入家庭成员姓名" v-model="info.name" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">与职工的关系：</view>
			<input placeholder="请输入与职工本人的关系" v-model="info.relationship" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">身份证号：</view>
			<input placeholder="请输入身份证号" v-model="info.ic_card" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide" style="width: 272rpx;">政治面貌：</view>
			<radio-group  class="radiolist" style="margin-left: 50rpx;">
				<radio @click="qz" class='blue radio margin-right-sm' value="0"></radio> 
				<text>群众</text>
				<radio @click="ty" class='blue radio margin-left-sm margin-right-sm'  value="1"></radio> 
				<text>团员</text>
				<radio @click="dy" class='blue radio margin-left-sm margin-right-sm'  value="1"></radio>
				<text>党员</text>
			</radio-group>
			<!-- <input placeholder="请输入政治面貌" v-model="info.political_outlook" name="input"></input> -->
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">性别：</view>
			<radio-group  class="radiolist" style="margin-left: 70rpx;">
				<radio @click="nan" class='blue radio margin-right-sm' value="0"></radio> 
				<text>男</text>
				<radio @click="nv" class='blue radio margin-left-sm margin-right-sm'  value="1"></radio> 
				<text>女</text>
			</radio-group>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">联系电话：</view>
			<input placeholder="请输入联系电话" v-model="info.phone" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">单位名称：</view>
			<input placeholder="请输入单位名称" v-model="info.unit_name" name="input"></input>
		</view>
		<button class="cu-btn block bg-blue margin lg" @tap="save">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					name:"",
					relationship:"",
					ic_card:"",
					political_outlook:"", 
					sex:"",  
					phone:"",  
					unit_name:"",  
					position:"",  
					create_time:"", 
				},
				topTit:''
			}
		},
		methods: {
			async nan() {
				this.info.sex = "男"
			},
			async nv() {
				this.info.sex = "女"
			},
			async qz() {
				this.info.political_outlook = "群众"
			},
			async ty() {
				this.info.political_outlook = "团员"
			},
			async dy() {
				this.info.political_outlook = "党员"
			},
			//点提交时
			async save(){
				//必填部分
				if(this.$rules.isNull(this.info.name)){
					uni.showToast({
						title:"请输入家庭成员姓名",
						icon: 'none',
					});
				}else{
					var sendData = {
						name:this.info.name,
						relationship:this.info.relationship,
						ic_card:this.info.ic_card,
						political_outlook:this.info.political_outlook, 
						sex:this.info.sex,  
						phone:this.info.phone,  
						unit_name:this.info.unit_name,  
						position:"",  
						create_time:"",  
					}
					//判断手机号即身份证号是否正确
					if(this.$rules.isMobilePhone(this.info.phone) && this.$rules.isMobileIdcard(this.info.ic_card)){
						var toast = '增加'
						if (this.topTit != '增加') {
							sendData.id = this.info.id
							toast = '修改'
						}
						console.log('传参');
						console.log(sendData);
						const {data:res} = await this.$http({
							url:'/targetmanage.familypost.phtml',
							method:'POST',
							data: sendData
						});
						console.log(res);
						if (res.success == 'true') {
							uni.showToast({
								title: toast + "成功",
								icon: 'none',
							});
							uni.navigateBack({})
						}
					}else{
						uni.showToast({
							title: '手机号或身份证号不正确',
							icon: 'none',
						});
					}
				}
				
				
			},
		},
		onLoad(options){
			if (options.info != undefined) {
				this.info = JSON.parse(options.info); this.topTit = '编辑'
			}else{
				this.topTit = '增加'
			}
		}
	}
</script>

<style>
	.leftSide{
		width: 242rpx; text-align: left;
	}
</style>
