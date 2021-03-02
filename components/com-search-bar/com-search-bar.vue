<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-bar" :style="{'background':bgColor}">
			<view class="search-bar-body uni-flex">
				<text v-if="doBack" class="cuIcon-back padding-right f-18" @click="navBack"><span></span></text>
				<view class="search uni-flex" :style="{'background':searchBgColor}">
					<uni-icons :color="iconColor" class="icon" size="18" type="search" />
					<input class="input" confirm-type="search" :placeholder="placeholder" 
					:disabled="disabled"
					:style="{'color':inputColor}"
					:placeholder-class="placeholderColor"
					@input="inputVal"
					v-model="searchVal" 
					@confirm="search"
					focus="true"
					 />
					<view v-if="searchVal!==''" class="clear" @click="inputClear">
						<uni-icons :color="clearColor"  size="18" type="clear" />
					</view>
				</view>
				<text v-if="doText==true" class="ser-text" :style="{'color':rightTextColor}" @click="search">搜索</text>
			</view>
			<view class="search-bar-border" :style="{'background':searchBorder}"></view>
		</view>
		<!-- 历史记录 -->
		<view v-if="history&&historyVal.length&&showHistory" class="history-area">
			<view class="his-header uni-flex">
				<text class="text">搜索记录</text>
				<uni-icons class="icon" color="#999999"  size="18" type="trash" @click="historyClear" />
			</view>
			<view class="his-list">
				<text class="item" v-for="(v,i) in historyVal" :key="i" @click="historySearch(v)">{{v}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	/* 
	 @props {Arrary}   dataList=[]   数据列表
	 @props {Boolean}  disable=[false|true]  是否禁用输入框
	 @props {Boolean}  history=[false|true]  是否开启搜索历史功能
	 @props {String}  localKey='searchLocal'  历史记录存入localstorage的key值（用于不同类型的搜索）
	 @props {Boolean}  doBack=[false|true]  是否显示返回
	 @props {Boolean}  doText=[true|false]  是否显示右侧“搜索”文字
	 @props {String}  placeholder=请输入要查找的内容   placeholder文字
	 
	 颜色相关
	 @props {String}   bgColor='#ffffff'  搜索区域大背景色
	 @props {String}   searchBorder='#eee'  搜索区域底部边线颜色
	 @props {String}   searchBgColor="rgba(0,0,0,0.05)"   输入框主体背景色
	 @props {String}   inputColor='#333333'  input value颜色
	 @props {String}   iconColor='#999'  icon颜色
	 @props {String}   clearColor='#999'  右侧清除按钮颜色
	 @props {String}   placeholderColor=[placeholder-black|placeholder-white]   placeholder颜色
	 
	 @event {Function} search 执行搜索事件
	 @event {Function} clear 执行清空input事件
	 */
	export default {
		data() {
			return {
				searchVal:'',
				historyVal:[],
				historyTemp:[],
				showHistory:true
			}
		},
		props:{
			dataList:{
				type:Array,
				default(){
					return []
				}
			},
			localKey:{
				type:String,
				default:'searchLocal'
			},
			placeholder:{ //placeholder
				type:String,
				default:'请输入要查找的内容'
			},
			disabled:{ //是否禁用
				type:Boolean,
				default:false
			},
			history:{ //是否开启搜索历史
				type:Boolean,
				default:false
			},
			doBack:{ //是否显示左侧返回
				type:[Boolean,String],
				default:false
			},
			doText:{ //是否显示右侧搜索文字
				type:[Boolean,String],
				default:true
			},
			bgColor:{//整体区域背景色
				type:String,
				default:'#ffffff'
			},
			searchBorder:{//搜索区域底部边线颜色
				type:String,
				default:'#eee'
			},
			searchBgColor:{//搜索框背景色
				type:String,
				default:'rgba(0,0,0,0.05)'
			},
			inputColor:{//输入框字体颜色
				type:String,
				default:'#333333'
			},
			placeholderColor:{//placeholder颜色
				type:String,
				default:'placeholder-black'
			},
			iconColor:{//搜索图标颜色
				type:String,
				default:'#999'
			},
			rightTextColor:{//右侧文字颜色
				type:String,
				default:'#333'
			},
			clearColor:{//清除按钮颜色
				type:String,
				default:'#999'
			}
		},
		created() {
			uni.getStorage({
				key:`${this.localKey}`,
				success:res=>{
					this.historyVal=res.data;
					this.historyTemp=res.data
				},
				fail:error=>{
					console.log(error);
				}
			})
		},
		methods: {
			navBack(){
				uni.navigateBack();
			},
			async search(){
				let keyText=this.searchVal.trim();
				if(keyText==''){
					return uni.showToast({
						title:'请输入关键词',
						icon:'none'
					})
				};
				//数据查询
				this.showHistory=false;
				this.$emit('search',{keyWord:this.searchVal})
				//写入搜索历史
				this.historyTemp.unshift(keyText);
				let arrTemp=[...new Set(this.historyTemp)];
				this.historyVal=arrTemp.length>6?arrTemp.slice(0,6):arrTemp;
				uni.setStorage({
					key:`${this.localKey}`,
					data:this.historyVal
				})
			},
			historySearch(v){
				this.searchVal=v;
				this.search()
			},
			inputVal(){
				if(!this.searchVal){
					this.inputClear()
				}
			},
			inputClear(){//清除内容
				this.searchVal='';
				this.showHistory=true;
				this.$emit('clear')
			},
			historyClear(){//清除历史
				uni.showModal({
					title:'提示',
					content:'确定要清空您的搜索记录吗？',
					success: res=> {
						if (res.confirm) {
							uni.removeStorage({
							    key: `${this.localKey}`,
							    success: res=> {
							        this.historyVal=[]
							    },
								fail:error=>{
									uni.showToast({
										title:'删除搜索记录失败,请稍后重试',
										icon:'none'
									})
								}
							})
						}
					}	
				})
			}
		}
	}
</script>

<style scoped lang="scss">
/* 搜索框 */
.search-bar{
	position: relative;
	z-index: 996;
	background: #fff;
	.search-bar-body{
		padding: 20rpx 30rpx 20rpx 30rpx;
		align-items: center;
		position: relative;
		.ser-text{
			margin-left: 10rpx;
			padding:15rpx 0rpx 15rpx 30rpx;
		}
		.search{
			flex: 1;
			align-items: center;
			padding: 4rpx;
			border-radius: 72rpx;
			.icon{padding-left: 24rpx;}
			.placeholder-black{color:rgba(0,0,0,0.5)}
			.placeholder-white{color:rgba(255,255,255,0.8)}
			.input {
				padding: 0 30rpx 0 20rpx;
				font-size: 26rpx;
				width: 100%;
				color:#fff;
				height: 36rpx;overflow: hidden;
				line-height: normal;
			}
			.clear{
				padding: 0 16rpx;
			}
		}
	}
	.search-bar-border{
		height: 1px;
		transform: scaleY(0.5);
	}
}
/* 搜索历史 */
.history-area{
	padding: 30rpx;
	position: relative;
	.his-header{
		align-items: center;
		justify-content: space-between;
		.text{color:#999}
		.icon{padding: 0 0 0 24rpx;}
	}
	.his-list{
		display: flex;
		flex-wrap: wrap;
		position: relative;
		margin: 0 -15rpx;
		.item{
			position: relative;
			background: rgba(255,255,255,1);
			padding: 0 40rpx;
			height: 60rpx;line-height: 60rpx;
			border-radius: 60rpx;
			margin:30rpx 12rpx 0 12rpx;
			&::after{
				content:'';
				position:absolute;
				left:0;top:0;
				height: 200%;
				width: 200%;
				border:1px solid #ddd;
				transform: scale(0.5);
				transform-origin: 0 0;
				border-radius: 60rpx;
			}
		}
	}
}
</style>
