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
				<!-- <form action="http://test.mhfire.cn/mhApi/Project/createProject" method="post" enctype="multipart/form-data"> -->
				<div id="projectCreatePost">
					<div class="projectParts">
						<div class="createPartTop">项目基础信息</div>
						<div class="projectCreatePart">
							<input type="text" name="token" :value="formFactory.token" style="display:none;">
							<input type="text" name="companyId" :value="formFactory.companyId" style="display:none;">
							<img class="projectLogo" id="projectLogo" src="~@/assets/images/Person/companylogo.png" alt="">
							<input type="file" class="uploadprojectLogo" name="logo" id="uploadprojectLogoinput" style="display:none;" @change="changeprojectLogo">
							<span class="projectLogo uploadprojectLogo" size="small" type="primary" @click="uploadprojectLogoinput">上传LOGO</span>
							<ol>
								<li>
									<label for="projectNameF">项目名称</label>
									<input id="projectNameF" name="projectName" value="">
								</li>
								<li>
									<label for="addressDetailF">项目地址</label>
									<input id="addressDetailF" name="addressDetail" value="">
								</li>
								<li>
									<label for="buildingNameF">单体建筑名称</label>
									<input id="buildingNameF" name="buildingName" value="">
								</li>
								<li>
									<label for="structureTypeF">结构类型</label>
									<input id="structureTypeF" name="structureType" value="">
								</li>
								<li>
									<label for="gradeF">耐火等级</label>
									<input id="gradeF" name="grade" value="">
								</li>
								<li>
									<label for="upFloorF">层数-地上</label>
									<input id="upFloorF" name="upFloor" value="">
								</li>
								<li>
									<label for="underFloorF">层数-地下</label>
									<input id="underFloorF" name="underFloor" value="">
								</li>
								<li>
									<label for="buildingHeightF">建筑高度（m）</label>
									<input id="buildingHeightF" name="buildingHeight" value="">
								</li>
								<li>
									<label for="floorSpaceF">占地面积1（m²）</label>
									<input id="floorSpaceF" name="floorSpace" value="">
								</li>
								<li>
									<label for="upAcreageF">建筑面积-地上（m²）</label>
									<input id="upAcreageF" name="upAcreage" value="">
								</li>
								<li>
									<label for="underAcreageF">建筑面积-地下（m²）</label>
									<input id="underAcreageF" name="underAcreage" value="">
								</li>
								<li>
									<label for="builderF">建设单位</label>
									<input id="builderF" name="builder" value="">
								</li>
								<li>
									<label for="proLinkManF">建筑项目联系人</label>
									<input id="proLinkManF" name="proLinkMan" value="">
								</li>
								<li>
									<label for="proLinkManTelF">建筑项目联系人电话</label>
									<input id="proLinkManTelF" name="proLinkManTel" value="">
								</li>
								<li>
									<label for="responseManF">消防安全负责人</label>
									<input id="responseManF" name="responseMan" value="">
								</li>
								<li>
									<label for="responseManTelF">消防安全负责人电话</label>
									<input id="responseManTelF" name="responseManTel" value="">
								</li>
								<li>
									<label for="architectF">设计单位</label>
									<input id="architectF" name="architect" value="">
								</li>
								<li>
									<label for="constrOrgF">施工单位</label>
									<input id="constrOrgF" name="constrOrg" value="">
								</li>
								<li>
									<label for="superUnitF">监理单位</label>
									<input id="superUnitF" name="superUnit" value="">
								</li>
							</ol>
						</div>
					</div>
					<div class="projectParts">
						<div class="createPartTop">项目基础信息</div>
						<div class="projectCreatePart">
							<ol>
								<li>
									<label for="collectorNumberF">填写采集器设备号绑定</label>
									<input id="collectorNumberF" name="collectorNumber" value="">
								</li>
								<li>
									<label for="">FCLOUD消防云负责人设置</label>
									<select v-model="responseUid" placeholder="请选择……" name="responseUid">
										<option
											v-for="item in allMemberList"
											:key="item.UserName"
											:label="item.UserName"
											:value="item.ID">
										</option>
									</select>
								</li>
							</ol>		
						</div>
					</div>
					<!-- <div class="projectParts">
						<div class="createPartTop">项目档案文件设置</div>
						<div class="projectCreatePart">
							<ol>
								<li>
									<label for="">建筑消防设施平面布置图</label>
									<input type="file" class="flatLayoutAddr" name="flatLayoutAddr" id="flatLayoutAddr" style="display:none;">
									<el-button size="small" type="primary"  @click="flatLayoutAddr">点击上传</el-button>
								</li>
								<li>
								<label for="">建筑消防设施验收文件和产品</label>
								<input type="file" class="infomationAddr" name="infomationAddr" id="infomationAddr" style="display:none;">
									<el-button size="small" type="primary"  @click="infomationAddr">点击上传</el-button>
								</li>
								<li>
								<label for="">系统使用说明书</label>
								<input type="file" class="bookSystemAddr" name="bookSystemAddr" id="bookSystemAddr" style="display:none;">
									<el-button size="small" type="primary"  @click="bookSystemAddr">点击上传</el-button>
								</li>
								<li>
								<label for="">灭火及应急疏散预案</label>
								<input type="file" class="emergencyAddr" name="emergencyAddr" id="emergencyAddr" style="display:none;">
									<el-button size="small" type="primary"  @click="emergencyAddr">点击上传</el-button>
								</li>
								<li>
									<label for="">建筑消防设施系统图</label>
									<input type="file" class="drawingSystemAddr" name="drawingSystemAddr" id="drawingSystemAddr" style="display:none;">
									<el-button size="small" type="primary"  @click="drawingSystemAddr">点击上传</el-button>
								</li>
								<li>
									<label for="">系统调试记录</label>
									<input type="file" class="debugSystemRecordAddr" name="debugSystemRecordAddr" id="debugSystemRecordAddr" style="display:none;">
									<el-button size="small" type="primary"  @click="debugSystemRecordAddr">点击上传</el-button>
									<input type="file" class="uploadFactoryPic" name="licensePath" id="uploadFactoryPic" style="display:none;">
									<el-button id="uploadFactoryPicBtn" size="small" type="primary"  @click="previewPic">预览</el-button>
									<input type="file" class="uploadFactoryPic" name="licensePath" id="uploadFactoryPic" style="display:none;">
									<el-button id="uploadFactoryPicBtn" size="small" type="primary"  @click="previewPic">重新上传</el-button>
								</li>
							</ol>
						</div>
					</div> -->
					<div class="projectCreatePart">	
						<el-button @click="projectCreateReset">取 消</el-button>
						<el-button type="primary" @click="projectCreateSubmit">确 定</el-button>
						<!-- <button type="reset">取消</button>
						<button type="submit">提交</button> -->
					</div>
				</div>
				<!-- </form> -->
			</div>
		</el-main>
	</el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
import Qs from 'qs'
export default {
name: 'ProjectCreate',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
	formFactory:{
		token: document.querySelector('#token').innerText,
		companyId: sessionStorage.getItem('companyId'),
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
	allMemberList: {},
	responseUid: ''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	// had(){
	// 	this.$router.push({
	// 		path: '/List',
	// 		name: 'List',
	// 		params: {
	// 		}
	// 	})
	// },
	uploadprojectLogoinput(){
		document.querySelector('#uploadprojectLogoinput').click();
	},
	changeprojectLogo() {
		// 通过标签选择器获取HTML元素
		var preview = document.querySelector('#projectLogo');
		var file = document.querySelector('#uploadprojectLogoinput').files[0];
		console.log(file);
		// Js内置文件流
		var reader = new FileReader();

		// 更新img标签的src属性为图片的本地路径，就可以显示了
		reader.onloadend = function () {
				preview.src = reader.result;
		}

		// 图片文件不空就显示
		if (file) {
				reader.readAsDataURL(file);
		}
	},
	flatLayoutAddr(){
		document.querySelector('#flatLayoutAddr').click();
	},
	infomationAddr(){
		document.querySelector('#infomationAddr').click();
	},
	bookSystemAddr(){
		document.querySelector('#bookSystemAddr').click();
	},
	emergencyAddr(){
		document.querySelector('#emergencyAddr').click();
	},
	drawingSystemAddr(){
		document.querySelector('#drawingSystemAddr').click();
	},
	debugSystemRecordAddr(){
		document.querySelector('#debugSystemRecordAddr').click();
	},
	projectCreateSubmit(){ 
		let _this = this;
		let projectCreateSubmitData = {};
		// 请求参数：
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司ID),int类型，必填
		// 参数3：logo(项目logo)，以file类型上传，input中name为logo，可以不用上传
		// 参数4：projectName(项目名称)，string类型，必填
		// 参数5：buildingName(单位建筑名称)，string类型，选填
		// 参数6：addressDetail(项目地址)，string类型，必填
		// 参数7：structureType(结构类型)，string类型，选填
		// 参数8：grade(耐火等级)，string类型，选填
		// 参数9：upFloor(地上层数)，int类型，选填
		// 参数10：underFloor(地下层数)，int类型，选填
		// 参数11：buildingHeight(建筑高度)，float类型，选填
		// 参数12：floorSpace(占地面积)，float类型，选填
		// 参数13：upAcreage(建筑面积-地上)，float类型，选填
		// 参数14：underAcreage(建筑面积-地下)，float类型，选填
		// 参数15：builder(建筑单位)，string类型，选填
		// 参数16：proLinkMan(建筑项目联系人)，string类型，选填
		// 参数17：proLinkManTel(建筑项目联系人电话)，string类型，选填
		// 参数18：responseMan(消防安全负责人)，string类型，选填
		// 参数19：responseManTel(消防安全负责人电话)，string类型，选填
		// 参数20：architect(设计单位)，string类型，选填
		// 参数21：constrOrg(施工单位)，string类型，选填
		// 参数22：superUnit(监理单位)，string类型，选填
		// 参数23：collectorNumber(采集器编号)，string类型，选填
		// 参数24：responseUid(消防负责人uid)，int类型，选填
		// 参数25：flatLayoutAddr(建筑消防设施平面布置图)，选填,以file类型上传，input中name为flatLayoutAddr
		// 参数26：infomationAddr(建筑消防设施的验收文件和产品)，选填，以file类型上传，input中name为infomationAddr
		// 参数27：bookSystemAddr(系统使用说明书)，选填，以file类型上传，input中name为bookSystemAddr
		// 参数28：emergencyAddr(灭火及应急疏散预案)，选填，以file类型上传，input中name为emergencyAddr
		// 参数29：drawingSystemAddr(建筑消防设施系统图)，选填，以file类型上传，input中name为drawingSystemAddr
		// 参数30：debugSystemRecordAddr(系统调试记录)，选填，以file类型上传，input中name为debugSystemRecordAddr
		projectCreateSubmitData.token = document.querySelector('#token').innerText;
		projectCreateSubmitData.companyId = sessionStorage.getItem('companyId');
		projectCreateSubmitData.projectId = sessionStorage.getItem('projectId');
		projectCreateSubmitData.logo = document.querySelector('#projectLogo').src;
		projectCreateSubmitData.projectName = document.querySelector('#projectNameF').value;
		projectCreateSubmitData.buildingName = document.querySelector('#buildingNameF').value;
		projectCreateSubmitData.addressDetail = document.querySelector('#addressDetailF').value;
		projectCreateSubmitData.structureType = document.querySelector('#structureTypeF').value;
		projectCreateSubmitData.grade = document.querySelector('#gradeF').value;
		projectCreateSubmitData.upFloor = document.querySelector('#upFloorF').value;
		projectCreateSubmitData.underFloor = document.querySelector('#underFloorF').value;
		projectCreateSubmitData.buildingHeight = document.querySelector('#buildingHeightF').value;
		projectCreateSubmitData.floorSpace = document.querySelector('#floorSpaceF').value;
		projectCreateSubmitData.upAcreage = document.querySelector('#upAcreageF').value;
		projectCreateSubmitData.underAcreage = document.querySelector('#underAcreageF').value;
		projectCreateSubmitData.builder = document.querySelector('#builderF').value;
		projectCreateSubmitData.proLinkMan = document.querySelector('#proLinkManF').value;
		projectCreateSubmitData.proLinkManTel = document.querySelector('#proLinkManTelF').value;
		projectCreateSubmitData.responseMan = document.querySelector('#responseManF').value;
		projectCreateSubmitData.responseManTel = document.querySelector('#responseManTelF').value;
		projectCreateSubmitData.architect = document.querySelector('#architectF').value;
		projectCreateSubmitData.constrOrg = document.querySelector('#constrOrgF').value;
		projectCreateSubmitData.superUnit = document.querySelector('#superUnitF').value;
		projectCreateSubmitData.collectorNumber = document.querySelector('#collectorNumberF').value;
		projectCreateSubmitData.responseUid = _this.responseUid;
		// projectCreateSubmitData.flatLayoutAddr = document.querySelector('#flatLayoutAddr').value;
		// projectCreateSubmitData.infomationAddr = document.querySelector('#infomationAddr').value;
		// projectCreateSubmitData.bookSystemAddr = document.querySelector('#bookSystemAddr').value;
		// projectCreateSubmitData.emergencyAddr = document.querySelector('#emergencyAddr').value;
		// projectCreateSubmitData.drawingSystemAddr = document.querySelector('#drawingSystemAddr').value;
		// projectCreateSubmitData.debugSystemRecordAddr = document.querySelector('#debugSystemRecordAddr').value;
		console.log(projectCreateSubmitData);
		axios.post('http://test.mhfire.cn/mhApi/Project/createProject',Qs.stringify(projectCreateSubmitData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response.data.ret_code);
			if(response.data.ret_code == 0){
				_this.dialogBaseInfos = false;
				_this.$message({
					message: '成功，项目创建成功',
					type: 'success'
				});
				setTimeout(function(){
					_this.$router.push({
						path: '/List',
						name: 'List',
					})
				},1000);
			}
		})
		.catch(function(error){
			console.log(error);
			_this.$message.error('错了哦，项目基本信息创建失败');		
		})
	},
},
//生命周期 - 创建完成（可以访问当前this实例）
// 参数1：token(用户登录token)，string类型，必填
// 参数2：companyId(公司ID)，int类型，必填
created() {
	let _this = this;
	axios.get('http://test.mhfire.cn/mhApi/Member/allMemberList',{
			params: {
				token: document.querySelector('#token').innerText,
				companyId: sessionStorage.getItem('companyId')
			}
	})
	.then(function(response){
			console.log(response);
			_this.allMemberList = response.data.data;
	})
	.catch(function(error){
			console.log(error);
	});
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
#projectLogo{
	margin-top: 20px;
	margin-bottom: 8px;
}
.projectLogo{
	display: block;
	width: 60px;
	margin: 0 auto;
}
.uploadprojectLogo{
	font-family: PFxi;
	font-size: 12px;
	color: #2f8cdb;
}
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
.projectCreateTopCont #projectCreatePost{
	width: 100%;
	border-radius: 15px;
}
.projectParts{
	width: 100%;
	margin-bottom:20px;
	background-color: #ffffff;
	border-radius: 15px;
}
.projectParts:first-child .projectCreatePart{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.projectParts li{
	list-style: none;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
}
.projectCreatePart{
	margin-top: 20px;
	padding-bottom: 10px;
}
.projectParts:nth-child(2) li:nth-child(2){
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.projectParts:nth-child(3) label{
	letter-spacing: 2px;
}
.projectParts:nth-child(3) .el-button{
	width: 134px;
	height: 40px;
	margin-left: 20px;
}
.projectParts:nth-child(3) li:nth-child(6) .upload-demo{
	display: inline-block;
	width: 134px;
	margin-right: 20px;
}
.projectParts:nth-child(3) li{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-top: 30px;
	background-color: rgba(255, 255, 255, 0.1);
	/* margin-bottom: 160px; */
}
.projectCreatePart:last-child button{
	width: 134px;
	height: 40px;
	margin-left: 60px;
}
.projectCreatePart:last-child button[type="reset"]{
	background-color: #f2f4fa;
	border: 1px solid #2f8cdb;
	border-radius: 5px;
	color: #2f8cdb;
}
.projectCreatePart:last-child button[type="submit"]{
	background-color:#2f8cdb;
	border: 1px solid #2f8cdb; 
	border-radius: 5px;
	color:#f2f4fa;
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
.projectCreateTopCont #projectCreatePost .projectCreatePart{
	width: 569px;
	margin: 0 auto;
}
.projectCreateTopCont #projectCreatePost label{
	font-family: "PFz";
	color: #333;
	font-size: 14px;
	width: 145px;
	text-align: right;
}
.projectCreateTopCont #projectCreatePost input{
	width: 389px;
	height: 40px;
	background-color: #f6f6f6;
	border: none;
	outline: none;
	margin-left: 20px;
	border-radius: 5px;
	text-indent: 20px;
}
.projectCreateTopCont select{
	width: 204px;
	height: 40px;
	margin-left: 15px;
	background-color: #f6f6f6;
	border:none;
	border-radius: 5px;
	outline: none;
	cursor: pointer;
}
.projectCreateTopCont select option{
	cursor: pointer;
}
</style>