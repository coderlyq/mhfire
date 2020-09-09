<!--  -->
<template>
  <el-container class="projectCreate">
		<el-header class="projectCreateTop">
			<div class="projectCreateTopCont" style="text-align:left;">
				新建项目
			</div>
		</el-header>
		<el-main>
			<div class="projectCreateTopCont">
				<div class="projectCreatePart">
					<div class="createPartTop">项目基础信息</div>
					<el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
						<el-form-item label="项目名称">
							<el-input v-model="formLabelAlign.projectName"></el-input>
						</el-form-item>
						<el-form-item label="项目地址">
							<el-input v-model="formLabelAlign.addressDetail"></el-input>
						</el-form-item>
						<el-form-item label="单体建筑名称">
							<el-input v-model="formLabelAlign.buildingName"></el-input>
						</el-form-item>
						<el-form-item label="结构类型">
							<el-input v-model="formLabelAlign.structureType"></el-input>
						</el-form-item>
						<el-form-item label="耐火等级">
							<el-input v-model="formLabelAlign.grade"></el-input>
						</el-form-item>
						<el-form-item label="层数-地上">
							<el-input v-model="formLabelAlign.upFloor"></el-input>
						</el-form-item>
						<el-form-item label="层数-地下">
							<el-input v-model="formLabelAlign.underFloor"></el-input>
						</el-form-item>
						<el-form-item label="建筑高度（m）">
							<el-input v-model="formLabelAlign.buildingHeight"></el-input>
						</el-form-item>
						<el-form-item label="占地面积1（m²）">
							<el-input v-model="formLabelAlign.floorSpace"></el-input>
						</el-form-item>
						<el-form-item label="建筑面积-地上（m²）">
							<el-input v-model="formLabelAlign.upAcreage"></el-input>
						</el-form-item>
						<el-form-item label="建筑面积-地下（m²）">
							<el-input v-model="formLabelAlign.underAcreage"></el-input>
						</el-form-item>
						<el-form-item label="建设单位">
							<el-input v-model="formLabelAlign.builder"></el-input>
						</el-form-item>
						<el-form-item label="建筑项目联系人">
							<el-input v-model="formLabelAlign.proLinkMan"></el-input>
						</el-form-item>
						<el-form-item label="建筑项目联系人电话">
							<el-input v-model="formLabelAlign.proLinkManTel"></el-input>
						</el-form-item>
						<el-form-item label="消防安全负责人">
							<el-input v-model="formLabelAlign.responseMan"></el-input>
						</el-form-item>
						<el-form-item label="消防安全负责人电话">
							<el-input v-model="formLabelAlign.responseManTel"></el-input>
						</el-form-item>
						<el-form-item label="设计单位">
							<el-input v-model="formLabelAlign.architect"></el-input>
						</el-form-item>
						<el-form-item label="施工单位">
							<el-input v-model="formLabelAlign.constrOrg"></el-input>
						</el-form-item>
						<el-form-item label="监理单位">
							<el-input v-model="formLabelAlign.superUnit"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="projectCreatePart">
					<div class="createPartTop">项目基础信息</div>
					<el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
						<el-form-item label="填写采集器设备号绑定">
							<el-input v-model="formLabelAlign.collectorNumber"></el-input>
						</el-form-item>
						<el-form-item label="FCLOUD消防员">
							<el-select v-model="responseUid" placeholder="请选择……">
								<el-option
									v-for="item in responseUidList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<div class="projectCreatePart">
					<div class="createPartTop">项目档案文件设置</div>
					<el-form :label-position="labelPosition" label-width="220px" :model="formLabelAlign">
						<el-form-item label="建筑消防设施平面布置图">
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
						</el-form-item>
						<el-form-item label="建筑消防设施验收文件和产品">
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
						</el-form-item>
						<el-form-item label="系统使用说明书">
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
						</el-form-item>
						<el-form-item label="灭火及应急疏散预案">
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
						</el-form-item>
						<el-form-item label="建筑消防设施系统图">
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
						</el-form-item>
						<el-form-item label="系统调试记录">
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
						</el-form-item>
					</el-form>
				</div>
				<div class="projectCreatePart">
					<el-button>取消</el-button>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
name: 'ProjectCreate',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
	formLabelAlign:{
		projectName: '',
		buildingName: '',
		addressDetail: '',
		structureType: '',
		grade: '',
		upFloor: '',
		underFloor: '',
		buildingHeight: '',
		floorSpace: '',
		upAcreage: '',
		underAcreage: '',
		builder: '',
		proLinkMan: '',
		proLinkManTel: '',
		responseMan: '',
		responseManTel: '',
		architect: '',
		constrOrg: '',
		superUnit: ''
	},
	responseUidList: [{
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
    responseUid: ''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
.projectCreate .projectCreateTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
	margin-bottom: 20px;
}
.projectCreateTopCont{

	width: 1200px;
	margin: 0 auto;
	position: relative;
}
.projectCreatePart{
	background-color: #ffffff;
	width: 100%;
	border-radius: 15px;
	margin-top: 20px;
	padding-bottom: 10px;
}
.projectCreatePart:nth-child(3) .el-form-item__label{
	letter-spacing: 2px;
}
.projectCreatePart:nth-child(3) .el-button{
	width: 134px;
	height: 40px;
}
.projectCreatePart:nth-child(3) .el-form-item:nth-child(6) .upload-demo{
	display: inline-block;
	width: 134px;
	margin-right: 20px;
}
.projectCreatePart:last-child{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	background-color: rgba(255, 255, 255, 0.1);
	margin-bottom: 160px;
}
.projectCreatePart:last-child .el-button{
	width: 134px;
	height: 40px;
}
.createPartTop{
	height: 50px;
	line-height: 50px;
	width: 100%;
	box-sizing: border-box;
	background-color: #2f8cdb;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	font-family: "PFz";
	color: #fff;
	font-size: 16px;
	letter-spacing: 2px;
	padding-left: 20px;
	margin-bottom: 30px;
}
.projectCreateTopCont .el-form{
	width: 569px;
	margin: 0 auto;
}
.projectCreateTopCont .el-form .el-form-item__label{
	font-family: "PFz";
	color: #333;
	font-size: 14px;
}
.projectCreateTopCont .el-form .el-form-item__content{
	margin-left: 180px!important;
}
.projectCreateTopCont .el-form .el-input__inner{
	width: 389px;
	height: 40px;
}
.projectCreateTopCont .el-select .el-input__inner{
	width: 204px;
}
</style>