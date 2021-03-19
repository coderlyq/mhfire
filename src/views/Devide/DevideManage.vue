<!--  -->
<template>
	<div class='devideManage'>
		<el-container class="devideCont">
			<el-header class="devideContTop">
				<div class="devideLeft">
					<span id="goback" style="color:#333;" @click="toIndex()">返回上层 > </span>
					<span>物联设备管理</span>	
				</div>
				<div class="devideRight" @input="checkDevideList" @compositionend="checkDevideList">
					<el-input placeholder="通过设备名称/地址/IMEI查找设备" v-model="inputDevideCheck" id="inputDevideCheck">
						<!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
					</el-input>
					<el-button type="primary" @click="addIMEI">新增设备<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
				</div>
			</el-header>
			<el-main class="devideInfos">
				<el-tabs v-model="groupId" type="card" :closable="closableBoolean" @tab-remove="removeTab" @tab-click="tabClick">
					<el-tab-pane
						v-for="item in allGroup"
						:key="item.id"
						:label="item.name"
						:name="item.id"
					>
					</el-tab-pane>
				</el-tabs>
				<div class="devideTopRight">
					<el-button type="primary" class="devideTopRightOutput" plain @click="output()">导出设备表</el-button>
					<el-button type="danger" class="devideTopRightDelete" @click="deleteTab()">删除分组</el-button>
					<el-button type="primary" class="devideTopRightAdd" @click="addTab()">添加新分组<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
				</div>
				<!-- <el-button type="primary" plain class="allInsertDev" @click="openCheckDev">加入设备</el-button> -->
				<el-table
					:data="deviceList"
					style="width: 100%;cursor: pointer;"
					:default-sort = "{prop: 'typename', order: 'descending'}"
					>
					<el-table-column
						prop="groupID"
						label="序列号"
						align="center">
					</el-table-column>
					<el-table-column
						prop="typename"
						sortable
						label="NB感烟探测器"
						align="center">
					</el-table-column>
					<el-table-column
						prop="remark"
						label="设备备注"
						align="center">
					</el-table-column>
					<el-table-column
						prop="status"
						label="设备状态"
						align="center">
					</el-table-column>
					<el-table-column
						prop="devid"
						label="设备IMEI"
						align="center">
					</el-table-column>
					<el-table-column
						prop="address"
						label="设备地址"
						align="center">
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						width="250"
						>
						<template slot-scope="scope">
							<div v-if="scope.row.groupId<=1">
								<el-popconfirm
									@onConfirm="deleteSingleDevide(scope.row)"
									confirm-button-text='好的'
									cancel-button-text='不用了'
									icon="el-icon-info"
									icon-color="red"
									title="确定删除此设备？"
								>
									<el-button type="text" size="small" style="color:#f27978;margin-right:20px;text-decoration:underline" slot="reference">删除</el-button>
								</el-popconfirm>
								<el-button @click="editSingleDevide(scope.row)" style="text-decoration:underline;margin-right:20px;" type="text" size="small">编辑</el-button>
								<el-button @click="closeSingleDevide(scope.row,scope.$index)" class="closeAlerm" style="text-decoration:underline;margin-right:20px;" type="text" size="small">关闭响铃</el-button>
								<el-button @click="checkSingleDevide(scope.row)" type="text" size="small" style="margin-left:0;color:#2f8cdb;margin-right:20px;text-decoration:underline">查看</el-button>
							</div>
							<div v-if="scope.row.groupId>1">
								<el-popconfirm
									@onConfirm="removeSingleDevide(scope.row)"
									confirm-button-text='确定'
									cancel-button-text='取消'
									icon="el-icon-info"
									icon-color="red"
									title="确定在该组中移除此设备？
									如需找回，可在所有设备组中找回"
								>
									<el-button type="text" size="small" style="color:#f27978;margin-right:20px;text-decoration:underline" slot="reference">移除</el-button>
								</el-popconfirm>
								<el-button @click="editSingleDevide(scope.row)" style="text-decoration:underline;margin-right:20px;" type="text" size="small">编辑</el-button>
								<el-button @click="closeSingleDevide(scope.row,scope.$index)" class="closeAlerm" style="text-decoration:underline;margin-right:20px;" type="text" size="small">关闭响铃</el-button>
								<el-button @click="checkSingleDevide(scope.row)" type="text" size="small" style="margin-left:0;color:#2f8cdb;margin-right:20px;text-decoration:underline">查看</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="devidePage">
					<el-pagination
						@current-change="handleDevideChange"
						:current-page.sync="currentPage3"
						:page-size="10"
						:hide-on-single-page="true"
						layout="prev, pager, next, jumper"
						:total="deviceListCount">
					</el-pagination>
				</div>
<!-- 弹框 -->
				<el-dialog class="devEditDialog" title="编辑设备信息" :visible.sync="editSingleDevideDialog">
					<el-form>
						<el-form-item label="设备备注" :label-width="formLabelWidth">
							<el-input v-model="currentDevideInfos.remark" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="设备地址" :label-width="formLabelWidth">
							<el-input v-model="currentDevideInfos.address" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="修改分组" :label-width="formLabelWidth">
							<el-select v-model="itemName" placeholder="默认分组">
								<el-option
									v-for="item in allGroup"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="editSingleDevideDialog = false">取 消</el-button>
						<el-button type="primary" @click="editSingleDevidePost">确 定</el-button>
					</div>
				</el-dialog>
				<el-dialog class="devImportDialog" title="请输入设备的IMEI码" id="devImportDialog" :visible.sync="devImportDialog">
					<el-form class="demo-form-inline" id="excelUpload">
						<el-input v-model="devImport.strIMEI" type="text" placeholder="请输入设备IMEI码"></el-input>
						<input class="noBorder" @change="getFile($event)" type="file" placeholder="审批人" id="uploadFile" style="display:none;" v-if="ishowFile">
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">通过EXCLE批量导入</el-button>
						<div>
							<el-popover
								placement="right"
								width="737"
								trigger="click">
								<img src="~@/assets/images/DevideManage/uploadDemo.png" alt="">
								<p slot="reference">批量导入格式预览</p>
							</el-popover>
						</div>
						<el-row>
							<el-button @click="insertDevCancle">取消</el-button>
							<el-button @click="insertDevSubmit" type="primary">确认</el-button>
						</el-row>
					</el-form>
				</el-dialog>
				<el-dialog class="devInsertDialog" title="批量加入该分组" :visible.sync="devInsertDialog">
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="city in groupDeviceList" :label="city" :key="city">
							<span class="devTypeName" style="margin-left:30px;">{{city.typename}}</span>
							<span class="devRemark" style="margin-left:52px;">{{city.remark}}</span>
							<span class="devStatus" v-if="city.status=='正常'" style="color:#40d96e;margin-left:45px;">{{city.status}}</span>
							<span class="devStatus" v-else style="color:red;margin-left:45px;">{{city.status}}</span>
							<span class="devID" style="margin-left:61px;">{{city.devid}}</span>
							<span class="devAddress" style="margin-left:48px;">{{city.address}}</span>	
						</el-checkbox>
					</el-checkbox-group>
					<div style="margin: 15px 0;"></div>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				</el-dialog>
			</el-main>
		</el-container>
	</div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
export default {
	name: "DevideManage",
	//import引入的组件需要注入到对象中才能使用
	data() {
		//这里存放数据
		return {
			checkAll: false,
			// cities:['上海','北京','广州','深圳'],
			cities:[{id:1,name:'上海'},{id:1,name:'北京'},{id:1,name:'广州'},{id:1,name:'深圳'}],
			isIndeterminate: true,
			checkedCities: [],
			itemName:'默认分组',
			currentDevideID: 0,
			inputDevideCheck: "",
			allGroup: [],
			devImport:{
				strIMEI:""
			},
			devImportDialog: false,
			devInsertDialog: false,
			newDeviceIMEI: '',
			editSingleDevideDialog: false,
			closableBoolean: false,
			tabIndex: 2,
			deviceList: [],
			keyword: " ",
			groupId: 0,
			groupDeviceList: [],
			page: 1,
			historyEveCount: 100,
			formLabelWidth: '75px',
			currentDevideInfos: {},
			ishowFile: true,
			file: {},
			imei: " "
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
		insertDevCancle(){
			this.devImportDialog = false;
		},
		insertDevSubmit(){
			this.addDeviceM();
		},
		output(){
			let _this = this;
			let this_url = 'http://test.mhfire.cn/mhApi/Device/exportDevice?token='+document.querySelector('#token').innerText+'&projectId='+sessionStorage.getItem('projectId')+'&groupId='+_this.groupId;
			window.open(this_url); 
			// axios.get(this_url,{
			// 	// 参数1：token(用户token)，string类型，必填
			// 	// 参数2：projectId（项目id）,int类型，必填
			// 	// 参数3：groupId（分组id），int类型，必填
			// 	// params: {
			// 	// 	token: document.querySelector('#token').innerText,
			// 	// 	projectId: sessionStorage.getItem('projectId'),
			// 	// 	groupId: _this.groupId
			// 	// }
			// })
			// .then(function(response){
			// 	console.log(response);
			// 	console.log('11111111111');
			// 	if(response.data.ret_code==101||response.data.ret_code==102||response.data.ret_code==201||response.data.ret_code==202){
			// 		console.log('22222');
			// 		_this.$message({
			// 			type: 'info',
			// 			message: response.data.message
			// 		});
			// 	}
			// })
			// .catch(function(error){
			// 	console.log(error);
			// })
		},
		toIndex(){
			this.$router.push('/List');
		},
		handleCheckAllChange(val) {
			// alert(val);
			this.checkedCities = val ? this.groupDeviceList : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.groupDeviceList.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.groupDeviceList.length;
		},
		openCheckDev() {
			this.devInsertDialog = true;
			let _this = this;
			axios.get('http://test.mhfire.cn/mhApi/Device/getGroupDeviceList',{
				// 参数1：token(用户token)，string类型，必填
				// 参数2：projectId（项目id），int类型，必填
				// 参数3：groupId（分组id），int类型，必填
				// 参数4：page（分页数），int类型，默认为1，选填
				params: {
					token: document.querySelector('#token').innerText,
					projectId: sessionStorage.getItem('projectId'),
					groupId: _this.groupId,
					page: 1
				}
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.groupDeviceList = response.data.data.result;
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		submitUpload(){
			this.ishowFile = true;
			// IE浏览器
			if(document.all) {
				document.getElementById("uploadFile").click();
			}
			// 其它浏览器
			else {
				var e = document.createEvent("MouseEvents");
				e.initEvent("click", true, true);
				document.getElementById("uploadFile").dispatchEvent(e);
			}
		},
		getFile(event, input_file_name){
			this.file = event.target.files[0];
			this.devImport.strIMEI = event.target.files[0].name;
			this.openUploadAligo();
		},
		openUploadAligo(){
			let booleanUp = /\.xl(s[xmb]|t[xm]|am)$/.exec(this.devImport.strIMEI);
			if(!booleanUp){
				this.$message.error('文件格式不正确，请上传*.xls;*.xl*;*.xla;*.xlt;*.xlm;*.xlc;*.xlw格式文件');
			}
		},
		addDeviceM() {
			if(!this.devImport.strIMEI){
				this.$message.error('新增设备不能为空，请输入相关设备号或上传文件');
				return false;
			}else{
				this.devImportDialog = false;
			};
			if(/\.xl(s[xmb]|t[xm]|am)$/.exec(this.devImport.strIMEI)){
				this.devImport.strIMEI = "";
			}
			let _this = this;
			let formData = new FormData();
			formData.append('token', document.querySelector('#token').innerText);
			formData.append('groupId', 1);
			formData.append('projectId', sessionStorage.getItem('projectId'));
			formData.append('imei', this.devImport.strIMEI);
			formData.append('file', this.file);
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			this.$http.post('http://test.mhfire.cn/mhApi/Device/addDevice', formData, config).then(function (res) {
				if (res.body.ret_code === 0) {
					_this.$message({
						type: 'success',
						message: res.body.message
					});
					_this.devideSearchAll();
					_this.ishowFile = true;
				}else{
					_this.$message({
						type: 'info',
						message: res.body.message
					});
					_this.ishowFile = true;
				}
			}).catch((error) => {
					console.log(error);
			});
			this.ishowFile = false;
			this.devImport.strIMEI = "";
		},
		addIMEI() {
			this.devImportDialog = true;
		},
		confirm(){
			alert("confirm");
		},
		deleteTab(){
			this.closableBoolean = true;
		},
		tabClick(targetName){
			this.groupId = targetName.name;
			if(targetName.name==0){
				this.devideSearchAll();
			}else{
				this.devideSearch();
			}
			this.page = 1;
		},
		getAllGroup(){
			let _this = this;
			axios.get('http://test.mhfire.cn/mhApi/Device/getAllGroup',{
				// 参数1：token(用户token)，string类型，必填
				// 参数2：projectId（项目id），int类型，必填
				params: {
					token: document.querySelector('#token').innerText,
					projectId: sessionStorage.getItem('projectId')
				}
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.allGroup = response.data.data;
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		addTab() {
			let _this = this;
			this.$prompt('添加新分组', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPlaceholder: '输入新分组名称'
			}).then(({ value }) => {
				let addGroupData = {
					token: document.querySelector('#token').innerText,
					projectId: sessionStorage.getItem('projectId'),
					name: value
				};
				axios.post('http://test.mhfire.cn/mhApi/Device/addGroup',Qs.stringify(addGroupData),{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
						// 参数1：token(用户token)，string类型，必填
						// 参数2：projectId（项目id）,int类型，必填
						// 参数3：name（分组名称），string类型，必填
				})
				.then(function(response){
					if(response.data.ret_code==0){
						_this.$message({
							type: 'success',
							message: '您的新分组是: ' + value
						});
						_this.getAllGroup();
					}else{
						_this.$message({
							type: 'info',
							message: response.data.message
						});
					}
				})
				.catch(function(error){
					console.log(error);
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});       
			});
		},
		// addTabIndex(value) {
		// 	let newTabName = ++this.tabIndex + '';
		// 	this.allGroup.push({
		// 		id: value,
		// 		name: newTabName,
		// 		content: 'New Tab content'
		// 	});
		// 	this.editableTabsValue = newTabName;
		// 	console.log(value);
		// },
		removeTab(targetName) {
			let _this = this;
			let delGroup = {
				token: document.querySelector('#token').innerText,
				groupId: targetName,
				projectId: sessionStorage.getItem('projectId')
			};
			axios.post('http://test.mhfire.cn/mhApi/Device/delGroup',Qs.stringify(delGroup),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
					// 参数1：token(用户token)，string类型，必填
					// 参数2：groupId（分组id）,int类型，必填
					// 参数3：projectId（项目id）,int类型，必填
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.$message({
						type: 'success',
						message: '分组删除成功'
					});
					_this.getAllGroup();
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})

			// let tabs = this.allGroup;
			// let activeID = targetName;
			// if (activeID === targetName) {
			// 	tabs.forEach((tab, index) => {
			// 		if (tab.id === targetName) {
			// 			let nextTab = tabs[index + 1] || tabs[index - 1];
			// 			if (nextTab) {
			// 				activeID = nextTab.id;
			// 			}
			// 		}
			// 	});
			// }
			// this.editableTabsValue = activeID;
			// this.allGroup = tabs.filter(tab => tab.id !== targetName);
		},
		checkDevideList(){
			this.keyword = document.querySelector('#inputDevideCheck').value;
			// this.keyword = this.inputDevideCheck;
			this.devideSearch();
		},
		deleteSingleDevide(row){
			window.event.cancelBubble = true;
			let _this = this;
			let delDeviceData = {
				token: document.querySelector('#token').innerText,
				projectId: sessionStorage.getItem('projectId'),
				id: row.id
			};
			axios.post('http://test.mhfire.cn/mhApi/Device/delDevice',Qs.stringify(delDeviceData),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
					// 参数1：token(用户token)，string类型，必填
					// 参数2：projectId（项目id），int类型，必填
					// 参数3：id(设备id号)，int类型，必填
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.$message({
						type: 'success',
						message: '设备删除成功'
					});
					_this.getAllGroup();
					_this.devideSearch();
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		removeSingleDevide(row) {
			window.event.cancelBubble = true;
			let _this = this;
			let removeGroupData = {
				token: document.querySelector('#token').innerText,
				projectId: sessionStorage.getItem('projectId'),
				groupId: _this.groupId,
				id: row.id
			};
			axios.post('http://test.mhfire.cn/mhApi/Device/removeGroup',Qs.stringify(removeGroupData),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
					// 参数1：token(用户token)，string类型，必填
					// 参数2：groupId（分组id）,int类型，必填
					// 参数3：id(设备id号)，int，必填
					// 参数4：projectId（项目id）,int类型，必填
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.$message({
						type: 'success',
						message: '设备移除成功'
					});
					_this.getAllGroup();
					_this.devideSearch();
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		openSingleDevide(row){
			let _this = this;
			let openSingleDevide = {
				"deviceId": row.relation_dev[0].relation_devideQR,
				"cmd": "OUTPUT_CTL",
				"para": "1"
			};
			axios.post('http://39.108.157.254:8080/alarm',JSON.stringify(openSingleDevide))
			.then(function(response){
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
		},
		closeSingleDevide(row,index){
			let closeAlerm = document.getElementsByClassName('closeAlerm')[index];
			let closeAlermSpan = closeAlerm.getElementsByTagName('span')[0];
			let closeNum = 10;
			let closeInter = setInterval(function(){
				closeAlermSpan.style.color = "#999999";
				closeAlerm.style.textDecorationColor = "#999999";
				closeAlermSpan.innerText = --closeNum+"s";
				closeAlerm.setAttribute("disabled", "disabled");
				closeAlerm.style.cursor = "not-allowed";
				if(closeNum === 0){
					clearInterval(closeInter);
					closeAlermSpan.innerText = "关闭响铃";
					closeAlermSpan.style.color = "#409EFF";
					closeAlerm.style.textDecorationColor = "#409EFF";
					closeAlerm.removeAttribute("disabled");
					closeAlerm.style.cursor = "pointer";
				}
			},1000);
			let _this = this;
			let closeSingleDevide = {
				"deviceId": row.relation_dev[0].relation_devideQR,
				"cmd": "OUTPUT_CTL",
				"para": "0"
			};
			axios.post('http://39.108.157.254:8080/alarm',JSON.stringify(closeSingleDevide))
			.then(function(response){
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
		},
		editSingleDevide(row){
			window.event.cancelBubble = true;
			this.editSingleDevideDialog = true;
			this.currentDevideID = row.id;
			let _this = this;
			axios.get('http://test.mhfire.cn/mhApi/Device/getDeviceInfo',{
				// 参数1：token(用户token)，string类型，必填
				// 参数2：projectId（项目id），int类型，必填
				// 参数3：id(设备id号)，int类型，必填
				params: {
					token: document.querySelector('#token').innerText,
					projectId: sessionStorage.getItem('projectId'),
					id: this.currentDevideID
				}
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.currentDevideInfos = response.data.data;
					_this.allGroup.forEach((itemGroup)=>{
						if(itemGroup.id==_this.groupId){
							_this.itemName = itemGroup.name;
						}
					});
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		checkSingleDevide(row){
			this.$router.push({
				path: '/DevideInfos',
				name: 'DevideInfos',
				params: {
					messageId:row.id,
				}
			});
		},
		editSingleDevidePost(){
			let _this = this;
			let updateDeviceData = {
				token: document.querySelector('#token').innerText,
				projectId: sessionStorage.getItem('projectId'),
				remark:this.currentDevideInfos.remark,
				address:this.currentDevideInfos.address,
				groupId: this.itemName,
				id:this.currentDevideID
			};
			axios.post('http://test.mhfire.cn/mhApi/Device/updateDevice',Qs.stringify(updateDeviceData),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
					// 参数1：token(用户token)，string类型，必填
					// 参数2：projectId（项目id），int类型，必填
					// 参数3：remark（设备备注），string，选填
					// 参数4：address（设备地址），string，必填
					// 参数5：groupId（分组id），int，必填
					// 参数6：id（设备id号），int类型，必填
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.$message({
						type: 'success',
						message: '设备信息更新成功'
					});
					_this.editSingleDevideDialog = false;
					_this.getAllGroup();
					_this.devideSearch();
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		// rowClick(row){
		// 	this.$router.push({
		// 		path: '/DevideInfos',
		// 		name: 'DevideInfos',
		// 		params: {
		// 			messageId:row.NBID,
		// 		}
		// 	});
		// 	console.log('rowClick');
		// 	console.log(row);
		// },
		handleDevideChange(val){
			this.page = val;
			this.devideSearch();
		},
		devideSearchAll(){
			let _this = this;
			let token = document.querySelector('#token').innerText;
			axios.get('http://test.mhfire.cn/mhApi/Device/deviceList',{
				// 参数1：token(用户token)，string类型，必填
				// 参数2：keyword(设备名称或者地址或者imei号)，string类型，选填
				// 参数3：projectId（项目id）,int类型，必填
				// 参数4：groupId（分组id）,int类型，选填，默认为0
				// 参数5：page（分页数）,int类型，选填，默认为1
				params: {
					token: token,
					keyword: _this.keyword,
					projectId: sessionStorage.getItem('projectId'),
					groupId: _this.groupId,
					page: _this.page
				}
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.deviceListCount = response.data.data.count;
					_this.deviceList= response.data.data.result;
					if(_this.page>1){
						for(var ii = 0;ii<_this.deviceList.length;ii++){
							_this.deviceList[ii].groupID = _this.page*10+ii+1;
						}
					}else{
						for(var ii = 0;ii<_this.deviceList.length;ii++){
							_this.deviceList[ii].groupID = ii+1;
						}
					}
				}else if(response.data.ret_code==103){
					_this.deviceListCount = 0;
					_this.deviceList= [];
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		},
		devideSearch(){
			let _this = this;
			let token = document.querySelector('#token').innerText;
			axios.get('http://test.mhfire.cn/mhApi/Device/deviceList',{
				// 参数1：token(用户token)，string类型，必填
				// 参数2：keyword(设备名称或者地址或者imei号)，string类型，选填
				// 参数3：projectId（项目id）,int类型，必填
				// 参数4：groupId（分组id）,int类型，选填，默认为0
				// 参数5：page（分页数）,int类型，选填，默认为1
				params: {
					token: token,
					keyword: _this.keyword,
					projectId: sessionStorage.getItem('projectId'),
					groupId: _this.groupId,
					page: _this.page
				}
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.deviceListCount = response.data.data.count;
					_this.deviceList= response.data.data.result;
					_this.groupId = _this.deviceList[0].groupId;
					if(_this.page>1){
						for(var ii = 0;ii<_this.deviceList.length;ii++){
							_this.deviceList[ii].groupID = _this.page*10+ii+1;
						}
					}else{
						for(var ii = 0;ii<_this.deviceList.length;ii++){
							_this.deviceList[ii].groupID = ii+1;
						}
					}
				}else if(response.data.ret_code==103){
					_this.deviceListCount = 0;
					_this.deviceList= [];
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
			})
			.catch(function(error){
				console.log(error);
			})
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.devideSearchAll();
		this.getAllGroup();
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
	/* .devInsertDialog .el-checkbox-group {

	} */
	/* .devInsertDialog .el-dialog {

	} */
	#excelUpload .el-input{
		width: 296px;
		height: 40px;
		box-sizing: border-box;
	}
	#excelUpload>button{
		width: 160px;
		height: 40px;
		box-sizing: border-box;
		padding: 0;
		border: 0;
		margin: 0;
		background-color: #2f8cdb;
	}
	#excelUpload p{
		font-family: "PFxi";
    font-size: 12px;
		color: #2f8cdb;
		text-decoration: underline;
		text-decoration-color: #2f8cdb;
		cursor:pointer
	}
	#devImportDialog .el-row button{
		width: 115px;
		height: 40px;
		box-sizing: border-box;
	}
	#devImportDialog .el-dialog__body{
		margin-left: 30px;
	}
	.devInsertDialog .el-dialog__body{
		background-color: #fafafa;
		width: 814px;
		margin:0 auto;
		border-radius: 5px;
	}
	.devInsertDialog .el-checkbox {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;
		color: #666;
    font-family: "PFxi";
    font-size: 18px;
		margin-bottom: 20px;
	}
	.allInsertDev{
		position: absolute;
		right: 58px;
		top: 100px;
		box-sizing: border-box;
		width: 88px;
		height: 30px;
		padding: 0;
		z-index: 99;
	}
	.noBorder .el-input__inner{
		border: none;
		height: 20px;
	}
	.devImportDialog button{
		margin-top: 15px;
	}
	.devideManage{
		background-color: #f2f4fa;
		width: 100%;
		height: 100%;
	}
	.devideManage .devideCont{
		width: 100%;
		height: 100%;
	}
	.devideManage .devideContTop{
		height: 60px;
		line-height: 60px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideManage .devideLeft{
		color: #606266;
    font-family: "PFxi";
    font-size: 18px;
	}
	#goback{
		display:inline-block;
		margin:0 10px;
		font-weight:bolder;
		font-family: "PFz";
	}
	.devideManage .el-tabs__header{
		margin-bottom: 0;
	}
	.devideManage .devideRight{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		font-size: 12px;
	}
	.devideManage .devideRight .el-input input{
		width: 270px;
		height: 30px;
		padding: 0;
		background: url('~@/assets/images/DevideManage/searchIcon.png') 244px center no-repeat;
		text-indent: 10px;
	}
	.devideManage .devideRight .el-button{
		width: 106px;
		height: 30px;
		line-height: 30px;
		padding: 0;
		font-size: 12px;
	}
	.devideManage .devideInfos{
		background-color: #ffffff;
		width: 97%;
		height: 97%;
		margin: 20px;
		border-radius: 10px;
		padding: 50px;
		position: relative;
	}
	.devideManage .el-message-box__message p{
		font-family: "PF";
		font-weight: bolder;
		font-size: 16px;
	}
	.devideManage .devideTopRight{
		position: absolute;
		top: 50px;
		right: 60px;
	}
	.devideManage .devideTopRight .devideTopRightOutput{
		height: 30px;
		/* line-height: 30px; */
		padding-top: 0;
		padding-bottom: 0;
	}
	.devideManage .devideTopRight .devideTopRightDelete{
		height: 30px;
		/* line-height: 30px; */
		padding-top: 0;
		padding-bottom: 0;
	}
	.devideManage .devideTopRight .devideTopRightAdd{
		height: 30px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.devideManage .devideInfos .el-tabs__nav .is-active{
		font-weight: bold;
		background-color: #2f8cdb;
		color: #fff;
		/* background-color: #ffffff; */
		/* color: #999; */
		/* width: 206px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		letter-spacing: 4px;
		font-size: 16px; */
	}
	.el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: 1px solid #E4E7ED;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
}
	.devideManage .devideInfos .el-tabs__nav-wrap{
		/* border-top-left-radius: 7px; */
		font-weight: bold;
		letter-spacing: 4px;
	}
	.devideManage .devideInfos .el-tabs__item{
		font-weight: bold;
		background-color: #ffffff;
		color: #999;
		/* background-color: #2f8cdb; */
		/* color: #ffffff; */
		/* width: auto; */
		/* width: 206px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		letter-spacing: 4px;
		font-size: 16px; */
	}
	.devImportDialog .el-dialog{
		width: 22%;
	}
	#devImportDialog .el-dialog{
		width: 569px;
		height: 256px;
	}
	.devideManage .devideInfos .el-table{
		border-left: 1px solid #E4E7ED;
		border-right: 1px solid #E4E7ED;
	}
	.devideManage .devideInfos th{
		color: #666;
		font-family: "PFxi";
		font-size: 18px;
	}
	.devideManage .devideInfos .devidePage{
		position: absolute;
		bottom: 50px;
		right: 60px;
	}
	.devideManage .devEditDialog .el-dialog{
		width: 569px;
		border-radius: 5px;
	}
	.devideManage .devEditDialog .el-dialog .el-input__inner{
		width: 385px;
		text-align: center;
	}
</style>