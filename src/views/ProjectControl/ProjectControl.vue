<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header style="background-color:#fff;" class="ProjectControlBarHead">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="ProjectListTopTitle">
				<el-breadcrumb-item :to="{ path: '/List' }">返回上层</el-breadcrumb-item>
				<el-breadcrumb-item>项目功能管理</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- <span class="ProjectControlTopTitle">项目功能管理</span> -->
			<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="projectID" placeholder="全部项目" @change="getProjectLevel()">
				<el-option
					v-for="item in allProjectList"
					:key="item.ProjectName"
					:label="item.ProjectName"
					:value="item.ID">
				</el-option>
			</el-select>
		</el-header>
		<el-main class="ProjectControlContMain">
			<div class="ProjectControlDefaultItem">
						<span>默认功能项</span>
						<ol>
							<li style="margin-top:30px;" v-for="item in defaultResult" :key="item.name">
								{{item.name}}
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li v-for="itemchild in item.child" :key="itemchild.name">{{itemchild.name}}{{itemchild.remark}}</li>
								</ol>
							</li>
						</ol>
					</div>
					<div class="ProjectControlDefaultCheckBox">
						<span>可选功能权限项</span>
						<ol class="ProjectControlCheckBoxol1">
							<li v-for="(selectitem,selectindex) in selectResult" :key="selectitem.name">{{selectindex+1}}.{{selectitem.name}}
								<ol class="ProjectControlCheckBoxol2">
									<li v-for="selchilditem in selectitem.child" :key="selchilditem.name">{{selchilditem.name}}{{selchilditem.remark}}</li>
								</ol>
								<div class="ProjectControlFlag">
									<!-- <span>{{selectResult.contents[0]}}</span> -->
									<ol>
										<li v-for="selcont in selectitem.contents" :key="selcont">{{selcont}}</li>
									</ol>
								</div>
								<el-switch
									@change="switchitem(selectindex)"
									v-model="selectitem.status"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
						</ol>
					</div>
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
	name: 'ProjectControl',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		switchwork: true,
		switchamark: true,
		switchlists: true,
		switchcheck: true,
		switchfix: true,
		switchword: true,
		value: '',
		projectModuleList: '',
		defaultResult: '',
		selectResult: '',
		allProjectList: '',
		projectID: " "
	};
},
//方法集合
methods: {
	switchitem(index){
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
		let currentProjectID = this.projectID!=" "?this.projectID:sessionStorage.getItem('projectId');
		let setProjectModuleData = {
			token: document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			projectId: currentProjectID,
			fid: this.selectResult[index].id,
			status: currentStatus
		}
		axios.post('http://test.mhfire.cn/mhApi/Project/setProjectModule',Qs.stringify(setProjectModuleData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
				console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});
	},
	getProjectLevel(){
		let _this = this;
		let token = document.querySelector('#token').innerText;
		axios.get('http://test.mhfire.cn/mhApi/Project/projectModuleList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司id)，int类型，必填
			// 参数3：projectId(项目ID)，int类型，必填
			params: {
				token: token,
				companyId: sessionStorage.getItem('companyId'),
				projectId: this.projectID,
			}
		})
		.then(function(response){
			_this.projectModuleList = response.data.data;
			_this.defaultResult = response.data.data.defaultResult
			_this.selectResult = response.data.data.selectResult;
			console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
	}
},
mounted(){
	let ProjectControlFlag = document.getElementsByClassName('ProjectControlFlag');
	let ProjectControlCheckBoxol2 = document.getElementsByClassName('ProjectControlCheckBoxol2');
	for(let i = 0;i<ProjectControlFlag.length;i++){
		ProjectControlFlag[i].style.height = 555-50-25-30-20-ProjectControlCheckBoxol2[i].offsetHeight+"px";
	}
},
created(){
	let _this = this;
	let token = document.querySelector('#token').innerText;
	axios.get('http://test.mhfire.cn/mhApi/Project/projectModuleList',{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司id)，int类型，必填
		// 参数3：projectId(项目ID)，int类型，必填
		params: {
			token: token,
			companyId: sessionStorage.getItem('companyId'),
			projectId: sessionStorage.getItem('projectId'),
		}
	})
	.then(function(response){
		_this.projectModuleList = response.data.data;
		_this.defaultResult = response.data.data.defaultResult
		_this.selectResult = response.data.data.selectResult;
		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
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
	.ProjectControlBarHead{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0;
		position: relative;
	}
	.ProjectControlBarHead .el-input__inner{
		width: 272px;
		height: 30px;
		text-align: center;
	}
	.ProjectControlBarHead .el-select{
		margin-right: 25px;
	}
	.ProjectControlTopTitle{
		font-family: "PFz";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
		margin-left: 24px;
		margin-right: 20px;
		position: absolute;
		left: 0;
	}

	.ProjectControlContMain{
		margin-left: 23px;
		margin-top: 23px;
		margin-right: 23px;
	}
	.ProjectControl span{
		margin:0;
		padding: 0;
	}
	.ProjectControlDefaultItem{
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
	.ProjectControlDefaultItem ol{
		list-style-type:decimal;
	}
	.ProjectControlDefaultItem ol li{
		margin-bottom: 20px;
	}
	.ProjectControlDefaultCheckBox{
		padding-left: 30px;
		padding-top: 30px;
		background-color: #ffffff;
		border-radius: 10px;
		padding-bottom: 10px;
		font-family: "PFzc";
		font-size: 18px;
		color: #333;
	}
	.ProjectControlDefaultCheckBox .ProjectControlCheckBoxol1{
		list-style-type: none;
		overflow: hidden;
	}
	.ProjectControlDefaultCheckBox .ProjectControlCheckBoxol1 .ProjectControlCheckBoxol2{
		width: 700px;
		list-style-type:decimal;
		overflow: hidden;
		font-family:'PFxi';
		font-size:14px;
		color:#666;
	}
	.ProjectControlCheckBoxol2>li{
		margin-top: 20px;
	}
	.ProjectControlCheckBoxol1>li{
		padding-top: 50px;
		padding-bottom: 50px;
		padding-left: 40px;
		box-shadow: 0 0 15px #f1f0f8;
		margin-bottom: 20px;
		border-radius: 10px;
		margin-left: 50px;
		position: relative;
		box-sizing: border-box;
		width: 676px;
		height: 555px;
		float: left;
	}
	.ProjectControlDefaultCheckBox .el-switch{
		position: absolute;
		top: 30px;
		right: 40px;
	}
	.ProjectControlFlag{
		font-family:'PFxi';
		font-size:14px;
		color:#666;
		width: 596px;
		box-sizing: border-box;
		padding-top: 33px;
		padding-left: 28px;
		background-color: #f6f6f6;
		padding-bottom: 80px;
		margin-top: 30px;
		border-radius: 10px;
		position: absolute;
		/* position: absolute;
		bottom: 40px;
		left: 40px; */
	}
	.ProjectControlFlag span{
		font-family:'PFzc';
		font-size:14px;
		color:#333;
	}
	.ProjectControlFlag li{
		margin-top: 20px;
	}
</style>