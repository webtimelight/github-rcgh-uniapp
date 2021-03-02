<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="grid margin col-2">
			<view class="padding-right-xs padding-bottom-sm">
				<view class="info" @click="navTo('/pages/userCenter/userInfo/baseInfo')">
					<view class="infoTit">基本信息</view>
					<text class="cuIcon-myfill text-cyan infoIcon"></text>
					<view class="infoStatus text-red" v-if="!perfect">待完善</view>
					<view class="infoStatus text-green" v-else>已完善</view>
				</view>
			</view>
			<view class="padding-left-xs padding-bottom-sm">
				<view class="info" @click="navTo('/pages/userCenter/userInfo/edu')">
					<view class="infoTit">学历信息</view>
					<text class="cuIcon-activityfill text-orange infoIcon"></text>
					<view class="infoStatus text-grey">共<text>（{{eduTotal}}）</text>条信息</view>
				</view>
			</view>
			<view class="padding-right-xs padding-bottom-sm">
				<view class="info" @click="navTo('/pages/userCenter/userInfo/job')">
					<view class="infoTit">工作履历</view>
					<text class="cuIcon-formfill text-red infoIcon"></text>
					<view class="infoStatus text-grey">共<text>（{{jobTotal}}）</text>条信息</view>
				</view>
			</view>
			<view class="padding-left-xs padding-bottom-sm">
				<view class="info" @click="navTo('/pages/userCenter/userInfo/profession')">
					<view class="infoTit">职业资格</view>
					<text class="cuIcon-selectionfill text-yellow infoIcon"></text>
					<view class="infoStatus text-grey">共<text>（{{professionTotal}}）</text>条信息</view>
				</view>
			</view>
			<view class="padding-right-xs padding-bottom-sm">
				<view class="info" @click="navTo('/pages/userCenter/userInfo/family')">
					<view class="infoTit">家庭成员</view>
					<text class="cuIcon-friendfill text-olive infoIcon"></text>
					<view class="infoStatus text-grey">共<text>（{{familyTotal}}）</text>条信息</view>
				</view>
			</view>
			<view class="padding-left-xs padding-bottom-sm">
				<view class="info" @click="navTo('/pages/userCenter/userInfo/census')">
					<view class="infoTit">户籍信息</view>
					<text class="cuIcon-newsfill text-green infoIcon"></text>
					<view class="infoStatus text-grey">共<text>（{{censusTotal}}）</text>条信息</view>
				</view>
			</view>
			<view class="" style="width:100%">
				<view class="info">
					<view class="infoTit">信用承诺</view>
					<view class="infoStatus text-grey">共<text>（{{promiseImg == ''?'0':'1'}}）</text>条信息</view>
                    <view class="infoStatus text-grey">温馨提示：信用承诺模板请前往PC端网站下载。</view> 
					<image v-if="promiseImg!=''" @tap="ViewImage" :data-url="promiseImg" :src="promiseImg" class="radius promiseImg" mode="aspectFill"></image>
					
					<view v-if="promiseImg!=''" class="cu-tag bg-red round delImg" @tap.stop="DelImg">
						<text class='cuIcon-close'></text>
					</view>

					<button class="cu-btn bg-green round shadow upLoadBtn" @tap="ChooseImage('add')" v-if="promiseImg==''"><text class='cuIcon-cameraadd' style=""></text> 上传</button>

					<button class="cu-btn bg-orange round shadow upLoadBtn" @tap="ChooseImage('edit')" v-if="promiseImg!=''"><text class='cuIcon-write' style=""></text> 修改</button>

				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				jobTotal: '',//工作履历总数
				eduTotal: '',//学历信息总数
				professionTotal: '',//职业资格总数
				familyTotal: '',//家庭成员总数
				censusTotal: '',//户籍信息总数
				promiseTotal: '',//信用承诺总数
				perfect: true, // 基本信息是否已完善
				imgList: [],
				promiseImg:'',
				promiseImgId:''
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			// 选择图片
			async ChooseImage(type) {
				const {data:upLoadRes} = await this.$imgUpLoad({savepath:'userPromiseImg'})
				var sendData='',toaseText='',url=''
				if (type=='add') {// 添加
					url = '/targetmanage.personalcommitmentinsert.phtml'
					sendData = {
						commitment_book: upLoadRes.save_name
					}
					toaseText='承诺书上传成功'
				}else{//修改
					url = '/targetmanage.PersonalCommitmentUpdate.phtml'
					sendData = {
						commitment_book: upLoadRes.save_name,
						action: 'update',
						id: this.promiseImgId
					}
					toaseText='承诺书修改成功'
				}
				const {data:res} = await this.$http({url:url,data: sendData});
				console.log(res);
				if (res.success== 'true') {
					uni.showToast({
						title: toaseText,
						icon: 'none',
					});
					this.promiseImg = this.$baseUrl + upLoadRes.save_name
					this.imgList.push(this.$baseUrl + upLoadRes.save_name)
				}
			},
			// 删除图片
			async DelImg(){
				const {data:res} = await this.$http({
					url:'/targetmanage.PersonalCommitmentUpdate.phtml',
					data: {
						action: 'delete',
						id: this.promiseImgId
					}
				});
				console.log(res);
				if (res.success== 'true') {
					uni.showToast({
						title: '承诺书删除成功',
						icon: 'none',
					});
					this.promiseImg = ''
					this.imgList=[]
				}
			},
			// 预览图片
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
		},
		async onLoad(options) {
			this.perfect = (options.perfect === 'true')
			let user =  this.$checkLogin('/pages/userCenter/userInfo/index',2); // 页面加载时验证登录
			if(!user) return
			// 工作履历
			const {data:job} = await this.$http({url:'/targetmanage.work_experiencelist.phtml?viewId=json'});
			this.jobTotal = job.rows.length
			// 学历信息
			const {data:edu} = await this.$http({url:'/targetmanage.educationlist.phtml?viewId=json'});
			this.eduTotal = edu.rows.length
			// 职业资格
			const {data:profession} = await this.$http({url:'/targetmanage.qualificationslist.phtml?viewId=json'});
			this.professionTotal = profession.rows.length
			// 家庭成员
			const {data:family} = await this.$http({url:'/targetmanage.familylist.phtml?viewId=json'});
			this.familyTotal = family.rows.length
			// 户籍信息
			const {data:census} = await this.$http({url:'/targetmanage.native_placelist.phtml?viewId=json'});
			this.censusTotal = census.rows.length
			// 信用承诺 接口暂无
			const {data:promise} = await this.$http({url:'/targetmanage.personalcommitmentEqual.phtml'});
			if (promise.source == '1') {
				this.promiseImg = this.$baseUrl + promise.result[0].commitment_book
				this.imgList.push(this.$baseUrl + promise.result[0].commitment_book)
				this.promiseImgId = this.$baseUrl + promise.result[0].id
			}
        }
	}
</script>

<style>
	.info{
		border: 1px #ddd solid; background-color: #fff; padding: 20rpx 30rpx; position: relative;
	}
	.infoStatus{
		font-size: 18rpx;
	}
	.infoStatus text{
		color: #f00;
	}
	.infoIcon{
		position: absolute; right: 30rpx; top: 30rpx; font-size: 44rpx;
	}
	.upLoadBtn{
		position: absolute; right: 30rpx; top: 35rpx;
	}
	.promiseImg{
		position: absolute; right: 190rpx; top: 15rpx; width: 110rpx; height: 110rpx;
	}
	.delImg{
		position: absolute; right: 175rpx; top: 10rpx; width: 30rpx; height: 30rpx;
	}
</style>
