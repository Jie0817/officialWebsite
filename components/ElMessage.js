export const ElMessage = (msg,type = 'error') => {
	console.log('aaa');
	ElementPlus.ElMessage({
		message: msg,
		type,
		duration: 1000,
		onClose(){
			location.href = '../login/zh.html';
			sessionStorage.removeItem('userInfo')
		}
	})
}