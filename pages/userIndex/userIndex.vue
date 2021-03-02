<template>
<view>
	<view class="top-box">
		<view class="tit">职工信用信息服务平台（荣成）</view>
		<view class="top-user" @click="navTo('/pages/userCenter/index')"><text class="lg text-white cuIcon-people"></text></view>
	</view>
	<!--新闻图片轮播 -->
<view class="uni-margin-wrap mt45">	
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"  indicator-color="rgba(255,255,255,0.4)" indicator-active-color="rgba(255,126,0,0.8)">
				<swiper-item v-for="(v,i) in imgNews" :key="i" @click="goDetail(v)">
					<view class="swiper-item">
						<image :src="v.newsimgpath" ></image>	
					<!-- <view class="imgTtile uni-media-list-text-top text-cut">	
						{{v.news_title}}
					</view>			          -->
					</view>
				</swiper-item>
			
			</swiper>
		</view>
		<!-- 首页图标 -->
		<view class="padding-bottom-xs margin-top">
			<view class="cu-list grid radius-top col-3 padding-top-sm no-border">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="navTo(item.href)">
					<view><image class="uImg" :src="item.imgSrc" /></view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 新闻列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue"></text> 新闻报道
				</view>
			</view>
			<view class="cu-list menu-avatar list-bottom">
				<view class="cu-item" v-for="(list,index) in newsData" :key="index" @click="goDetail(list)">					
					<view class="content" >						
						<view class="text-gray text-sm flex">
							<view class="text-cut">							
								{{list.news_title}}
							</view> </view>
							<view class="uni-media-list-text-bottom"><text class="cuIcon-timefill text-grey "></text><text class="text-grey">发布时间：{{list.news_time}}</text><text class="cuIcon-profilefill text-grey ml20"></text><text class="text-grey">发布人：工会</text></view>
					</view>
				
				</view>
			</view>
	
		</view>


</template>

<script>
	export default {
		data() {
			return {			    
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				imgNews:[],
				newsData:[],
				cuIconList: [{
					name: '查看信用分',
					imgSrc: '../../static/image/userIndexIcon01.png',
					href: '/pages/activity/creditscore/index'
				}, {
					name: '查看信用报告',
					imgSrc: '../../static/image/userIndexIcon02.png',
					href: '/pages/activity/creditscore/card'
				}, {
					name: '活动报到',
					imgSrc: '../../static/image/userIndexIcon03.png',
					href: '/pages/activity/activityList'
				},{
					name: '信用记录上报',
					imgSrc: '../../static/image/userIndexIcon04.png',
					href: '/pages/activity/creditscore/scorecredit'
				}, {
					name: '我有话说',
					imgSrc: '../../static/image/userIndexIcon05.png',
					href: '/pages/infoswap/infoswapIndex'
				}, {
					name: '更多',
					imgSrc: '../../static/image/userIndexIcon06.png',
					href: ''
				}
				],
				
				userInfo:'',
				perfect:null,
				mem_name:''
				
			};
		},
methods: {
// 普通跳转
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			async getNews(){
				const {data:res} = await this.$http({url:`/17.news.jlist.phtml`});				
				for(var i=0;i<res.results.length;i++){  
					 console.log(res.results[i].newsimgpath);
				  res.results[i].newsimgpath = this.$baseUrl + res.results[i].newsimgpath;
				  
                }
				this.imgNews = res.results
			},
			async getNewsList(){
				const {data:res} = await this.$http({url:`/3.news.jlist.phtml`});	
				var tzggNum = res.results.length <= 5 ? res.results.length : 5;				
				for (var i = 0; i < tzggNum; i++) {
						this.newsData.push(res.results[i]);
                    }                
				
			},
			//页面跳转-新闻详情
		goDetail(e){
			    
				uni.navigateTo({
					url:`/pages/userIndex/newsDetail/newsDetail?block_name=${e.block_name}&block_id=${e.block_id}&html_url=`+encodeURIComponent(JSON.stringify(e.html_url))
				})
			}

	  },
onLoad() {
			this.getNews(),
			this.getNewsList()
		}

		
	}
</script>

<style lang="scss">
.top-box{
    position: fixed;
    width: 100%;
    top: 0;	
	background-image: linear-gradient(45deg, #8049fb, #4b77fc)!important;
    color: #ffffff;
	height: 45px;
	line-height:45px;
	text-align:center;
	z-index: 999;
}
.top-box .tit{
	line-height: 45px;
	font-size:16px;
}
.mt45{
	margin-top:45px;
}
		.uImg{
		width: 120rpx; height: 120rpx;
	}
	.swiper {
		height:400rpx;
	}
	.swiper-item {
		display: block;
		height:400rpx;		
		text-align: center;
		position: relative;
	}
	.imgTtile{
		position: absolute;
		height:36px;
		line-height: 36px;
		bottom: 0;
		left:0;
		width: 100%;
		background:#1c7efe;
		color:#fff;
		padding:0 12px;
		
	}
	uni-swiper .uni-swiper-dots-horizontal{
		right:50px!important;
	}
	.top-user{
		position: absolute;
		top:0;
		right:12px;
		z-index: 999;
	}
	.top-user .cuIcon-people{
		font-size:24px;
	}
	.cu-list.menu-avatar>.cu-item .content{
		left:16px;
	}
	.text-gray, .line-gray, .lines-gray{
		color:#333;
	}
	.cu-list.menu-avatar > .cu-item .content{
		width:100%;
	}
	.cu-list.menu-avatar>.cu-item .flex .text-cut{
		max-width: 350px;
	}
	
	.ml20{
		margin-left:20px;
	}
	.cu-list.grid>.cu-item uni-text{
		color:#333;
	}
	.cu-bottom .text-gray{
		color:#999;
		font-size: 13px;
	}
	.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after{
		border-bottom:0.5px solid transparent;
	}
	.list-bottom{
		padding-bottom:30px;
	}
	.uni-media-list-text-bottom{
		margin-top:10px;
	}

</style>

