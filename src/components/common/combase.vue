<!--  -->
<template>
<div class=''>

	<el-container>
		<el-header style="height:70px;line-height:70px;"><TopBar /></el-header>
		<el-container style="min-height:939px;">
			<el-aside style="width:220px;min-height:939px;" ><SideBar style="width:220px;min-height:939px;" /></el-aside>
			<el-main></el-main>
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
	.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
		height: 70px;
		line-height: 70px;
	}
  .el-aside {
    background-color: #081d61;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
		height: 100vh;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>