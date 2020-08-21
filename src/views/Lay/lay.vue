<!--  -->
<template>
<div class='lay'>
	<img src="~@/assets/images/Lay/bottomRight.png" alt="" class="bottomRight">
	<img src="~@/assets/images/Lay/topRightImg.png" alt="" class="topRightImg">
	<div class="layConts">
		<div class="layContsCenter">
			<ol class="layContsOl"><li @click="lay" :class="{checkTopBar:isLay}">登录</li><li :class="{checkTopBar:!isLay}" @click="layIn">注册</li></ol>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-show="isLay">
				<el-form-item prop="pass">
					<el-input type="text" v-model="ruleForm.pass" placeholder="手机号" autocomplete="on" clearable></el-input>
				</el-form-item>
				<el-form-item prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" placeholder="请输入密码" autocomplete="off" clearable show-password></el-input>
				</el-form-item>
				<el-form-item prop="checkCode">
					<el-input v-model.number="ruleForm.checkCode" placeholder="请输入验证码" class="checkCode"></el-input><img src="" alt="" class="checkImg">
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">提交</el-button>
				</el-form-item>
				<!-- `checked` 为 true 或 false -->
				<el-checkbox v-model="checked">下次自动登录</el-checkbox>
			</el-form>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-show="!isLay">
				<el-form-item prop="text">
					<el-input type="text" v-model="ruleForm.pass" placeholder="手机号" autocomplete="on" clearable></el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input type="password" placeholder="请设置密码（8到16位，英文加数字组合）" v-model="ruleForm.pass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass">
					<el-input type="password" placeholder="再次确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="checkCode">
					<el-input v-model.number="ruleForm.checkCode" placeholder="请输入手机验证码" class="checkCode"></el-input><img src="" alt="" class="checkImg">
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

export default {
name: 'lay',
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
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
				isLay:true,
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
			},
			lay(){
				return this.isLay = true;
			},
			layIn(){
				return this.isLay = false;
			}
    }
  }
</script>
<style >
.lay{
	background-image: url('~@/assets/images/Lay/topRightBack.png');
	background-position: right top;
	background-repeat: no-repeat;
}
.bottomRight{
	position: absolute;
	bottom: 0;
	left: 0;
}
.topRightImg{
	position: absolute;
	top: 0;
	right: 0;
}
.layConts{
	width: 470px;
	position: absolute;
	left: 50%;
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
.checkImg{
	width: 120px;
	margin-left: 20px;
}
.submitBtn{
	width: 390px;
}
</style>