//let baseUrl="http://creditrczgh.eap2.net/" //测试地址159
let baseUrl="http://rczgh.eap2.net/" //正式地址26

 // #ifdef H5
baseUrl = "/api" //H5跨域处理，配合manifest的proxy
// #endif
let imgUploadUrl = baseUrl + "/common.uploadimagebase64.phtml" 
const request=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+options.url,
			method:options.method||'GET',
			data:options.data||{},
			header:options.header||{
				'Content-Type':'application/x-www-form-urlencoded',
				'token':uni.getStorageSync("eap_user_token")
			},
			timeout:10000,
			success: (res) => {
				if(res.statusCode!==200){
					if(res.statusCode == 401){
						uni.showModal({
							title: '提醒',
							content: `暂无权限访问，请重新登录`,
							confirmText: '去登录',
							success: (_res)=>{
								if (_res.confirm) {
									uni.reLaunch({
										url: '/pages/login/login'
									})
								} else if (_res.cancel) {
									// console.log('取消');
								}
							}
						})
					}else{
						uni.showToast({
							title:"获取内容失败，请检查网络",
							icon: 'none'
						});
						return
					}
				}
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					icon:'none',
					title:"请求失败"+err.errMsg
				})
				reject(err);
			}
		})
	})
};
const imgUpLoad = (options) => {
	return new Promise((resolve,reject)=>{
		// 选择相机图片
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['camera','album'], //从相册选择
			success: (pic) => {

				// console.log(pic);
				// 获取base64
				uni.request({
					url:pic.tempFilePaths[0], //本地路径
					method: 'GET',
					responseType: 'arraybuffer',
					success: res => {
						let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						base64 ='data:image/jpeg;base64,'+base64 //不加上这串字符，在页面无法显示

						// 调用上传接口
						uni.request({
							url: imgUploadUrl,
							method:'POST',
							data:{
								imageStr: base64,
								savepath: options.savepath
							},
							header:{
								'Content-Type':'application/x-www-form-urlencoded',
								'token':uni.getStorageSync("eap_user_token")
							},
							timeout:10000,
							success: (response) => {
								// console.log(response);
								if(response.statusCode!==200){
									if(response.statusCode == 401){
										uni.showToast({
											title:"暂无权限访问，请先登录。",
											icon: 'none',
										});
										return
									}else{
										uni.showToast({
											title:"获取内容失败，请检查网络",
											icon: 'none'
										});
										return
									}
								}
								if (response.data.success == '0') {
									// console.log('save_name');
									// console.log(response.data.save_name);
									resolve(response)
								}else{
									uni.showToast({
										title:"图片上传失败",
										icon: 'none',
									});
									return
								}
							},
							fail:(err)=>{
								uni.showToast({
									icon:'none',
									title:"请求失败"+err.errMsg
								})
								reject(err);
							}
						})		
					}
				});
			}
		});
	})
};
export default{
	baseUrl,
	request,
	imgUpLoad
}