<template>
  <el-container class="managerList">
		<el-header class="managerListTop">
			<div class="managerListTopCont">
				公司列表
				<!-- <el-input placeholder="搜索公司名称" v-model="input3">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input> -->
				<el-autocomplete
					suffix-icon="el-icon-search"
					class="inline-input"
					v-model="stateProject"
					:fetch-suggestions="querySearchProject"
					placeholder="请输入内容"
					@select="handleSelectProject"
				></el-autocomplete>
			</div>
		</el-header>
		<el-main>
			<ul class="managerListCont">
				<li v-for="(item,index) in companyList" :key="item.CompanyName">
					<div class="managerLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>{{item.CompanyName}}</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：{{item.LinkMan}}</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：{{item.LinkNum}}</dd>
							<dd><img src="~@/assets/images/Manager/barch.png" alt="">公司子项目{{item.projectCount}}个</dd><br>
							<dd><img src="~@/assets/images/List/address.png" class="managerLastLi" alt="">公司地址：{{item.Address}}</dd>
						</dl>
					</div>
					<el-button type="primary" @click="selectItem(index)">公司设置</el-button>
				</li>
		
			</ul>
			<div class="managernavblock">
				<span class="demonstration">完整功能</span>
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
	</el-container>
</template>

<script>
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
// import Qs from 'qs'
  export default {
		name: "AllProject",
		data() {
			return {
				currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
				currentPage4: 4,
				topBarBoolean: this.$route.params.topBarBoolean,
				asideBoolean: this.$route.params.asideBoolean,
				companyList: '123',
				restaurantsProject: [],
        stateProject: '',
			}
		},
		methods: {
			querySearchProject(queryString, cb) {
				var restaurantsProject = this.restaurantsProject;
        var results = queryString ? restaurantsProject.filter(this.createFilterProject(queryString)) : restaurantsProject;
        // 调用 callback 返回建议列表的数据
				cb(results);
      },
      createFilterProject(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
			},
			handleSelectProject(item) {
				console.log(item);
				console.log(this.companyList[item.index]);
				this.companyList.unshift(this.companyList[item.index]);
				this.companyList.splice(item.index+1,1);
				console.log(this.companyList);
      },
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
			},
			selectItem(index) {
				document.querySelector('.leftSideBar').style.display = 'block';
				let _this = this;
				sessionStorage.setItem('companyId',this.companyList[index].ID);
				document.querySelector('.logodis').innerText = this.companyList[index].CompanyName;
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：companyId(公司ID)，int类型，必填
				// 参数3：projectName(项目名称)，string类型，选填
				// 参数4：page(分页数)，int类型，选填，默认为1
				_this.$router.push({
					path: '/List',
					name: 'List',
					params: {
					}
				})
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {
			
			let _this = this;
			axios.get('http://test.mhfire.cn/mhApi/Company/companyList',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：page(分页数)，int类型，选填，默认为1
				// 参数3：companyName(公司名称)，string类型，选填
					params: {
						token: document.querySelector('#token').innerText,
						page: 1,
						companyName:''
					}
			})
			.then(function(response){

			console.log('123455678890');
			let asideShow = _this.$route.params.asideShow;
			console.log(_this.$route.params.asideShow);
			document.querySelector('.leftSideBar').style.display = asideShow;

				_this.companyList = response.data.data.result;
				let restaurantsProjectArr = [];
				for(let i = 0;i<_this.companyList.length;i++){
					// console.log(restaurantsProject);
					restaurantsProjectArr[i] = {};
					restaurantsProjectArr[i].value = _this.companyList[i].CompanyName;
					restaurantsProjectArr[i].ID = _this.companyList[i].ID;
					restaurantsProjectArr[i].index = i;
				}
				_this.restaurantsProject = restaurantsProjectArr;
			})
			.catch(function(error){
					console.log(error);
			})
		},
		//生命周期 - 创建之前
		beforeCreate() {
		},
		mounted() {
			this.restaurantsProject = Array.from(this.companyList);
			console.log(this.companyList);
    }
	}
</script>

<style>
.managerList .managerListTop{
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
	margin-bottom: 20px;
}
.managerList .managerListTop .managerListTopCont{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 1200px;
	margin: 0 auto;
}
.managerListTopCont>.el-input-group--append{
	border: 1px solid #dddddd;
	border-radius: 5px;
	margin-left: 25px;
}
/* .managerListTopCont .el-autocomplete {
	width: 272px;
	height: 30px !important;
	line-height: 30px;
	border: none;
	border-radius: 5px;
} */
.managerListTopCont .el-autocomplete input{
	width: 272px;
	height: 30px !important;
	line-height: 30px;
	border-radius: 5px;
}
.managerListTopCont  .el-input-group__append{
	background-color: #ffffff;
	border: none;
	border-radius: 5px;
}
.managerList ul{
	padding: 0;
	margin-top: 0;
}
.managerListCont li{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	box-sizing: border-box;
	padding-left: 30px;
	height: 140px;
	width: 1200px;
	margin: 0 auto;
	margin-bottom: 20px;
	border-radius: 10px;

}
.managerListCont li .managerLiLeft{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.managerListCont li .managerLiLeft dl{
	margin-left: 30px;
}
.managerListCont li .managerLiLeft dl dt{
	margin-bottom: 16px;
	font-family: "PFz";
	font-size: 18px;
	color: #333;
}
.managerListCont li .managerLiLeft dl dd{
	display: inline;
	margin-left: 0;
	margin-right: 40px;
	font-family: "PFxi";
	font-size: 14px;
	color: #666;
}
.managerListCont li .managerLiLeft dl dd img{
	margin-right: 5px;
}
.managerListCont li .el-button{
	margin-right: 160px;
	width: 110px;
	height: 30px;
	padding: 0;
}
.managerLastLi{
	margin-top: 14px;
}
 .managernavblock{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
 }
 .checkCont tbody{
	color: #666666;
	font-family: "PFqxi";
	font-size: 14px;
 }
 .checkCont .checkLiYes{
	font-family: "PFxi";
	font-size: 14px;
	color: #43d68b;
 }
 .checkCont .checkLiNo{
	font-family: "PFxi";
	font-size: 14px;
	color: #f05d5c;
 }
</style>
