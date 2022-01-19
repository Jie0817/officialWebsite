 // 定义 vue3 的对象
 import { header } from './../../components/head.js'
 import {
 	footer
 } from './../../components/footer.js'
 import {
 	qrcode
 } from './../../components/qrcode.js'
 import service from './../../utils/request.js'
 const {
 	ref,
 	reactive,
 	toRefs
 } = Vue
 const composition = {
 	components: {
		myheader : header,
 		myfooter: footer,
 		qrcode
 	},
 	setup() {
 		const data = reactive({
 			ruleForm: {
 				name: '',
 				phone: '',
 				email: '',
 				password: '',
 			},
 			rules: {
 				name: [{
 					validator: validateName,
 					trigger: 'blur'
 				}],
 				phone: [{
 					validator: validatePhone,
 					trigger: 'blur'
 				}],
 				email: [{
 					validator: validateEmail,
 					trigger: 'blur'
 				}],
 				password: [{
 					validator: validatePass,
 					trigger: 'blur'
 				}],
 			},
 			ruleFormRef: null
 		})

		// 验证码
		const vCodeData = reactive({
			loading : false,
			disabled : false,
			text : '发送验证码'
		})

		const sendVCode = () => {
			vCodeData.disabled = true
			let countDown = 60
			vCodeData.text = countDown + '秒后重新发送'
			let down = setInterval(function(){
				vCodeData.text = `${--countDown}秒后重新发送`
				if(countDown === 0){
					vCodeData.disabled = false
					vCodeData.text = '重新发送'
					clearInterval(down)
				}
			},1000)
			
		}

 		const submitForm = (fromValue) => {
 			fromValue.validate((valid) => {
 				if (valid) {
 					const loading = ElementPlus.ElLoading.service({
 						lock: true,
 						text: '正在注册...',
 						background: 'rgba(0, 0, 0, 0.7)',
 					})
 					let data = {
 						name: fromValue.model.name,
 						phone: fromValue.model.phone,
 						email: fromValue.model.email,
 						password: fromValue.model.password
 					}
 					service.post('/web/user/register', data).then(res => {
 						loading.close()
 						if (res.data.code === 200) {
 							ElementPlus.ElMessage({
 								message: '注册成功',
 								type: 'success',
 								duration: 1000,
 								onClose() {
 									location.href = './../login/zh.html'
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
 		return {
			vCodeData,
			sendVCode,
 			...toRefs(data),
 			submitForm
 		}
 	}
 }
 const validateName = (rule, value, callback) => {
 	if (value === '') {
 		callback(new Error('请输入您的姓名'));
 	} else {
 		callback()
 	}
 }
 const validatePhone = (rule, value, callback) => {
 	let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
 	if (value === '') {
 		callback(new Error('请输入您的手机号'));
 	} else if (!reg.test(value)) {
 		callback(new Error('请输入正确的手机号'))
 	} else {
 		callback()
 	}
 }
 const validateEmail = (rule, value, callback) => {
 	let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
 	if (value === '') {
 		callback(new Error('请输入您的电子邮箱'))
 	} else if (!reg.test(value)) {
 		callback(new Error('请输入正确的电子邮箱'))
 	} else {
 		callback()
 	}
 }
 const validatePass = (rule, value, callback) => {
 	if (value === '') {
 		callback(new Error('请输入您的密码'));
 	} else {
 		callback()
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例