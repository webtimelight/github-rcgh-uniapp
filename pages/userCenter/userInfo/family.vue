<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">家庭成员</block>
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
					<text class="cuIcon-myfill text-orange margin-right-xs"></text>
					<text class="">{{i.name}}</text>
					<text class="cu-btn round bg-yellow text-white shadow cuIcon-writefill editIcon" @tap="edit('edit',i)"></text>
					<text class="cu-btn round bg-red shadow cuIcon-deletefill delIcon" @tap="del(i.id)"></text>
				</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">与职工本人的关系</view>
				<view class="action">{{i.relationship}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">身份证号</view>
				<view class="action">{{i.ic_card}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">政治面貌</view>
				<view class="action">{{i.political_outlook}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">性别</view>
				<view class="action">{{i.sex}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">联系电话</view>
				<view class="action">{{i.phone}}</view>
			</view>
			<view class="cu-item text-grey">
				<view class="content">单位名称</view>
				<view class="action">{{i.unit_name}}</view>
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
				const {data:res} = await this.$http({url:'/targetmanage.familylist.phtml?viewId=json'});
				this.list = res.rows
			},
			//验证手机号
			
			//删除
			async del(id){
				const {data:res} = await this.$http({url:`/targetmanage.familydelete.phtml?ids=${id}`});
				console.log(res);
				if (res.success == 'true') {
					uni.showToast({
						title:"操作成功",
						icon: 'none',
					});
					await this.getList()
				}
			},
			//增加或者修改
			edit(type,info){
				console.log(1);
				if (type == 'add') {
					uni.navigateTo({
						url:'/pages/userCenter/userInfo/familyEdit'
					})
				}else{
					uni.navigateTo({
						url:`/pages/userCenter/userInfo/familyEdit?info=${JSON.stringify(info)}`
					})
				}
			}
		},
		async onLoad() {
			let user = this.$checkLogin('/pages/userCenter/userInfo/family',1); // 页面加载时验证登录
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
