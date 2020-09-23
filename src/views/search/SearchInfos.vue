<template>
  <el-container class="hisinfosCont">
		<el-header class="shisinfosTop">
			<div class="hisinfostop">事件历史查询</div>
		</el-header>
		<el-main>
			<div class="hisbtn">
				<div class="hisbtnleft" @click="goback">返回</div>
				<div class="hisbtnright">
					<div @click="getInfos('prev')">上一条</div>
					<div @click="getInfos('next')">下一条</div>
				</div>
			</div>
			<div class="hisinfoscont">
				<div class="hisinfosconttop">
					<div class="hisinfosconttopleft">{{eventDetail.Order}}</div>
					<div class="hisinfosconttopright">报警时间：{{eventDetail.HappenedTime}}</div>
				</div>
				<div class="hisinfosconts">
					<dl>
						<dd><span>所属系统：{{eventDetail.SystemID}}</span></dd>
						<dd><span>报警设备：{{eventDetail.SlewDevice}}</span></dd>
						<dd><span>设备地址：{{eventDetail.DsNum}}</span></dd>
						<dd><span>安装位置：{{eventDetail.Tag}}</span></dd>
						<dd><span>事件描述：{{eventDetail.Order_o}}</span></dd>
						<dd><span>值班电话：{{eventDetail.Tel}}</span></dd>
					</dl>
					<ol>
						<li v-show="eventDetail.DeviceType==='手动报警按钮'"><img src="~@/assets/images/Search/handwarn.png" alt=""></li>
						<li v-show="eventDetail.DeviceType==='烟感'"><img src="~@/assets/images/Search/smoke.png" alt=""></li>
						<li v-show="eventDetail.DeviceType==='消防栓按钮'"><img src="~@/assets/images/Search/waterwarn.png" alt=""></li>
						<li v-show="eventDetail.DeviceType!=='消防栓按钮'&&eventDetail.DeviceType!=='烟感'&&eventDetail.DeviceType!=='手动报警按钮'"><img src="~@/assets/images/Search/default.png" alt=""></li>
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
	data() {
		return {
			eventDetail: '',
			messageId: '',
			projectId: '',
			type: 0
		}
	},
	created(){
		let _this = this;
		console.log(this.$route.params.messageId);
		let token = document.querySelector('#token').innerText;
		this.messageId = this.$route.params.messageId;
		this.projectId = this.$route.params.ProjectID;
		axios.get('http://test.mhfire.cn/mhApi/Project/getEventDetail',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司id)，int类型，必填
			// 参数3：projectId(项目ID)，int类型，必填
			// 参数4：messageId(事件ID)，int类型，必填
			// 参数5：type(事件标记)，默认为0,0表示当前事件，1表示上1条事件，2表示下1条事件，int类型，选填
				params: {
					token: token,
					companyId: sessionStorage.getItem('companyId'),
					messageId: _this.messageId,
					projectId: _this.projectId,
					type: 0
				}
		})
		.then(function(response){
			_this.eventDetail = response.data.data;
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
	},
	methods: {
		getInfos(key){
			if(key==='prev'){
				this.type = 1;
			}
			if(key==='next'){
				this.type = 2;
			}
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
						messageId: _this.eventDetail.ID,
						projectId: _this.projectId,
						type: _this.type
					}
			})
			.then(function(response){
				console.log(response);
				if(response.data.data.length!==0){
					console.log('12345566');
					_this.eventDetail = response.data.data;
				}
				console.log(response.data.data.length);
				console.log('**************************');
				console.log(_this.eventDetail);
			})
			.catch(function(error){
					console.log(error);
			})
		},
		goback(){
			this.$router.go(-1);
		}
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
	cursor: pointer;
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
	cursor: pointer;
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
	list-style: none;
}
</style>