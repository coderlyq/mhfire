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
					:data="adminList"
					border
					style="width: 100%">
					<el-table-column
						fixed
						prop="UserName"
						label="账号"
						width="188">
					</el-table-column>
					<el-table-column
						prop="Password"
						label="密码"
						width="188">
					</el-table-column>
					<el-table-column
						prop="UserPhone"
						label="手机号"
						width="199">
					</el-table-column>
					<el-table-column
						prop="remark"
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
				<el-dialog
					title="二级管理员信息"
					:visible.sync="dialogChangeSuManagerVisible"
					width="30%"
					:before-close="handleClose" class="SuManagerDialog">
					<div><span>账户名</span><el-input class="userName" type="text" v-model="userName" placeholder="请输入账户名"></el-input></div>
					<div><span>密码</span><el-input class="userPass" type="text" v-model="userPass" placeholder="请输入密码"></el-input></div>
					<div><span>手机号</span><el-input class="userTel" type="text" v-model="userTel" placeholder="请输入手机号"></el-input></div>
					<div><span>备注</span><el-input class="userMark" type="text" v-model="userMark" placeholder="请输入备注"></el-input></div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="updateManager">确 定</el-button>
					</span>
				</el-dialog>
				<el-dialog
					title="二级管理员信息"
					:visible.sync="dialogSetSuManagerVisible"
					width="30%"
					:before-close="handleClose" class="dialogSetSuManagerVisible">
					<div class="dialogSetSuManagerVisibleLeft">
						<h2>已管理公司</h2>
						<ol v-for="(item,index) in havecompanyList" :key="item.companyName">
							<li><span>{{item.companyName}}</span><el-button type="danger" icon="el-icon-minus" circle @click="removeCompany(index)"></el-button></li>
						</ol>
					</div>
					<div class="dialogSetSuManagerVisibleRight">
						<h2>可选管理公司</h2>
						<ol v-for="(item,index) in trycompanyList" :key="item.CompanyName"> 
							<li><span>{{item.CompanyName}}</span><el-button type="primary" icon="el-icon-plus" circle @click="addCompany(index)"></el-button></li>
						</ol>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogSetSuManagerVisible = false">取 消</el-button>
						<el-button type="primary" @click="setManager">确 定</el-button>
					</span>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		dialogChangeSuManagerVisible: false,
		dialogSetSuManagerVisible: false,
		havecompanyList:'',
		trycompanyList: '',
		userName:'',
		userPass: '',
		userTel: '',
		userMark: '',
		// tableData: [{
		// 	eleID: 'mh123456',
		// 	elePassWord: 'mh8945646515',
		// 	eleTel: '13669502136',
		// 	eleRemark: '二级管理员'
		// }, {
		// 	eleID: 'mh123456',
		// 	elePassWord: 'mh8945646515',
		// 	eleTel: '13669502136',
		// 	eleRemark: '二级管理员'
		// }, {
		// 	eleID: 'mh123456',
		// 	elePassWord: 'mh8945646515',
		// 	eleTel: '13669502136',
		// 	eleRemark: '二级管理员'
		// }, {
		// 	eleID: 'mh123456',
		// 	elePassWord: 'mh8945646515',
		// 	eleTel: '13669502136',
		// 	eleRemark: '二级管理员'
		// }],
		currentPage1: 5,
		currentPage2: 5,
		currentPage3: 5,
		currentPage4: 4,
		adminList: '',
		currentIndex:0
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	handleClose(done) {
		this.$confirm('确认关闭？')
			.then(_ => {
				done(_);
			})
			.catch(_ => {_});
	},
	handleClick(row) {
		console.log(row);
	},
	handleSizeChange(val) {
		console.log(`每页 ${val} 条`);
	},
	handleCurrentChange(val) {
		console.log(`当前页: ${val}`);
	},
	supperClickEdit(str){
		console.log(str);
		this.userName = str.UserName;
		this.userPass = str.Password;
		this.userTel = str.UserPhone;
		this.userMark = str.remark;
		this.dialogChangeSuManagerVisible = true;

	},
	supperClickSet(str){
		console.log(str);
		this.dialogSetSuManagerVisible = true;
		let _this = this;
		let token = document.querySelector('#token').innerText;
		axios.get('http://test.mhfire.cn/mhApi/Admin/companyList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：id(二级管理员ID)，int类型，必填
				params: {
					token: token,
					id: str.ID
				}
		})
		.then(function(response){
			_this.havecompanyList = response.data.data;
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
		axios.get('http://test.mhfire.cn/mhApi/Admin/companySelectList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：id(二级管理员ID)，int类型，必填
				params: {
					token: token,
					id: str.ID
				}
		})
		.then(function(response){
			_this.trycompanyList = response.data.data;
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			console.log(_this.trycompanyList);
		})
		.catch(function(error){
				console.log(error);
		})
	},
	updateManager(){
		this.dialogChangeSuManagerVisible = false;
		let updateManager = {
			token: document.querySelector('#token').innerText,
			userName: this.userName,
			password: this.userPass,
			phone: this.userTel,
			remark: this.userMark
		};
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：userName(表示账号)，string类型，必填
		// 参数3：password(表示密码)，string类型，必填
		// 参数4：phone(表示手机号)，string类型，必填
		// 参数5：remark(备注)，string类型，选填
		axios.post('http://test.mhfire.cn/mhApi/Admin/updateAdmin',Qs.stringify(updateManager),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
				console.log(response);
		})
		.catch(function(error){
				console.log(error);
		});
	},
	setManager(){
		this.dialogSetSuManagerVisible = false;
	},
	removeCompany(index){
		this.trycompanyList.unshift(this.havecompanyList[index]);
		this.havecompanyList.splice(index,1);
		console.log(this.trycompanyList);
		console.log('remove');
		console.log(this.havecompanyList);
	},
	addCompany(index){
		this.havecompanyList.unshift(this.havecompanyList[index]);
		this.trycompanyList.splice(index,1);
		console.log(this.trycompanyList);
		console.log('addd');
		console.log(this.havecompanyList);
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
	// console.log('qwe');
	let _this = this;
	let token = document.querySelector('#token').innerText;
	axios.get('http://test.mhfire.cn/mhApi/Admin/adminList',{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：page(分页数)，int类型，选填，默认为1
			params: {
				token: token,
				page: 1
			}
	})
	.then(function(response){
		_this.adminList = response.data.data.result;
		console.log(response);
	})
	.catch(function(error){
			console.log(error);
	})
}
}
</script>
<style>
.SuManagerDialog .el-dialog{
	width: 510px;
	box-sizing: border-box;
	padding-top: 50px;
	padding-top: 50px;
}
.dialogSetSuManagerVisible .el-dialog{
	width: 851px;
	box-sizing: border-box;
	padding-top: 50px;
	padding-top: 50px;
}
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