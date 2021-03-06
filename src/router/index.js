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
const TopController = ()=> import('@/views/Controller/topController');
const Map = ()=> import('@/views/Controller/map');
const Lay = ()=> import('@/views/Lay/lay');
const SearchInfos = ()=> import('@/views/search/SearchInfos');
const ProjectCreate =()=> import('@/views/ProjectControl/ProjectCreate');
const PersonInfos =()=> import('@/views/person/PersonInfos');
const CompanyCheck =()=> import('@/views/check/CompanyCheck');
const warnSearch =()=> import('@/views/search/warnSearch');
const DevideManage =()=> import('@/views/Devide/DevideManage');
const DevideInfos =()=> import('@/views/Devide/DevideInfos');
// 安装插件
Vue.use(VueRouter)

const routes = [
	{
		path: '/Lay',
		name: 'Lay',
		component: Lay
	},
	{
		path: '/List',
		name: 'List',
		component: List
	},
	{
		path: '/Control',
		name: 'Control',
		component: Control
	},
	{
		path: '/Person',
		name: 'Person',
		component: Person
	},
	{
		path: '/Search',
		name: 'Search',
		component: Search
	},
	{
		path: '/warnSearch',
		name: 'warnSearch',
		component: warnSearch
	},
	{
		path: '/SearchInfos',
		name: 'SearchInfos',
		component: SearchInfos
	},
	{
		path: '/Check',
		name: 'Check',
		component: Check
	},
	{
		path: '/ProjectList',
		name: 'ProjectList',
		component: ProjectList
	},
	{
		path: '/ProjectControl',
		name: 'ProjectControl', 
		component: ProjectControl
	},
	{
		path: '/ProjectPerson',
		name: 'ProjectPerson',
		component: ProjectPerson
	},
	{
		path: '/AllProject',
		name: 'AllProject',
		component: AllProject
	},
	{
		path: '/Attestation',
		name: 'Attestation',
		component: Attestation
	},
	{
		path: '/SupperManager',
		name: 'SupperManager',
		component: SupperManager
	},
	{
		path: '/TopController',
		name: 'TopController',
		component: TopController
	},
	{
		path: '/Map',
		name: 'Map',
		component: Map
	},
	{
		path: '/ProjectCreate',
		name: 'ProjectCreate',
		component: ProjectCreate
	},
	{
		path: '/PersonInfos',
		name: 'PersonInfos',
		component: PersonInfos
	},
	{
		path: '/CompanyCheck',
		name: 'CompanyCheck',
		component: CompanyCheck
	},
	{
		path: '/DevideManage',
		name: 'DevideManage',
		component: DevideManage
	},
	{
		path: '/DevideInfos',
		name: 'DevideInfos',
		component: DevideInfos
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