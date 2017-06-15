function Chart(){
	this.domid = "";
	this.timeList = [];
	this.nameInfo = "";
	this.chartData = [];
	this.lineColor = "";
	this.series = [];
}

Chart.prototype = {
	constructor: Chart,
	chartFn: function(){
		Highcharts.chart(this.domid, {
		    title: {
		        text: '',
		        x: -20 //center
		    },
		    chart: {
		        backgroundColor: '#49484e',  //设置背景颜色
		        type: 'line',
		        marginLeft:40,
		        /*spacingTop:15,*/
		        spacingBottom:0
		    },
		    plotOptions: {
		        series: {
		            marker: {
		                cursor:"pointer",
		                // enabled: false, //数据点是否显示
		                radius: 1  //数据点大小px
		            }
		        }
		    },
		    credits: {
		        enabled:false //隐藏右下角信息
		    },
		    exporting: {
		        enabled:false //去掉右上角信息
		    },
		    xAxis: {
		        tickWidth: 0,
		        gridLineWidth:1,
		        gridLineColor:"#58575d",
		        lineColor:"#58575d", //基线颜色
		        endOnTick: true,
		        showLastLabel: true,
		        startOnTick: true,
		        tickmarkPlacement:"on",
		        // type: 'datetime', //坐标轴类型
		        // tickInterval:"3",  //tickPixelInterval
		        categories: this.timeList
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		        gridLineWidth:1,
		        gridLineColor:"#58575d"
		    },
		    tooltip: {
		        valueSuffix: '套',
		        shared:true //共享提示框
		        // crosshairs:true //移动区域
		    },
		    //图例设置
		    legend: {
		        layout: 'vertical', //水平horizontal 垂直vertical
		        align: 'right', //left center right
		        verticalAlign: 'middle',
		        borderWidth: 0,
		        floating:false,
		        margin:0,
		        padding:0,
		        width:30,
		        symbolWidth:5,
		        symbolPadding:1,
		        // itemMarginLeft:500,
		        itemStyle : {
		            'fontSize':'12px',
		            "color":this.lineColor,
		            "fontWeight":"normal"
		        },
		        y:-20
		    },
		    series: this.series
		});
	}
}

var bblfChart = new Chart(); //报备来访走势
var cjzsChart = new Chart(); //成交走势
var newZsChart = new Chart(); //新增渠道走势

function AddTrend(){
	this.baobeiNumArr = []; //报备集合
	this.laifangNumArr = []; //来访集合
	this.chengjiaoNumArr = []; //成交集合
	this.NewZsNumArr = []; //新增渠道集合
	this.timeListArr = []; //时间集合

	this.baobeiNum = ""; //报备总量
	this.laifangNum = ""; //来访总量
	this.chengjiaoNum = ""; //成交总量
	this.NewZsNum = ""; //成交总量

	this.config = {
		baobeiNum: document.getElementById("baobeiNum"),
		laifangNum: document.getElementById("laifangNum"),
		chengjiaoNum: document.getElementById("chengjiaoNum"),
		NewZsNum: document.getElementById("NewZsNum")
	}
}

AddTrend.prototype = {
	constructor: AddTrend,
	throttle:function(method,context){ //节流函数
        clearTimeout(method.tId);
        method.tId=setTimeout(function(){
            method.call(context);
        },500);
    },
    calcTotal: function(data){
		if (toString.call(data) === "[object Array]") 
		{
			var total = 0;
			for (var i = 0; i < data.length; i++) {
				total += data[i]; 
			};
			return total;
		}else
		{
			$my.messageInfo.html("参数错误").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	getData: function(PropertyID,timeselete){
		if (PropertyID != null && PropertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/overview/addTrendApp.json',
			    data: {"PropertyID": PropertyID,"timeselete": timeselete},
			    // async: false, //同步
			    success:function(data){
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		console.log(data);
			    		if (data.timelist != 0) 
			    		{
			    			addTrend.baobeiNumArr = data.baobeilist;
			    			addTrend.laifangNumArr = data.daikanilist;
			    			addTrend.chengjiaoNumArr = data.chengjiaolist;
			    			addTrend.NewZsNumArr = data.xingzengqdlist;
			    			addTrend.timeListArr = data.timelist;

			    			addTrend.chartFn();

			    			addTrend.baobeiNum = addTrend.calcTotal(data.baobeilist);
			    			addTrend.laifangNum = addTrend.calcTotal(data.daikanilist);
			    			addTrend.chengjiaoNum = addTrend.calcTotal(data.chengjiaolist);
			    			addTrend.NewZsNum = addTrend.calcTotal(data.xingzengqdlist);

			    			addTrend.bindDom();			    			
			    		} else
			    		{
			    			$my.messageInfo.html("数据为空").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    			return false;
			    		};			    		
			    	} else
			    	{
			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return false;
			    	};
			    }
			})
		} else
		{
			$my.messageInfo.html("楼盘参数丢失").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	chartFn: function(){
		//报备来访
		bblfChart.domid = "bblfChart";
		bblfChart.timeList = this.timeListArr;
		bblfChart.lineColor = "#fff";
		bblfChart.series = [{
		    name: '报备量',
		    type: 'spline', //曲线图 line为折线图
		    color:"#42C29D", //设置线条颜色
		    lineWidth: 3, //线条宽度
		    data: this.baobeiNumArr
		}, {
		    name: '来访量',
		    type: 'spline',
		    color:"#fff",
		    lineWidth: 3,
		    data: this.laifangNumArr
		}];
		bblfChart.chartFn();

		//成交走势
		cjzsChart.domid = "cjzsChart";
		cjzsChart.timeList =  this.timeListArr;
		cjzsChart.nameInfo = "成交";
		cjzsChart.chartData = this.chengjiaoNumArr;
		cjzsChart.lineColor = "#3BAFC1";
		cjzsChart.series = [{
			name: cjzsChart.nameInfo,
			type: 'spline', //曲线图 line为折线图
			color:cjzsChart.lineColor, //设置线条颜色
			lineWidth: 3, //线条宽度
			data: cjzsChart.chartData
		}];
		cjzsChart.chartFn();

		//新渠道
		newZsChart.domid = "newZsChart";
		newZsChart.timeList = this.timeListArr;
		newZsChart.nameInfo = "新渠道";
		newZsChart.chartData = this.NewZsNumArr;
		newZsChart.lineColor = "#F2AD2E";
		newZsChart.series = [{
			name: newZsChart.nameInfo,
			type: 'spline', //曲线图 line为折线图
			color:newZsChart.lineColor, //设置线条颜色
			lineWidth: 3, //线条宽度
			data: newZsChart.chartData
		}];   
		newZsChart.chartFn();

		this.baobeiNumArr = null;
		this.laifangNumArr = null; 
		this.chengjiaoNumArr = null;
		this.NewZsNumArr = null; 
		this.timeListArr = null; 
	},
	bindDom: function(){
		this.config.baobeiNum.innerHTML = this.baobeiNum;
		this.config.laifangNum.innerHTML = this.laifangNum;
		this.config.chengjiaoNum.innerHTML = this.chengjiaoNum;
		this.config.NewZsNum.innerHTML = this.NewZsNum;
	},
	bindEvent: function(){
		var timeselete = this.dataset["info"];

		addTrend.getData($my.propertyid,timeselete);
	}
}

var addTrend = new AddTrend();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		propertyid: sessionStorage.getItem("propertyID")
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	addTrend.getData($my.propertyid,2); //默认数据加载

	//时间维度选择点击事件
	var optionList = document.querySelectorAll("div[data-info]");
	Array.prototype.forEach.call(optionList,function(item){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();

			$(this).addClass('optionListActive').siblings('div').removeClass('optionListActive');

			addTrend.throttle(addTrend.bindEvent,this);
		}, false);
	});	
});