<template>
	<el-container id="person" style="height: 93.55vh;">
		<el-aside style="width:374px;padding:0;background-color:#ffffff;">
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemName">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemMark">普通员工</span>
			</PersonItem>
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemName">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemMark">普通员工</span>
			</PersonItem>
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemName">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemMark">普通员工</span>
			</PersonItem>
		</el-aside>
		<el-main style="padding:0;">
			<el-container>
				<el-header style="background-color:#fff;" class="personBarHead">
					<span class="personTopTitle">人员等级</span>
					<el-select style="font-family:'Microsoft YaHei';font-size:12px;color:#666;font-weight:bold;" v-model="value" placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<span class="personWarnText">
						<img src="~@/assets/images/Person/warnImg.png" alt="">
						修改人员类型为普通员工人员等级将下降，并且会移除所有负责项目的权限
					</span>
					<el-button class="personBarBut" type="danger" plain>删除员工</el-button>
				</el-header>
				<el-main class="personContMain">
					<el-container  v-show="true">
						<el-header class="personContMainTop">
							<span class="personContMainTopText">当前负责的项目</span>
							<el-button type="primary" icon="el-icon-circle-plus-outline">添加负责项目</el-button>
						</el-header>
						<el-main>
							<ol class="elmainOl">
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain @click="dialogTableVisible = true">去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
							</ol>
						</el-main>
					</el-container>
					<el-container style="margin-top:20px;" v-show="true">
						<el-header class="personContMainTop">
							<span class="personContMainTopText">作为员工隶属的项目</span>
							<el-button type="primary" icon="el-icon-circle-plus-outline">添加负责项目</el-button>
						</el-header>
						<el-main>
							<ol class="elmainOl">
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
								<li>
									<div class="elmainLeft">
										<span class="elmainName">新明医院</span>
										<span class="elmainAddress">深圳市宝安区留仙三路汇聚创新园A栋404</span>
									</div>
									<div class="elmainRight">
										<el-button type="primary" style="margin-right:45px;" plain>去设置项目内功能权限</el-button>
										<el-button type="primary" plain>从负责项目中移除</el-button>
									</div>
								</li>
							</ol>
						</el-main>
					</el-container>
				</el-main>
				<!-- <el-dialog
					title="提示"
					:visible.sync="dialogVisible"
					width="30%"
					:before-close="handleClose">
					<span>这是一段信息</span>
				</el-dialog> -->

				<el-dialog :visible.sync="dialogTableVisible" class="personDialog" :before-close="handleClose" style="cellspacing:20px;cellpadding:20px;">
					<el-table :data="gridData">
						<el-table-column property="name" label=" " width="326"></el-table-column>
						<!-- <el-table-column property="name" label=" " width="175"></el-table-column> -->
						<el-table-column
							fixed="right"
							label=""
							width="175"
							border=true
							>
							<template slot-scope="scope">
								<el-button type="primary" @click="handleClick(scope.row)" plain>添加负责项目</el-button>
								<!-- <el-button @click="handleClick(scope.row)" type="button" size="big">查看</el-button> -->
							</template>
						</el-table-column>
					</el-table>
				</el-dialog>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import PersonItem from '@/views/person/PersonItem.vue'
  export default {
		name: "Person",
		data() {
      return {
				dialogTableVisible: false,
				gridData: [{
          name: '王小虎'
        }, {
          name: '王小虎'
        }, {
					name: '王小虎'
        }, {
          name: '王小虎'
        }],
        options: [{
          value: '01',
          label: '项目负责人'
        }, {
          value: '02',
          label: '普通员工'
        }],
        value: ''
      }
    },
		components: {
			PersonItem
		},
		methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done(_);
          })
          .catch(_ => {_});
      }
    }
  }
</script>

<style>
	ol{
		list-style: none;
	}
	.personBarHead{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		position: relative;
	}
	.personWarnText{
		font-size: 12px;
		color: #ff4848;		
		margin-left: 10px;
	}
	.personWarnText img{
		vertical-align: middle;
	}
	.personTopTitle{
		font-family: "FC";
		font-size: 18px;
		color: #333;
		font-weight: bolder;
		margin-left: 24px;
		margin-right: 20px;
	}
	.personBarBut{
		position: absolute;
		right: 25px;
		font-weight:bold;
		width:100px;
		height:30px;
		line-height:30px;
		padding:0;
	}
	.personContMain{
		margin: 20px 20px 0 20px;
		/* background-color: #ffffff; */
	}
	.personContMain .el-container{
		background-color: #ffffff;
		border-radius: 10px;
	}
	.personContMainTop{
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.personContMainTopText{
		font-family: "FC";
		font-size: 16px;
		color: #333;
		font-weight: 600;
	}
	.elmainOl{
		padding: 0;
	}
	.elmainOl li{
		font-family: "FC";
		box-sizing: border-box;
		padding-left: 60px;
		overflow: hidden;
		box-shadow: 0 0 10px #cccccc;
		height: 90px;
		line-height: 90px;
		margin-bottom: 20px;
		border-radius: 5px;
	}
	.elmainLeft{
		float: left;
		font-size: 14px;
	}
	.elmainName{
		color: #333;
	}
	.elmainAddress{
		color: #999;
		margin-left: 90px;
	}
	.elmainRight{
		height: 100%;
		padding-right: 60px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		color: #2f8cdb;
		font-size: 14px;
	}
	.elmainRight .el-button{
		width: 170px;
		height: 40px;
	}
	.personDialog>div{
		width: 566px;
		border-radius: 10px;
	}
	.personDialog .el-table__header-wrapper{
		display: none;
	}
	.personDialog .el-table__row{
		border: none;
		background-color: #f6f6f6;
		margin-bottom: 100px;
		border-radius: 15px;
	}
	.personDialog .el-table__row td{
		border-bottom: 20px solid #ffffff;
	}
	.personDialog .el-table__row td:first-child div{
		/* margin-left: 20px; */
	}
	/* .personDialog .el-dialog__header{
		position: relative;
		top: -30px;
		right: -28px;
	} */
</style>
