function ReportList(){
	this.recordsTotal = "";
}

ReportList.prototype = {
	constructor: ReportList,
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 200);
	},
	touchThrottle: function(method,delay,duration){ //滑动节流
		var timer = null,
			begin = new Date();
		return function() {
			var context = this,
				args = arguments,
				current = new Date();;
			clearTimeout(timer);
			if (current - begin >= duration) {
				method.apply(context, args);
				begin = current;
			} else {
				timer = setTimeout(function() {
					method.apply(context, args);
				}, delay);
			}
		}
	},
	getArguments: function(){ //获取楼盘ID和手机后四位
		$my.propertyID = sessionStorage.getItem("propertyID"); //获取楼盘ID

		var url = window.location.href;
		if (url.indexOf("lastName") != -1) 
		{
			var lastName = window.location.search;
			lastName = lastName.split("=")[1];
			$my.lastName = lastName;  //获取手机后四位			
		} else
		{
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			throw new Error("url错误");
			return false;
		};
	},
	bindDom: function(){
		var recordsTotal = document.querySelector("#recordsTotal");
		recordsTotal.innerHTML = this.recordsTotal;
	},
	getData: function(PropertyID,lastName,pageNum){
		if (PropertyID != null && PropertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/overview/customerPerListApp.json',
			    data: { 
			    	"PropertyID": PropertyID,
			    	"lastName":lastName,
			    	"pageNum":pageNum
			    },
			    // async: false, //同步
			    success:function(data){
			    	console.log(data)
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		reportList.recordsTotal = data.recordsTotal;
			    		reportList.bindDom();

    		        	$my.pageSize = data.recordsTotal; //总页数
    		        	var arr = data.data;

    		        	if (arr.length) 
    		        	{	
    		        		if (arr.length < 20) {
    			    			$my.loader_inner.hide();
    			    			$my.lodingText.classList.add("lodingText_show");
    			    		};
    		        		reportList.renderEle(arr);
    		        	} else
    		        	{
    		        		$my.loader_inner.hide();
    		        		$my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow");
    		        		return false;
    		        	};
			    	} else
			    	{
			    		$my.loader_inner.hide();
			    		$my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
			    		return false;
			    	};
			    }
			})
		}else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		}		
	},
	renderEle: function(data){ //Dom渲染
		var str = "";

		for (var i = 0; i < data.length; i++) {
			str += '<div class="row" data-customerid='+data[i].customerID+'>';
			str += '<div class="col-sm-8 col-xs-8 col-md-8">';
			str += '<div class="innerTop">';
			str += '<p class="bigFont"><span>'+data[i].customerName+'</span>　<span>'+data[i].customerPhone+'</span></p>';
			str += '</div>';
			str += '<div class="innerBottom">';
			str += '<p class="colorGray nowrap"><span>'+data[i].agencyName+'</span></p>';
			str += '</div>';
			str += '</div>';
			str += '<div class="col-sm-4 col-xs-4 col-md-4 text-right">';
			str += '<div class="innerTop">';
			str += '<p class="nowrap colorGray"><span class="colorGreen"><b>'+data[i].visitNum+'</b>访</span>&nbsp;&nbsp;<span>'+data[i].bbTime+'</span></p>';
			str += '</div>';
			str += '<div class="innerBottom">';
			str += '<kbd class="bgcGray"><span></span><span>'+data[i].memberName+'</span></kbd>';
			str += '</div></div></div>';
		};

		$(wrap).append(str);
		$my.flag = false;
	},
	scrollEvent: function(){ //滑动事件
		var vpHeight = document.documentElement.clientHeight; //获取设备高度
		var loadingMore = $my.lodingText.parentNode;
		var rect = loadingMore.getBoundingClientRect();
		
		if (!$my.flag) 
		{
			if (rect.top < vpHeight && rect.bottom >= 0) 
			{
				$my.flag = true;
				$my.num++;
				if ($my.num > parseInt($my.pageSize/20) || ($my.num == parseInt($my.pageSize/20) && $my.pageSize % 20 == 0)) 
				{
					$my.loader_inner.hide();
					$my.lodingText.classList.add("lodingText_show");
					return false;
				} else
				{ 
					reportList.getData($my.propertyID,$my.lastName,$my.num);				
				};	
			}else
			{
				return;
			}
		}	
	},
	buffer: function(){ //渠道公司点击
		var customerID = this.dataset.customerid;		
		window.location.href = "report_detail.html?customerid="+customerID;
	}	
}

var reportList = new ReportList();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		wrap: document.querySelector("#wrap"),
		loader_inner: $(".loader-inner"),
		lodingText: document.querySelector(".lodingText"),
		num:0, //页码
		flag: false //滑动标志位，未滑入加载区
	}

	reportList.getArguments();

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	reportList.getData($my.propertyID,$my.lastName,0); //默认数据加载

	//下滑加载更多事件
	window.addEventListener("touchmove",reportList.touchThrottle(reportList.scrollEvent, 500,1000));

	// 渠道公司点击
	$($my.wrap).on('click', '.row', function(event) {
		event.preventDefault();
		event.stopPropagation();

		reportList.throttle(reportList.buffer, this);
	});
});