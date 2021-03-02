<template>	
	  <view class="body">
		  <!-- topBar -->
	  <cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
	  	<block slot="backText">返回</block>
	  	<block slot="content">我有话说</block>		  		
	  </cu-custom>	
	  	  <view class="cu-item shadow">
		  <view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item" >						
						<view class="content">
							<view class="text-cut">标题</view>
							<view class="text-gray text-content text-df">
								{{detaiData.info_title}}
							</view>	
							<view class="text-cut">内容</view>
							<view class="text-gray text-content text-df">
								{{detaiData.info_content}}
							</view>		
								<view class="text-cut">提交时间</view>
							<view class="text-gray text-content text-df">
								{{detaiData.sender_time|formatDate}}
							</view>					
							
						</view>
					</view>				
				</view>		
	  </view>
	  	<!--回复内容  -->
	  	<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue"></text> 受理回复
				</view>
			</view>
			<view class="cu-item shadow" v-for="(item,index) in replyList" :key="index">
		  <view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item" >						
						<view class="content">
							<view class="text-cut">回复时间</view>
							<view class="text-gray text-content text-df">
							{{item.reply_time|formatDate}}
							</view>	
							<view class="text-cut">回复内容</view>
							<view class="text-gray text-content text-df">
							{{item.reply_content}}
							</view>										
							
						</view>
					</view>				
				</view>		
	  </view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detaiData:{},	
				replyList:[],					
			    infoId:''
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
		onLoad(options) {					
			this.infoId=options.info_id;
			console.log(this.infoId);
			this.getDetail();	
			
		},		
		methods: {			    
				async getDetail(){				
				const {data:res}=await this.$http({url:`/49.infoswap.getInfoswapdetail.phtml?info_id=` + this.infoId});					
			    this.detaiData=res.infoswap;									
				this.replyList=res.replylist;		  
              	
						
			}			
		},		
	}

	
</script>

<style>
.cu-list.menu-avatar.comment>.cu-item{
	padding:15px;
}
.solids-top::after{
	border-top:1px solid #eee;
}
</style>
