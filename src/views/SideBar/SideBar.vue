<!--  -->
<template>

  <el-col :span="12">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#081d61"
      text-color="#4159a6"
      active-text-color="#fff">
      <el-menu-item index="1" @click="switchImg('list')" :class="{activeColor:activelist}">
        <img src="~@/assets/images/TopBar/list.png" alt="" v-show="listimgshow">
				<img src="~@/assets/images/TopBar/listed.png" alt="" v-show="listimgedshow">
        <span solt="title">项目列表</span>
      </el-menu-item>
			<el-menu-item index="2" @click="switchImg('control')" :class="{activeColor:activecontrol}">
        <img src="~@/assets/images/TopBar/control.png" alt="" v-show="controlimgshow">
				<img src="~@/assets/images/TopBar/controled.png" alt="" v-show="controlimgedshow">
        <span solt="jiankong">监控控制台</span>
      </el-menu-item>
			<el-menu-item index="3" @click="switchImg('person')" :class="{activeColor:activeperson}">
        <img src="~@/assets/images/TopBar/person.png" alt="" v-show="personimgshow">
				<img src="~@/assets/images/TopBar/personed.png" alt="" v-show="personimgedshow">
        <span solt="element">公司人员管理</span>
      </el-menu-item>
			<el-menu-item index="4" @click="switchImg('search')" :class="{activeColor:activesearch}">
        <img src="~@/assets/images/TopBar/search.png" alt="" v-show="searchimgshow">
				<img src="~@/assets/images/TopBar/searched.png" alt="" v-show="searchimgedshow">
        <span solt="event">事件历史查询</span>
      </el-menu-item>
			<el-menu-item index="5" @click="switchImg('check')" :class="{activeColor:activecheck}">
        <img src="~@/assets/images/TopBar/check.png" alt="" v-show="checkimgshow">
				<img src="~@/assets/images/TopBar/checked.png" alt="" v-show="checkimgedshow">
        <span solt="check">员工申请审核 (<span></span>)</span>
      </el-menu-item>
    </el-menu>
  </el-col>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
	//import引入的组件需要注入到对象中才能使用
	name: 'SideBar',
	components: {},
	data() {
		//这里存放数据
		return {
			activeColor: 'activeColor',
			activelist: true,
			activecontrol: false,
			activeperson: false,
			activesearch: false,
			activecheck: false,
			listimgshow:false,
			listimgedshow:true,
			controlimgshow:true,
			controlimgedshow:false,
			personimgshow:true,
			personimgedshow:false,
			searchimgshow:true,
			searchimgedshow:false,
			checkimgshow:true,
			checkimgedshow:false
		};
	},
	//方法集合
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		switchImg(index){
			this.listimgshow = true;this.controlimgshow = true;this.personimgshow = true;this.searchimgshow = true;this.checkimgshow = true;
			this.listimgedshow = false;this.controlimgedshow = false;this.personimgedshow = false;this.searchimgedshow = false;this.checkimgedshow = false;
			this.activelist = false;this.activecontrol = false;this.activeperson = false;this.activesearch = false;this.activecheck = false;
			switch(index){
				case 'list':
					this.listimgshow = !this.listimgshow;
					this.listimgedshow = !this.listimgedshow;
					this.activelist = true;
				break;
				case 'control':
					this.controlimgshow = !this.controlimgshow;
					this.controlimgedshow = !this.controlimgedshow;
					this.activecontrol = true;
				break;
				case 'person':
					this.personimgshow = !this.personimgshow;
					this.personimgedshow = !this.personimgedshow;
					this.activeperson = true;
				break;
				case 'search':
					this.searchimgshow = !this.searchimgshow;
					this.searchimgedshow = !this.searchimgedshow;
					this.activesearch = true;
				break;
				case 'check':
					this.checkimgshow = !this.checkimgshow;
					this.checkimgedshow = !this.checkimgedshow;
					this.activecheck = true;
				break;
			}
		}
	},
}
</script>
<style>
	.el-col{
		background-color: #081d61;
		border-right: #081d61;
	}
	.el-menu{
		border:none;
		color: #4159a6;
	}
	li{
		text-align: left;
	}
	.el-menu .el-menu-item.is-active i{
		color:#fff;
	}
	.activeColor{
		background-color: #1c4ded !important;
	}
</style>