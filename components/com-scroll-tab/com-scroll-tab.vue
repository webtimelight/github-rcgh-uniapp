<template>
	<view>
		<!-- 色块胶囊风格 -->
		<view v-if="template=='block'" :class="'template-'+template">
			<!-- 块状风格 -->
			<view class="scroll-tabs" :class="showMore?'':'limit'">
				<view class="tabs-wrap">
					<scroll-view  class="tab-list" scroll-x :scroll-left="scrollLeft" scroll-with-animation="ture">
						<view v-for="(nav,index) in dataList" :key="index" class="tab-item" 
						:style="[{color:value==index ?blockActiveColor:blockDefaultColor}]"
						@click="tapNav(index)">
							<view class="item-text" :class="value==index?'text-bold':''" :style="[{backgroundColor:value==index ?blockActiveBgColor:blockDefaultBgColor},{borderRadius:blockRadius+'rpx'}]">
								{{field?nav[field]:nav}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-if="showMore&&isShowMore" class="menu-more"  @click="openMenu">
					<view class="icon iconfont icon-menu"></view>
				</view>
			</view>
		</view>	
		<!-- 下划线简单风格（默认） -->
		<view v-else  :class="'template-'+template">
			<!-- 标签风格 -->
			<view class="scroll-tabs" :class="showMore?'':'limit'">
				<view class="tabs-wrap">
					<scroll-view  class="tab-list" scroll-x :scroll-left="scrollLeft" scroll-with-animation="ture">
						<view v-for="(nav,index) in dataList" :key="index" class="tab-item" 
						:style="{color:value==index ?activeColor:''}"
						@click="tapNav(index)">
							<view class="item-text" :class="value==index?'text-bold':''" :style="{'border-color':value==index ?activeColor:''}">
								{{field?nav[field]:nav}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-if="showMore&&isShowMore" class="menu-more"  @click="openMenu">
					<view class="icon iconfont icon-menu2"></view>
				</view>
			</view>
		</view>	
		<!-- 全部菜单 -->
		<uni-popup ref="popup" type="top">
			<view class="status_bar"></view>
			<uni-nav-bar title="全部类别">
				<view slot="right" @click="closeMenu">
					<uni-icons type="closeempty" size="24"></uni-icons>
				</view>
			</uni-nav-bar>
			<view class="popup-body">
				<view class="tip">
					点击切换类别
				</view>
				<view class="nav-list">
					<view v-for="(nav,index) in dataList" :key="index"  :class="['nav-list-item',value==index?'active':'']">
						<view class="label uni-ellipsis" @click="tapNav(index);closeMenu()">{{field?nav[field]:nav}}</view>
					</view>
				</view>	
			</view>
		</uni-popup>
	</view>
</template>

<script>
	/*
	*@props {Array} 数据 :dataList 
	*@props {String} 显示tab标题的字段： field (如果返回值是['中国','美国']不写该属性 || 如果返回值是对象[{id:1,name:'中国'},{id:2,name:'美国'}]需填写该字段，field="name")
	*@props {String,Number}  当前nav激活项   value='0'【开启了双向绑定v-model】
	*@props {Boolean}  是否显示右侧更多按钮  isShowMore=false
	* 
	*@props {String} 主题风格  template='label'||'block'
	* 
	* ------------template='label'可配置以下属性---------
	*@props {String} 激活颜色  activeColor='#e32519'
	*@props {String} 默认颜色  defaultColor='#555'
	* 
	* ------------template='block'可配置以下属性---------
	*@props {String} 激活背景颜色  blockActiveBgColor='#f37b1d'
	*@props {String} 激活字体颜色  blockActiveColor='#ffffff'
	*@props {String} 默认背景颜色  blockDefaultBgColor='#f4f4f4'
	*@props {String} 默认字体颜色  blockDefaultColor='#ffffff'
	
	*@event {Function} 选项卡激活状态改变   @change 
	*/
	
	export default {
		data() {
			return {
				scrollLeft:0,
				wrapWidth:0,
				showMore:false
			}
		},
		props:{
			dataList:{
				type:Array
			},
			field:{
				//tab字段
				type:String,
				default:''
			},
			isShowMore:{
				//是否显示右侧更多按钮
				type:[Boolean,String],
				default:false
			},
			value:{
				//当前项
				type:[String,Number],
				default:0
			},
			activeColor:{
				// 激活颜色
				type:String,
				default:'#e32519'
			},
			template:{
				// tab风格
				type:String,
				default:'label'
			},
			blockActiveBgColor:{
				type:String,
				default:'#f37b1d'
			},
			blockActiveColor:{
				type:String,
				default:'#ffffff'
			},
			blockDefaultBgColor:{
				type:String,
				default:'#f4f4f4'
			},
			blockDefaultColor:{
				type:String,
				default:'#555'
			},
			blockRadius:{
				type:String,
				default:'10'
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.refreshPosition()
			})
		},
		watch:{
			dataList(){
				this.refreshPosition()
			},
			value(val){
				this.refreshPosition();
				this.$emit('change',val)
			}
		},
		methods: {
			//点击切换
			tapNav(cur){
				this.$emit('input', cur)//props的双向绑定
			},
			//弹出全部tab菜单
			openMenu() {
				this.$refs.popup.open();
			},
			closeMenu() {
				this.$refs.popup.close();
			},
			//tab激活定位
			refreshPosition() {
			  this.$nextTick(() => {
			    const query = () => uni.createSelectorQuery().in(this);
				let contentWidth = 0;
			    query().select('.tabs-wrap').boundingClientRect().exec(([viewElem]) => {
			      const viewWidth = viewElem.width;
			      let offsetLeft = 0;
			      let curNavWidth = 0;
			      query().selectAll('.tab-item').boundingClientRect().exec(([list]) => {
			        list.forEach((item, index) => {
			          if (index <= this.value) {
			            curNavWidth = item.width;
			            offsetLeft += item.width;
			          }
			          contentWidth += item.width;
			        });
			        offsetLeft -= curNavWidth;
			        this.scrollLeft = Math.min(Math.max(contentWidth - viewWidth, 0), Math.max(0, offsetLeft - (viewWidth - curNavWidth) / 2));
			      });
			    });
				/* 如果菜单宽度大于容器宽度,显示更多按钮 */
				query().select('.scroll-tabs').boundingClientRect().exec(data=>{
					this.wrapWidth=data[0].width
				})
				if(contentWidth>this.wrapWidth){
					this.showMore=true
				};
			  });
			}
		}
	}
</script>

<style scoped lang="scss">
/* 色块胶囊风格 */		
.template-block{
	/* menu更多按钮*/
	.menu-more{
		margin:0 30rpx 0 20rpx;
		background: #f4f4f4;
		height: 86rpx;
		overflow: hidden;
		padding:0 18rpx;
		border-radius: 10rpx;
		.icon{
			color: #f37b1d;line-height: 86rpx;font-size: 40rpx;
		}
	}
	.scroll-tabs {
		position: relative;
		z-index: 1;//防止被swiper遮盖
		display: flex;
		align-items: center;
		.tabs-wrap {
			flex: 1;
			overflow: hidden;
			.tab-list{
				white-space: nowrap;
				.tab-item {
					width: auto;
					height: 100%;
					padding: 0 10rpx;
					display: inline-block;
					.item-text {
						padding: 0 30rpx;
						display: block;
						line-height: 86rpx;
						font-size: 28rpx;
					}
					&.active .item-text{
						font-weight: bold;
					}
					&:first-child{
						padding-left: 0;
					}
					&:last-child{
						padding-right: 0;
					}
				}
			}
		}
		&.limit{ /* 菜单总和未超出容器宽度 */
			/deep/ .uni-scroll-view-content{
				display: flex;
				justify-content: center;
			}
			.tab-list {
				text-align: center;
				.tab-item{padding: 0 30rpx!important;}
			}
		}
	}
}	

/* 下划线简单风格 */	
.template-label{
	/* menu更多按钮*/
	.menu-more{
		display:inline-block;
		padding: 0 30rpx;
		line-height: 100rpx;
		cursor: pointer;
	}
	.scroll-tabs {
		position: relative;
		z-index: 1;//防止被swiper遮盖
		display: flex;
		align-items: center;
		background: #fff;
		box-shadow: 0 6rpx 6rpx rgba(0,0,0,0.06);
		.tabs-wrap {
			flex: 1;
			overflow: hidden;
			.tab-list{
				white-space: nowrap;
				.tab-item {
					width: auto;
					height: 100%;
					padding: 0 30rpx;
					display: inline-block;
					.item-text {
						line-height: 94rpx;
						border-bottom: 6rpx solid transparent;
						font-size: 30rpx;
					}
					&.active .item-text{
						font-weight: bold;
					}
				}
			}
		}
		&.limit{ /* 菜单总和未超出容器宽度 */
			/deep/ .uni-scroll-view-content{
				justify-content: center;
			}
			.tab-list {
				text-align: center;
				.tab-item{padding: 0 60rpx;}
			}
		}
	}
}	

	
/* 弹窗 */
.uni-popup {z-index: 9999;}
/deep/ .uni-popup .uni-transition{height:100%}
/deep/ .uni-popup__wrapper-box{background: #fff;/* height: 100% */}
.popup-body{
	.tip{padding-left:40rpx;color:#999;padding-top:40rpx;}
}
/* 弹窗内列表 */
.nav-list {
	background: #fff;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
	padding:20rpx 20rpx 40rpx 20rpx;
	.nav-list-item {
		box-sizing: border-box;flex:  0 0 50%;overflow: hidden;text-align: center;padding: 20rpx 20rpx;
		.label {
			line-height: 90rpx;background: #f5f5f5;border-radius: 4px;padding: 0 20rpx;
		}
		&.active .label{
			background-color:#f37b1d;color:#fff
		}
	}

}
</style>
