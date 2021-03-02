<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">职业资格{{topTit}}</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title leftSide">证书名称：</view>
			<input placeholder="请输入评书名称" v-model="info.qualifications_name" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">评书编号：</view>
			<input placeholder="请输入评书编号" v-model="info.certificate_number" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">级别：</view>
			<input placeholder="请输入级别" v-model="info.level" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">类别：</view>
			<input placeholder="请输入类别" v-model="info.category" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">获得日期：</view>
			<picker mode="date" data-id='get_date' :value="info.get_date"  @change="DateChange">
				<view class="picker">
					{{info.get_date==''?'请选择获得日期':info.get_date}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">到期日期：</view>
			<picker mode="date" data-id='get_expire' :value="info.get_expire"  @change="DateChange">
				<view class="picker">
					{{info.get_expire==''?'请选择到期日期':info.get_expire}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">颁发机构：</view>
			<input placeholder="请输入颁发机构" v-model="info.issuing_authority" name="input"></input>
		</view>
		<button class="cu-btn block bg-blue margin lg" @tap="save">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					qualifications_name:"",
					certificate_number:"",
					level:"",
					category:"",
					get_date:"",
					get_expire:"",
					issuing_authority:"",
					create_time:"",
				},
				topTit:''
			}
		},
		methods: {
			DateChange(e) {
				this.info[e.currentTarget.dataset.id] = e.detail.value
			},
			async save(){
				if (this.info.get_date!=''&&this.info.get_expire!='') {
					if(this.info.get_date>this.info.get_expire){
						uni.showToast({
							title:"获得时间要小于到期时间",
							icon: 'none',
						});
						return
					}
				}
				if(this.$rules.isNull(this.info.qualifications_name)){
					uni.showToast({
						title:"请输入证书名称",
						icon: 'none',
					});
				}else{
					var sendData = {
						qualifications_name:this.info.qualifications_name,
						certificate_number:this.info.certificate_number,
						level:this.info.level,
						category:this.info.category,
						get_date:this.info.get_date,
						get_expire:this.info.get_expire,
						issuing_authority:this.info.issuing_authority,
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
						url:'/targetmanage.qualificationspost.phtml',
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
