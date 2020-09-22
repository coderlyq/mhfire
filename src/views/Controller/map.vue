Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@coderlyq 
coderlyq
/
mhfire
1
00
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
1
Insights
Settings
mhfire/src/views/Controller/map.vue
@coderlyq
coderlyq 2020.9.20
Latest commit 694b9cb 11 hours ago
 History
 1 contributor
We found a potential security vulnerability in one of your dependencies.
Only the owner of this repository can see this message.

505 lines (492 sloc)  18.5 KB
  
<template>
	<baidu-map class="bm-view" id="allmap">
	</baidu-map>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=bISSwqQz3RZ8jQI6KcMGO4DcUb0zKcjm" ></script>
<script>
// 引入axios
import axios from 'axios'
export default {
	name: 'map',
	data(){
		return {
			listArr:[{
				id:"1",
				name:'深圳市奇勤达科技发展有限公司',
				fire:{
					flag:true,
					fireName:'火灾自动报警系统',
						conts:{
							"火警":2,
							"故障":132,
							"启动":3,
							"反馈":3
						}
				},
				water:{
					flag:true,
					waterName:'水系统',
					conts:{
						"报警":5,
						"故障":152
					}
				}
				},{
					id:'2',
					name:'深圳门海安全技术有限公司',
					fire:{
						flag:true,
						fireName:'火灾自动报警系统',
						conts:{
							"火警":2,
							"故障":132,
							"启动":3,
							"反馈":3
						}
					},
					water:{
						flag:true,
						waterName:'水系统',
						conts:{
							"报警":5,
							"故障":152
						}
					}
				}
			],
			eventList:[{
				
			}],
			mapEventDetail: '',
			MapCompanyInfos: {},
			mapCompanyList: {}
		}
	},
	mounted () {
		// setTimeout(()=>this.baiduMap(),2000);
		this.baiduMap();
	},
	//生命周期 - 创建完成（可以访问当前this实例）
created() {
	let _this = this;
	// 参数1：token(用户登录token)，string类型，必填
	// 参数2：companyId(公司id)，超级管理员进去，companyId值为0，企业管理员传具体公司id，int类型
	// 参数3：projectName(项目名称)，string类型，选填
	// 参数4：page(分页数)，int类型，选填，默认为1
	let companyId = sessionStorage.getItem('companyId')=='undefined'?sessionStorage.getItem('companyId'):0;
	console.log(companyId);
	axios.get('http://test.mhfire.cn/mhApi/Project/getMapCompanyInfo',{
			params: {
				token: document.querySelector('#token').innerText,
				companyId: companyId,
				projectName: '',
				page: ''
			}
	})
	.then(function(response){
			console.log(response);
			console.log(response.data.data.result);
			_this.MapCompanyInfos = response.data.data.result;
			_this.mapCompanyList = response.data.data;
	})
	.catch(function(error){
			console.log(error);
	});
},
	methods: {
		// 返回
		goback () {
			this.$router.go(-1)
		},
		baiduMap () {
			// var map = new BMap.Map('allmap')
			// var point = new BMap.Point(113.932904,22.589275)
			// map.centerAndZoom(point, 12)
			// var marker = new BMap.Marker(point) // 创建标注
			// map.addOverlay(marker)    // 将标注添加到地图中
			// 百度地图API功能	
			var map = new BMap.Map("allmap");
			let _that = this;
			setTimeout(function(){
				let data_info = [];
				console.log('%%%%%%%%%%%%%%%%%%');
				for(var k=0;k<_that.MapCompanyInfos.length;k++){
					if(_that.MapCompanyInfos[k].Lltude){
						let currentLltude = _that.MapCompanyInfos[k].Lltude.split(',');
						console.log(currentLltude);
						data_info[k] = [currentLltude[0],currentLltude[1],_that.MapCompanyInfos[k].ProjectName];
					}
				}
				map.centerAndZoom(new BMap.Point(113.936543,22.538501), 15);
			// var data_info = [[113.932904,22.589275,"汇聚创新园"],
			// 				[113.929872,22.581628,"中粮商务公园"],
			// 				[113.931625,22.582769,"华测检测大楼"]
			// 				];
			var opts = {
						width : 100,     // 信息窗口宽度
						height: 10,     // 信息窗口高度
						//title : "信息窗口" , // 信息窗口标题
						enableMessage:true//设置允许信息窗发送短息
						};
			for(var i=0;i<data_info.length;i++){
				//创建自定义图标
				var myIcon = new BMap.Icon(require("../../assets/images/Controller/markFire.png"), new BMap.Size(31,47));
				var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon:myIcon});  // 创建标注
				var content = data_info[i][2];
				map.addOverlay(marker);               // 将标注添加到地图中
				addClickHandler(content,marker);
			}
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
			// 定义一个控件类,即function
			function ZoomControl(){
				// 默认停靠位置和偏移量
				this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
				this.defaultOffset = new BMap.Size(24, 123);
			}
			// 通过JavaScript的prototype属性继承于BMap.Control
			ZoomControl.prototype = new BMap.Control();
			var lent = _that.MapCompanyInfos;
			// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
			// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
			ZoomControl.prototype.initialize = function(map){
				// 创建一个DOM  topLeft元素
				var div = document.createElement("div");
				div.id = 'divLeft';
				div.style.fontSize = '14px';
				div.style.maxHeight = "620px";
				div.style.overflow = 'auto';
				div.addEventListener('compositionend',function(even){
					console.log(even.target.value);
					for(var ii = 0;ii<lent.length;ii++){
						let currentValue = even.target.value;
						if(lent[ii].ProjectName.indexOf(currentValue)>=0){
							_that.MapCompanyInfos.unshift(_that.MapCompanyInfos[ii]);
							_that.MapCompanyInfos.splice(ii+1,1);
							console.log(_that.MapCompanyInfos);
							let nodeElesAll = document.querySelectorAll('.nodeEles');
							console.log(nodeElesAll);
							for(var nodeEle = 0;nodeEle<nodeElesAll.length;nodeEle++){
								console.log(nodeElesAll[nodeEle]);
								nodeElesAll[nodeEle].remove();
							}
							let lent = 	_that.MapCompanyInfos;
							for(var i = 0;i<lent.length;i++){
								console.log(i);
								console.log(lent[i].ProjectName);
								var nodeEles = document.createElement('div');
								nodeEles.className = 'nodeEles';
								nodeEles.style.position = 'relative';
								// nodeEles.dataset.id = lent[i].ID;
								nodeEles.style.backgroundColor = "#fff";
								nodeEles.style.boxSizing = "border-box"
								nodeEles.style.width = "328px";
								nodeEles.style.margin = "0 auto";
								nodeEles.style.marginTop = "10px";
								nodeEles.style.marginBottom = "10px";
								nodeEles.style.paddingTop = "20px";
								nodeEles.style.paddingBottom = "20px";
								nodeEles.style.paddingLeft = "20px";
								nodeEles.style.borderRadius = "10px";
								// 列表标题
								var nodeTitle = document.createElement("h2");
								nodeTitle.style.fontFamily = "PFxi";
								nodeTitle.style.margin = 0;
								nodeTitle.style.color = "#000";
								nodeTitle.style.fontSize = "14px";
								// nodeEle.style.fontWeight = 'bolder';
								nodeTitle.innerText = lent[i].ProjectName;
								//警情详情
								// if(lent[i].fire.flag){
									var nodeDL = document.createElement('dl');
									nodeDL.style.color = "#a1a1a1";
									nodeDL.style.margin = 0;
									nodeDL.style.marginTop = "16px";
									var nodeDT = document.createElement('dt');
									nodeDL.appendChild(nodeDT);
									nodeDT.style.color = "#666";
									nodeDT.style.fontFamily = "PFzc";
									nodeDT.innerText = '火灾自动报警系统';
									nodeDT.style.marginBottom = "8px";
									for (const key in lent[i].warningSystem) {
										var nodeDD = document.createElement('dd');
										nodeDD.style.display = "inline-block";
										nodeDD.style.marginLeft = 0;
										nodeDD.style.marginRight = "20px";
										let keyText = '';
										switch(key){
											case 'fireCount':
												keyText = '火警';
												break;
											case 'troubleCount':
												keyText = '故障';
												break;
											case 'startCount':
												keyText = '启动';
												break;
											case 'feedBackCount':
												keyText = '反馈';
												break;
										}
										nodeDD.appendChild(document.createTextNode(keyText+":"));
										var nodeDDSpanColor = '';
										switch(key){
											case 'fireCount':
												nodeDDSpanColor = '#fe3939';
												break;
											case 'troubleCount':
												nodeDDSpanColor = '#fe8a27';
												break;
											case 'startCount':
												nodeDDSpanColor = '#2dcdcf';
												break;
											case 'feedBackCount':
												nodeDDSpanColor = '#29ca74';
												break;
										}
										var nodeDDSpan = document.createElement('span');
										nodeDDSpan.style.color = nodeDDSpanColor;
										nodeDDSpan.innerText = lent[i].warningSystem[key];
										nodeDD.appendChild(nodeDDSpan);
										nodeDL.appendChild(nodeDD);
									}
								// }
				//水压水位详情
								// if(lent[i].water.flag){
									var nodewaterDL = document.createElement('dl');
									nodewaterDL.style.color = "#a1a1a1";
									nodewaterDL.style.margin = 0;
									nodewaterDL.style.marginTop = "16px";
									var nodewaterDT = document.createElement('dt');
									nodewaterDL.appendChild(nodewaterDT);
									nodewaterDT.style.color = "#666";
									nodewaterDT.style.fontFamily = "PFzc";
									nodewaterDT.innerText = '水系统';
									nodewaterDT.style.marginBottom = "8px";
									for (const key in lent[i].waterSystem) {
										var nodewaterDD = document.createElement('dd');
										nodewaterDD.style.display = "inline-block";
										nodewaterDD.style.marginLeft = 0;
										nodewaterDD.style.marginRight = "20px";
										let keyText = '';
										switch(key){
											case 'waterFireCount':
												keyText = '报警';
												break;
											case 'waterTroubleCount':
												keyText = '故障';
												break;
										}
										nodewaterDD.appendChild(document.createTextNode(keyText+":"));
										var nodewaterDDSpanColor = '';
										switch(key){
											case 'waterFireCount':
												nodewaterDDSpanColor = '#fe3939';
												break;
											case 'waterTroubleCount':
												nodewaterDDSpanColor = '#fe8a27';
												break;
										}
										var nodewaterDDSpan = document.createElement('span');
										nodewaterDDSpan.style.color = nodewaterDDSpanColor;
										nodewaterDDSpan.innerText = lent[i].waterSystem[key];
										nodewaterDD.appendChild(nodewaterDDSpan);
										nodewaterDL.appendChild(nodewaterDD);
									}
									var mapSelectIcon = document.createElement('img');
									mapSelectIcon.src = require("../../assets/images/Controller/mapSelectIcon.png");
									mapSelectIcon.style.position = 'absolute';
									mapSelectIcon.style.right = "20px";
									mapSelectIcon.style.top = "12px";
									mapSelectIcon.dataset.Lltude = lent[i].Lltude;
									mapSelectIcon.addEventListener('click',function(e){
										console.log(this.dataset.Lltude);
										let clickLltude = this.dataset.Lltude.split(',');
										map.panTo(new BMap.Point(clickLltude[0],clickLltude[1]));
										map.setZoom(18);
									});
									var mapunfoldIcon = document.createElement('div');
									mapunfoldIcon.innerText = '查看详情 >>';
									mapunfoldIcon.style.fontFamily = "PFz";
									mapunfoldIcon.style.fontSize = "12px";
									mapunfoldIcon.style.color = "#318CD9";
									mapunfoldIcon.style.position = 'absolute';
									mapunfoldIcon.style.width = "70px";
									mapunfoldIcon.style.height = "20px";
									mapunfoldIcon.style.right = "20px";
									mapunfoldIcon.style.bottom = "12px";
									mapunfoldIcon.dataset.id = lent[i].ID;;
									mapunfoldIcon.addEventListener('click',function(event){
										_that.$router.push({
											path: '/Search',
											name: 'Search',
											params: {
												projectId: event.target.dataset.id
											}
										})
									});
									div.appendChild(nodeEles);
									nodeEles.appendChild(nodeTitle);
									nodeEles.appendChild(nodeDL);
									nodeEles.appendChild(nodewaterDL);
									nodeEles.appendChild(mapSelectIcon);
									nodeEles.appendChild(mapunfoldIcon);
								}
						}
						// console.log(i);
						// console.log(lent[i].ProjectName);
					}
				});
				var inputSearch = document.createElement("input");
				inputSearch.style.display = "block";
				inputSearch.style.outline = 'none';
				inputSearch.style.textIndent = "10px";
				inputSearch.style.width = "328px";
				inputSearch.style.height = "40px";
				inputSearch.style.margin = "0 auto";
				inputSearch.style.marginTop = "20px";
				inputSearch.style.border = "none";
				inputSearch.style.borderRadius = "10px";
				inputSearch.style.backgroundImage = "url("+require("../../assets/images/Controller/inputSearch.png")+")";
				inputSearch.style.backgroundPosition = "292px center";
				inputSearch.style.backgroundRepeat = "no-repeat";
				div.appendChild(inputSearch);
				// nodeEle.innerText = lent[i].name;
				for(var i = 0;i<lent.length;i++){
					console.log(i);
					console.log(lent[i].ProjectName);
					var nodeEles = document.createElement('div');
					nodeEles.className = 'nodeEles';
					nodeEles.style.position = 'relative';
					// nodeEles.dataset.id = lent[i].ID;
					nodeEles.style.backgroundColor = "#fff";
					nodeEles.style.boxSizing = "border-box"
					nodeEles.style.width = "328px";
					nodeEles.style.margin = "0 auto";
					nodeEles.style.marginTop = "10px";
					nodeEles.style.marginBottom = "10px";
					nodeEles.style.paddingTop = "20px";
					nodeEles.style.paddingBottom = "20px";
					nodeEles.style.paddingLeft = "20px";
					nodeEles.style.borderRadius = "10px";
					// 列表标题
					var nodeTitle = document.createElement("h2");
					nodeTitle.style.fontFamily = "PFxi";
					nodeTitle.style.margin = 0;
					nodeTitle.style.color = "#000";
					nodeTitle.style.fontSize = "14px";
					// nodeEle.style.fontWeight = 'bolder';
					nodeTitle.innerText = lent[i].ProjectName;
					//警情详情
					// if(lent[i].fire.flag){
						var nodeDL = document.createElement('dl');
						nodeDL.style.color = "#a1a1a1";
						nodeDL.style.margin = 0;
						nodeDL.style.marginTop = "16px";
						var nodeDT = document.createElement('dt');
						nodeDL.appendChild(nodeDT);
						nodeDT.style.color = "#666";
						nodeDT.style.fontFamily = "PFzc";
						nodeDT.innerText = '火灾自动报警系统';
						nodeDT.style.marginBottom = "8px";
						for (const key in lent[i].warningSystem) {
							var nodeDD = document.createElement('dd');
							nodeDD.style.display = "inline-block";
							nodeDD.style.marginLeft = 0;
							nodeDD.style.marginRight = "20px";
							let keyText = '';
							switch(key){
								case 'fireCount':
									keyText = '火警';
									break;
								case 'troubleCount':
									keyText = '故障';
									break;
								case 'startCount':
									keyText = '启动';
									break;
								case 'feedBackCount':
									keyText = '反馈';
									break;
							}
							nodeDD.appendChild(document.createTextNode(keyText+":"));
							var nodeDDSpanColor = '';
							switch(key){
								case 'fireCount':
									nodeDDSpanColor = '#fe3939';
									break;
								case 'troubleCount':
									nodeDDSpanColor = '#fe8a27';
									break;
								case 'startCount':
									nodeDDSpanColor = '#2dcdcf';
									break;
								case 'feedBackCount':
									nodeDDSpanColor = '#29ca74';
									break;
							}
							var nodeDDSpan = document.createElement('span');
							nodeDDSpan.style.color = nodeDDSpanColor;
							nodeDDSpan.innerText = lent[i].warningSystem[key];
							nodeDD.appendChild(nodeDDSpan);
							nodeDL.appendChild(nodeDD);
						}
					// }
	//水压水位详情
					// if(lent[i].water.flag){
						var nodewaterDL = document.createElement('dl');
						nodewaterDL.style.color = "#a1a1a1";
						nodewaterDL.style.margin = 0;
						nodewaterDL.style.marginTop = "16px";
						var nodewaterDT = document.createElement('dt');
						nodewaterDL.appendChild(nodewaterDT);
						nodewaterDT.style.color = "#666";
						nodewaterDT.style.fontFamily = "PFzc";
						nodewaterDT.innerText = '水系统';
						nodewaterDT.style.marginBottom = "8px";
						for (const key in lent[i].waterSystem) {
							var nodewaterDD = document.createElement('dd');
							nodewaterDD.style.display = "inline-block";
							nodewaterDD.style.marginLeft = 0;
							nodewaterDD.style.marginRight = "20px";
							let keyText = '';
							switch(key){
								case 'waterFireCount':
									keyText = '报警';
									break;
								case 'waterTroubleCount':
									keyText = '故障';
									break;
							}
							nodewaterDD.appendChild(document.createTextNode(keyText+":"));
							var nodewaterDDSpanColor = '';
							switch(key){
								case 'waterFireCount':
									nodewaterDDSpanColor = '#fe3939';
									break;
								case 'waterTroubleCount':
									nodewaterDDSpanColor = '#fe8a27';
									break;
							}
							var nodewaterDDSpan = document.createElement('span');
							nodewaterDDSpan.style.color = nodewaterDDSpanColor;
							nodewaterDDSpan.innerText = lent[i].waterSystem[key];
							nodewaterDD.appendChild(nodewaterDDSpan);
							nodewaterDL.appendChild(nodewaterDD);
						}
						var mapSelectIcon = document.createElement('img');
						mapSelectIcon.src = require("../../assets/images/Controller/mapSelectIcon.png");
						mapSelectIcon.style.position = 'absolute';
						mapSelectIcon.style.right = "20px";
						mapSelectIcon.style.top = "12px";
						mapSelectIcon.dataset.Lltude = lent[i].Lltude;
						mapSelectIcon.addEventListener('click',function(e){
							console.log(this.dataset.Lltude);
							let clickLltude = this.dataset.Lltude.split(',');
							map.panTo(new BMap.Point(clickLltude[0],clickLltude[1]));
							map.setZoom(18);
						});
						var mapunfoldIcon = document.createElement('div');
						mapunfoldIcon.innerText = '查看详情 >>';
						mapunfoldIcon.style.fontFamily = "PFz";
						mapunfoldIcon.style.fontSize = "12px";
						mapunfoldIcon.style.color = "#318CD9";
						mapunfoldIcon.style.position = 'absolute';
						mapunfoldIcon.style.width = "70px";
						mapunfoldIcon.style.height = "20px";
						mapunfoldIcon.style.right = "20px";
						mapunfoldIcon.style.bottom = "12px";
						mapunfoldIcon.dataset.id = lent[i].ID;;
						mapunfoldIcon.addEventListener('click',function(event){
							_that.$router.push({
								path: '/Search',
								name: 'Search',
								params: {
									projectId: event.target.dataset.id
								}
							})
						});
						div.appendChild(nodeEles);
						nodeEles.appendChild(nodeTitle);
						nodeEles.appendChild(nodeDL);
						nodeEles.appendChild(nodewaterDL);
						nodeEles.appendChild(mapSelectIcon);
						nodeEles.appendChild(mapunfoldIcon);
					}
				// 添加文字说明
				// div.appendChild(document.createTextNode(lent));
				// 设置样式
				div.style.cursor = "pointer";
				div.style.backgroundColor = "white";
				div.style.width = "380px";
				div.style.height = "623px";
				div.style.backgroundColor = "rgba(255,255,255,.7)";
				div.style.borderRadius = "10px";
				map.enableScrollWheelZoom(true);
				map.addEventListener("click",function(e){
					// alert(e.point.lng + "," + e.point.lat);
					map.setZoom(18);
				});
				//map topRight 
				var topRightDiv = document.createElement('div');
				topRightDiv.style.width = "366px";
				topRightDiv.style.minHeight = "200px";
				topRightDiv.style.backgroundColor = "rgba(255,255,255,.7)";
				topRightDiv.style.position = 'absolute';
				topRightDiv.style.right = "24px";
				topRightDiv.style.top = "125px";
				topRightDiv.style.paddingBottom = "30px";
				topRightDiv.style.borderRadius = "5px";
				topRightDiv.addEventListener('click',function(){
					// document.getElementById('navContsNum').innerText = 100;
				});
//增加总数显示
				var topRightNavConts = document.createElement('div');
				topRightNavConts.style.margin = "0 auto";
				topRightNavConts.style.width = "318px";
				topRightNavConts.style.height = "40px";
				topRightNavConts.style.textAlign = "center";
				topRightNavConts.style.lineHeight = "40px";
				topRightNavConts.style.marginTop = "20px";
				topRightNavConts.style.marginBottom = "20px";
				topRightNavConts.style.backgroundColor = "#ffffff";
				topRightNavConts.style.fontSize = "14px";
				topRightNavConts.style.color = "#333";
				topRightNavConts.style.fontFamily = 'PFz';
				topRightNavConts.innerHTML = "火警故障事件<span id='navContsNum'>"+_that.mapCompanyList.totalNum+"</span>条";
				//增加公司事件列表
				var topRightDivOl = document.createElement('ol');
				topRightDivOl.style.paddingLeft = 0;
				topRightDivOl.style.cursor = "pointer";
				topRightDivOl.style.maxHeight = "300px";
				topRightDivOl.style.overflow = "auto";
				topRightDivOl.style.width = "318px";
				topRightDivOl.style.margin = "0 auto";
				for(var oli=0;oli<lent.length;oli++){
					for(var oliwarn in lent[oli].warningSystem){
						if(lent[oli].warningSystem[oliwarn]>0){
							var clickEventType = 0;
							var topRightDivOlli = document.createElement("li");
							topRightDivOlli.style.listStyleType = "none";
							if(oliwarn=='fireCount'){
								clickEventType = 1;
								topRightDivOlli.innerHTML = "<img src='"+require('../../assets/images/Controller/controllerFire.png')+"'  style='margin-right:10px;margin-left:10px;'/>报警系统："+lent[oli].ProjectName+"有火警"+lent[oli].warningSystem[oliwarn]+"条";
							}
							if(oliwarn=='feedBackCount'){
								clickEventType = 3;
								topRightDivOlli.innerHTML = "<img src='"+require('../../assets/images/Controller/controllerTrouble.png')+"'  style='margin-right:10px;margin-left:10px;'/>报警系统："+lent[oli].ProjectName+"有反馈"+lent[oli].warningSystem[oliwarn]+"条";
							}
							if(oliwarn=='startCount'){
								clickEventType = 4;
								topRightDivOlli.innerHTML = "<img src='"+require('../../assets/images/Controller/controllerTrouble.png')+"'  style='margin-right:10px;margin-left:10px;'/>报警系统："+lent[oli].ProjectName+"有启动"+lent[oli].warningSystem[oliwarn]+"条";
							}
							if(oliwarn=='troubleCount'){
								clickEventType = 2;
								topRightDivOlli.innerHTML = "<img src='"+require('../../assets/images/Controller/controllerTrouble.png')+"'  style='margin-right:10px;margin-left:10px;'/>报警系统："+lent[oli].ProjectName+"有火警"+lent[oli].warningSystem[oliwarn]+"条";
							}
							topRightDivOlli.style.color = "#666";
							topRightDivOlli.style.fontFamily = "PFz";
							topRightDivOlli.style.fontSize = "12px";
							topRightDivOlli.style.height = "40px";
							topRightDivOlli.style.lineHeight = "40px";
							topRightDivOlli.style.backgroundColor = "#fff";
							topRightDivOlli.style.borderRadius = "5px";
							topRightDivOlli.style.marginBottom = '20px';
							topRightDivOlli.dataset.eventID = lent[oli].ID;
							topRightDivOlli.dataset.clickEventType = clickEventType;
							topRightDivOlli.dataset.eventCount = lent[oli].warningSystem[oliwarn];
							topRightDivOlli.addEventListener('click',function(even){
								let _this = this;
								let companyId = sessionStorage.getItem('companyId');
								let projectId = even.target.dataset.eventID;
								let type = even.target.dataset.clickEventType;
								let eventCount = even.target.dataset.eventCount;
								axios.get('http://test.mhfire.cn/mhApi/Project/getMapEventDetail',{
								// 参数1：token(用户登录token)，string类型，必填
								// 参数2：companyId(公司ID)，int类型，必填
								// 参数3：projectId(项目ID)，int类型，必填
								// 参数3：type(事件类型)1火警，2故障，3反馈，4启动，int类型，必填
									params: {
										token: document.querySelector('#token').innerText,
										companyId: companyId,
										projectId: projectId,
										type: type
									}
								})
								.then(function(response){
									console.log(response.data.data);
									_that.mapEventDetail = response.data.data;
									console.log('##############');
									console.log(_that.mapEventDetail);
									document.querySelector('#alertCurrentNum').innerText = 1;
									document.querySelector('#topRightAlertTopRightContRight').innerText = _that.mapEventDetail.eventInfo.length;
									document.getElementById('devideName').innerText = _that.mapEventDetail.eventInfo[0].Order;
									document.querySelector('#projectMember').innerText = _that.mapEventDetail.UserName;
									document.querySelector('#projectTel').innerText = _that.mapEventDetail.UserPhone;
									document.querySelector('#projectAddress').innerText = _that.mapEventDetail.AddressDetail;
								})
								.catch(function(error){
										console.log(error);
								})
								document.querySelector('#topRightAlert').style.display = 'block';
							});
							topRightDivOl.appendChild(topRightDivOlli);
						}
					}
					for(var oliwater in lent[oli].waterSystem){
						if(lent[oli].waterSystem[oliwater]>0){
							var clickEventType = 0;
							var topRightDivOlli = document.createElement("li");
							topRightDivOlli.style.listStyleType = "none";
							if(oliwater=='waterFireCount'){
								topRightDivOlli.innerHTML = "<img src='"+require('../../assets/images/Controller/controllerTrouble.png')+"'  style='margin-right:10px;margin-left:10px;'/>水系统："+lent[oli].ProjectName+"有水压/水位报警"+lent[oli].warningSystem[oliwater].fireCount+"条";
							}
							if(oliwater=='waterTroubleCount'){
								topRightDivOlli.innerHTML = "<img src='"+require('../../assets/images/Controller/controllerTrouble.png')+"' style='margin-right:10px;margin-left:10px;'/>水系统："+lent[oli].ProjectName+"有水压/水位故障"+lent[oli].warningSystem[oliwater].fireCount+"条";
							}
							topRightDivOlli.style.color = "#666";
							topRightDivOlli.style.fontFamily = "PFz";
							topRightDivOlli.style.fontSize = "12px";
							topRightDivOlli.style.height = "40px";
							topRightDivOlli.style.lineHeight = "40px";
							topRightDivOlli.style.backgroundColor = "#fff";
							topRightDivOlli.style.borderRadius = "5px";
							topRightDivOlli.dataset.eventID = lent[oli].ID;
							topRightDivOlli.dataset.clickEventType = clickEventType;
							topRightDivOlli.addEventListener('click',function(even){
								let companyId = sessionStorage.getItem('companyId');
								let projectId = even.target.dataset.eventID;
								let type = even.target.dataset.clickEventType;
								let eventCount = even.target.dataset.eventCount;
								axios.get('http://test.mhfire.cn/mhApi/Project/getMapEventDetail',{
								// 参数1：token(用户登录token)，string类型，必填
								// 参数2：companyId(公司ID)，int类型，必填
								// 参数3：projectId(项目ID)，int类型，必填
								// 参数3：type(事件类型)1火警，2故障，3反馈，4启动，int类型，必填
									params: {
										token: document.querySelector('#token').innerText,
										companyId: companyId,
										projectId: projectId,
										type: type
									}
								})
								.then(function(response){
									console.log(response.data.data);
									_that.mapEventDetail = response.data.data;
									console.log('##############');
									console.log(_that.mapEventDetail);
									document.querySelector('#alertCurrentNum').innerText = 1;
									document.querySelector('#topRightAlertTopRightContRight').innerText = _that.mapEventDetail.eventInfo.length;
									document.getElementById('devideName').innerText = _that.mapEventDetail.eventInfo[0].Order;
									document.querySelector('#projectMember').innerText = _that.mapEventDetail.UserName;
									document.querySelector('#projectTel').innerText = _that.mapEventDetail.UserPhone;
									document.querySelector('#projectAddress').innerText = _that.mapEventDetail.AddressDetail;
								})
								.catch(function(error){
										console.log(error);
								})
								document.querySelector('#topRightAlert').style.display = 'block';
							});
							topRightDivOl.appendChild(topRightDivOlli);
						}
					}
				}
				topRightDiv.appendChild(topRightNavConts);
				topRightDiv.appendChild(topRightDivOl);
				var topRightAlert = document.createElement('div');
				topRightAlert.id = 'topRightAlert';
				topRightAlert.style.width = "318px";
				topRightAlert.style.height = "196px";
				topRightAlert.style.borderRadius = "5px";
				topRightAlert.style.backgroundColor = "rgba(255,255,255,.8)";
				topRightAlert.style.position = 'absolute';
				topRightAlert.style.right = "405px";
				topRightAlert.style.top = "168px";
				topRightAlert.style.display = 'none';
				var topRightAlertTopRight = document.createElement('div');
				topRightAlertTopRight.style.width = "85px";
				topRightAlertTopRight.style.height = "10px";
				topRightAlertTopRight.style.lineHeight = "10px";
				topRightAlertTopRight.style.position = "absolute";
				topRightAlertTopRight.style.right = 0;
				topRightAlertTopRight.style.top = "30px";
				var topRightAlertOl = document.createElement('ol');
				topRightAlertOl.style.listStyle = 'none';
				topRightAlertOl.innerHTML = "<li style='margin-top:30px;font-size:14px;color:"+"#333"+"font-family:"+"PFz"+"'>报警设备：<span id='devideName' style='color:"+"#666"+"'>aadaa</span></li><li style='margin-top:20px;font-size:14px;color:"+"#333"+"font-family:"+"PFz"+"'>项目负责人：<span id='projectMember' style='color:"+"#666"+"'></span></li><li style='margin-top:20px;font-size:14px;color:"+"#333"+"font-family:"+"PFz"+"'>负责人电话：<span id='projectTel' style='color:"+"#666"+"'></span></li><li style='margin-top:20px;font-size:14px;color:"+"#333"+"font-family:"+"PFz"+"'>项目地址：<span id='projectAddress' style='color:"+"#666"+"'></span></li>";
				var topRightAlertTopRightImgLeft = document.createElement('img');
				topRightAlertTopRightImgLeft.id = "topRightAlertTopRightImgLeft";
				topRightAlertTopRightImgLeft.src = require("../../assets/images/Controller/mark.png");
				topRightAlertTopRightImgLeft.style.cursor = "pointer";
				topRightAlertTopRightImgLeft.style.height = '5px';
				topRightAlertTopRightImgLeft.style.transform = "rotate(90deg)";
				topRightAlertTopRightImgLeft.addEventListener('click',function(){
					let eventInfoCount = _that.mapEventDetail.eventInfo.length;
					let alertCurrentNum = document.getElementById('alertCurrentNum').innerText;
					if(alertCurrentNum>1){
						alertCurrentNum--;
						document.getElementById('alertCurrentNum').innerText = alertCurrentNum;
						document.getElementById('devideName').innerText = _that.mapEventDetail.eventInfo[--alertCurrentNum].Order;
					}
				});
				topRightAlertTopRight.appendChild(topRightAlertTopRightImgLeft);
				var topRightAlertTopRightCont = document.createElement('div');
				topRightAlertTopRightCont.style.backgroundColor = "rgba(255,255,255,.7)";
				topRightAlertTopRightCont.style.fontFamily = "PFz";
				topRightAlertTopRightCont.style.fontSize = "12px";
				topRightAlertTopRightCont.style.width = '35px';
				topRightAlertTopRightCont.style.textAlign = "center";
				topRightAlertTopRightCont.style.display = 'inline-block';
				var topRightAlertTopRightContLeft = document.createElement('span');
				topRightAlertTopRightContLeft.id = 'alertCurrentNum';
				topRightAlertTopRightContLeft.innerText = '1';
				var topRightAlertTopRightConts = document.createElement('span');
				topRightAlertTopRightConts.id = 'topRightAlertTopRightConts';
				topRightAlertTopRightConts.innerText = '/';
				var topRightAlertTopRightContRight = document.createElement('span');
				topRightAlertTopRightContRight.id = "topRightAlertTopRightContRight";
				topRightAlertTopRightContRight.innerText = '3';
				topRightAlertTopRightCont.appendChild(topRightAlertTopRightContLeft);
				topRightAlertTopRightCont.appendChild(topRightAlertTopRightConts);
				topRightAlertTopRightCont.appendChild(topRightAlertTopRightContRight);
				topRightAlertTopRight.appendChild(topRightAlertTopRightCont);
				var topRightAlertTopRightImgRight = document.createElement('img');
				topRightAlertTopRightImgRight.id = "topRightAlertTopRightImgRight";
				topRightAlertTopRightImgRight.style.cursor = 'pointer';
				topRightAlertTopRightImgRight.src = require("../../assets/images/Controller/mark.png");
				topRightAlertTopRightImgRight.style.height = '5px';
				topRightAlertTopRightImgRight.style.transform = "rotate(-90deg)";
				topRightAlertTopRightImgRight.addEventListener('click',function(){
					let eventInfoCount = _that.mapEventDetail.eventInfo.length;
					let alertCurrentNum = document.getElementById('alertCurrentNum').innerText;
					if(alertCurrentNum<eventInfoCount){
						alertCurrentNum++;
						document.getElementById('alertCurrentNum').innerText = alertCurrentNum;
						document.getElementById('devideName').innerText = _that.mapEventDetail.eventInfo[--alertCurrentNum].Order;
					}
				});
				topRightAlertTopRight.appendChild(topRightAlertTopRightImgRight);
				topRightAlert.appendChild(topRightAlertOl);
				topRightAlert.appendChild(topRightAlertTopRight);
				// 添加DOM元素到地图中
				map.getContainer().appendChild(div);
				map.getContainer().appendChild(topRightDiv);
				map.getContainer().appendChild(topRightAlert);
				// 将DOM元素返回
				return div;
				//单击获取点击的经纬度
			}
			// 创建控件
			var myZoomCtrl = new ZoomControl();
			// 添加到地图当中
			map.addControl(myZoomCtrl);
			},2000);
		}
	}
}
</script>

<style>
.bm-view {
width: 100%;
height: 100%;
}
</style>
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
