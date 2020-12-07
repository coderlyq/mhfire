<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header style="background-color:#fff;" class="ProjectListBarHead">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="ProjectListTopTitle">
				<el-breadcrumb-item :to="{ path: '/List' }">返回上层</el-breadcrumb-item>
				<el-breadcrumb-item>项目信息管理</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- <span class="ProjectListTopTitle">项目信息管理</span> -->
			<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="projectvalue" placeholder="全部项目" @change="getProjectEcharsData()">
				<el-option
					v-for="item in allProjectList"
					:key="item.ProjectName"
					:label="item.ProjectName"
					:value="item.ID">
				</el-option>
			</el-select>
		</el-header>
		<el-main class="ProjectListContMain">
			<div class="ProjectListdefault">
				<div class="ProjectListDefTop">项目基础信息</div>
				<div class="ProjectListDefCont">
					<img src="~@/assets/images/Person/ProjectBaseImg.png" alt="">
					<ol class="ProjectListDefContOl">
						<li>项目名称：{{projectDetail.baseInfo.ProjectName}}</li>
						<li>单位建筑名称：{{projectDetail.baseInfo.BuildingName}}</li>
						<li>项目地址：{{projectDetail.baseInfo.AddressDetail}}</li>
						<li>防火等级：{{projectDetail.baseInfo.Grade}}</li>
						<li>地上层数：{{projectDetail.baseInfo.UpFloor}}</li>
						<li>地下层数：{{projectDetail.baseInfo.UnderFloor}}</li>
						<li>建筑面积-地下：{{projectDetail.baseInfo.UnderAcreage}}</li>
						<li>建筑面积-地上：{{projectDetail.baseInfo.UpAcreage}}</li>
						<li>结构类型：{{projectDetail.baseInfo.structureType}}</li>
						<li>建筑高度：{{projectDetail.baseInfo.buildingHeight}}</li>
						<li>占地面积：{{projectDetail.baseInfo.floorSpace}}</li>
						<li>建筑项目联系人：{{projectDetail.baseInfo.ProLinkMan}}</li>
						<li>设计单位：{{projectDetail.baseInfo.architect}}</li>
						<li>施工单位：{{projectDetail.baseInfo.constrOrg}}</li>
						<li>监理单位：{{projectDetail.baseInfo.superUnit}}</li>
						<li>建筑单位：{{projectDetail.baseInfo.builder}}</li>
						<li>建筑项目联系人电话：{{projectDetail.baseInfo.ProLinkManTel}}</li>
						<li>消防安全负责人：{{projectDetail.baseInfo.ResponseMan}}</li>
						<li>消防安全负责人电话：{{projectDetail.baseInfo.ResponseManTel}}</li>
					</ol>
					<el-button type="primary" @click="dialogBaseInfos=true">修改基础信息<i class="el-icon-edit-outline el-icon--right"></i></el-button>
				</div>
			</div>
			<div class="ProjectListdevID">
				<div class="ProjectListdevIDText">
					采集器设备号：<span class="ProjectListdevIDValue">{{projectDetail.proCollector.CollectorNum}}</span>
				</div>
				<el-button type="primary" @click="dialogChangeCollectorVisible=true">更换采集器</el-button>
			</div>
			<div class="ProjectListPower">
				<div class="ProjectListPowerName">
					FCloud消防云负责人：<span class="ProjectListPowerNameValue">{{ProjectListPower.UserName}}</span>
				</div>
				<div class="ProjectListPowerTel">
					负责人电话：<span class="ProjectListPowerTelValue">{{ProjectListPower.UserPhone}}</span>
				</div>
				<el-button type="primary" @click="dialogTableVisible=true">更换项目负责人</el-button>
			</div>
			<div class="ProjectElement">
				<div class="ProjectElementTop">项目下的员工</div>
				<ol class="ProjectElementItem">
					<li v-for="(item,index) in memberList" :key="item.UserName">
						<img :src="item.FaceImg" alt="" class="ProjectElementImg" height="60" width="60">
						<dl>
							<dt></dt>
							<dd>姓名：<span>{{item.UserName}}</span></dd>
							<dd>电话：<span>{{item.UserPhone}}</span></dd>
						</dl>
						<el-button type="primary" plain="true" @click="deleteMember(index)" icon="el-icon-delete" circle></el-button>
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
			<el-dialog :visible.sync="dialogTableVisible" class="memberDialog" :before-close="handleClose" style="cellspacing:20px;cellpadding:20px;">
				<div class="ProjectElementTop">项目下的员工</div>
				<ol class="ProjectElementItem">
					<li v-for="(item,index) in memberList" :key="item.UserName">
						<img :src="item.FaceImg" alt="" class="ProjectElementImg" height="60" width="60">
						<dl>
							<dt></dt>
							<dd>姓名：<span>{{item.UserName}}</span></dd>
							<dd>电话：<span>{{item.UserPhone}}</span></dd>
						</dl>
						<el-button type="primary" :plain="true" @click="changeMember(index)" icon="el-icon-sort" style="transform:rotate(90deg);" circle></el-button>
					</li>
				</ol>
			</el-dialog>
			<el-dialog :visible.sync="dialogBaseInfos" class="BaseInfosDialog" :before-close="handleClose" style="cellspacing:20px;cellpadding:20px;">
					<ol class="BaseInfosCont">
						<li>
							<label for="projectNameF">项目名称</label>
							<input id="projectNameF" v-model="projectDetail.baseInfo.ProjectName" name="projectName">
						</li>
						<li>
							<label for="addressDetailF">项目地址</label>
							<input id="addressDetailF" v-model="projectDetail.baseInfo.addressDetail" name="addressDetail">
						</li>
						<li>
							<label for="buildingNameF">单体建筑名称</label>
							<input id="buildingNameF" v-model="projectDetail.baseInfo.buildingName" name="buildingName">
						</li>
						<li>
							<label for="structureTypeF">结构类型</label>
							<input id="structureTypeF" v-model="projectDetail.baseInfo.structureType" name="structureType">
						</li>
						<li>
							<label for="gradeF">耐火等级</label>
							<input id="gradeF" v-model="projectDetail.baseInfo.grade" name="grade">
						</li>
						<li>
							<label for="upFloorF">层数-地上</label>
							<input id="upFloorF" v-model="projectDetail.baseInfo.upFloor" name="upFloor">
						</li>
						<li>
							<label for="underFloorF">层数-地下</label>
							<input id="underFloorF" v-model="projectDetail.baseInfo.underFloor" name="underFloor">
						</li>
						<li>
							<label for="buildingHeightF">建筑高度（m）</label>
							<input id="buildingHeightF" v-model="projectDetail.baseInfo.buildingHeight" name="buildingHeight">
						</li>
						<li>
							<label for="floorSpaceF">占地面积1（m²）</label>
							<input id="floorSpaceF" v-model="projectDetail.baseInfo.floorSpace" name="floorSpace">
						</li>
						<li>
							<label for="upAcreageF">建筑面积-地上（m²）</label>
							<input id="upAcreageF" v-model="projectDetail.baseInfo.upAcreage" name="upAcreage">
						</li>
						<li>
							<label for="underAcreageF">建筑面积-地下（m²）</label>
							<input id="underAcreageF" v-model="projectDetail.baseInfo.underAcreage" name="underAcreage">
						</li>
						<li>
							<label for="builderF">建设单位</label>
							<input id="builderF" v-model="projectDetail.baseInfo.builder" name="builder">
						</li>
						<li>
							<label for="proLinkManF">建筑项目联系人</label>
							<input id="proLinkManF" v-model="projectDetail.baseInfo.proLinkMan" name="proLinkMan">
						</li>
						<li>
							<label for="proLinkManTelF">建筑项目联系人电话</label>
							<input id="proLinkManTelF" v-model="projectDetail.baseInfo.proLinkManTel" name="proLinkManTel">
						</li>
						<li>
							<label for="responseManF">消防安全负责人</label>
							<input id="responseManF" v-model="projectDetail.baseInfo.responseMan" name="responseMan">
						</li>
						<li>
							<label for="responseManTelF">消防安全负责人电话</label>
							<input id="responseManTelF" v-model="projectDetail.baseInfo.responseManTel" name="responseManTel">
						</li>
						<li>
							<label for="architectF">设计单位</label>
							<input id="architectF" v-model="projectDetail.baseInfo.architect" name="architect">
						</li>
						<li>
							<label for="constrOrgF">施工单位</label>
							<input id="constrOrgF" v-model="projectDetail.baseInfo.constrOrg" name="constrOrg">
						</li>
						<li>
							<label for="superUnitF">监理单位</label>
							<input id="superUnitF" v-model="projectDetail.baseInfo.superUnit" name="superUnit">
						</li>
					</ol>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogBaseInfos = false">取 消</el-button>
						<el-button type="primary" @click="BaseInfosSubmit">确 定</el-button>
					</span>
			</el-dialog>
			<el-dialog
				title="提示"
				:visible.sync="dialogChangeCollectorVisible"
				width="30%"
				:before-close="handleClose" class="changeCollectorDialog">
				<el-input v-model="projectDetail.proCollector.CollectorNum" placeholder="请输入内容"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogChangeCollectorVisible = false">取 消</el-button>
					<el-button type="primary" @click="changeCollector">确 定</el-button>
				</span>
			</el-dialog>
		</el-main>
	</el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
import Qs from 'qs'
export default {
	name:'ProjectList',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		dialogBaseInfos: false,
		allProjectList: '',
		ProjectListPower:'',//项目负责人
		dialogTableVisible: false,
		dialogChangeCollectorVisible: false,
		value: '',
		memberList: '',
		projectDetail: '',
		projectvalue: '',
		fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
	};
},
//方法集合
methods: {
	handleClose(done) {
		this.$confirm('确认关闭？')
			.then(_ => {
				done(_);
			})
			.catch(_ => {_});
	},
	getProjectEcharsData(){
		let _this = this;
		let token = document.querySelector('#token').innerText;
		let projectId = this.projectvalue;
		let companyId = sessionStorage.getItem('companyId')!=" "?sessionStorage.getItem('companyId'):0;
		axios.get('http://test.mhfire.cn/mhApi/Project/projectDetail',{
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
			console.log(response.data.data);
			_this.projectDetail = response.data.data;
			_this.ProjectListPower = response.data.data.projectResponsible;
		})
		.catch(function(error){
				console.log(error);
		})
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
			console.log(response.data.data);
			_this.memberList = response.data.data;
		})
		.catch(function(error){
				console.log(error);
		})
	},
	BaseInfosSubmit(){
		let _this = this;
		let BaseInfosData = {};
// 参数1：token(用户登录token)，string类型，必填
// 参数2：companyId(公司ID),int类型，必填
// 参数3：projectId(项目ID)，int类型，必填
// 参数4：logo(项目logo)，可以不用上传
// 参数5：projectName(项目名称)，string类型，必填
// 参数6：buildingName(单位建筑名称)，string类型，选填
// 参数7：addressDetail(项目地址)，string类型，必填
// 参数8：structureType(结构类型)，string类型，选填
// 参数9：grade(耐火等级)，string类型，选填
// 参数10：upFloor(地上层数)，int类型，选填
// 参数11：underFloor(地下层数)，int类型，选填
// 参数12：buildingHeight(建筑高度)，float类型，选填
// 参数13：floorSpace(占地面积)，选填
// 参数14：upAcreage(建筑面积-地上)，选填
// 参数15：underAcreage(建筑面积-地下)，选填
// 参数16：builder(建筑单位)，string类型，选填
// 参数17：proLinkMan(建筑项目联系人)，string类型，选填
// 参数18：proLinkManTel(建筑项目联系人电话)，string类型，选填
// 参数19：responseMan(消防安全负责人)，string类型，选填
// 参数20：responseManTel(消防安全负责人电话)，string类型，选填
// 参数21：architect(设计单位)，string类型，选填
// 参数22：constrOrg(施工单位)，string类型，选填
// 参数23：superUnit(监理单位)，string类型，选填
		BaseInfosData.token = document.querySelector('#token').innerText;
		BaseInfosData.companyId = sessionStorage.getItem('companyId');
		BaseInfosData.projectId = sessionStorage.getItem('projectId');
		
		BaseInfosData.projectName = this.projectDetail.baseInfo.ProjectName;
		BaseInfosData.buildingName = this.projectDetail.baseInfo.BuildingName;
		BaseInfosData.addressDetail = this.projectDetail.baseInfo.AddressDetail;
		BaseInfosData.structureType = this.projectDetail.baseInfo.StructureType;
		BaseInfosData.grade = this.projectDetail.baseInfo.Grade;
		BaseInfosData.upFloor = this.projectDetail.baseInfo.UpFloor;
		BaseInfosData.underFloor = this.projectDetail.baseInfo.UnderFloor;
		BaseInfosData.buildingHeight = this.projectDetail.baseInfo.BuildingHeight;
		BaseInfosData.floorSpace = this.projectDetail.baseInfo.FloorSpace;
		BaseInfosData.upAcreage = this.projectDetail.baseInfo.UpAcreage;
		BaseInfosData.underAcreage = this.projectDetail.baseInfo.UnderAcreage;
		BaseInfosData.builder = this.projectDetail.baseInfo.Builder;
		BaseInfosData.proLinkMan = this.projectDetail.baseInfo.ProLinkMan;
		BaseInfosData.proLinkManTel = this.projectDetail.baseInfo.ProLinkManTel;
		BaseInfosData.responseMan = this.projectDetail.baseInfo.ResponseMan;
		BaseInfosData.responseManTel = this.projectDetail.baseInfo.ResponseManTel;
		BaseInfosData.architect = this.projectDetail.baseInfo.Architect;
		BaseInfosData.constrOrg = this.projectDetail.baseInfo.ConstrOrg;
		BaseInfosData.superUnit = this.projectDetail.baseInfo.SuperUnit;
		console.log(BaseInfosData);
		axios.post('http://test.mhfire.cn/mhApi/Project/updateProject',Qs.stringify(BaseInfosData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response.data.ret_code);
			if(response.data.ret_code == 0){
				_this.dialogBaseInfos = false;
				_this.$message({
					message: '成功，基本信息更新成功',
					type: 'success'
				});
			}
		})
		.catch(function(error){
			console.log(error);
			_this.$message.error('错了哦，基本信息更新失败');		
		})
	},
	changeCollector(){
		this.dialogChangeCollectorVisible = false;
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司ID)，int类型，必填
		// 参数3：projectId(项目ID)，int类型，必填
		// 参数4：collectorNumber(采集器编号)，string类型，必填
		let _this = this;
		let changeCollector = {
			token: document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			projectId: this.$route.params.projectId,
			collectorNumber: this.projectDetail.proCollector.CollectorNum
		};
		axios.post('http://test.mhfire.cn/mhApi/Project/setProjectCollector',Qs.stringify(changeCollector),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response.data.ret_code);
			if(response.data.ret_code == 0){
				_this.$message({
					message: '成功，采集器更换成功',
					type: 'success'
				});
			}
		})
		.catch(function(error){
			console.log(error);
			_this.$message.error('错了哦，采集器更换失败');		
		})
	},
	changeMember(index){
		this.ProjectListPower = this.memberList[index];//改变data中的管理员数据
		this.dialogTableVisible=false;//关闭弹窗
		let _this = this;
		let projectPower = {
			token: document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			projectId: this.$route.params.projectId,
			uid: this.ProjectListPower.ID
		};
		axios.post('http://test.mhfire.cn/mhApi/Project/setProjecResponsePerson',Qs.stringify(projectPower),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response.data.ret_code);
			if(response.data.ret_code == 0){
				_this.$message({
					message: '成功，项目负责人更改成功',
					type: 'success'
				});
			}
		})
		.catch(function(error){
			console.log(error);
			_this.$message.error('错了哦，项目负责人更改失败');		
		})
	},
	deleteMember(index){
		let _this = this;
		let delProjectMember = {
			token: document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			projectId: this.$route.params.projectId,
			uid: this.memberList[index].ID
		};
		console.log('*************************************');
		console.log(Qs.stringify(delProjectMember));
		this.memberList.splice(index,1);
		axios.post('http://test.mhfire.cn/mhApi/Project/delProjectMember',Qs.stringify(delProjectMember),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response.data.ret_code);
			if(response.data.ret_code == 0){
				_this.$message({
					message: '删除成功',
					type: 'success'
				});
			}
		})
		.catch(function(error){
			console.log(error);
			_this.$message.error('删除失败');		
		})
	},
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
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
	let _this = this;
	let token = document.querySelector('#token').innerText;
	let projectId = sessionStorage.getItem('projectId');

	let companyId = sessionStorage.getItem('companyId')!=" "?sessionStorage.getItem('companyId'):0;
	axios.get('http://test.mhfire.cn/mhApi/Project/allProjectList',{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司id)，int类型，必填
		params: {
			token: document.querySelector('#token').innerText,
			companyId: companyId
		}
	})
	.then(function(response){
		_this.allProjectList = response.data.data;
		// _this.projectvalue = _this.allProjectList[0].ProjectName;
		console.log(response);
	})
	.catch(function(error){
			console.log(error);
	})
	axios.get('http://test.mhfire.cn/mhApi/Project/projectDetail',{
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
		console.log(response.data.data);
		_this.projectDetail = response.data.data;
		_this.ProjectListPower = response.data.data.projectResponsible;
	})
	.catch(function(error){
			console.log(error);
	})
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
		console.log(response.data.data);
		_this.memberList = response.data.data;
	})
	.catch(function(error){
			console.log(error);
	})
},
}
</script>
<style>
.BaseInfosCont{
	padding-left: 0;
}
	.BaseInfosCont li{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		list-style: none;
		width: 600px;
		margin: 0 auto;
		margin-top: 20px;
	}
	.BaseInfosCont label{
		font-family: "PFz";
		color: #333;
		font-size: 14px;
		width: 165px;
		text-align: right;
		letter-spacing: 2px;
	}
	.BaseInfosCont input{
		width: 389px;
		height: 40px;
		background-color: #f6f6f6;
		border: none;
		outline: none;
		margin-left: 20px;
		border-radius: 5px;
		text-indent: 20px;
	}
	.memberDialog>div{
		width: 779px;
	}
	.memberDialog>div li{
		float: left;
		margin-right: 30px;
	}
	.memberDialog .ProjectElementItem{
		padding-left: 25px;
	}
	.changeCollectorDialog>div{
		width: 436px;
	}
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