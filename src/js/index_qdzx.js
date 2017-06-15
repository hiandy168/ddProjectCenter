function Agencycompany(){

}

Agencycompany.prototype = {
	constructor: Agencycompany,
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
	getData: function(propertyId,column,dir,pageNum){
		if (arguments.length === 4) 
		{
			if (propertyId != null && propertyId != "null") 
			{
				$.ajax({
				    url: getRoothPath+'/agencycompanycontroller/agencyCompanyListApp.json',
				    data: { 
				        "propertyId": propertyId, //楼盘ID
				        "column": column,//排序参数
				        "dir": dir,//排序方式 asc升序 desc倒序
				        "pageNum": pageNum//页码 (起始页为0)
				    },
				    success:function(data){
				        console.log(data);

				        if (JSON.stringify(data) !== "{}") 
				        {
				        	$my.pageSize = data.recordsTotal; //总页数
				        	var arr = data.data;

				        	if (arr.length) 
				        	{	
				        		if (arr.length < 20) {
					    			$my.loader_inner.hide();
					    			$my.lodingText.classList.add("lodingText_show");
					    		};
				        		agencycompany.renderElement(arr);
				        	} else
				        	{
				        		$my.loader_inner.hide();
				        		$my.messageInfo.html("暂无信息").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				        		return false;
				        	};
				        } else
				        {
				        	$my.loader_inner.hide();
				        	$my.messageInfo.html("暂无信息").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				        	return false;
				        };
				    }
				})
			}else
			{
				$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			}			
		} else
		{
			$my.messageInfo.html("参数错误").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	renderElement: function(data){
		var str = "";

		for (var i = 0; i < data.length; i++) {
			var commission = (data[i].ShouldCommission / 10000).toFixed(0);
			if (data[i].agencyName == "") {data[i].agencyName = "--";};

			str += "<div class='row' data-agencyid="+data[i].AgencyID+">";
				str += "<div class='col-sm-8 col-xs-8 col-md-8'>";
					str += "<div class='innerTop'>";
					str += "<p class='nowrap bigFont' data-toggle='tooltip' data-placement='top' title="+data[i].agencyName+">"+data[i].agencyName+"</p>";
					str += "</div>";
					str += "<div class='innerBottom'>";
					str += "<p class='colorGray'>佣:<span>"+commission+"</span>万　　<span>--</span>套</p>";
					str += "</div>";
				str += "</div>";
				str += "<div class='col-sm-4 col-xs-4 col-md-4 text-right'>";
					str += "<div class='innerTop'>";
					str += "<p class='colorGray'><span>"+data[i].MemberCount+"</span>人</p>";
					str += "</div>";
					str += "<div class='innerBottom'>";
					str += "<kbd class='bgcGray'><span>联</span>:<span>"+data[i].PlaceUserName+"</span></kbd>";
					str += "</div>";
				str += "</div>";
			str += "</div>";
		};

		$my.ulList.append(str);
		$my.flag = false;
	},
	scrollEvent: function(){ //滑动事件
		var vpHeight = document.documentElement.clientHeight; //获取设备高度
		var loadingMore = $my.lodingText.parentNode;
		var rect = loadingMore.getBoundingClientRect();

		var column = $my.dDAndDk.querySelector(".optionListActive").dataset["column"];
		var dir = $my.dDAndDk.querySelector(".optionListActive").dataset["dir"];
		
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
					agencycompany.getData($my.propertyid,column,dir,$my.num);				
				};	
			}else
			{
				return;
			}
		}	
	},
	buffer: function(){
		var column = this.dataset["column"];
		var dir = this.dataset["dir"];

		$my.lodingText.classList.remove("lodingText_show");
		$my.loader_inner.show();

		agencycompany.getData($my.propertyid,column,dir,0);
	},
	dDAndDkEvent: function(){ //大定带看点击事件
		var dDAndDkList = dDAndDk.querySelectorAll("div");
		Array.prototype.forEach.call(dDAndDkList,function(item){
			item.addEventListener("touchend", function(event){
				event.preventDefault();
				event.stopPropagation();

				$(this).addClass('optionListActive').siblings('div').removeClass('optionListActive');

				$my.num = 0; //将页码数回归到0
				$my.ulList.html("");

				agencycompany.throttle(agencycompany.buffer,this);
			}, false);
		});
	},
	bindCompanyClick: function(){ //渠道公司点击事件
		$my.ulList[0].addEventListener("click", function(event){
			var event = event || window.event;
			var target = event.target || event.srcElement;
			var target_confirm;

			if(target.className.indexOf('row') !== -1){
				target_confirm = target; //点击的是row
			};

		    if(target == this){
		    	return false; //点击的是ulList
	    	};

		    while(target.className.indexOf('row') === -1){
		    	//点击的是row的子元素
		        target = target.parentNode;
		        target_confirm = target;
		    };

		    var agencyid = target_confirm.dataset["agencyid"];
		    window.location.href = "newChannel_detail.html?agencyid="+agencyid;

			event.preventDefault();
			event.stopPropagation();
		}, false);
	}
}

var agencycompany = new Agencycompany();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		propertyid: sessionStorage.getItem("propertyID"),
		ulList: $("#ulList"),
		num:0, //页码
		dDAndDk: document.querySelector("#dDAndDk"),
		loader_inner: $(".loader-inner"),
		lodingText: document.querySelector(".lodingText"),
		flag: false //滑动标志位，未滑入加载区
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	agencycompany.getData($my.propertyid,"SaleHouseCount","desc",0); //默认数据加载

	//下滑加载更多事件
	window.addEventListener("touchmove",agencycompany.touchThrottle(agencycompany.scrollEvent, 500,1000));

	//大定带看点击事件
	agencycompany.dDAndDkEvent();

	// 渠道公司点击事件
	agencycompany.bindCompanyClick();
	
	// 渠道公司搜索框点击事件
	var qdSearchBox = document.querySelector(".qdSearchBox");
	qdSearchBox.addEventListener("touchend", function(event){
		event.preventDefault();
		event.stopPropagation();

		window.location.href = "search_list.html";
	}, false);

	//工具提示
	// $('[data-toggle="tooltip"]').tooltip();
});