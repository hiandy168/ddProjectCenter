function Piechart(){
	this.domid = "";
	this.barColor = "";
	this.percent = "";	
}

Piechart.prototype = {
	constructor: Piechart,
	chartbar: function(domid,barColor,percent){
		var radialObj = radialIndicator(this.domid, {
		    barColor : this.barColor,
		    barBgColor: '#49484e', //进度条背景色
		    radius: 45, //半径
		    barWidth : 5,
		    initValue : 0,    //最初开始默认值
		    percentage: true,
		    roundCorner : true,  //进度条两端为圆润型
		    maxValue: 10000,
		    fontSize: 16,
		    format: '##.##'
		}); 	
		radialObj.animate(this.percent);
	}
}

var piechart_ws = new Piechart(); //未售
var piechart_yq = new Piechart(); //已售
var piechart_wq = new Piechart(); //未签

function Controlhouse(){
	this.unsoldHouse = ""; //未售套数
	this.unsoldArea = ""; //未售面积
	this.unsoldTotalPrice = ""; //未售总价
	this.unsoldPercent = ""; //未售百分比

	this.signedHouse = ""; //大定已签套数
	this.signedArea = ""; //大定已签面积
	this.signedTotalPrice = ""; //大定已签总价
	this.signedPercent = ""; //大定已签百分比

	this.notSignHouse = ""; //大定未签套数
	this.notSignArea = ""; //大定未签面积
	this.notSignTotalPrice = ""; //大定未签总价
	this.notSignPercent = ""; //大定未签百分比

	this.config = {
		unsoldHouse: document.querySelector("#unsoldHouse"),
		unsoldArea: document.querySelector("#unsoldArea"),
		unsoldTotalPrice: document.querySelector("#unsoldTotalPrice"),
		signedHouse: document.querySelector("#signedHouse"),
		signedArea: document.querySelector("#signedArea"),
		signedTotalPrice: document.querySelector("#signedTotalPrice"),
		notSignHouse: document.querySelector("#notSignHouse"),
		notSignArea: document.querySelector("#notSignArea"),
		notSignTotalPrice: document.querySelector("#notSignTotalPrice")
	}
}

Controlhouse.prototype = {
	constructor: Controlhouse,
	bindDom: function(){
		this.config.unsoldHouse.appendChild(document.createTextNode(this.unsoldHouse)),
		this.config.unsoldArea.appendChild(document.createTextNode(this.unsoldArea)),
		this.config.unsoldTotalPrice.appendChild(document.createTextNode(this.unsoldTotalPrice)),
		this.config.signedHouse.appendChild(document.createTextNode(this.signedHouse)),
		this.config.signedArea.appendChild(document.createTextNode(this.signedArea)),
		this.config.signedTotalPrice.appendChild(document.createTextNode(this.signedTotalPrice)),
		this.config.notSignHouse.appendChild(document.createTextNode(this.notSignHouse)),
		this.config.notSignArea.appendChild(document.createTextNode(this.notSignArea)),
		this.config.notSignTotalPrice.appendChild(document.createTextNode(this.notSignTotalPrice))
	},
	getPercent: function(data){
		var totalNum = data.NotSaleHouse + data.ReserveHouse; //总套数
		this.unsoldPercent = (data.NotSaleHouse / totalNum).toFixed(4) *10000;
		this.signedPercent = (data.SaleHouse / totalNum).toFixed(4) *10000;
		this.notSignTotalPercent = ((data.ReserveHouse - data.SaleHouse) / totalNum).toFixed(4) *10000;

		piechart_ws.domid = "#indicatorContainer1";
		piechart_ws.barColor = "#3BAFC1";
		piechart_ws.percent = this.unsoldPercent;

		piechart_yq.domid = "#indicatorContainer2";
		piechart_yq.barColor = "#F2AD2E";
		piechart_yq.percent = this.signedPercent;

		piechart_wq.domid = "#indicatorContainer3";
		piechart_wq.barColor = "#42C29D";
		piechart_wq.percent = this.notSignTotalPercent;

		piechart_ws.chartbar();
		piechart_yq.chartbar();
		piechart_wq.chartbar();		
	}
}

var controlhouse = new Controlhouse();


$(function() {
	window.$my={
		messageInfo: $(".messageInfo")
	}

	var propertyID = sessionStorage.getItem("propertyID"); //获取楼盘ID

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	//默认数据加载
	(function(){
		if (propertyID != null && propertyID != "null") {
			$.ajax({
			    url: getRoothPath+'/overview/controlhouse.json',
			    data: {"PropertyID": propertyID},
			    // async: false, //同步
			    success:function(data){
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		var len = data.Controlhouse;
			    		console.log(data)
			    		
			    		if (len.length !== 0) 
			    		{
			    			var json = data.Controlhouse[0];

			    			controlhouse.unsoldHouse = json.NotSaleHouse.toFixed(0);
			    			controlhouse.unsoldArea = json.NotSaleAcreage.toFixed(2);
			    			controlhouse.unsoldTotalPrice = (json.NotSaleTotal / 10000).toFixed(4);

			    			controlhouse.signedHouse = json.SaleHouse.toFixed(0);
			    			controlhouse.signedArea = json.SaleAcreage.toFixed(2);
			    			controlhouse.signedTotalPrice = (json.SaleHouseTotal / 10000).toFixed(4);
			    			// 大定未签的数据=大定数据-大定已签的数据
			    			controlhouse.notSignHouse = (json.ReserveHouse - json.SaleHouse).toFixed(0);
			    			controlhouse.notSignArea = (json.ReserveAcreage - json.SaleAcreage).toFixed(2);
			    			controlhouse.notSignTotalPrice = ((json.ReserveSaleTotal - json.SaleHouseTotal) / 10000).toFixed(4);

			    			controlhouse.bindDom();
			    			controlhouse.getPercent(json);
			    		} else
			    		{
			    			$my.messageInfo.html("数据为空").fadeIn("fast").delay("1000").fadeOut("slow");
			    			return false;
			    		};
			    	} else
			    	{
			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return false;
			    	};
			    }
			})
		} else{
			$my.messageInfo.html("楼盘参数丢失").stop().fadeIn("fast").delay("1000").fadeOut("slow");
    		return false;
		};		
	})(propertyID);
});