<!--  -->
<template>
	<div class='devideManage'>
		<el-container class="devideCont">
			<el-header class="devideContTop">
				<div class="devideLeft">物联设备管理</div>
				<div class="devideRight"  @compositionend="checkDevideList">
					<el-input placeholder="通过设备名称/地址/IMEI查找设备" v-model="inputDevideCheck">
						<!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
					</el-input>
					<el-button type="primary" @click="addTab()">新增设备<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
				</div>
			</el-header>
			<el-main class="devideInfos">
				<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
					<el-tab-pane
						v-for="item in editableTabs"
						:key="item.name"
						:label="item.title"
						:name="item.name"
					>
						{{item.content}}
					</el-tab-pane>
				</el-tabs>
			</el-main>
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
			editableTabsValue: '2',
			editableTabs: [{
				title: 'Tab 1',
				name: '1',
				content: 'Tab 1 content'
			}, {
				title: 'Tab 2',
				name: '2',
				content: 'Tab 2 content'
			}],
			tabIndex: 2
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
		addTab() {
			this.$prompt('请输入邮箱', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(({ value }) => {
				this.$message({
					type: 'success',
					message: '你的邮箱是: ' + value
				});
				this.addTabIndex(value);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});       
			});
		},
		addTabIndex(value) {
			let newTabName = ++this.tabIndex + '';
			this.editableTabs.push({
				title: value,
				name: newTabName,
				content: 'New Tab content'
			});
			this.editableTabsValue = newTabName;
			console.log(value);
		},
		removeTab(targetName) {
			let tabs = this.editableTabs;
			let activeName = this.editableTabsValue;
			console.log(activeName);
			console.log(targetName);
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
						}
					}
				});
			}
			this.editableTabsValue = activeName;
			this.editableTabs = tabs.filter(tab => tab.name !== targetName);
		},
		checkDevideList(){
			console.log('checkDevideList');
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
	.devideManage{
		background-color: #f2f4fa;
		width: 100%;
		height: 100%;
	}
	.devideManage .devideCont{
		width: 100%;
		height: 100%;
	}
	.devideManage .devideContTop{
		height: 60px;
		line-height: 60px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideManage .devideRight{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		font-size: 12px;
	}
	.devideManage .devideRight .el-input input{
		width: 270px;
		height: 30px;
		padding: 0;
		background: url('~@/assets/images/DevideManage/searchIcon.png') 244px center no-repeat;
		text-indent: 10px;
	}
	.devideManage .devideRight .el-button{
		width: 106px;
		height: 30px;
		line-height: 30px;
		padding: 0;
		font-size: 12px;
	}
	.devideManage .devideInfos{
		background-color: #ffffff;
		width: 97%;
		height: 97%;
		margin: 20px;
		border-radius: 10px;
	}
</style>