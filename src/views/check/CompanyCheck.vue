<template>
	<el-container class="companyCheck">
		<el-header class="companyCheckTop">
			<div class="companyCheckTopCont" style="text-align:left;">
				企业认证
			</div>
		</el-header>
		<el-main>
			<div class="companyCheckTopCont">
				<div class="companyCheckPart">
					<div class="companyCheckPartTop">企业认证</div>
					<img class="companyLogo" id="companyLogo" src="~@/assets/images/Person/companylogo.png" alt="">
					<form action="http://test.mhfire.cn/mhApi/Company/companyAuth" method="post" enctype="multipart/form-data">
						<input type="file" class="uploadCompanyLogo" name="companyLogo" id="uploadCompanyLogoinput" style="display:none;" @change="changeCompanyImg">
						<span class="companyLogo uploadCompanyLogo" size="small" type="primary" @click="previewFile">上传LOGO</span>
						<input type="text" name="token" :value="formCompany.token" style="display:none;">
						<ol>
							<li><label for="companyName">公司名称</label>
							<input type="text" name="companyName" id="companyName"></li>
							<li><label for="Address">公司地址</label>
							<input type="text" name="Address" id="Address"></li>
							<li>	<label for="linkMan">公司联系人</label>
							<input type="text" name="linkMan" id="linkMan"></li>
							<li><label for="phone">手机号码</label>
							<input type="text" name="phone" id="phone" v-model="formCompany.phone"  ></li>
							<li id="getTelCode"><label for="smsCode">验证码</label>
							<input placeholder="短信验证码" name="smsCode" id="smsCode">
							<el-button class="getCompanyTelcodeBtn" type="primary" @click="getTelCode">获取验证码</el-button></li>
							<li><label for="linkEmail">联系邮箱</label>
							<input name="linkEmail" type="text" id="linkEmail"></li>
							<li><label for="licensePath">营业执照</label>
							<input type="file" class="uploadCompanyLogo" name="licensePath" id="uploadCompanyPic" style="display:none;">
							<el-button id="uploadCompanyPicBtn" size="small" type="primary"  @click="previewPic">点击上传营业执照</el-button></li>
						</ol>
						<button id="commitUp" type="submit">提交认证</button>
					</form>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
// import Qs from 'qs'
export default {
	name: 'CompanyCheck',
	data(){
		return{
			formCompany:{
				token: document.querySelector('#token').innerText,
				Address: '',
				companyName: '',
				linkMan: '',
				phone: '',
				linkEmail: '',
				smsCode: ''
			},
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId（公司ID）,int类型，必填
		axios.get('http://test.mhfire.cn/mhApi/Company/companyAuthCheck',{
				params: {
					token: document.querySelector('#token').innerText,
					companyId: sessionStorage.getItem('companyId')
				}
		})
		.then(function(response){
				console.log(response);
				let companyCheackStatus = response.data.data.Status;
				//审核中
				if(companyCheackStatus==0){
					document.querySelector('#getTelCode').style.display = 'none';
					document.querySelector('#uploadCompanyPic').style.backgroundColor = '#e5e5e5';
					document.querySelector('#uploadCompanyPic').style.color = '#9f9f9f';
					document.querySelector('#uploadCompanyPic').disabled = false;
					document.querySelector('#commitUp').style.backgroundColor = '#e5e5e5';
					document.querySelector('#commitUp').style.color = '#9f9f9f';
					document.querySelector('#commitUp').disabled = false;
					document.querySelector('#commitUp').innerText = '审核中';
				}
				//审核成功
				if(companyCheackStatus==1){
					document.querySelector('#getTelCode').style.display = 'none';
					document.querySelector('#uploadCompanyPic').style.backgroundColor = '#e5e5e5';
					document.querySelector('#uploadCompanyPic').style.color = '#9f9f9f';
					document.querySelector('#uploadCompanyPic').disabled = false;
					document.querySelector('#commitUp').style.backgroundColor = '#e5e5e5';
					document.querySelector('#commitUp').style.color = '#9f9f9f';
					document.querySelector('#commitUp').disabled = false;
					document.querySelector('#commitUp').innerText = '审核成功';
				}
				//审核失败
				if(companyCheackStatus==2){
					document.querySelector('#commitUp').innerText = '审核失败，请重新提交';
				}
		})
		.catch(function(error){
				console.log(error);
		});
	},
	methods:{
		previewFile(){
			document.querySelector('#uploadCompanyLogoinput').click();
		},
		previewPic(){
			document.querySelector('#uploadCompanyPic').click();
		},
		changeCompanyImg() {
			console.log('hahahah');
			
			// 通过标签选择器获取HTML元素
			var preview = document.querySelector('#companyLogo');
			var file = document.querySelector('#uploadCompanyLogoinput').files[0];
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
		//获取手机验证码
		getTelCode(){
			console.log(this.formCompany.phone);
			document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.backgroundColor = "#f6f6f6";
			document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.border = "none";
			document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.color = "#c2c2c2";
			document.querySelectorAll('.getCompanyTelcodeBtn')[0].disabled = "disabled";
			document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.cursor = "wait";
			let timecout = 60;
			let timer = setInterval(function (){
					document.querySelectorAll('.getCompanyTelcodeBtn')[0].innerText = "重新获取（"+timecout+")s";
					if(timecout<=0){
						clearInterval(timer);
						document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.backgroundColor = "#2f8cdb";
						document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.color = "#fff";
						document.querySelectorAll('.getCompanyTelcodeBtn')[0].disabled = "";
						document.querySelectorAll('.getCompanyTelcodeBtn')[0].innerText = "获取验证码";
						document.querySelectorAll('.getCompanyTelcodeBtn')[0].style.cursor = "pointer";
					}
					timecout--;
				}, 1000);
			axios.get('http://test.mhfire.cn/mhApi/User/getSmsCode',{
					params: {
						phone: this.formCompany.phone
					}
			})
			.then(function(response){
					console.log(response);
			})
			.catch(function(error){
					console.log(error);
			});
		}
	}
}
</script>

<style>
#commitUp{
	width: 390px;
	height: 50px;
	margin: 0 auto;
	display: block;
	margin-top: 10px;
}
.companyCheckPart{
	padding-bottom: 40px;
}
.companyCheckPart li:nth-child(5) input{
	width: 178px;
}
.companyCheckPart li:nth-child(5) button{
	width: 193px;
	margin-left: 20px;
}
.companyCheckPart li:last-child{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-left: 39px;
}
.companyCheckPart li:last-child label{
	margin-right: 20px;
}
.companyCheck .companyCheckTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
	margin-bottom: 20px;
}
#uploadCompanyPicBtn{
	width: 216px;
	height: 40px;
}
.companyCheckTopCont{
	background-color: #ffffff;
	width: 610px;
	margin: 0 auto;
	position: relative;
	border-radius: 15px;
}
#companyLogo{
	margin-top: 20px;
	margin-bottom: 8px;
}
.companyLogo{
	display: block;
	width: 60px;
	margin: 0 auto;
}
.uploadCompanyLogo{
	font-family: PFxi;
	font-size: 12px;
	color: #2f8cdb;
}
.companyCheckPartTop{
	font-family: "Microsoft YaHei";
	font-weight: bold;
	font-size: 18px;
	color: #999;
	text-align: center;
	padding-top: 40px;
}
.companyCheckTopCont li{
	list-style: none;
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-right: 65px;
}
.companyCheckTopCont input{
	width: 390px;
	height: 40px;
	box-sizing: border-box;
	border: none;
	border-radius: 5px;
	margin-left: 20px;
	background-color: #f6f6f6;
	text-indent: 10px;
}
.companyCheckTopCont input:hover{
	outline: none;
}
.companyCheckTopCont .el-button--primary{
	background-color: #2f8cdb;
}
.companyCheckTopCont label{
	font-family: "PFxi";
	font-size: 14px;
	color: #333;
}
#commitUp{
	border:none;
	border-radius: 5px;
	background-color: #2f8cdb;
	cursor: pointer;
	color: #ffffff;
	box-sizing: 390px;
	height: 50px;
	line-height: 50px;
	font-size: 14px;
}
</style>