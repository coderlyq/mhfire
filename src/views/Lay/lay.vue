<!--  -->
<template>
<div class='lay'>
<img src="~@/assets/images/Lay/bottomRight.png" alt="" class="bottomRight">
<img src="~@/assets/images/Lay/topRightImg.png" alt="" class="topRightImg">
<div class="layConts">
	<ol class="layContsOl"><li>登录</li><li>注册</li></ol>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm.pass" autocomplete="off" clearable show-password></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="年龄" prop="age">
			<el-input v-model.number="ruleForm.age"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
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
}
.layContsOl{
	list-style-type: none;
}
.layContsOl li{
	display: inline-block;
	width: 50%;
	text-align: center;
}
</style>