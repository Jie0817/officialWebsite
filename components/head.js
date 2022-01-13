export const header = {
	template : `
		<el-affix>
			<div style="width : 100%;background:#fff;display : flex;justify-content: center;padding : 8px 0; border-bottom : 1px solid #e6e6e6">
				<div style="width : 1200px;display: flex;align-items: center;justify-content: space-between;">
					<div style="width : 32px"><img style="width : 100%" src="./../../assets/img/logo.jpg"></div>
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link" style="display : flex;align-items: center;">
							用户名
							<svg style="margin-left : 8px" t="1642046247023" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2108" width="18" height="18">
								<path d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z" p-id="2109"></path>
							</svg>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="0">主页</el-dropdown-item>
								<el-dropdown-item command="1">项目发布</el-dropdown-item>
								<el-dropdown-item command="2">个人中心</el-dropdown-item>
								<el-dropdown-item command="3">退出</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
		</el-affix>
	`,
	setup(){
		console.log('aaa');
		const handleCommand = (e) => {
			console.log(e);
			if(e == 0){
				location.href = './../home/zh.html'
				return
			}
			if(e == 1){
				location.href = './../proRelease/zh.html'
				return
			}
			if(e == 2){
				location.href = './../perCenter/zh.html'
				return
			}
		}
		return {
			handleCommand
		}
	}
}