<template>
	<view>
		<!-- topBar -->
		<cu-custom  style="background:transparent; color:#fff; z-index:999" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">参与记录</block>
		</cu-custom>
		<!-- 背景色 -->
		<view class="bg-white topBg"></view>
		<!-- 背景图片 -->
		<image class="recordTopImg" src="../../../static/image/recordTopImg.png"></image>
		<!-- Tab切换 已评价 未评价 -->
		<view class="padding padding-bottom-xs padding-top-xs topTab" >
			<view class="cu-list grid col-2 padding-top-lg rsh" >
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="tab(index)">
					<view>
						<image v-if="active==index" class="uImg" :src="item.imgSrc" />
						<image v-else class="uImg" :src="item.imgSrcGrey" />
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block>{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 列表数据 -->
		<com-mescroll-page ref="mescrollRef" height="auto" :top="250" :fixed="true" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="cu-card article">
				<view class="cu-item shadow rsh relative padding-top-sm" v-for="(v,i) in dataList" :key="i">
					<view class="tlline"></view>
					<button class="cu-btn bg-orange round trTag" @click="goComment(v.id,v.is_comment)">
						{{v.is_comment=='0'?'进行':'查看'}}评价
					</button>
					<view class="title" @click="navTo('/pages/userCenter/joinRecord/recordDetail?id='+v.id)">
						<view class="text-blue">{{v.incentive_name!=''?v.incentive_name:'.'}}</view>
					</view>
					<view class="padding-left text-grey">{{v.inv_time}}</view>
				</view>
			</view>
		</com-mescroll-page>
		<!--
		<view class="cu-card article" v-show="active == 0">
			<view class="cu-item shadow rsh relative padding-top-sm">
				<view class="tlline"></view>
				<button class="cu-btn bg-orange round trTag" @click="navTo('/pages/userCenter/joinRecord/comment')">查看评价</button>
				<view class="title">
					<view class="text-blue">济南市全民健身中心</view>
				</view>
				<view class="padding-left">2020-07-09 18:38:09</view>
			</view>
		</view>
		<view class="cu-card article" v-show="active == 1">
			<view class="cu-item shadow rsh relative padding-top-sm">
				<view class="tlline"></view>
				<button class="cu-btn bg-orange round trTag" @click="navTo('/pages/userCenter/joinRecord/comment')">进行评价</button>
				<view class="title">
					<view class="text-blue">济南市全民健身中心</view>
				</view>
				<view class="padding-left">2020-07-09 18:38:09</view>
			</view>
		</view>
		-->
	</view>
</template>

<script>
	import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				active : 0,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					badge: null,
					imgSrc: '../../../static/image/user/joinIcon01.png',
					imgSrcGrey: '../../../static/image/user/joinIcon02.png',
					name: '已评价',
					is_comment:1
				}, {
					cuIcon: 'recordfill',
					imgSrc: '../../../static/image//user/joinIcon03.png',
					imgSrcGrey: '../../../static/image/user/joinIcon04.png',
					badge: null,
					name: '未评价',
					is_comment:0
				}],
				dataList:[],
				// 下拉刷新配置
				downOption:{
					auto:true,//默认true
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: true,//默认true
					page: {
						size: 10 // 每页数据,默认10
					},
					noMoreSize: 6, // 列表总数大于等于n条才显示'-- END --'
					textNoMore:'-- 我是有底线的--',
					empty: {
						// icon:'/static/image/nodata.png',
						tip: '抱歉，暂无参与记录'
					}
				}
			}
		},
		methods: {
			// 已评价 未评价切换
			tab(index){
				this.active = index
				this.downCallback()
			},
			// 链接
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			goComment(id,is_comment){
				if (is_comment=='0') {
					uni.navigateTo({
						url:'/pages/userCenter/joinRecord/comment?id='+id
					})
				}else{
					uni.navigateTo({
						url:'/pages/userCenter/joinRecord/showComment?id='+id
					})
				}
			},
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				console.log('page---' + page.num);
				console.log(this.cuIconList[this.active].is_comment);
				const {data:res}=await this.$http({
					url:`/xyj.xyjIncentiveRecordListMobile.phtml`,
					data:{'page':page.num,'is_comment':this.cuIconList[this.active].is_comment}
				})
				console.log(res.recordList);
				if(page.num==1){
					this.dataList=[]
				}
				this.dataList=this.dataList.concat(res.recordList)
				this.mescroll.endBySize(res.recordList.length, res.page.totalnum)
			},
			// 获取右上角标数量
			async getBadge(index){
				// 获取已评价数量
				const {data:badge}=await this.$http({
					url:`/xyj.xyjIncentiveRecordListMobile.phtml`,
					data:{'page':1,'is_comment':index}
				})
				return badge.page.totalnum
			}
		},
		async onLoad() {
			let user =  this.$checkLogin('/pages/userCenter/joinRecord/joinRecord',1); // 页面加载时验证登录
			if(!user) return
			this.cuIconList[1].badge = await this.getBadge(0)
			this.cuIconList[0].badge = await this.getBadge(1)
		}
	}
</script>

<style scoped>
	page{
		background: #fff;
	}
	.recordTopImg{
		position: fixed; width: 750rpx; height: 228rpx; top: 0; left: 0; z-index: 98;
	}
	.topBg{
		position: fixed; left: 0; right: 0; top: 0; height: 350rpx; z-index: 97; background-color: #fff;
	}
	.topTab{
		position: fixed; left: 0; right: 0; top: 100rpx; z-index: 999;
	}
	.tlline{
		background: #fdcb53;width: 5px; position: absolute;top: 0;left: 0; border-top-left-radius: 8px;border-bottom-left-radius: 8px; bottom:0
	}
	.trTag{
		position: absolute; top: 35rpx; right: 30rpx;
	}
	.uImg{
		width: 70rpx; height: 70rpx; display: block; margin: 0 auto;
	}
	.rsh{
		border-radius:20rpx; box-shadow: 0px 4px 15px 0 rgba(181, 179, 177, 0.35)
	}
	.border-top{
		border-top:1px #eee solid; margin-top:35rpx; padding-top:35rpx;
	}
</style>
