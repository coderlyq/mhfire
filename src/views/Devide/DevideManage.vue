<!--  -->
<template>
	<div class='devideManage'>
		<el-container class="devideCont">
			<el-header class="devideContTop">
				<div class="devideLeft">物联设备管理</div>
				<div class="devideRight" @input="checkDevideList" @compositionend="checkDevideList">
					<el-input placeholder="通过设备名称/地址/IMEI查找设备" v-model="inputDevideCheck" id="inputDevideCheck">
						<!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
					</el-input>
					<el-button type="primary" @click="addIMEI">新增设备<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
				</div>
			</el-header>
			<el-main class="devideInfos">
				<el-tabs v-model="editableTabsValue" type="card" :closable="closableBoolean" @tab-remove="removeTab" @tab-click="tabClick">
					<el-tab-pane
						v-for="item in allGroup"
						:key="item.id"
						:label="item.name"
						:name="item.id"
					>
					</el-tab-pane>
				</el-tabs>
				<div class="devideTopRight">
					<el-button type="danger" class="devideTopRightDelete" @click="deleteTab()">删除分组</el-button>
					<el-button type="primary" class="devideTopRightAdd" @click="addTab()">添加新分组<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
				</div>
				<el-table
					:data="deviceList"
					style="width: 100%;cursor: pointer;"
					>
					<el-table-column
						prop="typename"
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
						>
						<template slot-scope="scope">
							<el-popconfirm
								@onConfirm="deleteSingleDevide(scope.row)"
								confirm-button-text='好的'
								cancel-button-text='不用了'
								icon="el-icon-info"
								icon-color="red"
								title="确定删除此设备？"
							>
								<el-button v-if="scope.row.groupId<=1" type="text" size="small" style="color:#f27978;margin-right:20px;text-decoration:underline" slot="reference">删除</el-button>
							</el-popconfirm>
							<el-popconfirm
								@onConfirm="removeSingleDevide(scope.row)"
								confirm-button-text='好的'
								cancel-button-text='不用了'
								icon="el-icon-info"
								icon-color="red"
								title="确定在该组中移除此设备？
								如需找回，可在所有设备组中找回"
							>
								<el-button v-if="scope.row.groupId>1" type="text" size="small" style="color:#f27978;margin-right:20px;text-decoration:underline" slot="reference">移除</el-button>
							</el-popconfirm>
							<el-button @click="editSingleDevide(scope.row)" style="text-decoration:underline;margin-right:20px;" type="text" size="small">编辑</el-button>
							<el-button @click="checkSingleDevide(scope.row)" type="text" size="small" style="margin-left:0;color:#2f8cdb;margin-right:20px;text-decoration:underline">查看</el-button>
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
					<el-form :model="devForm">
						<el-form-item label="设备备注" :label-width="formLabelWidth">
							<el-input v-model="currentDevideInfos.remark" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="设备地址" :label-width="formLabelWidth">
							<el-input v-model="currentDevideInfos.address" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="修改分组" :label-width="formLabelWidth">
							<el-select v-model="currentDevideInfos.name" placeholder="默认分组">
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
				<el-dialog class="devImportDialog" title="请输入设备的IMEI码" :visible.sync="devImportDialog">
					<el-form class="demo-form-inline">
						<el-form-item>
							<input class="noBorder" @change="getFile($event)" type="file" placeholder="审批人">
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件到服务器</el-button>
						</el-form-item>
						<el-form-item>
							<el-input v-model="devImport.strIMEI" type="text" placeholder="请输入设备IMEI码"></el-input>
							<el-button style="margin-left:10px;" type="primary" @click="postNewDeviceIMEI">提交输入IMEI</el-button>
						</el-form-item>
					</el-form>
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
			inputDevideCheck: "",
			allGroup: [],
			devImport:{},
			devImportDialog: false,
			newDeviceIMEI: '',
			editSingleDevideDialog: false,
			closableBoolean: false,
			editableTabsValue: '0',
			tabIndex: 2,
			deviceList: [],
			keyword: " ",
			groupId: 0,
			page: 1,
			historyEveCount: 100,
			formLabelWidth: '75px',
			devForm: {
				devName: '',
				devAddress: '',
				devGroup: ''
			},
			currentDevideInfos: {}
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
		getFile(event, input_file_name) {
			this.file = event.target.files[0];
			console.log(this.file);
		},
		submitUpload(event) {
			// let _this = this;
			let formData = new FormData();
			formData.append('token', document.querySelector('#token').innerText);
			formData.append('groupId', 1);
			formData.append('projectId', sessionStorage.getItem('projectId'));
			formData.append('imei', " ");
			formData.append('file', this.file);

			// axios.post('http://test.mhfire.cn/mhApi/Device/addDevice',Qs.stringify(formData),{
			// 	headers: {'Content-Type': 'multipart/form-data'} //加上这个
			// 		// 参数1：token(用户token)，string类型，必填
			// 		// 参数2：projectId（项目id）,int类型，必填
			// 		// 参数3：name（分组名称），string类型，必填
			// })
			// .then(function(response){
			// 	if(response.data.ret_code==0){
			// 		_this.$message({
			// 			type: 'success',
			// 			message: '您的新分组是: ' + value
			// 		});
			// 		_this.getAllGroup();
			// 	}else{
			// 		_this.$message({
			// 			type: 'info',
			// 			message: response.data.message
			// 		});
			// 	}
			// })
			// .catch(function(error){
			// 	console.log(error);
			// })
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			console.log(formData);
			this.$http.post('http://test.mhfire.cn/mhApi/Device/addDevice', formData, config).then(function (res) {
				if (res.status === 200) {
						console.log(res);
				}
			}).catch((error) => {
					console.log(error);
			});
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
			console.log(targetName.name);
			this.groupId = targetName.name;
			this.page = 1;
			this.devideSearch();
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
					console.log(response.data.data);
					_this.allGroup = response.data.data;
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
				console.log(response);
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
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
		},
		editSingleDevide(row){
			window.event.cancelBubble = true;
			this.editSingleDevideDialog = true;
			let currentDevideID = row.id;
			let _this = this;
			axios.get('http://test.mhfire.cn/mhApi/Device/getDeviceInfo',{
				// 参数1：token(用户token)，string类型，必填
				// 参数2：projectId（项目id），int类型，必填
				// 参数3：id(设备id号)，int类型，必填
				params: {
					token: document.querySelector('#token').innerText,
					projectId: sessionStorage.getItem('projectId'),
					id: currentDevideID
				}
			})
			.then(function(response){
				if(response.data.ret_code==0){
					_this.currentDevideInfos = response.data.data;
					_this.allGroup.forEach((itemGroup)=>{
						if(itemGroup.id==_this.groupId){
							_this.currentDevideInfos.name = itemGroup.name;
						}
					});
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
				console.log(response);
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
				groupId: this.currentDevideInfos.pid,
				id:this.currentDevideInfos.id
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
				console.log(response);
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
		devideSearch(){
			console.log(this.keyword+'');
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
					console.log(_this.deviceListCount);
					console.log(_this.deviceList);
				}else if(response.data.ret_code==103){
					_this.deviceListCount = 0;
					_this.deviceList= [];
				}else{
					_this.$message({
						type: 'info',
						message: response.data.message
					});
				}
				console.log(response);
			})
			.catch(function(error){
				console.log(error);
			})
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.devideSearch();
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
		color: #333;
    font-family: "PFxi";
    font-size: 18px;
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