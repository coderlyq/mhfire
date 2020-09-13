<!--  -->
<template>
  <el-container class="personInfos">
		<el-header class="personInfosTop">
			<div class="personInfosTopCont" style="text-align:left;">
				账户信息
			</div>
		</el-header>
		<el-main>
			<div class="personInfosTopCont">
				<div class="personInfosPart">
					<div class="personInfosContTop">基本信息</div>
					<div class="personInfosAreaItem">
						<img src="~@/assets/images/List/logoDefault.png" alt="啊撒旦范德萨分">
						<dl>
							<dd><span>账户名 </span>{{baseInfo.UserName}}</dd>
							<dd><span>注册时间 </span>{{baseInfo.CreateTime}}</dd>
							<dd><span>公司名称 </span>{{baseInfo.CompanyName}}</dd>
						</dl>
					</div>
				</div>
				<div class="personInfosPart">
					<div class="personInfosContTop">安全设置</div>
					<div class="personInfosSetCont">登录密码
						<span class="personInfosDis">安全性高的密码可以使账号更安全，密码长度8-16个字符，且包含英文和数字</span>
						<el-button type="text" @click="personInfosPassModifyDiv" class="personInfosModify">修改</el-button>
					</div>
					<div class="personInfosSetCont">手机号码
						<span class="personInfosDis">手机号{{baseInfo.UserPhone}}已验证</span>
						<el-button type="text" @click="personInfosTelModify" class="personInfosModify">修改</el-button>
					</div>
				</div>
				<div class="personInfosPart">
					<div class="personInfosContTop">信息认证</div>
					<div class="personInfosAreaItem lastItem">
						<dl>
							<dd><span>公司名称 </span>{{baseInfo.CompanyName}}</dd>
							<dd><span>认证类型 </span>{{companyAuthInfo.LicensePath}}</dd>
							<dd><span>公司负责人 </span>{{companyAuthInfo.LinkMan}} <i class="el-icon-edit-outline" @click="updateMemberName"></i></dd>
							<dd><span>联系电话 </span>{{companyAuthInfo.LinkNum}} <i class="el-icon-edit-outline" @click="updateMemberTel"></i></dd>
							<dd><span>公司地址 </span>{{companyAuthInfo.Address}} <i class="el-icon-edit-outline" @click="updateCompanyAddress"></i></dd>
							<dd><span>认证日期 </span>{{companyAuthInfo.AuthTime}}</dd>
						</dl>
						<img src="" alt="" class="infosCheckImg">
					</div>
				</div>
			</div>
			<el-dialog title="" :visible.sync="dialogFormPersonInfos" class="personInfosPassWord">
				<el-form :model="form">
					<el-form-item label="修改密码" class="personInfosAligo" :label-width="formLabelWidth">
						<el-input v-model="form.currentPwd" autocomplete="off" placeholder="请输入当前密码"></el-input>
						<el-input v-model="form.newPwd" autocomplete="off" placeholder="请输入新密码"></el-input>
						<el-input v-model="form.rePwd" autocomplete="off" placeholder="请确认新密码"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormPersonInfos = false">取 消</el-button>
					<el-button type="primary" @click="personInfosPassModify">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="" :visible.sync="dialogFormPersonInfosTel" class="personInfosPassTel">
				<div class="modifyTel">
					<div class="modifyTelTitle">修改手机号码</div>
					<ol class="modifyTelNav">
						<li>1、验证旧手机</li>
						<li>2、验证新手机</li>
					</ol>
					<div class="modifyTelDis">当前手机号码：{{baseInfo.UserPhone}}</div>
					<div class="modifyNodeImg" v-show="firstStep">
						<el-input v-model="checkcodeImg" autocomplete="off" placeholder="图形验证码"></el-input>
						<img class="getTelcodeImg" :src="getTelcodeImgsrc" alt="" @click="getTelcodeImgs">
					</div>
					<el-form-item label="新手机号"  v-show="!firstStep">
						<el-input v-model="newCheackTel"></el-input>
					</el-form-item>
					<div>
						<el-input v-model="checkcodeTel" autocomplete="off" placeholder="短信验证码"></el-input>
						<el-button class="getCheckTelcode" type="primary" @click="getCheckTelcode">获取验证码</el-button>
					</div>
					<el-button class="nextTleCodeBtn" type="primary" @click="nextCheckTelCode">下一步</el-button>
				</div>
			</el-dialog>
			<el-dialog title="" :visible.sync="dialogFormcompanyAddress" class="personInfoscompanyAddress">
				<el-form :model="form">
					<el-form-item label="修改公司地址" class="personInfoscompanyAddress" :label-width="formLabelWidth">
						<el-input v-model="form.companyAddress" autocomplete="off" placeholder="请输入公司地址"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormcompanyAddress = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormcompanyAddressModify">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="" :visible.sync="dialogmemberName" class="personInfosmemberName">
				<el-form :model="form">
					<el-form-item label="修改负责人姓名" class="personInfosmemberName" :label-width="formLabelWidth">
						<el-input v-model="form.memberName" autocomplete="off" placeholder="请输入负责人姓名"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogmemberName = false">取 消</el-button>
					<el-button type="primary" @click="dialogmemberNameModify">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="" :visible.sync="dialogFormmemberTel" class="personInfosmemberTel">
				<el-form :model="form">
					<el-form-item label="修改联系电话" class="personInfosmemberTel" :label-width="formLabelWidth">
						<el-input v-model="form.memberTel" autocomplete="off" placeholder="请输入新电话"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormmemberTel = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormmemberTelModify">确 定</el-button>
				</div>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
export default {
	name: 'PersonInfos',
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
	//这里存放数据
	return {
		dialogFormPersonInfos: false,
		dialogFormPersonInfosTel: false,
		dialogFormcompanyAddress: false,
		dialogmemberName: false,
		dialogFormmemberTel: false,
		form: {
			currentPwd: '',
			newPwd: '',
			rePwd: '',
			companyAddress: '',
			memberName: '',
			memberTel: ''
		},
		baseInfo: '',
		companyAuthInfo: '',
		getTelcodeImgsrc: 'http://test.mhfire.cn/mhApi/User/getCode',
		checkcodeImg: '',
		checkcodeTel: '',
		newCheackTel: '',
		firstStep: true
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	personInfosPassModifyDiv(){
		this.dialogFormPersonInfos = true;
	},
	personInfosPassModify() {
		console.log(this.form.newPwd);
		console.log(this.form.rePwd);
		if(this.form.newPwd!=this.form.rePwd){
			this.form.rePwd = '';
			return;
		}
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：password(原密码),string类型，必填
		// 参数3：newPassword(新密码)，string类型，必填
		// 参数4：newPwd(确认密码),string类型，必填
		let _this = this;
		let modifyPassData = {
			token: document.querySelector('#token').innerText,
			password: this.form.currentPwd,
			newPassword: this.form.newPwd,
			newPwd: this.form.rePwd
		};
		axios.post('http://test.mhfire.cn/mhApi/User/updatePwd',Qs.stringify(modifyPassData),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			})
			.then(function(response){
				console.log(response);
				if(response.data.ret_code==0){
					_this.dialogFormPersonInfos = false;
				}
			})
			.catch(function(error){
					console.log(error);
			});
		// this.dialogFormPersonInfos = true;
	},
	personInfosTelModify() {
		this.dialogFormPersonInfosTel = true;
	}, 
	updateMemberName(){
		this.dialogmemberName = true;
	},
	dialogmemberNameModify(){
		let _this = this;
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId（公司ID）,int类型，必填
		// 参数3：type(修改类型),int类型，必填，1为公司负责人，2为联系电话，3为公司地址
		// 参数4：keyword(关键字),string类型，必填
		let memberNameModify = {
			token:  document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			type: 1,
			keyword: this.form.memberName
		};
		axios.post('http://test.mhfire.cn/mhApi/Company/updateCompanyInfo',Qs.stringify(memberNameModify),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response);
			if(response.data.ret_code==0){
				_this.$message({
          message: '项目负责人修改成功',
          type: 'success'
				});
				_this.companyAuthInfo.LinkMan = _this.form.memberName;
				_this.dialogFormPersonInfos = false;
			}
			if(response.data.ret_code==102){
				_this.$message.error('修改失败：请填写项目负责人姓名');
			}
		})
		.catch(function(error){
			console.log(error);
		});
	},
	updateMemberTel(){
		this.dialogFormmemberTel = true;
	},
	dialogFormmemberTelModify(){
		var telTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
		if (!telTxt.test(this.form.memberTel)) {
			this.$message.error('修改失败：手机号格式不对');
			return;
		}
		let _this = this;
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId（公司ID）,int类型，必填
		// 参数3：type(修改类型),int类型，必填，1为公司负责人，2为联系电话，3为公司地址
		// 参数4：keyword(关键字),string类型，必填
		let memberNameModify = {
			token:  document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			type: 2,
			keyword: this.form.memberTel
		};
		axios.post('http://test.mhfire.cn/mhApi/Company/updateCompanyInfo',Qs.stringify(memberNameModify),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response);
			if(response.data.ret_code==0){
				_this.$message({
          message: '手机号修改成功',
          type: 'success'
        });
				_this.dialogFormmemberTel = false;
				_this.companyAuthInfo.LinkNum = _this.form.memberTel;
			}
			if(response.data.ret_code==102){
				_this.$message.error('修改失败：手机号不能为空');
			}
		})
		.catch(function(error){
			console.log(error);
		});
	},
	updateCompanyAddress(){
		this.dialogFormcompanyAddress = true;
	},
	dialogFormcompanyAddressModify(){
		let _this = this;
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId（公司ID）,int类型，必填
		// 参数3：type(修改类型),int类型，必填，1为公司负责人，2为联系电话，3为公司地址
		// 参数4：keyword(关键字),string类型，必填
		let memberNameModify = {
			token:  document.querySelector('#token').innerText,
			companyId: sessionStorage.getItem('companyId'),
			type: 3,
			keyword: this.form.companyAddress
		};
		axios.post('http://test.mhfire.cn/mhApi/Company/updateCompanyInfo',Qs.stringify(memberNameModify),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
		})
		.then(function(response){
			console.log(response);
			if(response.data.ret_code==0){
				_this.$message({
          message: '公司地址修改成功',
          type: 'success'
				});
				_this.companyAuthInfo.Address = _this.form.companyAddress;
				_this.dialogFormcompanyAddress = false;
			}
			if(response.data.ret_code==102){
				_this.$message.error('修改失败：公司地址不能为空');
			}
		})
		.catch(function(error){
			console.log(error);
		});
	},
	getTelcodeImgs(){
		// this.getTelcodeImgsrc = ' ';
		// this.getTelcodeImgsrc = 'http://test.mhfire.cn/mhApi/User/getCode';
		document.querySelector('.getTelcodeImg').src = 'http://test.mhfire.cn/mhApi/User/getCode';
	},
	//获取手机验证码
	getCheckTelcode(){
		document.querySelectorAll('.getCheckTelcode')[0].style.backgroundColor = "#f6f6f6";
		document.querySelectorAll('.getCheckTelcode')[0].style.border = "none";
		document.querySelectorAll('.getCheckTelcode')[0].style.color = "#c2c2c2";
		document.querySelectorAll('.getCheckTelcode')[0].disabled = "disabled";
		document.querySelectorAll('.getCheckTelcode')[0].style.cursor = "wait";
		let timecout = 60;
		let timer = setInterval(function (){
				document.querySelectorAll('.getCheckTelcode')[0].innerText = "重新获取（"+timecout+")s";
				if(timecout<=0){
					clearInterval(timer);
					document.querySelectorAll('.getCheckTelcode')[0].style.backgroundColor = "#2f8cdb";
					document.querySelectorAll('.getCheckTelcode')[0].style.color = "#fff";
					document.querySelectorAll('.getCheckTelcode')[0].disabled = "";
					document.querySelectorAll('.getCheckTelcode')[0].innerText = "获取验证码";
					document.querySelectorAll('.getCheckTelcode')[0].style.cursor = "pointer";
				}
				timecout--;
			}, 1000);
		let currentPhone = '';
		if(this.firstStep){
			currentPhone = this.baseInfo.UserPhone;
		}else{
			currentPhone = this.newCheackTel;
		}
		axios.get('http://test.mhfire.cn/mhApi/User/getSmsCode',{
				params: {
					phone: currentPhone
				}
		})
		.then(function(response){
				console.log(response);
		})
		.catch(function(error){
				console.log(error);
		});
	},
	nextCheckTelCode(){
		let _this = this;
		if(this.firstStep){
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：phone(手机号码),string类型，必填
			// 参数3：code(图形验证码)，string类型，必填
			// 参数4：smsCode(短信验证码),int类型，必填
			let checkPhoneDatas = {
				token: document.querySelector('#token').innerText,
				phone: this.baseInfo.UserPhone,
				code: this.checkcodeImg,
				smsCode: this.checkcodeTel
			};
			axios.post('http://test.mhfire.cn/mhApi/User/checkPhone',Qs.stringify(checkPhoneDatas),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			})
			.then(function(response){
				console.log(response);
				if(response.data.ret_code==0){
					_this.firstStep = false;
					document.querySelector('.nextTleCodeBtn').innerText = '提交';
				}
			})
			.catch(function(error){
					console.log(error);
			});
		}else{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：phone(手机号码),string类型，必填
		// 参数3：smsCode(短信验证码),int类型，必填
			let checkPhoneDatas = {
				token: document.querySelector('#token').innerText,
				phone: this.newCheackTel,
				smsCode: this.checkcodeTel
			};
			axios.post('http://test.mhfire.cn/mhApi/User/updatePhone',Qs.stringify(checkPhoneDatas),{
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			})
			.then(function(response){
				console.log(response);
				_this.baseInfo.UserPhone = _this.newCheackTel;
				_this.dialogFormPersonInfosTel = false;
			})
			.catch(function(error){
					console.log(error);
			});
		}
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
	let _this = this;
	axios.get('http://test.mhfire.cn/mhApi/User/userInfo',{
			params: {
				token: document.querySelector('#token').innerText
			}
	})
	.then(function(response){
			console.log(response);
			_this.baseInfo = response.data.data.baseInfo;
			_this.companyAuthInfo = response.data.data.companyAuthInfo;
	})
	.catch(function(error){
			console.log(error);
	});
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
// activated(){
// 	this.getTelcodeImgs();	
// 	console.log('lkjljljljkl');
// },
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
.personInfos .personInfosTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
	margin-bottom: 20px;
}
.personInfosTopCont{

	width: 1200px;
	margin: 0 auto;
	position: relative;
}
.personInfosPart{
	background-color: #ffffff;
	width: 100%;
	border-radius: 15px;
	margin-top: 20px;
	padding-bottom: 10px;
}
.personInfosContTop{
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
.personInfosAreaItem{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 137px;
	background-color: #ffffff;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 30px;
	position: relative;
	margin-top: 20px;
}
.personInfosAreaItem dl{
	margin: 0;
	margin-left: 30px;
	width: 365px;
}
.personInfosAreaItem dd{
	margin-left: 0;
	margin-bottom: 16px;
	color: #666666;
	font-size: 13px;
	font-family: "PFz";
	vertical-align: middle;
}
.personInfosAreaItem dd span{
	color: #333333;
	display: inline-block;
	width: 110px;
	font-size: 14px;
}
.personInfosSetCont{
	color: #333333;
	font-size: 14px;
	font-family: "PFz";
	overflow: hidden;
	margin-left: 65px;
	padding-bottom: 20px;
}
.personInfosDis{
	color: #666666;
	margin-left: 56px;
	font-size: 13px;
}
.personInfosModify{
	color: #2f8cdb;
	float: right;
	margin-right: 120px;
	cursor: pointer;
}
.lastItem{
	margin-top: 30px;
	margin-bottom: 30px;
	height: 235px;
}
.lastItem dd i{
	margin-left: 30px;
	font-size: 14px;
	cursor: pointer;
}
.infosCheckImg{
	width: 140px;
	height: 160px;
	border: 1px solid red;
	margin-left: 180px;
}
.el-dialog__header{
	display: none;
}
.personInfosAligo .el-form-item__label{
	font-family: "PFz";
	color: #333;
	font-size: 18px;
	font-weight: 600;
}
.personInfosPassWord >div{
	width: 436px;
	height: 368px;
}
.personInfosPassWord >div input{
	width: 338px;
	height: 40px;
}
.personInfosPassWord >div .el-form-item__label{
	margin-left: 25px;
	margin-bottom: 15px;

}
.personInfosPassWord >div .el-form-item__content{
	width: 338px;
	margin: 0 auto;
}
.personInfosPassWord >div .el-form-item__content .el-input input{
	background-color: #f6f6f6;
	border: none;
	margin-bottom: 20px;
}
.personInfosPassWord >div button{
	width: 160px;
	height: 40px;
}
.personInfosAligo{
	margin-bottom: 0;
}
.personInfosPassWord >div .el-dialog__footer{
	margin-top: 0;
}
.personInfosPassWord >div .dialog-footer{
	width: 338px;
	margin: 0 auto;
}
.personInfosPassWord >div .el-dialog__body{
	padding-bottom: 10px;
}
.modifyTel{
	width: 470px;
	margin: 0 auto;
}
.personInfosPassTel>div{
	width: 569px;
	height: 411px;
}
.personInfosPassTel .modifyTelTitle{
	color: #333;
	font-size: 18px;
	font-family: "PFz";
	font-weight: bolder;
	margin-top: 20px;
}
.modifyTelNav{
	color: #333;
	font-size: 14px;
	font-family: "PFxi";
}
.modifyTelDis{
	color: #333;
	font-size: 14px;
	font-family: "PFxi";
	margin-bottom: 20px;
	margin-top: 20px;
}
.personInfosPassTel .el-input{
	width: 240px;
	height: 40px;
	background-color: #f6f6f6;
	margin-right: 20px;
}
.modifyNodeImg{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 20px;
}
.getTelcodeImg{
	width: 108px;
	height: 40px;
	cursor: pointer;
}
.getTelcodeBtn{
	width: 108px;
	height: 40px;
}
.nextTleCodeBtn{
	width: 368px;
	height: 40px;
	margin-top: 30px;
	margin-bottom: 50px;
}
.modifyTelNav{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 0;
}
.modifyTelNav li{
	height: 40px;
	list-style: none;
	line-height: 40px;
	text-align: center;
}
.modifyTelNav li:first-child{
	width: 248px;
	background-image: url('~@/assets/images/Person/firstStepd.png');
}
.modifyTelNav li:last-child{
	width: 229px;
	background-image: url('~@/assets/images/Person/secondStep.png');
}

.personInfoscompanyAddress >div{
	width: 436px;
	/* height: 368px; */
}
.personInfoscompanyAddress .el-form-item{
	margin-bottom: 0;
}
.personInfoscompanyAddress >div input{
	width: 338px;
	height: 40px;
}
.personInfoscompanyAddress >div .el-form-item__label{
	margin-left: 25px;
	margin-bottom: 15px;
	font-family: "PFz";
	color: #333;
	font-size: 18px;
	font-weight: 600;
}
.personInfoscompanyAddress >div .el-form-item__content{
	width: 338px;
	margin: 0 auto;
}
.personInfoscompanyAddress >div .el-form-item__content .el-input input{
	background-color: #f6f6f6;
	border: none;
	margin-bottom: 20px;
}
.personInfoscompanyAddress >div button{
	width: 160px;
	height: 40px;
}
.personInfosAligo{
	margin-bottom: 0;
}
.personInfoscompanyAddress >div .el-dialog__footer{
	margin-top: 0;
	padding-top: 0;
	padding-bottom: 40px;
}
.personInfoscompanyAddress >div .dialog-footer{
	width: 338px;
	margin: 0 auto;
}
.personInfoscompanyAddress >div .el-dialog__body{
	padding-bottom: 10px;
}

.personInfosmemberName >div{
	width: 436px;
	/* height: 368px; */
}
.personInfosmemberName .el-form-item{
	margin-bottom: 0;
}
.personInfosmemberName >div input{
	width: 338px;
	height: 40px;
}
.personInfosmemberName >div .el-form-item__label{
	margin-left: 25px;
	margin-bottom: 15px;
	font-family: "PFz";
	color: #333;
	font-size: 18px;
	font-weight: 600;
}
.personInfosmemberName >div .el-form-item__content{
	width: 338px;
	margin: 0 auto;
}
.personInfosmemberName >div .el-form-item__content .el-input input{
	background-color: #f6f6f6;
	border: none;
	margin-bottom: 20px;
}
.personInfosmemberName >div button{
	width: 160px;
	height: 40px;
}
.personInfosAligo{
	margin-bottom: 0;
}
.personInfosmemberName >div .el-dialog__footer{
	margin-top: 0;
	padding-top: 0;
	padding-bottom: 40px;
}
.personInfosmemberName >div .dialog-footer{
	width: 338px;
	margin: 0 auto;
}
.personInfosmemberName >div .el-dialog__body{
	padding-bottom: 10px;
}

.personInfosmemberTel >div{
	width: 436px;
	/* height: 368px; */
}
.personInfosmemberTel .el-form-item{
	margin-bottom: 0;
}
.personInfosmemberTel >div input{
	width: 338px;
	height: 40px;
}
.personInfosmemberTel >div .el-form-item__label{
	margin-left: 25px;
	margin-bottom: 15px;
	font-family: "PFz";
	color: #333;
	font-size: 18px;
	font-weight: 600;
}
.personInfosmemberTel >div .el-form-item__content{
	width: 338px;
	margin: 0 auto;
}
.personInfosmemberTel >div .el-form-item__content .el-input input{
	background-color: #f6f6f6;
	border: none;
	margin-bottom: 20px;
}
.personInfosmemberTel >div button{
	width: 160px;
	height: 40px;
}
.personInfosAligo{
	margin-bottom: 0;
}
.personInfosmemberTel >div .el-dialog__footer{
	margin-top: 0;
	padding-top: 0;
	padding-bottom: 40px;
}
.personInfosmemberTel >div .dialog-footer{
	width: 338px;
	margin: 0 auto;
}
.personInfosmemberTel >div .el-dialog__body{
	padding-bottom: 10px;
}
</style>