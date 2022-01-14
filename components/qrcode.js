export const qrcode = {
	template: `
	<el-popover
	placement="top"
	:width="200"
	popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
>
	<template #reference>
		<el-avatar src="./../../assets/img/f.jpg" style="position: fixed;right:80px;bottom:50px" />
	</template>
	<template #default>
		<img src="./../../assets/img/qrcode.jpg" style="width:100%">
		<p style="text-align:center;margin-top:12px;">请使用微信扫描二维码开始一对一咨询</p>
	</template>
</el-popover>
	`
}