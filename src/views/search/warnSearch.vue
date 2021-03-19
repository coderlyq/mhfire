<template>
  <el-container class="searchCont">
		<el-header class="searchContTop">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="ProjectListTopTitle">
				<el-breadcrumb-item style="font-size:16px;font-weight:bolder;font-family:'PFz';">报警列表</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>
		<el-main>
			<el-table
				:data="fireNoticeList"
				border
				style="width: 100%">
				<el-table-column
					fixed
					prop="ProjectName"
					label="项目"
					width="310">
				</el-table-column>
				<el-table-column
					fixed
					prop="Order"
					label="事件"
					width="410">
				</el-table-column>
				<el-table-column
					prop="Tag"
					label="设备类型"
					width="210">
				</el-table-column>
				<el-table-column
					prop="HappenedTime"
					label="发生时间"
					width="410">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="210">
					<template slot-scope="scope">
						<el-button @click="historyClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
</el-container>
</template>

<script>
// 引入axios
import axios from 'axios'
  export default {
		name: "warnSearch",
		data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
				},
				options: [],
				projectvalue: 0,
        value1: '',
				value2: '',
				currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
				currentPage4: 4,
				fireNoticeList: '',
				allProjectList: ''
      };
		},
		methods: {
			historyClick(row) {
				this.$router.push({
					path: '/SearchInfos',
					name: 'SearchInfos',
					params: {
						messageId:row.ID,
						ProjectID: row.ProjectID
					}
				})
				console.log(row);
			},
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
			},
			getHistoryEvent(){
				let _this = this;
				let token = document.querySelector('#token').innerText;
				axios.get('http://test.mhfire.cn/mhApi/Project/fireNoticeList',{
					// 参数1：token(用户登录token)，string类型，必填
					// 参数2：companyId(公司id)，int类型，必填
						params: {
							token: token,
							companyId: sessionStorage.getItem('companyId')
						}
				})
				.then(function(response){
					_this.fireNoticeList = response.data.data;
					console.log(response);
				})
				.catch(function(error){
						console.log(error);
				})
			}
		},
		created(){
			let _this = this;
			let token = document.querySelector('#token').innerText;
			axios.get('http://test.mhfire.cn/mhApi/Project/allProjectList',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司id)，int类型，必填
				params: {
					token: token,
					companyId: sessionStorage.getItem('companyId'),
				}
			})
			.then(function(response){
				_this.allProjectList = response.data.data;
				if(_this.$route.params.projectId){
					_this.projectvalue = _this.$route.params.projectId;
				}else{
					_this.projectvalue = _this.allProjectList[0].ID;
				}
				_this.getHistoryEvent();
				console.log(response);
			})
			.catch(function(error){
					console.log(error);
			})
		}
  }
</script>

<style>
.searchCont .searchContTop{
	background-color: #ffffff;
	font-size: 12px;
	color: #999999;
	font-family: 'PFz';
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-weight: normal;
}
.searchCont .ProjectListTopTitle{
	position: relative;
}
.searchContTop .el-select .el-input .el-input__inner{
	width: 272px;
	height: 30px;
	box-sizing: border-box;
	margin-left: 20px;
	font-size: 12px;
	color: #999999;
	text-align: center;
}
.searchContTop .el-date-editor--daterange{
	width: 340px;
	height: 30px;
	font-size: 12px;
	color: #999999;
	margin-left: 10px;
}
.searchContTop .el-date-editor .el-range__icon{
	line-height: 22px;
}
.searchContTop .el-date-editor .el-range-separator{
	line-height: 24px;
	color: #999999;
}
.searchContTop .el-date-editor .el-range-input{
	color: #999999;
	font-size: 12px;
}
.searchContTop .el-button--primary{
	width: 50px;
	height: 30px;
	box-sizing: border-box;
	padding: 0;
	margin-left: 10px;
}
.searchContTop .el-button--primary span{
	width: 50px;
	height: 30px;
	display: block;
	line-height: 30px;
	text-align: center;
}
.searchCont .el-main{
	padding-top: 50px;
	background-color: #ffffff;
	margin-top: 20px;
	padding-left: 50px;
	margin-left: 24px;
}
.el-table td, .el-table th{
	text-align: center;
}
.el-table tr th{
	font-family: "PFz";
	/* font-weight: bolder; */
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
 .navblock{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
 }
</style>
