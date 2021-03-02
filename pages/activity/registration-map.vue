<template>
	<view class="">
		<cu-custom bgColor="bg-gradual-blue" style=" color:#fff;" :isBack="true">
			<!-- <block slot="backText" >返回</block> -->
			<block slot="content">导航</block>
		</cu-custom>
		<map :latitude="latitude" :longitude="longitude" :markers="markersd" style="width: 100%; height: 1400rpx"></map>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				latitude: 39.909,
				longitude: 116.39742,
				markersd:[{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/image/activity/map.png',
					width:30,
					height:30,
				}]
			}
		},
		onLoad(options) {
			console.log(options)
			this.longitude = options.wd
			this.latitude = options.jd
			this.markersd[0].longitude = options.wd
			this.markersd[0].latitude = options.jd
		}
	}
</script>

<style>
	/deep/.cu-bar .content{
		font-size: 38rpx;
	}
</style>
