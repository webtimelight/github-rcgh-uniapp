<template>
	<view class="page-wrap">
		<!-- 骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="home"></com-quick-skeleton>
		<!-- 积分状态 -->
		<view class="score-area">
			<!-- 搜索 -->
			<view class="search-area">
				<view class="top-search flex">
					<uni-icons color="#bbb" class="icon" size="18" type="search" />
					<input  class="input" placeholder="请输入商品关键字" placeholder-class="placeholder-style" disabled @click="navTo('/pages/mall/goodsSearch/goodsSearch')"/>
				</view>
			</view>
			<view class="score-info uni-flex uni-column">
				<!-- 积分 -->
				<block v-if="showScore">
					<view class="score">
						{{myScore}}<text class="f-14 padding-left-sm">分</text>
					</view>
					<view class="tip flex align-center justify-center"  @click="navTo('/pages/mall/score/description')">
						兑换不减少信用分 
						<uni-icons class="icon padding-left-sm" type="help-filled" color="#ffeb00" size="24"></uni-icons>	
					</view>
				</block>
				<!-- 需登录 -->
				<block v-else>
					<view class="noLoginBtn">
						<button  class="cu-btn round line-olive" @click="goLogin">登录后显示积分</button>
					</view>
				</block>
			</view>
			<view class="score-link uni-flex">
				<view class="item uni-flex-item" @click="navTo('/pages/mall/score/index')">
					<text class="iconfont icon-score"></text>
					<text>积分明细</text>
				</view>
				<view class="item uni-flex-item"  @click="navTo('/pages/mall/exchangeRecords/list')">
					<text class="iconfont icon-score-his"></text>
					<text>兑换记录</text>
				</view>
			</view>
		</view>
		
		<!-- 分类菜单 -->
		<view class="category-menu flex margin-bottom">
			<com-scroll-tab class="filter-tab" :dataList="category" v-model="currentNav"  field="title" activeColor="#0b8ffe" @change="tabChange" ></com-scroll-tab>
			<text class="filter-icon iconfont icon-menu3 text-orange text-shadow f-20" @click="doFilter"></text>
		</view>
		
		<!-- 分类主体 -->
		<com-mescroll-page ref="mescrollRef" :sticky="true" :bottombar="false" height="auto" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="main-content">
				<!-- 首页展示 -->
				<view class="goods-block" v-if="currentNav==0">
					<!-- 轮播图 -->
					<view class="swiper-focus margin-bottom">
						<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="rgba(255,126,0,0.8)">
							<swiper-item v-for="(v,i) in focusImg" :key="i">
								<view class="swiper-item">
									<image :src="v.url" style="width: 100%;height: 100%;"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<com-goods-list :dataList="goodsHotList" :column="2" @navTo="goDetail"></com-goods-list>
					<view class="block-title"><text class="t-icon t-icon-paihang"></text>兑换排行榜</view>
					<com-goods-list :dataList="goodsRankList" @navTo="goDetail">
					</com-goods-list>
				</view>
				
				<!-- 其他分类展示 -->
				<view class="goods-block" v-else>
					<com-goods-list :dataList="goodsList[currentNav]" :column="2" @navTo="goDetail"></com-goods-list>
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
				showScore:false,
				skeletonShow:true,
				scoreHeight:0,//积分区域高度
				currentNav:0,
				myScore:0,
				focusImg: [{
					url: "/static/image/banner1.jpg"
				}, {
					url: "/static/image/banner2.jpg"
				}],
				//分类
				category :[{title:'热门',num:1,value:'00',curPageLen:0,hasNext:false}],
				// 推荐
				goodsHotList:[],
				// 排行
				goodsRankList:[],
				//列表集合
				goodsList: [],
				// 下拉刷新配置
				downOption:{
					auto:true,//默认true
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
						tip: '补货中，敬请期待'
					}
				}
			}
		},
		onShow() {
			this.showScore=uni.getStorageSync('eap_user_token')
			this.getScore()
		},
		mounted() {//计算高度
			let obj = uni.createSelectorQuery().select('.score-area')
			obj.boundingClientRect(data=>{
			  this.scoreHeight=data.height
			}).exec()
		},
		methods: {
			// 登录
			goLogin(){
				this.$checkLogin('/pages/mall/index',1);
			},
			//会员积分
			async getScore(){
				const {data:res}=await this.$http({
					url:`/points.mytotalscore.phtml`
				});
				this.myScore=res.totalNum
			},
			//商品分类
			async getCategory(){
				const {data:res}=await this.$http({
					url:`/manager.enumdictdetail.phtml?enum_id=points_goods_type&viewId=json`
				});
				let cates=res.enumvalueListStr.map(item=>{
					return {title:item.enum_name,value:item.enum_value,num:1,hasNext:true}
				})
				this.category=this.category.concat(cates)
			},
			//热门商品
			async getGoodsHot(){
				const {data:res}=await this.$http({
					url:`/points.pointsgoodslisth5.phtml?hot_goods=1&page=1&rows=4`
					});	
				this.goodsHotList=res.rows	
			},
			//商品排行
			async getGoodsRank(){
				const {data:res} = await this.$http({
					url:`/points.exchangeranking.phtml`
				})
				this.goodsRankList=res.rows	
			},
			/*下拉刷新 */
			async downCallback(){
				if(this.currentNav==0){
					this.category.length=1
					await this.getCategory()
					await this.getGoodsHot()
					await this.getGoodsRank()
					this.skeletonShow=false
					this.mescroll.endSuccess()
					this.mescroll.showNoMore()
					return
				}
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				// 请求数据
				const {data:res}=await this.$http({
					url:`/points.pointsgoodslisth5.phtml?goods_type=${this.category[this.currentNav].value}&page=${page.num}&rows=${page.size}`
				})
				if(page.num==1){
					this.$set(this.goodsList,this.currentNav,[])
				}
				this.goodsList[this.currentNav] = this.goodsList[this.currentNav].concat(res.rows);
				// tab添加属性
				let curTab=this.category[this.currentNav]
				curTab.curPageLen = res.rows.length;
				curTab.num = page.num
				curTab.hasNext = this.mescroll.optUp.hasNext
				// 隐藏加载状态
				this.mescroll.endSuccess(res.rows.length);
			},
			// 菜单切换
			async tabChange(e) {
				// 暂存tab
				if(!this.preIndex) this.preIndex = 0
				let preTab = this.category[this.preIndex]
				preTab.y = this.mescroll.getScrollTop()
				this.preIndex = e
				//当前tab
				let curTab = this.category[e] 
				if(this.goodsList[e]){
					this.mescroll.setPageNum(curTab.num + 1) // 恢复页码
					this.mescroll.endSuccess(curTab.curPageLen, curTab.hasNext); // 恢复布局
					this.$nextTick(()=>{
						this.mescroll.scrollTo(curTab.y, 0) //恢复位置
					})
				}else{
					if(e==0){
						this.mescroll.endSuccess()
						this.mescroll.showNoMore()
						return
					}
					//重新加载
					this.mescroll.resetUpScroll()
				}
			},
			/* 页面跳转 */
			navTo(url){
				if(this.$checkLogin('/pages/mall/index',1)){
					uni.navigateTo({
						url
					})
				}
			},
			/* 跳转详情 */
			goDetail(obj){
				if(this.$checkLogin('/pages/mall/index',1)){
					uni.navigateTo({
						url:`/pages/mall/goodsDetail/detail?id=${obj.id}`
					})
				}	
			},
			/* 只看我可兑换的商品 */
			doFilter(){
				uni.showModal({
					title:'温馨提示',
					content:`系统将根据您当前的信用分和会员积分，自动匹配当前可兑换的商品列表，是否前往？`,
					cancelText:'否',
					confirmText:'前往',
					confirmColor:'#f37b1d',
					success: (res) => {
						if(res.confirm){
							this.navTo(`/pages/mall/canExcList`)
						}
					}
				})
			}
		}
		
	};
</script>


<style  lang="scss">
	/* 搜索区域 */
	.search-area {
		.placeholder-style{color:rgba(0,0,0,0.5)}/*微信bug组件内外都要指定*/
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 30rpx 0;
		.top-search{
			flex: 1;
			align-items: center;
			padding:6rpx 16rpx;
			background: rgba(255,255,255,1);
			border-radius: 72rpx;
			.icon{padding-left: 24rpx;}
			.placeholder-style{color:rgba(0,0,0,0.5)}
			.input {
				padding: 0 30rpx 0 20rpx;
				font-size: 28rpx;
				width: 100%;
				color:#fff;
				line-height: normal;
			}
		}
	}
	/* 顶部积分 */
	.score-area {
		background: url(~@/static/image/mall-topbg.jpg) no-repeat;
		background-size: 100% 100%;
		.score-info {
			height: 240rpx;
			text-align: center;
			color: #fff;
			justify-content: center;
			position: relative;
			.tit {
				font-size: 32rpx;
				font-weight: bold;
			}

			.score {
				font-size: 88rpx;
				font-weight: bold;
				line-height: 1.3;
			}

			.tip {
				color: rgba(255, 255, 255, 0.9)
			}
		}
		.noLoginBtn{
			display: inline-block;
			margin: 0 auto;
			.cu-btn{
				padding: 0 50rpx;
				height: 88rpx;
				background: rgba(255,255,255,0.2);
				color:#fff
			}
			.cu-btn[class*="line"]::after{
				color:rgba(255,255,255,0.5)
			}
		}
		.score-link {
			position: relative;
			background: rgba(59,92,255,0.4);
			text-align: center;
			align-items: center;
			height: 90rpx;
			color:#fff;
			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 90rpx;
				&:first-child {
					position: relative;
					&:after{
						content: '';
						position: absolute;
						right:0;width:1px;
						bottom:0;top:0;
						background: rgba(255,255,255,0.6);
						transform: scaleX(0.5);
					}
				}

				.iconfont {
					padding-right: 16rpx;
					color: #fff;
					font-size: 36rpx;
				}
			}
		}
	}
	
	/* 分类菜单 */
	.category-menu{
		z-index: 990;
		position: sticky;
		top:0;
		background-color: #fff;
		.filter-tab{
			width: 620rpx;
		}
		.filter-icon{
			box-shadow: 0 3px 3px rgba(0, 0, 0, 0.06);
			width: 130rpx;
			display: block;
			text-align: center;
			line-height: 100rpx;
			position: relative;
			&:after{
				content: '';
				position: absolute;
				left:0;width:1px;
				bottom:0;top:0;
				background: rgba(0,0,0,0.07);
				transform: scaleX(0.5);
			}
		}
		/deep/ .template-label .scroll-tabs .tabs-wrap .tab-list .tab-item{
			padding: 0 50rpx;
		}
	}
	/* 轮播图 */
	.swiper-focus {
		padding:0 30rpx;
		.swiper {
		height: 200rpx;
		border-radius: 10rpx;
		overflow: hidden;
			.swiper-item {
				height:100%;
			}
		}
	}
	
	/* 主体商品模块 */
	.goods-block{
		.block-title{
			text-align: center;
			line-height: normal;
			position: relative;
			font-size: 30rpx;font-weight: bold;
			margin:50rpx 0 50rpx 0;
			&:before,&:after{
				content: '';
				width: 160rpx;
				height: 1px;
				background-color: #D9D9D9;
				margin: 0 30rpx;
				display: inline-block;
				vertical-align: middle;
			}
			.t-icon{
				vertical-align: middle;
				margin-right: 10rpx;
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
	
</style>
