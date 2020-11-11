<!--  -->
<template>
	<div class='devideInfos'>
		<el-container class="devideInfosCont">
			<el-header class="devideInfosContTop">
				<div class="devideInfosLeft">物联设备管理>>设备详情</div>
			</el-header>
			<el-main class="devideInfosMain">
				<div class="devideInfosMainTop">
					<div class="devideInfosMainTopLeft">返回</div>
					<div class="devideInfosMainTopRight">
						<div class="devidePrev">上一条</div>
						<div class="devideNext">下一条</div>
					</div>
				</div>
				<div class="devideInfosMainBottom">
					<div class="devideInfosMainBottomLeft">
						<div class="devideInfosMainBottomLCont">
							<div class="devideInfosMainBottomLT">
								<h4>设备信息</h4>
								<div class="devideInfosMainBottomLTCont">
									<dl>
										<dt></dt>
										<dd><span>设备类型：</span>NB烟感探测器</dd>
										<dd><span>系统事件：</span>火警</dd>
										<dd><span>报警时间：</span>2020年10月22日</dd>
										<dd><span>设备备注：</span>厨房</dd>
										<dd><span>设备IMEI：</span>554645321365</dd>
										<dd><span>拆除状态：</span>拆除</dd>
										<dd><span>电量状态：</span>正常</dd>
										<dd><span>信号强度：</span>一般</dd>
										<dd><span>设备位置：</span>汇聚创新园地下室一层</dd>
									</dl>
									<img src="~@/assets/images/DevideManage/devideModel.png" alt="">
								</div>
							</div>
							<div class="devideInfosMainBottomLB">
								<h4>绑定人员</h4>
								<div class="devideInfosMainBottomLBCont">
									<div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
									<div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
									<div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
									<div class="devideInfosMainBottomLBContSide">
										<img class="devideManagerPhoto" src="~@/assets/images/DevideManage/devideModel.png" alt="">
										<span>WCY</span>
										<img src="~@/assets/images/DevideManage/devideDelete.png" alt="">
									</div>
								</div>
							</div>
						</div>	
					</div>
					<div class="devideInfosMainBottomRight">
						<div class="devideInfosMainBottomRT">
							<div class="devideInfosMainBottomRTCont">
								<h4>历史事件</h4>
								<ol class="devideInfosMainBottomRTSide">
									<li><span>设备类型：</span>NB感烟探测器</li>
									<li><span>系统事件：</span>火警</li>
									<li><span>报警时间：</span>2020年10月22日</li>
								</ol>
								<ol class="devideInfosMainBottomRTSide">
									<li><span>设备类型：</span>NB感烟探测器</li>
									<li><span>系统事件：</span>火警</li>
									<li><span>报警时间：</span>2020年10月22日</li>
								</ol>
								<ol class="devideInfosMainBottomRTSide">
									<li><span>设备类型：</span>NB感烟探测器</li>
									<li><span>系统事件：</span>火警</li>
									<li><span>报警时间：</span>2020年10月22日</li>
								</ol>
							</div>
						</div>
						<div class="devideInfosMainBottomRB">
							<div class="devideInfosMainBottomRBCont">
								<h4>地址</h4>
								<div class="devideInfosMap">
									<div class="devideInfosMapTopLeft"></div>
									<div class="devideInfosMapTopRight"></div>
									<div class="devideInfosMapBottomLeft"></div>
									<div class="devideInfosMapBottomRight"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

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
	.devideInfos{
		background-color: #f2f4fa;
		width: 100%;
		height: auto;
	}
	.devideInfos .devideInfosCont{
		width: 100%;
		height: auto;
	}
	.devideInfos .devideInfosContTop{
		height: 60px;
		line-height: 60px;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideInfos .devideInfosMain{
		margin: 20px 25px 40px 25px;
	}
	.devideInfos .devideInfosMainTop{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideInfos .devideInfosMainTop .devideInfosMainTopLeft{
		box-sizing: border-box;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		/* padding:15px 30px; */
		background-color: #ffffff;
		border-radius: 5px;
	}
	.devideInfos .devideInfosMainTop div{
		color: #666;
		font-family: PFZ;
		letter-spacing: 3px;
		font-size: 18px;
		cursor: pointer;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLCont{
		width: 911px;
		margin: 0 auto;
	}
	.devideInfos .devideInfosMainTop .devideInfosMainTopRight{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}
	.devideInfos .devideInfosMainTop .devideInfosMainTopRight div{
		width: 155px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #ffffff;
		border-radius: 5px;
	}
	.devideInfos .devideInfosMainTopRight .devideNext{
		margin-left: 30px;
	}
	.devideInfos .devideInfosMainBottom{
		overflow: hidden;
		padding-top: 20px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLeft{
		width: 1003px;
		height: 830px;
		background-color: #ffffff;
		float: left;
		border-radius: 5px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLTCont{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-family: PFc;
		font-size: 14px;
		/* overflow: hidden; */
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT dl{
		width: 421px;
		box-sizing: border-box;
		padding-left: 50px;
		margin: 0;
		margin-top: 30px;
		/* float: left; */
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT dl dd{
		font-family: PFxi;
		color: #666;
		letter-spacing: 2px;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLT dl dd span{
		font-family: PFzc;
		color: #333;
		letter-spacing: 2px;
	}

	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLB{
		margin-top: 68px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLB h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottomLBCont{
		overflow: hidden;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomLBContSide{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 304px;
		height: 99px;
		float: left;
		border: 1px solid #9dc2e1;
		border-radius: 5px;
		padding-left: 30px;
		background-color: #f1f4f9;
		margin-left: 50px;
		margin-bottom: 40px;
		box-sizing: border-box;
	}
	.devideInfos .devideInfosMainBottomLBContSide span{
		display: inline-block;
		width: 130px;
	}
	.devideInfos .devideInfosMainBottomLBContSide .devideManagerPhoto{
		width: 72px;
		height: 72px;
		margin-right: 10px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomRight{
		width: 613px;
		height: 830px;
		background-color: #ffffff;
		float: right;
		border-radius: 10px;
	}
	.devideInfos .devideInfosMainBottom .devideInfosMainBottomRT{
		height: 505px;
	}
	.devideInfos .devideInfosMainBottomRTCont{
		width: 522px;
		margin: 0 auto;
	}
	.devideInfos .devideInfosMainBottomRT h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottomRTSide{
		list-style: none;
		font-size: 14px;
		border: 1px solid #dddddd;
		border-radius: 5px;
		padding-top: 20px;box-shadow: 0 0 10px #ddd;
	}
	.devideInfos .devideInfosMainBottomRTSide li{
		font-family: PFxi;
		color: #666;
		letter-spacing: 2px;
		margin: 0;
		margin-bottom: 20px;
	}
	.devideInfos .devideInfosMainBottomRTSide li span{
		font-family: PFzc;
		color: #333;
		letter-spacing: 2px;
	}
	.devideInfos .devideInfosMainBottomRBCont{
		width: 522px;
		margin: 0 auto;
		margin-top: 20px;
		box-sizing: border-box;
	}
	.devideInfos .devideInfosMainBottomRB h4{
		height: 60px;
		line-height: 60px;
		color: #333;
		font-family: PFc;
		letter-spacing: 2px;
		border-bottom: 1px solid #e6e6e6;
		margin: 0;
		margin-bottom: 20px;
	}
</style>