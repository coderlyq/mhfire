<template>
  <el-container class="checkCont">
		<el-header class="checkContTop">
			<div class="checkLeft">员工申请审核</div>
			<div class="checkRight">
				<el-select v-model="value" placeholder="待审核">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-input placeholder="员工姓名/电话" v-model="input3">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
		</el-header>
		<el-main>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
					fixed
					prop="elename"
					label="申请员工姓名"
					width="403">
				</el-table-column>
				<el-table-column
					prop="eletel"
					label="注册电话"
					width="403">
				</el-table-column>
				<el-table-column
					prop="eleTime"
					label="申请时间"
					width="403">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="310">
					<template slot-scope="scope">
						<el-button @click="handleClickYes(scope.row)" type="text" size="big" class="checkLiYes">通过</el-button>
						<el-button @click="handleClickNo(scope.row)" type="text" size="normal" class="checkLiNo">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="checknavblock">
				<el-pagination
					hide-on-single-page=true
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
  export default {
		name: "Search",
		data() {
      return {
				tableData: [{
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
        }, {
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
        }, {
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
        }, {
          eleTime: '2016-05-02',
          elename: '王小虎',
          eletel: '上海市普陀区金沙江路 1518 弄'
				}],
				currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
				currentPage4: 4,
				options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
		},
  }
</script>

<style>
.checkContTop{
	overflow: hidden;
	background-color: #ffffff;
	font-family: "PFz";
	color: #333;
}
.checkLeft{
	float: left;
}
.checkRight{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	float: right;
	color: #666666;
	font-size: 12px;
	font-family: "PFxi";
}
.checkRight>.el-input-group--append{
	border: 1px solid #dddddd;
	border-radius: 5px;
	margin-left: 25px;
}
.checkRight .el-input__inner{
	width: 214px;
	height: 30px !important;
	line-height: 30px;
	border: none;
	border-radius: 5px;
}
.checkRight .el-select .el-input__inner{
	width: 170px;
	border: 1px solid #dddddd;
	border-radius: 5px;
	text-align: center;
}
.checkRight .el-input-group__append{
	background-color: #ffffff;
	border: none;
	border-radius: 5px;
}
.checkCont .el-main{
	padding-top: 50px;
	background-color: #ffffff;
	margin-top: 20px;
	padding-left: 50px;
	margin-right: 22px;
	margin-left: 24px;
	border-radius: 10px;
}
.checkCont .el-table{
	border: none;
}
.el-table td, .el-table th{
	text-align: center;
}
.el-table tr th{
	font-family: "PFxi";
	font-size: 18px;
	color: #666666;
	letter-spacing: 2px;
}
.el-table thead th{
	background-color: #f1f4fc;
 }
.el-table--border td{
	border-right: none;
 }
 .checknavblock{
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
