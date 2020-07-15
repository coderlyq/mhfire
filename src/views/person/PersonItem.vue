<!--  -->
<template>
	<div class='personImg'>
		<slot name="personitemImg"></slot>
		<dl>
			<dt></dt>
			<dd><slot name="personitemMark"></slot></dd>
			<dd><slot name="personitemTel"></slot></dd>
		</dl>
		
		
		<slot name="personitemName"></slot>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
	name: 'PersonItem',
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

}
}
</script>
<style>
.personImg{
	width: 328px;
	box-sizing: border-box;
	height: 110px;
	margin: 0 auto;
	margin-top: 20px;
	box-shadow: 0 0 15px #cccccc;
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center
}
.personImg img{
	width: 60px;
	height: 60px;
	border-radius: 60px;
	margin-left: 30px;
}
.personImg dl{
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	/* align-items: flex-start; */
	justify-content: center
}
</style>