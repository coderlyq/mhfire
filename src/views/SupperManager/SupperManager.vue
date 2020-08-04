<!--  -->
<template>
	<div class='supperManager'>
		<el-container class="supperCont">
			<el-header class="supperManagerTop">
				<div class="supperManagerAreaCont">
					二级管理员列表
					<el-button type="primary">新增二级管理员</el-button>
				</div>
			</el-header>
			<el-main>
				<el-table
					:data="tableData"
					border
					style="width: 100%">
					<el-table-column
						fixed
						prop="eleID"
						label="账号"
						width="188">
					</el-table-column>
					<el-table-column
						prop="elePassWord"
						label="密码"
						width="188">
					</el-table-column>
					<el-table-column
						prop="eleTel"
						label="手机号"
						width="199">
					</el-table-column>
					<el-table-column
						prop="eleRemark"
						label="备注"
						width="205">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="328">
						<template slot-scope="scope">
							<el-button @click="supperClickEdit(scope.row)" type="text" size="normal" class="supperLiEdit">编辑</el-button>
							<el-button @click="supperClickSet(scope.row)" type="text" size="normal" class="supperLiSet">设置管理公司</el-button>
							<el-button @click="supperClickDetele(scope.row)" type="text" size="normal" class="supperLiDelete">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="suppernavblock">
					<el-pagination
						hide-on-single-page=true
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage4"
						:page-sizes="[100, 200, 300, 400]"
						:page-size="100"
						layout="total, sizes, prev, pager, next, jumper"
						:total="400">
					</el-pagination>
				</div>
			</el-main>
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
		tableData: [{
			eleID: 'mh123456',
			elePassWord: 'mh8945646515',
			eleTel: '13669502136',
			eleRemark: '二级管理员'
		}, {
			eleID: 'mh123456',
			elePassWord: 'mh8945646515',
			eleTel: '13669502136',
			eleRemark: '二级管理员'
		}, {
			eleID: 'mh123456',
			elePassWord: 'mh8945646515',
			eleTel: '13669502136',
			eleRemark: '二级管理员'
		}, {
			eleID: 'mh123456',
			elePassWord: 'mh8945646515',
			eleTel: '13669502136',
			eleRemark: '二级管理员'
		}],
		currentPage1: 5,
		currentPage2: 5,
		currentPage3: 5,
		currentPage4: 4
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	handleClick(row) {
		console.log(row);
	},
	handleSizeChange(val) {
		console.log(`每页 ${val} 条`);
	},
	handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
	}
},
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
.supperCont .el-main{
	width: 1200px;
	margin: 0 auto;
	padding-top: 30px;
	padding-right: 30px;
	padding-left: 30px;
	background-color: #ffffff;
	margin-top: 20px;
	/* margin-right: 22px;
	margin-left: 24px; */
	border-radius: 10px;
}
.supperCont .el-table{
	border: none;
	padding-left: 34px;
}
.el-table td, .el-table th{
	text-align: center;
}
.el-table tr th{
	font-family: "PFxi";
	font-size: 18px;
	color: #666666;
	letter-spacing: 2px;
}
.el-table thead th{
	background-color: #f1f4fc;
 }
.el-table--border td{
	border-right: none;
 }
 .suppernavblock{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
 }
 .supperCont tbody{
	color: #666666;
	font-family: "PFxi";
	font-size: 14px;
 }
 .supperCont .supperLiEdit{
	font-family: "PFxi";
	font-size: 14px;
	color: #318cd3;
 }
 .supperCont .supperLiSet{
	font-family: "PFxi";
	font-size: 14px;
	color: #318cd3;
 }
.supperCont .supperLiDelete{
	font-family: "PFxi";
	font-size: 14px;
	color: #f15d5d;
 }
</style>