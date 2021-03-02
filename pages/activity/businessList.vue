<template>
	<view class="page-wrap">
		<!-- 顶部 -->
		<view class="flex">
			<cu-custom style="background:transparent; color:#fff;" :isBack="true">
				<!-- <block></block> -->
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
					<view class="flex-treble tetile">
						信用<view class="add text-bold text-xl">+</view>{{type}}
					</view>
				</view>
			<view class="text-blue margin-top fontsize">{{show}}</view>
			<!-- 列表 -->
			<com-mescroll-page v-show="showResult" height="auto" ref="mescrollRef" :bottombar="false" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="cu-card shadow article" :class="isCard?'no-card':''" v-for="(item,index) in busarr" :key="index" @click="gotoList(index)">
					<view class="cu-item ">
						<view class="content">
							<image :src="item.logo_img" class="border"></image>
							<view class="desc">
								<view class="padtop text-black text-bold uni-commit">{{item.unit_name}}</view>
								<view class="padtop">联系人:&nbsp;{{item.representative}}</view>
								<view class="padtop">统一社会信用代码:</view>
								<view class="padtop">{{item.credit_code}}</view>
							</view>
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
				id:"",
				type:"",
				show:"",
				isCard: false,
				busarr:[],
				showResult:true,
				page:1,
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
			};
		},
		async onLoad(options){
			this.id = options.id
			await this.getworkInfo();
			if(options.index == 1){
				this.type = "餐饮";
				this.show = "联合餐饮商家，项信用状况良好的守信主题提供更加优惠的消费途径、更加优质的就餐服务、让守信行为在消费中便发“有价”"
			}
			if(options.index == 6){
				this.type = "医疗";
				this.show = "联合医院，向信用状况良好的守信主体提供更加优惠便利的医疗项目，为守信市民的就医需求提供绿色通道或优惠。"
			}
			if(options.index == 5){
				this.type = "健身";
				this.show = "联合健身场所，向信用状况良好的守信主体提供更加优惠便利的消费体验，守信使生活更加丰富多彩。"
			}
			if(options.index == 4){
				this.type = "文化";
				this.show = "联合济南市图书馆、博物馆，向信用状况良好的守信主体提供免押金借书等便利优惠服务，守信使生活更加丰富多彩。"
			}
			if(options.index == 2){
				this.type = "养老";
				this.show = "联合养老机构，向信用状况良好的守信主体提供更加优惠的入住价格及附加服务，为守信老人搭建温馨港湾。"
			}
			if(options.index == 11){
				this.type = "汽车";
				this.show = "联合租赁公司与汽修厂，向信用状况良好的守信主体提供更加优惠便利的消费体验，守信使生活更加丰富多彩"
			}
			if(options.index == 7){
				this.type = "教育";
				this.show = "联合教育机构，向信用状况良好的守信主体提供更加优惠便利的消费体验，守信使生活更加丰富多彩。"
			}
			if(options.index == 3){
				this.type = "家政";
				this.show = "联合家政服务企业，向信用状况良好的守信主体提供更加优惠便利的消费体验，守信使生活更加丰富多彩"
			}
			if(options.index == 10){
				this.type = "旅游";
				this.show = "联合旅行社，向信用状况良好的守信主体提供更加优惠便利的消费体验，守信使生活更加丰富多彩。"
			}
			if(options.index == 9){
				this.type = "住宿";
				this.show = "联合酒店，向信用状况良好的守信主体提供更加优惠便利的消费体验，守信使生活更加丰富多彩。"
			}
		},
		methods: {
			async getworkInfo(){
				const {data:res} = await this.$http({
					url:'/xyj.xyjVendList.phtml',
					data: {
						viewId:"json",
						page:this.page,
						def_domain:this.id,
						status:2
					}
				});
				this.busarr = res.rows
				console.log(res.rows)
				for (let i = 0; i < res.rows.length; i++) {
					res.rows[i].logo_img = this.$baseUrl + res.rows[i].logo_img
				}
			},
			navTo(url){
				uni.navigateTo({
					url
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
				console.log(page)
				if(page.num==1){
					this.busarr=[]
				}
				for (let i = 0; i < res.rows.length; i++) {
					res.rows[i].logo_img = this.$baseUrl + res.rows[i].logo_img
				}
				this.busarr=this.busarr.concat(res.rows)
				this.mescroll.endBySize(res.rows.length, res.records)
			},
			gotoList(index){
				uni.navigateTo({
					url: "/pages/activity/businessDetail?id="+this.busarr[index].id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .cu-bar .action:first-child{
		margin-top: 32rpx;
		font-size: 32rpx;
	}
	/deep/ .cuIcon-back:before{
		font-size: 40rpx;
		// color: #fff;
	}
	/deep/ .cu-bar.fixed, .nav.fixed{
		position: static;
	}
	 page{
		background: url(/static/image/activity/banner.png) no-repeat;
		background-size: 100%;
	}
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
		.placeholder-style{color:rgba(0,0,0,0.5)}
		align-items: center;
		padding: 30rpx 30rpx 0;
		position: absolute;
		top: -5rpx;
		left: 16%;
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
			font-weight: 500;
			margin-left: 9px;
			color: #2f74e7;
			font-size: 16px;
		}
		.text{
			margin-top: 10px;
			color: #6ea3d9;
			font-size: 28rpx;
			line-height: 40rpx;
		}
		.add{
			display: inline-block;
			font-weight: 700;
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
	image{
		border: 1px solid #ccc;
	}
	.fontsize{
		color: #347ab6;
		font-size: 26rpx;
	}
	.cu-card{
		margin-top: 40rpx;
	}
</style>