<template>
	<view class="news-list uni-list">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(v,i) in dataList" :key="i" @click="goDetail(v)">
			<view class="uni-media-list uni-pull-right">
				<view class="uni-media-list-logo"  v-if="v[imgPathField]">
					<image class="img" :src="imgUrl(v[imgPathField])"></image>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top uni-ellipsis-2">{{v[titleField]}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{v[timeField]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/* 
	@props {Array} dataList=[]   数据
	@props {String} imgPathField=newsimgpath  图片字段  
	@props {String} titleField=news_title   标题字段
	@props {String} timeField=news_time  时间字段   
	@event {Function}  navTo  跳转
	*/
	export default {
		data() {
			return {
				nodata:false
			}
		},
		props:{
			dataList:{
				type:Array
			},
			imgPathField:{
				type:String,
				default:'newsimgpath'
			},
			titleField:{
				type:String,
				default:'news_title'
			},
			timeField:{
				type:String,
				default:'news_time'
			}
		},
		computed:{
			imgUrl:function(){
				return function(img){
					return this.$baseUrl+img
				}
			}
		},
		methods: {
			//跳转
			goDetail(item){
				this.$emit('navTo',item)
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 新闻列表 */
	.news-list{
		&::before,&::after{height:0}
		.uni-media-list-body{height: auto;}
		.uni-media-list{padding: 36rpx 30rpx;}
		.uni-media-list-logo{width: 200rpx;height: 140rpx;}
		.uni-list::before,.uni-list::after{background:none;}
		.uni-list-cell::after{right:30rpx;background-color:#eee}
		.uni-media-list-logo .img{border-radius: 4px;}
		.uni-media-list-text-top{line-height: 1.5;margin-bottom: 20rpx;}
	}
</style>
