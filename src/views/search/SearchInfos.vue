<template>
  <el-container class="hisinfosCont">
		<el-header class="shisinfosTop">
			<div class="hisinfostop">事件历史查询</div>
		</el-header>
		<el-main>
			<div class="hisbtn">
				<div class="hisbtnleft">返回</div>
				<div class="hisbtnright">
					<div>上一条</div>
					<div>下一条</div>
				</div>
			</div>
			<div class="hisinfoscont">
				<div class="hisinfosconttop">
					<div class="hisinfosconttopleft">烟感（广电）报警</div>
					<div class="hisinfosconttopright">报警时间：2020.10.28</div>
				</div>
				<div class="hisinfosconts">
					<dl>
						<dd><span>所属系统：</span></dd>
						<dd><span>报警设备：</span></dd>
						<dd><span>设备地址：</span></dd>
						<dd><span>安装位置：</span></dd>
						<dd><span>事件描述：</span></dd>
						<dd><span>值班电话：</span></dd>
					</dl>
					<ol>
						<li><img src="" alt=""></li>
						<li><img src="" alt=""></li>
					</ol>
				</div>
			</div>
		</el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
	name: 'SearchInfos',
	created(){
	let _this = this;
	let token = document.querySelector('#token').innerText;
	axios.get('http://test.mhfire.cn/mhApi/Project/getEventDetail',{
		// 参数1：token(用户登录token)，string类型，必填
		// 参数2：companyId(公司id)，int类型，必填
		// 参数3：projectId(项目ID)，int类型，必填
		// 参数4：messageId(事件ID)，int类型，必填
		// 参数5：type(事件标记)，默认为0,0表示当前事件，1表示上1条事件，2表示下1条事件，int类型，选填
			params: {
				token: token,
				companyId: sessionStorage.getItem('companyId'),
				projectId: 0,
				messageId: _this.messageId,
				type: 0
			}
	})
	.then(function(response){
		console.log(response);
	})
	.catch(function(error){
			console.log(error);
	})
}
}
</script>

<style>
.shisinfosTop{
	height: 60px;
	line-height: 60px;
	background-color: #ffffff;
	font-family: "PFz";
	font-size: 18px;
	color: #333;
	font-weight: bold;
	text-align: left;
}
.hisbtn{
	width: 96%;
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 20px;
	font-family: "PFz";
	font-size: 18px;
	color: #666;
	overflow: hidden;
}
.hisbtnleft{
	width: 100px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	float:left;
	background-color: #ffffff;
}
.hisbtnright{
	float: right;
}
.hisbtnright div{
	display: inline-block;
	width: 155px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	margin-left: 30px;
	background-color: #ffffff;
}
.hisinfoscont{
	width: 96%;
	margin: 0 auto;
	background-color: #ffffff;
}
.hisinfosconttop{
	margin-left: 50px;
	margin-right: 50px;
	font-family: "PFz";
	font-size: 18px;
	color: #333;
	font-weight: bold;
	text-align: left;
	overflow: hidden;
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #dddddd;
}
.hisinfosconttopleft{
	float: left;

}
.hisinfosconttopright{
	float: right;
}
.hisinfosconts {
	padding-top: 30px;
	overflow: hidden;
}
.hisinfosconts dl{
	float: left;
	margin-top: 0;
	margin-bottom: 0;
	margin-left: 50px;
}
.hisinfosconts dd{
	font-family: "PFz";
	font-size: 14px;
	color: '#666';
	margin-bottom: 20px;
}
.hisinfosconts dd span{
	color: '#333';
}
.hisinfosconts ol{
	float: left;
	margin-left: 100px;
	overflow: hidden;
}
.hisinfosconts ol li{
	float: left;
	/* list-style: none; */
}
</style>