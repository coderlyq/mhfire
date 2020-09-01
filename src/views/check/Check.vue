<template>
  <el-container class="checkCont">
		<el-header class="checkContTop">
			<div class="checkLeft">员工申请审核</div>
			<div class="checkRight"  @compositionend="checkMemberList">
				<el-select v-model="checkvalue" placeholder="待审核" @change="checkMemberList">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-input placeholder="员工姓名/电话" v-model="inputcheck">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
		</el-header>
		<el-main>
			<el-table
				:data="memberList"
				border
				style="width: 100%">
				<el-table-column
					fixed
					prop="UserName"
					label="申请员工姓名"
					width="403">
				</el-table-column>
				<el-table-column
					prop="UserPhone"
					label="注册电话"
					width="403">
				</el-table-column>
				<el-table-column
					prop="CreateTime"
					label="申请时间"
					width="403">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="310">
					<template slot-scope="scope">
						<div v-show="scope.row.Status===1">
							<el-button @click="handleClickYes(scope.row)" type="text" size="big" class="checkLiYes">通过</el-button>
							<el-button @click="handleClickNo(scope.row)" type="text" size="normal" class="checkLiNo">拒绝</el-button>
						</div>
						<span v-show="scope.row.Status===2" style="color:#43d68b;">已通过</span>
						<span v-show="scope.row.Status===3" style="color:#f05d5c;">已拒绝</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="checknavblock">
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
</template>

<script>
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
  export default {
		name: "Search",
		data() {
      return {
				tableData: [{
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
        }, {
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
        }, {
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
        }, {
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
				}],
				currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
				currentPage4: 4,
				options: [{
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '已通过'
        }, {
          value: '3',
          label: '已拒绝'
        }],
				checkvalue: '待审核',
				inputcheck: '',
				memberList: ''
      };
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
			},
			checkMemberList(){
				console.log(this.checkvalue);
				console.log(this.inputcheck);
				let _this = this;
				let token = document.querySelector('#token').innerText;
				let status = this.checkvalue==='待审核'?1:this.checkvalue;
				axios.get('http://test.mhfire.cn/mhApi/Member/checkMemberList',{
					// 参数1：token(用户登录token)，string类型，必填
					// 参数2：companyId(公司ID)，int类型，必填
					// 参数3：keyword(关键字)，（员工姓名、电话）string类型，选填
					// 参数4：page(分页数)，int类型，选填，默认为1
					// 参数5：status（审核状态）,1审核中，2审核通过，3审核失败，int类型，必选
					params: {
						token: token,
						companyId: sessionStorage.getItem('companyId'),
						keyword: this.inputcheck,
						page: 1,
						status: status
					}
				})
				.then(function(response){
					_this.memberList = response.data.data.result;
					console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
					console.log(response);
				})
				.catch(function(error){
						console.log(error);
				})
			},
			handleClickYes(getEle){
				let _this = this;
				let token = document.querySelector('#token').innerText;
				let postData = {
						token: token,
						companyId: sessionStorage.getItem('companyId'),
						uid: getEle.ID,
						status: 1
					};
				axios.post('http://test.mhfire.cn/mhApi/Member/updateCheckMemberStatus',Qs.stringify(postData),{
						headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
						// 参数1：token(用户登录token)，string类型，必填
					// 参数2：uid(待审核用户id)，int类型，必填
					// 参数2：companyId(公司ID)，int类型，必填
					// 参数3：status(审核状态)，int类型，必填，1表示审核通过，2表示拒绝
					})
				.then(function(response){
					for(let i = 0;i<_this.memberList.length;i++){
						if(_this.memberList[i].ID===getEle.ID){
							console.log(_this.memberList[i].ID);
							console.log(getEle.ID);
							_this.memberList[i].Status = 2;
							console.log(_this.memberList[i]);
						}
					}
					console.log(getEle);
					console.log(response);
				})
				.catch(function(error){
						console.log(error);
				})
			},
			handleClickNo(getEle){
				let _this = this;
				let token = document.querySelector('#token').innerText;
				let postData = {
						token: token,
						companyId: sessionStorage.getItem('companyId'),
						uid: getEle.ID,
						status: 2
					};
				axios.post('http://test.mhfire.cn/mhApi/Member/updateCheckMemberStatus',Qs.stringify(postData),{
						headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
						// 参数1：token(用户登录token)，string类型，必填
					// 参数2：uid(待审核用户id)，int类型，必填
					// 参数2：companyId(公司ID)，int类型，必填
					// 参数3：status(审核状态)，int类型，必填，1表示审核通过，2表示拒绝
					})
				.then(function(response){
					for(let i = 0;i<_this.memberList.length;i++){
						if(_this.memberList[i].ID===getEle.ID){
							console.log(_this.memberList[i].ID);
							console.log(getEle.ID);
							_this.memberList[i].Status = 3;
							console.log(_this.memberList[i]);
						}
					}
					console.log(getEle);
					console.log(response);
				})
				.catch(function(error){
						console.log(error);
				})
			}
		},
		created(){
			this.checkMemberList();
		}
  }
</script>

<style>
.checkContTop{
	overflow: hidden;
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
}
.checkLeft{
	float: left;
}
.checkRight{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	float: right;
	color: #666666;
	font-size: 12px;
	font-family: "PFxi";
}
.checkRight>.el-input-group--append{
	border: 1px solid #dddddd;
	border-radius: 5px;
	margin-left: 25px;
}
.checkRight .el-input__inner{
	width: 214px;
	height: 30px !important;
	line-height: 30px;
	border: none;
	border-radius: 5px;
}
.checkRight .el-select .el-input__inner{
	width: 170px;
	border: 1px solid #dddddd;
	border-radius: 5px;
	text-align: center;
}
.checkRight .el-input-group__append{
	background-color: #ffffff;
	border: none;
	border-radius: 5px;
}
.checkCont .el-main{
	padding-top: 50px;
	background-color: #ffffff;
	margin-top: 20px;
	padding-left: 50px;
	margin-right: 22px;
	margin-left: 24px;
	border-radius: 10px;
}
.checkCont .el-table{
	border: none;
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
 .checknavblock{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
 }
 .checkCont tbody{
	color: #666666;
	font-family: "PFqxi";
	font-size: 14px;
 }
 .checkCont .checkLiYes{
	font-family: "PFxi";
	font-size: 14px;
	color: #43d68b;
 }
 .checkCont .checkLiNo{
	font-family: "PFxi";
	font-size: 14px;
	color: #f05d5c;
 }
</style>
