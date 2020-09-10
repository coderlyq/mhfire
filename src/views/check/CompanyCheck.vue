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
					<el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
						<el-form-item label="公司名称">
							<el-input v-model="formLabelAlign.projectName"></el-input>
						</el-form-item>
						<el-form-item label="公司地址">
							<el-input v-model="formLabelAlign.addressDetail"></el-input>
						</el-form-item>
						<el-form-item label="公司联系人">
							<el-input v-model="formLabelAlign.buildingName"></el-input>
						</el-form-item>
						<el-form-item label="手机号码">
							<el-input v-model="formLabelAlign.structureType"></el-input>
						</el-form-item>
						<el-form-item label="验证码">
							<el-input v-model="formLabelAlign.grade"></el-input>
						</el-form-item>
						<el-form-item label="联系邮箱">
							<el-input v-model="formLabelAlign.upFloor"></el-input>
						</el-form-item>
						<el-form-item label="营业执照">
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
								<el-button size="small" type="primary" plain>点击上传营业执照</el-button>
							</el-upload>
						</el-form-item>
						<el-button type="primary" @click="onSubmit">提交认证</el-button>
					</el-form>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
export default {
	data(){
		return{
			formLabelAlign:{
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
		}
	}
}
</script>

<style>
.companyCheck .companyCheckTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
	margin-bottom: 20px;
}
.companyCheckTopCont{
	background-color: #ffffff;
	width: 610px;
	margin: 0 auto;
	position: relative;
	border-radius: 15px;
}
.companyCheckPartTop{
	font-family: "Microsoft YaHei";
	font-weight: bold;
	font-size: 18px;
	color: #999;
	text-align: center;
}
.companyCheckTopCont .el-form-item{
	margin-top: 20px;
}
.companyCheckTopCont .el-input{
	width: 390px;
	height: 40px;
	box-sizing: border-box;
}
.companyCheckTopCont .el-input .el-input__inner{
	background-color: #f6f6f6;
}
.companyCheckTopCont .el-form-item__label{
	font-family: "PFxi";
	font-size: 14px;
	color: #333;
}
</style>