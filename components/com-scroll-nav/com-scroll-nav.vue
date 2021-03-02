<template>
	<!-- 分类菜单 -->
	<view class="top-nav"  v-if="dataList.length>1" :class="dataList.length<4?'limit':''">
		<view class="nav-menu">
			<scroll-view  class="uni-swiper-tab" scroll-x :scroll-left="(activeItem-1)<0?0:(activeItem-1)*100"
			 scroll-with-animation="ture">
				<view v-for="(nav,index) in dataList" :key="index" 
				class="swiper-tab-list" 
				:style="{color:activeItem==index ?activeColor:''}"
				@click="tapNav(index)">
					<view class="item" :style="{'border-color':activeItem==index ?activeColor:''}">
						{{field?nav[field]:nav}}
					</view>
				</view>
			</scroll-view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	/*
	*@props {Array} 数据 :dataList 
	*@props {String} 显示tab标题的字段： field (如果返回值是['中国','美国']不写该属性 || 如果返回值是对象[{id:1,name:'中国'},{id:2,name:'美国'}]需填写该字段，field="name")
	*@props {String,Number} 当前nav激活项   :activeItem='0'
	*@props {String,Number} 激活颜色 activeColor='#e32519'
	*@slot 匿名右侧是否有更多链接
	*@methods 点击切换项   @navClick 
	*/
	
	export default {
		data() {
			return {
			}
		},
		props:{
			dataList:{
				type:Array
			},
			field:{
				type:String,
				default:''
			},
			activeItem:{
				//当前项
				type:[String,Number],
				default:0
			},
			activeColor:{
				// 激活颜色
				type:String,
				default:'#e32519'
			}
		},
		methods: {
			tapNav(i){
				this.$emit('navClick',i)
			}
		}
	}
</script>

<style scoped lang="scss">
/* menu*/
	.top-nav {
		position: relative;
		z-index: 1;//防止被swiper遮盖
		display: flex;
		align-items: center;
		background: #fff;
		box-shadow: 0 6rpx 6rpx rgba(0,0,0,0.06);
		// &:after{
		// 	content: '';
		// 	position: absolute;
		// 	left:0;right:0;height:1px;
		// 	bottom:0;
		// 	background: #ddd;
		// 	transform: scaleY(0.5);
		// }
		.nav-menu {
			flex: 1;
			overflow: hidden;
		}
		.nav-more {
			padding: 0 30rpx;
		}
		.uni-swiper-tab {
			line-height: 0;
			border: 0 none;
			flex: 1
		}
		/deep/ .uni-scroll-view-content{
			display: flex;
		}
		.swiper-tab-list {
			width: auto;
			height: 100%;
			padding: 0 50rpx;
			.item {
				line-height: 94rpx;
				display: inline-block;
				height: 94rpx;
				border-bottom: 6rpx solid transparent;
				font-size: 30rpx;
			}
			&.active .item{
				font-weight: bold;
			}
		}
		&.limit{ /* 菜单大于1少于3个特殊处理,居中,间距变大 */
			/deep/ .uni-scroll-view-content{
				justify-content: center;
			}
			.swiper-tab-list {
				padding: 0 60rpx;
			}
		}
	}
</style>
