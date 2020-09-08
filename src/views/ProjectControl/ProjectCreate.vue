<!--  -->
<template>
  <el-container class="projectCreate">
		<el-header class="projectCreateTop">
			<div class="projectCreateTopCont">
				新建项目
			</div>
		</el-header>
		<el-main>
			<div class="projectCreateTopCont">
				<div class="projectCreatePartOne">
					<div class="createPartOneTop">项目基础信息</div>
					<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
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
	}
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
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 1200px;
	margin: 0 auto;
	position: relative;
}
.projectCreatePartOne{
	background-color: #ffffff;
	width: 100%;
	border-radius: 15px;
	margin-top: 20px;
}
.createPartOneTop{
	height: 50px;
	line-height: 50px;
	width: 100%;
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
	width: 180px!important;
}
.projectCreateTopCont .el-form .el-form-item__content{
	margin-left: 180px!important;
}
.projectCreateTopCont .el-form .el-input__inner{
	width: 389px;
	height: 40px;
}
</style>