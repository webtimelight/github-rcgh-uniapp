<template>
	<view >	
	<cu-custom class="custom-nav" bgColor="bg-gradual-uc" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">我的信用分</block>
		</cu-custom>
		<!-- 列表骨架 -->
		<com-quick-skeleton :show="skeletonShow" loading="flush" template="detail" :style="{top:CustomBar+'px'}"></com-quick-skeleton>
		<!-- 信用分 -->
		<view class="flex align-center justify-center">
			<view class="margin-bottom-xs margin-top-xs">
				<text class="text-white text-bold" style="font-size: 88rpx;">{{userInfo.total_score||'0'}}</text>
				<text class="f-14 text-white text-bold padding-left-sm">分</text>
			</view>
		</view>
		<!-- 用户姓名及证件号码 -->
		<view class="flex text-white">
			<view class="flex-sub text-center ">
				<view>信用等级</view>
				<view>
					<text v-if="!star" class="cuIcon-favor star"></text>
					<text v-else v-for="(key,v,i) in star" :key="i" class="star cuIcon-favorfill text-yellow"></text>
				</view>
			</view>
			<view class="flex-sub text-center">
				<view>{{userInfo.name}}</view>
				<text>{{userInfo.id_number}}</text>
			</view>
		</view>
		<!-- 图标 -->
		<view class="padding padding-bottom-xs margin-bottom">
			<view class="topicon cu-list grid radius col-2">
				<view class="solid-right" @click="navTo('/pages/activity/creditscore/objection')">
					<img class="topimg" src="/static/image/activity/creditScore-icon1.png">
					<view class="toptext">提出异议</view>
				</view>
				<view @click="navTo('/pages/activity/creditscore/card')">
					<img class="topimg" src="/static/image/activity/creditScore-icon2.png">
					<view class="toptext">信用名片</view>
				</view>
			</view>
		</view>
		<!-- 信用轨迹 -->
		<view class="credit-path margin-bottom">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>信用轨迹
				</view>
				<view class="cu-btn round bg-blue shadow margin-right" @click="navTo('/pages/activity/creditscore/declaration')">
					信用记录
				</view>
			</view>
			<scroll-view class="credit-linearea" scroll-x scroll-with-animation="true">
				<!-- {{groupCredit}} -->
				<view class="horGroup flex">
					<view class="hor-item" v-for="(v,i) in groupCredit" :key="i">
						<view class="verGroup">
							<view class="cu-timeline ver-item" v-for="(item, index) in v" :key="index">
								<view class="cu-item cuIcon-likefill" :style="{'min-height':v.length>1?'auto':'220rpx'}" :class="item.target_score>0?'text-red':'text-gray'">
									<view class="content">
										<view class="cu-capsule">
											<text class="margin-top-xs f-14 name">{{item.category}}</text>
											<view class="text-white cu-tag radius" :class="item.target_score>0?'bg-green':'bg-orange'">{{item.target_score>0?'+'+item.target_score:item.target_score}}</view>
										</view>
										
									</view>
								</view>
							</view>
						</view>
						<view class="ver-time">
							{{v[0].start_time}}
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="footer">
				<view class="line">
				</view>
			</view>
		</view>
		
		<!-- 信用等级 -->
		<view class="credit-level margin-bottom">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>信用等级
				</view>
			</view>
			<view class="scroe">
				<view class="people-area">
					<view class="pp" :style="{left:ppNum+'%'}">
						<image class="pimg" src="/static/image/activity/levelMan.png"> </image>
						<view class="p1">
							<text class="p11">{{userInfo.total_score}}</text>
						</view>
					</view>
				</view>
				<view class="point-area">
					<view class="flex">
						<view class="flex-sub point-item" v-for="(k,v,i) in 6" :key="i">
							<text class="point"></text>
						</view>
					</view>
				</view>
				<view class="star-area">
					<view class="flex">
						<view class="a1 flex-sub bg-grey">☆</view>
						<view class="a1 flex-sub bg-olive">★</view>
						<view class="a1 flex-sub bg-cyan">★★</view>
						<view class="a1 flex-sub bg-orange">★★★</view>
						<view class="a1 flex-sub bg-red">★★★★</view>
						<view class="a1 flex-sub bg-mauve">★★★★★</view>
					</view>
				</view>
				<view class="tip-area">
					<view class="flex">
						<view class="b1 flex-sub" v-for="(v,i) in starCompar" :key="i">
							<block v-if="i=='5'">1100以上</block>
							<block v-else>{{v.grade}}</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 信用排名 -->
		<view class="cup-list">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>信用标兵
				</view>
				<view class="padding-right">
					第<text class="text-orange f-18 padding-left-xs padding-right-xs">{{cupNum}}</text>名
				</view>
			</view>
			<view class="flex tabs align-center justify-center">
				<view class="tab-item" :class="index==TabCur?'cur':''" v-for="(item,index) in typeList" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item}}
				</view>
			</view>
			<view class="ddd" v-show="TabCur==0">
				<view class="content">
					<view class="cu-list menu">
						<view class="cu-item" v-for="(item,index) in inCityList" :key="index">
							<view class="order" v-html="cup(index)"></view>
							<view class="content">
								<view class="text-grey name">{{ item.NAME }}</view>
							</view>
							<view class="action">
								<view class="text-gray f-12"><text class="text-orange bold f-18 padding-right-xs">{{item.total_score}}</text>分</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="aaa" v-show="TabCur==1">
				<view class="content">
					<!-- 筛选 -->
					<picker class="margin-bottom" @change="PickerChange" :value="pickIndex" :range="gsNums" range-key="name">
						<view class="picker flex justify-center align-center">
							<view v-if="gsNums[pickIndex]">{{gsNums[pickIndex].name}}</view>
							<text class="lg text-gray cuIcon-triangledownfill"></text>
						</view>
					</picker>
					<!-- 列表 -->
					<view class="cu-list menu">
						<view class="cu-item" v-for="(item,index) in inComList" :key="index">
							<view class="order" v-html="cup(index)"></view>
							<view class="content">
								<view class="text-grey name">{{item.NAME }}</view>
							</view>
							<view class="action">
								<view class="text-gray f-12"><text class="text-orange bold f-18 padding-right-xs">{{item.total_score}}</text>分</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				skeletonShow:true,
				ppNum:0,
				TabCur: 0,
				starDict:[],
				starCompar:[],
				cupType:[{name:'总公司',id:1},{name:'子公司',id:2},{name:'某部门',id:3}],
				pickIndex:0,
				qsNum:'',
				gsNums:[],
				creditList:[],
				inCityList: [],
				inComList: [],
				typeList: ['全市排行','内部排行'],
				userInfo: {}
			}
		},
		async onLoad(options) {
			let user =  this.$checkLogin('/pages/activity/creditscore/index',2); // 页面加载时验证登录
			if(!user) return
			this.id = options.id	
			await this.getUserInfo()
			await this.getMyPos()
			await this.CityRank()
			await this.CompanyRank()
			await this.getCreditRecord()
			await this.getStarDict()
			await this.getStarCompar()
			this.skeletonShow=false
			this.ppNum=this.star*16.666666
		},
		computed: {
			groupCredit(){
				return this.groupArr(this.creditList,'collection_time')
			},
			star(){
				if(this.starDict.length&&this.starCompar.length&&this.userInfo.star_rating){
					return Number(this.starCompar.filter(item=>item.enum_name==this.userInfo.star_rating)[0].hierarchy.slice(-1))
				}
			},
			cupNum(){
				if(this.TabCur==0){
					return this.qsNum
				}else{
					return this.gsNums[this.pickIndex].num
				}
			},
			cup(){
				return function(i){
					if(i==0){
						return `<image class="cupicon" src="/static/image/cup1.png"></image>`
					}else if(i==1){
						return `<image class="cupicon" src="/static/image/cup2.png"></image>`
					}else if(i==2){
						return `<image class="cupicon" src="/static/image/cup3.png"></image>`
					}else{
						return `<view class="order-inner">${Number(i)+1}</view>`
					}
				}
			}
		},
		methods: {
			PickerChange(e){
				this.cupId=e.detail.value
			},
			/* 员工信息 */
			async getUserInfo() {
				const {data: res} = await this.$http({
					url: `/targetmanage.targetemployeelisth5json.phtml`
				});
				this.userInfo = res.userscore
				this.userInfo.id_number=this.userInfo.id_number.replace(/^(.{6})(?:\d+)(.{4})$/,"$1********$2")
			},
			/* 信用记录 */
			async getCreditRecord(){
				const {data:res}=await this.$http({
					url:`/targetmanage.getnaturallistbymemid.phtml?sidx=start_time&sord=asc&rows=20&page=1`
				});
				this.creditList=res.result.map(item=>{
					item.collection_time=item.collection_time.substring(0,11)
					return item
				})
			},
			/* 我的名次 */
			async getMyPos(){
				const {data:res}=await this.$http({
					url:`/targetmanage.targetnamecityranking.phtml`
				})
				this.qsNum=res.qsrownums
				this.gsNums=res.personalScoreMap.map(item=>({'name':item.unit_name,'id':item.id,'num':item.gsnum}))

			},
			/* 城市排名 */
			async CityRank() {
				const {data: res} = await this.$http({
					url: `/targetmanage.getEmployeeCityRank.phtml?rows=20&page=1`,
				});
				for (let i = 0; i < res.result.length; i++) {
					this.inCityList.push(res.result[i])
				}
			},
			/* 企业排名 */
			async CompanyRank() {
				const {data: res} = await this.$http({
					url: `/targetmanage.getEmployeeCompanyRank.phtml`,
					data:{rows:20,page:1,id:this.gsNums[this.pickIndex].id}
				});
				for (let i = 0; i < res.result.length; i++) {
					this.inComList.push(res.result[i])
				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			/* 普通跳转 */
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			/* 星级字典 */
			async getStarDict(){
				const {data:res}=await this.$http({
					url:`/manager.enumdictdetail.phtml`,
					data:{'enum_id':'Management','viewId':'json'}
				})
				this.starDict=res.enumvalueListStr
			},
			/* 星级分数对照 */
			async getStarCompar(){
				const {data:res}=await this.$http({
					url:`/targetmanage.targetmanagementlist.phtml?viewId=json`
				})
				this.starCompar=res.rows.sort((a,b)=>{
					return a.hierarchy.slice(-1)<b.hierarchy.slice(-1)?-1:1
				})
				this.groupStarScore(this.starDict,this.starCompar)
			},
			/* 重组星级分数 */
			groupStarScore(a,b){
				for (let i=0;i<a.length;i++){
					for (let j=0;j<b.length;j++){
						if(a[i].enum_value==b[j].hierarchy){
							this.$set(b[j],'enum_name',a[i].enum_name)
						}
					}
				}
			},
			/* 重组信用记录 */
			groupArr(arr,str){
				arr=arr.sort((a,b)=>{
					let s=a[str],t=b[str];
					return s<t?-1:1
				});
				if(arr.length){
					let newArr=[]
					let newArrItem=[]
					let filterStr=arr[0][str]
					for (let i=0;i<arr.length;i++){
						if(arr[i][str]==filterStr){
							newArrItem.push(arr[i])
						}else{
							filterStr=arr[i][str]
							newArr.push(newArrItem)
							newArrItem=[arr[i]]
						}
					}
					newArr.push(newArrItem)
					return newArr
				}
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-image:url(/static/image/userCenterTopBg.jpg);
		background-repeat: no-repeat;
		background-size: 100% auto;
	}

	.star {
		padding: 0 2px;
		color: #fac902
	}

	.solid-right::after {
		border-color: rgba(255, 255, 255, 0.7)
	}

	/* 顶部图标 */
	.topicon {
		padding: 30rpx 0;
		border-radius: 6px;
		box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.04);
		.solid-right::after {
			border-color: rgba(0, 0, 0, 0.2)
		}
		.topimg {
			width: 70rpx;
			height: 70rpx;
		}
		.toptext{
			line-height: 1.4;
		}
	}

	/* 信用轨迹 */
	.credit-path{
		position: relative;
		background: #fff;
		.footer {
			position: absolute;
			bottom:0;
			z-index: 0;
			height: 40px;
			width:100%;
			background-color: #89929c;
			overflow: hidden;
		}
		.footer .line {
			width: 100%;
			height: 3px;
			background-image: linear-gradient(to right, #acb4bb 0%, #acb4bb 50%, transparent 50%);
			background-size: 30px 3px;
			background-repeat: repeat-x;
			margin-top: 18px;
		}
		.credit-linearea{
			position: relative;
			z-index: 1;
			padding: 40rpx 0 14rpx 0;
			.horGroup{
				flex-wrap: nowrap;
				align-items: flex-end;
				.hor-item{
					flex:0 0 40%;
					margin: 0 40rpx;
					position: relative;
					&:after{
						
					}
					.ver-time{
						display: inline-block;
						margin-top: 36rpx;
						padding: 0rpx 20rpx;
						background: #f6f6f6;
						color:#333;
						border-radius: 30px;
						white-space:nowrap;
					}
				}
			}
			.verGroup{
				/deep/{
					.cu-item{
						padding: 5rpx 0px 30rpx 70rpx;
						&:before{
							top:16rpx;
							left:16rpx
						}
						&:after{
							left:40rpx;
							top:30rpx;
							bottom:-18rpx;
							height: auto;
						}
						.content{
							padding:5rpx;
							background: transparent;
							.cu-capsule{
								align-items: flex-start;
								.name{line-height: 1.4;}
								.cu-tag{
									margin-top: 6rpx;
									margin-left: 10rpx;
									display: flex;
									align-items: center;
									justify-content: center;
									border-radius: 18px;
								}
							}
						}
					}
				}
			}
		}
	}

	/* 信用等级 */
	.scroe {
		text-align: center;
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #FFFFFF;
		padding-top: 20px;
		position: relative;
		.star-area{
			.a1 {
				color:#fff;
				display: inline-block;
				padding: 6px 0;
				font-size: 12px;
			}
		}
		.tip-area{
			.b1{
				font-size: 12px;
				padding: 10rpx 0;
			}
		}
		.point-area{
			top:70rpx;left:30rpx;right:30rpx;
			z-index: 1;
			position: absolute;
			.point{
				display: inline-block;
				width: 14rpx;height: 14rpx;
				border-radius: 50%;border: 6rpx solid #f7e7c5;
			}
		}
		.people-area{
			padding-top: 140rpx;
			position: relative;
			z-index: 2;
			.pimg {
				width: 50px;
				height: 59px;
				position: relative;
				background-color: #f7f7f7;
			}
			.pp {
				display: inline-block;
				width: 115rpx;
				position: absolute;
				left:0;
				transition: all 1.5s;
				top:0;
				.pimg {
					background-color: #FFFFFF;
				}
				.p1 {
					background-color: #5da0f4;
					// display:block;
					display: none;
					background-color: #5da0f4;
					line-height: 35px;
					color: #FFFFFF;
				}
			}
			
		}
	}
	
	
	/* 排行榜 */
	.cup-list{
		.order {
			width: 26px;
			text-align: center;
			/deep/ {
				.order-inner{
					border-radius: 50%;
					line-height: 24px;
					height: 24px;
					width: 24px;
					background-color: #eee;
					font-size: 12px;
					text-align: center;
					display: block;
				}
				.cupicon{
					height: 26px;
					display: block;
					margin: 0 auto;
				}
			}
		}
		.content{
			text-align: center;
			align-items: center;
			background-color: #ffffff;
			padding: 0 40rpx;
			.cu-item{
				padding: 0;
			}
			.name{
				text-align: center;
				display: block!important;
			}
		}
		.action{
			text-align: right;
		}
		.tabs{
			background: #fff;
			padding: 40rpx 0;
			.tab-item{
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 80rpx;
				margin: 0 20rpx;
				width: 240rpx;
				text-align: center;
				background: #f2f2f2;
				color:#333;
				&.cur{
					background: #0081ff;
					color:#fff;
				}
			}
		}
	}
</style>
