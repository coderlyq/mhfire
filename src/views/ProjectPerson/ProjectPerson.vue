<!--  -->
<template>
<div class='ProjectPerson'>
	<el-container id="ProjectPerson" style="height: 93.55vh;">
		<el-aside style="width:374px;padding:0;background-color:#ffffff;">
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemName">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemMark">普通员工</span>
			</PersonItem>
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemName">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemMark">普通员工</span>
			</PersonItem>
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemName">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemMark">普通员工</span>
			</PersonItem>
		</el-aside>
		<el-main>
				<el-header style="background-color:#fff;" class="ProjectPersonBarHead">
					<span class="ProjectPersonTopTitle">项目人员管理</span>
					<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="value" placeholder="全部项目">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
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
							<li style="margin-top:30px;">
								查看项目信息
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li>查看项目的概况信息</li>
									<li>查看项目的档案文件</li>
								</ol>
							</li>
							<li style="margin-top:50px;">
								火灾自动报警系统功能
								<ol style="margin-top:30px;font-family:'PFxi';font-size:14px;color:#666;">
									<li>系统事件查询功能</li>
									<li>主机采集器传输状态监测</li>
									<li>报警系统运行分析</li>
									<li>查看系统运行数据报表</li>
									<li>查看项目主机信息</li>
									<li>回路设备信息查询</li>
								</ol>
							</li>
						</ol>
					</div>
					<div class="ProjectDefaultCheckBox">
						<span>可选功能权限项</span>
						<ol class="ProjectCheckBoxol1">
							<li>1.值班功能模块
								<ol class="ProjectCheckBoxol2">
									<li>值班情况记录</li>
									<li>火灾报警控制器主动上传事件记录</li>
									<li>火灾报警控制器检查情况记录</li>
									<li>火灾报警控制器运动情况记录（人工）</li>
									<li>控制室内其他消防系统运行情况记录</li>
									<li>消防设施故障维修记录</li>
								</ol>
								<el-switch
									v-model="switchwork"
									active-color="#13ce66"
									inactive-color="#dddddd">
								</el-switch>
							</li>
							<li>2.NFC打卡功能模块
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
							</li>
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
import PersonItem from '@/views/person/PersonItem.vue'
export default {
//import引入的组件需要注入到对象中才能使用
name: 'ProjectPerson',
components: {
	PersonItem
},
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

}
}
</script>
<style>
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
	.ProjectDefaultCheckBox .ProjectCheckBoxol1{
		list-style-type: none;
	}
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