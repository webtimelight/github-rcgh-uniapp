<template>
	<view>
		<cu-custom :isBack="true" >
			<block slot="right"><text @click="goIndex()" class="cuIcon-homefill text-white margin-right-lg"></text></block>
		</cu-custom>
		
		<view  style="position: absolute;top: 0;right: 0;left: 0;">
			<image :src="topUrl" mode="" ></image>
			<!-- <image src="../../static/image/6kc9xtkno1sbi_o.jpg"></image> -->
		</view>
		
		<view class="conbox radius" >
			<view class="conbox-top">
				<view>
					<view class="flex flex-wrap">
						<view class="basis-lg  radius itemName">{{topCon.place_name}}</view>
					</view>
				</view>
				<view class="flex p-xs margin-bottom-sm mb-sm ">
					<view class="flex-sub border-right-white-opcity">
						<view >{{topCon.pic_name}}</view>
						<text class="colorText">联系人</text>
					</view>
					<view class="flex-treble ">
						<view class="colorTexts" @tap="tell">{{topCon.tel}}</view>
						<text class="colorText" >联系电话</text>
					</view>
					<view class="flex-twice rightImage">
						<image :src= "LogoUrl" ></image>
					</view> 
				</view>
				<view  class="cu-item" v-for="(items,index) in cuIcon" :key="index">
					<text @click="goMap" class="lg text-gray" :class="'cuIcon-' + items.name">
						{{topCon.address}}
					</text>
				</view>
			</view>
			<view class="conboxCenter">
				<text>{{topCon.description}}</text>
			</view>
		</view>
		<view><!-- 循环多个优惠时 -->
			<view class="xianshi" ref="xianshi" v-for="(itema,i) in arrCon" :key="i">
				<image src="../../static/image/1607997268.jpg" mode=""></image>
				<text class="text1">{{itema.title}}</text>
				<view @click="clickbox(i)">
					<text class="text2">点击</text>
					<text class="text3">查看</text>
				</view>
				<image class="arrows"  src="../../static/image/20200616100432298.png" mode=""></image>
				<view class="boxBottom"  v-for="(itemas,index) in itema.xyjIncentiveLnList" :key="index">
					<view class="boxBottom_Con" v-show="itema.flas">
						<view class="flex  p-xs margin-bottom-xs mb-sm">
							<view class="flex  align-center">
								<view class="flex-twice padding-right desarea flex align-start">
									<text class="cuIcon-title text-blue"></text>
									<view class="desarea-text">
										{{itemas.description}}
									</view>
								</view>
								<view>
									<button class="cu-btn" data-target="DialogModal1" @click="goDetail(i,index)">立即参与</button><!-- @tap="showModal" --> 
								</view>
							</view>
						</view>
						<view  class="grid  align-center text-center solid-bottom padding-bottom-sm">
							<view class="paddingT flex-sub">
								<text class="colorT">{{level(itemas)}}</text>
								<view class="basis-df"></view>
								<text class="colorText">激励级别</text>
							</view>
							<view v-if="itemas.price" class="paddingT flex-sub">
								<text class="colorT" style="text-decoration: line-through;">{{itemas.price}}</text>
								<view class="basis-df"></view>
								<text class="colorText">原价</text>
							</view>
							<view v-if="itemas.act_price" class="paddingT flex-sub">
								<text class="colorT">{{itemas.act_price}}</text>
								<view class="basis-df"></view>
								<text class="colorText">优惠价</text>
							</view>
							<view v-if="itemas.tries_limit" class="paddingT flex-sub">
								<text class="colorT">{{itemas.tries_limit}}</text>
								<view class="basis-df"></view>
								<text class="colorText">剩余次数</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			 <!-- 弹出二维码 --> 
			<view >
				<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">识别二维码参与活动</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<image src="../../static/image/ewm.png" mode=""></image>
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="hideModal">关闭</button>
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
				arrCon:[], //优惠券外层
				ConArr:{},
				topCon:{},//店铺信息部分
				levelDict:[],//适用范围
				starCompar:[],
				CSSS:[],
				topUrl:'',
				LogoUrl:'',//logo图片地址
				unit_name:'',//主题名称
				xinxi:{},//店铺信息部分 传给下一页
				modalName: null,//二维码弹出
				// flas:true,
				cuIcon:[{
					name: 'locationfill',
					isShow: true
				}],
				url:''
			};
		},
		async onLoad(options) {
			this.LogoUrl = options.Logo,
			this.unit_name = options.unit_name,//主题名称 从上一页中传来的 暂时为空
			this.topCon = JSON.parse(options.item)// 接收传过来的参数
			this.xinxi = options.item  //门店信息 传入下一页
			this.CSSS = JSON.parse(options.item)
			this.topUrl =this.$baseUrl+this.CSSS.picture_url,//头部背景图
			await this.getLevelDict()
			this.getWorkInfoList();
		 },
		computed:{
			level(){
				return function(v){
					if(v.incentive_level){
						return this.levelDict.filter(item=>item.enum_value==v.incentive_level)[0].enum_name
					}else{
						return '无'
					}
				}
			}
		},
		methods: {
			async getLevelDict(){
				const {data:res} = await this.$http({
					url:'/manager.enumdictdetail.phtml',
					data: {
						viewId:'json',
						enum_id: 'incentive_level',
					}
				});
				this.levelDict=res.enumvalueListStr
			},
			async getWorkInfoList(){
				console.log(this.topCon.id)
				// 优惠券部分接口
				const {data:res} = await this.$http({
					url:'/xyj.xyjIncentiveListMobile.phtml',
					data: {
						place_id: this.topCon.id,
					},
					header: {'token': this.$eap_user_token}
				});
				console.log(res)
				this.arrCon = res.incentiveList
				console.log(this.arrCon)
				for (let i = 0; i < this.arrCon.length; i++) {
					this.$set(this.arrCon[i],"flas",false)
				}
			},
			
			tell(e){
				uni.makePhoneCall({
					phoneNumber:'this.topCon.tel',
					success:(res) => {
						console.log('调用成功')
					},
					fail(res) {
						console.log('调用失败')
					}
				})
			},
			goDetail(i,index) {
				console.log(i)
				console.log(index)
				// console.log(this.arrCon[i].xyjIncentiveLnList[index].id)
				// console.log(this.arrCon[i].domain_id)
				// console.log(this.topCon.vend_id)
				// console.log(this.arrCon[i].xyjIncentiveLnList[index].incentive_id)
				// console.log(this.arrCon[i].xyjIncentiveLnList[index])
				const youhui = JSON.stringify(this.arrCon[i].xyjIncentiveLnList[index])
				// ?id="+this.placeList[i].id+"&item="+item+"&Logo="+this.businessInfo.logo_img
				uni.navigateTo({
					url: "/pages/activity/show?incentive_ln_id="+this.arrCon[i].xyjIncentiveLnList[index].id+"&place_id="+this.topCon.id+"&domain_id="+this.arrCon[i].domain_id+"&vend_id="+this.topCon.vend_id+"&incentive_id="+this.arrCon[i].xyjIncentiveLnList[index].incentive_id+"&youhui="+youhui+"&unit_name="+this.unit_name+"&xinxi="+this.xinxi+"&topUrl="+this.topUrl+"&title="+this.arrCon[i].title+""
				});
			},
			goMap(){
				this.url = encodeURIComponent(`http://api.map.baidu.com/geocoder?output=html&src=webapp.baidu.openAPIdemo&address=`+this.topCon.address);
				uni.navigateTo({
					url: "/pages/activity/map?url="+this.url
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			clickbox(i){
				this.arrCon[i].flas = !this.arrCon[i].flas
			},	
					// 去首页
			goIndex(){
				uni.switchTab({ url: '/pages/userIndex/userIndex' })
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		/* background: #fff url(../../static/image/6kc9xtkno1sbi_o.jpg) no-repeat top; */
		background-color: rgb(247,247,247);
		background-size: 100% auto;
	}
	/deep/.cu-bar.fixed, .nav.fixed{
		position: absolute;
	}
	
	.conbox{
		position: relative;
		top: 160rpx;
		height: auto;
		width: 95%;
		background-color: #fff;
		margin-left: 2.5%;
		padding: 32rpx;
		box-shadow: 0 14rpx 78rpx 0 rgba(4,0,0,0.14);    
	}
	.conbox_box{
		padding: 16rpx;
	}
	.flex-treble{
		padding-left: 60rpx;
	}
	.rightImage image {
	    width: 160rpx;
	    height: 160rpx;
		border-radius: 10px;
	}
	.radius{
		border-radius: 40rpx;
	}
	.border-right-white-opcity{
		border-right: 2rpx rgba(88, 88, 88, 0.5) solid;
	}
	/deep/.cuIcon-back:before {
		color: #fff;
		content: "\e679";
	}
	.itemName{
		font-size: 36rpx;
	}
	.rightImage{
		border: 2rpx #e9e9ff solid;
		position: absolute;
		right: 20rpx;
		top: 40rpx;
		border-radius: 10px;
	}
	.colorText{
		font-size: 26rpx;
		color: #c7c7c7;
	}
	.cu-item text,
	.colorTexts{
		color: #0081FF;
	}
	.conbox-top{
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #c5c5c5;
	}
	.conboxCenter{margin-top: 24rpx;}
	.boxBottom{
		position: relative;
		background-color: #fff;
		padding: 0 20rpx;
	}
	.desarea{
		padding: 30rpx 20rpx 0rpx 20rpx;
	}
	.desarea .cuIcon-title{
		margin-left: -40rpx;
	}
	.desarea .desarea-text{
		padding-left: 10rpx;
		line-height: 1.6;
		font-size: 13px;
	}
	.xianshi{
		position: relative;
		bottom: -200rpx;
		width: 95%;
		margin-left: 2.5%;
	}
	.xianshi  .text1{
		position: absolute;
		left: 100rpx;
		top: 52rpx;
		color: #fff;
		font-weight: 700;
	}
	.xianshi  .text2,.text3,.arrows{
		position: absolute;
		right: 60rpx;
		top: 30rpx;
		color: #d21a38;
		font-weight: 700;
	}
	.xianshi .text3{
		top: 70rpx;
	}
	.xianshi .arrows{
		width: 28rpx;
		height: 16rpx;
		right: 76rpx;
		top: 120rpx;
	}
	.xianshi image{
		height: 160rpx;
		width: 100%;
	}
	.cuIcon-title{
		margin-left: -20rpx;
	}
	.boxBottom_Con{
		border-left: 6rpx #edf3ff solid;
	}
	
	.cu-btn{
		box-shadow: 0 4rpx 28rpx 0 rgba(255, 161, 57, 0.5);
		background-color: #ffa94b;
		border-color: #ffa94b;
		border-radius: 60rpx;
		color: #fff;
	}
	.paddingT{
	}
	.colorT{
		font-size: 28rpx;
	}
	uni-image{
		width: 750rpx;
	}
</style>
