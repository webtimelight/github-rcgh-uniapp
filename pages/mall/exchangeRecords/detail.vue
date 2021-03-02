<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">兑换详情</block>
		</cu-custom>
		
		<!-- 列表骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		
		<!-- 订单详情 -->
		<view class="order-detail">
			<!-- 商品信息 -->
			<view class="goods-info margin-bottom">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>商品信息
					</view>
				</view>
				<view class="item">
					<view class="hd">
						<image class="img" :src="goodsSrc" mode="aspectFill"></image>
					</view>
					<view class="bd">
						<view class="title uni-ellipsis-2">{{orderInfo.goods_name}}</view>
						<view class="ext">
							<view class="f-14 text-gray">兑换数量：<text class="text-red date">{{orderInfo.exchange_num}}</text></view>
							<view class="extinfo flex justify-between">
								<view class="f-14 text-gray">兑换时间：<text class="text-red num">{{orderInfo.exchange_date}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="order-info margin-bottom-lg">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>订单信息
					</view>
				</view>
				<view class="cu-list menu sm-border">
					<view class="cu-item">
						<view class="content">
							<text class="text-gray">运单号</text>
						</view>
						<view class="action">
							<text v-if="orderInfo.deliver_date">{{orderInfo.waybill_number}}</text>
							<text v-else  class="text-orange">待发货</text>
						</view>
					</view>
					<view class="cu-item" v-if="orderInfo.logistics">
						<view class="content">
							<text class="text-gray">物流</text>
						</view>
						<view class="action">
							<text class="">{{orderInfo.logistics}}</text>
						</view>
					</view>
					<view class="cu-item" v-if="orderInfo.deliver_date">
						<view class="content">
							<text class="text-gray">发出时间</text>
						</view>
						<view class="action">
							<text class="">{{orderInfo.deliver_date}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-gray">收货地址</text>
						</view>
						<view class="action">
							<text class="">{{orderInfo.shipping_address}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-gray">收件人</text>
						</view>
						<view class="action">
							<text class="">{{orderInfo.mem_id}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-gray">联系电话</text>
						</view>
						<view class="action">
							<text class="">{{orderInfo.mphone}}</text>
						</view>
					</view>
					<view class="cu-item" v-if="orderInfo.confirm_receipt">
						<view class="content">
							<text class="text-gray">订单状态</text>
						</view>
						<view class="action">
							<text class="text-green">已确认收货</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom flex justify-between">
			<button class="flex-sub cu-btn lg block bg-blue" @click="redirectDetail">再次兑换</button>
			<button  v-if="orderInfo.confirm_receipt" class="margin-left-sm flex-sub cu-btn lg block bg-red" @click="confirmGoods">确认收货</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				orderInfo:{},
				skeletonShow:true,
			}
		},
		async onLoad(option) {
			this.orderId=option.id
			await this.getOrderInfo()
			this.skeletonShow=false
		},
		computed:{
			goodsSrc(){
				if(this.orderInfo.goods_img){
					return this.$baseUrl + this.orderInfo.goods_img.split(',')[0]
				}else{
					return '/static/image/imgErr.jpg'
				}
			}
		},
		methods: {
			// 订单信息
			async getOrderInfo(){
				const {data:res}=await this.$http({
					url:`/points.pointsexchangeorderdetail.phtml?viewId=json&id=${this.orderId}`
				})
				this.orderInfo=res
			},
			/* 跳转详情 */
			redirectDetail(){
				uni.redirectTo({
					url:`/pages/mall/goodsDetail/detail?id=${this.orderInfo.goods_id}`
				})
			},
			goDetail(){
				uni.navigateTo({
					url:`/pages/mall/goodsDetail/detail?id=${this.orderInfo.goods_id}`
				})
			},
			// 确认收货
			async confirmGoods(){
				const {data:res}=await this.$http({
					url:`/points.confirmreceipt.phtml?id=${this.orderInfo.id}`
				})
				if(res.success=="true"){
					uni.showToast({
						title:'订单确认成功'
					})
				}else{
					uni.showToast({
						title: '确认失败，请稍后重试'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.order-detail{
		padding-bottom: 100rpx;
		.goods-info{
			.item {
				position: relative;
				justify-content:flex-start;
				background: #fff;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				&.item-hover{
					background: #eee;
					.hd .tip:after{
						border-color:transparent #eee transparent transparent
					}
				}
				.hd {
					flex: 220rpx 0 0;
					position: relative;
					padding:30rpx 30rpx 20rpx 30rpx ;
					font-size: 0;
					display: flex;
					align-items: center;
					.img {
						position: relative;
						z-index: 0;
						width: 100%;
						height: 160rpx;
						border-radius: 8rpx;
						margin:0;
					}
					.ext{
						text-align: center;
						position: absolute;
						bottom:0;left:0;right:0;
						background:rgba(0,0,0,0.3);
						color:#fff;
					}
				}
				.bd{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-left:30rpx;
					.extinfo{
						.label{
							border:2rpx solid #eee;
							padding: 4rpx 10rpx;
							color:#999;
							display: inline-block;
							font-size: 24rpx;
						}
					}
					.title {
						word-break: break-all;
						white-space: normal;
						line-height: 1.4;
						padding: 20rpx 30rpx 0 0;
						height: 100rpx;
					}
					.ext{text-align: left;padding-right: 30rpx;padding-bottom: 20rpx;padding-top: 14rpx;}
				}
			}
		}
		.order-info{
			background-color: #fff;
			/deep/ {
				.cu-list.menu>.cu-item .content{
					flex:0 0 120rpx;
					margin-right: 60rpx;
				}
				.cu-item .action{
					flex: 1;
				}
			}
		}
	}
	.bottom{
		margin: 0 -20rpx;
		position: fixed;
		z-index: 2;
		left:0;right:0;bottom:0;
		padding: 15rpx 30rpx;
		background: #ffffff;
		box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.03);
		.cu-btn{
			margin: 0 20rpx;
		}
	}
</style>
