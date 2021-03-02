<template>
	<view>
		
		<!-- topBar -->
			<cu-custom bgColor="bg-blue" class="bg-blue" :isBack="true">
			<block slot="right"><text  @click="goIndex()" class="cuIcon-homefill text-white margin-right-lg"></text></block>
		</cu-custom>
		
		<!-- 基本信息 -->
		<view class="basic-info padding shadow-blur shadow-lg margin-top">			
			<view class="infoName text-blue text-bold text-xl margin-bottom-xs">{{businessInfo.unit_name}}</view>
			<view class="flex justify-between">
				<view>
					<view class="margin-bottom-xs">联系人：{{businessInfo.pic_name}}</view>
					<view>品牌名：{{businessInfo.brand}}</view>
				</view>
				<view class="solid logo">
					<image :src="businessInfo.logo_img" mode="aspectfill"></image>
				</view>
			</view>

			<view>统一社会信用代码：{{businessInfo.credit_code}}</view>
			<view class="flex">
				<view class="padding-sm padding-lf-none" @tap="showModal" data-target="Image">
					<image class="icon" src="/static/image/activity/icon-license.png"></image>
					<text class="padding-xs">营业执照</text>
				</view>
				<view class="padding-sm" @tap="showModal2" data-target="Image">
					<image class="icon" src="/static/image/activity/icon-jewel.png"></image>
					<text class="padding-xs">承诺书</text>
				</view>
				<view class="padding-sm" @click="goRecord()">
					<image class="icon" src="/static/image/activity/icon-record.png"></image>
					<text class="padding-xs">诚信档案</text>
				</view>
			</view>
		</view>
		<!-- 门店列表 -->
		<view class="padding text-xxl text-black text-bold">商家简介</view>
		<com-mescroll-page ref="mescrollRef" height="auto" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="card padding shadow shadow-lg" id="" v-for="(item,index) in placeList" :key="index">
				<image class="bussImg" :src="goodsSrc(item)"></image>
				<view class="more">
					<view class="content" :class="item.isFload ? 'hide' : 'show'">{{item.description}}</view>
					<view class="text-center text-blue margin" @click="unfold(index)">{{item.isFload ? '查看更多' : '收起'}}</view>
				</view>
				<view class="padding-top solid-top" @click="goDetail(index)">
					<view class="contact flex align-center">
						<image src="/static/image/activity/tell.png"></image>
						<text class="flex-sub padding-lr text-cut">联系电话：{{item.tel}}</text>
						<button class="cu-btn sm bg-pink">使用惠民优惠</button>
					</view>
					<view class="contact flex align-center padding-top">
						<image src="/static/image/activity/address.png"></image>
						<text class="flex-sub padding-lr text-cut">地址：{{item.address}}</text>
					</view>
				</view>
			</view>
		</com-mescroll-page>
		
		<!-- 营业执照弹出层 -->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="height:200px;">
					<image :src="businessInfo.yyzz_img" style="height:200px;"></image>
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">关闭</view>
				</view>
			</view>
		</view>

		<!-- 承诺书弹出层 -->
		<view class="cu-modal" :class="modalName2=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="height:200px;">
					<image :src="businessInfo.cns_img" style="height:200px;"></image>
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal2">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal2">关闭</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				skeletonShow: true,
				businessInfo:{}, //商家信息
				placeList:[], //门店列表
				id:"",
				page:1,
				isFload:true, //折叠面板
				modalName: null, //弹出层
				modalName2: null,
				// 下拉刷新配置
				downOption:{
					auto:false,//默认true
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
						tip: '页面加载失败，请稍后重试'
					}
				}
			};
		},
		onLoad(options) {
			this.id=options.id;
			this.getWorkInfoList();
		},
		computed:{
			goodsSrc(){
				return function(v){
					if(v.picture_url){
						return this.$baseUrl + v.picture_url.split(',')[0]
					}else{
						return '/static/image/imgErr.jpg'
					}
				}
			}
		},
		methods: {
			async getWorkInfoList(){
				const {data:res} = await this.$http({
					url:'/xyj.xyjPlaceListMobile.phtml',
					data: {
						vend_id: this.id,
						page:this.page
					},
					header: {'token': this.$eap_user_token}
				});
				console.log(res);
				this.businessInfo = res.xyjVend;
				this.businessInfo.logo_img=this.$baseUrl + res.xyjVend.logo_img;
				this.businessInfo.cns_img=this.$baseUrl + res.xyjVend.cns_img;
				this.businessInfo.yyzz_img=this.$baseUrl + res.xyjVend.yyzz_img
				this.placeList=this.placeList.concat(res.placeList)
				for(let i=0;i<this.placeList.length;i++){
					this.$set(this.placeList[i],"isFload",true)
				}
			},
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				const {data:res}=await this.$http({
					url:`/xyj.xyjPlaceListMobile.phtml`,
					data:{
						page:page.num,
						vend_id:this.id
					}
				})
				console.log(res);
				if(page.num==1){
					this.placeList=[]
				}
				this.placeList=res.placeList;
				for(let i=0;i<this.placeList.length;i++){
					this.$set(this.placeList[i],"isFload",true)
				}
				this.mescroll.endBySize(res.placeList.length)
			},
			unfold(index) {
				this.current = index;
				this.placeList[index].isFload=!this.placeList[index].isFload;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal2(e) {
				this.modalName2 = e.currentTarget.dataset.target
			},
			hideModal2(e) {
				this.modalName2 = null
			},
			goDetail(i) {
				const item = JSON.stringify(this.placeList[i]);
				uni.navigateTo({
					url: "/pages/activity/detailPages?id="+this.placeList[i].id+"&item="+item+"&Logo="+this.businessInfo.logo_img+"&unit_name="+this.businessInfo.unit_name
				});
			},
			goRecord() {
				uni.navigateTo({
					url: "/pages/activity/record?id="+this.id
				});
			},
				// 去首页
			goIndex(){
				uni.switchTab({ url: '/pages/userIndex/userIndex' })
			},
		}
	};
</script>
<style>
 
</style>

<style lang="scss" scoped>

	page {
		background: url(/static/image/activity/detailBg.jpg) no-repeat top;
		background-size: 100% auto;
	}

	.basic-info {
		width: 710rpx;
		background: url(/static/image/activity/activity-head-sort.png) no-repeat;
		background-size: cover;
		border-radius: 20rpx;
		margin: 70rpx auto 0;
		box-shadow: 0 0 25px 0 rgba(24, 35, 255, 0.16);
	}

	.logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 38rpx;
	}

	.logo image {
		width: 100%;
		height: 100%;
	}

	.padding-lf-none {
		padding-left: 0;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
	}

	.card {
		width: 710rpx;
		margin: 0 auto 30rpx;
		border-radius: 30rpx;
		box-shadow: 0 0 40rpx 0 rgba(150, 167, 161, 0.9);
	}

	.bussImg {
		width: 100%;
		height: 320rpx;
	}

	.card button {
		background: #FEF3F0;
		color: #F28F6D;
		border: 1rpx solid #F28F6D;
	}

	/deep/ .contact image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.fload {
		overflow: hidden;
	}

	.hide {
		display: none;
	}

	.show {
		display: block;
	}
</style>
