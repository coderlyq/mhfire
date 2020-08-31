<!--  -->
<template>
<div class='attestation'>
		<el-header class="attestationTop">
			<div class="attestationTopCont"  @compositionend="searchCompany">
				<div class="attestationLeft">员工申请审核</div>
				<div class="attestationRight">
					<el-select v-model="value" placeholder="全部" @change="selectAttest(value)">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-input placeholder="搜公司名称" v-model="inputCompany">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div>
			</div>
		</el-header>
		<el-main>
			<div class="attestationAreaCont">
				<div class="attestationAreaItem" v-for="(item,index) in checkCompanyList" :key="item.CompanyName" >
					<img src="~@/assets/images/List/logoDefault.png" alt="啊撒旦范德萨分">
					<dl>
						<dt>{{item.CompanyName}}</dt>
						<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：<span>{{item.LinkMan}}</span></dd>
						<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：<span>{{item.Address}}</span></dd>
						<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：<span>{{item.LinkNum}}</span></dd>
						<dd><img src="~@/assets/images/List/check.png" alt="">申请认证方式：<span>{{item.AuthWay===1?'营业执照':'其他'}}</span></dd>
					</dl>
					<img src="~@/assets/images/List/logoDefault.png" alt="撒范德萨分" class="attestationBigImg">
					<div class="attestationBtnArea">
						<el-button type="danger" v-show="item.Status==0" @click="checkCompanyNo(index)">拒绝</el-button>
						<el-button type="primary" v-show="item.Status==0" @click="checkCompanyYes(index)">通过认证</el-button>
						<img src="~@/assets/images/Attestation/checkYes.png" v-show="item.Status==1" alt="" class="attestationCheck">
						<img src="~@/assets/images/Attestation/checkNo.png" v-show="item.Status==2" alt="" class="attestationCheck">
					</div>
					<div class="attestationCheckTime">
						申请时间：<span>{{item.CreateTime}}</span>
					</div>
				</div>
			</div>
			<!-- <div class="managernavblock">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
				</el-pagination>
			</div> -->
		</el-main>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
export default {
//import引入的组件需要注入到对象中才能使用

components: {},
data() {
	//这里存放数据
	return {
		options:[
			{
				label:'全部',
				value: 3
			},{
				label:'待审核',
				value: 0
			},{
				label:'已通过',
				value: 1
			},{
				label:'拒绝',
				value: 2
			}
		],
		value: '',
		inputCompany: '',
		item1: {
			attAreaShow: 'check'
		},
		checkCompanyList: ''
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	selectAttest(value){
		let _this = this;
		let token = document.querySelector('#token').innerText;
		console.log('*************************************');
		console.log(value);
		axios.get('http://test.mhfire.cn/mhApi/Company/checkCompanyList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：page(分页数)，int类型，选填，默认为1
			// 参数3：companyName(公司名称)，string类型，选填
			// 参数4：status(审核状态)，int类型，选填，默认为0,0表示待审核，1表示已通过，2表示已拒绝
				params: {
					token: token,
					page: 1,
					companyName:'',
					status: value
				}
		})
		.then(function(response){
			_this.checkCompanyList = response.data.data.result;
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
	},
	searchCompany(){
		let _this = this;
		let token = document.querySelector('#token').innerText;
		console.log('*************************************');
		axios.get('http://test.mhfire.cn/mhApi/Company/checkCompanyList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：page(分页数)，int类型，选填，默认为1
			// 参数3：companyName(公司名称)，string类型，选填
			// 参数4：status(审核状态)，int类型，选填，默认为0,0表示待审核，1表示已通过，2表示已拒绝
				params: {
					token: token,
					page: 1,
					companyName: _this.inputCompany,
					status: _this.value
				}
		})
		.then(function(response){
			_this.checkCompanyList = response.data.data.result;
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
	}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
	console.log('qwe');
	let _this = this;
	let token = document.querySelector('#token').innerText;
	axios.get('http://test.mhfire.cn/mhApi/Company/checkCompanyList',{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：page(分页数)，int类型，选填，默认为1
		// 参数3：companyName(公司名称)，string类型，选填
		// 参数4：status(审核状态)，int类型，选填，默认为0,0表示待审核，1表示已通过，2表示已拒绝
			params: {
				token: token,
				page: 1,
				companyName:'',
				status: 1
			}
	})
	.then(function(response){
		_this.checkCompanyList = response.data.data.result;
		console.log(response);
	})
	.catch(function(error){
			console.log(error);
	})
},
}
</script>
<style>
.el-select-dropdown__item{
	text-align: center;
}
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
	margin-top: 20px;
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
 .el-select-dropdown{
	left: 1154px;
	padding-bottom: 10px;
 }
</style>