 // 定义 vue3 的对象
 import { header } from './../../components/head.js'
 import { formValidation } from './formValidation.js'
 import {
	footer
} from './../../components/footer.js'
import {
	qrcode
} from './../../components/qrcode.js'
import service from './../../utils/request.js'
import {
	ElMessage
} from './../../components/ElMessage.js'
 const {
 	toRefs
 } = Vue
 const composition = {
	components : {
		myheader : header,
		myfooter: footer,
 		qrcode
	},
 	setup() {
		const submitForm = (fromValue) => {
			console.log(fromValue);
			fromValue.validate((valid) => {
				if(valid){
					const loading = ElementPlus.ElLoading.service({
						lock: true,
						text: '正在发布中...',
						background: 'rgba(0, 0, 0, 0.7)',
					})
					let data = {
						"projectPublisher":fromValue.model.proPublisher,
				    "projectName":fromValue.model.proName,
				    "projectType":fromValue.model.proType,
				    "projectKind":fromValue.model.proCategory,
				    "projectCycle":fromValue.model.proCycle,
				    "projectAddress":fromValue.model.proAddress,
				    "dataView":fromValue.model.dataView,
				    "price":fromValue.model.price,
				    "clearingForm":fromValue.model.settMethod,
				    "contract":fromValue.model.signContract,
				    "wechat":fromValue.model.weChat,
				    "phone":fromValue.model.phone,
				    "email":fromValue.model.email,
				    "projectRequirement":fromValue.model.proRequirement
					}
					service.post('/web/project/addProject', data).then(res => {
						loading.close()
						if (res.data.code === 200) {
							ElementPlus.ElMessage({
								message: '发布成功！',
								type: 'success',
								duration: 2000,
								onClose() {
									location.href = './../perCenter/zh.html'
								}
							})
						} else {
							ElementPlus.ElMessage({
								message: res.data.msg,
								type: 'error',
								duration: 2000
							})
						}
					}).catch(() => {
						loading.close()
					})
				}
			})
		} 
		const resetForm = (fromValue) => {
			fromValue.resetFields()
		}
		const radio = formValidation().radio
		const data = formValidation().data
 		return {
			radio,
			submitForm,
			resetForm,
			user : sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).user : null,
 			...toRefs(data),
 		}
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例