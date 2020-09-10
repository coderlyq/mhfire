<!--  -->
<template>
  <el-container class="personInfos">
		<el-header class="personInfosTop">
			<div class="personInfosTopCont" style="text-align:left;">
				新建项目
			</div>
		</el-header>
		<el-main>
			<div class="personInfosTopCont">
				<div class="personInfosPart">
					<div class="personInfosContTop">基本信息</div>
					<div class="personInfosAreaItem">
						<img src="~@/assets/images/List/logoDefault.png" alt="啊撒旦范德萨分">
						<dl>
							<dd><span>账户名 </span>13335655521</dd>
							<dd><span>注册时间 </span>2019年7月23日</dd>
							<dd><span>公司名称 </span>深圳门海安全技术有限公司</dd>
						</dl>
					</div>
				</div>
				<div class="personInfosPart">
					<div class="personInfosContTop">安全设置</div>
					<div class="personInfosSetCont">登录密码
						<span class="personInfosDis">安全性高的密码可以使账号更安全，密码长度8-16个字符，且包含英文和数字</span>
						<el-button type="text" @click="personInfosPassModify" class="personInfosModify">修改</el-button>
					</div>
					<div class="personInfosSetCont">手机号码
						<span class="personInfosDis">手机号136895641254已验证</span>
						<el-button type="text" @click="personInfosTelModify" class="personInfosModify">修改</el-button>
					</div>
				</div>
				<div class="personInfosPart">
					<div class="personInfosContTop">信息认证</div>
					<div class="personInfosAreaItem lastItem">
						<dl>
							<dd><span>公司名称 </span>深圳门海安全技术有限公司</dd>
							<dd><span>认证类型 </span>营业执照</dd>
							<dd><span>公司负责人 </span>刘老根 <i class="el-icon-edit-outline" @click="updateMemberName"></i></dd>
							<dd><span>联系电话 </span>13335655521 <i class="el-icon-edit-outline" @click="updateMemberTel"></i></dd>
							<dd><span>公司地址 </span>汇聚创新园留仙三路102室内 <i class="el-icon-edit-outline" @click="updateCompanyAddress"></i></dd>
							<dd><span>认证日期 </span>2019年7月23日</dd>
						</dl>
						<img src="" alt="" class="infosCheckImg">
					</div>
				</div>
			</div>
			<el-dialog title="" :visible.sync="dialogFormPersonInfos" class="personInfosPassWord">
				<el-form :model="form">
					<el-form-item label="修改密码" class="personInfosAligo" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off" placeholder="请输入当前密码"></el-input>
						<el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码"></el-input>
						<el-input v-model="form.name" autocomplete="off" placeholder="请确认新密码"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormPersonInfos = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormPersonInfos = false">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="" :visible.sync="dialogFormPersonInfosTel" class="personInfosPassTel">
				<div class="modifyTel">
					<div class="modifyTelTitle">修改手机号码</div>
					<ol class="modifyTelNav">
						<li>1、验证旧手机</li>
						<li>2、验证新手机</li>
					</ol>
					<div class="modifyTelDis">当前手机号码：13566265485</div>
					<div class="modifyNodeImg">
						<el-input autocomplete="off" placeholder="图形验证码"></el-input>
						<img class="getTelcodeImg" src="http://test.mhfire.cn/mhApi/User/getCode" alt="">
					</div>
					<div>
						<el-input autocomplete="off" placeholder="短信验证码"></el-input>
						<el-button class="getTelcodeBtn" type="primary" @click="getTelCode">获取验证码</el-button>
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
					<el-button type="primary" @click="dialogFormcompanyAddress = false">确 定</el-button>
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
					<el-button type="primary" @click="dialogmemberName = false">确 定</el-button>
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
					<el-button type="primary" @click="dialogFormmemberTel = false">确 定</el-button>
				</div>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

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
			name: ''
		}
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	personInfosPassModify() {
		this.dialogFormPersonInfos = true;
	},
	personInfosTelModify() {
		this.dialogFormPersonInfosTel = true;
	}, 
	updateMemberName(){
		this.dialogmemberName = true;
	},
	updateMemberTel(){
		this.dialogFormmemberTel = true;
	},
	updateCompanyAddress(){
		this.dialogFormcompanyAddress = true;
	}
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