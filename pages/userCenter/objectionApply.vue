<template>
	<view>
		<!-- topBar -->
		<cu-custom  style="background:transparent; color:#fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">异议申请</block>
		</cu-custom>
		<!-- 背景色 -->
		<view class="bg-white topBg"></view>
		<!-- 背景图片 -->
		<image class="recordTopImg" src="../../static/image/recordTopImg.png"></image>
		<!-- 已评价 未评价 -->
		<view class="padding padding-bottom-xs padding-top-xs topTab">
			<view class="cu-list grid col-2 padding-top-lg rsh" >
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="tab(index)">
					<view>
						<image v-if="active==index" class="uImg" :src="item.imgSrc" />
						<image v-else class="uImg" :src="item.imgSrcGrey" />
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block>{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- 列表数据 -->
		<!--"id":"ad711c9a674a4e00acdce8548efde9ac",
					--"serial_id":"",流水号
					--"name":"顶顶顶",姓名
					--"id_number":"370102199905143712",身份证号
					--"phone_number":"18736868340",手机号
					--"objection_content":"煽动反",异议内容
					--"objection_time":"2020-12-18 22:39:50",异议时间
					--"dispose_opinion":"",处理意见
					--"dispose_name":"",处理人
					--"dispose_time":"",处理时间
			"photograph":"",图片
			"check_code":"",校验码
			"audit_opinion":"",审核意见
			"audit_state":"0",审核状态(0-未审核,1-审核通过,2-驳回)
			"is_delete":"0",删除标志(0-未删除,1-已删除)
			"set_null_field":"",用户id
			"mem_id":"nologin"
			}
		 -->
		<view class="cu-card article" v-show="active == 0">
			<view class="cu-item shadow rsh relative padding-top-sm text-grey" v-for="(item,index) in dataList.finished" :key="index">
				<view class="tlline"><!-- 左上边线 --></view>
				<view class="title ">
					<view class="text-cut padding-left-xs"><text class="fr text-grey" style="font-weight:normal">流水号</text>{{item.serial_id}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">姓名：</view>
					<view class="flex-twice padding-right-lg">{{item.name}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">异议内容：</view>
					<view class="flex-twice padding-right-lg">{{item.objection_content}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">处理意见：</view>
					<view class="flex-twice padding-right-lg">{{item.dispose_opinion}}</view>
				</view>
				<view v-show="item.showMore">
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">身份证号：</view>
						<view class="flex-twice padding-right-lg">{{item.id_number}}</view>
					</view>
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">联系电话：</view>
						<view class="flex-twice padding-right-lg">{{item.phone_number}}</view>
					</view>
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">申请日期：</view>
						<view class="flex-twice padding-right-lg">{{item.objection_time}}</view>
					</view>
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">处理人：</view>
						<view class="flex-twice padding-right-lg">{{item.dispose_name}}</view>
					</view>
					<view class="flex p-xs padding-top-s">
						<view class="flex-sub padding-left-lg">处理时间：</view>
						<view class="flex-twice padding-right-lg">{{item.dispose_time}}</view>
					</view>
				</view>
				<view class="text-center text-blue border-top" v-if="!item.showMore" @click="toggleMore('finished',index)">
					查看更多
				</view>
				<view v-else class="text-center text-blue border-top" @click="toggleMore('finished',index)">
					收起
				</view>
			</view>
		</view>
		
		<view class="cu-card article" v-show="active == 1">
			<view class="cu-item shadow rsh relative padding-top-sm text-grey" v-for="(item,index) in dataList.unfinished" :key="index">
				<view class="tlline"><!-- 左上边线 --></view>
				<view class="title ">
					<view class="text-cut padding-left-xs"><text class="fr text-grey" style="font-weight:normal">流水号</text>{{item.serial_id}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">姓名：</view>
					<view class="flex-twice padding-right-lg">{{item.name}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">异议内容：</view>
					<view class="flex-twice padding-right-lg">{{item.objection_content}}</view>
				</view>
				<view class="flex p-xs padding-top-sm">
					<view class="flex-sub padding-left-lg">申请日期：</view>
					<view class="flex-twice padding-right-lg">{{item.objection_time}}</view>
				</view>
				<view v-show="item.showMore">
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">身份证号：</view>
						<view class="flex-twice padding-right-lg">{{item.id_number}}</view>
					</view>
					<view class="flex p-xs padding-top-sm">
						<view class="flex-sub padding-left-lg">联系电话：</view>
						<view class="flex-twice padding-right-lg">{{item.phone_number}}</view>
					</view>
				</view>
				<view class="text-center text-blue border-top" v-if="!item.showMore" @click="toggleMore('unfinished',index)">
					查看更多
				</view>
				<view v-else class="text-center text-blue border-top" @click="toggleMore('unfinished',index)">
					收起
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active : 0,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					badge: 120,
					imgSrc: '../../static/image/user/joinIcon01.png',
					imgSrcGrey: '../../static/image/user/joinIcon02.png',
					name: '已处理'
				}, {
					cuIcon: 'recordfill',
					imgSrc: '../../static/image//user/joinIcon03.png',
					imgSrcGrey: '../../static/image/user/joinIcon04.png',
					badge: 2,
					name: '未处理'
				}],
				showMore : false,
				dataList:{
					finished:[],
					unfinished:[]
				},
			}
		},
		methods: {
			tab(index){
				this.active = index
			},
			toggleMore(type,index){
				this.dataList[type][index].showMore = !this.dataList[type][index].showMore
			},
			async getList(index){
				var sendData = ''
				if (index == 0) { // 查询已处理传参
					sendData = {
						auditState:'12',
						viewId:'json'
					}
				}else{ // 查询未处理传参
					sendData = {
						audit_state_select:'0',
						viewId:'json'
					}
				}
				const {data:res}=await this.$http({url:`/targetmanage.objectionindexlist.phtml`,data:sendData})
				this.cuIconList[index].badge = res.rows.length
				var rows = res.rows.map((ele,index)=>{
					ele.showMore=false
					return ele
				})
				if (index == 0) { // 已处理数据
					this.dataList.finished = rows
				}else{ // 未处理数据
					this.dataList.unfinished = rows
				}
			}
		},
		onLoad() {
			let user =  this.$checkLogin('/pages/userCenter/objectionApply',1); // 页面加载时验证登录
			if(!user) return
			this.getList(0)
			this.getList(1)
        }
	}
</script>

<style scoped>
	page{
		background: #fff; padding-top: 250rpx;
	}
	.recordTopImg{
		position: fixed; width: 750rpx; height: 228rpx; top: 0; left: 0; z-index: 98;
	}
	.topBg{
		position: fixed; left: 0; right: 0; top: 0; height: 350rpx; z-index: 97; background-color: #fff;
	}
	.topTab{
		position: fixed; left: 0; right: 0; top: 100rpx; z-index: 999;
	}
	.relative{
		position: relative;
	}
	.tlline{
		background: #fdcb53;width: 5px; position: absolute;top: 0;left: 0; border-top-left-radius: 8px;border-bottom-left-radius: 8px; bottom:0
	}
	.trTag{
		position: absolute; top: 25rpx; right: 30rpx;
	}
	.uImg{
		width: 70rpx; height: 70rpx; display: block; margin: 0 auto;
	}
	.rsh{
		border-radius:20rpx; box-shadow: 0px 4px 15px 0 rgba(181, 179, 177, 0.35)
	}
	.border-top{
		border-top:1px #eee solid; margin-top:35rpx; padding-top:35rpx;
	}
</style>
