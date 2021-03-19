<!--  -->
<template>
  <div>
		<div class="siderBarTop">
			<el-menu-item path="/List">
				<img slot="item-icon" src="~@/assets/images/TopBar/list.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/listed.png" alt="">
				<span slot="item-text">项目管理</span>
			</el-menu-item>
			<el-menu-item path="/Control">
				<img slot="item-icon" src="~@/assets/images/TopBar/control.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/controled.png" alt="">
				<span slot="item-text">监控控制台</span>
			</el-menu-item>
			<el-menu-item path="/Person">
				<img slot="item-icon" src="~@/assets/images/TopBar/person.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/personed.png" alt="">
				<span slot="item-text">公司人员管理</span>
			</el-menu-item>
			<el-menu-item path="/Search">
				<img slot="item-icon" src="~@/assets/images/TopBar/search.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/searched.png" alt="">
				<span slot="item-text">事件历史查询</span>
			</el-menu-item>
			<el-menu-item path="/Check">
				<img slot="item-icon" src="~@/assets/images/TopBar/check.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/checked.png" alt="">
				<span slot="item-text">员工申请审核 <span v-if="checkCount!=0">({{checkCount}})</span></span>
			</el-menu-item>
		</div>
		<div class="siderBarBottom" style="display:none;">
			<el-menu-item path="/ProjectList">
				<img slot="item-icon" src="~@/assets/images/SiderBar/listdefault.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/SiderBar/listchecked.png" alt="">
				<span slot="item-text">项目信息管理</span>
			</el-menu-item>
			<el-menu-item path="/ProjectControl">
				<img slot="item-icon" src="~@/assets/images/SiderBar/settingdefault.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/SiderBar/settingChecked.png" alt="">
				<span slot="item-text">项目功能管理</span>
			</el-menu-item>
			<el-menu-item path="/ProjectPerson">
				<img slot="item-icon" src="~@/assets/images/TopBar/person.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/personed.png" alt="">
				<span slot="item-text">项目人员管理</span>
			</el-menu-item>
			<el-menu-item path="/DevideManage">
				<img slot="item-icon" src="~@/assets/images/TopBar/devide.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/devideed.png" alt="">
				<span slot="item-text">物联设备管理</span>
			</el-menu-item>
			<el-menu-item path="/Search">
				<img slot="item-icon" src="~@/assets/images/TopBar/search.png" alt="">
				<img slot="item-icon-active" src="~@/assets/images/TopBar/searched.png" alt="">
				<span slot="item-text">事件历史查询</span>
			</el-menu-item>
		</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ElMenuItem from '@/views/SideBar/ElMenuItem.vue'
// 引入axios
import axios from 'axios'
export default {
	//import引入的组件需要注入到对象中才能使用
	name: 'SideBar',
	components: {
		ElMenuItem
	},
	data() {
		//这里存放数据
		return {
			isProject: false,
			checkCount: 0
		};
	},
	//方法集合
	methods: {
	},
	created(){
		let _this = this;
		let token = document.querySelector('#token').innerText;
		axios.get('http://test.mhfire.cn/mhApi/Member/checkMemberNum',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司ID)，int类型，必填
			params: {
				token: token,
				companyId: sessionStorage.getItem('companyId')
			}
		})
		.then(function(response){
			if(response.data.ret_code==0){
				_this.$message({
					type: 'success',
					message: '解绑成功'
				});
				_this.checkCount = response.data.data.count;
			}else{
				_this.$message({
					type: 'info',
					message: response.data.message
				});
			}
		})
		.catch(function(error){
				console.log(error);
		})
	}
}
</script>
<style>
.el-menu-item{
		text-align: left;
		color: #4159a6;
	}
.el-menu-item:hover{
	background-color:"#1c4ded"!important;
}
.el-menu-item span{
	margin-left: 10px;
}
</style>