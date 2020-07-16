<!--  -->
<template>
	<div class='personImg'>
		<slot name="personitemImg"></slot>
		<dl>
			<dt></dt>
			<dd><slot name="personitemName"></slot></dd>
			<dd style="margin-top:10px;"><slot name="personitemTel"></slot></dd>
		</dl>
		<div class="personitemMark" :style="{backgroundColor:personMarkColor}">
			<slot name="personitemMark"></slot>
		</div>
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
		personMarkColor:"#5cc997"
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
.personImg{
	width: 328px;
	box-sizing: border-box;
	height: 110px;
	margin: 0 auto;
	margin-top: 20px;
	box-shadow: 0 0 15px #cccccc;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	/* font-family: "微软雅黑"; */
	font-size: 14px;
	color: #666666;
}
.personImg .personitemMark{
	position: absolute;
	top: 0;
	right: 0;
	width: 100px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	border-top-right-radius: 5px;
	border-bottom-left-radius: 15px;
	color: #ffffff;
	font-size: 12px;
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