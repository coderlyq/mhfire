<template>
  <el-container class="eleList">
		<el-header class="eleListTop">
			项目列表
			<el-button type="primary" icon="el-icon-circle-plus-outline">创建新项目</el-button>
		</el-header>
		<el-main>
			<ul>
				<li>
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>深圳市奇勤达科技发展有限公司</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：刘德华</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：13389752034</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：留仙三路汇聚创新园</dd>
						</dl>
					</div>
					<el-button type="primary">项目设置</el-button>
				</li>
				<li>
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>深圳市奇勤达科技发展有限公司</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：刘德华</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：13389752034</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：留仙三路汇聚创新园</dd>
						</dl>
					</div>
					<el-button type="primary">项目设置</el-button>
				</li>
				<li>
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>深圳市奇勤达科技发展有限公司</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：刘德华</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：13389752034</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：留仙三路汇聚创新园</dd>
						</dl>
					</div>
					<el-button type="primary">项目设置</el-button>
				</li>
				<li>
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>深圳市奇勤达科技发展有限公司</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：刘德华</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：13389752034</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：留仙三路汇聚创新园</dd>
						</dl>
					</div>
					<el-button type="primary">项目设置</el-button>
				</li>
				<li>
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>深圳市奇勤达科技发展有限公司</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：刘德华</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：13389752034</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：留仙三路汇聚创新园</dd>
						</dl>
					</div>
					<el-button type="primary">项目设置</el-button>
				</li>
				<li>
					<div class="listLiLeft">
						<img src="~@/assets/images/List/logoDefault.png" alt="">
						<dl>
							<dt>深圳市奇勤达科技发展有限公司</dt>
							<dd><img src="~@/assets/images/List/person.png" alt="">公司联系人：刘德华</dd>
							<dd><img src="~@/assets/images/List/tel.png" alt="">手机号码：13389752034</dd>
							<dd><img src="~@/assets/images/List/address.png" alt="">公司地址：留仙三路汇聚创新园</dd>
						</dl>
					</div>
					<el-button type="primary">项目设置</el-button>
				</li>
			</ul>
		</el-main>
	</el-container>
</template>

<script>
  export default {
    name: "List"
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
