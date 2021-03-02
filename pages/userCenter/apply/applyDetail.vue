<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">申报详情</block>
		</cu-custom>
		<!-- "attribute": "redcodeid",信息属性（redcodeid是守信，blackcodeid是失信）
				"category": "新时代文明实践/志愿服务",指标类别
				"collection_time": "2020-12-18 20:54:37",上报时间
				"describes": "597959",
				"enclosure_path": "",证明材料路径（多个图片）
		"end_time": "2020-12-18",事件到期日期
				"identitycard": "370102199905143712",身份证号
				"name": "王洪光",姓名
				"reviewer_opinion": "",'审核意见',
				"reviewer_state": "0",状态：0：未审核，1：审核通过，2：审核驳回
				"reviewer_time": "",审核时间
				"start_time": "2020-12-18",事件发生日期
				"submit_time": "2020-12-18 20:54:37", 提交时间
		"submit_type": "2",提交方式：0：企业单条提交；1：企业批量提交；2：个人申报
		"target_name": "参加公司组织的志愿服务等活动，每累计达到2小时的加1分，每次最高加2分", -->

		<view class="cu-card article">
			<view class="cu-item shadow rsh relative padding-top-sm text-grey">
				<view class="title ">
					<view class="text-cut padding-left-xs">
						{{info.category}}
					</view>
				</view>
				<!-- <view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">姓名</view>
					<view class="flex-twice padding-right-lg">{{info.name}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">身份证号：</view>
					<view class="flex-twice padding-right-lg">{{info.identitycard}}</view>
				</view> -->
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">上报时间：</view>
					<view class="flex-twice padding-right-lg">{{info.collection_time}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">提交方式：</view>
					<view class="flex-twice padding-right-lg">{{info.submit_type=='2'?'个人申报':'企业申报'}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg"><nobr>事件发生日期：</nobr></view>
					<view class="flex-twice padding-right-lg">{{info.start_time}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg"><nobr>事件到期日期：</nobr></view>
					<view class="flex-twice padding-right-lg">{{info.end_time}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">信息属性：</view>
					<view class="flex-twice padding-right-lg">{{info.attribute=='redcodeid'?'守信信息':'失信信息'}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">指标名称：</view>
					<view class="flex-twice padding-right-lg">{{info.target_name}}</view>
				</view>
				<!-- <view class="flex p-xs padding-top-sm" v-if="info.quantification_value">
					<view class="flex-sub padding-left-lg">取得成绩：</view>
					<view class="flex-twice padding-right-lg">{{info.quantification_value}}</view>
				</view> -->
				<!-- <view class="flex p-xs padding-top-sm" v-if="info.quantification">
					<view class="flex-sub padding-left-lg">完成量：</view>
					<view class="flex-twice padding-right-lg">{{info.quantification}}</view> -->
					<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">证明材料：</view>
					<view class="flex-twice padding-right-lg">
						<block v-if="info.enclosure_path.length">
							<image v-for="(imgItem,imgIndex) in info.enclosure_path" :key="imgIndex" @tap="ViewImage" :data-url="imgItem" :src="imgItem" class="radius margin-right-sm zmPic"></image>
						</block>
						<text v-else>暂无</text>
					</view>
				</view>
				
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">审核状态：</view>
					<view v-if="info.reviewer_state=='0'" class="flex-twice text-orange padding-right-lg">未审核</view>
					<view v-else-if="info.reviewer_state=='1'" class="flex-twice text-green padding-right-lg">审核通过</view>
					<view v-else class="flex-twice text-red padding-right-lg">审核驳回</view>
				</view>
				<block v-if="info.reviewer_state!='0'">
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">审核意见：</view>
						<view class="flex-twice padding-right-lg">{{info.reviewer_opinion==''?'暂无':info.reviewer_opinion}}</view>
					</view>
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">审核时间：</view>
						<view class="flex-twice padding-right-lg">{{info.reviewer_time}}</view>
					</view>
				</block>
				</view>
				
				
			</view>
		</view>

</template>

<script>
	export default {
		data() {
			return {
				info:''
			}
		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: this.info.enclosure_path,
					current:e.currentTarget.dataset.url
				});
			},
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			this.info.identitycard=this.info.identitycard.replace(/^(.{6})(?:\d+)(.{4})$/,"$1********$2")
			this.info.enclosure_path = this.info.enclosure_path.split(',')
			if (this.info.enclosure_path.length == 1 && this.info.enclosure_path[0]=='') this.info.enclosure_path=[]
			this.info.enclosure_path=this.info.enclosure_path.map(item=>{
				return this.$baseUrl+item
			})
        }
	}
</script>

<style>
	.zmPic{
		width: 80rpx; height: 80rpx;
	}
</style>
