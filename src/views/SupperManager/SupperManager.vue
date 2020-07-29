<!--  -->
<template>
	<div class='supperManager'>
		<el-container>
			<el-header class="supperManagerTop">
				<div class="supperManagerAreaCont">
					二级管理员列表
					<el-button type="primary">新增二级管理员</el-button>
				</div>
			</el-header>
			<el-main>Main</el-main>
		</el-container>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {

	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

}
}
</script>
<style>
.supperManager .supperManagerTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
}
.supperManager .supperManagerTop .el-button{
	width: 183px;
	height: 40px;
	line-height: 40px;
	padding: 0;
	font-size: 14px;
	font-family: "PFxi";
	color: #f2f4fa;
}
.supperManagerAreaCont{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 1200px;
	margin: 0 auto;
}
</style>