<template>
	<view v-if="scrollTop>400" class="backTop" :class="{'fadeIn':isShowToTop}" @click="toTopClick">
		<image class="img" :src="src" mode="widthFix" />
	</view>
</template>

<script>
	/* 
	使用方法：
	<com-back-top :src="backTop.src" :scrollTop="backTop.scrollTop"></com-back-top>
	data() {
		return {
			//回到顶部
			backTop: {
				src: '../../../static/image/top.png',
				scrollTop: 0
			}
		}
	},
	onPageScroll(e) {
		this.backTop.scrollTop = e.scrollTop;
	}
	 */
	export default {
		name: "backTop",
		props: {
			src: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: ''
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			tab: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isShowToTop: true
			}
		},
		methods: {
			toTopClick() {
				this.isShowToTop = false; // 回到顶部按钮需要先隐藏,再执行回到顶部,避免闪动
				if (this.tab) {
					this.$emit('setScrollTop');
				} else {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				}
			}
		},

	}
</script>

<style scoped lang="scss">
	.backTop {
		z-index: 999;
		position: fixed;
		right: 30rpx;
		bottom: 120rpx;
		/* #ifdef H5 */
		bottom: 160rpx;
		/* #endif */
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		transform: translateZ(0);
		-webkit-transform: translateZ(0);
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.fadeIn{
		animation: fadeIn 1s;
	}
	@keyframes fadeIn{
		0% {
		    opacity: 0;
		}
		100% {
		    opacity: 1;
		}
	}
</style>
