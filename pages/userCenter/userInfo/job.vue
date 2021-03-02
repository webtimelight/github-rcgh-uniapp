<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">工作履历</block>
			<block slot="right">
				<text  @tap="edit('add','')" class="cuIcon-add bold text-white margin-right-lg size_40"></text>
			</block>
		</cu-custom>
		<!-- 数据列表 -->
		<view v-if="list.length == 0" class="text-center text-grey nodata">
			<image src="/static/image/nodata.png"></image>
			暂无数据
		</view>
		<view v-else  class="cu-list menu margin sm-border" v-for="(i,index) in list" :key="index">
			<view class="cu-item">
				<view class="content relative">
					<text class="cuIcon-newshotfill text-orange margin-right-xs"></text>
					<text>{{i.unit_name}}</text>
					<text class="cu-btn round bg-yellow text-white shadow cuIcon-writefill editIcon" @tap="edit('edit',i)"></text>
					<text class="cu-btn round bg-red shadow cuIcon-deletefill delIcon" @tap="del(i.id)"></text>
				</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">职位</view>
				<view class="action">{{i.position}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">职业</view>
				<view class="action">{{i.occupation}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">入职时间</view>
				<view class="action">{{i.entry_time}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">离职时间</view>
				<view class="action">{{i.resignation_time}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">单位地址</view>
				<view class="action">{{i.unit_address}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">所在工会</view>
				<view class="action">{{i.trade_union}}</view>
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
				const {data:res} = await this.$http({url:'/targetmanage.work_experiencelist.phtml?viewId=json'});
				this.list = res.rows
			},
			//删除 完成
			async del(id){
				const {data:res} = await this.$http({url:`/targetmanage.work_experiencedelete.phtml?ids=${id}`});
				console.log(res);
				if (res.success == 'true') {
					uni.showToast({
						title:"操作成功",
						icon: 'none',
					});
					await this.getList()
				}
			},
			
			edit(type,info){
				console.log(1);
				if (type == 'add') {
					uni.navigateTo({
						url:'/pages/userCenter/userInfo/jobEdit'
					})
				}else{
					uni.navigateTo({
						url:`/pages/userCenter/userInfo/jobEdit?info=${JSON.stringify(info)}`
					})
				}
			}
		},
		async onLoad() {
			let user = this.$checkLogin('/pages/userCenter/userInfo/job',1); // 页面加载时验证登录
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
