<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">历史积分记录</block>
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
		
		<!-- 列表 -->
		<com-mescroll-page ref="mescrollRef" height="auto" :top="120" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="mix-list cu-list menu bg-white">
				<view class="cu-item align-start" v-for="(v,i) in dataList" :key="i">
						<!-- 左 -->
						<view class="content margin-right">
							<view v-if="tagName(v)" class="text-green margin-bottom-xs f-16">{{tagName(v)}}</view>
							<view class="name uni-ellipsis-2">{{v.rule_name}}</view>
							<view class="time text-gray f-12">{{v.points_date}}</view>
						</view>
						<!-- 右 -->
						<view class="action text-right">
							<view :class="['point',v.points>0?'text-green':'text-red']">{{v.points>0?'+'+v.points:v.points}}分</view>
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
				rules:[],
				dataList:[],
				skeletonShow:true,
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
		onLoad() {
			this.getYears()
		},
		computed:{
			tagName(){
				return function(v){
					let arr=this.rules.filter(item=>item.value==v.points_type)
					if(arr.length){
						return arr[0].name
					}else{
						return
					}
				}
			}
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
			/* 积分规则 */
			async getRules(){
				const {data:res}=await this.$http({
					url:`/points.pointsrulelist.phtml?viewId=json`
				})
				this.rules=res.rows.map(item=>({value:item.id,name:item.rule_name}))
			},
			/*下拉刷新 */
			downCallback(){
				this.getRules()
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				const {data:res}=await this.$http({
					url:`/points.pointsdetailedlist.phtml`,
					data:{
						viewId:'json',
						page:`${page.num}`,
						rows:`${page.size}`,
						year:this.years[this.yearsIndex].slice(0,-1),
						month:this.monthsIndex?this.months[this.monthsIndex].slice(0,-1):''
					}
				})
				if(page.num==1){
					this.dataList=[]
				}
				this.dataList=this.dataList.concat(res.rows)
				setTimeout(()=>{
					this.mescroll.endBySize(res.rows.length, res.records)
				},300)
				this.skeletonShow=false
			}
		}
	}
</script>

<style lang="scss">
	.mix-list {
		/deep/{
			.cu-item{
				padding:20rpx 30rpx;
				align-items: flex-start;
			}
		}
	}
	.query{
		position: fixed;
		background: #fff;
		left:0;right:0;
		height: 120rpx;z-index: 99;
		border-bottom: 20rpx solid #f6f6f6;
	}
</style>
