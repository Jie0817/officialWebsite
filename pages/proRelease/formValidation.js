const {
	reactive,
} = Vue
export const formValidation = () => {
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
			priceCondition : '',
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
			priceCondition : [{
				required: true,
				message: '请选择单价方式',
				trigger: 'change',
			}],
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
				value: '不限',
				text: '不限'
			},
			{
				value: '数据采集',
				text: '数据采集'
			},
			{
				value: '语音转写',
				text: '语音转写'
			},
			{
				value: '描点标注',
				text: '描点标注'
			},
			{
				value: '道路标注',
				text: '道路标注'
			}
		],
		proCategory: [{
				value: '不限',
				text: '不限'
			},
			{
				value: '语音',
				text: '语音'
			},
			{
				value: '图片',
				text: '图片'
			},
			{
				value: '文本',
				text: '文本'
			},
			{
				value: '视频',
				text: '视频'
			},
		],
		dataView: [{
				value: '不限',
				text: '不限'
			},
			{
				value: '有后台',
				text: '有后台'
			},
			{
				value: '无后台',
				text: '无后台'
			},
			{
				value: '打包',
				text: '打包'
			}
		],
		priceCondition:[{
				value: '不限',
				text: '不限'
			},
			{
				value: '按小时',
				text: '按小时'
			},
			{
				value: '按张',
				text: '按张'
			},
			{
				value: '按框',
				text: '按框'
			}
			,
			{
				value: '整包',
				text: '整包'
			}
		],
		settMethod: [{
				value: '不限',
				text: '不限'
			},
			{
				value: '日结',
				text: '日结'
			},
			{
				value: '周结',
				text: '周结'
			},
			{
				value: '月结',
				text: '月结'
			},
			{
				value: '完结',
				text: '完结'
			}
		],
		signContract: [{
				value: '不限',
				text: '不限'
			},
			{
				value: '需要',
				text: '需要'
			},
			{
				value: '不需要',
				text: '不需要'
			}
		]
	}

	return {
		data,
		radio
	}
}