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
		
		const activeName = ref('first')

		const handleClick = (tab, event) => {
			console.log(tab, event)
		}
		const data = reactive({
			// tab
			activeName : 'first',
			// 编辑
			dialogVisible : false,
			options : [
				{
					placeholder : '项目类型',
					data : [
						{
							value: 'Option1',
							label: '不限',
						},
						{
							value: 'Option2',
							label: '数据采集',
						},
						{
							value: 'Option3',
							label: '语音转写',
						},
						{
							value: 'Option4',
							label: '描点标注',
						},
						{
							value: 'Option5',
							label: '道路标注',
						},
					]
				},
				{
					placeholder : '项目种类',
					data : [
						{
							value: 'Option1',
							label: '不限',
						},
						{
							value: 'Option2',
							label: '语音',
						},
						{
							value: 'Option3',
							label: '图片',
						},
						{
							value: 'Option4',
							label: '文本',
						},
						{
							value: 'Option5',
							label: '视频',
						},
					]
				},
				{
					placeholder : '数据查看',
					data : [
						{
							value: 'Option1',
							label: '不限',
						},
						{
							value: 'Option2',
							label: '有后台',
						},
						{
							value: 'Option3',
							label: '无后台',
						},
						{
							value: 'Option4',
							label: '打包',
						},
					]
				},
				{
					placeholder : '单价参数',
					data : [
						{
							value: 'Option1',
							label: '不限',
						},
						{
							value: 'Option2',
							label: '按小时',
						},
						{
							value: 'Option3',
							label: '按张',
						},
						{
							value: 'Option4',
							label: '按框',
						},
						{
							value: 'Option5',
							label: '整包',
						},
					]
				},
				{
					placeholder : '结算方式',
					data : [
						{
							value: 'Option1',
							label: '不限',
						},
						{
							value: 'Option2',
							label: '日结',
						},
						{
							value: 'Option3',
							label: '周结',
						},
						{
							value: 'Option4',
							label: '月结',
						},
						{
							value: 'Option5',
							label: '完结',
						},
					]
				}
			],
			selectValue : {
				selectValue0 : '',
				selectValue1 : '',
				selectValue2 : '',
				selectValue3 : '',
				selectValue4 : '',
			},
			tableData : [
				{
					id : '0001',
					releaseDate: '2016-05-03',
					proName: '撒士大夫士大夫士大夫士大夫撒旦是',
					proType : '数据采集',
					proCategory : '图片',
					proCycle : '12个月',
					dataView : '有后台',
					price : '1',
					settMethod : '月结',
					signContract : '不限',
					open : {
						name : 'aaa',
						channelBusiness : 'bbb',
						address : 'sadsada',
						weChat : '222',
						email : '222',
						proRequirement : '111'
					}
				},
				{
					id : '0001',
					releaseDate: '2016-05-03',
					proName: '111',
					proType : '数据采集',
					proCategory : '图片',
					proCycle : '12个月',
					dataView : '有后台',
					price : '1',
					settMethod : '月结',
					signContract : '不限',
					open : {
						name : 'aaa',
						channelBusiness : 'bbb',
						address : 'sadsada',
						weChat : '222',
						email : '222',
						proRequirement : '111'
					}
				},
				{
					id : '0001',
					releaseDate: '2016-05-03',
					proName: '111',
					proType : '数据采集',
					proCategory : '图片',
					proCycle : '12个月',
					dataView : '有后台',
					price : '1',
					settMethod : '月结',
					signContract : '不限',
					open : {
						name : 'aaa',
						channelBusiness : 'bbb',
						address : 'sadsada',
						weChat : '222',
						email : '222',
						proRequirement : '111'
					}
				},
			]

		})

		// 编辑
		const edit = reactive({
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
		const handleCommand = (command) => {
			console.log(command);
			data.adr = command
		}
		return {
			...toRefs(data),
			...toRefs(edit),
			radio,
			handleCommand,
			handleClick
		}
	}
}
// 创建vue3的实例
const vm = Vue.createApp(composition)
	.use(ElementPlus) // 加载ElementPlus
	.mount('#app') // 挂载Vue的app实例