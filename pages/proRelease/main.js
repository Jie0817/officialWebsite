 // 定义 vue3 的对象
 import { header } from './../../components/head.js'
 import { formValidation } from './formValidation.js'
 import {
	footer
} from './../../components/footer.js'
import {
	qrcode
} from './../../components/qrcode.js'
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
		const radio = formValidation().radio
 		return {
			radio,
			submitForm,
 			...toRefs(formValidation().data),
 		}
 	}
 }
 // 创建vue3的实例
 const vm = Vue.createApp(composition)
 	.use(ElementPlus) // 加载ElementPlus
 	.mount('#app') // 挂载Vue的app实例