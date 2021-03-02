<template>
	<view v-if="recordInfo!=''">
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">参与记录</block>
		</cu-custom>
		
		<view class="padding-bottom-xs bg-gradual-uc" style="padding-bottom:150rpx">
			<view class="cu-list grid col-3 no-border " style="background-color:transparent;">
				<view class="cu-item">
					<view class="bigText">{{recordInfo.xyjIncentiveLn.discount.substring(2)}}</view>
					<text class="smallText">折扣</text>
				</view>
				<view class="cu-item">
					<view class="bigText">{{recordInfo.xyjIncentiveLn.price}}</view>
					<text class="smallText">原价(元)</text>
				</view>
				<view class="cu-item">
					<view class="bigText">{{recordInfo.xyjIncentiveLn.act_price}}</view>
					<text class="smallText">现价(元)</text>
				</view>
				<view class="cu-item">
					<view class="bigText">{{recordInfo.xyjIncentiveLn.tries_limit}}</view>
					<text class="smallText">限制次数</text>
				</view>
				<view class="cu-item">
					<view class="bigText">{{recordInfo.xyjIncentiveLn.visiting_num}}</view>
					<text class="smallText">正在参与人数</text>
				</view>
				<view class="cu-item">
					<view class="bigText">{{recordInfo.xyjIncentiveLn.visited_num}}</view>
					<text class="smallText">已参与人数</text>
				</view>
			</view>
		</view>
		<view class="padding cu-list menu margin-left-lg  margin-right-lg rsh bg-white" style="margin-top:-150rpx">
			<image v-if="recordInfo.xyjIncentiveRecord.qrcode_img!=''" class="qrcode_img block" :src="this.$baseUrl+recordInfo.xyjIncentiveRecord.qrcode_img"></image>
		</view>

		<view class="cu-list menu margin-left-lg margin-right-lg sm-border rsh bg-white">
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-title text-blue margin-right-xs"></text>
					<text class="text-grey">活动名称</text>
				</view>
				<view class="action">
					{{recordInfo.xyjIncentive.title}}
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-title text-blue margin-right-xs"></text>
					<text class="text-grey">参与时间</text>
				</view>
				<view class="action">
					{{recordInfo.xyjIncentiveRecord.incentive_name}}
				</view>
			</view>
			<view class="cu-item" >
				<view class="content leftSide">
					<text class="cuIcon-title text-blue margin-right-xs"></text>
					<text class="text-grey">门店地址</text>
				</view>
				<view class="action rightSide">
					{{recordInfo.xyjPlace.address}}
				</view>
			</view>
			
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-title text-blue margin-right-xs"></text>
					<text class="text-grey">门店联系人</text>
				</view>
				<view class="action">
					{{recordInfo.xyjPlace.pic_name}}
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-title text-blue margin-right-xs"></text>
					<text class="text-grey">门店名称</text>
				</view>
				<view class="action">
					{{recordInfo.xyjPlace.place_name}}
				</view>
			</view>
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-title text-blue margin-right-xs"></text>
					<text class="text-grey">门店负责人电话</text>
				</view>
				<view class="action">
					{{recordInfo.xyjPlace.tel}}
				</view>
			</view>
			
		</view>
		<view class="cu-list menu margin sm-border rsh bg-white padding padding-left-lg">
			<view class="content">
				<text class="cuIcon-title text-blue margin-right-xs" ></text>
				<text class="text-grey">门店介绍</text>
			</view>
			<view class="action padding-top-sm">
				{{recordInfo.xyjPlace.description}}
			</view>
		</view>
		<view class="cu-list menu margin sm-border rsh bg-white padding padding-left-lg">
			<view class="content">
				<text class="cuIcon-title text-blue margin-right-xs" ></text>
				<text class="text-grey">活动规则</text>
			</view>
			<view class="action padding-top-sm">
				{{recordInfo.xyjIncentiveLn.description}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				recordInfo:''
			}
		},
		methods: {
			async getDetail(){
				const {data:res} = await this.$http({url:'/xyj.xyjIncentiveRecordDetailMobile.phtml?id='+this.id});
				this.recordInfo = res
			}
		},
		onLoad(option) {
			let user =  this.$checkLogin('/pages/userCenter/joinRecord/recordDetail',1); // 页面加载时验证登录
			if(!user) return
			this.id = option.id
			this.getDetail()
		}
	}
</script>

<style>
	page{
		background: #fff
	}
	.rsh{
		border-radius:20rpx; box-shadow: 0px 4px 15px 0 rgba(181, 179, 177, 0.35)
	}
	.qrcode_img{
		width: 350rpx; height: 350rpx; margin: 0 auto;
	}
	.leftSide{
		flex-basis:240rpx!important
	}
	.rightSide{
		flex-basis:480rpx!important
	}
	.bigText{
		font-size: 60rpx; font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; color: rgba(255,255,255,0.8)!important;
	}
	.smallText{
		color: rgba(255,255,255,0.4)!important;
	}
	.bs{
		font-size: 20rpx;
	}
</style>
