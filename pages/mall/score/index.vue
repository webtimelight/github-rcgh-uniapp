<template>
	<view class="page-wrap">
		<!-- 导航栏 -->
		<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">会员积分</block>
		</cu-custom>
		<!-- 骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		<!-- 图表 -->
		<view class="scroe-30day margin-bottom">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>30天积分统计
				</view>
				<view class="action" @click="navTo(`/pages/mall/score/allList`)">
					<text class="text-red">查看明细<text class="cuIcon-right text-gray margin-left-xs"></text></text>
				</view>
			</view>
			<view class="columns">
				<view class="qiun-charts" >
					<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" disable-scroll=true @touchstart="touchColumn" @touchmove="moveColumn" @touchend="touchEndColumn"></canvas>
				</view>
			</view>
		</view>
		<!-- 今日得分 -->
		<view class="scroe-day margin-bottom">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>今日得分
				</view>
			</view>
			<view class="task-score">
				<view class="cu-list menu">
					<view class="cu-item" v-for="(v,i) in rules" :key="i">
						<view class="content">
							<view>{{v.rule_name}}</view>
							<text class="text-gray f-12">{{v.rule_desc}}</text>
						</view>
						<view class="action text-red f-18" v-if="v.today_score">
							{{v.today_score>0?'+'+v.today_score:v.today_score}}<text class="f-14 text-gray padding-left-xs">分</text>
						</view>
						<view class="action text-red f-18" v-else-if="v.id=='huiyuan'">
							<view v-if="showSingIn" class="">
								<!-- <text class="animation-reverse animation-slide-bottom f-18" style="animationDelay:0.3s">+1</text> -->
								<view class="f-18 animation-slide-bottom" style="animationDelay:0.0s">+1
									<text class="f-14 text-gray padding-left-xs">分</text>
								</view>
							</view>
							<text v-else class="cu-btn round bg-green shadow" @click="signIn">签到</text>
						</view>
						<view class="action text-red f-18" v-else>
							<text class="f-14 text-gray padding-left-xs">暂无</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/common/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
   
	export default {
		data() {
			return {
				showSingIn:false,
				skeletonShow:true,
				rules:[],
				todayScroe:[],
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:''
			}
		},
		
		async onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(730);
			this.cHeight=uni.upx2px(400);
			await this.getRules()
		},
		async onShow() {
			this.skeletonShow=true
			await this.todayScore()
			await this.thirtyScore()
			this.completeScore()
			this.skeletonShow=false
		},
		computed:{
		},
		methods: {
			/* 积分规则 */
			async getRules(){
				const {data:res}=await this.$http({
					url:`/points.pointsrulelist.phtml?viewId=json`
				})
				this.rules=res.rows
				for(let i=0;i<this.rules.length;i++){
					this.$set(this.rules[i],'today_score','')
				}
			},
			/* 积分明细 */
			async todayScore(){
				let now = new Date();
				let year = now.getFullYear(); 
				let month = ('0'+(now.getMonth()+1)).slice(-2);
				let date = ('0'+now.getDate()).slice(-2);
				let hour = ('0'+now.getHours()).slice(-2);
				let minu = ('0'+now.getMinutes()).slice(-2);
				let sec = ('0'+now.getSeconds()).slice(-2);
				let today=`${year}-${month}-${date}`
				const {data:res}=await this.$http({
					url:`/points.pointsdetailedlist.phtml?viewId=json&points_date=${today}`
				})
				this.todayScroe=res.rows
				// console.log(this.rules)
			},
			/* 页面跳转 */
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			/* 30天得分列表 */
			async thirtyScore(){
				const {data:res}=await this.$http({
					url:`/points.mydayscorelist.phtml?rows=30&page=1`
				})
				/* categories */
				let now = new Date();
				let dataTitle = [];
				for(let i = 29; i >=0; i--) {
					let month = now.getMonth() + 1
					dataTitle[i] = now.getFullYear()+ "-" + ('0'+month).slice(-2) + "-" + ('0'+now.getDate()).slice(-2);
					now = this.addDate(month + "/" + now.getDate() + "/" + now.getFullYear(), -1);
				}
				/* map */
				let rowsMap=res.rows.map(item=>({[item.points_date]:item.points}))
				let dataMap=dataTitle.map(item=>({[item]:'0'}))
				/* series */
				let scoreTitle=[];
				let scoreTitleObj={...this.ArrToObj(dataMap),...this.ArrToObj(rowsMap)}
				scoreTitle=Object.values(scoreTitleObj)
				/* 图表 */
				let Column={categories:[],series:[]};
				Column.categories=dataTitle;
				Column.series=[
					{"name":"积分","data":scoreTitle,"type": "column"}
					]
				/* 可在上面[]内追加其他类型比如折线，点，区域混合图
					{"name": "积分","data":scoreTitle,"type": "line","style": "curve"},
					{"name": "点","data": scoreTitle,"type": "point","color": "#f04864"} 
				*/	
				// Column.categories=["2012","2013","2014","2015","2016","2017"];
				// Column.series=[{"name":"积分","data":['',40,'',-60,'','']}];
				_self.showColumn("canvasColumn",Column);
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'mix',
					fontSize:11,
					padding:[20,15,15,15],
					legend:{
						show:false,
						position:'top',
						float:'center',
						itemGap:30,
						padding:5,
						margin:5,
						/* backgroundColor:'rgba(41,198,90,0.2)',
						borderColor :'rgba(41,198,90,0.5)', */
						borderWidth :1
					},
					dataLabel:true,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridColor:'transparent',
						gridType:'solid',//dash
						itemCount:4,
						scrollShow:false,
						scrollAlign:'right',
					},
					yAxis: {
						// disabled:true,
						gridType:'solid',
						gridColor:'#f2f2f2',
						splitNumber:4,
						min:2,
						max:50,
						format:(val)=>{return val.toFixed(0)+'分'}//如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*1.6/chartData.categories.length //0.45
						}
					},
				});
				
			},
			touchColumn(e){
				canvaColumn.scrollStart(e);
			},
			moveColumn(e) {
				canvaColumn.scroll(e);
			},
			touchEndColumn(e) {
				canvaColumn.scrollEnd(e);
				canvaColumn.touchLegend(e, {
					animation:true,
				});
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			/* 时间及数据处理 */
			addDate(dd, dadd) {
				let a = new Date(dd)
				a = a.valueOf()
				a = a + dadd * 24 * 60 * 60 * 1000
				a = new Date(a)
				return a;
			},
			ArrToObj(target){
				let newObj={}
				for (let i=0; i<target.length;i++){
					newObj[Object.keys(target[i])[0]]=Object.values(target[i])[0]
				}
				return newObj
			},
			/* 匹配完成项 */
			completeScore(){
				this.rules.map(item=>{
					item.today_score=''
					return item
				})
				for(let i=0;i<this.todayScroe.length;i++){
					for (let j=0;j<this.rules.length;j++){
						if(this.rules[j].id==this.todayScroe[i].points_type){
							this.rules[j].today_score=Number(this.rules[j].today_score)+Number(this.todayScroe[i].points)
						}
					}
				}
			},
			/* 点击签到 */
			async signIn(){
				const {data:res}=await this.$http({url:`/points.pointsdetailedpost.phtml?points_type=huiyuan`});
				if(res.success=='true'){
					this.showSingIn=true;
					setTimeout(()=>{
						this.thirtyScore()
					},1000)
				}else{
					uni.showToast({
						title:'签到失败，请稍后再试',
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	
	.scroe-30day{
		.columns{
			padding:20rpx 30rpx 10rpx 10rpx;
			background-color:#ffffff;
			.qiun-charts {/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
				width: 730upx;
				height: 400upx;
				background-color: #FFFFFF;
			}
			.charts {
				width: 730upx;
				height: 400upx;
				background-color: #FFFFFF;
			}
		}
	}
	.scroe-day{
		.task-score{
			.cu-item{
				padding:20rpx 40rpx;
				 .content{}
			}
		}
	}
</style>
