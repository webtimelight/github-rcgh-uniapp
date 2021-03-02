<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">工作履历{{topTit}}</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title leftSide">单位名称：</view>
			<input placeholder="请输入单位名称" v-model="info.unit_name" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">职位：</view>
			<input placeholder="请输入职位" v-model="info.position" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">职业：</view>
			<input placeholder="请输入职业" v-model="info.occupation" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">入职时间：</view>
			<picker mode="date" data-id='entry_time' :value="info.entry_time"  @change="DateChange">
				<view class="picker">
					{{info.entry_time==''?'请选择入职时间':info.entry_time}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">离职时间：</view>
			<picker mode="date" data-id='resignation_time' :value="info.resignation_time"  @change="DateChange">
				<view class="picker">
					{{info.resignation_time==''?'请选择离职时间':info.resignation_time}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">单位地址：</view>
			<input placeholder="请输入单位地址" v-model="info.unit_address" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">所在公会：</view>
			<input placeholder="请输入所在公会" v-model="info.trade_union" name="input"></input>
		</view>
		<button class="cu-btn block bg-blue margin lg" @tap="save">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					unit_name:'',
					position:'',
					occupation:'',
					entry_time:'',
					resignation_time:'',
					unit_address:'',
					trade_union:'',
				},
				topTit:''
			}
		},
		methods: {
			DateChange(e) {
				this.info[e.currentTarget.dataset.id] = e.detail.value
			},
			async save(){
				if (this.info.entry_time!=''&&this.info.resignation_time!='') {
					if(this.info.entry_time>this.info.resignation_time){
						uni.showToast({
							title:"入职时间要小于离职时间",
							icon: 'none',
						});
						return
					}
				}
				if(this.$rules.isNull(this.info.unit_name)){
					uni.showToast({
						title:"请输入单位名称",
						icon: 'none',
					});
				}else{
					var sendData = {
						unit_name:this.info.unit_name,
						position:this.info.position,
						occupation:this.info.occupation,
						entry_time:this.info.entry_time,
						resignation_time:this.info.resignation_time,
						unit_address:this.info.unit_address,
						trade_union:this.info.trade_union,
						create_time:"",
					}
					var toast = '增加'
					if (this.topTit != '增加') {
						sendData.id = this.info.id
						toast = '修改'
					}
					console.log('传参');
					console.log(sendData);
					const {data:res} = await this.$http({
						url:'/targetmanage.work_experiencepost.phtml',
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
		width: 200rpx; text-align: left;
	}
</style>
