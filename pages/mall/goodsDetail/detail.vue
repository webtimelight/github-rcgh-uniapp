<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-white" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">商品详情</block>
		</cu-custom>
		
		<!-- 详情骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		
		<!-- 商品详情 -->
		<view class="goods-detail">
			<!-- 图文简介 -->
			<view class="info-area margin-bottom">
				<view class="item uni-flex uni-column">
					<view class="item-img">
						<text class="tip">信用分{{goodsInfo.credit_rating}}以上</text>
						<!-- 轮播图 -->
						<view class="swiper-focus margin-bottom">
							<swiper class="swiper" indicator-dots="trugoode" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="rgba(255,126,0,0.8)">
								<swiper-item v-for="(v,i) in goodsImg" :key="i">
									<view class="swiper-item">
										<image class="img" :src="v" mode="heightFix"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<view class="item-title uni-ellipsis-2">{{goodsInfo.goods_name}}</view>
					<view class="item-ext">
						<view class="score"><text class="num">{{goodsInfo.exchange_points}}</text>积分</view>
						<view class="totalnum">库存<text class="text-red padding-left-xs">{{restNum}}</text></view>
						<view class="fav">
							<uni-fav :checked="favChecked" class="favBtn" :circle="true" bg-color="#dd524d" bg-color-checked="#007aff"
							 fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick" />
						</view>
					</view>
				</view>
			</view>
			<!-- 文字说明 -->
			<view class="des-area margin-bottom">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>商品详情
					</view>
				</view>
				<view class="detail">
					<rich-text :nodes="goodsDetail"></rich-text>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom">
			<button v-if="myScore<goodsInfo.exchange_points||creditScore<goodsInfo.credit_rating" disabled>积分不足</button>
			<button v-else-if="goodsInfo.del_flag!='0'||goodsInfo.shelf_state!='1'" disabled>商品已下架</button>
			<button v-else-if="restNum=='0'" disabled>库存不足</button>
			<button v-else type="warn" @click="navTo(`/pages/mall/goodsDetail/submit?goodsInfo=${JSON.stringify(goodsInfo)}`)">立即兑换</button>
		</view>
		<!-- 返回顶部 -->
		<com-back-top :src="backTop.src" :scrollTop="backTop.scrollTop"></com-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				favChecked:false,
				creditScore:0,
				myScore:0,
				goodsId:'',
				goodsInfo:{},
				skeletonShow:true,
				//回到顶部
				backTop: {
					src: '/static/image/top.png',
					scrollTop: 0
				}
			};
		},
		async onLoad(option) {
			this.goodsId=option.id
			await this.getScore()
			await this.getCreditScore()
			await this.getDetail()
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		computed:{
			goodsImg(){
				if(this.goodsInfo.goods_img){
					let imgArr= this.goodsInfo.goods_img.split(',')
					return imgArr.map(item=>this.$baseUrl+item)
				}else{
					return ['/static/image/imgErr.jpg']
				}
			},
			goodsDetail(){//详情中图片
				let str=this.goodsInfo.goods_detail+''
				let reg=new RegExp('src=\"',"g");
				return str.replace(reg,`class="pho" src=\"${this.$baseUrl}`)
			},
			restNum(){//库存
				return Number(this.goodsInfo.goods_total_num)-Number(this.goodsInfo.exchanged_num)
			}
		},
		methods:{
			// 点击收藏
			async favClick(){
				if(this.favChecked){
					const {data:res}=await this.$http({
						url:`/points.pointsgoodscollectiondelete.phtml?goods_id=${this.goodsId}`
					})
					if(res.success=="true"){
						this.favChecked=false
					}
				}else{
					const {data:res}=await this.$http({
						url:`/points.pointsgoodscollectionpost.phtml?goods_id=${this.goodsId}`
					})
					if(res.success=="true"){
						this.favChecked=true
					}
				}
			},
			//信用分
			async getCreditScore(){
				const {data:res}=await this.$http({
					url:`/targetmanage.personal_scoresearch.phtml`
				});
				this.creditScore=parseInt(Number(res.total_score))
			},
			//会员分
			async getScore(){
				const {data:res}=await this.$http({
					url:`/points.mytotalscore.phtml`
				});
				this.myScore=Number(res.totalNum)
			},
			// 商品详情
			async getDetail(){
				const {data:res}=await this.$http({
					url:`/points.pointsgoodsdetailh5.phtml?id=${this.goodsId}`
				})
				this.goodsInfo=res
				this.skeletonShow=false
				if(res.collection_state!=0){
					this.favChecked=true
				}
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
.page-wrap{
	height: 100%;
	display: flex;
	flex-direction: column;
}	
/* 轮播图 */
	.swiper-focus {
		padding:0 30rpx;
		.swiper {
		height: 400rpx;
		border-radius: 10rpx;
		overflow: hidden;
			.swiper-item {
				height:100%;
				text-align: center;
				.img{
					margin: 0 auto;
				}
			}
		}
	}
/* 商品列表 */
	.goods-detail {
		padding-bottom: 120rpx;
		/* 商品基本信息 */
		.info-area{
			.item {
				justify-content:flex-start;
				background: #fff;
				.item-img {
					position: relative;
					padding:0;
					.tip{
						position: absolute;
						z-index: 1;
						top:0;left:0;
						background: #b9a17f;
						color:#ffe7cc;
						padding:6rpx 40rpx 6rpx 24rpx;
						font-size: 24rpx;
						display: block;
						transform: scale(1);
						transform-origin: left top;
						height:48rpx;
						line-height: 48rpx;
						clip-path: polygon(0px 0px, 100% 0px, 95% 50%, 100% 100%, 0px 100%);
					}
					.ext{
						text-align: center;
						position: absolute;
						bottom:-1rpx;left:0;right:0;
						background:rgba(0,0,0,0.3);
						color:#fff;
					}
				}

				.item-title {
					font-size: 30rpx;
					font-weight: bold;
					word-break: break-all;
					white-space: normal;
					background: #fff;
					line-height: 1.4;
					padding: 20rpx 30rpx 0 30rpx;
					margin-bottom: 20rpx;
				}

				.item-ext {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #fff;
					margin-bottom: 20rpx;
					line-height: 1.4;
					color:#666;
					font-size: 28rpx;
					.score{
						padding-left: 30rpx;
						.num{
						font-size: 46rpx;font-weight: bold;
						color:#f00;
						padding-right:10rpx
						}
					}
					.fav{padding-right: 30rpx;}
				}
			}
		}
		/* 商品描述 */
		.des-area{
			background: #ffffff;
			min-height: 200rpx;
			flex: 1;
			 /deep/ .pho{
				 max-width: 100%;
				 display: block;
				 margin: 0 auto;
				 }
			/deep/ p{
				font-size: 30rpx!important;
			}
			.detail{
				padding: 30rpx;
			}
		}
	}
	/* 底部 */
	.bottom{
		position: fixed;
		z-index: 2;
		left:0;right:0;bottom:0;
		padding: 15rpx 30rpx;
		background: #ffffff;
		box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.03);
		button[disabled]{
			background-color: #cecfd4!important;
			color:#fff;
			&:after{
				border:0 none
			}
		}
	}
</style>

