<!--  -->
<template>
<div class='attestation'>
		<el-header class="attestationTop">
			<div class="attestationTopCont">
				<div class="attestationLeft">员工申请审核</div>
				<div class="attestationRight">
					<el-select v-model="value" placeholder="待审核">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-input placeholder="搜公司名称" v-model="input3">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			</div>
		</el-header>
		<el-main>
			<div class="attestationAreaCont">
				<div class="attestationAreaItem">
					<img src="~@/assets/images/List/logoDefault.png" alt="">
					<dl>
						<dt>深圳市奇勤达科技发展有限公司</dt>
						<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：<span>刘德华</span></dd>
						<dd><img src="~@/assets/images/List/address.png" alt="">公司地址<span>留仙三路汇聚创新园</span></dd>
						<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：<span>13389752034</span></dd>
						<dd><img src="~@/assets/images/List/check.png" alt="">申请认证方式：<span>通过营业执照认证</span></dd>
					</dl>
					<img src="~@/assets/images/List/logoDefault.png" alt="" class="attestationBigImg">
					<div class="attestationBtnArea">
						<el-button type="danger" v-show="item1.attAreaShow==='check'">拒绝</el-button>
						<el-button type="primary" v-show="item1.attAreaShow==='check'">通过认证</el-button>
						<img src="~@/assets/images/Attestation/checkYes.png" alt="" class="attestationCheck" v-show="item1.attAreaShow==='checkYes'">
						<img src="~@/assets/images/Attestation/checkNo.png" alt="" class="attestationCheck"  v-show="item1.attAreaShow==='checkNo'">
					</div>
					<div class="attestationCheckTime">
						申请时间：<span>2019年12月30号</span>
					</div>
				</div>
			</div>
			<div class="managernavblock">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
				</el-pagination>
			</div>
		</el-main>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		item1: {
			attAreaShow: 'check'
		}
		
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

}
}
</script>
<style>
.attestation .attestationTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
	margin-bottom: 20px;
}
.attestation .attestationTop .attestationTopCont{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 1200px;
	margin: 0 auto;
}
.attestationAreaCont{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 1200px;
	margin: 0 auto;
}
.attestationTopCont{
	overflow: hidden;
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
}
.attestationLeft{
	float: left;
}
.attestationRight{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	float: right;
	color: #666666;
	font-size: 12px;
	font-family: "PFxi";
}
.attestationRight>.el-input-group--append{
	border: 1px solid #dddddd;
	border-radius: 5px;
	margin-left: 25px;
}
.attestationRight .el-input__inner{
	width: 214px;
	height: 30px !important;
	line-height: 30px;
	border: none;
	border-radius: 5px;
}
.attestationRight .el-select .el-input__inner{
	width: 170px;
	border: 1px solid #dddddd;
	border-radius: 5px;
	text-align: center;
}
.attestationRight .el-input-group__append{
	background-color: #ffffff;
	border: none;
	border-radius: 5px;
}
.attestationCont .el-main{
	padding-top: 50px;
	background-color: #ffffff;
	margin-top: 20px;
	padding-left: 50px;
	margin-right: 22px;
	margin-left: 24px;
	border-radius: 10px;
}
.attestationBigImg{
	width: 96px;
	height: 95px;
	margin-right: 132px;
}
.attestationAreaItem{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 210px;
	background-color: #ffffff;
	border-radius: 10px;
	box-sizing: border-box;
	padding-left: 30px;
	position: relative;
}
.attestationAreaItem dl{
	margin: 0;
	margin-left: 30px;
	width: 365px;
}
.attestationAreaItem dt{
	margin-bottom: 18px;
	font-family: "PFzc";
	color: #333;
	font-size: 18px;
}
.attestationAreaItem dd{
	margin-left: 0;
	margin-bottom: 12px;
	color: #999999;
	font-size: 14px;
	font-family: "PFz";
	vertical-align: middle;
}
.attestationAreaItem dd img{
	margin-right: 5px;
}
.attestationBtnArea{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.attestationBtnArea .el-button{
	width: 110px;
	height: 30px;
	padding: 0;
	margin-left: 48px;
}
.attestationBtnArea .el-button--primary{
	background-color: #46d78a;
	border-color: #46d78a;
}
.attestationCheckTime{
	position: absolute;
	right: 31px;
	top: 42px;
	color: #999999;
	font-size: 14px;
	font-family: "PFxi";
}
.attestationCheck{
	position: absolute;
	right: 80px;
	margin-top: 25px;
}
 .managernavblock{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
 }
</style>