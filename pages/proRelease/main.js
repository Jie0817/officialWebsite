 // 定义 vue3 的对象
 import { header } from './../../components/head.js'
 const {
 	ref,
 	reactive,
 	toRefs
 } = Vue
 const composition = {
	components : {
		myheader : header
	},
 	setup() {
 		const data = reactive({
 			ruleFormRef: null,
 			ruleForm: {
 				proPublisher: '',
 				proName: '',
 				proType: '',
 				proCategory: '',
 				proCycle: '',
 				proAddress: '',
 				dataView: '',
 				price: '',
 				settMethod: '',
 				signContract: '',
 				weChat: '',
 				phone: '',
 				email: '',
 				proRequirement: ''
 			},
 			rules: {
 				proPublisher: [{
 					required: true,
 					message: '请输入发布方名称',
 					trigger: 'blur',
 				}, ],
 				proName: [{
 					required: true,
 					message: '请输入项目名称',
 					trigger: 'blur',
 				}, ],
 				proType: [{
 					required: true,
 					message: '请选择项目类型',
 					trigger: 'change',
 				}, ],
 				proCategory: [{
 					required: true,
 					message: '请选择项目种类',
 					trigger: 'change',
 				}, ],
 				proCycle: [{
 					required: true,
 					message: '请输入项目周期',
 					trigger: 'blur',
 				}, ],
 				proAddress: [{
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
 				settMethod: [{
 					required: true,
 					message: '请选择结算方式',
 					trigger: 'change',
 				}, ],
 				signContract: [{
 					required: true,
 					message: '请选择合同签订方式',
 					trigger: 'change',
 				}, ],
 				weChat: [{
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
 				proRequirement: [{
 					required: true,
 					message: '请输入您的具体需求',
 					trigger: 'blur',
 				}, ],
 			}
 		})
 		const radio = {
 			proType: [{
 					value: 0,
 					text: '不限'
 				},
 				{
 					value: 1,
 					text: '数据采集'
 				},
 				{
 					value: 2,
 					text: '语音转写'
 				},
 				{
 					value: 3,
 					text: '描点标注'
 				},
 				{
 					value: 4,
 					text: '道路标注'
 				}
 			],
 			proCategory: [{
 					value: 0,
 					text: '不限'
 				},
 				{
 					value: 1,
 					text: '语音'
 				},
 				{
 					value: 2,
 					text: '图片'
 				},
 				{
 					value: 3,
 					text: '文本'
 				},
 				{
 					value: 4,
 					text: '视频'
 				},
 			],
 			dataView: [{
 					value: 0,
 					text: '不限'
 				},
 				{
 					value: 1,
 					text: '有后台'
 				},
 				{
 					value: 2,
 					text: '无后台'
 				},
 				{
 					value: 3,
 					text: '打包'
 				}
 			],
 			settMethod: [{
 					value: 0,
 					text: '不限'
 				},
 				{
 					value: 1,
 					text: '日结'
 				},
 				{
 					value: 2,
 					text: '周结'
 				},
 				{
 					value: 3,
 					text: '月结'
 				},
 				{
 					value: 4,
 					text: '完结'
 				}
 			],
 			signContract: [{
 					value: 0,
 					text: '不限'
 				},
 				{
 					value: 1,
 					text: '需要'
 				},
 				{
 					value: 2,
 					text: '不需要'
 				}
 			]
 		}
		const submitForm = (fromValue) => {
			fromValue.validate((valid) => {
				if(valid){
					let data = {
						name : fromValue.model.name,
						phone : fromValue.model.phone,
						email : fromValue.model.email,
						password : fromValue.model.password
					}
					console.log(fromValue.model.name);
				}
			})
		} 
 		return {
 			radio,
			 submitForm,
 			...toRefs(data),
 		}
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例