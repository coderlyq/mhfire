<!--  -->
<template>
	<div class='devideInfos'>
		<el-container class="devideInfosCont">
			<el-header class="devideInfosContTop">
				<div class="devideInfosLeft">物联设备管理<span>>></span>设备详情</div>
			</el-header>
			<el-main class="devideInfosMain">
				<div class="devideInfosMainTop">
					<div class="devideInfosMainTopLeft" @click="devideBack">返回</div>
					<div class="devideInfosMainTopRight">
						<div class="devidePrev" @click="devidePrev">上一条</div>
						<div class="devideNext" @click="devideNext">下一条</div>
					</div>
				</div>
				<div class="devideInfosMainBottom">
					<div class="devideInfosMainBottomLeft">
						<div class="devideInfosMainBottomLCont">
							<div class="devideInfosMainBottomLT">
								<h4>设备信息</h4>
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
									<img v-if="deviceInfos.type==2" src="~@/assets/images/DevideManage/smallDefault.png" alt="">
									<img v-if="deviceInfos.type==4"  src="~@/assets/images/DevideManage/alarm.png" alt="">
									<img v-if="!deviceInfos.type" src="~@/assets/images/DevideManage/smallDefault.png" alt="">
								</div>
							</div>
							<div class="devideInfosMainBottomLB">
								<h4>绑定人员</h4>
								<div class="devideInfosMainBottomLBCont">
									<div class="devideInfosMainBottomLBContSide" v-for="(item,index) in deviceUser" :key="index">
										<img class="devideManagerPhoto" :src="item.Headimgurl" alt="devid">
										<span>{{item.Nickname}}</span>
										<!-- <el-popconfirm
											@onConfirm="deleteDeviceManager(item.openid)"
											confirm-button-text='确定'
											cancel-button-text='取消'
											icon="el-icon-info"
											icon-color="red"
											title="确定删除item.Nickname吗？删除后人员自动解绑该设备"
										>
											<img src="~@/assets/images/DevideManage/devideDelete.png" alt="" style="cursor:pointer;" slot="reference">
										</el-popconfirm> -->
										<el-popover
											placement="top"
											width="160">
											<p>确定删除<span style="color:#f27978;">{{item.Nickname}}</span>？删除后人员自动解绑该设备</p>
											<div style="text-align: right; margin: 0">
												<el-button size="mini" type="text" @click="visibleAlign = false">取消</el-button>
												<el-button type="primary" size="mini" @click="deleteDeviceManager(item.openid)" >确定</el-button>
											</div>
											<img src="~@/assets/images/DevideManage/devideDelete.png" alt="" style="cursor:pointer;" slot="reference">
										</el-popover>
									</div>
								</div>
							</div>
							<div class="devideRelation">
								<h4>关联设备</h4>
								<div class="devideRelationCont">
									<div class="devideRelationBtns">
										<el-button type="primary" @click="clickGetFile()">批量关联设备</el-button>
										<el-button type="primary" @click="joinDevide()" plain>设备关联</el-button>
										<el-popconfirm
											@onConfirm="removeSingleDevide(null)"
											confirm-button-text='好的'
											cancel-button-text='不用了'
											icon="el-icon-info"
											icon-color="red"
											title="确定要取消全部设备的关联吗？"
										>
											<el-button plain slot="reference">全部取关</el-button>
										</el-popconfirm>
										<input style="display:none;" v-if="ishowFile"  type="file" id="devideInputFile" @change="getFile($event)">
									</div>
									<div class="devideRelationContSide" v-for="(item,index) in relationDevice" :key="index">
										<img v-if="item.relation_devtype==2" src="~@/assets/images/DevideManage/smokeDevide.png" class="devideRelationPhoto"  alt="devid">
										<img v-if="item.relation_devtype==4" src="~@/assets/images/DevideManage/alarmSmall.png" class="devideRelationPhoto"  alt="devid">
										<img v-if="!item.relation_devtype" src="~@/assets/images/DevideManage/smokeDevide.png" class="devideRelationPhoto"  alt="devid">
										<dl>
											<dt>{{item.typename}}</dt>
											<dd>设 备  号 ：<span title="464648566889561651" style="display:inline-block;width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.relation_devid}}</span></dd>
											<dd>设备地址：<span style="display:inline-block;width:120px;vertical-align:top;">{{item.address}}</span></dd>
										</dl>
										<el-popconfirm
										@onConfirm="removeSingleDevide(item.relation_devid)"
										confirm-button-text='好的'
										cancel-button-text='不用了'
										icon="el-icon-info"
										icon-color="red"
										title="确定要取消设备的关联吗？"
										>
										<el-button slot="reference">取消关联</el-button>
										</el-popconfirm>
									</div>
									<div class="managernavblock">
										<el-pagination
											@current-change="relationListChange"
											:current-page.sync="currentPage3"
											:page-size="8"
											:hide-on-single-page="true"
											layout="prev, pager, next, jumper"
											:total="relationDeviceCount">
										</el-pagination>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="devideInfosMainBottomRight">
						<div class="devideInfosMainBottomRT">
							<h4>历史事件</h4>
							<div class="devideInfosMainBottomRTCont">
								<ol class="devideInfosMainBottomRTSide" v-for="(item,index) in deviceEvet" :key="index">
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
									<!-- <div class="devideInfosMapCont"> -->
										<baidu-map class="devideInfosMapCont" id="devicemap">
										</baidu-map>
									<!-- </div> -->
								</div>
							</div>
						</div>
					</div>
					<el-dialog title="设备关联" :visible.sync="dialogRelationDevide" id="singleDev">
						<div @input="SearchSingleDev" @compositionend="SearchSingleDev">
							<el-input placeholder="通过设备名称/地址/IMEI查找设备" v-model="singleDevSearch" id="singleDevSearch"></el-input>
						</div>
						<div class="devideRelationContSide" v-for="(item,index) in joinDevides" :key="index">
							<img v-if="item.devtype==2" src="~@/assets/images/DevideManage/smokeDevide.png" class="devideRelationPhoto"  alt="devid">
							<img v-if="item.devtype==4" src="~@/assets/images/DevideManage/alarmSmall.png" class="devideRelationPhoto"  alt="devid">
							<img v-if="!item.devtype" src="~@/assets/images/DevideManage/smokeDevide.png" class="devideRelationPhoto"  alt="devid">
							<dl>
								<dt>{{item.typename}}</dt>
								<dd>设 备  号 ：<span title="464648566889561651" style="display:inline-block;width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.devid}}</span></dd>
								<dd>设备地址：<span style="display:inline-block;width:120px;vertical-align:top;">{{item.address}}</span></dd>
							</dl>
							<el-popconfirm
							@onConfirm="joinSingleDevide(item.devid)"
							confirm-button-text='好的'
							cancel-button-text='不用了'
							icon="el-icon-info"
							icon-color="red"
							title="确定要关联此设备吗？"
							>
							<el-button type="primary" plain slot="reference">关联</el-button>
							<!-- <el-button ></el-button> -->
							</el-popconfirm>
						</div>
						<div class="managernavblock">
							<el-pagination
								@size-change="joinDevide"
								@current-change="joinDevide"
								:current-page.sync="currentPage3"
								:page-size="15"
								:hide-on-single-page="true"
								layout="prev, pager, next, jumper"
								:total="joinDevideCount">
							</el-pagination>
						</div>
					</el-dialog>
					<!-- <el-dialog :visible.sync="uploadRelationing" class="uploadRalation">
						<el-progress :percentage="50"></el-progress>
					</el-dialog>
					<el-dialog :visible.sync="uploadRelationed" class="uploadRalation">
						<el-progress :percentage="100" status="success"></el-progress>
					</el-dialog> -->
					<el-dialog title="提示" :visible.sync="falidRelationDevide" id="falidRelation">
						<p id="faildTitle">文件中共找到{{faildObject.total_num}}条设备信息，导入成功{{faildObject.success_num}}条，导入失败{{faildObject.fall_num}}条，失败设备号如下：</p>
						<p id="faildDetail">{{faildObject.fall_datas.join('、')}}</p>
						<div id="falidRelationBtn">
							<button id="resetUpload" @click="clickGetFile()">重新导入</button>
							<button id="closeUpload" @click="closeUpload()">确认</button>
						</div>
					</el-dialog>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=bISSwqQz3RZ8jQI6KcMGO4DcUb0zKcjm" ></script>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
// 引入qs对axios上传数据解析
import Qs from 'qs'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {
		faildObject:{
			total_num: 0,
			success_num: 0,
			fall_num: 0,
			fall_datas:[]
		},
		visibleAlign: false,
		visibleRelation: false,
		deviceInfos: {},
		deviceEvet: [],
		deviceUser: [],
		deviceLocation: " ",
		currentID: 0,
		type: 0,
		lat: 0,
		lng: 0,
		address: "",
		file: "",
		relationDevice: [],
		relationDeviceCount: 0,
		dialogRelationDevide: false,
		joinDevides: [],
		joinDevideCount: 0,
		failRelationDev: {},
		uploadRelationing: false,
		uploadRelationed: false,
		falidRelationDevide: false,
		ishowFile: true,
		singleDevImei: null,
		singleDevSearch: ""
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	SearchSingleDev(){
		console.log('7879789');
		this.singleDevImei = document.querySelector('#singleDevSearch').value;
		this.joinDevide();
	},
	closeUpload(){
		this.falidRelationDevide = false;
	},
	format(percentage) {
		return percentage === 100 ? '满' : `${percentage}%`;
	},
	removeSingleDevide(relationImei){
		let removeDevideData = {
			token: document.querySelector('#token').innerText,
			projectId: sessionStorage.getItem('projectId'),
			imei: this.deviceInfos.devid,
			relation_devid: relationImei
		};
		let _this = this;
		axios.post('http://test.mhfire.cn/mhApi/Device/cancelRelationDevice',Qs.stringify(removeDevideData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			// 参数1：token(用户token)，string类型，必填
			// 参数2：projectId（项目id）,int类型，必填
			// 参数3：imei（imei号），string类型，必填
			// 参数4：relation_devid（要关联的设备imei号），string类型，非必填，
			// 如果relation_devid为空，则表示取消所有的关联设备，如果relation_devid不为空则取消当前的relation_devid设备信息
		})
		.then(function(response){
			if(response.data.ret_code==0){
				_this.$message({
					type: 'success',
					message: '取消关联成功'
				});
				_this.getRelationDevice();
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
	},
	relationListChange(val){
		let _this = this;
		let currentPage = val;
		this.getRelationDevice(currentPage);
	},
	joinSingleDevide(currentID){
		let relationDevideData = {
			token: document.querySelector('#token').innerText,
			projectId: sessionStorage.getItem('projectId'),
			imei: this.deviceInfos.devid,
			relation_devid: currentID
		};
		let _this = this;
		axios.post('http://test.mhfire.cn/mhApi/Device/doRelationDevice',Qs.stringify(relationDevideData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			// 参数1：token(用户token)，string类型，必填
			// 参数2：projectId（项目id）,int类型，必填
			// 参数3：imei（imei号），string类型，必填
			// 参数4：relation_devid（要关联的设备imei号），string类型，必填
		})
		.then(function(response){
			if(response.data.ret_code==0){
				_this.$message({
					type: 'success',
					message: '关联成功'
				});
				_this.getRelationDevice();
				_this.dialogRelationDevide = false;
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
	},
	joinDevide(currentPage){
		let indexPage = 1;
		if(currentPage){
			indexPage = currentPage;
		}
		let _this = this;
		this.dialogRelationDevide = true;
		axios.get('http://test.mhfire.cn/mhApi/Device/getRelationDevice',{
			// 参数1：token(用户token)，string类型，必填
			// 参数2：projectId（项目id）,int类型，必填
			// 参数3：imei（imei号），string类型，必填
			// 参数4：keyword(搜索关键字)，string类型，非必填
			// 参数4：page（分页），int类型，非必填，默认为1
			params: {
				token: document.querySelector('#token').innerText,
				projectId: sessionStorage.getItem('projectId'),
				imei: this.deviceInfos.devid,
				keyword: this.singleDevImei,
				page: indexPage
			}
		})
		.then(function(response){
			if(response.data.ret_code==0){
				_this.joinDevides = response.data.data.result;
				_this.joinDevideCount = response.data.data.count;
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
	},
	clickGetFile(){
		this.ishowFile = true;
		// IE浏览器
    if(document.all) {
			document.getElementById("devideInputFile").click();
    }
    // 其它浏览器
    else {
			var e = document.createEvent("MouseEvents");
			e.initEvent("click", true, true);
			document.getElementById("devideInputFile").dispatchEvent(e);
    }
	},
	getFile(event, input_file_name){
		this.uploadRelationing = true;
		let _this = this;
		this.file = event.target.files[0];
		// 参数1：token(用户token)，string类型，必填
		// 参数2：projectId（项目id）,int类型，必填
		// 参数3：imei（imei号），string类型，必填
		// 参数4：file（excel设备文件），file类型，必传
		let formData = new FormData();
		formData.append('token', document.querySelector('#token').innerText);
		formData.append('projectId', sessionStorage.getItem('projectId'));
		formData.append('imei', this.deviceInfos.devid);
		formData.append('file', this.file);
		let config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		this.$http.post('http://test.mhfire.cn/mhApi/Device/batchDevice', formData, config).then(function (res) {
			if (res.body.ret_code === 0) {
				_this.$message({
					type: 'success',
					message: res.data.message
				});
				_this.getRelationDevice(0);
				_this.ishowFile = true;
			}else if(res.body.ret_code === 109){
				_this.faildObject = res.body.data;
				_this.falidRelationDevide = true;
				// _this.$notify({
        //   title: 'HTML 片段',
        //   dangerouslyUseHTMLString: true,
        //   message: '<strong>这是 <i>HTML</i> 片段</strong>'
        // });
				_this.ishowFile = true;
			}else{
				_this.$message({
					type: 'info',
					message: res.body.message
				});
				_this.ishowFile = true;
			}
		}).catch((error) => {
				console.log(error);
		});
		this.ishowFile = false;
	},
	devideBack() {
		this.$router.go(-1);
	},
	devidePrev() {
		this.type = 1;
		this.getDeviceDetail();
		this.baiduMap();
	},
	devideNext() {
		this.type = 2;
		this.getDeviceDetail();
		this.baiduMap();
	},
	deleteRelation(currentOpenID){

	},
	deleteDeviceManager(currentOpenID) {
		let delDeviceUserData = {
			token: document.querySelector('#token').innerText,
			projectId: sessionStorage.getItem('projectId'),
			imei: this.deviceInfos.devid,
			openid: currentOpenID
		};
		let _this = this;
		axios.post('http://test.mhfire.cn/mhApi/Device/delDeviceUser',Qs.stringify(delDeviceUserData),{
			headers: {'Content-Type': 'application/x-www-form-urlencoded'} //加上这个
			// 参数1：token(用户token)，string类型，必填
			// 参数2：projectId（项目id），int类型，必填
			// 参数3：imei(imei号)，string，必填
			// 参数4：openid(用户微信openid)，string，必填
		})
		.then(function(response){
			if(response.data.ret_code==0){
				_this.$message({
					type: 'success',
					message: '解绑成功'
				});
				_this.visibleAlign = false
				_this.type = 0;
				_this.getDeviceDetail();
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
	},
	baiduMap () {
		// var map = new BMap.Map('allmap')
		// var point = new BMap.Point(113.932904,22.589275)
		// map.centerAndZoom(point, 12)
		// var marker = new BMap.Marker(point) // 创建标注
		// map.addOverlay(marker)    // 将标注添加到地图中
		// 百度地图API功能	
		setTimeout(() => {
			let _this = this;
			var map = new BMap.Map("devicemap");
			map.centerAndZoom(new BMap.Point(_this.lng,_this.lat), 15);
			var opts = {
				width : 100,     // 信息窗口宽度
				height: 10,     // 信息窗口高度
				//title : "信息窗口" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
				};
			//创建自定义图标
			var myIcon = new BMap.Icon(require("../../assets/images/Controller/markFire.png"), new BMap.Size(31,47));
			var marker = new BMap.Marker(new BMap.Point(_this.lng,_this.lat),{icon:myIcon});  // 创建标注
			var content = _this.address;
			map.addOverlay(marker);               // 将标注添加到地图中
			addClickHandler(content,marker);
			function addClickHandler(content,marker){
				marker.addEventListener("click",function(e){
					openInfo(content,e)}
				);
			}
			function openInfo(content,e){
				var p = e.target;
				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
				map.openInfoWindow(infoWindow,point); //开启信息窗口
			}
		}, 800);

	},
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
				_this.deviceInfos = response.data.data.device;
				_this.deviceEvet = response.data.data.evet;
				_this.deviceUser = response.data.data.user;
				_this.deviceLocation = response.data.data.location;
				_this.currentID = _this.deviceInfos.id;
				_this.lat = _this.deviceLocation.lat;
				_this.lng = _this.deviceLocation.lng;
				_this.address = _this.deviceLocation.address;
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
	},
	getRelationDevice(currentPage){
		let indexPage = 1;
		if(currentPage){
			indexPage = currentPage;
		}
		let _this = this;
		axios.get('http://test.mhfire.cn/mhApi/Device/relationDevice',{
			// 参数1：token(用户token)，string类型，必填
			// 参数2：projectId（项目id）,int类型，必填
			// 参数3：imei（imei号），string类型，必填
			// 参数4：page（分页），int类型，非必填，默认为1
			params: {
				token: document.querySelector('#token').innerText,
				projectId: sessionStorage.getItem('projectId'),
				imei: this.deviceInfos.devid,
				page: indexPage
			}
		})
		.then(function(response){
			if(response.data.ret_code==0){
				_this.relationDevice = response.data.data.result;
				_this.relationDeviceCount = response.data.data.count;
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
	setTimeout(() => {
		this.getRelationDevice(0);
	}, 1000);
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
	this.baiduMap();
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
	/* .uploadRalation{
		width: 340px;
		height: 134px;
		top: 50%;
		left: 50%;
	}*/
	#singleDev .el-dialog{
		width: 1341px;
	}
	#singleDev .el-dialog__body{
		padding-top: 0;
		overflow: hidden;
	}
	#singleDev .el-dialog__body>div:first-child{
		margin-top: 10px;
		margin-bottom: 30px;
	}
	#singleDevSearch {
    width: 270px;
    height: 30px;
    padding: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjQ1NDhCMUNCQ0Q2MTFFQUE5NTNGMjgyQjFBNEY0NkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjQ1NDhCMURCQ0Q2MTFFQUE5NTNGMjgyQjFBNEY0NkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNDU0OEIxQUJDRDYxMUVBQTk1M0YyODJCMUE0RjQ2RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDU0OEIxQkJDRDYxMUVBQTk1M0YyODJCMUE0RjQ2RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrydmDwAAAFQSURBVHjalNPNK0RRGMfxawwlC0W4Gn+CFGUabCRNZMeUrNnZzIrCgo2VmqXuis2UFSkSSyll1KwsR7FiR4yFl/I9+k093e718tSnc2vu+d3nvExdEASeqQzyGEU7qihhB0V8eKFKaKxHAReYQROu8YoRBZzBjwvY1JcfMIs29KADaZxjECdoDgdkzGT38i7ezDslLekIvVgOB+T17MY7L7reMaclLaDBBrj0F+x5P5fr8Bgt6LMBbrdvQ23HVUWjbwOq2qy/VKvGZxtwpS4GfpnciAl8omwDtvVcsJsTUYtI4QCPNqCoCzSMfXRGfHkV62p9yf6Y1PWc0iWZxI12u6I1j6Nbk93t3EIOT/Ym3mMIGzrzabU8jy4dcb+OewynOs7vDmrlTmMFazpnX18tmzXnNDmtMZuMuXWXMRvp2s6akMOE9/+qhbg/WOpLgAEAdm1MyKtj3ugAAAAASUVORK5CYII=) 244px center no-repeat;
    text-indent: 10px;
	}
	#faildDetail{
		font-family: "PFz";
		font-size: 14px;
		color: #f27978;
		margin-left: 40px;
		margin-right: 40px;
		min-height: 40px;
	}
	#faildTitle{
		margin-left: 40px;
		margin-right: 40px;
	}
	#falidRelation{
		position: absolute;
		bottom: 0;
		left: 0;
	}
	#falidRelation .el-dialog__body{
		padding-left: 0;
		padding-right: 0;
		padding-bottom: 0;
		padding-top: 0;
	}
	#falidRelation .el-dialog__header{
		text-align: center;
		font-family: "PFzc";
		font-size: 18px;
		color: #333333;
	}
	#falidRelation .el-dialog{
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		width: 566px;
	}
	#falidRelationBtn button{
		width: 50%;
		height: 50px;
		line-height: 50px;
		border: none;
		border-top: 1px solid #9f9f9f;
		background-color: #ffffff;
		font-family: "PFz";
		font-size: 14px;
		cursor: pointer;
		padding: 0;
	}
	#falidRelationBtn #resetUpload{
		color: #9f9f9f;
		border-bottom-left-radius: 10px;
	}
	#falidRelationBtn #closeUpload{
		color: #ffffff;
		background-color: #2f8cdb;
		border-bottom-right-radius: 10px;
	}
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
		font-family: "PFz";
		letter-spacing: 2px;
	}
	.devideInfos .devideInfosContTop span{
		font-family: "microsoft yahei";
		letter-spacing: -5px;
		margin-right: 8px;
		color: #666;
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
	.devideRelationBtns>span{
		margin-left: 10px;
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
		/* height: 830px; */
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
		height: 207px;
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
	.devideInfosMap .devideInfosMapCont{
		width: 480px;
		height: 187px;
		position: absolute;
		left: 20px;
		top: 10px;
	}
	.devideRelation h4 {
    height: 60px;
    line-height: 60px;
    color: #333;
    font-family: PFc;
    letter-spacing: 2px;
    border-bottom: 1px solid #e6e6e6;
    margin: 0;
    margin-bottom: 30px;

	}
	.devideRelation{
		position: relative;
	}
	.devideRelationBtns{
		position: absolute;
		right: 0;
		top: 18px;
	}
	.devideRelationBtns .el-button{
		height: 30px;
		line-height: 30px;
		padding: 0;
		width: 82px;
		font-size: 12px;
	}
	.devideRelationBtns .el-button:first-child{
		width: 112px;
	}
	.devideRelationBtns .el-button:last-child{
		color: #999;
	}
	.devideRelationContSide{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 393px;
		height: 110px;
		box-sizing: border-box;
		border: 1px solid #e5e5e5;
		border-radius: 5px;
		padding-left: 20px;
		margin-bottom: 20px;
		margin-left: 50px;
		float: left;
	}
	.devideRelationContSide dl{
		margin-left: 20px;
	}
	.devideRelationContSide dt{
		font-family: PFc;
		font-size: 14px;
		color: #333;
	}
	.devideRelationContSide dd{
		margin-left: 0;
		font-family: PFc;
		font-size: 12px;
		color: #666;
		margin-top: 8px;
	}
	.devideRelationContSide button{
		width: 82px;
		height: 30px;
		box-sizing: border-box;
		line-height: 30px;
		text-align: center;
		padding: 0;
		margin-left: 20px;
		font-family: PFc;
		font-size: 12px;
		color: #999;
	}
</style>