<template>
  <div id="app" style="height: 100vh;background-color: #f2f4fa;">
		<div v-show="!isshowLay">
			<el-container>
				<el-header style="height: 6.45vh;line-height: 6.45vh;">
					<div style="display:none;"><span id="token">{{token}}</span></div>
					<div id='logotext'>
						<img src="~@/assets/images/TopBar/logo.png" alt="">
						<span style="font-size:18px;font-weight:bold;margin-left:15px;padding-right:24px;" @click="companyCheck">FCLOUD门海消防云平台</span><span id="topbarpre"></span>
						<span class="logodis" style="display:none;margin-right:25px;"></span>
						<ol id="logoList" v-show="topBarBoolean">
							<li v-for="(item,index) in logoList" @click="topclick(index)" :key="item.name" :class="{clickBackColor:index===currendIndex}">
								{{item.name}} <span v-show="item.isshow">({{item.cont}})</span>
							</li>
						</ol>
					</div>
					<div class="layinfos">
						<img class="warnImg" src="~@/assets/images/TopBar/warnImg.png" alt="" style="margin-right:15px;cursor:pointer;" @click="checkWarnInfos" v-show="warnImg">
						<img style="cursor:pointer" class="personIcon" src="~@/assets/images/Person/personIcon.png" alt="" @click="getPersonInfos"><span style="vertical-align:center;" class="personTel">{{ruleFormLay.telLay.substr(0,6)}}……</span>
						<img style="cursor:pointer" class="layout" src="~@/assets/images/Lay/layout.png" alt="" @click="layout">
					</div>
				</el-header>
				<el-container>
					<el-aside v-show="asideBoolean" style="width: 220px;background-color: #081d61;height: 93.55vh;" class="leftSideBar"><SideBar/></el-aside>
					<!-- <el-main style="height: 99.999999vh;padding:0;" v-show="!topBarBoolean"><router-view></router-view></el-main> -->
					<!-- <el-main style="height: 93.55vh;padding:0;" v-show="topBarBoolean"><router-view></router-view></el-main> -->
					<el-main style="height: 93.55vh;padding:0;"><router-view></router-view></el-main>
				</el-container>
			</el-container>
		</div>
		<div class='lay' v-show="isshowLay">
			<!-- <img src="~@/assets/images/Lay/bottomRight.png" alt="" class="bottomRight">
			<img src="~@/assets/images/Lay/topRightImg.png" alt="" class="topRightImg"> -->
			<div class="layConts">
				<div class="layContsCenter">
					<ol class="layContsOl"><li @click="lay" :class="{checkTopBar:isLay}">登录</li><li :class="{checkTopBar:!isLay}" @click="layIn">注册</li></ol>
					<el-form :model="ruleFormLay" status-icon :rules="rulesLay" ref="ruleFormLay" label-width="100px" class="demo-ruleForm" v-show="isLay">
						<el-form-item prop="telLay">
							<el-input type="text" v-model="ruleFormLay.telLay" placeholder="手机号" autocomplete="on" clearable class="layTel"></el-input>
						</el-form-item>
						<el-form-item prop="passLay">
							<el-input type="password" v-model="ruleFormLay.passLay" placeholder="请输入密码" autocomplete="off" clearable show-password class="layPass"></el-input>
						</el-form-item>
						<el-form-item prop="imgCode" class="imgCodeDiv">
							<el-input v-model="imgCode" placeholder="请输入验证码" class="imgCode"></el-input><img :src="imgSrc" @click="changeImgSrc" alt="" class="checkImg">
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitLay('ruleFormLay')" class="submitBtn">提交</el-button>
						</el-form-item>
						<!-- `checked` 为 true 或 false -->
						<el-checkbox v-model="checked">下次自动登录</el-checkbox>
					</el-form>
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-show="!isLay">
						<el-form-item prop="tel">
							<el-input type="text" v-model="ruleForm.tel"  placeholder="手机号" autocomplete="on" clearable></el-input>
						</el-form-item>
						<el-form-item prop="pass">
							<el-input type="password" v-model="ruleForm.pass" placeholder="请设置密码（8到16位，英文加数字组合）" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item prop="checkPass">
							<el-input type="password" placeholder="再次确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item prop="checkCode">
							<el-input v-model.number="checkCode" placeholder="请输入手机验证码" class="checkCode"></el-input>
							<el-button type="primary" @click="getPhoneCode" class="buttonPhoneCode">获取验证码</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">提交</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
import SideBar from '@/views/SideBar/SideBar.vue'
export default {
	name: 'App',
  components: {
		SideBar
		},
	data() {
		//表单数据验证
		var validateTel = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('手机号不能为空'));
			}
			else{
				var telTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
				if (!telTxt.test(value)) {
					callback(new Error('手机号格式不对'));
				} else {
					callback();
				}
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}else{
					var textTxt = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
					if(textTxt.test(value)){
						this.$refs.ruleForm.validateField('checkPass');
					}else{
						callback(new Error('请输入密码（8到16位，英文加数字组合）'));
					}
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			warnImg: false,
			token: '',
			issuper: true,//topbar显示公司名字还是权限菜单
			currendIndex: 0,
			logoList:[{
				name: '所有公司',
				path: '/AllProject',
				cont: 0,
				isshow:true
			},{
				name: '监控控制台',
				path: '/TopController',
				cont: 0,
				isshow:false
			},{
				name: '认证申请',
				path: '/Attestation',
				cont: 0,
				isshow:true
			},{
				name: '二级超管设置',
				path: '/SupperManager',
				cont: 0,
				isshow:false
			}],
			isshowLay: true,//显示登陆页面，还是内容页
			checked:false,//是否下次自动登录
			isLay:true,//登录和注册页面切换
			topBarBoolean: true,
			asideBoolean: false,
			imgSrc: 'http://test.mhfire.cn/mhApi/User/getCode',
			ruleForm: {
				pass: '',
				checkPass: '',
				tel:''
			},
			ruleFormLay: {
				telLay: '',
				passLay: ''
			},
			checkCode:'',
			imgCode: '',
			rules: {
				tel: [
					{ validator: validateTel, trigger: 'blur' }
				],
				pass: [
					{ validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
				]
			},
			rulesLay: {
				telLay: [
					{ validator: validateTel, trigger: 'blur' }
				],
				passLay: [
					{ validator: validatePass, trigger: 'blur' }
				],
			}
		};
	},
	methods: {
		checkWarnInfos(){
			this.$router.push({
				path: '/warnSearch',
				name: 'warnSearch',
				params: {
					projectId: 'checkWarnInfos'
				}
			})
		},
		companyCheck(){
			this.$router.push({
					path: '/CompanyCheck',
					name: 'CompanyCheck',
					params: {
					}
				})
		},
		// 查看用户信息
		getPersonInfos(){
			this.$router.push({
					path: '/PersonInfos',
					name: 'PersonInfos',
					params: {
					}
				})
		},
		// 退出登录
		layout(){
			this.token = ' ';
			this.isshowLay = true;
			this.topBarBoolean = false;
			this.asideBoolean = false;
			this.logoList[0].cont = 0;
			this.logoList[1].cont = 0;
			this.logoList[2].cont = 0;
			sessionStorage.setItem('companyId', ' ');
			sessionStorage.setItem('projectId', ' ');
			document.querySelector('.checkImg').src = 'http://test.mhfire.cn/mhApi/User/getCode';
			this.imgCode = '';
			this.$router.push({
					path: '/Lay',
					name: 'Lay',
					params: {
					}
				})
		},
		// topbar点击切换菜单
		topclick(index) {
			document.querySelector('.logodis').style.display = 'none';
			document.querySelector('.leftSideBar').style.display = 'none';
			document.querySelector('.siderBarTop').style.display = 'block';
			document.querySelector('.siderBarBottom').style.display = 'none';
			this.currendIndex = index;
			this.$router.push(this.logoList[index].path)
			// console.log(index);
		},
		// 注册表单提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.checkCode);
					console.log(this.ruleForm.tel);
					// 参数1：phone(表示手机号)，string类型，必填
					// 参数2：password(表示密码)，string类型，必填
					// 参数3：pwd(表示确认密码)，string类型，必填
					// 参数4：code(手机验证码)，int类型，必填
					let postData = {
							phone: this.ruleForm.tel,
							password: this.ruleForm.pass,
							pwd: this.ruleForm.checkPass,
							code: this.checkCode
					}
					axios.post('http://test.mhfire.cn/mhApi/User/register',Qs.stringify(postData),{
						headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
					})
					.then(function(response){
							console.log(response);
					})
					.catch(function(error){
							console.log(error);
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 登录表单提交a947d3b8cde84caba6a19ff05e376090
		submitLay(formName){
		// 	this.token = "a947d3b8cde84caba6a19ff05e376090";
		// 	this.topBarBoolean = true;
		// 	this.asideBoolean = false;
		// 	this.isshowLay = false;
		// this.$router.push({
		// 			path: '/AllProject',
		// 			name: 'AllProject',
		// 			params: {
		// 			}
		// 		})
		
			this.$refs[formName].validate((valid) => {
				console.log(valid);
				let _this = this;
				if (valid) {
					// 参数1：phone(表示手机号)，string类型，必填
					// 参数2：password(表示密码)，string类型，必填
					// 参数4：code(手机验证码)，int类型，必填
					var checkNum = 0;
					if(this.checked === true){
						checkNum = 1;
						localStorage.setItem('telLay', this.ruleFormLay.telLay);
						localStorage.setItem('passLay', this.ruleFormLay.passLay);
					}else{
						sessionStorage.setItem('telLay', this.ruleFormLay.telLay);
						sessionStorage.setItem('passLay', this.ruleFormLay.passLay);
						if(localStorage.getItem('telLay')){
							localStorage.removeItem('telLay');
						}
						if(localStorage.getItem('passLay')){
							localStorage.removeItem('passLay');
						}
					}
					let postData = {
							phone: this.ruleFormLay.telLay,
							password: this.ruleFormLay.passLay,
							code: this.imgCode,
							login_status:checkNum
					}
					axios.post('http://test.mhfire.cn/mhApi/User/login',Qs.stringify(postData),{
						headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
					})
					.then(function(response){
						_this.token = response.data.data.token_id;
						_this.isshowLay = false;
						if(response.data.data.type==1){
							_this.topBarBoolean = true;
							_this.asideBoolean = true;
							_this.logoList[0].cont = response.data.data.node.company_count;
							_this.logoList[1].cont = response.data.data.node.fire_count;
							_this.logoList[2].cont = response.data.data.node.company_auth_count;
							sessionStorage.setItem('companyId', 0);
							sessionStorage.setItem('projectId', ' ');
							console.log('1');
							_this.$router.push({
								path: '/AllProject',
								name: 'AllProject',
								params: {
									asideShow: 'none'
								}
							})
						}
						if(response.data.data.type==2){
							_this.topBarBoolean = true;
							_this.asideBoolean = true;
							_this.logoList[0].cont = response.data.data.node.company_count;
							_this.logoList[1].cont = response.data.data.node.fire_count;
							_this.logoList[2].isshow = false;
							_this.logoList[3].isshow = false;
							sessionStorage.setItem('companyId', 0);
							sessionStorage.setItem('projectId', ' ');
							console.log('2');
							_this.$router.push({
								path: '/AllProject',
								name: 'AllProject',
								params: {
									asideShow: 'none'
								}
							})
						}
						if(response.data.data.type==3){
							_this.topBarBoolean = false;
							_this.asideBoolean = true;
							console.log('33333333333333333333333333333333333');
							console.log(response);
							document.querySelector('.warnImg').style.display = 'inline-block';
							document.querySelector('.logodis').innerText = response.data.data.CompanyName;
							document.querySelector('.logodis').style.display = 'block';
							sessionStorage.setItem('companyId', response.data.data.CompanyID);
							sessionStorage.setItem('projectId', ' ');
							console.log('3');
							_this.$router.push({
								path: '/List',
								name: 'List',
								params: {
									asideShow: 'block'
								}
							})
						}
						if(response.data.data.type==4){
							_this.topBarBoolean = false;
							_this.asideBoolean = true;
							document.querySelector('.warnImg').style.display = 'inline-block';
							document.querySelector('.logodis').innerText = response.data.data.CompanyName;
							document.querySelector('.logodis').style.display = 'block';
							sessionStorage.setItem('companyId', response.data.data.CompanyID);
							sessionStorage.setItem('projectId', ' ');
							_this.$router.push({
								path: '/List',
								name: 'List',
								params: {
									asideShow: 'block'
								}
							})
						}
						console.log('jklj;lj;lj;lj;lj;l');
						// console.log(response.data.data);
					})
					.catch(function(error){
							console.log(error);
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		//获取手机验证码
		getPhoneCode(){
			document.querySelectorAll('.buttonPhoneCode')[0].style.backgroundColor = "#f6f6f6";
			document.querySelectorAll('.buttonPhoneCode')[0].style.border = "none";
			document.querySelectorAll('.buttonPhoneCode')[0].style.color = "#c2c2c2";
			document.querySelectorAll('.buttonPhoneCode')[0].disabled = "disabled";
			document.querySelectorAll('.buttonPhoneCode')[0].style.cursor = "wait";
			let timecout = 60;
			let timer = setInterval(function (){
					document.querySelectorAll('.buttonPhoneCode')[0].innerText = "重新获取（"+timecout+")s";
					if(timecout<=0){
						clearInterval(timer);
						document.querySelectorAll('.buttonPhoneCode')[0].style.backgroundColor = "#2f8cdb";
						document.querySelectorAll('.buttonPhoneCode')[0].style.color = "#fff";
						document.querySelectorAll('.buttonPhoneCode')[0].disabled = "";
						document.querySelectorAll('.buttonPhoneCode')[0].innerText = "获取验证码";
						document.querySelectorAll('.buttonPhoneCode')[0].style.cursor = "pointer";
					}
					timecout--;
				}, 1000);
			axios.get('http://test.mhfire.cn/mhApi/User/getSmsCode',{
					params: {
						phone: this.ruleForm.tel
					}
			})
			.then(function(response){
					console.log(response);
			})
			.catch(function(error){
					console.log(error);
			});
		},
		lay(){
			// axios.get('http://test.mhfire.cn/mhApi/Admin/adminList',{
			// 		params: {
			// 			token:'09b603f882584d92baeefbcfbe48c972',
			// 			page: 1
			// 		}
			// })
			// .then(function(response){
			// 		console.log(response);
			// })
			// .catch(function(error){
			// 		console.log(error);
			// });
			return this.isLay = true;
		},
		layIn(){
			return this.isLay = false;
		},
		changeImgSrc(){
			document.querySelector('.checkImg').src = 'http://test.mhfire.cn/mhApi/User/getCode';
		},
	},//改变验证码图片
	beforeCreate(){
	},//生命周期 - 创建之前
	// activated(){
	// 	this.changeImgSrc();	
	// 	console.log('lkjljljljkl');
	// },
	created(){
		if(localStorage.getItem('telLay')){
			this.ruleFormLay.telLay = localStorage.getItem('telLay')
		}
		if(localStorage.getItem('passLay')){
			this.ruleFormLay.passLay = localStorage.getItem('passLay')
		}
		setInterval(function(){
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司ID)，int类型，必填
			if(sessionStorage.getItem('companyId')){
				axios.get('http://test.mhfire.cn/mhApi/Project/fireNoticeList',{
						params: {
							token: document.querySelector('#token').innerText,
							companyId: sessionStorage.getItem('companyId')
						}
				})
				.then(function(response){
						if(response.data.data.length!=0){
							document.querySelector('.warnImg').src = require("./assets/images/TopBar/warnImgCount.png");
						}
				})
				.catch(function(){
				});
			}
		},3000);
	}
}
</script>

<style>
@import '~@/assets/css/common/normalize.css';
/* #app {

} */
.layout{
	width: 23px;
	height: 22px;
}
@font-face{
     font-family: 'PF'; 
     src:url('~@/assets/font/苹方黑体-极细-简.ttf') format('truetype');
	}
	@font-face{
     font-family: 'PFxi'; 
     src:url('~@/assets/font/苹方黑体-细-简.ttf') format('truetype');
	}
	@font-face{
     font-family: 'PFqxi'; 
     src:url('~@/assets/font/苹方黑体-纤细-简.ttf') format('truetype');
	}
	@font-face{
     font-family: 'PFzc'; 
     src:url('~@/assets/font/苹方黑体-中粗-简.ttf') format('truetype');
	}
	@font-face{
     font-family: 'PFzh'; 
     src:url('~@/assets/font/苹方黑体-中黑-简.ttf') format('truetype');
	}
	@font-face{
     font-family: 'PFz'; 
     src:url('~@/assets/font/苹方黑体-准-简.ttf') format('truetype');
	}
.layinfos{
	float: right;
	margin-right: 4px;
}
/* topbar样式 */
.el-button{
	text-align: center;
}
#logotext{
	color: #ffffff;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	float: left;
}
#logotext img{
	width: 41px;
	height: 36px;
}
#logoList{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	list-style-type: none;
	padding-left: 0;
}
#logoList li{
	width: 141px;
	height: 70px;
}
#logoList li:hover{
	background-color: #1c4ded;
	cursor: pointer;
}
.clickBackColor{
	background-color: #1c4ded;
}
#topbarpre{
 margin-right:23px;
 display:inline-block;
 width:2px;
 height:30px;
 background-color:#fff;
}
/* 原定模板样式 */
	.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
		background-color: #081d61;
		font-family: "PF";
		font-weight: bold;
		font-size: 16px;
	}
	.el-main{
		padding: 0;
	}
	.personTel{
		font-family: "PF";
		color: #fff;
		font-size: 10px;
		margin-left: 5px;
		margin-right: 15px;
	}
	/* 登录页面样式 */
.lay{
	width: 100%;
	height: 100%;
	background-image: url('~@/assets/images/Lay/layBack.png');
	background-position: right top;
	background-repeat: no-repeat;
}
.bottomRight{
	/* position: absolute;
	bottom: 0;
	left: 0; */
	width: 1483px;
	height: 100%;
}
.topRightImg{
	position: absolute;
	top: 0;
	right: 0;
	z-index: 3;
}
.layConts{
	width: 470px;
	position: absolute;
	right: 266px;
	top: 320px;
	margin-left: -235px;
	background-color: #ffffff;
	border-radius: 10px;
	padding-bottom: 40px;
	box-shadow: 0 0 15px #cccccc;
}
.layContsCenter{
	width: 392px;
	margin: 0 auto;
}
.layContsOl{
	list-style-type: none;
	margin: 0;
	margin-top: 40px;
	margin-bottom: 20px;
	font-family: "PFzc";
	font-size: 18px;
	color: #999;
}
.layContsOl li{
	display: inline-block;
	width: 50%;
	text-align: center;
	cursor: pointer;
}
.checkTopBar{
	color: #2f8cdb;
}
.layConts .el-form-item{
	width: 390px;
	height: 40px;
}
.layContsCenter .el-form-item__content{
	margin-left: 0 !important;
}
.checkCode{
	width: 250px;
}
.imgCode{
	width: 250px;
}
.imgCodeDiv{
	overflow: hidden;
}
.checkImg{
	float: left;
	width: 120px;
	height: 40px;
	margin-left: 20px;
}
.imgCodeDiv img{
	float: right;
	cursor: pointer;
}
.buttonPhoneCode{
	width: 120px;
	height: 40px;
	margin-left: 20px;
}
.submitBtn{
	width: 390px;
}
</style>
