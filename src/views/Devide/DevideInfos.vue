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
						<div class="devideInfosMainBottom"></div>
						<div class="devideInfosMainBottom"></div>
					</div>
					<div class="devideInfosMainBottomRight">
						<div class="devideInfosMainBottom"></div>
						<div class="devideInfosMainBottom"></div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
		height: 100%;
	}
	.devideInfos .devideInfosCont{
		width: 100%;
		height: 100%;
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
</style>