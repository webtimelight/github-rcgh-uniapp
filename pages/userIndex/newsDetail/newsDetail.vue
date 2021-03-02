<template>
	<view>
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">{{title}}</block>
		</cu-custom>
		<!-- 详情骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail"></com-quick-skeleton>
		<!-- 文章 -->
		<view class="artical-area" >
			<view class="tit">{{detaiData.news_title}}</view>
			<view class="ext">
				<text class="time">发布时间：{{detaiData.view_time}}</text>
				<text class="read">浏览：{{detaiData.curpagenum}}</text>
			</view>
			<view class="con">
				<rich-text :nodes="newsBody"></rich-text>
			</view>
			<uni-view  class="mescroll-upwarp">-- 我是有底线的--</uni-view>
		</view>
		<!-- 返回顶部 -->
		<com-back-top :src="backTop.src" :scrollTop="backTop.scrollTop"></com-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skeletonShow:true,
				newsUrl:'',
				title:'',
				detaiData:{},
				//回到顶部
				backTop: {
					src: '/static/image/top.png',
					scrollTop: 0
				},
				
			}
		},
		
		onLoad(options) {
			let str=JSON.parse(decodeURIComponent(options.html_url));
			this.newsUrl=str.replace(/.detail/g,'.jdetail');
			this.getDetail();
			this.title=options.block_name;
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
		},
		
		computed:{
			newsBody(){//给内容里的图片加域名
				let str=this.detaiData.newscontent+''
				let reg=new RegExp('src=\"',"g");
				return str.replace(reg,`class="pho" src=\"${this.$baseUrl}`)
			}
		},
		methods: {
			async getDetail(){
				const {data:res}=await this.$http({url:this.newsUrl});						
				console.log(res);		
				this.detaiData=res;
				this.skeletonShow=false
			}
		}
	}
</script>

<style lang="scss">
	.artical-area{
		background: #fff;
		height: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		.tit{
			flex: none;
			line-height:1.6;
			font-weight: bold;
			font-size: 42rpx;
			text-align: center;
			margin:0 0 10px;
			min-height: 50rpx;
		}
		.ext{
			flex: none;
			text-align: center;
			position: relative;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			color:#666;
			&:after{
				content: '';
				position: absolute;
				left:0;right:0;bottom:0;height:1px;
				background:#eee;
				transform: scaleY(0.5);
			}
			.time{padding: 0 15rpx;}
			.read{padding: 0 15rpx;}
		}
		.con{
			flex: 1;
			 /deep/ .pho{
				 max-width: 100%;
				 display: block;
				 margin: 0 auto;
				 }
			/deep/ p{
				font-size: 30rpx!important;
			}	 
		}
	}
	.mescroll-upwarp{
	box-sizing: border-box;
    min-height: 55px;
    padding: 15px 0;
    text-align: center;
    clear: both;
	color:gray;
	}
</style>

