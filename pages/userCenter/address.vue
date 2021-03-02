<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">收货地址</block>
			<block slot="right">
				<text @tap="showModal('add')"  class="cuIcon-add bold text-white margin-right-lg size_40"></text>
			</block>
		</cu-custom>
		<!-- 列表 -->
		<view class="">
			<view class="cu-list menu-avatar">
				<view class="cu-item margin-bottom-sm addressList">
					<view class="cu-avatar round lg bg-orange cuIcon-myfill opcityTit"></view>
					<view class="content">
						<view class="text-grey">收件人：{{this.$eap_user.fullname}} </view>
						<text class="text-sm cuIcon-dianhua text-orange">
							<text class="text-grey padding-left-xs">{{this.$eap_user.mem_mphone}}</text>
						</text>
					</view>
				</view>
				<view v-if="addressList.length == 0" class="text-center text-grey nodata">
					<image src="/static/image/nodata.png"></image>
					暂无收货地址，请添加
					<view class="padding-top">
						<button class="cu-btn bg-blue shadow" @click="showModal('add')">点击添加</button>
					</view>
				</view>
				<radio-group v-else @change="RadioChange($event)">
					<view class="cu-list menu">
						<view  class="cu-item solid-bottom addressList in" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in addressList" :key="index"
							 :data-target="'move-box-' + index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd">
							<view v-if="canSelect" class="cu-avatar bg-white margin-right-lg">
								<view class="leftRadio">
									<radio class="radio-item" :checked="item.default_address=='1'" :value="JSON.stringify(item)"></radio>
								</view>
							</view>
							<view class="content">
								<view class="text-gray text-sm flex align-start">
									<text class="cu-tag bg-green radius margin-right" v-if="item.default_address=='1'">默认</text>
									<text class="f-16">{{item.usual_address}}</text>
								</view>
							</view>
							<view class="action">
									<text class="cuIcon-writefill text-yellow" @tap="showModal('edit_'+index)"></text>
									<text class="cuIcon-deletefill margin-left-sm text-red"  @tap="del(item.id)"></text>
							</view>
							<view class="move">
								<view class="bg-grey" @tap="del(item.id)">删除</view>
							</view>
						</view>
					</view>
				</radio-group>
			</view>
		</view>

		<view class="cu-modal" :class="isShowModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modalTit}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="padding-bottom solid-bottom flex align-center">
						<text class="cuIcon-locationfill f-18 text-gray padding-right-xs"></text>
						<input class="text-left flex-sub" maxlength="-1" :focus="isFocus" placeholder="请输入收货地址" name="input" v-model="addressText" />
					</view>
					<view class="flex justify-between padding-top">
						<view class="flex align-center">
							<text class="cuIcon-settingsfill f-18 text-gray padding-right-xs"></text>
							<text>设为默认</text>
						</view>
						<switch class='orange' @change="switchChange" :class="switchState=='1'?'checked':''" :checked="switchState=='1'?true:false"></switch>
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="save">确定</button>
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
				addressList:[],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				isShowModal: false,
				modalTit:'',
				addressText:'',
				canSelect:false,
				isFocus:false,
				editIndex:'',
				switchState:'0'
			}
		},
		async onLoad(option) {
			let user =  this.$checkLogin('/pages/userCenter/address',1); // 页面加载时验证登录
			if(!user) return
			await this.getAddressList()
			this.canSelect=option.canSelect;
		},
		methods: {
			// 开关
			switchChange(e) {
				if(e.detail.value){
					this.switchState='1'
				}else{
					this.switchState=0	
				}
				console.log(this.switchState)
			},
			//单选
			async RadioChange(e) {
				let addressInfo=JSON.parse(e.detail.value)
				const {data:res} = await this.$http({
					url: '/points.pointsusualaddresspost.phtml',
					data: {
						id:`${addressInfo.id}`,
						default_address:'1',
						usual_address:`${addressInfo.usual_address}`
					}
				});
				this.getAddressList()
				uni.navigateBack()
			},
			async getAddressList(){
				const {data:res} = await this.$http({url:'/points.pointsusualaddresslist.phtml'});
				this.addressList = res.rows
			},
			
			// 弹窗
			showModal(type) {
				console.log(type)
				if (type == 'add') {
					this.modalTit = '添加收获地址',
					this.switchState='0'
				} else {
					this.modalTit = '修改收获地址'
					var index = type.substring(5)
					this.editIndex = index
					this.switchState=this.addressList[index].default_address
					this.addressText = this.addressList[index].usual_address
				}
				this.isShowModal = !this.isShowModal
				this.isFocus = !this.isFocus
			},
			hideModal(e) {
				this.addressText = ''
				this.isShowModal = !this.isShowModal
			},
			async save(){
				if (this.addressText == '') {
					uni.showToast({
						title:"收获地址不能为空,请输入",
						icon: 'none',
					});
					return
				}
				var data = ''
				if (this.modalTit == '添加收获地址') {
					data = {
						usual_address: this.addressText,
						default_address:this.switchState
					}
				} else {
					data = {
						usual_address: this.addressText,
						id: this.addressList[this.editIndex].id,
						default_address:this.switchState
					}
				}
				const {data:res} = await this.$http({
					url: '/points.pointsusualaddresspost.phtml',
					data: data
				});
				if (res.success == 'true') { 
					uni.showToast({
						title:"操作成功！",
						icon: 'none',
					});
				}
				this.getAddressList()
				this.hideModal()
			},
			async del(id){
				uni.showModal({
					title:'删除提醒',
					content:`确定要删除此收货地址吗？`,
					success: (_res) => {
						if(_res.confirm){
							this.doDel(id)
						}
					}
				})
				
			},
			async doDel(id){
				const {data:res} = await this.$http({
					url: '/points.pointsusualaddressdelete.phtml',
					data: {
						id : id
					}
				});
				if (res.success == 'true') {
					uni.showToast({
						title:"操作成功！",
						icon: 'none',
					});
				}
				this.getAddressList()
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
		}
	}
</script>

<style scoped>
	.opcityTit{
		font-size: 40rpx; 
	}
	.opacity{
		opacity: 0.3;
	}
	.addressList{
		padding-top:50rpx; padding-bottom:50rpx; min-height:180rpx!important
	}
	.addressList.in{
		padding-top:50rpx; padding-bottom:50rpx;min-height:120rpx!important
	}
</style>
