<template>
	<view class="page-search">
		<!-- 搜索框 -->
		<view class="search-area">
			<com-search-bar history doBack localKey="goodsHistory" @search="doSearch" @clear="doClear" placeholder="请输入商品关键字查询">
			</com-search-bar>
		</view>
		
		<!-- 搜索结果 -->
		<com-mescroll-page v-show="showResult" ref="mescrollRef" height="auto" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="mix-list">
				<view class="uni-flex-item" v-for="(v,i) in dataList" :key="i">
					<view class="item" @click="goDetail(v)">
						<!-- 上 -->
						<view class="hd">
							<image class="img" :src="goodsSrc(v)" mode="aspectFill"></image>
						</view>
						<!-- 中 -->
						<view class="bd">
							<view class="title uni-ellipsis-2">{{v.goods_name}}</view>
							<view class="ext">
								<view class="f-14 text-gray">兑换积分:<text class="text-red date">{{v.exchange_points}}</text></view>
								<view class="extinfo flex justify-between">
									<view class="f-14 text-gray">信用积分:<text class="text-red num">{{v.credit_rating}}</text>以上</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</com-mescroll-page>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				dataList:[],
				showResult:false,
				query:{
					hot_goods:'',
					goods_name:'',
					goods_type:''
				},
				// 下拉刷新配置
				downOption:{
					auto:false,//默认true
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: false,//默认true
					page: {
						size: 10 // 每页数据,默认10
					},
					noMoreSize: 6, // 列表总数大于等于n条才显示'-- END --'
					textNoMore:'-- 我是有底线的--',
					empty: {
						// icon:'/static/image/nodata.png',
						tip: '抱歉，未查询到您想要的商品'
					}
				}
			}
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
			}
		},
		methods: {
			/* 查询 */
			async doSearch(e){
				this.showResult=true;
				// 关键词
				this.query.goods_name=e.keyWord
				this.downCallback()
			},
			/* 清空 */
			doClear(){
				this.showResult=false
				this.dataList=[]
			},
			/* 跳转详情 */
			goDetail(obj){
				uni.navigateTo({
					url:`/pages/mall/goodsDetail/detail?id=${obj.id}`
				})
			},
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				const {data:res}=await this.$http({
					url:`/points.pointsgoodslisth5.phtml`,
					data:{'page':page.num,'rows':page.size,...this.query}
				})
				if(page.num==1){
					this.dataList=[]
				}
				this.dataList=this.dataList.concat(res.rows)
				this.mescroll.endBySize(res.rows.length, res.records)
			}
		}
	}
</script>

<style lang="scss">
	.mix-list {
		margin: 15rpx 0;
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
					.ext{text-align: left;padding-right: 30rpx;padding-bottom: 20rpx;padding-top: 14rpx}
				}
			}
		}	
	}
</style>
