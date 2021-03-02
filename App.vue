<script>
import Vue from 'vue';
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				};
				// #endif
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif       
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* uni */
@import url('@/common/css/uni.css');
/* colorui */
@import url('@/common/colorui/main.css');
@import url('@/common/colorui/icon.css');
@import url('@/common/colorui/animation.css');
/* ext */
@import url('@/common/css/animate.min.css');
@import url('@/common/css/fontAwesome.css');
@import url('@/common/css/iconfont.css');
@import url('@/common/css/iconfont-color.css');
@import url('@/common/css/common.css');
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {font-family: uniicons;src: url('/static/uni.ttf')}
/* #endif */

/* 全局设置字体 */
page{background: #f6f6f6;font-family: geometr,uniicons}
.status_bar {height: var(--status-bar-height);width: 100%;}

/* tabbar样式修改 */
.uni-app--showtabbar uni-page-wrapper{
	height: calc(100% - 50px - env(safe-area-inset-bottom));
	&::after{
		height: calc(50px + env(safe-area-inset-bottom));
	}
}
.uni-tabbar {
	.uni-tabbar-border{
		background: rgba(0, 0, 0, 0.13)!important;
		box-shadow: 0 -3rpx 16rpx rgba(0, 0, 0, 0.23);
	}
	.uni-tabbar__icon{margin-top:0!important}
	.uni-tabbar__item:nth-child(3){
		z-index: 2;position: relative;
		.uni-tabbar__bd{
			width: 100%;
			.uni-tabbar__label{
				height: 82rpx;width: 100%;
				line-height: 128rpx!important;
				background: #ffffff;
				position: absolute;
				bottom:0px;
			}
			.uni-tabbar__icon{
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0;
				z-index: 2;
				position: relative;
				top:-38rpx;
				width: 78rpx!important;height: 78rpx!important;
				border-radius: 50%;
				/* background-color: #0081ff; */
				background-image: linear-gradient(45deg, #0081ff, #0042ff);
				&::before{
					content: "";
					display: block;
					background: inherit;
					filter: blur(6rpx);
					position: absolute;
					width: 100%;
					height: 100%;
					top: 3rpx;
					left: 3rpx;
					z-index: -1;
					opacity: 0.5;
					transform-origin: 0 0;
					border-radius: inherit;
					transform: scale(1, 1);
				}
				img{
					width: 48rpx;height: 48rpx;
				}
			}
			&::after{
				content: "";
				background-color: #ffffff;
				position: absolute;
				width: 230rpx;
				height: 230rpx;
				top: -42rpx;
				left: 0;
				right: 0;
				margin: auto;
				// border:1px solid rgba(0, 0, 0, 0.33);
				box-shadow: 0 -3rpx 16rpx rgba(0, 0, 0, 0.13);
				border-radius: 50%;
				transform: scale(0.5);
				transform-origin: center top;
				z-index: -1;
			}	
		}
	}
}
</style>
