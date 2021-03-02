<template>
	<view>
		<!-- topBar -->
		<cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">户籍信息{{topTit}}</block>
		</cu-custom>
		<!-- 现居住地 -->
		<view class="cu-form-group">
			<view class="title leftSide">现居住地：</view>
			<picker mode="multiSelector" data-id="living" @change="MultiChange" @columnchange="MultiColumnChange" :value="livingIndex" :range="livingArr">
				<view class="picker" v-if="livingIndex[0]!=-1">
					{{livingArr[0][livingIndex[0]]}} {{livingArr[1][livingIndex[1]]}}
				</view>
				<view class="picker" v-else>
					请选择现居住地
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">现居住地址：</view>
			<input placeholder="请输入现居住地址" v-model="info.residence_address" name="input" />
		</view>

		<!-- 现户籍 -->
		<view class="cu-form-group">
			<view class="title leftSide">现户籍地：</view>
			<picker mode="multiSelector" data-id="census" @change="MultiChange" @columnchange="MultiColumnChange" :value="censusIndex" :range="censusArr">
				<view class="picker" v-if="censusIndex[0]!=-1">
					{{censusArr[0][censusIndex[0]]}}，{{censusArr[1][censusIndex[1]]}}
				</view>
				<view class="picker" v-else>
					请选择现居住地
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">现户籍地址：</view>
			<input placeholder="请输入现户籍地址" v-model="info.registered_address" name="input" />
		</view>

		<!-- 原户籍 -->
		<view class="cu-form-group">
			<view class="title leftSide">原户籍地：</view>
			<picker mode="multiSelector" data-id="oldCensus" @change="MultiChange" @columnchange="MultiColumnChange" :value="oldCensusIndex" :range="oldCensusArr">
				<view class="picker" v-if="oldCensusIndex[0]!=-1">
					{{oldCensusArr[0][oldCensusIndex[0]]}}，{{oldCensusArr[1][oldCensusIndex[1]]}}
				</view>
				<view class="picker" v-else>
					请选择现居住地
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title leftSide">原户籍地址：</view>
			<input placeholder="请输入原户籍地址" v-model="info.original_address" name="input" />
		</view>
		<button class="cu-btn block bg-blue margin lg" @tap="save">提交</button>
	</view>
</template>
<script>
	import cityData from '../../../common/data.js'
	export default {
		data() {
			return {
				topTit:'',
				info:{
					// id:'', // 如果是添加 ，这里不接收到id
					// mem_id:"", //（关联用户id）
					// residence_province:"", //（现住地省份）
					// residence_city:"",  //（现住地城市）
					// residence_address:"",  //（现住地详细地址）
					// registered_province:"",  //（户籍所在地省份）
					// registered_city:"",  //（户籍所在地城市）
					// registered_address:"",  //（户籍所在地详细地址）
					// original_province:"",  //（原户籍省份）
					// original_city:"",  //（原户籍城市）
					// original_address:"",  //（原户籍详细地址）
				},
				// 户籍所在地
				censusIndex: [-1, -1],
				censusArr: [[],[]],
				// 原户籍所在地
				oldCensusIndex: [-1, -1],
				oldCensusArr: [[],[]],
				// 现居住地
				livingIndex: [-1, -1],
				livingArr: [[],[]]
			}
		},
		methods: {
			// picker change
			MultiChange(e) {
				switch (e.currentTarget.dataset.id) {
					case 'living':
						this.livingIndex = e.detail.value
						break;
					case 'census':
						this.censusIndex = e.detail.value
						break;
					case 'oldCensus':
						this.oldCensusIndex = e.detail.value
						break;
				}
				
			},
			// picker column
			MultiColumnChange(e) {
				console.log(e.currentTarget.dataset.id);
				// let data = '';
				switch (e.currentTarget.dataset.id) {
					case 'living':
						var datap = {
							arr: this.livingArr,
							index: this.livingIndex
						}
						datap.index[e.detail.column] = e.detail.value;
						if (e.detail.column == 0) {//如果选择的是第一列
							// console.log(this.censusArr[0][e.detail.value]); // '北京市'
							cityData.map((ele)=>{
								if(ele.name == this.livingArr[0][e.detail.value]){
									this.livingArr[1] = ele.city[0].area
								}
							})
							datap.index[1] = 0;
						}
						this.livingArr = datap.arr;
						this.livingIndex = datap.index;
						break;
					case 'census':
						var data = {
							arr: this.censusArr,
							index: this.censusIndex
						}
						data.index[e.detail.column] = e.detail.value;
						if (e.detail.column == 0) {//如果选择的是第一列
							// console.log(this.censusArr[0][e.detail.value]); // '北京市'
							cityData.map((ele)=>{
								if(ele.name == this.censusArr[0][e.detail.value]){
									this.censusArr[1] = ele.city[0].area
								}
							})
							data.index[1] = 0;
						}
						this.censusArr = data.arr;
						this.censusIndex = data.index;
						break;
					case 'oldCensus':
						var data = {
							arr: this.oldCensusArr,
							index: this.oldCensusIndex
						}
						data.index[e.detail.column] = e.detail.value;
						if (e.detail.column == 0) {//如果选择的是第一列
							// console.log(this.censusArr[0][e.detail.value]); // '北京市'
							cityData.map((ele)=>{
								if(ele.name == this.oldCensusArr[0][e.detail.value]){
									this.oldCensusArr[1] = ele.city[0].area
								}
							})
							data.index[1] = 0;
						}
						this.oldCensusArr = data.arr;
						this.oldCensusIndex = data.index;
						break;
				}
			},
			async save(){
				var sendData = {
					mem_id:this.info.mem_id,
					// 现居住地
					residence_province:this.livingIndex[0]==-1?'':this.livingArr[0][this.livingIndex[0]],
					residence_city:this.livingIndex[1]==-1?'':this.livingArr[1][this.livingIndex[1]],
					residence_address:this.info.residence_address,
					// 现户籍
					registered_province:this.censusIndex[0]==-1?'':this.censusArr[0][this.censusIndex[0]],
					registered_city:this.censusIndex[1]==-1?'':this.censusArr[1][this.censusIndex[1]],
					registered_address:this.info.registered_address,
					// 原户籍
					original_province:this.oldCensusIndex[0]==-1?'':this.oldCensusArr[0][this.oldCensusIndex[0]],
					original_city:this.oldCensusIndex[1]==-1?'':this.oldCensusArr[1][this.oldCensusIndex[1]],
					original_address:this.info.original_address,
				}
				if (this.topTit == '修改') { // 如果是修改，需要追加上id
					sendData.id = this.info.id
				}
				console.log('传参');
				console.log(sendData);
				const {data:res} = await this.$http({
					url:'/targetmanage.native_placepost.phtml',
					method:'POST',
					data: sendData
				});
				console.log(res);
				if (res.success == 'true') {
					uni.showToast({
						title: this.topTit + "成功",
						icon: 'none',
					});
					uni.navigateBack({})
				}
			},
		},
		onLoad(options){
			this.info = JSON.parse(options.info) 
			console.log(this.info.id);
			if (this.$rules.isNull(this.info.id)) {
				this.topTit = '增加'
			}else{
				this.topTit = '修改'
			}
			// 如果现居住地值不为空，对picker回显赋值,否则将北京市数据注入现居住地数组livingArr，供用户选择
			if (this.$rules.isNull(this.info.residence_province)) { 
				cityData.map((ele)=>{
					this.livingArr[0].push(ele.name)
				})
				this.livingArr[1]=cityData[0].city[0].area
			}else{
				cityData.map((ele,index)=>{
					this.livingArr[0].push(ele.name)
					if (this.info.residence_province == ele.name) {
						this.livingIndex[0]=index // 将省份数据回显赋值
						this.livingArr[1] = cityData[index].city[0].area
						this.livingArr[1].map((cle,i)=>{
							if (this.info.residence_city == cle) {
								this.livingIndex[1]=i // 将城市数据回显赋值
							}
						})
					}
				})
			}

			// 如果现户籍值不为空，对picker回显赋值,否则将北京市数据注入现户籍数组censusArr，供用户选择
			if (this.$rules.isNull(this.info.registered_province)) { 
				cityData.map((ele)=>{
					this.censusArr[0].push(ele.name)
				})
				this.censusArr[1]=cityData[0].city[0].area
			}else{
				cityData.map((ele,index)=>{
					this.censusArr[0].push(ele.name)
					if (this.info.registered_province == ele.name) {
						this.censusIndex[0]=index // 将省份数据回显赋值
						this.censusArr[1] = cityData[index].city[0].area
						this.censusArr[1].map((cle,i)=>{
							if (this.info.registered_city == cle) {
								this.censusIndex[1]=i // 将城市数据回显赋值
							}
						})
					}
				})
			}

console.log(this.info.original_province);
console.log(this.info.original_city);
			// 如果原户籍值不为空，对picker回显赋值,否则将北京市数据注入原户籍数组oldCensusArr，供用户选择
			if (this.$rules.isNull(this.info.original_province)) { 
				cityData.map((ele)=>{
					this.oldCensusArr[0].push(ele.name)
				})
				this.oldCensusArr[1]=cityData[0].city[0].area
			}else{
				cityData.map((ele,index)=>{
					this.oldCensusArr[0].push(ele.name)
					if (this.info.original_province == ele.name) {
						this.oldCensusIndex[0]=index // 将省份数据回显赋值
						this.oldCensusArr[1] = cityData[index].city[0].area
						this.oldCensusArr[1].map((cle,i)=>{
							if (this.info.original_city == cle) {
								this.oldCensusIndex[1]=i // 将城市数据回显赋值
							}
						})
					}
				})
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
	}
</style>