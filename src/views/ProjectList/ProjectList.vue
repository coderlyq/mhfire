<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header style="background-color:#fff;" class="ProjectListBarHead">
			<span class="ProjectListTopTitle">项目信息管理</span>
			<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="value" placeholder="全部项目">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-header>
		<el-main class="ProjectListContMain">
			<div class="ProjectListdefault">
				<div class="ProjectListDefTop">项目基础信息</div>
				<div class="ProjectListDefCont">
					<img src="~@/assets/images/Person/ProjectBaseImg.png" alt="">
					<ol class="ProjectListDefContOl">
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
						<li>项目名称：深圳门海安全技术有限公司</li>
					</ol>
					<el-button type="primary">修改基础信息<i class="el-icon-edit-outline el-icon--right"></i></el-button>
				</div>
			</div>
			<div class="ProjectListdevID">
				<div class="ProjectListdevIDText">
					采集器设备号：<span class="ProjectListdevIDValue"></span>
				</div>
				<el-button type="primary">更换采集器</el-button>
			</div>
			<div class="ProjectListPower">
				<div class="ProjectListPowerName">
					FCloud消防云负责人：<span class="ProjectListPowerNameValue"></span>
				</div>
				<div class="ProjectListPowerTel">
					负责人电话：<span class="ProjectListPowerTelValue"></span>
				</div>
				<el-button type="primary">更换项目负责人</el-button>
			</div>
			<div class="ProjectElement">
				<div class="ProjectElementTop">项目下的员工</div>
				<ol class="ProjectElementItem">
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
					<li>
						<img src="~@/assets/images/List/default.jpg" alt="" class="ProjectElementImg">
						<dl>
							<dt></dt>
							<dd>姓名：<span>刘德华</span></dd>
							<dd>电话：<span>13556885613</span></dd>
						</dl>
						<el-button type="primary" icon="el-icon-delete" circle></el-button>
					</li>
				</ol>
			</div>
			<div class="ProjectRecord">
				<div class="ProjectRecordTop">档案管理</div>
				<ol class="ProjectRecordOl">
					<li>
						<span>建筑消防设施平面布置图</span>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</li>
					<li>
						<span>建筑消防设施验收文件和产品</span>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</li>
					<li>
						<span>系统使用说明书</span>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</li>
					<li>
						<span>灭火及应急疏散预案</span>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</li>
					<li>
						<span>建筑消防设施系统图</span>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</li>
					<li>
						<span>系统调试记录</span>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>预览</el-button>
						</el-upload>
						<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="1"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" plain>重新上传</el-button>
						</el-upload>
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

export default {
	name:'ProjectList',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
	};
},
//方法集合
methods: {
	handleRemove(file, fileList) {
		console.log(file, fileList);
	},
	handlePreview(file) {
		console.log(file);
	},
	handleExceed(files, fileList) {
		this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	},
	beforeRemove(file) {
		return this.$confirm(`确定移除 ${ file.name }？`);
	}
}
}
</script>
<style>
	.ProjectListBarHead{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0;
		position: relative;
	}
	.ProjectListBarHead .el-input__inner{
		width: 272px;
		height: 30px;
		text-align: center;
	}
	.ProjectListBarHead .el-select{
		margin-right: 25px;
	}
	.ProjectListTopTitle{
		font-family: "PFz";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
		margin-left: 24px;
		margin-right: 20px;
		position: absolute;
		left: 0;
	}
	.ProjectListContMain{
		margin-left: 23px;
		margin-top: 23px;
		margin-right: 23px;
	}
	.ProjectListdefault{
		background-color: #ffffff;
		width: 100%;
		border-radius: 10px;
	}
	.ProjectListDefTop{
		font-family: "PFz";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
		padding-top: 20px;
		padding-left: 30px;
	}
	.ProjectListDefCont{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 30px;
		position: relative;
	}
	.ProjectListDefCont img{
		margin-left: 30px;
		margin-right: 30px;
	}
	.ProjectListDefContOl{
		list-style-type: none;
		margin-top: 0;
		padding-left: 0;
	}
	.ProjectListDefContOl li{
		float: left;
		width: 450px;
		margin-bottom: 20px;
		font-family:'PFxi';
		font-size:14px;
		color:#666;
	}
	.ProjectListDefCont .el-button{
		width: 183px;
		height: 40px;
		position: absolute;
		top: -40px;
		right: 30px;
	}
	.ProjectListdevID{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-left: 30px;
		padding-right: 30px;
		height: 70px;
		background-color: #ffffff;
		margin-top: 20px;
		border-radius: 10px;
	}
	.ProjectListdevIDText{
		font-family:'PFxi';
		font-size:14px;
		color:#666;
	}
	.ProjectListdevID .el-button{
		width: 183px;
		height: 40px;
	}
	.ProjectListPower{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding-left: 30px;
		padding-right: 30px;
		height: 70px;
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
		border-radius: 10px;
	}
	.ProjectListPowerName,.ProjectListPowerTel{
		font-family:'PFxi';
		font-size:14px;
		color:#666;
	}
	.ProjectListPowerNameValue{
		display: inline-block;
		width: 249px;
	}
	.ProjectListPower .el-button{
		position: absolute;
		right: 30px;
		width: 183px;
		height: 40px;
	}
	.ProjectElement{
		background-color: #ffffff;
		border-radius: 10px;
		padding-top: 30px;
		padding-left: 30px;
		margin-top: 20px;
	}
	.ProjectElementTop{
		font-family: "PFz";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
	}
	.ProjectElementItem{
		overflow: hidden;
		padding-left: 0;
		padding-bottom: 10px;
	}
	.ProjectElementItem li{
		width: 326px;
		height: 110px;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-shadow: 0 0 15px #f1f0f8;
		border-radius: 10px;
		position: relative;
		float: left;
		margin-top: 10px;
		margin-right: 50px;
		margin-bottom: 20px;
	}
	.ProjectElementItem dl{
		font-family:'PFxi';
		font-size:14px;
		color:#666;
	}
	.ProjectElementItem dl dt{
		width: 0;
	}
	.ProjectElementItem dl dd{
		margin-left: 0;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.ProjectElementImg{
		width: 60px;
		height: 60px;
		border-radius: 60px;
		margin-left: 30px;
		margin-right: 16px;
	}
	.ProjectElementItem .el-button{
		position: absolute;
		right: 20px;
	}
	.ProjectRecord{
		background-color: #ffffff;
		border-radius: 10px;
		padding-top: 30px;
		padding-left: 30px;
		margin-top: 20px;
	}
	.ProjectRecordTop{
		font-family: "PFz";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
	}
	.ProjectRecordOl{
		padding-bottom: 30px;
	}
	.ProjectRecordOl li{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20px;
	}
	.ProjectRecordOl li>span{
		font-family:'PFxi';
		font-size:14px;
		color:#666;
		letter-spacing: 3px;
		display: inline-block;
		width: 295px;
	}

	.ProjectRecordOl li .upload-demo{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.ProjectRecordOl li .el-button {
		width: 134px;
		height: 40px;
	}
	.el-upload-list{
		width: 321px;
	}
</style>