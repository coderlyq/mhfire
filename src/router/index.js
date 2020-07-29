import Vue from 'vue'
import VueRouter from 'vue-router'

const List = ()=> import('@/views/list/List')
const Control = ()=> import('@/views/control/Control')
const Person = ()=> import('@/views/person/Person')
const Search = ()=> import('@/views/search/Search')
const Check = ()=> import('@/views/check/Check')
const ProjectList = ()=> import('@/views/ProjectList/ProjectList')
const ProjectControl = ()=> import('@/views/ProjectControl/ProjectControl')
const ProjectPerson = ()=> import('@/views/ProjectPerson/ProjectPerson')
const AllProject = ()=> import('@/views/Manager/AllProject')
const Attestation = ()=> import('@/views/Attestation/attestation')
const SupperManager = ()=> import("@/views/SupperManager/SupperManager");

// 安装插件
Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/List'
	},
	{
		path: '/List',
		component: List
	},
	{
		path: '/Control',
		component: Control
	},
	{
		path: '/Person',
		component: Person
	},
	{
		path: '/Search',
		component: Search
	},
	{
		path: '/Check',
		component: Check
	},
	{
		path: '/ProjectList',
		component: ProjectList
	},
	{
		path: '/ProjectControl',
		component: ProjectControl
	},
	{
		path: '/ProjectPerson',
		component: ProjectPerson
	},
	{
		path: '/AllProject',
		component: AllProject
	},
	{
		path: '/Attestation',
		component: Attestation
	},
	{
		path: '/SupperManager',
		component: SupperManager
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导出router
export default router