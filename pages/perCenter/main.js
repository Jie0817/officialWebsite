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
 import service from './../../utils/request.js'
 import {
 	ElMessage
 } from './../../components/ElMessage.js'
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


		// 用户信息
		const userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).user : {}
 		const date = ref('上午好！')

 		// 获取当前时间
 		let now = new Date()
 		let hour = now.getHours()
 		if (hour < 6) date.value = "凌晨好"
 		else if (hour < 9) date.value = "早上好"
 		else if (hour < 12) date.value = "上午好"
 		else if (hour < 14) date.value = "中午好"
 		else if (hour < 17) date.value = "下午好"
 		else if (hour < 19) date.value = "傍晚好"
 		else if (hour < 22) date.value = "晚上好"
 		else date.value = "夜里好"

 		const handleClick = (tab, event) => {
 			console.log(tab, event)
			 if(tab.props.name === '1'){
				getPubList();
			 }
			 if(tab.props.name === '2'){
				getCollList();
			 }
 		}
		
		const getParameter = () => {
			var url = location.search; //获取url中"?"符后的字串
			var objParameter = new Object();  
			if ( url.indexOf( "?" ) != -1 ) {  
			var str = decodeURI(url).substr( 1 );
			var strs = str.split( "&" );  
			for ( var i = 0; i < strs.length; i++ ) {  
				objParameter[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );  
			}    
			}
			return objParameter
		}
		console.log(getParameter())
 		const activeName = ref(getParameter().active ? getParameter().active : '0')

 		//  头像
 		const avatar = [
 			'1.png',
 			'2.png',
 			'3.png',
 			'4.png',
 		]
 		const popoverRef = ref()
 		const avatarActive = ref(sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).user.imgUrl : '1.png')
 		const handleAvatarSelect = (e) => {
 			avatarActive.value = e
 			handleEditAvatar(e)
 		}
 		const handleEditAvatar = (url) => {
 			const loading = ElementPlus.ElLoading.service({
 				lock: true,
 				text: '正在修改头像...',
 				background: 'rgba(0, 0, 0, 0.7)',
 			})
 			let data = {
 				imgUrl: url
 			}
 			service.post('/web/user/editUser', data).then(res => {
 				console.log(res)
 				loading.close()
 				if (res.data.code === 200) {
 					let data = {
 						token: JSON.parse(sessionStorage.getItem('userInfo')).token,
 						user: res.data.data
 					}
 					sessionStorage.setItem('userInfo', JSON.stringify(data));
 					ElementPlus.ElMessage({
 						message: '头像修改成功！',
 						type: 'success',
 						duration: 3000
 					})

 				} else {
 					if (res.data.code === 401) {
 						ElMessage(res.data.msg)
 						return
 					}
 					ElementPlus.ElMessage({
 						message: res.data.msg,
 						type: 'error',
 						duration: 3000
 					})
 				}
 			}).catch(() => {
 				loading.close()
 			})
 		}
 		// 发布中心
 		const pubCenter = reactive({
 			// tab
 			tableData: [],
 			dialogVisibleEdit: false,
 			dialogVisibleSee: false,
			loading : false,
			pagination : {
				total : 0,
				size : 5
			},
			detailsData : {},
			rules: {
				projectPublisher: [{
					required: true,
					message: '请输入发布方名称',
					trigger: 'blur',
				}, ],
				projectName: [{
					required: true,
					message: '请输入项目名称',
					trigger: 'blur',
				}, ],
				projectType: [{
					required: true,
					message: '请选择项目类型',
					trigger: 'change',
				}, ],
				projectKind: [{
					required: true,
					message: '请选择项目种类',
					trigger: 'change',
				}, ],
				projectCycle: [{
					required: true,
					message: '请输入项目周期',
					trigger: 'blur',
				}, ],
				projectAddress: [{
					required: true,
					message: '请输入项目地点',
					trigger: 'blur',
				}, ],
				dataView: [{
					required: true,
					message: '请选择数据查看方式',
					trigger: 'change',
				}, ],
				price: [{
					required: true,
					message: '请输入单价',
					trigger: 'blur',
				}, ],
				priceCondition : [{
					required: true,
					message: '请选择单价方式',
					trigger: 'change',
				}],
				clearingForm: [{
					required: true,
					message: '请选择结算方式',
					trigger: 'change',
				}, ],
				contract: [{
					required: true,
					message: '请选择合同签订方式',
					trigger: 'change',
				}, ],
				wechat: [{
					required: true,
					message: '请输入您的微信',
					trigger: 'blur',
				}, ],
				phone: [{
					required: true,
					message: '请输入您的联系电话',
					trigger: 'blur',
				}, ],
				email: [{
					required: true,
					message: '请输入您的邮箱',
					trigger: 'blur',
				}, ],
				projectRequirement: [{
					required: true,
					message: '请输入您的具体需求',
					trigger: 'blur',
				}, ],
			}
 		})

		// 获取发布列表
		const getPubList = (num = 1) => {
			console.log(num);
			pubCenter.loading = true
			let data = {
				pageNum : num,
				pageSize : 8
			}
			service.post('/web/project/listByUser', data).then(res => {
				console.log(res)
				pubCenter.loading = false
				if (res.data.code === 200) {
					pubCenter.tableData = res.data.data.records
					pubCenter.pagination.total = res.data.data.total
					pubCenter.pagination.size = res.data.data.size
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				pubCenter.loading = false
			})
		}
		// 如果从发布页跳转过来就加载数据
		if(getParameter().active){
			getPubList();
		}
 		// 查看
 		const handleSee = () => {
 			pubCenter.dialogVisibleSee = true
 		}
 		// 编辑
 		// const edit = formValidation().data
		// 获取详情
 		const handleEdit = (e) => {
			console.log(e);
			const loading = ElementPlus.ElLoading.service({
				lock: true,
				text: '获取详细数据中...',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			service.get(`/web/project/queryById/${e.id}`).then(res => {
				console.log(res) 
				loading.close()
				if (res.data.code === 200) {
					pubCenter.detailsData = res.data.data
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				loading.close()
			})
 			pubCenter.dialogVisibleEdit = true
 		}
		//  修改
		 const handlePubEditSubmit = () => {
			const loading = ElementPlus.ElLoading.service({
				lock: true,
				text: '正在修改...',
				background: 'rgba(0, 0, 0, 0.7)',
			})

			console.log(pubCenter.detailsData.projectRequirement);
			service.post(`/web/project/updateProject`,pubCenter.detailsData).then(res => {
				console.log(res) 
				loading.close()
				if (res.data.code === 200) {
					ElementPlus.ElMessage({
						message: '项目修改成功！',
						type: 'success',
						duration: 3000
					})
					getPubList();
					pubCenter.dialogVisibleEdit = false
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				loading.close()
			})
		 }

 		// 删除
 		const handleDelete = (e) => {
 			ElementPlus.ElMessageBox.confirm(
 				`确定删除《${e.projectName}》项目?`,
 				'删除提示', {
 					confirmButtonText: '确定',
 					cancelButtonText: '取消',
 					type: 'warning',
 				}
 			).then(() => {
				pubDelete(e);
 			}).catch(() => {
 				ElementPlus.ElMessage({
 					type: 'info',
 					message: '您已取消删除~',
 				})
 			})
 		}
		const pubDelete = (e) => {
			const loading = ElementPlus.ElLoading.service({
				lock: true,
				text: '正在删除...',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			service.get(`/web/project/delete/${e.id}`).then(res => {
				console.log(res) 
				loading.close()
				if (res.data.code === 200) {
					getPubList();
					ElementPlus.ElMessage({
						type: 'success',
						message: '删除成功！',
					})
					
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				loading.close()
			})
		}
 		//  下线 or 上线
 		const handleOffline = (e) => {
 			ElementPlus.ElMessageBox.confirm(
 				`确定要将《${e.projectName}》项目${e.status == 1 ? '下线' : '上线'}?`,
 				`项目${e.status ? '下线' : '上线'}提示`, {
 					confirmButtonText: '确定',
 					cancelButtonText: '取消',
 					type: 'warning',
 				}
 			).then(() => {
				pubOffline(e)
 			}).catch(() => {
 				ElementPlus.ElMessage({
 					type: 'info',
 					message: '您已取消项目下线~',
 				})
 			})
 		}
		 const pubOffline = (e) => {
			const loading = ElementPlus.ElLoading.service({
				lock: true,
				text: `正在进行《${e.projectName}》项目的${e.status == 1 ? '下线' : '上线'}...`,
				background: 'rgba(0, 0, 0, 0.7)',
			})
			let data = {
				id : e.id,
				status : e.status == 1 ? 2 : 1
			}
			service.post(`/web/project/updateStatus`,data).then(res => {
				console.log(res) 
				loading.close()
				if (res.data.code === 200) {
					getPubList();
					ElementPlus.ElMessage({
						type: 'success',
						message: `《${e.projectName}》项目已成功${e.status == 1 ? '下线' : '上线'}！'`,
					})
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				loading.close()
			})
		 }
 		// 单选数据
 		const radio = formValidation().radio


 		//  收藏中心
 		const collCenter = reactive({
 			tableData: [],
			loading : false,
			pagination : {
				total : 0,
				size : 5
			}
 		})
		 // 获取收藏列表
		const getCollList = (num = 1) => {
			console.log(num);
			collCenter.loading = true
			let data = {
				pageNum : num,
				pageSize : 8
			}
			service.post('/web/collect/list', data).then(res => {
				console.log(res)
				collCenter.loading = false
				if (res.data.code === 200) {
					collCenter.tableData = res.data.data.records.map(item => {
						item.flag = 1
						return item
					})
					collCenter.pagination.total = res.data.data.total
					collCenter.pagination.size = res.data.data.size
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				collCenter.loading = false
			})
		}
 		const handleClickColl = (e,type) => {
			 console.log(e);
			if(type == 2){
				collAdd(e)
				return
			}
 			ElementPlus.ElMessageBox.confirm(
 				`确定取消对《${e.projectName}》项目的收藏`,
 				'取消收藏提示', {
 					confirmButtonText: '确定',
 					cancelButtonText: '取消',
 					type: 'warning',
 				}
 			).then(() => {
				 collCancel(e);
 			}).catch(() => {
 				ElementPlus.ElMessage({
 					type: 'info',
 					message: '您放弃了取消收藏操作~',
 				})
 			})
 		}
		const collCancel = (e) => {
			const loading = ElementPlus.ElLoading.service({
				lock: true,
				text: '取消收藏中...',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			service.get(`/web/collect/deleteCollect/${e.id}`).then(res => {
				console.log(res) 
				loading.close()
				if (res.data.code === 200) {
					e.flag = 2
					ElementPlus.ElMessage({
						type: 'success',
						message: '取消收藏成功！',
					})
					
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				loading.close()
			})
			// ElementPlus.ElMessage({
			// 	type: 'success',
			// 	message: `已成功取消《${e.projectName}》项目的收藏`,
			// })
		}
		const collAdd = (e) => {
			const loading = ElementPlus.ElLoading.service({
				lock: true,
				text: '收藏中...',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			service.get(`/web/collect/saveCollect/${e.id}`).then(res => {
				console.log(res) 
				loading.close()
				if (res.data.code === 200) {
					// getCollList();
					collCenter.tableData.forEach((item,index) => {
						if(item.id == e.id){
							item.flag = 1
							collCenter.tableData.splice(index,1,item)
						}
					})
					// e.flag = 1
					ElementPlus.ElMessage({
						type: 'success',
						message: '收藏成功！',
					})
					
				} else {
					if (res.data.code === 401) {
						ElMessage(res.data.msg)
						return
					}
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration: 3000
					})
				}
			}).catch(() => {
				loading.close()
			})
		}
 		return {
			// 用户信息
			userInfo,
 			// 当前时间
 			date,
 			// 头像
 			avatar,
 			handleEditAvatar,
 			popoverRef,
 			avatarActive,
 			handleAvatarSelect,
 			activeName,
 			radio,
 			// 用户中心
 			...toRefs(userCenter()),
 			// 发布中心
 			pubCenter,
 			// edit,
 			handleSee,
 			handleEdit,
			handlePubEditSubmit,
			getPubList,
 			handleDelete,
 			handleOffline,
 			handleClick,
 			//  收藏中心
 			collCenter,
			getCollList,
 			handleClickColl
 		}
 	}
 }
 // 用户中心
 const userCenter = () => {
 	const validateName = (rule, value, callback) => {
 		if (value === '') {
 			callback(new Error('请输入姓名'))
 		} else {
 			callback()
 		}
 	}
 	const validateconPass = (rule, value, callback) => {
 		if (userCenter.ruleForm.password && value !== userCenter.ruleForm.password) {
 			callback(new Error('两次密码输入不一致'))
 		} else {
 			callback()
 		}
 	}
 	let user = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).user : {}
 	const userRuleFormRef = ref(null)
 	const userCenter = reactive({
 		ruleForm: {
 			name: user.name,
 			phone: user.phone,
 			email: user.email,
 			company: user.companyName,
 			password: '',
 			conPassword: ''
 		},
 		rules: {
 			name: [{
 				validator: validateName,
 				trigger: 'blur'
 			}],
 			conPassword: [{
 				validator: validateconPass,
 				trigger: 'blur'
 			}],
 		},
 	})
 	const userSubmitForm = (fromValue) => {
 		console.log(fromValue);
 		fromValue.validate((valid) => {
 			console.log(valid);
 			if (valid) {
 				const loading = ElementPlus.ElLoading.service({
 					lock: true,
 					text: '用户信息修改...',
 					background: 'rgba(0, 0, 0, 0.7)',
 				})
 				let data = {
 					name: fromValue.model.name,
 					phone: fromValue.model.phone,
 					email: fromValue.model.email,
 					password: fromValue.model.password || null,
 					companyName: fromValue.model.company
 				}
 				service.post('/web/user/editUser', data).then(res => {
 					console.log(res)
 					loading.close()
 					if (res.data.code === 200) {
 						if (fromValue.model.password) {
 							ElMessage('用户信息修改成功！', 'success')
 							return
 						}
 						let data = {
 							token: JSON.parse(sessionStorage.getItem('userInfo')).token,
 							user: res.data.data
 						}
 						sessionStorage.setItem('userInfo', JSON.stringify(data));
 						ElementPlus.ElMessage({
 							message: '用户信息修改成功！',
 							type: 'success',
 							duration: 3000
 						})

 					} else {
 						if (res.data.code === 401) {
 							ElMessage(res.data.msg)
 							return
 						}
 						ElementPlus.ElMessage({
 							message: res.data.msg,
 							type: 'error',
 							duration: 3000
 						})
 					}
 				}).catch(() => {
 					loading.close()
 				})
 			}
 		})
 	}
 	return {
 		userRuleFormRef,
 		userCenter,
 		userSubmitForm
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例