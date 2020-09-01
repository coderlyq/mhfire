<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header style="background-color:#fff;" class="ProjectControlBarHead">
			<span class="ProjectControlTopTitle">项目功能管理</span>
			<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="value" placeholder="全部项目">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-header>
		<el-main class="ProjectControlContMain">
			<div class="ProjectControlDefaultItem">
						<span>默认功能项</span>
						<ol>
							<li style="margin-top:30px;">
								火灾自动报警系统功能模块
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li>根据事件类型、设备类型、时间范围查询历史事件</li>
									<li>传输状态查询（可查看设备数/服务器状态/采集器状态）</li>
									<li>运行状态分析（分析反复上报火警、故障、启动、反馈的次数）</li>
									<li>可查看月度报表、周报表、指定时间范围的数据统计</li>
									<li>查看项目内所使用的主机数量型号等信息</li>
									<li>根据设备类型查询项目内该设备的位置、回路号</li>
								</ol>
							</li>
							<li style="margin-top:50px;">
								项目信息功能
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li>查看项目档案</li>
									<li>负责人修改项目档案</li>
									<li>查看项目概况信息（建筑名称、结构类型、层数、位置等多种信息，位置信息内包含定位坐标值）</li>
								</ol>
							</li>
							<li style="margin-top:50px;">
								项目内成员管理功能（项目负责人）
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li>查看当前项目的成员</li>
									<li>从公司成员列表中添加成员到项目</li>
									<li>从项目中列表删除成员（成员被移出项目当仍隶属于公司）</li>
								</ol>
							</li>
						</ol>
					</div>
					<div class="ProjectControlDefaultCheckBox">
						<span>可选功能权限项</span>
						<ol class="ProjectControlCheckBoxol1">
							<li>1.值班功能模块
								<ol class="ProjectControlCheckBoxol2">
									<li>添加报表功能</li>
									<li>查询报表记录（管理者查询所有、个人查看个人记录）</li>
								</ol>
								<div class="ProjectControlFlag">
									<span>注：所有报表种类</span>
									<ol>
										<li>值班情况表</li>
										<li>火灾报警控制器检查情况记录表</li>
										<li>火灾报警控制器检查情况记录表（人工）</li>
										<li>其他消防系统运行情况记录表</li>
										<li>消防设施维修记录表</li>
										<li>报警控制器主动上传事件记录表（仅可查）</li>
									</ol>
								</div>
								<el-switch
									v-model="switchwork"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>2.NFC打卡功能模块
								<ol class="ProjectControlCheckBoxol2">
									<li>提交打卡记录</li>
								</ol>
								<div class="ProjectControlFlag">
									<span>注：所有报表种类</span>
									<ol>
										<li>个人只能查看个人打卡记录/项目负责人可以查看所有的打卡记录</li>
										<li>打卡人员只有负责人可以新增、删除、新增操作只能从该项目下的员工中选择新增</li>
									</ol>
								</div>
								<el-switch
									v-model="switchamark"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>3.工单功能模块
								<ol class="ProjectControlCheckBoxol2">
									<li>提交工单功能</li>
									<li>执行工单操作（指派、执行、完成等）</li>
									<li>历史工单查询</li>
								</ol>
								<div class="ProjectControlFlag">
									<span>注：功能介绍</span>
									<ol>
										<li>可提交自定义工单。多事件关联工单、单事件关联工单</li>
										<li>工单操作包含指派、执行、完成等</li>
										<li>管理员可以查看、查询所有工单。个人只可查看、查询个人相关的工单</li>
									</ol>
								</div>
								<el-switch
									v-model="switchlists"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>4.巡查报表功能模块
								<ol class="ProjectControlCheckBoxol2">
									<li>提交巡查报表</li>
								</ol>
								<div class="ProjectControlFlag">
									<span>注：所有报表种类</span>
									<ol>
										<li>个人只能查看个人打卡记录/项目负责人可以查看所有的打卡记录</li>
										<li>打卡人员只有负责人可以新增、删除，新增操作只能从该项目下的员工中选择新增</li>
										<li>其他消防系统运行情况记录表</li>
										<li>消防设施维修记录表</li>
										<li>报警控制器主动上传事件记录表（仅可查）</li>
									</ol>
								</div>
								<el-switch
									v-model="switchcheck"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>5.保养报表功能模块
								<ol class="ProjectControlCheckBoxol2">
									<li>提交保养报表</li>
								</ol>
								<div class="ProjectControlFlag">
									<span>注：所有报表种类</span>
									<ol>
										<li>值班情况表</li>
										<li>火灾报警控制器检查情况记录表</li>
										<li>火灾报警控制器检查情况记录表（人工）</li>
									</ol>
								</div>
								<el-switch
									v-model="switchfix"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>6.报表发送功能
								<ol class="ProjectControlCheckBoxol2">
									<li>提交保养报表</li>
								</ol>
								<div class="ProjectControlFlag">
									<span>注：所有报表种类</span>
									<ol>
										<li>消防设施维修记录表</li>
										<li>报警控制器主动上传事件记录表（仅可查）</li>
									</ol>
								</div>
								<el-switch
									v-model="switchword"
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
		options: [{
			value: '选项1',
			label: '黄金糕'
		}, {
			value: '选项2',
			label: '双皮奶'
		}, {
			value: '选项3',
			label: '蚵仔煎'
		}, {
			value: '选项4',
			label: '龙须面'
		}, {
			value: '选项5',
			label: '北京烤鸭'
		}],
		value: ''
	};
},
//方法集合
methods: {

},
mounted(){
	let ProjectControlFlag = document.getElementsByClassName('ProjectControlFlag');
	let ProjectControlCheckBoxol2 = document.getElementsByClassName('ProjectControlCheckBoxol2');
	for(let i = 0;i<ProjectControlFlag.length;i++){
		ProjectControlFlag[i].style.height = 555-50-25-30-20-ProjectControlCheckBoxol2[i].offsetHeight+"px";
	}
},
created(){
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
		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
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