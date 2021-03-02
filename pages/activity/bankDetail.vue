<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-blue" class="bg-blue" :isBack="true">
			<block slot="right"><text @click="goIndex()" class="cuIcon-homefill text-white margin-right-lg"></text></block>
		</cu-custom>
		<!-- 基本信息 -->
		<view class="basic-info padding shadow shadow-lg bg-white">
			<view class="bussName text-center text-xl">北京银行</view>
			<view class="margin-top">1.设立信贷绿色通道，申请后优先、快速进行业务审批；</view>
			<view class="margin-top"> 2.线下贷款利率优惠服务：金融分700分（含）以上借款人，在满足我行贷款条件前提下，原则上可享受同类客户定价标准基础上利率优惠5-15个BP。</view>
			<view class="margin-top">咨询电话：59612345</view>
			<view class="margin-top">以上最终解释权归北京银行济南分行所有</view>
			<view class="margin-top">详情请咨询各营业网点:</view>
			<view class="margin-tb" v-for="(item,index) in banknetz" :key="index">
				<view class=" text-bold">济南分行营业部</view>
				<view class="tel margin-tb-xs" @click="tell(e)">
					<image class="margin-right" src="/static/image/activity/tell.png"></image>
					联系电话：{{item.phone}}
				</view>
				<view class="tel">
					<view @click="goMap(index)">
						<image class="margin-right" src="/static/image/activity/address.png"></image>
						地址：{{item.address}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card.vue";
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCard,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				// skeletonShow: true,
				banknetz: [{
						phone: "18888888888",
						address: "市中区二环南路5266号"
					},
					{
						phone: "18888888888",
						address: "市中区二环南路5266号"
					}
				],
				url:''
			};
		},
		onLoad(options) {},
		methods: {
			tell(e) {
				uni.makePhoneCall({
                    phoneNumber: 'this.banknetz.phone',
					// 成功回调
					success: (res) => {
                        console.log('调用成功!')
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				})
			},
			goMap(index) {
            	this.url = encodeURIComponent(`http://api.map.baidu.com/geocoder?output=html&src=webapp.baidu.openAPIdemo&address=`+this.banknetz[index].address);
				console.log(this.url);
				uni.navigateTo({
					url: "/pages/activity/map?url="+this.url
				});
			},
					// 去首页
			goIndex(){
				uni.switchTab({ url: '/pages/userIndex/userIndex' })
			},
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: url(/static/image/activity/detailBg.jpg) no-repeat top;
		background-size: 100% auto;
	}

	.basic-info {
		width: 710rpx;
		border-radius: 20rpx;
		margin: 70rpx auto 0;
	}

	.tel image {
		width: 38rpx;
		height: 38rpx;
		vertical-align: middle;
	}
	a{
		color: #666666;
		text-decoration: none;
	}
</style>
