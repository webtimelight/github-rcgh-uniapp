<template>
	<view class="nodata animated fadeIn">
		<image class="pic" :src="picSrc" mode="widthFix"></image>
		<text class="tip">{{title}}</text>
	</view>
</template>

<script>
	/* 
	 @props {String} title=暂无内容   提示文字
	 @props {String} picSrc='/static/image/nodata.png'   提示图片
	 */
	export default {
		data() {
			return {
				
			}
		},
		props:{
			title:{
				type:String,
				default:'暂无内容'
			},
			picSrc:{
				type:String,
				default:'/static/image/nodata.png'
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	@import url('@/common/css/animate.min.css');
	@import url('@/common/css/iconfont.css'); 
	.nodata{
		position: absolute;left:0;right:0;top:50%;bottom: 0;
		transform: translateY(-50%);
		text-align: center;
		.pic{
			width: 48%;
			opacity: 0.4;
		}
		.tip{
			display: block;padding-top:30rpx ;
			color:#959595;font-size: 30rpx;
		}
	}
</style>
