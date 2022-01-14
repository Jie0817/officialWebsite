 // 定义 vue3 的对象
 import {
 	footer
 } from './../../components/footer.js'
 import {
 	qrcode
 } from './../../components/qrcode.js'
 const {
 	ref,
 	reactive,
 	toRefs
 } = Vue
 const composition = {
 	components: {
 		myfooter: footer,
 		qrcode
 	},
 	setup() {
 		const data = reactive({
 			ruleForm: {
 				phone: '',
 				password: '',
 			},
 			rules: {
 				phone: [{
 					validator: validatePhone,
 					trigger: 'blur'
 				}],
 				password: [{
 					validator: validatePass,
 					trigger: 'blur'
 				}],
 			},
 			ruleFormRef: null
 		})
 		const submitForm = (fromValue) => {
 			fromValue.validate((valid) => {
 				if (valid) {
 					const loading = ElementPlus.ElLoading.service({
 						lock: true,
 						text: '正在登录...',
 						background: 'rgba(0, 0, 0, 0.7)',
 					})
 					let data = {
 						phone: fromValue.model.phone,
 						password: fromValue.model.password
 					}
 					axios.post('/api/web/user/login', data).then(res => {
 						console.log(res)
 						loading.close()
 						if (res.data.code === 200) {
 							sessionStorage.setItem('userInfo', JSON.stringify(res.data.data));
 							ElementPlus.ElMessage({
 								message: '登录成功！',
 								type: 'success',
 								duration: 2000,
 								onClose() {
 									location.href = './../home/zh.html'
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
 			...toRefs(data),
 			submitForm
 		}
 	}
 }
 const validatePhone = (rule, value, callback) => {
 	let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
 	if (value === '') {
 		callback(new Error('请输入手机号'));
 	} else if (!reg.test(value)) {
 		callback(new Error('请输入正确的手机号'))
 	} else {
 		callback()
 	}
 }
 const validatePass = (rule, value, callback) => {
 	if (value === '') {
 		callback(new Error('请输入密码'))
 	} else {
 		callback()
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例