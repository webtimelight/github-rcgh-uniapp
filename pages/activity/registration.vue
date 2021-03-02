<template>
    <view>
        <!-- topBar -->
        <cu-custom bgColor="bg-blue" class="bg-blue" :isBack="true">
            <block slot="content">活动信息详情</block>
		</cu-custom>
        <!-- 活动信息 -->
        <view class="padding">
            <view class="radius activityInfo padding bg-white">
                <image class="activity-img" :src="activityInfo.imgpath"></image>
                <view class="flex justify-between margin-top">
                    <view class="text-bold text-xl text-black margin-tb-xs">{{activityInfo.activityname}}</view>
                    <image @click="share" class="share margin-top-sm" src="/static/image/activity/share.png"></image>
                    <!-- <button type="primary" open-type="share" data-name="pageShare">分享</button> -->
                </view>
                <view class="flex justify-between margin-top-sm">
                    <view class="text-blue">活动分值：<text class="text-lg">{{activityInfo.onscore}}</text></view>
                    <view class="text-orange" v-if="activityInfo.bmzt=='0'">{{activityInfo.countbm == 1 ? "活动已开始签到" : "活动火热报名中"}}</view>
                    <view class="text-orange" v-else-if="(activityInfo.bmzt==''||activityInfo.bmzt==null||activityInfo.bmzt=='undefined')&&activityInfo.countbm == 1">已报名，未到签到时间</view>
                    <view class="text-orange" v-else-if="activityInfo.bmzt==1">{{activityInfo.countbm == 1 ? "活动已开始签到" : "报名已截止"}}</view>
                    <view class="text-orange" v-else-if="activityInfo.bmzt==2">{{activityInfo.countbm == 1 ? "火热报名中-我已报名" : "活动火热报名中"}}</view>
                    <view class="text-orange" v-else-if="activityInfo.bmzt==3">活动进行中</view>
                    <view class="text-orange" v-else-if="activityInfo.bmzt==4">{{activityInfo.countbm == 1 ? "活动结束，已可签退" : "活动已结束"}}</view>
                    <view class="text-orange" v-else-if="activityInfo.bmzt==5">活动结束</view>
                </view>
                <!-- <view class="flex justify-between">
                    <view class="text-xl" @click="goMap" v-if="activityInfo.activityaddress == '' ? false : true"><i class="iconfont">&#xe612;</i>{{activityInfo.activityaddress}}</view>
                </view> -->
            </view>
            <view class="radius margin-top bg-white align-center">
                <view class="flex align-center padding solid-bottom">
                    <image class="icon margin-right-xs" src="/static/image/activity/qi.png"></image>
                    <view class="text-black">{{activityInfo.fullname}}</view>
                </view>
                <view class="flex align-center padding solid-bottom">
                    <image class="icon margin-right-xs" src="/static/image/activity/date.png"></image>
                    <view class="text-black" v-if="activityInfo.activitystarttime!=''&&activityInfo.activityendtime!=''">{{activityInfo.activitystarttime}}~{{activityInfo.activityendtime}}</view>
                </view>
                <view class="flex align-center padding solid-bottom">
                    <image class="icon margin-right-xs" src="/static/image/activity/user.png"></image>
                    <view class="text-black">{{activityInfo.activitycontactsname}}</view>
                </view>
                <view class="flex align-center padding solid-bottom">
                    <image class="icon margin-right-xs" src="/static/image/activity/tel.png"></image>
                    <view class="text-black">{{activityInfo.activitycontactsphone}}</view>
                </view>
                <view class="flex align-center padding solid-bottom">
                    <image class="icon margin-right-xs" src="/static/image/activity/address.png"></image>
                    <view class="text-black" @click="goMap">{{activityInfo.activityaddress}}</view>
                </view>
            </view>
            <view class="radius margin-top bg-white apply padding">
                <view class="flex align-center justify-center" v-if="activityInfo.activitycontent1!=''">
                    <view class="rect bg-blue"></view>
                    <view class="text-blue margin-lr text-lg">活动内容</view>
                    <view class="rect bg-blue"></view>
                </view>
                <view class="margin-tb">{{activityInfo.activitycontent}}</view>
                <button class="line-blue cu-btn round margin lg block" @click="goDetail">更多详情</button>
                <button class="cu-btn block bg-blue margin-tb-sm lg margin round" @click="clickApply" v-if="activityInfo.bmzt==2&&activityInfo.countbm == 0">我要报名</button>
                <!-- <button class="cu-btn block bg-blue margin-tb-sm lg margin round" @click="clickApply" v-if="activityInfo.bmzt==0&&activityInfo.countbm == 0">我要报名</button> -->
                                <button class="cu-btn block bg-blue margin-tb-sm lg margin round" @click="clickApply" v-if="activityInfo.bmzt==0">{{activityInfo.countbm == 1 ? "我要签到" : "我要报名"}}</button>
                <button class="cu-btn block bg-blue margin-tb-sm lg margin round" @click="clickApply" v-if="activityInfo.bmzt==1&&activityInfo.countbm == 1">我要签到</button>
                <button class="cu-btn block bg-blue margin-tb-sm lg margin round" @click="clickApply" v-if="activityInfo.bmzt==2&&activityInfo.countbm == 1">退出报名</button>
                <button class="cu-btn block bg-blue margin-tb-sm lg margin round" @click="clickApply" v-if="activityInfo.bmzt==4&&activityInfo.countbm == 1">我要签退</button>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{
                id:"",
                activityInfo:{},
            }
        },
        onLoad(options){
            console.log(options);
            this.id=options.id;
            this.getWorkInfo();
        },
        onShareAppMessage(res) {
            let curRoute  = this.$mp.page.route; 
                // console.log(this.$baseUrl+curRoute+'?id='+this.activityInfo.id);
            let param=this.$baseUrl+curRoute+'?id='+this.activityInfo.id;
            console.log(param);
            console.log(res);
            // return{
            //     title: '自定义分享标题',
            //     path: param,
            // }
            // if (res.from === 'button') {// 来自页面内分享按钮
            //     console.log(res.target)
            // }
            // return {
            //     title: '自定义分享标题',
            //     path: param,
            // }
        },
        methods:{
            async getWorkInfo(){
                let curRoute  = this.$baseUrl+"/"+this.$mp.page.route+".phtml?id="+this.id;
                console.log(curRoute);
                const {data:res} = await this.$http({url:'/targetmanage.activityh5detailjson.phtml?id='+this.id});
                // if(res.success=="1")
                console.log(res,8080);
                this.activityInfo=res.activity;
                this.activityInfo.imgpath=this.$baseUrl + res.activity.imgpath.split(',')[0];
            },
            // 跳转
            goDetail() {
				uni.navigateTo({
					url: "/pages/activity/activityDetail?id="+this.activityInfo.id
				});
            },
            goMap() {
            	uni.navigateTo({
                    url: "/pages/activity/registration-map?jd="+this.activityInfo.jd + "&wd="+this.activityInfo.wd
                });
            },
            // 分享
            share(){
                // const {data:res} = await this.$http({
                //     url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
                //     // url:'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=ACCESS_TOKE',
                //     data:{
                //         access_token:"12",
                //         type:"jsapi"
                //     }
                // });
                // if(res.success=="1")
                // console.log(res,8080);

                let curRoute  = this.$mp.page.route; 
                // console.log(this.$baseUrl+curRoute+'?id='+this.activityInfo.id);
                let param=this.$baseUrl+curRoute+'?id='+this.activityInfo.id;
                // share
                // onShareAppMessage 
                // shareWithSystem
                uni.showShareMenu({
                    type:"text",
                    summary: '补充文字',
                    href: param,
                    // imageUrl:"../../static/logo.png",
                    success(){
                        console.log('分享成功');
                        // 分享完成，请注意此时不一定是成功分享
                    },
                    fail(){
                        console.log('分享失败');
                        // 分享失败  
                    }
                })
            },
            // onNavigationBarButtonTap
            // share1() {
            //     let curRoute  = this.$mp.page.route; 
            //     // console.log(this.$baseUrl+curRoute+'?id='+this.activityInfo.id);
            //     let param=this.$baseUrl+curRoute+'?id='+this.activityInfo.id;
            //     // console.log(param);
            //     //这里可以根据需求，跳转页面或者直接打开分享的弹框即可！
            //     //我是直接跳转页面了，在跳转后的页面实现分享链接
            //     // console.log(this.activityInfo.id,"hhh");
            //     uni.navigateTo({
            //         url:param
            //     })
            // },
            // onShareAppMessage(res) {
            //     if (res.from === 'button') {// 来自页面内分享按钮
            //         console.log(res.target)
            //     }
            //     return {
            //     title: '自定义分享标题',
            //     path: '/pages/test/test?id=123',
            //     imageUrl:''
            //     }
            // },
            // 报名签到
            async clickApply(){
                let bmid=""
                let bmdata={}
                if(this.activityInfo.bmid==""){
                    bmid=""
                    bmdata={
                        activityid:this.activityInfo.id,
                        id:bmid,
                        is_signup:this.activityInfo.countbm,
                        targetid:this.activityInfo.targetid,
                    }
                }else{
                    bmid=this.activityInfo.bmid
                    bmdata={
                        activityid:this.activityInfo.id,
                        id:bmid,
                        is_signup:this.activityInfo.countbm,
                        targetid:this.activityInfo.targetid,
                    }
                }
                // 报名
                if(this.activityInfo.countbm==0){
                    if(this.activityInfo.bmzt==0||this.activityInfo.bmzt==2){
                        // if(this.activityInfo.activitynumber>this.activityInfo.nums){
                                    
                        // }
                        uni.showModal({
                            title:"活动报名",
                            content:"是否报名该活动？",
                            success: async res=> {
                                 
                                if (res.confirm) {
                                    const {data:res} = await this.$http({
                                        url:'/targetmanage.activityjoinpost.phtml',
                                        data:bmdata
                                    });
                                    console.log(res);
                                    if(res.success=="true"){
                                        uni.showToast({
                                            title: res.msg,
                                            icon:"none",
                                            duration: 2000
                                        });
                                    }else{
                                        uni.showToast({
                                            title: '报名失败，失败原因:'+res.msg,
                                            icon:"none",
                                            duration: 2000
                                        });
                                    }
                                    this.getWorkInfo()
                                    console.log('用户点击确定');
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            }
                        });
                    }
                }else if(this.activityInfo.countbm==1){
                    // 退出报名
                    if(this.activityInfo.bmzt==2){
                        uni.showModal({
                            title:"退出报名",
                            content:"是否退出报名该活动？",
                            success: async res=> {
                                if (res.confirm) {
                                    const {data:res} = await this.$http({
                                        url:'/targetmanage.activityjoinpost.phtml',
                                        data:bmdata
                                    });
                                    console.log(res);
                                    if(res.success=="true"){
                                        uni.showToast({
                                            title: '退出报名成功',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    }else{
                                        uni.showToast({
                                            title: '退出报名失败',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    }
                                    this.getWorkInfo()
                                    console.log('用户点击确定');
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            }
                        });
                    }else if(this.activityInfo.bmzt==0||this.activityInfo.bmzt==1&&this.activityInfo.countbm==1){
                        // 签到
                        if(this.activityInfo.qdzt==0){
                            uni.showModal({
                                title:"签到",
                                content:"是否确认签到该活动？",
                                success: async res=> {
                                    if (res.confirm) {
                                        const {data:res} = await this.$http({
                                        url:'/targetmanage.activityjoinsignin.phtml?activityid='+this.activityInfo.id
                                    });
                                    console.log(res);
                                    if(res.success==1)
                                        uni.showToast({
                                            title: '未登录',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    if(res.success==2)
                                        uni.showToast({
                                            title: '未找到报名信息',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    if(res.success==3)
                                        uni.showToast({
                                            title: '报名信息被删除或已撤销报名',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    if(res.success==4)
                                        uni.showToast({
                                            title: '活动已结束，无法签到',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    if(res.success==5)
                                        uni.showToast({
                                            title: '签到成功，但是活动已开始，提醒本次活动不在算取分数',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    if(res.success==6)
                                        uni.showToast({
                                            title: '签到成功',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    if(res.success==7)
                                        uni.showToast({
                                            title: 'sql错误',
                                            icon:"none",
                                            duration: 2000
                                        });
                                    this.getWorkInfo()
                                } else if (res.cancel) {
                                    console.log('用户点击取消');
                                }
                            }
                        });
                        }else if(this.activityInfo.qdzt==1){
                            uni.showToast({
                                title: '已签到，不能重复签到',
                                icon:"none",
                                duration: 2000
                            });
                        }
                    }else if(this.activityInfo.bmzt==4){
                        // 签退
                         if(this.activityInfo.qtzt==0){
                             uni.showModal({
                                title:"签退",
                                content:"是否确认签退该活动？",
                                success: async res=> {
                                    if (res.confirm) {
                                        const {data:res} = await this.$http({
                                            url:'/targetmanage.activityjoinsignout.phtml?activityid='+this.activityInfo.id
                                        });
                                        console.log(res);
                                        if(res.success==1)
                                            uni.showToast({
                                                title: '未登录',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==2)
                                            uni.showToast({
                                                title: '未找到报名信息',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==3)
                                            uni.showToast({
                                                title: '报名信息被删除或已撤销报名',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==4)
                                            uni.showToast({
                                                title: '感谢您的参与，您本次可累计得分:'+res.socre,
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==5)
                                            uni.showToast({
                                                title: '未到签退时间，签退后将不在算取分值',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==6)
                                            uni.showToast({
                                                title: '已签退，不可以重复签退',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==7)
                                            uni.showToast({
                                                title: 'sql错误',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==8)
                                            uni.showToast({
                                                title: '未知错误',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==9)
                                            uni.showToast({
                                                title: '本次活动未签到，不予加分',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==10)
                                            uni.showToast({
                                                title: '活动开始后签到，不予加分',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==11)
                                            uni.showToast({
                                                title: '算取分数sql错误',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        if(res.success==12)
                                            uni.showToast({
                                                title: '算取分数未知错误',
                                                icon:"none",
                                                duration: 2000
                                            });
                                        this.getWorkInfo()
                                    } else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                }
                            });
                         }else if(this.activityInfo.qtzt==1){
                            uni.showToast({
                                title: '已签退，不能重复签退',
                                icon:"none",
                                duration: 2000
                            });
                        }
                    }
                }else if(this.activityInfo.bmzt==null||this.activityInfo.bmzt=="undefined"){
                    uni.showToast({
                        title: '未到报名时间报名',
                        icon:"none",
                        duration: 2000
                    });
                 }
            },
        }
    }
</script>

<style lang="scss" scoped>
    page{
        // background: linear-gradient(0deg, #6717CD, #2871FA);
        background-image: url('/static/image/activity/bg-bottom.png'),linear-gradient(0deg, #6717CD, #2871FA);
        background-position: bottom; 
        background-repeat: no-repeat; 
        background-size: 100% auto;
        padding-bottom: 40rpx;
    }
    /deep/ .bg-blue{
        background: #0F69F4;
    }
    .activity-img{
        width: 100%;
        height: 450rpx;
        display: block;
        border-radius: 20rpx 20rpx 0 0;
    }
    .radius{
        border-radius: 20rpx;
        box-shadow: 0 0 30rpx 0re0m rgba(93, 108, 125, 0.24);
    }
    @font-face {
        font-family: 'iconfont';
        src: url('/static/font/font_icon/iconfont.eot');
        src: url('/static/font/font_icon/iconfont.eot?#iefix') format('embedded-opentype'),
            url('/static/font/font_icon/iconfont.woff2') format('woff2'),
            url('/static/font/font_icon/iconfont.woff') format('woff'),
            url('/static/font/font_icon/iconfont.ttf') format('truetype'),
            url('/static/font/font_icon/iconfont.svg#iconfont') format('svg');
    }
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .icon{
        width: 40rpx;
        height: 40rpx;
    }
    .apply{
        .rect{
            width: 16rpx;
            height: 16rpx;
            transform: rotate(45deg);
        }
    }
    .share{
        width: 58rpx;
        height: 58rpx;
    }
</style>
