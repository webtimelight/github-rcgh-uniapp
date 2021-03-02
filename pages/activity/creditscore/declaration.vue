<template>
	<view>
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
            <block slot="backText">信用记录</block>
			<view slot="right" class="padding-right"  @click="declaration"><text class="icon cuIcon-form padding-right-xs"></text>补充申报</view>
	    </cu-custom>
	    <!-- 列表骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="list" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		<!-- 筛选 -->
		<view class="query flex align-center justify-around" :style="{'top':CustomBar+'px'}">
			<view class="year flex-sub text-center solid-right">
				<picker @change="PickerChange($event,'yearsIndex')" :value="yearsIndex" :range="years">
					<view class="picker">
						<text class="padding-right-xs">{{years[yearsIndex].slice(0,-1)}}</text>年
						<text class="lg text-gray cuIcon-triangledownfill"></text>
					</view>
				</picker>
			</view>
			<view class="month flex-sub text-center">
				<picker @change="PickerChange($event,'monthsIndex')" :value="monthsIndex" :range="months">
					<view class="picker">
						<text class="padding-right-xs">{{months[monthsIndex].slice(0,2)}}</text>月
						<text class="lg text-gray cuIcon-triangledownfill"></text>
					</view>
				</picker>
			</view>
		</view>
		<com-mescroll-page ref="mescrollRef" height="auto" :top="120" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="cu-timeline" v-for="(item, index) in list" :key="index">
				<view class="cu-item" :class="item.target_score>0?'text-blue':'text-orange'">
					<view class="content">
						<view class="cu-capsule">
							<view class="text-white cu-tag radius" :class="item.target_score>0?'bg-green':'bg-orange'">{{item.target_score>0?'+'+item.target_score:item.target_score}}分</view>
						</view>
						<view class="margin-top-xs f-14">{{item.target_name}}</view>
						<view class="f-14 text-gray">{{item.start_time}}</view>
					</view>
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
				yearsIndex: 0,
				monthsIndex: 0,
				years:[],
				months: ['不限','01月', '02月', '03月','04月', '05月', '06月','07月', '08月', '09月','10月', '11月', '12月'],
				skeletonShow:true,
				list: [],
				totalNum:0,
				// 下拉刷新配置
				downOption:{
					auto:true,//默认true
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
						tip: '暂无记录'
					}
				}
			}
		},
		onLoad(){
			this.getYears()
		},
		methods: {
			getYears(){
				let year=new Date().getFullYear()
				this.years.push(year+'年')
				for(let i=3; i>0;i--){
					year--;
					this.years.push(year+'年')
				}
			},
			PickerChange(e,o) {
				this[o] = e.detail.value
				this.mescroll.resetUpScroll(true)
			},
			/*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				const {data:res}= await this.$http({
					url:`/targetmanage.getnaturallistbymemid.phtml`,
					data:{
						viewId:'json',
						page:`${page.num}`,
						rows:`${page.size}`,	
						year:this.years[this.yearsIndex].slice(0,-1),
						month:this.monthsIndex?this.months[this.monthsIndex].slice(0,-1):''
					}
				})
				if(page.num==1){
					this.list=[]
				}
				this.list=this.list.concat(res.result)
				this.mescroll.endBySize(res.result.length, res.totalnum)
				this.skeletonShow=false
			},
			/* 跳转 */
			declaration(){
				uni.navigateTo({
					url: "/pages/activity/creditscore/scorecredit"
				})
			}
		}
	}
</script>
<style>
	page{background-color: #fff}
	.query{
		position: fixed;
		background: #fff;
		left:0;right:0;
		height: 120rpx;z-index: 99;
		border-bottom: 20rpx solid #f6f6f6;
	}
</style>