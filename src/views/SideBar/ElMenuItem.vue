<!--  -->
<template>
<div class='el-menu-item' @click="itemClick" @mouseover="aaa" :style="activeStyle">
	<span v-if="!isActive"><slot name="item-icon"></slot></span>
	<span v-else><slot name="item-icon-active"></slot></span>
	<span><slot name="item-text"></slot></span>
</div>
</template>

<script>
export default {
	name: "ElMenuItem",
	props: {
      path: String,
			activeColor: {
				type: String,
				default: 'red'
			}
    },
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
	//这里存放数据
	return {

	};
},
//监听属性 类似于data概念
watch: {},
computed: {
	isActive() {
		return this.$route.path.indexOf(this.path) !== -1
	},
	activeStyle() {
		return this.isActive ? {color: "#ffffff",backgroundColor:"#1c4ded"} : {color: "#4159a6"}
	}
},
//方法集合
methods: {

	itemClick() {
		console.log(this.isActive)
		this.$router.replace(this.path)
			
	},
	aaa() {
		console.log(event);
		this.isActive = true
	}
}
}
</script>
<style>
.el-menu-item:hover{
	background-color:"#1c4ded"!important;
}
</style>