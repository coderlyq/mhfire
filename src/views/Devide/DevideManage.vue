<!--  -->
<template>
	<div class='devideManage'>
		<el-container class="devideCont">
			<el-header class="devideContTop">
				<div class="devideLeft">物联设备管理</div>
				<div class="devideRight"  @compositionend="checkDevideList">
					<el-input placeholder="通过设备名称/地址/IMEI查找设备" v-model="inputDevideCheck" suffix-icon="el-icon-search">
						<!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
					</el-input>
					<el-button type="primary">新增设备<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
				</div>
			</el-header>
			<el-main></el-main>
		</el-container>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
	name: "DevideManage",
	//import引入的组件需要注入到对象中才能使用
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

</style>