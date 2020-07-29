<!--  -->
<template>
<div id='logotext'>
	<img src="~@/assets/images/TopBar/logo.png" alt="">
	<span style="font-size:18px;font-weight:bold;margin-left:15px;padding-right:24px;">FCLOUD门海消防云平台</span><span id="topbarpre"></span>
	<span v-if="issuper">奇勤达科技发展有限公司</span>
	<ol v-else id="logoList">
		<li v-for="(item,index) in logoList" @click="topclick(index)" :key="item.name" :class="{clickBackColor:index===currendIndex}">
			{{item.name}} <span v-show="item.isshow">({{item.cont}})</span>
		</li>
		<!-- <li @click="topclick()">所有公司(10)</li>
		<li @click="topclick()">监控控制台(10)</li>
		<li @click="topclick()">认证申请(10)</li>
		<li @click="topclick()">二级超管设置</li> -->
	</ol>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
name: 'LogoText',
components: {},
data() {
	//这里存放数据
	return {
		currendIndex: 0,
		issuper: false,
		logoList:[{
			name: '所有公司',
			path: '/AllProject',
			cont: 0,
			isshow:true
		},{
			name: '监控控制台',
			path: '/ProjectPerson',
			cont: 0,
			isshow:true
		},{
			name: '认证申请',
			path: '/Attestation',
			cont: 0,
			isshow:true
		},{
			name: '二级超管设置',
			path: '/SupperManager',
			cont: 0,
			isshow:false
		}]
	};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
	topclick(index) {
		this.currendIndex = index;
		this.$router.push(this.logoList[index].path)
		console.log(index);
	}
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
#logotext{
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center
}
#logotext img{
	width: 41px;
	height: 36px;
}
#logoList{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	list-style-type: none;
	padding-left: 0;
}
#logoList li{
	width: 141px;
	height: 70px;
}
#logoList li:hover{
	background-color: #1c4ded;
	cursor: pointer;
}
.clickBackColor{
	background-color: #1c4ded;
}
#topbarpre{
 margin-right:23px;
 display:inline-block;
 width:2px;
 height:30px;
 background-color:#fff;
}
</style>