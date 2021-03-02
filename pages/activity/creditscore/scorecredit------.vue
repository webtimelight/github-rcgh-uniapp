<template>
  <view class="body">
	  <cu-custom bgColor="bg-gradual-uc" class="bg-gradual-uc" :isBack="true">
	  	<block slot="backText">返回</block>
	  	<block slot="content">补充申报</block>
	  </cu-custom>
    <form>
      <view class="cu-form-group margin-top">
        <view class="title">姓名：</view>
        <input disabled="true" v-model="addressData.name" class="text" name="input" value=""></input>
      </view>
      <view class="cu-form-group">
        <view class="title">身份证号:</view>
        <input disabled="true" v-model="addressData.mobile" class="text" name="input" ></input>
      </view>
      <view class="cu-form-group">
	
        <view class="title">信息属性：<font color="red" style="margin-left: 5px;">*</font></view>
        <picker @change="Massage" :value="index" :range="picker">
          <view class="picker" @click="index1()">
		
            {{index>-1?picker[index]:'请选择'}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">指标类别：<font color="red" style="margin-left: 5px;">*</font></view>
        <picker @change="Targen" :value="multiIndex":value2="Category[multiIndex]" :range="multiArray">
          <view class="picker" @click="pick()">
            {{multiIndex>-1?multiArray[multiIndex]:'请选择'}}
          </view>
        </picker>
      </view>
	  <view class="cu-form-group">
	    <view class="title">指标名称：<font color="red" style="margin-left: 5px;">*</font></view>
	    <picker @change="Targen2" onchange="targetname(this.Category2[nameIndex])" :value="nameIndex" :value3="Category2[nameIndex]" :range="indexname">
	      <view class="picker" @click="pick2()">
	        {{nameIndex>-1?indexname[nameIndex]:'请选择'}}
	      </view>
	    </picker>
	  </view>
	  <view class="cu-form-group" :style="{'display':isdisplay1 ? 'block':'none'}">
	    <view class="title">请选择成绩：<font color="red" style="margin-left: 5px;">*</font></view>
	    <picker @change="Targen3"  :value="nameIndex1" :value4="Category3[nameIndex1]" :range="indexname1">
	      <view class="picker" @click="pick3()" >
	        {{nameIndex1>-1?indexname1[nameIndex1]:'请选择'}}
	      </view>
	    </picker>
	  </view>
	  
	  <view class="cu-form-group " ref="cc"  :style="{'display':isdisplay ? 'block':'none'}">
	    <view class="hhh">{{msg}}<font color="red" style="margin-left: 5px;">*</font></view>
	    <!-- <input   :value5="inputa" name="input" ></input> -->
		 <input type="hidden"  v-model="inputa" name="input" placeholder="请输入条件"></input>
		
		<!-- <input class="text" placeholder="请输入您的身份证号" name="input" ></input> -->
		<!-- <input class="text" placeholder="请输入您的身份证号" name="input" ></input> -->
	  </view>
      <view class="uni-form-item uni-column">
        <view class="title">事件描述：</view>
        <textarea class="text2" v-model="addressData.describe" maxlength="-1" :disabled="modalName!=null"  placeholder="请输入事件描述"></textarea>
      </view>
	  </form>
  
        <view class="cu-bar bg-white margin-top">
        	<view class="action">
        		证明材料：
        	</view>
        	<view class="action">
        		{{imgList.length}}/4
        	</view>
        </view>
       <view class="cu-form-group">
        	<view class="grid col-4 grid-square flex-sub">
        		<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
        		 <image :src="imgList[index]" mode="aspectFill"></image>
        			<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
        				<text class='cuIcon-close'></text>
        			</view>
        		</view>
        		<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
        			<text class='cuIcon-cameraadd'></text>
        		</view>
        	</view>
			</view>
        
      <form>
      <view class="cu-form-group">
        <view class="title">事件发生日期：<font color="red" style="margin-left: 5px;">*</font></view>
        <picker @change="HappenDate" mode="date" :value="date" :start="startDate" :end="endDate" >
          <view class="picker">
            {{date}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group duedate">
        <view class="title">事件到期日期：<font color="red" style="margin-left: 5px;">*</font></view>
        <picker @change="DueDate" mode="date" :value="ddate" :start="startDate" :end="endDate">
          <view class="picker">
            {{ddate}}
          </view>
        </picker>
      </view>
	  <view class="cu-form-group duedate align-start">
	    <view class="title">备注：</view>
	    <textarea v-model="addressData.beizhu" class="text"  name="input" value=""></textarea>
	  </view>
    </form>
    <view class="margin-tb-sm text-center">
      <button class="cu-btn" @click="submit()">提交</button>

    </view>
  </view>
</template>

<script>
export default {
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      date: currentDate,
      ddate: currentDate,
      index: -1,
      picker: ['守信信息', '失信信息',],
      modalName: null,
      multiArray: [],
      multiIndex: [],
	  nameIndex:[],
	  indexname:[],
	  Category:[],
	  Category2:[],
	  Category3:[],
	  msg:"",
	  inputa:"",
	  quantification_type:"",
	  isdisplay:false,
	  isdisplay1:false,
	  nameIndex1:[],
	  indexname1:[],
	  imgList: [],
	  
	  addressData:{
	  	  name:"",
	  	  mobile:"",
	  	  beizhu:"",
	  	  describe:"",
		  
	    
	  },
	  all:{reviewer_state:"0",submit_type:"2",quantification_type:"",quantification_value:"",
	  target_score:"",imglist:"",bz:"",name:"",identitycard:"",
	  mem_id:"",start_time:"",end_time:"",describes:"",attribute:"",
	  category:"",target_name:"",
	  },
    }
  },
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end'); 
    }
  },
  	onLoad(options){
  			
  			this.getNewsDetail()
  			this.id = options.id
  		     console.log(options.id);
  		},
  methods: {
	  validateForm(){
	  	let msg = "";
	  	if(this.index==-1){
	  		msg = "请选择信息属性";
	  	}else if(this.all.category == "" || this.all.category == undefined){
			msg = "请选择指标类别";
		}else if(this.all.target_name == "" || this.all.target_name == undefined){
			msg = "请选择指标名称";
		}
		else if(this.all.quantification_value == "" || this.all.quantification_value == undefined){
			msg = "请选择成绩或者请输入条件";
		}
		else if(this.start_time == "" || this.end_time == "" ){
	  		msg = "请选择开始和结束时间";
	  	}
	  	if(msg != ""){
	  		uni.showToast({
	  			title: msg,
	  			icon: 'none'
	  		});
	  		return false;
	  	}
	  	return true;
	  },
	  async submit(){
		 if(this.Category3[this.nameIndex1]==""||this.Category3[this.nameIndex1]==null || this.Category3[this.nameIndex1]==undefined){
     		this.all.quantification_value=this.inputa
    	}else{
    	 this.all.quantification_value=this.Category3[this.nameIndex1]
   	 	}
		  // this.quantification_type=res.data.success[0].quantification_type
		  
		//   this.all.quantification_value=this.Category3[this.nameIndex1]
		  this.all.target_name=this.Category2[this.nameIndex]
		  this.all.category=this.Category[this.multiIndex]
		  this.all.describes=this.addressData.describe
		  this.all.start_time=this.date
		  this.all.end_time=this.ddate
		  this.all.imglist=this.imgList
		  this.all.bz=this.addressData.beizhu
		  this.all.name=this.addressData.name
		  this.all.identitycard=this.addressData.mobile
		  console.log(this.all.quantification_value)
		  console.log(this.all)
		  if(this.validateForm()){
			  console.log(this.all)
			  return
		   const {data:res}=await this.$http({
		   	    	url:`/targetmanage.targetnaturaldeclarepost.phtml`,
					data: this.all,
		           method: 'POST',
		   	    });
				if(res.success == "true"){
					uni.showModal({
						title: '提示',
						content: '提交成功',
						showCancel: false,
						complete: function(){
							uni.redirectTo({
								url: '/pages/activity/creditscore/scorecredit'
							});
						}
					});
				}else{
					uni.showModal({
						title: '错误',
						content: "保存失败",
						showCancel: false
					});
				}
				
		   		
		  }
	  },
	  async getNewsDetail(){
	    const {data:res}=await this.$http({
	    	url:`/targetmanage.employee_information_huiyuandetail.phtml?viewId=json
`
	    });
		
		console.log(this.all)
	    this.myScore=res.totalNum
		console.log(res)
		this.addressData.name=res.name
		this.addressData.mobile=res.id_number
		this.all.mem_id=res.mem_id
		
		
		
		  
	  },
	  ChooseImage() {
	  	uni.chooseImage({
	  		count: 4, //默认9
	  		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
	  		sourceType: ['album'], //从相册选择
	  		success: (res) => {
	  			if (this.imgList.length != 0) {
	  				this.imgList = this.imgList.concat(res.tempFilePaths)
	  			} else {
	  				this.imgList = res.tempFilePaths
	  			}
	  		}
	  	});
	  },
	  ViewImage(e) {
	  	uni.previewImage({
	  		urls: this.imgList,
	  		current: e.currentTarget.dataset.url
	  	});
	  },
	  DelImg(e) {
	  	uni.showModal({
	  		title: '确认',
	  		content: '确定要删除这份材料吗',
	  		cancelText: '取消',
	  		confirmText: '删除',
	  		success: res => { 
	  			if (res.confirm) {
	  				this.imgList.splice(e.currentTarget.dataset.index, 1)
	  			}
	  		}
	  	})
	  },
	  index1(){
		 
		  this.multiArray.length=0
		  this.multiIndex=-1
		  this.Category.length=0
		  this.nameIndex=-1
		  this.Category2.length=0
		  this.nameIndex=-1
		  this.Category3.length=0
		  this.indexname.length=0
		  this.indexname1.length=0
		  this.nameIndex1=-1
		  this.isdisplay=false
		  this.isdisplay1=false
		  
	  },
	 async pick() {
		  this.multiArray.length=0
		  this.Category.length=0
		  this.Category2.length=0
		   this.nameIndex=-1
		   this.indexname.length=0
		   this.Category3.length=0
		   // this.indexname.length=0
		   this.indexname1.length=0
		   this.nameIndex1=-1
		   this.isdisplay=false
		   this.isdisplay1=false
		  if(this.index==0){
			  const {data:res}=await this.$http({
			  	    	url:`/targetmanage.targetModelNodeSelectListjson.phtml?parentid=redcodeid
			  `
			  	    });		               	
									console.log(res)
		  							for (let i = 0; i < res.success.length; i++) {
		  					            this.multiArray.push(res.success[i].name)
										// this.multiArray=res.data.success[i].name
										this.Category.push(res.success[i].id)
		  							}		
									 this.all.attribute="redcodeid"
									              
	  }else if(this.index==1){
		  const {data:res}=await this.$http({
		  	    	url:`/targetmanage.targetModelNodeSelectListjson.phtml?parentid=blackcodeid
		  `
		  	    });		               	
		  									console.log(res)
		  		  							for (let i = 0; i < res.success.length; i++) {
		  		  					            this.multiArray.push(res.success[i].name)
		  										// this.multiArray=res.data.success[i].name
		  										this.Category.push(res.success[i].id)
		  		  							}	
											 this.all.attribute="blackcodeid"
											
		  
	  }
	  },
	 async pick2(){
		  this.Category2.length=0
		   this.nameIndex=-1
		   // this.indexname.length=0
		   this.Category3.length=0
		   // this.indexname.length=0
		   this.indexname1.length=0
		   this.nameIndex1=-1
		   this.isdisplay1=false
		   this.indexname.length=0
		  console.log(this.multiArray[this.multiIndex])
		  console.log(this.Category[this.multiIndex])
		  console.log(this.index)
		  const {data:res}=await this.$http({
		  	    
		  					url:`/targetmanage.targetModelNodenameSelectListjson.phtml?target=`+this.Category[this.multiIndex],
		  	    
		  	    
		  	    		  
		  				});   
		  				console.log(res)
		  				 for (let i = 0; i < res.success.length; i++) {
		  	        this.Category2.push(res.success[i].id)
					this.indexname.push(res.success[i].target_content)
		  	    }	

		  
	  },
	  pick3(){
		  // this.Category3.length=0
		   // this.indexname1.length=0
	  },
	  targetname(hh){
	  	if(this.Category[this.multiIndex]== "" || this.Category[this.multiIndex]== null || this.Category[this.multiIndex]== undefined){
	  		
	  	}else{
			uni.request({
			                   	url: this.$baseUrl+'/targetmanage.targetModelNodenameSelectListjson.phtml?id='+this.Category2[this.nameIndex], 
			                   	
			                   	success: (res) => {
									if (res.statusCode = 200) {
												console.log(res)
										// for (let i = 0; i < res.data.success.length; i++) {
								            // this.indexname.push(res.data.success[i].target_content)
														console.log(res.data.success[0].quantification_type)
													if(res.data.success[0].quantification_type=="0"){
															this.inputa=res.data.success[0].scor
														this.isdisplay1=false
														this.all.quantification_type=res.data.success[0].quantification_type
															// this.multiArray=res.data.success[i].name
										// }
										}else if(res.data.success[0].quantification_type=="1"){
											this.all.quantification_type=res.data.success[0].quantification_type
											this.isdisplay1=true
											 
											uni.request({
             	url: this.$baseUrl+'/targetmanage.targetenumlist.phtml?viewId=json&fkid_select='+res.data.success[0].id, 
					                 
			         	success: (res) => {
				console.log(res) 	
				if (res.statusCode = 200) {
			       this.isdisplay1=true
				   for (let i = 0; i < res.data.rows.length; i++) {
				       this.indexname1.push(res.data.rows[i].enum_name)
				   			this.Category3.push(res.data.rows[i].id)
							
				   			// this.multiArray=res.data.success[i].name
				   }
										}
						    }
						       });
							}else if(res.data.success[0].quantification_type=="2"){
											this.all.quantification_type=res.data.success[0].quantification_type
											this.isdisplay1=false
											this.isdisplay=false
											
							}else if(res.data.success[0].quantification_type=="3"){
											this.all.quantification_type=res.data.success[0].quantification_type
											this.isdisplay=true
											this.msg="完成量（时间（小时）或金额（元）或人次（人）"
				                            
							}
							
											}
					                    }
					                });
				
			}
			},
	 
    Massage(e) {
      this.index = e.detail.value
	  
    },
    Targen(e) {
      this.multiIndex = e.detail.value
    },
	Targen2(e) {
	  this.nameIndex = e.detail.value
	  this.targetname(this.value3)
	},
	Targen3(e) {
	  this.nameIndex1 = e.detail.value
	  // this.targetname(this.value4)
	},
	// Targen1(e) {
	//   this.nameIndex1 = e.detail.value
	//   this.targetname1(this.value3)
	// },
    HappenDate(e) {
      this.date = e.detail.value
    },
    DueDate(e) {
      this.ddate = e.detail.value
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style>

.cu-form-group .title {
  min-width: calc(4em + 15px);
}
.align-start .title {
  min-width: calc(0em + 0px);
}



view {
  background-color: #FFFFFF;
}
.uni-form-item{
	border-top: 0.5px solid #eee;
}
.text2 {
  border: 0.5px solid #eee;
  margin-left: 16px;
  height: 180px;
  width: 350px;
}

.margin-tb-sm {
  margin-top: 40px;

}

.margin-tb-sm .cu-btn {
  background-color: #00A9FF;
  width: 140px;
  height: 40px;
  line-height: 40px;
  color: #FFFFFF;
}
.prove .title{
  padding-right: 0;
  min-width: calc(5em + 5px);
}
.prove input{
  padding-left: 10px;
}
.duedate{
	border-bottom: 0.5px solid #eee;
}
</style>
