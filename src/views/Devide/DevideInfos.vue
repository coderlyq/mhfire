<!--  -->
<template>
	<div class='devideInfos'>
		<el-container class="devideInfosCont">
			<el-header class="devideInfosContTop">
				<div class="devideInfosLeft">物联设备管理>>设备详情</div>
			</el-header>
			<el-main class="devideInfosMain">
				<div class="devideInfosMainTop">
					<div class="devideInfosMainTopLeft">返回</div>
					<div class="devideInfosMainTopRight">
						<div class="devidePrev">上一条</div>
						<div class="devideNext">下一条</div>
					</div>
				</div>
				<div class="devideInfosMainBottom">
					<div class="devideInfosMainBottomLeft">
						<div class="devideInfosMainBottomLCont">
							<h4>设备信息</h4>
							<div class="devideInfosMainBottomLT">
								<div class="devideInfosMainBottomLTCont">
									<dl>
										<dt></dt>
										<dd><span>设备类型：</span>{{deviceInfos.typename}}</dd>
										<dd><span>系统事件：</span>{{deviceInfos.status}}</dd>
										<dd><span>报警时间：</span>{{deviceInfos.createTime}}</dd>
										<dd><span>设备备注：</span>{{deviceInfos.remark}}</dd>
										<dd><span>设备IMEI：</span>{{deviceInfos.devid}}</dd>
										<dd><span>拆除状态：</span>{{deviceInfos.removeStatus}}</dd>
										<dd><span>电量状态：</span>{{deviceInfos.electricStatus}}</dd>
										<dd><span>信号强度：</span>{{deviceInfos.singleStatus}}</dd>
										<dd><span>设备位置1：</span>{{deviceInfos.address}}</dd>
									</dl>
									<img src="~@/assets/images/DevideManage/devideModel.png" alt="">
								</div>
							</div>
							<div class="devideInfosMainBottomLB">
								<h4>绑定人员</h4>
								<div class="devideInfosMainBottomLBCont">
									<div class="devideInfosMainBottomLBContSide" v-for="(item,index) in deviceUser" :key="index">
										<img class="devideManagerPhoto" :src="item.Headimgurl" alt="">
										<span>{{item.Nickname}}</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
									<!-- <div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
									<div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
									<div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div> -->
								</div>
							</div>
						</div>	
					</div>
					<div class="devideInfosMainBottomRight">
						<div class="devideInfosMainBottomRT">
							<h4>历史事件</h4>
							<div class="devideInfosMainBottomRTCont">
								<ol class="devideInfosMainBottomRTSide" v-for="item in deviceEvet" :key="item.CreateTime">
									<li><span>设备类型：</span>{{item.typename}}</li>
									<li><span>系统事件：</span>{{item.status}}</li>
									<li><span>报警时间：</span>{{item.CreateTime}}</li>
								</ol>
							</div>
						</div>
						<div class="devideInfosMainBottomRB">
							<div class="devideInfosMainBottomRBCont">
								<h4>地址</h4>
								<div class="devideInfosMap">
									<div class="devideInfosMapTopLeft"></div>
									<div class="devideInfosMapTopRight"></div>
									<div class="devideInfosMapBottomLeft"></div>
									<div class="devideInfosMapBottomRight"></div>
									<div class="devideInfosMapCont"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
// import Qs from 'qs'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		deviceInfos: {},
		deviceEvet: [],
		deviceUser: [],
		deviceLocation: {},
		currentID: 0,
		type: 0
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	getDeviceDetail() {
		let _this = this;
		let token = document.querySelector('#token').innerText;
		axios.get('http://test.mhfire.cn/mhApi/Device/getDeviceDetail',{
			// 参数1：token(用户token)，string类型，必填
			// 参数2：projectId（项目id），int类型，必填
			// 参数3：id(设备id号)，int类型，必填
			// 参数4：type(展示类型)，0表示当前设备信息，1表示上一条设备信息，2表示下一条设备信，默认为0，选填
			params: {
				token: token,
				projectId: sessionStorage.getItem('projectId'),
				id: this.currentID,
				type: this.type
			}
		})
		.then(function(response){
			if(response.data.ret_code==0){
				console.log(response);
				console.log(response.data.data.device);
				_this.deviceInfos = response.data.data.device;
				_this.deviceEvet = response.data.data.evet;
				_this.deviceUser = response.data.data.user;
				_this.deviceLocation = response.data.data.location;
				console.log(_this.deviceInfos.typename);
			}else{
				_this.$message({
					type: 'info',
					message: response.data.message
				});
			}
		})
		.catch(function(error){
			console.log(error);
		})
	}
},
//生命周期 - 创建完成（可以访问当前this实例
created() {
	this.currentID = this.$route.params.messageId;
	this.getDeviceDetail();
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
	.devideInfos{
		background-color: #f2f4fa;
		width: 100%;
		height: auto;
	}
	.devideInfos .devideInfosCont{
		width: 100%;
		height: auto;
	}
	.devideInfos .devideInfosContTop{
		height: 60px;
		line-height: 60px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideInfos .devideInfosMain{
		margin: 20px 25px 40px 25px;
	}
	.devideInfos .devideInfosMainTop{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideInfos .devideInfosMainTop .devideInfosMainTopLeft{
		box-sizing: border-box;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		/* padding:15px 30px; */
		background-color: #ffffff;
		border-radius: 5px;
	}
	.devideInfos .devideInfosMainTop div{
		color: #666;
		font-family: PFZ;
		letter-spacing: 3px;
		font-size: 18px;
		cursor: pointer;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLCont{
		width: 911px;
		margin: 0 auto;
	}
	.devideInfos .devideInfosMainTop .devideInfosMainTopRight{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideInfos .devideInfosMainTop .devideInfosMainTopRight div{
		width: 155px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #ffffff;
		border-radius: 5px;
	}
	.devideInfos .devideInfosMainTopRight .devideNext{
		margin-left: 30px;
	}
	.devideInfos .devideInfosMainBottom{
		overflow: hidden;
		padding-top: 20px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLeft{
		width: 1003px;
		height: 830px;
		background-color: #ffffff;
		float: left;
		border-radius: 5px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLTCont{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-family: PFc;
		font-size: 14px;
		/* overflow: hidden; */
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT dl{
		width: 421px;
		box-sizing: border-box;
		padding-left: 50px;
		margin: 0;
		margin-top: 30px;
		/* float: left; */
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT dl dd{
		font-family: PFxi;
		color: #666;
		letter-spacing: 2px;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT dl dd span{
		font-family: PFzc;
		color: #333;
		letter-spacing: 2px;
	}

	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLB{
		margin-top: 38px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLB h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottomLBCont{
		overflow: hidden;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLBContSide{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 304px;
		height: 99px;
		float: left;
		border: 1px solid #9dc2e1;
		border-radius: 5px;
		padding-left: 30px;
		background-color: #f1f4f9;
		margin-left: 50px;
		margin-bottom: 40px;
		box-sizing: border-box;
	}
	.devideInfos .devideInfosMainBottomLBContSide span{
		display: inline-block;
		width: 130px;
	}
	.devideInfos .devideInfosMainBottomLBContSide .devideManagerPhoto{
		width: 72px;
		height: 72px;
		margin-right: 10px;
		border-radius: 36px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomRight{
		width: 613px;
		height: 830px;
		background-color: #ffffff;
		float: right;
		border-radius: 10px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomRT{
		height: 505px;
	}
	.devideInfos .devideInfosMainBottomRTCont{
		width: 522px;
		margin: 0 auto;
		height: 405px;
		overflow: auto;
	}
	.devideInfos .devideInfosMainBottomRT h4{
		height: 60px;
		width: 522px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottomRTSide{
		list-style: none;
		font-size: 14px;
		border: 1px solid #dddddd;
		border-radius: 5px;
		padding-top: 20px;box-shadow: 0 0 10px #ddd;
	}
	.devideInfos .devideInfosMainBottomRTSide li{
		font-family: PFxi;
		color: #666;
		letter-spacing: 2px;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottomRTSide li span{
		font-family: PFzc;
		color: #333;
		letter-spacing: 2px;
	}
	.devideInfos .devideInfosMainBottomRBCont{
		width: 522px;
		margin: 0 auto;
		margin-top: 20px;
		box-sizing: border-box;
	}
	.devideInfos .devideInfosMainBottomRB h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfosMap{
		position: relative;
		height: 90px;
	}
	.devideInfosMap>div{
		width: 20px;
		height: 20px;
		position: absolute;
	}
	.devideInfosMapTopLeft{
		border-top: 2px solid #2f8cdb;
		border-left: 2px solid #2f8cdb;
		top: 0;
		left: 0;
	}
	.devideInfosMapTopRight{
		border-right: 2px solid #2f8cdb;
		border-top: 2px solid #2f8cdb;
		top: 0;
		right: 0;
	}
	.devideInfosMapBottomLeft{
		border-left: 2px solid #2f8cdb;
		border-bottom: 2px solid #2f8cdb;
		bottom: 0;
		left: 0;
	}
	.devideInfosMapBottomRight{
		border-right: 2px solid #2f8cdb;
		border-bottom: 2px solid #2f8cdb;
		bottom: 0;
		right: 0;
	}
	.devideInfosMapCont{

	}
</style>