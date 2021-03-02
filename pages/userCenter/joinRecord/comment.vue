<template>
	<view>
		<!-- topBar -->
		<cu-custom style="background:transparent; color:#fff;" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户评价</block>
		</cu-custom>
		<!-- 进行评价 -->
		<view class="padding padding-bottom-xs padding-top-xs">
			<view class="padding rsh bg-white" >
				<view>是否存在侵犯消费者合法权益、制假售假、未履行信息公示义务、未履行承诺优惠措施等行为：：</view>
				<radio-group class="margin-top-lg margin-bottom-lg" @change="radioChange" data-id="is_benefit">
					<label class="margin-right-sm">
						<radio class="blue radio" value="1" :class="is_benefit=='1'?'checked':''" :checked="is_benefit=='1'?true:false"></radio>
						<text class="margin-left-sm">是</text>
					</label>
					<label class="margin-left-sm">
						<radio class="blue radio" value="0" :class="is_benefit=='0'?'checked':''" :checked="is_benefit=='0'?true:false"></radio>
						<text class="margin-left-sm">否</text>
					</label>
				</radio-group>
				<view>您的宝贵意见：</view>
				<view class="padding-sm margin-top-sm margin-bottom-sm commentCon">
					<textarea maxlength="-1" v-model="textareaAValue" @input="textareaAInput" placeholder="多行文本输入框" style="font-size:30rpx;padding-right:60rpx"></textarea>
				</view>
				<view>是否匿名：</view>
				<radio-group class="margin-top-lg margin-bottom-lg" @change="radioChange" data-id="is_anony" >
					<label class="margin-right-sm">
						<radio class="blue radio" value="1" :class="is_anony=='1'?'checked':''" :checked="is_anony=='1'?true:false"></radio>
						<text class="margin-left-sm">是</text>
					</label>
					<label class="margin-left-sm">
						<radio class="blue radio" value="0" :class="is_anony=='0'?'checked':''" :checked="is_anony=='0'?true:false"></radio>
						<text class="margin-left-sm">否</text>
					</label>
				</radio-group>
				<button class="cu-btn block bg-blue margin-tb-sm lg" @tap="saveComment">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inv_name:'',
				inv_id_number:'',
				incentive_ln_id:'',
				id:'',
				textareaAValue:'',//评价内容
				is_anony:'1',//是否匿名
				is_benefit:'1'//是否享受优惠
			}
		},
		methods: {
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
				console.log(this.textareaAValue);
			},
			radioChange(e){
				console.log(e);
				var target = e.target.dataset.id
				this[target] = e.target.value
			},
			async saveComment(){
				const {data:res}=await this.$http({
					url:`/xyj.xyjIncentiveCommentAdd.phtml`,
					data:{
						'inv_name':this.inv_name, //评论人姓名
						'inv_id_number':this.inv_id_number,//身份证号
						'record_id':this.id,//参与记录ID
						'comm_content':this.textareaAValue,// 评论内容
						'incentive_ln_id':this.incentive_ln_id,//措施行ID 以上五项为必填
						'comm_level':'',//评价级别
						'is_anony':this.is_anony,//是否匿名
						'is_benefit':this.is_benefit//是否享受优惠
					}
				})
				if (res.success == '1') {
					uni.showToast({
						title: '评论成功，即将返回',
						icon: 'none',
					});
					setTimeout(() => {
						uni.navigateTo({url:'/pages/userCenter/joinRecord/joinRecord'})
					}, 1000);
				}else{
					uni.showToast({
						title: '评价失败，请稍后再试',
						icon: 'none',
					});
				}
			},
			async getRecordInfo(){
				const {data:res}=await this.$http({url:`/xyj.xyjIncentiveRecordDetailMobile.phtml?id=${this.id}`})
				this.inv_name = res.xyjIncentiveRecord.inv_name
				this.inv_id_number = res.xyjIncentiveRecord.inv_id_number
				this.incentive_ln_id = res.xyjIncentiveLn.id
			}
		},
		async onLoad(option) {
			let user =  this.$checkLogin('/pages/userCenter/joinRecord/comment',1); // 页面加载时验证登录
			if(!user) return
			this.id = option.id
			await this.getRecordInfo()
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
