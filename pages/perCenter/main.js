 // 定义 vue3 的对象
 import {
 	header
 } from './../../components/head.js'
 import {
 	formValidation
 } from './../proRelease/formValidation.js'
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
 		myheader: header,
 		myfooter: footer,
 		qrcode
 	},
 	setup() {
		const date = ref('上午好！')

		// 获取当前时间
		let now = new Date()
		let hour = now.getHours() 
		if(hour < 6) date.value = "凌晨好"
		else if (hour < 9) date.value = "早上好"
		else if (hour < 12) date.value = "上午好"
		else if (hour < 14) date.value = "中午好"
		else if (hour < 17) date.value = "下午好"
		else if (hour < 19) date.value = "傍晚好"
		else if (hour < 22) date.value = "晚上好"
		else date.value = "夜里好"
		
 		const handleClick = (tab, event) => {
 			console.log(tab, event)
 		}

 		const activeName = ref('first')

 		//  头像
 		const avatar = [
 			'1',
 			'2',
 			'3',
 			'4',
 		]
 		const popoverRef = ref()
 		const avatarActive = ref(1)
 		const handleAvatarSelect = (e) => {
 			console.log(e);
 			avatarActive.value = e
 		}
 		// 发布中心
 		const pubCenter = reactive({
 			// tab
 			tableData: [{
 					id: '0001',
 					releaseDate: '2016-05-03',
 					proName: '撒士大夫士大夫士大夫士大夫撒旦是',
 					proType: '数据采集',
 					proCategory: '图片',
 					proCycle: '12个月',
 					dataView: '有后台',
 					price: '1',
 					settMethod: '月结',
 					signContract: '不限',
 					open: {
 						name: 'aaa',
 						channelBusiness: 'bbb',
 						address: 'sadsada',
 						weChat: '222',
 						email: '222',
 						proRequirement: '111'
 					}
 				},
 				{
 					id: '0001',
 					releaseDate: '2016-05-03',
 					proName: '111',
 					proType: '数据采集',
 					proCategory: '图片',
 					proCycle: '12个月',
 					dataView: '有后台',
 					price: '1',
 					settMethod: '月结',
 					signContract: '不限',
 					open: {
 						name: 'aaa',
 						channelBusiness: 'bbb',
 						address: 'sadsada',
 						weChat: '222',
 						email: '222',
 						proRequirement: '111'
 					}
 				},
 				{
 					id: '0001',
 					releaseDate: '2016-05-03',
 					proName: '111',
 					proType: '数据采集',
 					proCategory: '图片',
 					proCycle: '12个月',
 					dataView: '有后台',
 					price: '1',
 					settMethod: '月结',
 					signContract: '不限',
 					open: {
 						name: 'aaa',
 						channelBusiness: 'bbb',
 						address: 'sadsada',
 						weChat: '222',
 						email: '222',
 						proRequirement: '111'
 					}
 				},
 			],
 			dialogVisibleEdit: false,
 			dialogVisibleSee: false
 		})
 		// 查看
 		const handleSee = () => {
 			pubCenter.dialogVisibleSee = true
 		}
 		// 编辑
 		const edit = formValidation().data
 		const handleEdit = () => {
 			pubCenter.dialogVisibleEdit = true
 		}
 		// 删除
 		const handleDelete = () => {
 			ElementPlus.ElMessageBox.confirm(
 				'确定删除此项目?',
 				'删除提示', {
 					confirmButtonText: '确定',
 					cancelButtonText: '取消',
 					type: 'warning',
 				}
 			).then(() => {
 				ElementPlus.ElMessage({
 					type: 'success',
 					message: '删除成功！',
 				})
 			}).catch(() => {
 				ElementPlus.ElMessage({
 					type: 'info',
 					message: '您已取消删除~',
 				})
 			})
 		}
 		//  下线
 		const handleOffline = () => {
 			ElementPlus.ElMessageBox.confirm(
 				'确定要将苏宁易购项目下线?',
 				'项目下线提示', {
 					confirmButtonText: '确定',
 					cancelButtonText: '取消',
 					type: 'warning',
 				}
 			).then(() => {
 				ElementPlus.ElMessage({
 					type: 'success',
 					message: '苏宁易购已成功下线！',
 				})
 			}).catch(() => {
 				ElementPlus.ElMessage({
 					type: 'info',
 					message: '您已取消项目下线~',
 				})
 			})
 		}
 		// 单选数据
 		const radio = formValidation().radio


		//  收藏中心
		const collCenter = reactive({
			tableData: [{
				id: '0001',
				releaseDate: '2016-05-03',
				proName: '撒士大夫士大夫士大夫士大夫撒旦是',
				proType: '数据采集',
				proCategory: '图片',
				proCycle: '12个月',
				dataView: '有后台',
				price: '1',
				settMethod: '月结',
				signContract: '不限',
				open: {
					name: 'aaa',
					channelBusiness: 'bbb',
					address: 'sadsada',
					weChat: '222',
					email: '222',
					proRequirement: '111'
				}
			},
			{
				id: '0001',
				releaseDate: '2016-05-03',
				proName: '111',
				proType: '数据采集',
				proCategory: '图片',
				proCycle: '12个月',
				dataView: '有后台',
				price: '1',
				settMethod: '月结',
				signContract: '不限',
				open: {
					name: 'aaa',
					channelBusiness: 'bbb',
					address: 'sadsada',
					weChat: '222',
					email: '222',
					proRequirement: '111'
				}
			},
			{
				id: '0001',
				releaseDate: '2016-05-03',
				proName: '111',
				proType: '数据采集',
				proCategory: '图片',
				proCycle: '12个月',
				dataView: '有后台',
				price: '1',
				settMethod: '月结',
				signContract: '不限',
				open: {
					name: 'aaa',
					channelBusiness: 'bbb',
					address: 'sadsada',
					weChat: '222',
					email: '222',
					proRequirement: '111'
				}
			},
			],
		})
		const handleClickColl = () => {
			ElementPlus.ElMessageBox.confirm(
				'确定取消对苏宁易购项目的收藏',
				'取消收藏提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).then(() => {
				ElementPlus.ElMessage({
					type: 'success',
					message: '苏宁易购已成功取消收藏！',
				})
			}).catch(() => {
				ElementPlus.ElMessage({
					type: 'info',
					message: '您放弃了取消收藏操作~',
				})
			})
		}
 		return {
			// 当前时间
			date,
 			avatar,
 			popoverRef,
 			avatarActive,
 			handleAvatarSelect,
 			activeName,
 			radio,
 			// 用户中心
 			...toRefs(userCenter()),
 			// 发布中心
 			pubCenter,
 			edit,
 			handleSee,
 			handleEdit,
 			handleDelete,
 			handleOffline,
 			handleClick,
			//  收藏中心
			collCenter,
			handleClickColl
 		}
 	}
 }


 // 用户中心
 const userCenter = () => {
 	// 用户中心
 	const validateName = (rule, value, callback) => {
 		if (value === '') {
 			callback(new Error('请输入姓名'))
 		} else {
 			callback()
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
 	// const validateCompany = (rule, value, callback) => {
 	// 	if (value === '') {
 	// 		callback(new Error('请输入您的公司'))
 	// 	} else {
 	// 		callback()
 	// 	}
 	// }
 	const validatePass = (rule, value, callback) => {
 		if (value === '') {
 			callback(new Error('请输入密码'))
 		} else {
 			callback()
 		}
 	}
 	const userCenter = reactive({
 		ruleForm: {
 			name: '',
 			phone: '',
			email: '',
 			company: '',
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
 			// company: [{
 			// 	validator: validateCompany,
 			// 	trigger: 'blur'
 			// }],
 			password: [{
 				validator: validatePass,
 				trigger: 'blur'
 			}],
 		},
 	})
 	return {
 		userCenter
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例