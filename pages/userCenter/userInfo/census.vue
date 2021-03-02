<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">户籍信息</block>
			<block slot="right">
				<text class=" bold text-white margin-right-lg size_40" :class="list.length==0?'cuIcon-add':'cuIcon-write'" @tap="edit()"></text>
			</block>
		</cu-custom>
		<view v-if="list.length == 0" class="text-center text-grey nodata">
			<image src="/static/image/nodata.png"></image>
			暂无数据
		</view>
		<!-- 
			"id":"944f4e71ac2a463e976c28b227952932",
			"name":"王洪光",  （职工姓名）
			"residence_province":"山东", (现住地省份)
			"residence_city":"济南",  (现住地城市)
			"residence_address":" 东环国际", (现住地详细地址)

			"registered_province":"山东", (户籍所在地省份)
			"registered_city":"菏泽", （户籍所在地城市）
			"registered_address":"巨野", （户籍所在地详细地址）
			
			"original_province":"山东", （原户籍城市）
			"original_city":"菏泽",  （原户籍城市）
			"original_address":"巨野",  （原户籍详细地址）
			/manager.enumdictdetail.phtml?viewId=json&enum_id=minzu
		-->
		<view v-else  class="cu-list menu margin sm-border" v-for="(i,index) in list" :key="index">
			<!-- <view class="cu-item">
				<view class="content relative">
					<text class="cuIcon-myfill text-orange margin-right-xs"></text>
					<text class="cu-btn round bg-yellow text-white shadow cuIcon-writefill editIcon" @tap="edit()"></text>
					<text class="cu-btn round bg-red shadow cuIcon-deletefill delIcon" @tap="del(i.id)"></text>
				</view>
			</view> -->
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">现居住地</text>
				</view>
				<view class="action">
					<text class="text-grey ">{{i.residence_province + i.residence_city}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content" style="flex-basis:550rpx">
					<text class="text-grey">现居地址：</text>
				</view>
				<view class="action">
					<text class="text-grey ">{{i.residence_address}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">现户籍地：</text>
				</view>
				<view class="action">
					<text class="text-grey ">{{i.registered_province + i.registered_city}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content" style="flex-basis:550rpx">
					<text class="text-grey">现户籍地址：</text>
				</view>
				<view class="action">
					<text class="text-grey ">{{i.registered_address}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">原户籍</text>
				</view>
				<view class="action">
					<text class="text-grey ">{{i.original_province + i.original_city}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content" style="flex-basis:550rpx">
					<text class="text-grey">原户籍地址：</text>
				</view>
				<view class="action">
					<text class="text-grey ">{{i.original_address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list : []
			}
		},
		methods: {
			async getList(){
				const {data:res} = await this.$http({url:'/targetmanage.native_placelist.phtml?viewId=json'});
				console.log(res);
				this.list = res.rows
			},
			async del(id){
				const {data:res} = await this.$http({url:`/targetmanage.native_placedelete.phtml?ids=${id}`});
				console.log(res);
				if (res.success == 'true') {
					uni.showToast({
						title:"操作成功",
						icon: 'none',
					});
					await this.getList()
				}
			},
			edit(){
				var info = {}
				if (this.list.length==0) {
					info = {
						mem_id:this.$eap_user.mem_id,
						// 现居住地
						residence_province:'',
						residence_city:'',
						residence_address:'',
						// 现户籍
						registered_province:'',
						registered_city:'',
						registered_address:'',
						// 原户籍
						original_province:'',
						original_city:'',
						original_address:'',
					}
				}else{
					info = {
						id:this.list[0].id,
						mem_id:this.$eap_user.mem_id,
						// 现居住地
						residence_province:this.list[0].residence_province,
						residence_city:this.list[0].residence_city,
						residence_address:this.list[0].residence_address,
						// 现户籍
						registered_province:this.list[0].registered_province,
						registered_city:this.list[0].registered_city,
						registered_address:this.list[0].registered_address,
						// 原户籍
						original_province:this.list[0].original_province,
						original_city:this.list[0].original_city,
						original_address:this.list[0].original_address,
					}
				}
				console.log(info);
				uni.navigateTo({
					url:`/pages/userCenter/userInfo/censusEdit?info=${JSON.stringify(info)}`
				})
			}
		},
		async onLoad() {
            let user =  this.$checkLogin('/pages/userCenter/userInfo/census',1); // 页面加载时验证登录
			if(!user) return
			await this.getList()
		},
		onShow(){
			this.getList()
		},
	}
</script>

<style>
</style>
