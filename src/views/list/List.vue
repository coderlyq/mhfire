<template>
  <el-container class="eleList">
		<el-header class="eleListTop">
			项目列表
			<el-button type="primary" icon="el-icon-circle-plus-outline" @click="toCreateProject" style="display:none;">创建新项目</el-button>
		</el-header>
		<el-main>
			<ul>
				<li v-for="(item,index) in projectLists" :key="item.ProjectName">
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>{{item.ProjectName}}</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：{{item.ProLinkMan}}</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：{{item.ProLinkManTel}}</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：{{item.AddressDetail}}</dd>
						</dl>
					</div>
					<el-button type="primary" @click="clickProject(index)">项目设置</el-button>
				</li>
			</ul>
		</el-main>
	</el-container>
</template>

<script>
// 引入axios
import axios from 'axios'
  export default {
		name: "List",
		data() {
			return {
				projectLists:''
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {
			document.querySelector('.logodis').style.display = 'block';
			// 二级菜单返回上一级时调用
			document.querySelector('.siderBarTop').style.display = 'block';
			document.querySelector('.siderBarBottom').style.display = 'none';
			//二级菜单返回上一级时调用（上）
			let token = document.querySelector('#token').innerText;
			let companyId = sessionStorage.getItem('companyId');
			let page = 1;
			let _this = this;
			axios.get('http://test.mhfire.cn/mhApi/Project/projectList',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司ID)，int类型，必填
				// 参数3：projectName(项目名称)，string类型，选填
				// 参数4：page(分页数)，int类型，选填，默认为1
					params: {
						token: token,
						companyId: companyId,
						projectName:'',
						page:page
					}
			})
			.then(function(response){
				console.log(response.data.data.result);
				_this.projectLists = response.data.data.result;
			})
			.catch(function(error){
					console.log(error);
			})
		},
		methods: {
			clickProject(index){
				let projectId = this.projectLists[index].ID;
				document.querySelector('.siderBarTop').style.display = 'none';
				document.querySelector('.siderBarBottom').style.display = 'block';
				sessionStorage.setItem('projectId',projectId),
				this.$router.push({
					path: '/ProjectList',
					name: 'ProjectList',
					params: {
						projectId:projectId
					}
				})
			},
			toCreateProject(){
				document.querySelector('.leftSideBar').style.display = 'none';
				this.$router.push({
					path: '/ProjectCreate',
					name: 'ProjectCreate',
					params: {
					}
				})
			}
		}
  }
</script>

<style scoped>
.eleList .eleListTop{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
}
.eleList .eleListTop .el-button{
	width: 130px;
	height: 30px;
	line-height: 30px;
	padding: 0;
	font-size: 14px;
	font-family: "PFxi";
	color: #f2f4fa;
}
.eleList ul{
	padding: 0;
	margin-top: 0;
}
.eleList li{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	box-sizing: border-box;
	padding-left: 30px;
	height: 140px;
	margin-bottom: 20px;
	border-radius: 10px;
}
.eleList li .listLiLeft{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.eleList li .listLiLeft dl{
	margin-left: 30px;
}
.eleList li .listLiLeft dl dt{
	margin-bottom: 16px;
	font-family: "PFz";
	font-size: 18px;
	color: #333;
}
.eleList li .listLiLeft dl dd{
	display: inline;
	margin-left: 0;
	margin-right: 40px;
	font-family: "PFxi";
	font-size: 14px;
	color: #666;
}
.eleList li .listLiLeft dl dd img{
	margin-right: 5px;
}
.eleList li .el-button{
	margin-right: 160px;
	width: 110px;
	height: 30px;
	padding: 0;
}
</style>
