<template>
    <view>
        <!-- topBar -->
        <cu-custom bgColor="bg-white" class="bg-white" :isBack="true">
            <block slot="content">活动信息详情</block>
		</cu-custom>
        <!-- 活动信息 -->
        <view class="padding-lr bg-white margin activityDetail">
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">发起人</view>
                <view>{{activityInfo.fullname}}</view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">联系人</view>
                <view>{{activityInfo.activitycontactsname}}</view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">联系方式</view>
                <view>{{activityInfo.activitycontactsphone}}</view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">活动地点</view>
                <view>{{activityInfo.activityaddress}}<i class="iconfont">&#xe63d;</i></view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">活动人数</view>
                <view>{{activityInfo.activitynumber}}人</view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">当前报名人数</view>
                <view>{{activityInfo.nums}}人</view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb">
                <view class="text-gray">报名截止</view>
                <view>{{activityInfo.activitysignupdeadline}}</view>
            </view>
            <view class="flex justify-between solid-bottom padding-tb margin-right">
                <view class="text-gray nowrap">活动时间</view>
                <view class="normal text-right">{{activityInfo.activitystarttime}}-{{activityInfo.activityendtime}}</view>
            </view>
            <view class="solid-bottom padding-tb">
                <view class="text-gray">活动内容</view>
                <view  class="margin-top">{{activityInfo.activitycontent}}</view>
            </view>
            <view class="solid-bottom padding-tb">
                <view class="text-gray">岗位职责</view>
                <view class="margin-top">{{activityInfo.activityduty}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{
                id:"",
                activityInfo:{}
            }
        },
        onLoad(options){
            this.id=options.id;
            this.getWorkInfo();
        },
        methods:{
            async getWorkInfo(){
				const {data:res} = await this.$http({url:'/targetmanage.activityh5detailjson.phtml?id='+this.id});
                // if(res.whether=="1")
                console.log(res,8080);
                this.activityInfo=res.activity;
            }
        }
    }
</script>

<style lang="scss" scoped>
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
    .activityDetail{
        border-radius: 20rpx;
    }
    .normal{
        white-space: normal;
    }
    .nowrap{
        white-space: nowrap;
    }
</style>
