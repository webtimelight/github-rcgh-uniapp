<template>
	<view :class="['goods-list',column=='2'?'column2':'']">
		<view class="uni-flex-item" v-for="(v,i) in dataList" :key="i">
			<view class="item" @click="goDetail(v)">
				<!-- 上 -->
				<view class="hd">
					<text class="tip">信用分{{v.credit_rating}}以上</text>
					<image class="img" :src="goodsSrc(v)" mode="aspectFill"></image>
					<text class="ext" v-if="!restNum(v)">本期已兑完</text>
				</view>
				<!-- 中 -->
				<view class="bd">
					<view class="title uni-ellipsis-2" :class="column=='2'?'solid-top':''">{{v.goods_name}}</view>
					<view class="score"><text class="num">{{v.exchange_points}}</text>积分</view>
					<view class="ext">
						<view class="extinfo" v-if="column=='1'">
							<view class="f-14 text-gray">已兑换<text class="text-red num">{{v.exchanged_num}}</text>件</view>
							<text class="label">去看看</text>
							<slot name="ext"></slot>
						</view>
					</view>
				</view>
				<!-- 下 -->
				<slot class="ft" >
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	/* 
	@props {Array} 数据 :dataList 
	@props {string} 分列显示 :column 默认‘1’
	@methods跳转  @navTo
	@slot 匿名插槽  是否添加第三栏（底部或右侧） 
	*/
	export default {
		props:{
			dataList:{
				type:Array,
				default(){
					return []
				}
			},
			column:{
				type:[Number,String],
				default:'1'
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			goodsSrc(){
				return function(v){
					if(v.goods_img){
						return this.$baseUrl + v.goods_img.split(',')[0]
						}else{
						return '/static/image/imgErr.jpg'
					}
				}
			},
			restNum(){
				return function(v){
					return Number(v.goods_total_num)-Number(v.exchanged_num)
				}
			},
		},
		methods:{
			goDetail(data){
				this.$emit('navTo',data)
			}
		}
	}
</script>

<style scoped lang="scss">
/* 商品列表 */
	.goods-list {
		margin: -15rpx 0;
		.uni-flex-item{
			padding:15rpx 30rpx;
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
					flex: 240rpx 0 0;
					position: relative;
					padding:30rpx 30rpx 20rpx 30rpx ;
					display: flex;
					align-items: center;
					.tip{
						position: absolute;
						z-index: 1;
						top:0;left:0;
						background: #b9a17f;
						color:#ffe7cc;
						padding:0 28rpx 0 20rpx;
						font-size: 24rpx;
						display: block;
						transform: scale(0.8);
						transform-origin: left top;
						height: 42rpx;
						clip-path: polygon(0px 0px, 100% 0px, 95% 50%, 100% 100%, 0px 100%);
					}
					.img {
						position: relative;
						z-index: 0;
						width: 100%;
						height: 160rpx;
						border-radius: 8rpx;
						margin:20rpx 0 0 0;
						/* border:1px solid #f00 */
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
					.extinfo{
						display: flex;justify-content: space-between;
						padding-left: 20rpx;
						.num{padding: 0 10rpx;}
						.label{
							border:2rpx solid #eee;
							padding: 4rpx 10rpx;
							color:#999;
							margin: 0 30rpx 30rpx 0;
							display: inline-block;
							font-size: 24rpx;
						}
					}
					.title {
						word-break: break-all;
						white-space: normal;
						line-height: 1.4;
						padding: 20rpx 20rpx 0 20rpx;
						height: 100rpx;
					}
					.score {
						margin-top: 14rpx;
						margin-bottom: 20rpx;
						line-height: 1.4;
						color:#666;
						font-size: 24rpx;
						padding-left: 20rpx;
						.num{
							font-size: 36rpx;font-weight: bold;
							color:#f00;
							padding-right:10rpx
						}
					}
					.ext{text-align: right;}
				}
			}
		}
		/* 两列 */
		&.column2{
			display: flex;
			flex-wrap: wrap;
			padding: 0 15rpx 0 15rpx;
			.uni-flex-item{
				box-sizing: border-box;
				flex: 50% 0 0;
				padding: 15rpx;
				.item{
					display: flex;
					flex-direction: column;
					.hd{
						padding:30rpx 30rpx 20rpx 30rpx ;
						flex: 1;
						.img{
							height: 200rpx;
						}
						.ext{
							bottom:-1rpx;
						}
					}
				}
			}	
		}
	}
	
	
	
</style>
