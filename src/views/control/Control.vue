<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header class="controllerTop">
			<div class="controllerAreaCont">
				<div class="controllerTopleft">
					事件概览
					<el-button plain @click="gotMap">查看地图监控</el-button>
				</div>
				<div class="controllerTopRight">
					<el-select v-model="projectvalue" placeholder="全部项目"  @change="getProjectEcharsData()">
							<el-option
								:key="allProjectItem.ProjectName"
								:label="allProjectItem.ProjectName"
								:value="allProjectItem.ID">
							</el-option>
							<el-option
								v-for="item in allProjectList"
								:key="item.ProjectName"
								:label="item.ProjectName"
								:value="item.ID">
							</el-option>
						</el-select>
				</div>
			</div>
		</el-header>
		<el-main>
			<div class="controllerAreaCont">
				<div class="chartLineArea">
					<div class="chartLineText">火灾自动报警系统</div>
					<ol>
						<li v-for="item in chartLineDatas" :key="item.dlname" :style="{backgroundImage:item.liBackImg}">
							<img :src="item.contImg" alt="">
							<dl>
								<dt>{{item.dlname}}</dt>
								<dd>{{item.dlcount}}</dd>
							</dl>
						</li>
					</ol>
					<div id="myCharts" ref="myCharts" style="width:932px;height:430px;margin-left:-45px;margin-top:30px;"></div>
				</div>
				<div class="chartPieArea">
					<div id="myChartsPie" ref="myChartsPie" style="height:390px;"></div>
				</div>
				<div class="chartWaterLineArea">
					<div class="chartLineText">消防水系统</div>
					<ol>
						<li v-for="item in chartWaterLineDatas" :key="item.dlname" :style="{backgroundImage:item.liBackImg}">
							<img :src="item.contImg" alt="">
							<dl>
								<dt>{{item.dlname}}</dt>
								<dd>{{item.dlcount}}</dd>
							</dl>
						</li>
					</ol>
					<div id="myWaterCharts" ref="myWaterCharts" style="width:932px;height:430px;margin-left:-45px;margin-top:30px;"></div>
				</div>	
			</div>
		</el-main>
	</el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入axios
import axios from 'axios'
export default {
	name: 'Controller',
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			allProjectItem: {
				ProjectName: "全部项目",
				ID: 0
			},
			warningSystem: '',
			waterSystem: '',
			chartLineDatas:[{
				liBackImg:"url("+require("../../assets/images/Controller/supperFire.png")+")",
				contImg:require("../../assets/images/Controller/fireIcon.png"),
				dlname:'火警总数',
				dlcount:'-'
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperTrouble.png")+")",
				contImg:require("../../assets/images/Controller/troubleIcon.png"),
				dlname:'故障总数',
				dlcount:'-'
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperStart.png")+")",
				contImg:require("../../assets/images/Controller/startIcon.png"),
				dlname:'启动总数',
				dlcount:'-'
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperFeback.png")+")",
				contImg:require("../../assets/images/Controller/febackIcon.png"),
				dlname:'反馈总数',
				dlcount:'-'
			}],
			chartWaterLineDatas:[{
				liBackImg:"url("+require("../../assets/images/Controller/supperFire.png")+")",
				contImg:require("../../assets/images/Controller/fireIcon.png"),
				dlname:'水压报警数',
				dlcount:'-'
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperTrouble.png")+")",
				contImg:require("../../assets/images/Controller/troubleIcon.png"),
				dlname:'水压故障数',
				dlcount:'-'
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperStart.png")+")",
				contImg:require("../../assets/images/Controller/fireIcon.png"),
				dlname:'水位报警数',
				dlcount:'-'
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperFeback.png")+")",
				contImg:require("../../assets/images/Controller/troubleIcon.png"),
				dlname:'水位故障数',
				dlcount:'-'
			}],
			options: '',
			value: '',
			fireMonth: '',
			troubleMonth: '',
			startMonth: '',
			feebackMonth: '',
			pressureFire: '',
			pressureTrouble: '',
			waterLevelFire: '',
			waterLevelTrouble: '',
			monthArr: '',
			firepercent:"",
      feedBackpercent:"",
			startpercent:"",
			troublecent:"",
			allProjectList: '',
			projectvalue: ''
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
		gotMap(){
			this.$router.push({
				path: '/Map',
				name: 'Map',
				params: {
				}
			})
		},
    getProjectEcharsData(){
			let _this = this;
			let projectId = this.projectvalue;
			axios.get('http://test.mhfire.cn/mhApi/Project/getSupperConsoleManger',{
				// 参数1：token(用户登录token)，string类型，必填
				// 参数2：projectId(项目ID)，int类型，选填，默认为0
				// 参数3：companyId(公司id)，int类型，必填，默认为0
					params: {
						token: document.querySelector('#token').innerText,
						projectId: projectId,
						companyId: sessionStorage.getItem('companyId')
					}
			})
			.then(function(response){
				_this.warningSystem = response.data.data.warningSystem;
				_this.chartLineDatas[0].dlcount = _this.warningSystem.fireCount
				_this.chartLineDatas[1].dlcount = _this.warningSystem.troubleCount;
				_this.chartLineDatas[2].dlcount = _this.warningSystem.startCount;
				_this.chartLineDatas[3].dlcount = _this.warningSystem.feedBackCount;
				let warningSystemMonthInfo = _this.warningSystem.monthInfo;
				let fireMonth = [];
				let troubleMonth = [];
				let startMonth = [];
				let feebackMonth = [];
				let monthArr = [];
				for(let i = 0;i<warningSystemMonthInfo.length;i++){
					fireMonth[i] = warningSystemMonthInfo[i].fireNum;
					troubleMonth[i] = warningSystemMonthInfo[i].troubleNum;
					startMonth[i] = warningSystemMonthInfo[i].feekbackNum;
					feebackMonth[i] = warningSystemMonthInfo[i].startNum;
					monthArr[i] = warningSystemMonthInfo[i].date;
				}
				_this.fireMonth = fireMonth;
				_this.troubleMonth = troubleMonth;
				_this.startMonth = startMonth;
				_this.feebackMonth = feebackMonth;
				_this.monthArr = monthArr;
							// 饼状图
				_this.firepercent = _this.warningSystem.firepercent;
				_this.feedBackpercent = _this.warningSystem.feedBackpercent;
				_this.startpercent = _this.warningSystem.startpercent;
				_this.troublecent = _this.warningSystem.troublecent;

				_this.waterSystem = response.data.data.waterSystem;
				_this.chartWaterLineDatas[0].dlcount = _this.waterSystem.pressureFireCount
				_this.chartWaterLineDatas[1].dlcount = _this.waterSystem.pressureTroubleCount;
				_this.chartWaterLineDatas[2].dlcount = _this.waterSystem.waterLevelFireCount;
				_this.chartWaterLineDatas[3].dlcount = _this.waterSystem.waterLevelTroubleCount;
				let waterSystemMonthInfo = _this.waterSystem.monthInfo;
				let pressureFire = [];
				let pressureTrouble = [];
				let waterLevelFire = [];
				let waterLevelTrouble = [];
				for(let j = 0;j<waterSystemMonthInfo.length;j++){
					pressureFire[j] = waterSystemMonthInfo[j].pressureFireNum;
					pressureTrouble[j] = waterSystemMonthInfo[j].pressureTroubleNum;
					waterLevelFire[j] = waterSystemMonthInfo[j].waterLevelFireNum;
					waterLevelTrouble[j] = waterSystemMonthInfo[j].waterLevelTroubleNum;
				}
				_this.pressureFire = pressureFire;
				_this.pressureTrouble = pressureTrouble;
				_this.waterLevelFire = waterLevelFire;
				_this.waterLevelTrouble = waterLevelTrouble;
				_this.drawProjectEcharts();
			})
			.catch(function(error){
					console.log(error);
			})
		},
		drawProjectEcharts(){
			console.log('draw');
			
			// setTimeout(()=>{
				let _this = this;
			// 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
			const myCharts = this.$echarts.init(this.$refs.myCharts);
			// let monthArr = this.monthArr;
			let options = {
							title: { 
								text: '趋势图',//图表顶部的标题 
								// left: 40,
								padding:[0,0,20,50]
								//subtext: '纯属虚构'    //副标题
							},
							tooltip: {   //鼠标悬浮框的提示文字
									trigger: 'axis'
								},
							color:['#f84027','#f59540','#4cd8d4','#45c74e'], 
							legend: {
								data:[
									{
										name: '火警',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#f84027'
										}
									},{
										name: '故障',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#f59540'
										}
									},{
										name: '启动',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#4cd8d4'
										}
									},{
										name: '反馈',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#45c74e'
										}
									}
								],
								// icon: 'triangle',
								itemHeight  :10,//改变圆圈大小
								// bottom: 20,
								top: 390,
								symbol:'circle',
								itemWidth:20
							},
							xAxis : [{  //x轴坐标数据
								type : 'category',
								boundaryGap : false,
								data : _this.monthArr,
								axisTick:{       //y轴刻度线
									"show":false,
								},
								axisLine: {
									lineStyle: {
										color: '#999999'
									}
								},
								splitLine: {     //网格线
									"show": false,
								}
								}],
							yAxis : [{   //y轴坐标数据
								name: "单位/个",
								type : 'value',
								axisLabel : {
									formatter: '{value}'
								},
								axisLine:{       //y轴
									"show":false,
									lineStyle: {
										color: '#999999'
									}
								},
								axisTick:{       //y轴刻度线
									"show":false
								}
								// ,
								// splitLine: {     //网格线
								// 	"show": false
								// }
							}],
							series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
								{
									name:"火警",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data:_this.fireMonth,
									symbol:'circle',
									lineStyle:{
										width: 1,
										color: '#f84027'
									}
								},
								{
									name:"故障",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data:_this.troubleMonth,
									symbol:'circle',
									lineStyle:{
										width: 1,
										color: '#f59540',
									}
								},
								{
									name:"启动",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data:_this.startMonth,
									symbol:'circle',
									lineStyle:{
										width: 1,
										color: '#4cd8d4',
									}
								},
								{
									name:"反馈",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data:_this.feebackMonth,
									symbol:'circle',
									lineStyle:{
										width: 1,
										color: '#45c74e'
									}
								}
							]}

				myCharts.setOption(options);
				let optionsPie = {
									title: {
											text: '饼状图',
											// subtext: '纯属虚构',
											left: 40
									},
									tooltip: {
											trigger: 'item',
											formatter: '{a} <br/>{b} : {c} ({d}%)'
									},
									color: ['#f84027','#f59540','#4cd8d4','#45c74e'],
									legend: {
										orient: 'vertical',
										height  :100,//改变圆圈大小
										width:20,
										x: 'right',
										y: 'center',
										itemWidth: 18,
										itemHeight: 8,//图例标记的图形宽度
										data: ['火警','故障','启动','反馈']
									},
									series: [
											{
													name: '访问来源',
													type: 'pie',
													radius: '55%',
													center: ['50%', '60%'],
													data: [
															{value: _this.firepercent, name: '火警'},
															{value: _this.troublecent, name: '故障'},
															{value: _this.startpercent, name: '启动'},
															{value: _this.feedBackpercent, name: '反馈'}
													],
													emphasis: {
															itemStyle: {
																	shadowBlur: 10,
																	shadowOffsetX: 0,
																	shadowColor: 'rgba(0, 0, 0, 0.5)'
															}
													}
											}
									]
							};

				const  myChartsPie = this.$echarts.init(this.$refs.myChartsPie);
				myChartsPie.setOption(optionsPie);


			const  myWaterCharts = this.$echarts.init(this.$refs.myWaterCharts);
			let optionsWater = {
							title: { 
								text: '趋势图',//图表顶部的标题 
														// left: 40,
								padding:[0,0,20,50]
								//subtext: '纯属虚构'    //副标题
							},
							tooltip: {   //鼠标悬浮框的提示文字
									trigger: 'axis'
								},
							color:['#f84027','#f59540','#4cd8d4','#45c74e'],
							legend: {
								data:[
									{
										name: '水压报警',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#f84027'
										}
									},{
										name: '水压故障',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#f59540'
										}
									},{
										name: '水位报警',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#4cd8d4'
										}
									},{
										name: '水位故障',
										// 强制设置图形为圆。
										// icon: 'circle',
										// 设置文本为红色
										textStyle: {
												color: '#45c74e'
										}
									}
								],
								// icon: 'triangle',
								itemHeight  :10,//改变圆圈大小
								// bottom: 20,
								top: 390,
								symbol:'circle',
								itemWidth:20
							},
							xAxis : [{  //x轴坐标数据
								type : 'category',
								boundaryGap : false,
								data : _this.monthArr,
								axisTick:{       //y轴刻度线
									"show":false,
								},
								axisLine: {
									lineStyle: {
										color: '#999999'
									}
								},
								splitLine: {     //网格线
									"show": false,
								}
								}],
							yAxis : [{   //y轴坐标数据
								name: "单位/个",
								type : 'value',
								axisLabel : {
									formatter: '{value}'
								},
								axisLine:{       //y轴
									"show":false,
									lineStyle: {
										color: '#999999'
									}
								},
								axisTick:{       //y轴刻度线
									"show":false
								}
								// ,
								// splitLine: {     //网格线
								// 	"show": false
								// }
							}],
							series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
								{
									name:"水压报警",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data: _this.pressureFire,
									symbol:'circle',
									symbolSize: 2,
									lineStyle:{
										width: 1,
										color: '#f84027'
									}
									},
								{
									name:"水压故障",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data:_this.pressureTrouble,
									symbol:'circle',
									lineStyle:{
										width: 1,
										color: '#f59540',
									}
								},
								{
									name:"水位报警",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data: _this.waterLevelFire,
									symbol:'circle',
									symbolSize: 2,
									lineStyle:{
										width: 1,
										color: '#4cd8d4',
									}
								},
								{
									name:"水位故障",
									type: "line",  //pie->饼状图  line->折线图  bar->柱状图
									data: _this.waterLevelTrouble,
									symbol:'circle',
									symbolSize: 2,
									lineStyle:{
										width: 1,
										color: '#45c74e'
									}
								}
							]}

				myWaterCharts.setOption(optionsWater);
			// },3000);
		}
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		let _this = this;
		axios.get('http://test.mhfire.cn/mhApi/Project/getSupperConsoleManger',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：projectId(项目ID)，int类型，选填，默认为0
			// 参数3：companyId(公司id)，int类型，必填，默认为0
				params: {
					token: document.querySelector('#token').innerText,
					projectId: 0,
					companyId: sessionStorage.getItem('companyId')
				}
		})
		.then(function(response){
			_this.warningSystem = response.data.data.warningSystem;
			_this.chartLineDatas[0].dlcount = _this.warningSystem.fireCount
			_this.chartLineDatas[1].dlcount = _this.warningSystem.troubleCount;
			_this.chartLineDatas[2].dlcount = _this.warningSystem.startCount;
			_this.chartLineDatas[3].dlcount = _this.warningSystem.feedBackCount;
			let warningSystemMonthInfo = _this.warningSystem.monthInfo;
			let fireMonth = [];
			let troubleMonth = [];
			let startMonth = [];
			let feebackMonth = [];
			let monthArr = [];
			for(let i = 0;i<warningSystemMonthInfo.length;i++){
				fireMonth[i] = warningSystemMonthInfo[i].fireNum;
				troubleMonth[i] = warningSystemMonthInfo[i].troubleNum;
				startMonth[i] = warningSystemMonthInfo[i].feekbackNum;
				feebackMonth[i] = warningSystemMonthInfo[i].startNum;
				monthArr[i] = warningSystemMonthInfo[i].date;
			}
			_this.fireMonth = fireMonth;
			_this.troubleMonth = troubleMonth;
			_this.startMonth = startMonth;
			_this.feebackMonth = feebackMonth;
			_this.monthArr = monthArr;
						// 饼状图
			_this.firepercent = _this.warningSystem.firepercent;
      _this.feedBackpercent = _this.warningSystem.feedBackpercent;
			_this.startpercent = _this.warningSystem.startpercent;
			_this.troublecent = _this.warningSystem.troublecent;
 
			_this.waterSystem = response.data.data.waterSystem;
			_this.chartWaterLineDatas[0].dlcount = _this.waterSystem.pressureFireCount
			_this.chartWaterLineDatas[1].dlcount = _this.waterSystem.pressureTroubleCount;
			_this.chartWaterLineDatas[2].dlcount = _this.waterSystem.waterLevelFireCount;
			_this.chartWaterLineDatas[3].dlcount = _this.waterSystem.waterLevelTroubleCount;
			let waterSystemMonthInfo = _this.waterSystem.monthInfo;
			let pressureFire = [];
			let pressureTrouble = [];
			let waterLevelFire = [];
			let waterLevelTrouble = [];
			for(let j = 0;j<waterSystemMonthInfo.length;j++){
				pressureFire[j] = waterSystemMonthInfo[j].pressureFireNum;
				pressureTrouble[j] = waterSystemMonthInfo[j].pressureTroubleNum;
				waterLevelFire[j] = waterSystemMonthInfo[j].waterLevelFireNum;
				waterLevelTrouble[j] = waterSystemMonthInfo[j].waterLevelTroubleNum;
			}
			_this.pressureFire = pressureFire;
			_this.pressureTrouble = pressureTrouble;
			_this.waterLevelFire = waterLevelFire;
			_this.waterLevelTrouble = waterLevelTrouble;
			_this.drawProjectEcharts();
		})
		.catch(function(error){
				console.log(error);
		})
		axios.get('http://test.mhfire.cn/mhApi/Project/allProjectList',{
			// 参数1：token(用户登录token)，string类型，必填
			// 参数2：companyId(公司id)，int类型，必填
			params: {
				token: document.querySelector('#token').innerText,
				companyId: sessionStorage.getItem('companyId'),
			}
		})
		.then(function(response){
			_this.allProjectList = response.data.data;
			// _this.projectvalue = _this.allProjectList[0].ProjectName;
			console.log(response);
		})
		.catch(function(error){
				console.log(error);
		})
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		// let _this = this;
		// setTimeout(function(){
		// 	_this.drawProjectEcharts();
		// },3000);
	}
}
</script>
<style>
	.controllerTop{
		background-color: #ffffff;
		background-color: #ffffff;
		font-family: "PFz";
		color: #333;
	}
	.controllerAreaCont{
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	.controllerTopleft{
		float: left;
	}
	.controllerTop .controllerAreaCont .controllerTopleft .el-button{
		box-sizing: border-box;
		width: 150px;
		height: 30px;
		background: url('~@/assets/images/Controller/inputicon.png') 125px center no-repeat;
		text-align: left;
		padding: 0;
		padding-left: 10px;
		margin-left: 15px;
		font-family: "PFxi";
	}
	.controllerTopleft .el-button span{
		font-size: 12px;
		/* color: #666666; */
	}
	.controllerTop .controllerAreaCont .el-button.is-plain:hover{
		background: url('~@/assets/images/Controller/inputiconselect.png') 125px center no-repeat;
	}
	.controllerTop .controllerAreaCont .el-button.is-plain:focus{
		background: url('~@/assets/images/Controller/inputiconselect.png') 125px center no-repeat;
	}
	.controllerTopRight{
		float: right;
	}
	.controllerTopRight .el-input__inner{
		width: 272px;
		height: 30px;
		text-align: center;
		font-family: "PFxi";
		font-size: 12px;
		color: #999999;
	}
	.chartLineArea{
		background-color: #ffffff;
		margin-top: 20px;
		padding-left: 40px;
		padding-top: 30px;
		padding-bottom: 30px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.chartLineArea .chartLineText{
		font-family: "PFzc";
		color: #333;
		letter-spacing: 1px;
		font-size: 18px;
	}
	.chartLineArea ol{
		margin: 0;
		list-style: none;
		margin-top: 20px;
		overflow: hidden;
		padding-left: 0;
	}
	.chartLineArea li{
		vertical-align: middle;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		width: 246px;
		height: 90px;
		float: left;
		margin-right: 24px;
		padding-left: 30px;
	}
	.chartLineArea li dl{
		font-family: "PFxi";
		color: #ffffff;
		font-size: 14px;
		margin-left: 15px;
	}
	.chartLineArea li dl dd{
		margin: 0;
		margin-top: 10px;
	}
	.chartPieArea{
		width: 1200px;
		background-color: #ffffff;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.chartWaterLineArea{
		margin-top: 20px;
		background-color: #ffffff;
		border-radius: 10px;
		padding-left: 40px;
		padding-top: 30px;
		padding-bottom: 30px;
	}
	.chartWaterLineArea .chartLineText{
		font-family: "PFzc";
		color: #333;
		letter-spacing: 1px;
		font-size: 18px;
	}
	.chartWaterLineArea ol{
		margin: 0;
		list-style: none;
		margin-top: 20px;
		overflow: hidden;
		padding-left: 0;
	}
	.chartWaterLineArea li{
		vertical-align: middle;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		width: 246px;
		height: 90px;
		float: left;
		margin-right: 24px;
		padding-left: 30px;
	}
	.chartWaterLineArea li dl{
		font-family: "PFxi";
		color: #ffffff;
		font-size: 14px;
		margin-left: 15px;
	}
	.chartWaterLineArea li dl dd{
		margin: 0;
		margin-top: 10px;
	}
	#myChartsPie{
		width: 632px;
		height: 320px;
	}
	/* #myCharts{
		width: 832px;
		height: 320px;
	}
	#myChartsPie{
		
	} */
</style>