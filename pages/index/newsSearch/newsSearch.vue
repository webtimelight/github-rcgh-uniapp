<template>
	<view class="page-search">
		<!-- 搜索区域 -->
		<view class="search-area">
			<com-search-bar history doBack @search="doSearch" @clear="doClear">
			</com-search-bar>
		</view>
		<!-- 搜索结果区域 -->
		<view v-if="showResult" class="result-area">
			<com-no-data v-if="nodata&&resultList.length==0" title="未找到您想要的内容"></com-no-data>
			<scroll-view v-else scroll-y  class="result-list" @scrolltolower="loadMore">
				<com-news-list  :dataList="resultList" @navTo="goDetail"></com-news-list>
				<view class="list-more" v-if="showLoadMore">
					<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodata:false,
				showResult:false,
				page:1,
				totalpage:'',
				resultList:[],
				// 加载更多
				showLoadMore:false,
				isLoading:false,
				status:'loading',
				contentText: {
					contentdown: "查看更多",
					contentrefresh: "加载中",
					contentnomore: "——— 没有更多了 ———"
				}
			}
		},
		methods: {
			async doSearch(e){
				uni.showLoading();
				this.showLoadMore=false;
				this.showResult=true;
				// 状态和数据复位
				this.nodata=false;
				this.page=1;
				this.status="loading";
				this.resultList=[];
				// 数据
				const {data:res}=await this.$http({url:`/news.newsAndGWSearchES.phtml?type=news&keyword=${e.keyWord}&page=1`})
				this.resultList=res.result.newslist;
				this.totalpage=res.result.page.totalpage;
				this.nodata=true;
				uni.hideLoading()
			},
			doClear(){
				this.showResult=false
			},
			//页面跳转-新闻详情
			goDetail(e){
				uni.navigateTo({
					url:`/pages/index/newsDetail/newsDetail?html_url=`+encodeURIComponent(JSON.stringify(e.html_url))
				})
			},
			//scroll-view加载更多
			async loadMore(){
				this.showLoadMore=true;
				if(this.isLoading) return;
				this.page++;//翻页
				if(this.page>this.totalpage){
					return this.status="noMore"
				};
				this.isLoading=true;
				const {data:res}=await this.$http({url:`/news.newsAndGWSearchES.phtml?type=news&keyword=${e.keyWord}&page=${this.page}`})
				setTimeout(()=>{
					this.resultList=[...this.resultList,...res.result.resultList];
					this.isLoading=false;
				},500)
			}
		}
	}
</script>

<style lang="scss">
	page{height: 100%;}
	.page-search{
		height: 100%;
		display: flex;
		flex-direction: column;
		.search-area{
			
		}
		.result-area{
			flex: 1;
			overflow: hidden;
			.result-list{
				height: 100%;
			}
		}
	}
</style>
