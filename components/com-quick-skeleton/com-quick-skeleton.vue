<template>
<view v-if="show" class="template-skeleton" :style="{backgroundColor: bgColor}">
	<view :class="[loading=='flush'?'flush':'']"></view>
	<!-- 详情骨架 -->
	<view v-if="template=='detail'" class="ske-detail ske-body" :class="[loading == 'blink' ? 'blink' : '']">
		<view class="top">
			<view class="item skeleton-rect" :style="{backgroundColor:shapeColor}" :id="'detail'+index" v-for="(item,index) in 2" :key="item.id"></view>
		</view>
		<view class="center">
			<view class="left">
				<view class="item skeleton-circle" :style="{backgroundColor:shapeColor}" id="detail"></view>
			</view>
			<view class="right">
				<view class="item skeleton-rect" :style="{backgroundColor:shapeColor}" :id="'detail2'+index" v-for="(item,index) in 2" :key="item.id"></view>
			</view>
		</view>
		<view class="bottom">
			<view class="item skeleton-rect" :style="{backgroundColor:shapeColor}" :id="'detail3'+index" v-for="(item,index) in 12" :key="item.id"></view>
		</view>
	</view>
	<!-- 首页骨架 -->
	<view v-else-if="template=='home'" class="ske-home ske-body" :class="[loading == 'blink' ? 'blink' : '']">
		<view class="top">
			<view class="item skeleton-rect" :style="{backgroundColor:shapeColor}"></view>
		</view>
		<view class="center">
			<view class="item skeleton-circle" :style="{backgroundColor:shapeColor}" :id="'home'+index" v-for="(item,index) in 4" :key="item.id"></view>
		</view>
		<view class="bottom">
			<view class="item skeleton-rect" :style="{backgroundColor:shapeColor}" :id="'home1'+index" v-for="(item,index) in 4" :key="item.id"></view>
			<view class="item-block">
				<view class="block skeleton-rect" :style="{backgroundColor:shapeColor}" :id="'home2'+index" v-for="(item,index) in 2" :key="item.id"></view>
			</view>
			<view class="item skeleton-rect" :style="{backgroundColor:shapeColor}" :id="'home3'+index" v-for="(item,index) in 4" :key="item.id"></view>
		</view>
	</view>
	<!-- 列表骨架 -->
	<view v-else class="ske-list ske-body" :class="[loading == 'blink' ? 'blink' : '']">
		<view class="item" v-for="(item,index) in 5" :key="index">
			<view class="left">
				<view class="tit skeleton-rect" :style="{backgroundColor:shapeColor}"></view>
				<view class="des">
					<view class="des-item  skeleton-rect" :style="{backgroundColor:shapeColor}" v-for="(v,i) in 3" :key="i"></view>
				</view>
			</view>
			<view class="right skeleton-rect" :style="{backgroundColor:shapeColor}"></view>
		</view>
	</view>
</view>
</template>

<script>
	/* 
	 @props {Boolean} show=[true|false] 骨架状态是否显示
	 @props {String}  bgColor="#fff" 骨架页面背景色
	 @props {String}  shapeColor="#eee" 骨架元素颜色
	 @props {String}  loading=[blink|flush] 等待动画 闪烁|斜向扫光
	 @props {String}  template=[list|detail|home] 骨架模板，列表，详情，首页
	 */
	export default {
		data() {
			return {
			}
		},
		props: {
			show: { //骨架显示状态
				type: Boolean,
				default: true
			},
			bgColor: { //页面背景色
				type: String,
				default: '#FFF'
			},
			shapeColor:{ //绘制图形的颜色
				type: String,
				default: '#eee'
			},
			loading: { //两种动画效果[blink闪烁|flush斜向扫光]
				type: String,
				default: 'blink'
			},
			template: { //骨架模板
				type: String,
				default: 'list'
			}
		},

		methods: {
		}
	}
</script>

<style scoped lang="scss">
	
/* 绘图及动画	 */
.template-skeleton{
	position: absolute;z-index: 997;left:0;right:0;top:0;bottom:0;overflow: hidden;
	.skeleton-rect{
		border-radius: 8rpx;
	}
	.skeleton-circle{
		border-radius:50%;
	}
}
.blink{
  width: 100%;height: 100%;animation-duration: 2s; animation-name: blink;animation-iteration-count: infinite;
}

@keyframes blink {
  0% {opacity: .5}
  50% {opacity: 1}
  100% {opacity: .5}
}

.flush {
  animation: flush 2s linear infinite;position: absolute;z-index: 99;top: 0;bottom: 0;width: 100%;
  background: linear-gradient(to left,
  rgba(255, 255, 255, 0) 0%,
  rgba(255, 255, 255, .45) 20%,
  rgba(255, 255, 255, 0) 100%
  );
  /* 倾斜扫光 */
  transform: rotate(25deg) scaleY(2.5);transform-origin: center;
}

@keyframes flush {
  0% {left: -200%}
  50% {left: 0}
  100% {left: 200%}
}

/* 骨架模板 */
.template-skeleton{
	/* 详情骨架 */
	.ske-detail{
		padding: 30rpx;
		.top{
			margin-bottom: 80rpx;
			.item{
				height: 40rpx;margin-bottom: 30rpx;
				&:last-child{
					width:60%
				}
			}
		}
		.center{
			display: flex;
			margin-bottom: 80rpx;
			.left{
				margin-right: 60rpx;
				.item{
					width: 120rpx;height: 120rpx;
				}
			}
			.right{
				flex: 1;display: flex;flex-direction: column;justify-content: center;
				.item{
					height: 20rpx;width: 30%;margin: 16rpx 0;
				}
			}
		}
		.bottom{
			.item{
				height: 24rpx;margin-bottom: 24rpx;
				&:nth-child(4n){
					width: 70%;margin-bottom: 80rpx;
				}
			}
		}
	}
	/* 首页骨架 */
	.ske-home{
		padding: 30rpx;
		.top{
			margin-bottom: 60rpx;
			.item{
				height: 240rpx;margin-bottom: 30rpx;
			}
		}
		.center{
			display: flex;margin-bottom: 60rpx;justify-content: space-between;
			.item{
				flex:0 0 130rpx;height: 130rpx;
			}	
		}
		.bottom{
			.item{
				height: 24rpx;margin-bottom: 24rpx;
				&:nth-child(4n){
					width: 70%;margin-bottom: 60rpx;
				}
			}
			.item-block{
				display: flex;justify-content: space-between;
				margin-bottom: 60rpx;
				.block{
					width: 320rpx;height: 140rpx;
				}
			}
		}
	}
	/* 列表页骨架 */
	.ske-list {
		display: flex;flex-direction: column;overflow: hidden;justify-content: space-around;
		.item {
			padding:30rpx;display: flex;justify-content: space-between;
			.left {
				flex: 1;
				.tit {
					margin-bottom: 30rpx;height: 18rpx;width: 60%;
				}
				.des {
					.des-item {
						margin-bottom: 30rpx;height: 18rpx;
						&:first-child{
							height: 40rpx;
						}
						&:last-child{
							width: 70%;margin-bottom: 0;
						}
					}
				}
			}
			.right {
				flex: 0 0 40%;margin-left: 50rpx;
			}
		}
	}
	
}
</style>
