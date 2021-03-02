<template>
	<view class="page-wrap">
		<!-- 顶部 -->
		<view class="flex">
			<cu-custom :isBack="true">
				<block></block>
			</cu-custom>
			<!-- <view class="search-area">
				<view class="top-search flex">
					<input class="input" placeholder="请输入商品关键字" placeholder-class="placeholder-style" @click="navTo('/pages/activity/goodsSearch/goodsSearch')"/>
					<uni-icons color="#bbb" class="icon" size="18" type="search" />
				</view>
			</view> -->
		</view>
		<!-- center -->
		<view class="centerTop">
			<view class="flex align-center">
				<view class="line"></view>
				<view class="text-black text-bold margin-left tetile">信用+金融</view>
			</view>
			<!-- 列表 -->
			<com-mescroll-page v-show="showResult" height="auto" ref="mescrollRef" :bottombar="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">	
				<view @click="golist()" v-for="(item,index) in busarr" :key="index">
					<view class="cu-card bg-red article shadow shadow-lg text-black" :class="isCard?'no-card':''" >
						<view class="cu-item shadow">
							<view class="content flex solid-bottom padding align-center justify-between margin-bottom">
								<!-- <image src="/static/image/activity/bjback.png"></image> -->
								<!-- <view class="text-xl">{{item.back}}</view> -->
								<image :src="item.logo_img"></image>
								<view class="text-xl uni-commit" >{{item.unit_name}}</view>
							</view>
							<view class="text-bl margin-top padding-left">立即查看详情</view>
						</view>
					</view>
				</view>
				
				
			</com-mescroll-page>
		</view>
	</view>
	
	
</template>

<script>
	import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				isCard: false,
				showResult:true,
				id:"",
				page:1,
				busarr:[{
					back:"北京银行济南分行"
				},],
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
				},
				
			};
		},
		async onLoad(options){
			await this.getinfo()
			this.id = options.id
		},
		methods: {
			async getinfo(){
				const{data:res} = await this.$http({
					url:'/xyj.xyjVendList.phtml',
					data: {
						viewId:"json",
						page:this.page,
						// def_domain:"bf451a6f0420414db9f3c25624ea3388",
						def_domain:this.id,
						status:2
					}
				})
				console.log((res))
				for (let i = 0; i < res.rows.length; i++) {
					res.rows[i].logo_img = this.$baseUrl + res.rows[i].logo_img
				}
				this.busarr = res.rows
			},
			/* 页面跳转 */
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			golist(){
				uni.navigateTo({
					url: "/pages/activity/bankDetail"
				})
			},
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				const {data:res}=await this.$http({
					url:`/xyj.xyjVendList.phtml`,
					data:{
						viewId:"json",
						page:page.num,
						def_domain:this.id,
						status:2
					}
				})
				if(page.num==1){
					this.busarr=[]
				}
				for (let i = 0; i < res.rows.length; i++) {
					res.rows[i].logo_img = this.$baseUrl + res.rows[i].logo_img
				}
				this.busarr=this.busarr.concat(res.rows)
				this.mescroll.endBySize(res.rows.length, res.records)
			},
		}
		
	};
</script>


<style lang="scss" scoped>
/deep/ .cu-bar .action:first-child{
	margin-top: 32rpx;
	font-size: 32rpx;
}
/deep/ .cuIcon-back:before{
	font-size: 40rpx;
	color: #fff;
}
/deep/ .cu-bar.fixed, .nav.fixed{
	position: static;
}
	 page{
		background: url(/static/image/activity/banner.png) no-repeat;
		background-size: 100%;
	}
// uni-page-body{
// 	height: 300rpx;
// 	background: url(/static/image/activity/xyjjr_banner.jpg) no-repeat;
// 	background-size: 100%;
// }
.uni-commit{
  width:400rpx;
  white-space:nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.top-search{
	background-color: #fff;
}
.search{
	width: 100%!important;
}
.shadow{
	box-shadow: 0 0 25px 0 rgba(0,0,0,0.13);
	overflow: hidden;
    background: #fff;
    border-radius: 6px;
}
.search-area {
		width: 67%;
		.placeholder-style{color:rgba(0,0,0,0.5)}/*微信bug组件内外都要指定*/
		align-items: center;
		padding: 30rpx 30rpx 0;
		position: absolute;
		top: -5rpx;
		left: 17%;
		.top-search{
			flex: 1;
			align-items: center;
			padding:0rpx 16rpx;
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
	.centerTop{
		margin-top: 38%;
		padding: 0 30rpx;
		.line{
			background-color: #f7b242;
			width: 15rpx;
			height: 40rpx;
			
		}
		.tetile{
			color: #2f74e7;
		}
		.text{
			margin-top: 10px;
			color: #6ea3d9;
			font-size: 28rpx;
			line-height: 40rpx;
		}
	}
	.cu-card>.cu-item{
		margin: 16rpx 0;
		padding: 20rpx 0;
	}
	.padtop{
		line-height: 48rpx;
		font-size: 28rpx;
	}
	.text-blue, .line-blue, .lines-blue{
		margin-top: 12rpx;
		line-height: 40rpx;
	}
	.cu-card.article>.cu-item .content{
		padding-bottom: 30rpx;
	}
	.cu-card.article>.cu-item .content>uni-image{
		width: 76px;
    	height: 5.4em;
    	margin-right: 10px;
    	-webkit-border-radius: 3px;
    	border-radius: 3px;
	}
	.cu-card > .cu-item[data-v-12b6c15e]{
		margin-bottom: 0;
		margin: 4px 0 0 0;
	}
	.bg-red{
		background-color: #e54d42;
		border-radius: 8px;
    	// background-color: #cb362b;
		margin:30rpx 0;
	}
	// .topred{

	// }
	.solid-bottom::after{
		margin: 20rpx 8rpx;
		border-bottom: 2rpx dashed rgba(0, 0, 0, 0.1);
	}
	.cu-card.article > .cu-item .content > uni-image[data-v-12b6c15e]{
		width: 120rpx;
		height: 120rpx;

	}
</style>
