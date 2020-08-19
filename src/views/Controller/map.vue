<template>
	<baidu-map class="bm-view" id="allmap">
	</baidu-map>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=bISSwqQz3RZ8jQI6KcMGO4DcUb0zKcjm" ></script>
<script>
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
			]
		}
	},
	mounted () {
		this.baiduMap()
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
			map.centerAndZoom(new BMap.Point(113.932904,22.589275), 15);
			var data_info = [[113.932904,22.589275,"汇聚创新园"],
							[113.929872,22.581628,"中粮商务公园"],
							[113.931625,22.582769,"华测检测大楼"]
							];
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
			var lent = this.listArr;
			// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
			// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
			ZoomControl.prototype.initialize = function(map){
				// 创建一个DOM  topLeft元素
				var div = document.createElement("div");
				div.style.fontSize = '14px';
				var inputSearch = document.createElement("input");
				inputSearch.style.display = "block";
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
					var nodeEles = document.createElement('div');
					nodeEles.style.position = 'relative';
					nodeEles.dataset.id = lent[i].id;
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
					nodeTitle.innerText = lent[i].name;
					//警情详情
					if(lent[i].fire.flag){
						var nodeDL = document.createElement('dl');
						nodeDL.style.color = "#a1a1a1";
						nodeDL.style.margin = 0;
						nodeDL.style.marginTop = "16px";
						var nodeDT = document.createElement('dt');
						nodeDL.appendChild(nodeDT);
						nodeDT.style.color = "#666";
						nodeDT.style.fontFamily = "PFzc";
						nodeDT.innerText = lent[i].fire.fireName;
						nodeDT.style.marginBottom = "8px";
						for (const key in lent[i].fire.conts) {
							var nodeDD = document.createElement('dd');
							nodeDD.style.display = "inline-block";
							nodeDD.style.marginLeft = 0;
							nodeDD.style.marginRight = "20px";
							nodeDD.appendChild(document.createTextNode(key+":"));
							var nodeDDSpanColor = '';
							switch(key){
								case '火警':
									nodeDDSpanColor = '#fe3939';
									break;
								case '故障':
									nodeDDSpanColor = '#fe8a27';
									break;
								case '启动':
									nodeDDSpanColor = '#2dcdcf';
									break;
								case '反馈':
									nodeDDSpanColor = '#29ca74';
									break;
							}
							var nodeDDSpan = document.createElement('span');
							nodeDDSpan.style.color = nodeDDSpanColor;
							nodeDDSpan.innerText = lent[i].fire.conts[key];
							nodeDD.appendChild(nodeDDSpan);
							nodeDL.appendChild(nodeDD);
						}
					}
//水压水位详情
					if(lent[i].water.flag){
						var nodewaterDL = document.createElement('dl');
						nodewaterDL.style.color = "#a1a1a1";
						nodewaterDL.style.margin = 0;
						nodewaterDL.style.marginTop = "16px";
						var nodewaterDT = document.createElement('dt');
						nodewaterDL.appendChild(nodewaterDT);
						nodewaterDT.style.color = "#666";
						nodewaterDT.style.fontFamily = "PFzc";
						nodewaterDT.innerText = lent[i].water.waterName;
						nodewaterDT.style.marginBottom = "8px";
						for (const key in lent[i].water.conts) {
							var nodewaterDD = document.createElement('dd');
							nodewaterDD.style.display = "inline-block";
							nodewaterDD.style.marginLeft = 0;
							nodewaterDD.style.marginRight = "20px";
							nodewaterDD.appendChild(document.createTextNode(key+":"));
							var nodewaterDDSpanColor = '';
							switch(key){
								case '报警':
									nodewaterDDSpanColor = '#fe3939';
									break;
								case '故障':
									nodewaterDDSpanColor = '#fe8a27';
									break;
							}
							var nodewaterDDSpan = document.createElement('span');
							nodewaterDDSpan.style.color = nodewaterDDSpanColor;
							nodewaterDDSpan.innerText = lent[i].water.conts[key];
							nodewaterDD.appendChild(nodewaterDDSpan);
							nodewaterDL.appendChild(nodewaterDD);
						}
					}
					var mapSelectIcon = document.createElement('img');
					mapSelectIcon.src = require("../../assets/images/Controller/mapSelectIcon.png");
					mapSelectIcon.style.position = 'absolute';
					mapSelectIcon.style.right = "20px";
					mapSelectIcon.style.top = "12px";

					div.appendChild(nodeEles);
					nodeEles.appendChild(nodeTitle);
					nodeEles.appendChild(nodeDL);
					nodeEles.appendChild(nodewaterDL);
					nodeEles.appendChild(mapSelectIcon);
					nodeEles.addEventListener('click',function(e){
						console.log(this.dataset.id);
					});
				}


				// 添加文字说明
				// div.appendChild(document.createTextNode(lent));
				// 设置样式
				div.style.cursor = "pointer";
				div.style.backgroundColor = "white";
				div.style.width = "380px";
				div.style.height = "623px";
				div.style.backgroundColor = "rgba(255,255,255,.5)";
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
				topRightDiv.style.backgroundColor = "rgba(255,255,255,.5)";
				topRightDiv.style.position = 'absolute';
				topRightDiv.style.right = "24px";
				topRightDiv.style.top = "125px";

				var topRightAlert = document.createElement('div');
				topRightAlert.style.width = "358px";
				topRightAlert.style.height = "196px";
				topRightAlert.style.backgroundColor = "rgba(255,255,255,.5)";
				topRightAlert.style.position = 'absolute';
				topRightAlert.style.right = "405px";
				topRightAlert.style.top = "168px";

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