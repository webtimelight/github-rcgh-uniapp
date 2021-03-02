<template>
	<view>
		<!-- topBar -->
		<cu-custom  style="background:transparent; color:#fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">查看评价</block>
		</cu-custom>
		<!-- 查看评价 -->
		<view class="padding padding-bottom-xs padding-top-xs">
			<view class="padding rsh bg-white" >
				<view>是否爱到了优惠：</view>
				<view class="grid margin-top-sm col-2" >
					<view class="padding-right-xs padding-bottom-sm" >
						<button class="cu-btn block margin-tb-sm lg" :class="commentInfo.is_benefit=='1'?' bg-blue':'bg-grey'" disabled type="">是</button>
					</view>
					<view class="padding-right-xs padding-bottom-sm" >
						<button class="cu-btn block margin-tb-sm lg" :class="commentInfo.is_benefit=='0'?' bg-blue':'bg-grey'" disabled type="">否</button>
					</view>
				</view>
				<view>您的宝贵意见：</view>
				<view class="padding-sm margin-top-sm margin-bottom-sm commentCon">
					{{commentInfo.comm_content}}
				</view>
				<view>是否匿名：</view>
				<view class="grid margin-top-sm col-2" >
					<view class="padding-right-xs padding-bottom-sm" >
						<button class="cu-btn block margin-tb-sm lg" :class="commentInfo.is_anony=='1'?' bg-blue':'bg-grey'" disabled type="">是</button>
					</view>
					<view class="padding-right-xs padding-bottom-sm" >
						<button class="cu-btn block margin-tb-sm lg" :class="commentInfo.is_anony=='0'?' bg-blue':'bg-grey'" disabled type="">否</button>
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
				id:'',
				commentInfo:'',
			}
		},
		methods: {
			async getCommentInfo(){
				const {data:res} = await this.$http({url:`/xyj.xyjCommentDetailMobile.phtml?record_id=${this.id}`})
				this.commentInfo = res.xyjComment
			}
		},
		onLoad(option) {
			let user =  this.$checkLogin('/pages/userCenter/joinRecord/showComment',1); // 页面加载时验证登录
			if(!user) return
			this.id = option.id
			console.log(this.id);
			this.getCommentInfo()
		}
	}
</script>

<style scoped>
	page{
		background: #fff url(../../../static/image/recordTopImg.png) no-repeat top;
    	background-size: contain; height: 900rpx;
	}
	.rsh{
		border-radius:20rpx; box-shadow: 0px 4px 15px 0 rgba(181, 179, 177, 0.35)
	}
	.commentCon{
		border: 1px #eee solid;
	}
</style>
