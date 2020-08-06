<!--  -->
<template>
<div class=''>
	<el-container>
		<el-header>
			<div class="controllerAreaCont">
				<div class="controllerTopleft"></div>
					事件概览
					<el-button plain>查看地图监控</el-button>
				</div>
				<div class="controllerTopRight">
					<el-select v-model="value" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
				</div>
		</el-header>
		<el-main>Main</el-main>
	</el-container>
	<div id="myCharts" ref="myCharts"></div>
	<div id="myChartsPie" ref="myChartsPie"></div>
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
             text: '趋势图',   //图表顶部的标题 
             subtext: '纯属虚构'    //副标题
          },
          tooltip: {   //鼠标悬浮框的提示文字
              trigger: 'axis'
            },
          legend: {
            data:['最高气温','最低气温']
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
						data : ['周一','周二','周三','周四','周五','周六','周日'],
						axisTick:{       //y轴刻度线
							"show":false
						}
            }],
					yAxis : [{   //y轴坐标数据
						name: "时间",
						type : 'value',
						axisLabel : {
							formatter: '{value} °C'
						},
						axisLine:{       //y轴
							"show":false

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
              data:[11, 11, 15, 13, 12, 13, 10], 
              },
            {
              name:"最低气温",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[1, -2, 2, 5, 3, 2, 0],
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
	#myCharts{
		width: 832px;
		height: 320px;
	}
	#myChartsPie{
		width: 832px;
		height: 320px;
	}
</style>