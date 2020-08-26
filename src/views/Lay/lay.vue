<!--  -->
<template>
<div class='lay'>
	<img src="~@/assets/images/Lay/bottomRight.png" alt="" class="bottomRight">
	<img src="~@/assets/images/Lay/topRightImg.png" alt="" class="topRightImg">
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
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from 'axios'
import Qs from 'qs'
export default {
name: 'lay',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
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
			checked:false,
			isLay:true,
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
		submitLay(){
				this.$router.push({
							path: '/AllProject',
							name: 'AllProject',
							params: {
								topBarBoolean: true,
								asideBoolean: true
							}
						})
			// this.$refs[formName].validate((valid) => {
			// 	console.log(valid);
			// 	if (valid) {
			// 		// 参数1：phone(表示手机号)，string类型，必填
			// 		// 参数2：password(表示密码)，string类型，必填
			// 		// 参数4：code(手机验证码)，int类型，必填
			// 		var checkNum = 0;
			// 		if(this.checked === true){
			// 			checkNum = 1;
			// 			localStorage.setItem('telLay', this.ruleFormLay.telLay);
			// 			localStorage.setItem('passLay', this.ruleFormLay.passLay);
			// 		}else{
			// 			sessionStorage.setItem('telLay', this.ruleFormLay.telLay);
			// 			sessionStorage.setItem('passLay', this.ruleFormLay.passLay);
			// 			if(localStorage.getItem('telLay')){
			// 				localStorage.removeItem('telLay');
			// 			}
			// 			if(localStorage.getItem('passLay')){
			// 				localStorage.removeItem('passLay');
			// 			}
			// 		}
			// 		let postData = {
			// 				phone: this.ruleFormLay.telLay,
			// 				password: this.ruleFormLay.passLay,
			// 				code: this.imgCode,
			// 				login_status:checkNum
			// 		}
			// 		axios.post('http://test.mhfire.cn/mhApi/User/login',Qs.stringify(postData),{
			// 			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			// 		})
			// 		.then(function(response){
			// 			// this.$emit("dataLay",response.data.data);
			// 			// this.$router.push({
			// 			// 	name: 'ComBase',
			// 			// 	params: {
			// 			// 		topBarBoolean: true,
			// 			// 		asideBoolean: true
			// 			// 	}
			// 			// })
					
			// 				console.log(response.data.data);
			// 		})
			// 		.catch(function(error){
			// 				console.log(error);
			// 		});
			// 	} else {
			// 		console.log('error submit!!');
			// 		return false;
			// 	}
			// });
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
			axios.get('http://test.mhfire.cn/mhApi/Admin/adminList',{
					params: {
						token:'09b603f882584d92baeefbcfbe48c972',
						page: 1
					}
			})
			.then(function(response){
					console.log(response);
			})
			.catch(function(error){
					console.log(error);
			});
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
	}//生命周期 - 创建之前
}

</script>
<style >
.lay{
	width: 100%;
	height: 100%;
	background-image: url('~@/assets/images/Lay/topRightBack.png');
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
	right: 236px;
	top: 320px;
	margin-left: -235px;
	background-color: #ffffff;
	border-radius: 10px;
	padding-bottom: 40px;
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