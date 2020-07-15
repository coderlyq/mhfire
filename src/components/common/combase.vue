<!--  -->
<template>
<div class=''>

	<el-container>
		<el-header style="height: 6.45vh;line-height: 6.45vh;"><TopBar /></el-header>
		<el-container>
			<el-aside style="width: 220px;background-color: #081d61;height: 93.55vh;"><SideBar/></el-aside>
			<el-main style="height: 93.55vh;padding:0;"><router-view></router-view></el-main>
		</el-container>
	</el-container>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TopBar from '@/views/TopBar/TopBar.vue'
import SideBar from '@/views/SideBar/SideBar.vue'

export default {
//import引入的组件需要注入到对象中才能使用
name: 'ComBase',
components: {
	TopBar,
	SideBar
},
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

}
}
</script>
<style>
	@font-face{
     font-family: 'PF'; 
     src:url('~@/assets/font/苹方黑体-极细-简.ttf') format('truetype');
	}
	.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
		background-color: #081d61;
		font-family: "PF";
		font-weight: bold;
		font-size: 16px;
	}
</style>