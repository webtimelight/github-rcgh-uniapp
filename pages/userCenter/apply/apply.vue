<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">补充申报</block>
			<!-- <block slot="right"><text class="cuIcon-homefill text-white margin-right-lg"></text></block> -->
		</cu-custom>
		<!-- 列表数据 -->
		<!-- 
		--"category": "新时代文明实践/志愿服务",指标类别
		--"submit_type": "2",提交方式：0：企业单条提交；1：企业批量提交；2：个人申报
		--"collection_time": "2020-12-18 20:54:37",上报时间
		--"describes": "597959",

		"enclosure_path": "",证明材料路径（多个图片）

		"end_time": "2020-12-18",事件到期日期
		"start_time": "2020-12-18",事件发生日期
		"submit_time": "2020-12-18 20:54:37",
		
		"reviewer_state": "0",状态：0：未审核，1：审核通过，2：审核驳回
		"reviewer_opinion": "",'审核意见',
		"reviewer_time": "",审核时间
		-->
	
		<com-mescroll-page ref="mescrollRef" height="auto" :fixed="true" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="cu-card article">
			<view class="cu-item shadow rsh relative padding-top-sm text-grey" v-for="(i,index) in dataList" :key="index" @tap="goApplyDetail(i)">
				<view class="title ">
					<view class="text-cut padding-left-xs">
						<text v-if="i.submit_type=='0'||i.submit_type=='1'" class="fr cu-tag bg-orange round" style="font-weight:normal">企业申报</text>
						<text v-else class="fr cu-tag bg-blue round" style="font-weight:normal">个人申报</text>
						{{i.category}}
					</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">上报时间：</view>
					<view class="flex-twice padding-right-lg">{{i.collection_time}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">申报说明：</view>
					<view class="flex-twice padding-right-lg">{{i.describes}}</view>
				</view>
				<!-- <view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">证明材料：</view>
					<view class="flex-twice padding-right-lg">{{i.enclosure_path}}</view>
				</view> -->
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">审核状态：</view>
					<view v-if="i.reviewer_state=='0'" class="flex-twice text-orange padding-right-lg">未审核</view>
					<view v-else-if="i.reviewer_state=='1'" class="flex-twice text-green padding-right-lg">审核通过</view>
					<view v-else class="flex-twice text-red padding-right-lg">审核驳回</view>
				</view>
				<block v-if="i.reviewer_state!='0'">
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">审核意见：</view>
					<view class="flex-twice padding-right-lg">{{i.reviewer_opinion==''?'暂无':i.reviewer_opinion}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">审核时间：</view>
					<view class="flex-twice padding-right-lg">{{i.reviewer_time}}</view>
				</view>
				</block>
			</view>
		</view>
		</com-mescroll-page>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
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
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			goApplyDetail(i){
				console.log(i);
				uni.navigateTo({
					url:'/pages/userCenter/apply/applyDetail?info='+JSON.stringify(i)
				})
			},
			/*上滑加载*/
			async upCallback(page){
				console.log('page---' + page.num);
				const {data:res}=await this.$http({
					url:`/targetmanage.targetnaturaldeclareindexlistjson.phtml`,
					data:{page:page.num}
				})
				console.log(res);
				if(page.num==1){
					this.dataList=[]
				}
				this.dataList=this.dataList.concat(res.success.resultList)
				this.mescroll.endBySize(res.success.resultList.length, res.success.page.totalnum)
			}
		},
		onLoad() {
			let user =  this.$checkLogin('/pages/userCenter/apply',1); // 页面加载时验证登录
			if(!user) return
        }
	}
</script>

<style>

</style>
