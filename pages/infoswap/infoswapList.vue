<template>
	<view class="body">
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我有话说</block>
		</cu-custom>
		<view class="cu-item shadow">
			<view class="cu-list menu-avatar comment solids-top" v-for="(item,index) in infoList" :key="index" @click="goDetail(item)">
				<view class="cu-item">					
					<view class="content">
						<view>
							<view class="text-cut wid90">{{item.info_title}}</view>
						<view class="state-box bg-red" v-if="item.numsc==0">未回复</view>
					    <view class="state-box bg-green" v-if="item.numsc!==0">已回复</view>	
						</view>						
						
						<view class="text-gray text-content text-df margin-top">
							{{item.info_content}}
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray cuIcon-time margin-right-xs">{{item.sender_time|formatDate}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	<!-- 上拉加载 -->
				<view class="loadmore text-grey" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoList: [],
				infoState:'',
				page: 1,
				totalpage:'',
				loadMoreText:"加载中...", //上拉加载的文字内容
				showLoadMore:false,  //上拉加载的状态
			}
		},
		methods: {
			async getInfoList() {
				const {data:res} = await this.$http({url: `/49.infoswap.getInfoswapList.phtml?page=`+ this.page});									
				// 将总页数赋值到 this.totalpage
				this.totalpage = res.page.totalpage;
				console.log(res.page.totalpage);
				if (res.list.length == 0) {
									this.loadMoreText = '暂无数据'
									this.showLoadMore = true
									return false
								}
				// 如果是当前是第一页，则直接赋值，如果小于总页数，则进行连接数据，如果没有数据，则提示用户没有更多了
				if (this.page == 1) {
				this.infoList = res.list;
					} else if(this.page <= this.totalpage) {
									this.infoList = this.infoList.concat(res.list)
								}
								console.log(this.infoList)
			},
			//页面跳转-信息详情
			goDetail(e) {
				console.log(e.numsc);
				if(e.numsc==0){
					uni.showToast({
						title:"暂未回复",
						icon: 'none',
					});
					}else{				
				uni.navigateTo({
					url: `/pages/infoswap/infoswapDetail?info_id=${e.info_id}`
				})
				}
			}	
		},
		filters: {
			formatDate(time) {
				var now = new Date(time.time);
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				var hour = now.getHours();
				var minute = now.getMinutes();
				var second = now.getSeconds();
				// return   year+"-"+month+"-"+date; //+"   "+hour+":"+minute+":"+second;
				return year + "年" + month + "月" + date + "日"; //+"   "+hour+":"+minute+":"+second;   
			}
		},
		onLoad() {
			this.getInfoList();
			uni.stopPullDownRefresh();
	
		},
		//生命周期函数，监听页面卸载
		onUnload() {
			this.infoList = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getInfoList();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom(){
			console.log("上拉加载");
			this.page ++
			if(this.page > this.totalpage){
				this.loadMoreText = "--我是有底线的--"
				return;
			}
			this.showLoadMore = true;
			//执行上拉加载的方法
			setTimeout(() => {
				this.getInfoList()
			}, 300);
		}


	}
</script>

<style>
	.cu-list.menu-avatar.comment>.cu-item {
		padding: 15px;
	}

	.cu-list.menu-avatar.comment>.cu-item .cuIcon-time {
		font-size: 13px;
	}
	.state-box{
		width: 60px;		
		font-size: 12px!important;
		text-align: center;
		float: right;
		border-radius: 6px;
		height: 26px;
		line-height:26px;
	}
	.wid90{
		width: 90%;
	}
	.loadmore{
		text-align: center;
		padding:10px 0;
	}
</style>
