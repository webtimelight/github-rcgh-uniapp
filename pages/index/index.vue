<template>
	<view class="container">
		<!-- 首页骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="home"></com-quick-skeleton>
		<!-- 搜索区域 -->
		<view class="search-area">
			<view class="top-search uni-flex">
				<uni-icons color="#ffffff" class="icon" size="18" type="search" />
				<input  class="input" placeholder="请输入要查找的内容" placeholder-class="placeholder-style" disabled @click="navTo('/pages/index/newsSearch/newsSearch')"/>
			</view>
			<view class="top-scan" @click="scanCode"><text class="iconfont icon-top-scan"></text></view>
			<view class="top-user" @click="navTo('/pages/userCenter/index')"><text class="iconfont icon-yonghu-xianxing"></text></view>
		</view>
		<!-- tab-menu区域 -->
		<com-scroll-nav :dataList="category" field="tab_title" :activeItem="currentNav"  @navClick="tapNav">
			<view v-if="category.length>3" @click="openNav">
				<text class="nav-more iconfont icon-menu-more2"></text>
			</view>
		</com-scroll-nav>
		<!-- 全部菜单 -->
		<uni-popup ref="popup" type="top">
			<uni-nav-bar title="全部频道">
				<view slot="right" @click="closePopup">
					<uni-icons type="closeempty" size="24"></uni-icons>
				</view>
			</uni-nav-bar>
			<view class="popup-body">
				<view class="tip">
					点击进入频道
				</view>
				<view class="nav-list">
					<view v-for="(nav,index) in category" :key="nav.id" :id="nav.id" :class="['nav-list-item',currentNav==index?'active':'']">
						<view class="label uni-ellipsis" @click="tapNav(index);closePopup()">{{nav.tab_title}}</view>
					</view>
				</view>	
			</view>
		</uni-popup>

		<!-- tab-swiper-content区域 -->
		<swiper :current="currentNav" @change="changeNav" class="swiper-box" duration="300">
			<block v-for="(item,index) in category" :key="index">
				<swiper-item>
					<scroll-view class="item-scroll-view" scroll-y refresher-enabled refresher-background="transparent" :refresher-triggered="item.triggered" @refresherrefresh="onRefresh(index)"  @scrolltolower="loadMore(item,index)">
						<!-- 轮播图 -->
						<view class="swiper-focus" v-if="index==0">
							<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="rgba(255,126,0,0.8)">
								<swiper-item v-for="(v,i) in imgNews" :key="i" @click="goDetail(v)">
									<view class="swiper-item">
										<image :src="imgUrl(v.newsimgpath)"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
						<!-- 新闻列表 -->
						<com-no-data v-if="item.nodata&&newsData[index].length==0" class="no-data" title="暂无相关内容"></com-no-data>
						<com-news-list v-else :dataList="newsData[index]" @navTo="goDetail"></com-news-list>
						<view class="list-more" v-if="item.showLoadMore">
							<uni-load-more :status="item.status" :contentText="contentText"></uni-load-more>
						</view>
					</scroll-view>
				</swiper-item>
			</block>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return { 
				skeletonShow:true,
				//新闻分类
				category :[],
				// 新闻集合
				newsData:[],
				newsPage:[],
				newsTotalPage:[],
				// 图片新闻
				imgNews:[],
				//tab-menu
				currentNav: 0,
				//下拉刷新状态
				triggered: false,
				//触底加载更多
				contentText: {
					contentdown: "查看更多",
					contentrefresh: "加载中",
					contentnomore: "——— 没有更多了 ———"
				}
			}
		},
		async onLoad(options) {
			await this.getCategory();
			await this.getImgNews();
			this.onRefresh(this.currentNav);
			this.skeletonShow=false
		},
		computed:{
			imgUrl:function(){
				return function(img){
					return this.$baseUrl+img
				}
			}
		},
		methods: {
			//获取分类数据
			async getCategory(){
				const {data:res}=await this.$http({url:'/16.tabgroup.tabgroupJson.phtml'});
				if(res.tabgroup){
					this.category = res.tabgroup;
				}
			},
			//动态获取当前分类数据
			async getNews(){
				let index=this.currentNav;
				this.$set(this.category[index],'nodata',false);//增加暂无数据状态
				this.$set(this.newsPage,index,1);//初始页
				const {data:res}=await this.$http({
					url:this.category[index].action_url + '.phtml',
					data:{
						page:this.newsPage[index],
						infonum:10
						},
					});
				this.$set(this.newsData,index,res.results);
				this.$set(this.newsTotalPage,index,res.page);
			},
			async getImgNews(){//图片新闻
				const {data:res}=await this.$http({url:'/17.news.jlist.phtml'});
				this.imgNews=res.results;
			},
			// 普通跳转
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			//页面跳转-新闻详情
			goDetail(e){
				uni.navigateTo({
					url:`/pages/index/newsDetail/newsDetail?block_id=${e.block_id}&html_url=`+encodeURIComponent(JSON.stringify(e.html_url))
				})
			},
			//弹出全部菜单
			openNav() {
				this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close();
			},
			// 菜单切换
			tapNav(e) {
				this.currentNav = e;
			},
			changeNav(e){
				let index=e.detail.current;
				this.currentNav = index;
				if (this.category[index].read) return;//已读
				this.onRefresh(index)
			},
			//scroll-view下拉刷新
			onRefresh(index) {
				let target=this.category[index];
				if (target.freshing) return;
				this.$set(target,'freshing',true);
				this.$set(target,'triggered',true);
				this.getNews().then(()=>{
					setTimeout(() => {
						target.freshing = false;
						target.triggered = false;
						target.read=true;//添加已读状态
						target.nodata=true;//暂无数据状态开启
						console.log('数据刷新完成')
					},500)
				});
			},
			//scroll-view加载更多
			async loadMore(item,index){
				item.showLoadMore=true;
				this.$set(item,'status','loading');
				if(item.isLoading) return;
				this.newsPage[index]++;//翻页
				if(this.newsPage[index]>this.newsTotalPage[index].totalpage){
					return item.status="noMore"
				};
				this.$set(item,'isLoading',true)
				const {data:res}=await this.$http({
					url:this.category[index].action_url + '.phtml',
					data:{
						page:this.newsPage[index],
						infonum:10,
						}
					});
				setTimeout(()=>{
					this.$set(this.newsData,index,[...this.newsData[index],...res.results])
					item.isLoading=false;
				},500)
			},
			//扫码
			async scanCode(){
				let [error,res]=await uni.scanCode({
					
				});
				console.log(res)
			},
		}
	}
</script>

<style lang="scss">
	/* swiper整体页面设置 */
	page{height: 100%;}/* 区域滚动限制 */
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		.swiper-box {
			flex: 1;
			.item-scroll-view {
				height: 100%;
			}
		}
	}
	
	/* 搜索区域 */
	.search-area {
		.placeholder-style{color:rgba(255,255,255,0.8)}/*微信bug组件内外都要指定*/
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #e32519;
		padding: 0 30rpx 30rpx 30rpx;
		.top-search{
			flex: 1;
			margin-right: 20rpx;
			align-items: center;
			padding: 4rpx;
			background: rgba(255,255,255,0.2);
			border-radius: 72rpx;
			.icon{padding-left: 24rpx;}
			.placeholder-style{color:rgba(255,255,255,0.8)}
			.input {
				padding: 0 30rpx 0 20rpx;
				font-size: 26rpx;
				width: 100%;
				color:#fff;
				height: 36rpx;overflow: hidden;
				line-height: normal;
			}
		}
		.top-scan{
			margin-left: 40rpx;
		}
		.top-user{
			margin-left: 40rpx;
		}
		.top-scan .iconfont,
		.top-user .iconfont {
			font-size: 30px;
			color: #fff;
		}
	}

	/* menu更多按钮*/
	.nav-more{
		display:inline-block;
		padding: 0 30rpx;
		line-height: 100rpx;
		cursor: pointer;
	}
	
	/* 弹窗 */
	.uni-popup {
		z-index: 999;
		top: 0
	}
	/deep/ .uni-popup .uni-transition{height:100%}
	/deep/ .uni-popup__wrapper-box{background: #fff;height: 100%!important;}
	.popup-body{
		.tip{padding-left:40rpx;color:#999;padding-top:40rpx;}
	}
	
	/* 弹窗内列表 */
	.nav-list {
		background: #fff;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		padding:20rpx 20rpx 40rpx 20rpx;

		.nav-list-item {
			box-sizing: border-box;
			flex:  0 0 33.333333%;
			overflow: hidden;
			text-align: center;
			padding: 20rpx 20rpx;

			.label {
				line-height: 90rpx;
				background: #f5f5f5;
				border-radius: 4px;
				padding: 0 20rpx;
			}
			&.active .label{
				background-color:#e32519;
				color:#fff
			}
		}

	}

	/* 轮播图 */
	.swiper-focus .swiper {
		height: 360rpx;
		.swiper-item{
			width: 100%;
			height: 100%;
			 image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
