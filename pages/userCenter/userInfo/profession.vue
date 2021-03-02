<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">职业资格</block>
			<block slot="right">
				<text  @tap="edit('add','')" class="cuIcon-add bold text-white margin-right-lg size_40"></text>
			</block>
		</cu-custom>
		<!-- 数据列表 -->
		<view v-if="list.length == 0" class="text-center text-grey nodata">
			<image src="/static/image/nodata.png"></image>
			暂无数据
		</view>
		<view v-else class="cu-list menu margin sm-border" v-for="(i,index) in list" :key="index">
			<view class="cu-item" >
				<view class="content relative">
					<text class="cuIcon-selectionfill text-orange margin-right-xs"></text>
					<text>{{i.qualifications_name}}</text>
					<text class="cu-btn round bg-yellow text-white shadow cuIcon-writefill editIcon" @tap="edit('edit',i)"></text>
					<text class="cu-btn round bg-red shadow cuIcon-deletefill delIcon" @tap="del(i.id)"></text>
				</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">评书编号</view>
				<view class="action">{{i.certificate_number}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">级别</view>
				<view class="action">{{i.level}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">类别</view>
				<view class="action">{{i.category}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">获得日期</view>
				<view class="action">{{i.get_date}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">到期日期</view>
				<view class="action">{{i.get_expire}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">颁发机构</view>
				<view class="action">{{i.issuing_authority}}</view>
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
				const {data:res} = await this.$http({url:'/targetmanage.qualificationslist.phtml?viewId=json'});
				this.list = res.rows
			},
		//删除 完成
		async del(id){
			const {data:res} = await this.$http({url:`/targetmanage.qualificationsdelete.phtml?ids=${id}`});
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
					url:'/pages/userCenter/userInfo/professionEdit'
				})
			}else{
				uni.navigateTo({
					url:`/pages/userCenter/userInfo/professionEdit?info=${JSON.stringify(info)}`
				})
			}
		}
		},
		async onLoad() {
			let user = this.$checkLogin('/pages/userCenter/userInfo/profession',1); 
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
