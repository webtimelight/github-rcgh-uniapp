<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">学历信息{{topTit}}</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title leftSide">毕业院校：</view>
			<input placeholder="请输入毕业院校" v-model="info.school" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">所学专业：</view>
			<input placeholder="请输入所学专业" v-model="info.major" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">入学时间：</view>
			<picker mode="date" data-id='school_start' :value="info.school_start"  @change="DateChange">
				<view class="picker">
					{{info.school_start==''?'请选择入学时间':info.school_start}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">毕业时间：</view>
			<picker mode="date" data-id='school_end' :value="info.school_end"  @change="DateChange">
				<view class="picker">
					{{info.school_end==''?'请选择毕业时间':info.school_end}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">学历：</view>
			<input placeholder="请输入学历" v-model="info.education" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">学位：</view>
			<input placeholder="请输入学位" v-model="info.academic_degree" name="input"></input>
		</view>
		<button class="cu-btn block bg-blue margin lg" @tap="save">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					school:'',
					major:'',
					school_start:'',
					school_end:'',
					education:'',
					academic_degree:'',
				},
				topTit:'',
				currentDate:''
			}
		},
		methods: {
			//选时间的
			DateChange(e) {
				this.info[e.currentTarget.dataset.id] = e.detail.value
			},
			//点提交时
			async save(){
				//判断时间是否符合事实
				if (this.info.school_start!=''&&this.info.school_end!='') {
					if(this.info.school_start>this.info.school_end){
						uni.showToast({
							title:"入学时间要小于毕业时间",
							icon: 'none',
						});
						return
					}
				}
				//必填部分
				if(this.$rules.isNull(this.info.school && this.info.major)){
					uni.showToast({
						title:"请输入毕业院校及专业",
						icon: 'none',
					});
					return
				}
				// if (this.topTit != '增加') {
				// 	sendData.id = this.info.id
				// }
				var sendData = {
					school:this.info.school,
					major:this.info.major,
					school_start:this.info.school_start,
					school_end:this.info.school_end,
					education:this.info.education,
					academic_degree:this.info.academic_degree
				}
				if (this.topTit != '增加') {
					sendData.id = this.info.id
				}
				const {data:res} = await this.$http({
					url:'/targetmanage.educationpost.phtml',
					method:'POST',
					data: sendData
				});
				// console.log(res);
				if (res.success == 'true') {
					uni.showToast({
						title: this.topTit + "成功",
						icon: 'none',
					});
					uni.navigateBack({})
				}
			},
			getTotay(){
				var time = new Date();
				var year = time.getFullYear();
				var month = time.getMonth()+1;
				var date = time.getDate();
				return year+'-'+this.add0(month)+'-'+this.add0(date);
			},
			//修改月、天的格式，保持两位数显示
			add0(m){
				return m<10?'0'+m:m
			}
		},
		onLoad(options){
			console.log(options)
			if (options.info != undefined) {
				this.info = JSON.parse(options.info); this.topTit = '编辑'
			
			}else{
				this.topTit = '增加'
			}
			this.currentDate = this.getTotay()
		}
	}
</script>

<style>
	.leftSide{
		width: 200rpx; text-align: left;
	}
</style>
