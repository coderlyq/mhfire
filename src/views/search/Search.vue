<template>
  <el-container class="searchCont">
		<el-header class="searchContTop">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="ProjectListTopTitle" v-show="mapInfos">
				<el-breadcrumb-item :to="{ path: '/List' }">返回上层</el-breadcrumb-item>
			</el-breadcrumb>
			<el-select v-model="projectvalue" placeholder="全部项目" @change="getHistoryEvent(event)">
				<el-option
					v-for="item in allProjectList"
					:key="item.ProjectName"
					:label="item.ProjectName"
					:value="item.ID">
				</el-option>
			</el-select>
			<el-select v-model="value1" placeholder="全部系统" style="display:none;">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="eventType" placeholder="全部事件类型" style="margin-right:30px;">
				<el-option
					v-for="item in eventTypeList"
					:key="item.Name"
					:label="item.Name"
					:value="item.Type">
				</el-option>
			</el-select>
			时间范围
			<el-date-picker
      v-model="eventTime"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
			format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
		<el-button type="primary" @click="postSearch">搜索</el-button>
		</el-header>
		<el-main>
			<el-table
				:data="historyEvent"
				border
				style="width: 100%">
				<el-table-column
					fixed
					prop="Order"
					label="事件"
					width="410">
				</el-table-column>
				<el-table-column
					prop="Tag"
					label="设备位置"
					width="410">
				</el-table-column>
				<el-table-column
					prop="HappenedTime"
					label="发生时间"
					width="410">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="310">
					<template slot-scope="scope">
						<el-button @click="historyClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div></div>
			<div class="navblock">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage3"
					:page-size="10"
					:hide-on-single-page="true"
					layout="prev, pager, next, jumper"
					:total="historyEveCount">
				</el-pagination>
			</div>
		</el-main>
</el-container>
</template>

<script>
// 引入axios
import axios from 'axios'
  export default {
		name: "Search",
		data() {
      return {
				mapInfos: true,
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
				eventType: '',
				eventTime: '',
				currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
				currentPage4: 4,
				historyEvent: '',
				allProjectList: '',
				eventTypeList: '',
				historyEveCount: 0
      };
		},
		methods: {
			postSearch(){
				let _this = this;
				let startTime = '';
				let endTime = '';
				let type = '';
				if(this.eventTime){
					startTime = new Date(this.eventTime[0]).getTime()/1000;
					endTime = new Date(this.eventTime[1]).getTime()/1000;
				}
				if(this.eventType){
					type = this.eventType;
				}
				let projectId = this.projectvalue;
				axios.get('http://test.mhfire.cn/mhApi/Project/getHistoryEvent',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司id)，int类型，必填
				// 参数3：projectId(项目ID)，int类型，必填
				// 参数4：systemInfo(系统信息)，int类型，可选，传系统id过来
				// 参数5：type(事件类型)，int类型，0全部，1火警，2故障，3反馈，4启动,可选
				// 参数6：startTime(开始时间)，时间戳格式，将年月日转换成时间戳格式，int类型，可选
				// 参数7：endTime(结束时间)，时间戳格式，将年月日转换成时间戳格式，int类型，可选
				// 参数8：page(分页数)，int类型，默认为第1页
					params: {
						token: document.querySelector('#token').innerText,
						companyId: sessionStorage.getItem('companyId'),
						projectId: projectId,
						systemInfo: '',
						type: type,
						startTime: startTime,
						endTime: endTime,
						page: 1
					}
			})
			.then(function(response){
				_this.historyEvent = response.data.data.result;
				console.log(response);
			})
			.catch(function(error){
					console.log(error);
			})
		},
			historyClick(row) {
				this.$router.push({
					path: '/SearchInfos',
					name: 'SearchInfos',
					params: {
						messageId:row.ID,
						ProjectID: row.ProjectID
					}
				})
			},
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				let _this = this;
				let startTime = '';
				let endTime = '';
				let type = '';
				let currentPage = val;
				if(this.eventTime){
					startTime = new Date(this.eventTime[0]).getTime()/1000;
					endTime = new Date(this.eventTime[1]).getTime()/1000;
				}
				if(this.eventType){
					type = this.eventType;
				}
				let projectId = this.projectvalue;
				axios.get('http://test.mhfire.cn/mhApi/Project/getHistoryEvent',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司id)，int类型，必填
				// 参数3：projectId(项目ID)，int类型，必填
				// 参数4：systemInfo(系统信息)，int类型，可选，传系统id过来
				// 参数5：type(事件类型)，int类型，0全部，1火警，2故障，3反馈，4启动,可选
				// 参数6：startTime(开始时间)，时间戳格式，将年月日转换成时间戳格式，int类型，可选
				// 参数7：endTime(结束时间)，时间戳格式，将年月日转换成时间戳格式，int类型，可选
				// 参数8：page(分页数)，int类型，默认为第1页
					params: {
						token: document.querySelector('#token').innerText,
						companyId: sessionStorage.getItem('companyId'),
						projectId: projectId,
						systemInfo: '',
						type: type,
						startTime: startTime,
						endTime: endTime,
						page: currentPage
					}
				})
				.then(function(response){
					_this.historyEvent = response.data.data.result;
					console.log(response);
				})
				.catch(function(error){
						console.log(error);
				})
			},
			getHistoryEvent(){
				let _this = this;
				let token = document.querySelector('#token').innerText;
				let projectId = this.projectvalue;
				axios.get('http://test.mhfire.cn/mhApi/Project/getHistoryEvent',{
					// 参数1：token(用户登录token)，string类型，必填
					// 参数2：companyId(公司id)，int类型，必填
					// 参数3：projectId(项目ID)，int类型，必填
					// 参数4：systemInfo(系统信息)，int类型，可选，传系统id过来
					// 参数5：type(事件类型)，int类型，0全部，1火警，2故障，3反馈，4启动,可选
					// 参数6：startTime(开始时间)，时间戳格式，将年月日转换成时间戳格式，int类型，可选
					// 参数7：endTime(结束时间)，时间戳格式，将年月日转换成时间戳格式，int类型，可选
					// 参数8：page(分页数)，int类型，默认为第1页
						params: {
							token: token,
							companyId: sessionStorage.getItem('companyId'),
							projectId: projectId,
							systemInfo: '',
							type: 0,
							startTime: '',
							endTime: '',
							page: 1
						}
				})
				.then(function(response){
					_this.historyEvent = response.data.data.result;
					_this.historyEveCount = response.data.data.count;
					console.log(response);
					console.log(_this.historyEveCount);
				})
				.catch(function(error){
						console.log(error);
				})
			}
		},
		created(){
			console.log("sdkfjksldafjskldafjk;lsdjfk;lsdafjklsdajkf;lsdajk");
			console.log(sessionStorage.getItem('companyId'));
			let _this = this;
			let token = document.querySelector('#token').innerText;
			axios.get('http://test.mhfire.cn/mhApi/Project/allProjectList',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司id)，int类型，必填
				params: {
					token: token,
					companyId: sessionStorage.getItem('companyId')
				}
			})
			.then(function(response){
				_this.allProjectList = response.data.data;
				if(_this.$route.params.projectId){
					_this.mapInfos = false;
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
			// 获取事件列表
			axios.get('http://test.mhfire.cn/mhApi/Project/getEventType',{
				// 参数1：token(用户登录token)，string类型，必填
				params: {
					token: token
				}
			})
			.then(function(response){
				_this.eventTypeList = response.data.data;
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
