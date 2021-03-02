<template>
		  <view class="body">
		  <!-- topBar -->
	  <cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
	  	<block slot="backText">返回</block>
	  	<block slot="content">免责声明</block>		  		
	  </cu-custom>	
			<view class="padding main-box">
<view class="list-box">用户在接受服务之前，请务必仔细阅读本条款并同意本声明。</view>
<view class="list-box">第一条</view>

<view class="list-box">用户以各种方式使用本应用服务和数据(包括但不限于发表、宣传介绍、转载、浏览及利用本应用或本应用用户发布内容)的过程中，不得以任何方式利用本应用直接或间接从事违反中国法律、以及社会公德的行为，且用户应当恪守下述承诺：</view>
<view class="list-box">1. 发布、转载或提供的内容符合中国法律、社会公德;</view>
<view class="list-box">2. 不得干扰、损害和侵犯本应用的各种合法权利与利益;</view>
<view class="list-box">3. 遵守本应用以及与之相关的网络服务的协议、指导原则、管理细则等;</view>
<view class="list-box">本应用有权对违反上述承诺的内容予以删除。</view>
<view class="list-box">第二条</view>
<view class="list-box">1. 本应用仅为用户发布的内容提供存储空间，本应用不对用户发表、转载的内容提供任何形式的保证：不保证内容满足您的要求，不保证本应用的服务不会中断。因网络状况、通讯线路、第三方网站或管理部门的要求等任何原因而导致您不能正常使用豆瓣，本应用不承担任何法律责任。</view>
<view class="list-box">2. 用户在本应用发表的内容(包含但不限于本应用目前各产品功能里的内容)仅表明其个人的立场和观点，并不代表本应用的立场或观点。其中，「豆瓣一刻」App的订阅服务是仅为用户提供信息传播与分享的平台性服务。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。本应用不承担任何法律及连带责任。</view>
<view class="list-box">3. 用户在本应用发布侵犯他人知识产权或其他合法权益的内容，本应用有权予以删除，并保留移交司法机关处理的权利。</view>
<view class="list-box">4. 个人或单位如认为本应用上存在侵犯自身合法权益的内容，应准备好具有法律效应的证明材料，及时与本应用取得联系，以便本应用迅速做出处理。</view>
<view  class="list-box">对免责声明的解释、修改及更新权均属于本应用所有。</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.main-box{
	background:#fff;;
}
.list-box{
	text-indent: 2rem;
}
</style>
