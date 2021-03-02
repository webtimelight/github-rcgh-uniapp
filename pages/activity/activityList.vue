<template>
    <view>
        <!-- topBar -->
			<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">活动报到</block>
		</cu-custom>
        <!-- 活动列表 -->
        <com-mescroll-page ref="mescrollRef" height="auto" :bottombar="false" :down="downOption" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
        <view class="margin bg-white activityList" v-for="(item,index) of activityList" :key="index" @click="goDetail(index)">
            <image :src="goodsSrc(item)"></image>
            <view class="padding">
                <view class="name text-bold text-xl text-black text-cut">{{item.activityname}}</view>
                <!-- <view class="text-lg text-cut">活动内容活动内容活动内容</view> -->
                <view class="dot padding-left text-lg text-cut">{{item.activitystarttime}}~{{item.activityendtime}}</view>
                <view class="dot padding-left text-lg">{{item.activityaddress}}</view>
                <view class="fzbottom align-center solid-top flex justify-between margin-top padding-top">
                    <view >活动人数：{{item.activitynumber}}</view>
                    <view class="text-orange bold text-lg">进入活动>>></view>
                </view>
            </view>
        </view>
        </com-mescroll-page>
    </view>
</template>

<script>
    import MescrollMixin from "@/components/com-mescroll-page/js/mescroll-mixins.js";
    export default{
        mixins: [MescrollMixin],
        data(){
            return{
                id:"",
                activityList:[],
                skeletonShow: true,
                page:1,
                row:10,
                // 下拉刷新配置
				downOption:{
					auto:false,//默认true
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: true,//默认true
					page: {
						size: 10 // 每页数据,默认10
					},
					noMoreSize: 6, // 列表总数大于等于n条才显示'-- END --'
					textNoMore:'-- 我是有底线的--',
					empty: {
						// icon:'/static/image/nodata.png',
						tip: '页面加载失败，请稍后重试'
					}
				}
            }
        },
        async onLoad(options){
            let user =  this.$checkLogin('/pages/activity/activityList',2); // 页面加载时验证登录
			if(!user) return
            await this.getWorkInfoList();
        },
        computed:{
			goodsSrc(){
				return function(v){
					if(v.imgpath){
                        console.log(this.$baseUrl + v.imgpath.split(',')[0]);
						return this.$baseUrl + v.imgpath.split(',')[0]
					}else{
						return '/static/image/imgErr.jpg'
					}
				}
			}
		},
        methods:{
            async getWorkInfoList(){
                const {data:res} = await this.$http({
                    url:'/targetmanage.activityh5listjson.phtml',
                    data:{page:this.page,rows:this.row}
                });
                if(res.success=="1")
                console.log(res,8080);
                this.activityList=res.listac;
            },
            /*下拉刷新 */
			downCallback(){
				this.mescroll.resetUpScroll()
			},
			/*上滑加载*/
			async upCallback(page){
				const {data:res}=await this.$http({
                    url:`/targetmanage.activityh5listjson.phtml`,
                    data:{'page':page.num,'rows':page.size}
				})
				console.log(res);
				if(page.num==1){
					this.activityList=[]
				}
				this.activityList=res.listac;
				this.mescroll.endBySize(res.listac.length)
			},
            // 跳转
            goDetail(i) {
				uni.navigateTo({
					url: "/pages/activity/registration?id="+this.activityList[i].id
				});
            },
         
        }
    }
</script>

<style lang="scss" scoped>
    page{
        background: white;
    }
    .activityList{
        border-radius: 30rpx;
        box-shadow: 0 0 17px 0 rgba(190, 195, 194, 0.9);
        image{
            width: 100%;
            height: 300rpx;
            border-radius: 30rpx 30rpx 0 0;
            display: block;
        }
        .dot{
            position: relative;
                &::before{
                content: "";
                width: 12rpx;
                height: 12rpx;
                border-radius: 50%;
                background: #00BC7B;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            &:nth-child(3)::before{
                background: #FF5000;
            }
        }
        .fzbottom{
            line-height: 50rpx;
        }
    }
</style>
