<template>
	<view>
		<view>
			<button type="primary" @click="gotoInfoEdit('')"><uni-icons type="plusempty" style="color: #FFFFFF;"></uni-icons>新增</button>
		</view>
		<view class="list-content">
			<view class="uni-flex uni-row list-item" v-for="(item,index) in professionalInfoList" :key="index">
				<view class="uni-column">{{item.professional_name}}</view>
				<view class="uni-column right-column">
					<uni-icons type="trash" style="margin-right: 10px;" @click="deleteProfessional(item.id)"></uni-icons>
					<uni-icons type="compose" @click="gotoInfoEdit(item.id)"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				professionalInfoList: []
			}
		},
		onLoad(options){
			this.getProfessionalInfoList();
		},
		methods: {
			async getProfessionalInfoList(){
				const {data:res} = await this.$http({
					url:'/rcwx.getProfessionalInfoList.phtml',
					data: {mem_id: this.$eap_user.mem_id},
					header: {'token': this.$eap_user_token}
				});
				if(res.retList){
					this.professionalInfoList = res.retList;
				}
			},
			gotoInfoEdit(id){
				uni.navigateTo({
					url: '/pages/my/professionalInfoEdit?id=' + id
				});
			},
			deleteProfessional(id){
				var _this = this;
				uni.showModal({
					title: '确认',
					content: '确定删除此信息吗？',
					success: async function(res){
						if(res.confirm){
							const {data:res} = await _this.$http({
								url:'/rcwx.deleteProfessional.phtml',
								data: {id: id},
								header: {'token': _this.$eap_user_token}
							});
							if(res.success == "1"){
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								});
								_this.getProfessionalInfoList();
							}else{
								uni.showModal({
									title: '错误',
									content: '删除失败',
									showCancel: false
								});
							}
						}else{
						}
					}
				});
			}
		}
	}
</script>

<style>
	uni-view {
		font-size: 14px;
	}
</style>
