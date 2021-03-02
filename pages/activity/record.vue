<template>
	<view>
		<view>
			<view class="name text-bold text-xxl padding">山东凯瑞商业集团有限责任公司</view>
			<view class="flex align-center padding-lr">
				<image class="icon" src="/static/image/activity/icon-fill.png"></image>
				<text class="padding-xs">统一社会信用代码：913701003069699818</text>
			</view>
			<view class="flex align-center padding-lr">
				<image class="icon" src="/static/image/activity/icon-man.png"></image>
				<text class="padding-xs">法定代表人：赵效国</text>
			</view>
		</view>
		<!-- tab -->
		<view class="position margin-top">
			<view class="left-arr arrows" @click.stop="leftImg">
				<image src="/static/image/activity/arr-left.png"></image>
			</view>
			<swiper class="tabbar text-center" :current="curDot" @change="swiperChange" display-multiple-items="2" previous-margin="100rpx" next-margin="100rpx">
				<swiper-item v-for="(tabItem, index) in tabbar" :key="index" :class="selected == index ? 'selected' : ''" @tap="changeTabs(index)">
					<text class="tab-name padding-tb">{{ tabItem.name }}</text>
					<text class="text-red padding-lr">{{ tabItem.num }}</text>
				</swiper-item>
			</swiper>
			<view class="right-arr arrows" @click.stop="rightImg">
				<image src="/static/image/activity/arr-right.png"></image>
			</view>
		</view>
		<!-- 档案信息 -->
		<view class="padding">
			<!-- 基础信息 -->
			<view class="swiper-item" :class="{dis:currentVal == 0}">
				<view class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">工商登记信息</text>
					</view>
					<view><text class="text-bold">统一社会信用代码：</text>913701003069699818</view>
					<view><text class="text-bold">企业名称：</text>山东凯瑞商业集团有限责任公司</view>
					<view><text class="text-bold">类型：</text>有限责任公司(自然人投资或控股)</view>
					<view><text class="text-bold">法定代表人：</text>赵孝国</view>
					<view><text class="text-bold">注册资本：</text>5010.000000</view>
					<view><text class="text-bold">成立日期：</text>2015/04/08</view>
					<view><text class="text-bold">营业期限自：</text>2015/04/08</view>
					<view><text class="text-bold">营业期限至：</text>2015/04/08</view>
					<view><text class="text-bold">核准日期：</text>2015/04/08</view>
					<view><text class="text-bold">企业状态：</text>营业</view>
					<view><text class="text-bold">地址：</text>济南市市中区二环南路5266号</view>
					<view><text class="text-bold">经营范围：</text>酒店管理咨询；建筑装饰装修工程专业承包、园林绿化工程、房地产开发及经营、物业管理（以上凭资质证经营）；企业形象策划；国内广告业务；会议会展服务；礼仪庆典服务；文化艺术交流活动策划；批发、零售：预包装食品（凭许可证经营）、酒店用品、工艺品；商业运营管理。（依法须经批准的项目，经相关部门批准后方可开展经营活动）</view>

				</view>
				<view class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">股东信息</text>
					</view>
					<view class="text-center">暂不公开！</view>
				</view>
				<view class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">企业年报信息</text>
						<text class="bg-orange padding-lr margin-left-xs">5</text>
					</view>
					<table border="0" width="100%">
						<tbody class="margin-bottom">
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
						</tbody>
					</table>
					<table border="0" width="100%">
						<tbody class="margin-bottom">
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
			<!-- 行政许可信息 -->
			<view class="swiper-item" :class="{dis:currentVal == 1}">
				<view class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">行政许可信息公示新版</text>
						<text class="bg-orange padding-lr margin-left-xs">5</text>
					</view>
					<table border="0" width="100%">
						<tbody class="margin-bottom">
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
			<!-- 行政处罚信息 -->
			<view class="swiper-item" :class="{dis:currentVal == 2}">
				<view v-if="isShow" class="margin-top text-center">平台暂未收录该单位的相关信息。</view>
				<view v-else class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">行政许可信息公示新版</text>
						<text class="bg-orange padding-lr margin-left-xs">5</text>
					</view>
					<table border="0" width="100%">
						<tbody class="margin-bottom">
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
			<!-- 良好信息 -->
			<view class="swiper-item" :class="{dis:currentVal == 3}">
				<view v-if="isShow" class="margin-top text-center">平台暂未收录该单位的相关信息。</view>
				<view v-else class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">行政许可信息公示新版</text>
						<text class="bg-orange padding-lr margin-left-xs">5</text>
					</view>
					<table border="0" width="100%">
						<tbody class="margin-bottom">
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
			<!-- 失信信息 -->
			<view class="swiper-item" :class="{dis:currentVal == 4}">
				<view v-if="isShow" class="margin-top text-center">平台暂未收录该单位的相关信息。</view>
				<view v-else class="swiper-content">
					<view class="action padding-tb">
						<text class="cuIcon-titles text-orange"></text>
						<text class="text-sm text-bold">行政许可信息公示新版</text>
						<text class="bg-orange padding-lr margin-left-xs">5</text>
					</view>
					<table border="0" width="100%">
						<tbody class="margin-bottom">
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
							<tr>
								<td>企业名称</td>
								<td>山东凯瑞商业集团有限责任公司</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>913701003069699818</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				duration: 500,
				// 控制tab内容的显示
				currentVal: 0,
				// 顶部tabs显示状态
				selected: 0,
				id:"",
				isShow:true,
				// tab列表
				tabbar: [{
						name: "基础信息",
						num: "3",
					},
					{
						name: "行政许可信息",
						num: "1",
					},
					{
						name: "行政处罚信息",
						num: "0",
					},
					{
						name: "良好信息",
						num: "0",
					},
					{
						name: "失信信息",
						num: "0",
					},
				],
				curDot: 0
			};

		},
		onLoad(options) {
			this.id=options.id;
		},
		methods: {
			change(e) {
				this.count = e
				this.btnnum = e
				console.log(this.count)
			},
			// 菜单切换
			tapNav(e) {
				this.currentNav = e;
			},
			// 点击顶部tabs触发该函数
			changeTabs(e) {
				this.currentVal = e;
				this.selected = e;
			},
			// swiper切换此函数被监听
			// swiperChange(e) {
			// 	this.selected = e.detail.current;
			// },

			swiperChange(e) {
				this.curDot = e.detail.current;
			},
			leftImg() {
				let num = this.tabbar.length - 1
				if (this.curDot <= 0) {
					// this.curDot = num
				} else {
					this.curDot-=2
				}
			},
			rightImg() {
				let num = this.tabbar.length - 1
				if (this.curDot >= num) {
					// this.curDot = 0
				} else {
					this.curDot+=2;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btna {
		color: #FFFFFF;
		background: #00A0FF;
	}

	.swiper-item {
		display: none;
	}

	.dis {
		display: block;
	}

	page {
		background: white;
	}

	.icon {
		width: 40rpx;
		height: 40rpx;
	}

	.position {
		position: relative;
		border-bottom: 1rpx solid #E7E6E3;
	}

	.left-arr {
		width: 100rpx;
		height: 100%;
		background: #f9f9f9;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.right-arr {
		width: 100rpx;
		height: 100%;
		background: #f9f9f9;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 999;
	}

	.arrows image {
		width: 60rpx;
		height: 60rpx;
		display: block;
		margin: 20rpx auto 0;
	}

	.tabbar {
		height: 100rpx;
		white-space: nowrap;
		background: #f9f9f9;
	}

	.tabItem {
		width: 50%;
		display: inline-block;
	}

	.tab-name {
		height: 100rpx;
		line-height: 84rpx;
	}


	.selected {
		color: rgba(19, 149, 244, 1);
	}


	.selected .tab-name {
		height: 100%;
		border-bottom: 8rpx solid rgba(19, 149, 244, 1);
	}

	.swiper-content {
		padding-bottom: 50rpx;
		border-bottom: 1rpx solid #E7E6E3;
	}

	table {
		border-collapse: collapse;
		margin-bottom: 50rpx;
	}

	table td {
		border: 1px solid#F2F1EF;
		width: 50%;
		padding-left: 10rpx;
	}
</style>
