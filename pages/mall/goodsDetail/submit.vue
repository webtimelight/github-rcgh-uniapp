<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">提交订单</block>
		</cu-custom>
		
		<!-- 列表骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		
		<!-- 订单详情 -->
		<view class="order-detail">
			<!-- 收货地址 -->
			<view class="add-info margin-bottom">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>收货地址
					</view>
				</view>
				<view class="address-area flex align-center" @click="navTo(`/pages/userCenter/address?canSelect=true`)">
					<view class="left flex-sub">
						<view class="addressinfo f-16 margin-bottom-xs">
							<text v-if="formData.shipping_address">{{formData.shipping_address}}</text>
							<text v-else class="text-red">
								点击选择收货地址<text class="lg text-red padding-left-sm cuIcon-roundaddfill"></text>
							</text>
						</view>
						<view class="userinfo flex justify-between">
							<view class="text-grey">收件人：{{this.$eap_user.fullname}} </view>
							<text class="text-sm cuIcon-dianhua text-orange">
								<text class="text-grey padding-left-xs">{{this.$eap_user.mem_mphone}}</text>
							</text>
						</view>
					</view>
					<view class="right margin-left-lg">
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
			</view>
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
						<view class="title uni-ellipsis-2">{{goodsInfo.goods_name}}</view>
						<view class="ext">
							<view class="f-14 text-gray">信用积分:<text class="text-red num">{{goodsInfo.credit_rating}}</text>以上</view>
							<view class="extinfo flex justify-between">
								<view class="f-14 text-gray">兑换积分:<text class="text-red date">{{goodsInfo.exchange_points}}</text></view>
								<view class="f-14 text-gray">库存:<text class="text-red num">{{restNum}}</text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 选择数量 -->
			<view class="order-info margin-bottom-lg">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>选择数量
					</view>
					<view class="select-num">
						<uni-number-box :min="1" :max="restNum" :value="formData.exchange_num" @change="numChange"></uni-number-box>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom flex justify-between">
			<button class="flex-sub cu-btn lg block bg-red" @click="goSubmit">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myScore:0,
				orderId:'',
				goodsInfo:{},
				addressList:[],
				skeletonShow:true,
				formData:{
					goods_id:'',
					exchange_num:1,
					shipping_address:''
				}
			}
		},
		async onLoad(option) {
			await this.getScore()
			this.goodsInfo=JSON.parse(option.goodsInfo)
			this.formData.goods_id=this.goodsInfo.id
			this.skeletonShow=false
		},
		onShow() {
			//更新地址
			this.getAddressList()
		},
		computed:{
			goodsSrc(){
				if(this.goodsInfo.goods_img){
					return this.$baseUrl + this.goodsInfo.goods_img.split(',')[0]
				}else{
					return '/static/image/imgErr.jpg'
				}
			},
			deductSorce(){//扣除积分
				return Number(this.formData.exchange_num)*Number(this.goodsInfo.exchange_points)
			},
			restNum(){//库存
				return Number(this.goodsInfo.goods_total_num)-Number(this.goodsInfo.exchanged_num)
			}
		},
		methods: {
			//会员积分
			async getScore(){
				const {data:res}=await this.$http({
					url:`/points.mytotalscore.phtml`
				});
				this.myScore=Number(res.totalNum)
			},
			// 提交订单
			async goSubmit(){
				if(!this.formData.shipping_address){
					return uni.showToast({
						title:'请先选择收货地址',
						icon:'none'
					})
				}
				uni.showModal({
					title:'订单确认',
					content:`您当前有 ${this.myScore} 会员积分，本次兑换商品数量 ${this.formData.exchange_num} 件，将扣除会员积分 ${this.deductSorce} 分。${"\n"}收货地址：${this.formData.shipping_address}。${"\n"}确定提交订单吗？`,
					success: (res) => {
						if(res.confirm){
							this.doSubmit()
						}
					}
				})
			},
			
			// 提交
			async doSubmit(){
				const {data:res}=await this.$http({
					url:`/points.pointsexchangeorderadd.phtml`,
					method:'POST',
					data:this.formData
				})
				if(res.success=="true"){
					uni.redirectTo({
						url:`/pages/mall/goodsDetail/success`
					})
				}else{
					uni.showToast({
						title: '订单提交失败，请稍后重试',
						icon: 'none'
					})
				}
			},
			
			// 收货地址
			async getAddressList(){
				const {data:res} = await this.$http({url:'/points.pointsusualaddresslist.phtml'})
				if(res.rows.length){
					this.formData.shipping_address = res.rows.filter(item=>item.default_address=='1')[0].usual_address
				}else{
					this.formData.shipping_address =''
				}
			},
			// 加减数
			numChange(value){
				this.formData.exchange_num=value
			},
			/* 页面跳转 */
			navTo(url){
				uni.navigateTo({
					url
				})
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
			.cu-bar{
				.select-num{
					padding: 30rpx;
					.uni-numbox{
						width: auto;
					}
				}
			} 
		}
		.address-area{
			background: url(@/static/image/mailbg.jpg) no-repeat center bottom #ffffff;
			background-size: contain;
			padding:20rpx 30rpx 40rpx;
			.userinfo{
				
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

