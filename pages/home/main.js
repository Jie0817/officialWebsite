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
			getListData();
		})

		// 查询
		const handleQuery = () => {
			getListData();
		}
		const handleQueryVisibleChange = (e) => {
			if(!e){
				getListData();
			}
			console.log(e);
		}
		const getListData = (num = 1) => {
			data.loading = true
			const d = {
				pageNum : num,
				pageSize : 10,
				projectTypes : data.selectValue[0], //项目类型
				// prices : data.selectValue[4], //单价参数
				projectKinds : data.selectValue[1], // 项目种类
				dataViews : data.selectValue[2], //数据查看
				clearingForms : data.selectValue[3], // 结算方式
				projectName : data.search
			}
			service.post('/web/project/list',d).then(res => {
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
							value: '不限',
							label: '不限',
						},
						{
							value: '数据采集',
							label: '数据采集',
						},
						{
							value: '语音转写',
							label: '语音转写',
						},
						{
							value: '描点标注',
							label: '描点标注',
						},
						{
							value: '道路标注',
							label: '道路标注',
						},
					]
				},
				{
					placeholder : '项目种类',
					data : [
						{
							value: '不限',
							label: '不限',
						},
						{
							value: '语音',
							label: '语音',
						},
						{
							value: '图片',
							label: '图片',
						},
						{
							value: '文本',
							label: '文本',
						},
						{
							value: '视频',
							label: '视频',
						},
					]
				},
				{
					placeholder : '数据查看',
					data : [
						{
							value: '不限',
							label: '不限',
						},
						{
							value: '有后台',
							label: '有后台',
						},
						{
							value: '无后台',
							label: '无后台',
						},
						{
							value: '打包',
							label: '打包',
						},
					]
				},
				{
					placeholder : '结算方式',
					data : [
						{
							value: '不限',
							label: '不限',
						},
						{
							value: '日结',
							label: '日结',
						},
						{
							value: '周结',
							label: '周结',
						},
						{
							value: '月结',
							label: '月结',
						},
						{
							value: '完结',
							label: '完结',
						},
					]
				},
				// {
				// 	placeholder : '单价参数',
				// 	data : [
				// 		{
				// 			value: '不限',
				// 			label: '不限',
				// 		},
				// 		{
				// 			value: '按小时',
				// 			label: '按小时',
				// 		},
				// 		{
				// 			value: '按张',
				// 			label: '按张',
				// 		},
				// 		{
				// 			value: '按框',
				// 			label: '按框',
				// 		},
				// 		{
				// 			value: '整包',
				// 			label: '整包',
				// 		},
				// 	]
				// },
			],
			selectValue : [],
			tableData : []

		})
		const handleCommand = (command) => {
			console.log(command);
			data.adr = command
		}


		// 收藏
		const handleClickColl = (e) => {
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
			handleQueryVisibleChange,
			...toRefs(data),
			handleQuery,
			handleCommand,
			onCurrentChange,
			handleClickColl
		}
	}
}
// 创建vue3的实例
const vm = Vue.createApp(composition)
	.use(ElementPlus) // 加载ElementPlus
	.mount('#app') // 挂载Vue的app实例