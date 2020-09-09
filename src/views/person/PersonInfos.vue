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
						<span @click="personInfosPassModify" class="personInfosModify">修改</span>
					</div>
					<div class="personInfosSetCont">手机号码
						<span class="personInfosDis">手机号136895641254已验证</span>
						<span @click="personInfosTelModify" class="personInfosModify">修改</span>
					</div>
				</div>
				<div class="personInfosPart">
					<div class="personInfosContTop">信息认证</div>
					<div class="personInfosAreaItem lastItem">
						<dl>
							<dd><span>公司名称 </span>深圳门海安全技术有限公司</dd>
							<dd><span>认证类型 </span>营业执照</dd>
							<dd><span>公司负责人 </span>刘老根 <i class="el-icon-edit-outline"></i></dd>
							<dd><span>联系电话 </span>13335655521 <i class="el-icon-edit-outline"></i></dd>
							<dd><span>公司地址 </span>汇聚创新园留仙三路102室内 <i class="el-icon-edit-outline"></i></dd>
							<dd><span>认证日期 </span>2019年7月23日</dd>
						</dl>
						<img src="" alt="" class="infosCheckImg">
					</div>
				</div>
			</div>
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

	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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
}
.lastItem{
	margin-top: 30px;
	margin-bottom: 30px;
	height: 235px;
}
.lastItem dd i{
	margin-left: 30px;
	font-size: 14px;
}
.infosCheckImg{
	width: 140px;
	height: 160px;
	border: 1px solid red;
	margin-left: 180px;
}
</style>