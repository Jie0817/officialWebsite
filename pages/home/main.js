 // 定义 vue3 的对象
 import { header } from './../../components/head.js'
 import { footer } from './../../components/footer.js'
 import { qrcode } from './../../components/qrcode.js'
 import service from './../../utils/request.js'
 const {
	ref,
	reactive,
 	toRefs,
	onMounted,
} = Vue
const composition = {
	components : {
		myheader : header,
		myfooter : footer,
		qrcode
	},
	setup() {
		onMounted(() => {
			getListData(1);
		})
		const getListData = (num) => {
			data.loading = true
			const d = {
				pageNum : num,
				pageSize : 5
			}
			service.post('/api/web/project/list',d).then(res => {
				console.log(res)
				data.loading = false
				if(res.data.code === 200){
					data.tableData = res.data.data.records
					data.pagination.total = res.data.data.total
					data.pagination.size = res.data.data.size
				}else{
					console.log('aaa');
					ElementPlus.ElMessage({
						message: res.data.msg,
						type: 'error',
						duration : 2000
					})
				}
			}).catch(() => {
				data.loading = false
			})
		}

		const onCurrentChange = (num) => {
			getListData(num)
		}
		
		const data = reactive({
			loading : false,
			
			pagination : {
				total : 0,
				size : 5
			},
			search : '',
			adr : '长沙',
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
				// {
				// 	id : '0001',
				// 	releaseDate: '2016-05-03',
				// 	proName: '撒士大夫士大夫士大夫士大夫撒旦是',
				// 	proType : '数据采集',
				// 	proCategory : '图片',
				// 	proCycle : '12个月',
				// 	dataView : '有后台',
				// 	price : '1',
				// 	settMethod : '月结',
				// 	signContract : '不限',
				// 	open : {
				// 		name : 'aaa',
				// 		channelBusiness : 'bbb',
				// 		address : 'sadsada',
				// 		weChat : '222',
				// 		email : '222',
				// 		proRequirement : '111'
				// 	}
				// },
				// {
				// 	id : '0001',
				// 	releaseDate: '2016-05-03',
				// 	proName: '111',
				// 	proType : '数据采集',
				// 	proCategory : '图片',
				// 	proCycle : '12个月',
				// 	dataView : '有后台',
				// 	price : '1',
				// 	settMethod : '月结',
				// 	signContract : '不限',
				// 	open : {
				// 		name : 'aaa',
				// 		channelBusiness : 'bbb',
				// 		address : 'sadsada',
				// 		weChat : '222',
				// 		email : '222',
				// 		proRequirement : '111'
				// 	}
				// },
				// {
				// 	id : '0001',
				// 	releaseDate: '2016-05-03',
				// 	proName: '111',
				// 	proType : '数据采集',
				// 	proCategory : '图片',
				// 	proCycle : '12个月',
				// 	dataView : '有后台',
				// 	price : '1',
				// 	settMethod : '月结',
				// 	signContract : '不限',
				// 	open : {
				// 		name : 'aaa',
				// 		channelBusiness : 'bbb',
				// 		address : 'sadsada',
				// 		weChat : '222',
				// 		email : '222',
				// 		proRequirement : '111'
				// 	}
				// },
			]

		})
		const handleCommand = (command) => {
			console.log(command);
			data.adr = command
		}
		return {
			...toRefs(data),
			handleCommand,
			onCurrentChange
		}
	}
}
// 创建vue3的实例
const vm = Vue.createApp(composition)
	.use(ElementPlus) // 加载ElementPlus
	.mount('#app') // 挂载Vue的app实例