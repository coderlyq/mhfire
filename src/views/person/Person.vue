<template>
	<el-container id="person" style="height: 93.55vh;">
		<el-aside style="width:374px;padding:0;background-color:#ffffff;">
			<div class='personImg' v-for="(item,index) in allMemberList" :key="item.UserName" @click="selectMember(index)" :class="{activeStyle:isActiveIndex==index}">
				<img :src="item.FaceImg" slot="personitemImg" height="60" width="60" >
				<dl>
					<dt></dt>
					<dd><span slot="personitemName">姓名：{{item.UserName}}</span></dd>
					<dd style="margin-top:10px;"><span slot="personitemTel">电话：{{item.UserPhone}}</span></dd>
				</dl>
				<div slot="personitemMark" class="personitemMark" :style="{backgroundColor:personMarkColor[item.isResponseFlag]}">
					<span v-show="item.isResponseFlag===0">普通员工</span>
					<span v-show="item.isResponseFlag===1">项目负责人</span>
				</div>
			</div>
		</el-aside>
		<el-main style="padding:0;">
			<el-container>
				<el-header style="background-color:#fff;" class="personBarHead">
					<span class="personTopTitle">人员等级</span>
					<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="levelvalue" placeholder="请选择" @change="changeLevel">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<span class="personWarnText">
						<img src="~@/assets/images/Person/warnImg.png" alt="">
						修改人员类型为普通员工人员等级将下降，并且会移除所有负责项目的权限
					</span>

					<el-popconfirm
						confirmButtonText='好的'
						cancelButtonText='不用了'
						icon="el-icon-info"
						iconColor="red"
						title="删除员工将会彻底把该员工的所有平台信息移除？"
						class="personBarBut" 
						@onConfirm="deleteMember()"
					>
						<el-button type="danger" slot="reference" plain>删除员工</el-button>
					</el-popconfirm>
					
				</el-header>
				<el-main class="personContMain">
					<el-container  v-show="true">
						<el-header class="personContMainTop">
							<span class="personContMainTopText">当前负责的项目</span>
							<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addMemberProject('own')">添加负责项目</el-button>
						</el-header>
						<el-main>
							<ol class="elmainOl">
								<li v-for="(item,index) in selectMemeberProject" :key="item.ProjectName">
									<div class="elmainLeft">
										<span class="elmainName">{{item.ProjectName}}</span>
										<span class="elmainAddress">{{item.AddressDetail}}</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" plain @click="delProject(index)">从负责项目中移除</el-button>
									</div>
								</li>
							</ol>
						</el-main>
					</el-container>
					<el-container style="margin-top:20px;" v-show="true">
						<el-header class="personContMainTop">
							<span class="personContMainTopText">作为员工隶属的项目</span>
							<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addMemberProject('fllow')">添加隶属项目</el-button>
						</el-header>
						<el-main>
							<ol class="elmainOl">
								<li v-for="(item,index) in memberProjectList" :key="item.ProjectName">
									<div class="elmainLeft">
										<span class="elmainName">{{item.ProjectName}}</span>
										<span class="elmainAddress">{{item.AddressDetail}}</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain @click="setMemberProject(index)">去设置项目内功能权限</el-button>
										<el-button type="primary" plain @click="removeMemberProject(index)">从隶属项目中移除</el-button>
									</div>
								</li>
							</ol>
						</el-main>
					</el-container>
				</el-main>
				<el-dialog :visible.sync="dialogTableVisible" class="personDialog" :before-close="handleClose" style="cellspacing:20px;cellpadding:20px;">
					<el-table :data="allProjectList">
						<el-table-column prop="ProjectName" label=" " width="326"></el-table-column>
						<!-- <el-table-column property="name" label=" " width="175"></el-table-column> -->
						<el-table-column
							fixed="right"
							label=""
							width="175"
							border=true
							>
							<template slot-scope="scope">
								<el-button type="primary" @click="handleClick(scope.row)" plain>添加负责项目</el-button>
							</template>
							<!-- <el-button @click="handleClick(scope.row)" type="button" size="big">查看</el-button> -->
						</el-table-column>
					</el-table>
				</el-dialog>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
	// import PersonItem from '@/views/person/PersonItem.vue'
  export default {
		name: "Person",
		data() {
      return {
				personMarkColor: ['#5cc997','#f5835b'],
				dialogTableVisible: false,
				gridData: [{
          name: '王小虎'
        }, {
          name: '王小虎'
        }, {
					name: '王小虎'
        }, {
          name: '王小虎'
        }],
        options: [{
          value: '1',
          label: '项目负责人'
        }, {
          value: '2',
          label: '普通员工'
        }],
				levelvalue: '',
				allMemberList: '',
				selectMemeberProject: '',
				memberProjectList: '',
				selectUID: '',
				selectIndex: '',
				allProjectList:'',		
				activeStyle:false,
				isActiveIndex: 0,
				currenRole: ''//负责或者隶属板块
      }
    },
		methods: {
			delProject(indexCurrent) {
				let _this = this;
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司ID),int类型，必填
				// 参数3：projectId(项目ID)，int类型，必填
				// 参数4：uid(项目负责人用户ID)，int类型，必填
				// 参数5：type(项目所属类型，1作为项目的负责人，2作为项目的普通员工)，int类型，必填
				let delProjectData = {
					token: document.querySelector('#token').innerText,
					companyId: sessionStorage.getItem('companyId'),
					projectId: this.selectMemeberProject[indexCurrent].ID,
					uid: this.selectUID,
					type: 1
				};
				axios.post('http://test.mhfire.cn/mhApi/Project/removeResponseProject',Qs.stringify(delProjectData),{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
				})
				.then(function(response){
					_this.selectMember(_this.selectIndex);
					_this.selectAllMemberList();
					if(response.data.ret_code == 0) {
						_this.$message({
							type: 'success',
							message: response.data.message
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
				});
			},
			removeMemberProject(indexCurrent) {
				let _this = this;
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司ID),int类型，必填
				// 参数3：projectId(项目ID)，int类型，必填
				// 参数4：uid(项目负责人用户ID)，int类型，必填
				// 参数5：type(项目所属类型，1作为项目的负责人，2作为项目的普通员工)，int类型，必填
				let removeMemberProjectData = {
					token: document.querySelector('#token').innerText,
					companyId: sessionStorage.getItem('companyId'),
					projectId: this.memberProjectList[indexCurrent].ID,
					uid: this.selectUID,
					type: 2
				};
				axios.post('http://test.mhfire.cn/mhApi/Project/removeResponseProject',Qs.stringify(removeMemberProjectData),{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
				})
				.then(function(response){
					_this.selectMember(_this.selectIndex);
					_this.selectAllMemberList();
					if(response.data.ret_code == 0) {
						_this.$message({
							type: 'success',
							message: response.data.message
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
				});
			},
			setMemberProject(index){
				sessionStorage.setItem('projectId',this.memberProjectList[index].ID);
				this.$router.push({
					path: '/ProjectPerson',
					name: 'ProjectPerson',
					params: {
					}
				})
			},
			handleClick(clickData){
				let selectType = '';
				if(this.currenRole=='own'){
					selectType = 1;
				}
				if(this.currenRole=='fllow'){
					selectType = 2;
				}
				let _this = this;
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司ID),int类型，必填
				// 参数3：projectId(项目ID)，int类型，必填
				// 参数4：uid(员工id)，int类型，必填
				// 参数5：type(用户类型，1项目负责人，2普通员工)，int类型，必填
				let addResponseProject = {
					token: document.querySelector('#token').innerText,
					companyId: sessionStorage.getItem('companyId'),
					projectId: clickData.ID,
					uid: this.selectUID,
					type: selectType
				};
				axios.post('http://test.mhfire.cn/mhApi/Project/addResponseProject',Qs.stringify(addResponseProject),{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
				})
				.then(function(response){
						_this.dialogTableVisible = false;
						_this.selectMember(_this.selectIndex);
						_this.selectAllMemberList();
						console.log(response);
				})
				.catch(function(error){
					_this.dialogTableVisible = false;
					console.log(error);
				});
			},
			addMemberProject(infs){
				this.currenRole = infs;
				this.dialogTableVisible = true;
				let _this = this;
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
				})
				.catch(function(error){
						console.log(error);
				})
			},
			changeLevel(){
				let _this = this;
				let changeLevelData = {
					token: document.querySelector('#token').innerText,
					companyId: sessionStorage.getItem('companyId'),
					type: this.levelvalue,
					uid: this.selectUID
				};
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司ID),int类型，必填
				// 参数3：type(人员等级类型,1项目负责人，2普通员工，默认为项目负责人)，int类型，选填
				// 参数4：uid(用户ID)，int类型，必填
				axios.post('http://test.mhfire.cn/mhApi/Project/setMemberLevel',Qs.stringify(changeLevelData),{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
				})
				.then(function(response){
					if(response.data.ret_code==0){
						let level = '';
						if(_this.levelvalue==1){
							level = 1;
						}
						if(_this.levelvalue==2){
							level = 0;
						}
						_this.allMemberList[_this.selectIndex].isResponseFlag = level;
						_this.selectAllMemberList();
						_this.selectMember(_this.selectIndex);
					}else{
						switch(response.data.ret_code){
							case 106:
								_this.$message.error('您还未绑定负责项目，请先绑定负责项目');
								break;
							case 101:
								_this.$message.error('公司id不能为空');
								break;
							case 102:
								_this.$message.error('无访问权限');
								break;
							case 103:
								_this.$message.error('用户id不能为空');
								break;
							case 104:
								_this.$message.error('人员类型参数值有误');
								break;
							case 105:
								_this.$message.error('等级信息切换失败');
								break;
							case 201:
								_this.$message.error('token参数不正确');
								break;
							case 202:
								_this.$message.error('用户未登录或登录已失效');
								break;
						}
					}
				})
				.catch(function(error){
						console.log(error);
				});
			},
			deleteMember(){
				let _this = this;
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：uid(项目负责人用户ID)，int类型，必填
				// 参数3：companyId(公司id)，int类型，必填
				let dataConfirm = {
					token: document.querySelector('#token').innerText,
					uid: this.selectUID,
					companyId: sessionStorage.getItem('companyId')
				}
				axios.post('http://test.mhfire.cn/mhApi/Project/deleteMember',Qs.stringify(dataConfirm),{
					headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
				})
				.then(function(response){
					_this.allMemberList.splice(_this.selectIndex,1);
						console.log(response);
				})
				.catch(function(error){
						console.log(error);
				});
			},
			selectMember(index){
				let _this = this;
				this.isActiveIndex = index;
				let token = document.querySelector('#token').innerText;
				let companyId = sessionStorage.getItem('companyId');
				// 选择人员ID
				this.selectUID = this.allMemberList[index].ID;
				this.selectIndex = index;
				axios.get('http://test.mhfire.cn/mhApi/Project/responseProjectList',{
					// 参数1：token(用户登录token)，string类型，必填
					// 参数2：companyId(公司ID)，int类型，必填
					// 参数3：uid(项目负责人ID)，int类型，必填
						params: {
							token: token,
							companyId: companyId,
							uid: _this.allMemberList[index].ID
						}
				})
				.then(function(response){
					_this.selectMemeberProject = response.data.data;
					console.log(response);
				})
				.catch(function(error){
						console.log(error);
				})
				axios.get('http://test.mhfire.cn/mhApi/Project/memberProjectList',{
					// 参数1：token(用户登录token)，string类型，必填
					// 参数2：companyId（公司id），int类型，必填
					// 参数3：uid(员工用户ID)，int类型，必填
						params: {
							token: token,
							companyId: companyId,
							uid: _this.allMemberList[index].ID
						}
				})
				.then(function(response){
					_this.memberProjectList = response.data.data;
				})
				.catch(function(error){
						console.log(error);
				})
			},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done(_);
			})
			.catch(_ => {_});
		},
			selectAllMemberList() {
				let _this = this;
				let token = document.querySelector('#token').innerText;
				let companyId = sessionStorage.getItem('companyId');
				axios.get('http://test.mhfire.cn/mhApi/Member/allMemberList',{
					// 参数1：token(用户登录token)，string类型，必填
					// 参数2：companyId(公司ID)，int类型，必填
						params: {
							token: token,
							companyId: companyId
						}
				})
				.then(function(response){
					_this.allMemberList = response.data.data;
				})
				.catch(function(error){
						console.log(error);
				})
			}
		},
		created(){
			this.selectAllMemberList();
		}
  }
</script>

<style>
	@font-face{
		font-family: 'PF'; 
		src:url('~@/assets/font/苹方黑体-极细-简.ttf') format('truetype');
	}
.personImg{
	width: 328px;
	box-sizing: border-box;
	height: 110px;
	margin: 0 auto;
	margin-top: 20px;
	box-shadow: 0 0 15px #cccccc;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	/* font-family: "微软雅黑"; */
	font-size: 14px;
	color: #666666;
	cursor: pointer;
}
.personImg .personitemMark{
	position: absolute;
	top: 0;
	right: 0;
	width: 100px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	border-top-right-radius: 5px;
	border-bottom-left-radius: 15px;
	color: #ffffff;
	font-size: 12px;
}
.personImg img{
	width: 60px;
	height: 60px;
	border-radius: 60px;
	margin-left: 30px;
}
.personImg dl{
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	/* align-items: flex-start; */
	justify-content: center
}
#person .activeStyle{
	box-shadow: 0 0 15px#666666;
}
	ol{
		list-style: none;
	}
	.personBarHead{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		position: relative;
	}
	.personWarnText{
		font-size: 12px;
		color: #ff4848;		
		margin-left: 10px;
	}
	.personWarnText img{
		vertical-align: middle;
	}
	.personTopTitle{
		font-family: "FC";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
		margin-left: 24px;
		margin-right: 20px;
	}
	.personBarBut{
		font-weight:bold;
		padding:0;
	}
	.personBarBut .el-button{
		width:100px;
		height:30px;
		line-height:5px;
		position: absolute;
		top: 15px;
		right: 25px;
	}
	.personBarBut .el-button span{
		/* text-align: center; */
	}
	.personContMain{
		margin: 20px 20px 0 20px;
		/* background-color: #ffffff; */
	}
	.personContMain .el-container{
		background-color: #ffffff;
		border-radius: 10px;
	}
	.personContMainTop{
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.personContMainTopText{
		font-family: "FC";
		font-size: 16px;
		color: #333;
		font-weight: 600;
	}
	.elmainOl{
		padding: 0;
	}
	.elmainOl li{
		font-family: "FC";
		box-sizing: border-box;
		padding-left: 60px;
		overflow: hidden;
		box-shadow: 0 0 10px #cccccc;
		height: 90px;
		line-height: 90px;
		margin-bottom: 20px;
		border-radius: 5px;
	}
	.elmainLeft{
		float: left;
		font-size: 14px;
	}
	.elmainName{
		color: #333;
	}
	.elmainAddress{
		color: #999;
		margin-left: 90px;
	}
	.elmainRight{
		height: 100%;
		padding-right: 60px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		color: #2f8cdb;
		font-size: 14px;
	}
	.elmainRight .el-button{
		width: 170px;
		height: 40px;
	}
	.personDialog>div{
		width: 566px;
		border-radius: 10px;
	}
	.personDialog .el-table__header-wrapper{
		display: none;
	}
	.personDialog .el-table__row{
		border: none;
		background-color: #f6f6f6;
		margin-bottom: 100px;
		border-radius: 15px;
	}
	.personDialog .el-table__row td{
		border-bottom: 20px solid #ffffff;
	}
	.personDialog .el-table__row td:first-child div{
		margin-left: 20px;
	}
	/* .personDialog .el-dialog__header{
		position: relative;
		top: -30px;
		right: -28px;
	} */
</style>
