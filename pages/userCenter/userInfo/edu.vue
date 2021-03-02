<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">学历信息</block>
			<block slot="right">
				<text class="cuIcon-add bold text-white margin-right-lg size_40" @tap="edit('add','')"></text>
			</block>
		</cu-custom>
		<!-- 数据列表 -->
		<view v-if="list.length == 0" class="text-center text-grey nodata">
			<image src="/static/image/nodata.png"></image>
			暂无数据
		</view>
		<view v-else class="cu-list menu margin sm-border" v-for="(i,index) in list" :key="index">
			<view class="cu-item">
				<view class="content relative">
					<text class="cuIcon-medalfill text-orange margin-right-xs"></text>
					<text>{{i.school}}</text>
					<text class="cu-btn round bg-yellow text-white shadow cuIcon-writefill editIcon" @tap="edit('edit',i)"></text>
					<text class="cu-btn round bg-red shadow cuIcon-deletefill delIcon" @tap="del(i.id)"></text>
				</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">所属专业</view>
				<view class="action">{{i.major}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">入学时间</view>
				<view class="action">{{i.school_start}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">结束时间</view>
				<view class="action">{{i.school_end}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">学历</view>
				<view class="action">{{i.education}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">学位</view>
				<view class="action">{{i.academic_degree}}</view>
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
				const {data:res} = await this.$http({url:'/targetmanage.educationlist.phtml?viewId=json'});
				console.log(res.rows);
				this.list = res.rows
			},
			async del(id){
				const {data:res} = await this.$http({url:`/targetmanage.educationdelete.phtml?ids=${id}`});
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
				if (type == 'add') {
					uni.navigateTo({
						url:'/pages/userCenter/userInfo/eduEdit'
					})
				}else{
					uni.navigateTo({
						
						url:`/pages/userCenter/userInfo/eduEdit?info=${JSON.stringify(info)}`
					})
				}
			}
		},
		async onLoad() {
			let user = this.$checkLogin('/pages/userCenter/userInfo/edu',1); // 页面加载时验证登录
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
