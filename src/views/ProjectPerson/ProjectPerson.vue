<!--  -->
<template>
<div class='ProjectPerson'>
	<el-container id="ProjectPerson" style="height: 93.55vh;">
		<el-aside style="width:374px;padding:0;background-color:#ffffff;">
			<div class='personImg' v-for="(item,index) in memberList" :key="item.UserName" @click="selectProjectPerson(index)">
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<dl>
					<dt></dt>
					<dd><span slot="personitemName">姓名：{{item.UserName}}</span></dd>
					<dd style="margin-top:10px;"><span slot="personitemTel">电话：{{item.UserPhone}}</span></dd>
				</dl>
				<div slot="personitemMark" class="personitemMark" :style="{backgroundColor:personMarkColor[item.isResponseFlag]}">
					<span v-show="item.isResponseFlag===0">普通员工</span>
					<span v-show="item.isResponseFlag===1">项目负责人</span>
				</div>
			</div>
		</el-aside>
		<el-main>
				<el-header style="background-color:#fff;" class="ProjectPersonBarHead">
					<el-breadcrumb separator-class="el-icon-arrow-right" class="ProjectListTopTitle">
						<el-breadcrumb-item :to="{ path: '/List' }">返回上层</el-breadcrumb-item>
						<el-breadcrumb-item>项目人员管理</el-breadcrumb-item>
					</el-breadcrumb>
					<!-- <span class="ProjectPersonTopTitle">项目人员管理</span> -->
					<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="projectID" placeholder="全部项目" @change="getPersonLevel()">
						<el-option
							v-for="item in allProjectList"
							:key="item.ProjectName"
							:label="item.ProjectName"
							:value="item.ID">
						</el-option>
					</el-select>
					<el-popconfirm
						confirmButtonText='好的'
						cancelButtonText='不用了'
						icon="el-icon-info"
						iconColor="red"
						title="删除员工将会彻底把该员工的所有平台信息移除？"
						class="ProjectPersonBarBut" 
					>
						<el-button type="danger" slot="reference" plain>从项目删除当前员工</el-button>
					</el-popconfirm>
					
				</el-header>
				<el-main class="ProjectPersonContMain">
					<div class="ProjectDefaultItem">
						<span>默认功能项</span>
						<ol>
							<li v-for="item in projectMemberModuleList.defaultResult" :key="item.id" style="margin-top:30px;" >
								{{item.name}}
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li v-for="itemcont in item.child" :key="itemcont.id">{{itemcont.name}}</li>
								</ol>
							</li>
							<!-- <li style="margin-top:50px;">
								火灾自动报警系统功能
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li>系统事件查询功能</li>
									<li>主机采集器传输状态监测</li>
									<li>报警系统运行分析</li>
									<li>查看系统运行数据报表</li>
									<li>查看项目主机信息</li>
									<li>回路设备信息查询</li>
								</ol>
							</li> -->
						</ol>
					</div>
					<div class="ProjectDefaultCheckBox">
						<span>可选功能权限项</span>
						<ol class="ProjectCheckBoxol1">
							<li v-for="(item,itemIndex) in projectMemberModuleList.selectResult" :key="item.id">{{item.name}}
								<ol class="ProjectCheckBoxol2">
									<li v-for="itemcont in item.child" :key="itemcont.id">{{itemcont.name}}</li>
									<!-- <li>火灾报警控制器主动上传事件记录</li>
									<li>火灾报警控制器检查情况记录</li>
									<li>火灾报警控制器运动情况记录（人工）</li>
									<li>控制室内其他消防系统运行情况记录</li>
									<li>消防设施故障维修记录</li> -->
								</ol>
								<el-switch
									@change="switchStatus(itemIndex)"
									v-model="item.status"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<!-- <li>2.NFC打卡功能模块
								<ol class="ProjectCheckBoxol2">
									<li>提交打卡记录</li>
								</ol>
								<el-switch
									v-model="switchamark"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>3.工单功能模块
								<ol class="ProjectCheckBoxol2">
									<li>提交打卡记录</li>
								</ol>
								<el-switch
									v-model="switchlists"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>4.巡查报表功能模块
								<ol class="ProjectCheckBoxol2">
									<li>提交巡查报表</li>
								</ol>
								<el-switch
									v-model="switchcheck"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>5.保养报表功能模块
								<ol class="ProjectCheckBoxol2">
									<li>提交保养报表</li>
								</ol>
								<el-switch
									v-model="switchfix"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>6.报表发送功能
								<ol class="ProjectCheckBoxol2">
									<li>提交保养报表</li>
								</ol>
								<el-switch
									v-model="switchword"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li> -->
						</ol>
					</div>
				</el-main>
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
// import PersonItem from '@/views/person/PersonItem.vue'
export default {
//import引入的组件需要注入到对象中才能使用
name: 'ProjectPerson',
data() {
	//这里存放数据
	return {
		personMarkColor: ['#5cc997','#f5835b'],
		switchwork: true,
		switchamark: true,
		switchlists: true,
		switchcheck: true,
		switchfix: true,
		switchword: true,
		allProjectList: {},
		projectID: '',
		memberList: '',
		projectMemberModuleList: ''
	};
},
//方法集合
methods: {
	switchStatus(index){
		console.log(index);
		console.log(this.selectResult[index].status);
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司id)，int类型，必填
		// 参数3：projectId(项目ID)，int类型，必填
		// 参数4：fid(功能模块ID，传父级功能模块id，开关按钮是针对于父级功能模块使用的)，int类型，必填
		// 参数5：status(状态)，int类型，必填,1开启，0关闭
		// let _this = this;
		let currentStatus = '';
		if(this.selectResult[index].status){
			currentStatus = 1
		}else{
			currentStatus = 0
		}
		let currentUid = sessionStorage.getItem('uid')!=" "?sessionStorage.getItem('uid'):0;
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司id)，int类型，必填
		// 参数3：projectId(项目ID)，int类型，必填
		// 参数4：uid(用户ID)，int类型，必填
		// 参数5：fid(功能模块ID，传父级功能模块id，开关按钮是针对于父级功能模块使用的)，int类型，必填
		// 参数6：status(状态)，int类型，必填,1开启，0关闭
		let setProjectMemberModuleData = {
			token: document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			projectId: sessionStorage.getItem('projectId'),
			uid: currentUid,
			fid: this.selectResult[index].id,
			status: currentStatus
		}
		axios.post('http://test.mhfire.cn/mhApi/Project/setProjectMemberModule',Qs.stringify(setProjectMemberModuleData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
				console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});
	},
	selectProjectPerson(index){
		let uid = this.memberList[index].ID;
		sessionStorage.setItem('uid',uid);
	},
	getDefaultPersonLevel(){
		let _this = this;
		axios.get('http://test.mhfire.cn/mhApi/Project/projectMemberModuleList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司id)，int类型，必填
			// 参数3：projectId(项目ID)，int类型，必填
			// 参数4：uid（员工用户id），int类型，选填
			params: {
				token: document.querySelector('#token').innerText,
				companyId: sessionStorage.getItem('companyId'),
				projectId: sessionStorage.getItem('projectId'),
				uid: 0,
			}
		})
		.then(function(response){
			_this.projectMemberModuleList = response.data.data;
			console.log('#$%^&%)$*((^*($)$(%)%(%');
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
	},
	getPersonLevel(){
		let _this = this;
		let currentUid = sessionStorage.getItem('uid')!=" "?sessionStorage.getItem('uid'):0;
		sessionStorage.setItem('currentProjectID',this.projectID);
		axios.get('http://test.mhfire.cn/mhApi/Project/projectMemberModuleList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司id)，int类型，必填
			// 参数3：projectId(项目ID)，int类型，必填
			// 参数4：uid（员工用户id），int类型，选填
			params: {
				token: document.querySelector('#token').innerText,
				companyId: sessionStorage.getItem('companyId'),
				projectId: sessionStorage.getItem('currentProjectID'),
				uid: currentUid,
			}
		})
		.then(function(response){
			_this.projectMemberModuleList = response.data.data;
			console.log('1111111111111#$%^&%)$*((^*($)$(%)%(%');
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
	let companyId = sessionStorage.getItem('companyId');
	let projectId = sessionStorage.getItem('projectId');
	this.getDefaultPersonLevel();
	axios.get('http://test.mhfire.cn/mhApi/Project/memberList',{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司ID)，int类型，必填
		// 参数3：projectId(项目ID)，int类型，必填
			params: {
				token: token,
				companyId: companyId,
				projectId: projectId
			}
	})
	.then(function(response){
		_this.memberList = response.data.data;
		console.log(response);
	})
	.catch(function(error){
			console.log(error);
	})
	axios.get('http://test.mhfire.cn/mhApi/Project/allProjectList',{
	// 参数1：token(用户登录token)，string类型，必填
	// 参数2：companyId(公司ID)，int类型，必填
		params: {
			token: document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId')
		}
	})
	.then(function(response){
		_this.allProjectList = response.data.data;
		console.log("?????????????????????????????");
		console.log(response);
	})
	.catch(function(error){
			console.log(error);
	})
}
}
</script>
<style>
		@font-face{
     font-family: 'PF'; 
     src:url('~@/assets/font/苹方黑体-极细-简.ttf') format('truetype');
	}
.personImg{
	width: 328px;
	box-sizing: border-box;
	height: 110px;
	margin: 0 auto;
	margin-top: 20px;
	box-shadow: 0 0 15px #cccccc;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	/* font-family: "微软雅黑"; */
	font-size: 14px;
	color: #666666;
	cursor: pointer;
}
.personImg .personitemMark{
	position: absolute;
	top: 0;
	right: 0;
	width: 100px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	border-top-right-radius: 5px;
	border-bottom-left-radius: 15px;
	color: #ffffff;
	font-size: 12px;
}
.personImg img{
	width: 60px;
	height: 60px;
	border-radius: 60px;
	margin-left: 30px;
}
.personImg dl{
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	/* align-items: flex-start; */
	justify-content: center
}
	ol{
		list-style: none;
	}
	.ProjectPersonBarHead{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0;
		position: relative;
	}
	.ProjectPersonBarHead .el-input__inner{
		width: 272px;
		height: 30px;
	}
	.ProjectPersonBarBut{
		font-weight:bold;
		padding:0;
	}
	.ProjectPersonTopTitle{
		font-family: "PFz";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
		margin-left: 24px;
		margin-right: 20px;
		position: absolute;
		left: 0;
	}
	.ProjectPersonBarBut .el-button{
		width:200px;
		height:30px;
		line-height:0px;
		font-family: "PFxi";
		margin-left: 20px;
		margin-right: 23px;
		box-sizing: border-box;
	}
	.ProjectPersonContMain{
		margin-left: 23px;
		margin-top: 23px;
		margin-right: 23px;
	}
	.ProjectPerson span{
		margin:0;
		padding: 0;
	}
	.ProjectDefaultItem{
		padding-left: 30px;
		padding-top: 30px;
		background-color: #ffffff;
		border-radius: 10px;
		padding-bottom: 10px;
		font-family: "PFzc";
		font-size: 18px;
		color: #333;
		margin-bottom: 20px;
	}
	.ProjectDefaultItem ol{
		list-style-type:decimal;
	}
	.ProjectDefaultItem ol li{
		margin-bottom: 20px;
	}
	.ProjectDefaultCheckBox{
		padding-left: 30px;
		padding-top: 30px;
		background-color: #ffffff;
		border-radius: 10px;
		padding-bottom: 10px;
		font-family: "PFzc";
		font-size: 18px;
		color: #333;
	}
	/* .ProjectDefaultCheckBox .ProjectCheckBoxol1{
		list-style-type: none;
	} */
	.ProjectDefaultCheckBox .ProjectCheckBoxol1 .ProjectCheckBoxol2{
		width: 700px;
		list-style-type:decimal;
		overflow: hidden;
		font-family:'PFxi';
		font-size:14px;
		color:#666;
	}
	.ProjectCheckBoxol2>li{
		width: 350px;
		float: left;
		margin-top: 20px;
	}
	.ProjectCheckBoxol1>li{
		padding-top: 50px;
		padding-bottom: 50px;
		padding-left: 40px;
		box-shadow: 0 0 15px #f1f0f8;
		margin-bottom: 20px;
		border-radius: 10px;
		margin-left: 50px;
		margin-right: 120px;
		position: relative;
	}
	.ProjectDefaultCheckBox .el-switch{
		position: absolute;
		top: 30px;
		right: 40px;
	}
</style>