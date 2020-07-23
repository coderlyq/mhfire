<template>
  <el-container class="searchCont">
		<el-header class="searchContTop">
			<el-select v-model="value" placeholder="全部项目">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="全部系统">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="全部事件类型" style="margin-right:30px;">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			时间范围
			<el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
		<el-button type="primary">搜索</el-button>
		</el-header>
		<el-main>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				<el-table-column
					fixed
					prop="eventtype"
					label="事件类型"
					width="410">
				</el-table-column>
				<el-table-column
					prop="devAddress"
					label="设备位置"
					width="410">
				</el-table-column>
				<el-table-column
					prop="activeTime"
					label="发生时间"
					width="410">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="310">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="navblock">
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
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
				},
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
				value: '',
        value1: '',
				value2: '',
				tableData: [{
          activeTime: '2016-05-02',
          eventtype: '王小虎',
          devAddress: '上海市普陀区金沙江路 1518 弄'
        }, {
          activeTime: '2016-05-02',
          eventtype: '王小虎',
          devAddress: '上海市普陀区金沙江路 1518 弄'
        }, {
          activeTime: '2016-05-02',
          eventtype: '王小虎',
          devAddress: '上海市普陀区金沙江路 1518 弄'
        }, {
          activeTime: '2016-05-02',
          eventtype: '王小虎',
          devAddress: '上海市普陀区金沙江路 1518 弄'
				}],
				currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
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
.searchCont .searchContTop{
	background-color: #ffffff;
	font-size: 12px;
	color: #999999;
	font-family: 'PFz';
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-weight: normal;
}
.searchContTop .el-select .el-input .el-input__inner{
	width: 272px;
	height: 30px;
	box-sizing: border-box;
	margin-left: 20px;
	font-size: 12px;
	color: #999999;
	text-align: center;
}
.searchContTop .el-date-editor--daterange{
	width: 340px;
	height: 30px;
	font-size: 12px;
	color: #999999;
	margin-left: 10px;
}
.searchContTop .el-date-editor .el-range__icon{
	line-height: 22px;
}
.searchContTop .el-date-editor .el-range-separator{
	line-height: 24px;
	color: #999999;
}
.searchContTop .el-date-editor .el-range-input{
	color: #999999;
	font-size: 12px;
}
.searchContTop .el-button--primary{
	width: 50px;
	height: 30px;
	box-sizing: border-box;
	padding: 0;
	margin-left: 10px;
}
.searchContTop .el-button--primary span{
	width: 50px;
	height: 30px;
	display: block;
	line-height: 30px;
	text-align: center;
}
.searchCont .el-main{
	padding-top: 50px;
	background-color: #ffffff;
	margin-top: 20px;
	padding-left: 50px;
	margin-left: 24px;
}
.el-table td, .el-table th{
	text-align: center;
}
.el-table tr th{
	font-family: "PFz";
	/* font-weight: bolder; */
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
 .navblock{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
 }
</style>
