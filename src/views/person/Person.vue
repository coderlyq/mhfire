<template>
	<el-container id="person" style="height: 93.55vh;">
		<el-aside style="width:374px;padding:0;background-color:#ffffff;">
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemMark">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemName">jkhi</span>
			</PersonItem>
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemMark">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemName">jkhi</span>
			</PersonItem>
			<PersonItem>
				<img src="~@/assets/images/Person/bigicon.png" slot="personitemImg">
				<span slot="personitemMark">姓名：123</span>
				<span slot="personitemTel">电话：123456789</span>
				<span slot="personitemName">jkhi</span>
			</PersonItem>
		</el-aside>
		<el-main style="padding:0;">Main</el-main>
	</el-container>
</template>

<script>
	import PersonItem from '@/views/person/PersonItem.vue'
  export default {
		name: "Person",
		components: {
			PersonItem
		},
  }
</script>

<style>
</style>
