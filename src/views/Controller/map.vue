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
				name:'aaa'
				},{
					id:'2',
					name: 'bbb'
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
				var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
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
				// 创建一个DOM元素
				var div = document.createElement("div");
				for(var i = 0;i<lent.length;i++){
					var node = document.createElement("div");
					node.innerText = lent[i].name;
					div.appendChild(node);
				}
				var inputSearch = document.createElement("input");
				inputSearch.style.backgroundImage = "url("+require("../../assets/images/Controller/inputSearch.png")+")";
				div.appendChild(inputSearch);
				// 添加文字说明
				// div.appendChild(document.createTextNode(lent));
				// 设置样式
				div.style.cursor = "pointer";
				div.style.backgroundColor = "white";
				div.style.width = "380px";
				div.style.height = "623px";
				div.style.backgroundColor = "rgba(255,255,255,.5)";
				div.style.borderRadius = "10px";
				// 绑定事件,点击一次放大两级
				div.onclick = function(e){
				map.setZoom(map.getZoom() + 2);
				}
				// 添加DOM元素到地图中
				map.getContainer().appendChild(div);
				// 将DOM元素返回
				return div;
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