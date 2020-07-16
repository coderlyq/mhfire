<template>
  <el-container class="searchCont">
		<el-header class="searchContTop">
			<el-select v-model="value" placeholder="全部项目">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="全部系统">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<el-select v-model="value" placeholder="全部事件类型">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-header>
		<el-main>Main</el-main>
</el-container>
</template>

<script>
  export default {
		name: "Search",
		options: [{
			value: '01',
			label: '项目负责人'
		}, {
			value: '02',
			label: '普通员工'
		}],
  }
</script>

<style scoped>
.searchCont .searchContTop{
	background-color: #ffffff;
}
</style>
