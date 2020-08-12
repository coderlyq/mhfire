<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header class="controllerTop">
			<div class="controllerAreaCont">
				<div class="controllerTopleft">
					事件概览
					<el-button plain>查看地图监控</el-button>
				</div>
				<div class="controllerTopRight">
					<el-select v-model="value" placeholder="全部项目">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
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
					<div id="myCharts" ref="myCharts" style="width:832px;height:410px;margin-left:-45px;"></div>
				</div>
				<div id="myChartsPie" ref="myChartsPie"></div>
			</div>
		</el-main>
	</el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
	name: 'topController',
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			chartLineDatas:[{
				liBackImg:"url("+require("../../assets/images/Controller/supperFire.png")+")",
				contImg:require("../../assets/images/Controller/fireIcon.png"),
				dlname:'火警总数',
				dlcount:1
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperTrouble.png")+")",
				contImg:require("../../assets/images/Controller/troubleIcon.png"),
				dlname:'火警总数',
				dlcount:2
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperStart.png")+")",
				contImg:require("../../assets/images/Controller/startIcon.png"),
				dlname:'火警总数',
				dlcount:3
			},{
				liBackImg:"url("+require("../../assets/images/Controller/supperFeback.png")+")",
				contImg:require("../../assets/images/Controller/febackIcon.png"),
				dlname:'火警总数',
				dlcount:4
			}],
			options: [{
				value: '选项1',
				label: '黄金糕'
			}, {
				value: '选项2',
				label: '双皮奶'
			}, {
				value: '选项3',
				label: '蚵仔煎'
			}, {
				value: '选项4',
				label: '龙须面'
			}, {
				value: '选项5',
				label: '北京烤鸭'
			}],
			value: ''
		};
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	//方法集合
	methods: {
    
	},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {

	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
// 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
   const  myCharts = this.$echarts.init(this.$refs.myCharts);
   let options = {
          title: { 
						text: '趋势图',//图表顶部的标题 
						left: 10
             //subtext: '纯属虚构'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
              trigger: 'axis'
            },
          legend: {
            data:['最高气温','最低气温'],
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
						data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
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
							formatter: '{value} °C'
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
              name:"最高气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
							data:[11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 12, 13,],
							symbol:'circle'
              },
            {
              name:"最低气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
							data:[1, -2, 2, 5, 3, 2, 0,1, -2, 2, 5, 3, 2, 0],
							symbol:'circle'
              }
          ]}

		myCharts.setOption(options);
		let optionsPie = {
							title: {
									text: '某站点用户访问来源',
									subtext: '纯属虚构',
									left: 'center'
							},
							tooltip: {
									trigger: 'item',
									formatter: '{a} <br/>{b} : {c} ({d}%)'
							},
							legend: {
									orient: 'vertical',
									x: 'right',
									y: 'center',
									data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
							},
							series: [
									{
											name: '访问来源',
											type: 'pie',
											radius: '55%',
											center: ['50%', '60%'],
											data: [
													{value: 335, name: '直接访问'},
													{value: 310, name: '邮件营销'},
													{value: 234, name: '联盟广告'},
													{value: 135, name: '视频广告'},
													{value: 1548, name: '搜索引擎'}
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
	.controllerTopleft .el-button{
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
	.el-button.is-plain:focus, .el-button.is-plain:hover{
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
	#myCharts{
		width: 832px;
		height: 320px;
	}
	#myChartsPie{
		width: 832px;
		height: 320px;
	}
</style>