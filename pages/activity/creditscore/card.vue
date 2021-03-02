<template>
	<view class="cu-card article" >
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">信用名片</block>
		</cu-custom>
		<!-- 详情骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		<view class="card-wrap shadow">
			<view class="card-con">
				<view class="card-content flex flex-direction">
					<view class="flex align-end justify-between card-text-item first margin-bottom">
						<view class="flex align-end">
							<text class="f-24 bold margin-right name">{{card.name}}</text>
							<text class="value">{{card.position}}</text>
						</view>
						<view class="dep">{{card.departmentname}}</view>
					</view>
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-mobilefill padding-right-sm text-blue"></text>手机号</view>
						<view class="value">{{card.phone_number}}</view>
					</view>
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-evaluate_fill padding-right-sm text-orange"></text>信用分</view>
						<view class="value">{{card.total_score}}</view>
					</view>
					<view class="flex align-center card-text-item">
						<view class="name"><text class="icon cuIcon-medalfill padding-right-sm text-green"></text>信用等级</view>
						<view class="value">
							<text class="cuIcon-favorfill text-orange" v-for="(k,v,i) in creditLevel" :key="i"></text>
						</view>
					</view>
				</view>
				<view class="card-bottom text-center text-white bg-gradual-uc">
					<image class="card-code" :src="codeImg" mode="aspectFit"></image>
					<view class="card-company">{{card.unit_name}}</view>
				</view>
			</view>
		</view>
		<view class="btn-bottom">
			<view class="cu-btn bg-red lg block radius" @click="report">下载个人信用报告</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skeletonShow:true,
				dict: [{name: '五星',value: 5}, {name: '四星',value: 4}, {name: '三星',value: 3}, {name: '二星',value: 2}, 
				{name: '一星',value: 1}, {name: '零星',value: 0}],
				codeImg:'',
				card:{},
			}
		},
		async onLoad(options){
			let user =  this.$checkLogin('/pages/activity/creditscore/card',2); // 页面加载时验证登录
			if(!user) return
			await this.getMemDetail()
			this.codeImg=this.$baseUrl+'/targetmanage.targetegenerateqrcode.phtml?id='+this.card.employee_id
			this.id = options.id
			this.skeletonShow=false
		},
		computed:{
			creditLevel(){
				if(this.card.star_rating){
					return this.dict.filter(item=>item.name==this.card.star_rating)[0].value
				}
			}
		},
	    methods: {
			async report(){
				window.location.href=this.$baseUrl+'/targetmanage.downloadCreditReportMobile.phtml?mem_id='+this.card.employee_id
				/* uni.downloadFile({
						url: this.$baseUrl+'/targetmanage.downloadCreditReportMobile.phtml?mem_id='+this.card.employee_id,//下载地址接口返回
						success: ({statusCode,tempFIlePath}) => {
						if(statusCode==200){
							//保存到本地
							uni.saveFile({
								tempFIlePath,
								success:(res)=>{
									 //保存成功并打开文件
									 uni.openDocument({
										filePath:res.savedFilePath,
										success:(res)=>console.log('成功打开文档')
									})
								},
								fail:()=>console.log('下载失败')
							})
						}
						fail:()=>console.log('下载失败')
					},
				}); */
			},
			//员工信息
			async getMemDetail(){
				const {data:res}=await this.$http({
					url:`/targetmanage.targetemployeelisth5json.phtml`
				});
				this.card=res.userscore
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ffffff
	}
	.card-wrap{
		padding: 70rpx;
		.card-con{
			border-radius: 18rpx;
			overflow: hidden;
			border:12rpx solid #6f59fb;
			box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.20);
		}
	}
	.card-content{
		padding-top: 50rpx;
		padding-bottom: 200rpx;
		background: #ffffff;
		.card-text-item{
			padding:10rpx 40rpx;
			justify-content: space-between;
			.name{}
			.value{text-align: right;}
			&.first{
				.name,.value,.dep{line-height: 1;}
			}
		}
	}
	.card-bottom{
		padding-bottom: 20rpx;
		.card-code{
			background: #fff;
			margin-top: -150rpx;
		}
		.card-company{
			line-height:1.4;
			padding: 30rpx 30rpx 20rpx 30rpx;
		}
	}
	.card-code{
		width: 300rpx;
		height: 300rpx;
		border:20rpx solid #fff;
		margin: 0 auto;
		border-radius: 10rpx;
		box-shadow: 0 -10rpx 30rpx rgba(66,44,228,0.15);
	}
	/* 底部 */
	.btn-bottom{
		position: fixed;
		z-index: 2;
		left:0;right:0;bottom:0;
		padding: 15rpx 30rpx;
		background: #ffffff;
		box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.03);
	}
</style>
