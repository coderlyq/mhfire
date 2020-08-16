<template>
	<baidu-map class="bm-view" id="allmap">
	</baidu-map>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=bISSwqQz3RZ8jQI6KcMGO4DcUb0zKcjm" ></script>
<script>
export default {
	name: 'map',
	mounted () {
		this.baiduMap()
	},
	methods: {
		// 返回
		goback () {
			this.$router.go(-1)
		},
		baiduMap () {
			var map = new BMap.Map('allmap')
			var point = new BMap.Point(111.742579, 40.818675)
			map.centerAndZoom(point, 12)
			var marker = new BMap.Marker(point) // 创建标注
			map.addOverlay(marker)    // 将标注添加到地图中
		}
	}
}
</script>

<style>
.bm-view {
width: 100%;
height: 300px;
}
</style>