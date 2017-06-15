function AppointmentList(){
	this.pipeFn=function(){ //组别trigger
		var url = window.location.href;

		if (url.indexOf("salesuserleaderid") !== -1) {
			var salesuserleaderid = window.location.search;
			salesuserleaderid = salesuserleaderid.split("=")[1];
			
			var saleuserList = $my.saleuserListID.querySelectorAll("li");
			Array.prototype.forEach.call(saleuserList,function(item){
				
				if (item.dataset["info"] === salesuserleaderid) {
					$(item).trigger('click');
				};
			});
		} else{
			return false;
		};
	}
}

AppointmentList.prototype = {
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
	rederSaleuser: function(data){ //组别渲染
		var saleuserList_all = document.querySelector("#saleuserList_all");
		var str = "";
		var salesUserLeaderList = data.SalesUserLeaderList; //组ID
		var salesUserLeaderNameList = data.SalesUserLeaderNameList; //组名

		if (salesUserLeaderList === "" || salesUserLeaderNameList === "") 
		{
			$my.messageInfo.html("暂无组别").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		} else
		{
			salesUserLeaderList = salesUserLeaderList.split(",");
			salesUserLeaderNameList = salesUserLeaderNameList.split(",");

			for (var i = 0; i < salesUserLeaderList.length; i++) {
				str += '<li class="text-center" data-info='+salesUserLeaderList[i]+'>'+salesUserLeaderNameList[i]+'组</li>';
			};
			// sessionStorage.setItem("salesUserLeaderList",str);
			saleuserList_all.insertAdjacentHTML('afterEnd', str);
		};
	},
	getSaleUserList: function(propertyID,timeselete){ //获取案场组别
		if (propertyID != null && propertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/saleusercontroller/saleUserListApp.json',
			    data: { 
			    	"propertyID": propertyID,
			    	"timeselete":timeselete
			    },
			    async: false, //同步
			    success:function(data){
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		appointmentList.rederSaleuser(data);
			    	} else
			    	{
			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return;
			    	};
			    }
			})
		}else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		}
	},
	renderEle: function(data){
		var str = "";

		for (var i = 0; i < data.length; i++) {
			str += "<div class='row' ><div class='col-sm-8 col-xs-8 col-md-8'><div class='innerTop'>";
			str += "<p class='bigFont'><span>"+data[i].customerName+"</span>　<span>"+data[i].customerTel+"</span></p>";
			str += "</div><div class='innerBottom'>";
			str += "<p class='colorGray nowrap'><span>"+data[i].agencyName+"</span></p>";
			str += "</div></div><div class='col-sm-4 col-xs-4 col-md-4 text-right'><div class='innerTop'>";
			str += "<p class='colorGray'><span>"+data[i].bbTime+"</span></p>";
			str += "</div><div class='innerBottom'>";
			str += "<kbd class='bgcGray'><span>案</span>:<span>"+data[i].saleName+"</span></kbd>";
			str += "</div></div></div>";
		};

		$($my.wrap).append(str);
		$my.flag = false;
	},
	getData: function(propertyID,timeselete,SalesUserLeader,pageNum){
		if (propertyID != null && propertyID != "null")
		{
			$.ajax({
			    url: getRoothPath+'/saleusercontroller/appointmentListApp.json',
			    data: { 
			    	"propertyID": propertyID,
			    	"timeselete":timeselete,
			    	"SalesUserLeader":SalesUserLeader,
			    	"pageNum":pageNum
			    },
			    async: false, //同步
			    success:function(data){
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		console.log(data);
			    		$my.pageSize = data.recordsTotal; //数据总数
			    		$my.totalNum.innerHTML = data.recordsTotal;

			    		var arr = data.data;
    		        	if (arr.length) 
    		        	{	
    		        		if (arr.length < 20) {
    			    			$my.loader_inner.hide();
    			    			$my.lodingText.classList.add("lodingText_show");
    			    		};
    		        		appointmentList.renderEle(arr);
    		        	} else
    		        	{
    		        		$my.loader_inner.hide();
    		        		$my.messageInfo.html("暂无信息").stop().fadeIn("fast").delay("1000").fadeOut("slow");
    		        		return false;
    		        	};
			    	} else
			    	{
			    		$my.loader_inner.hide();
			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return;
			    	};
			    }
			})	
		}else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		}		
	},
	scrollEvent: function(){ //滑动事件
		var vpHeight = document.documentElement.clientHeight; //获取设备高度
		var loadingMore = $my.lodingText.parentNode;
		var rect = loadingMore.getBoundingClientRect();

		var index = $my.countType.querySelector(".optionListActive").dataset["index"];
		var info = $my.saleuserListID.querySelector(".activeSelect").dataset["info"]; //组id
		
		if(!$my.flag){
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
					if (info === "all") 
					{
						appointmentList.getData($my.propertyid,index,'',$my.num);
					} else
					{
						appointmentList.getData($my.propertyid,index,info,$my.num);
					};					
				};	
			}else
			{
				return;
			}
		}
	},
	buffer: function(){
		$my.lodingText.classList.remove("lodingText_show");

		var index = $my.countType.querySelector(".optionListActive").dataset["index"]; //时间维度值
		var info = $my.saleuserListID.querySelector(".activeSelect").dataset["info"]; //组id

		sessionStorage.setItem("globaltimeSelect",JSON.stringify(index)); //时间维度值存入session
		sessionStorage.setItem("saleuserListIDActive",JSON.stringify(info)); //组员id存入session

		if (index === "0" || index === "5") {
			$my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
			$my.totalNum.innerHTML = "";
			$my.loader_inner.hide();
			return false;
		} else{			
			$my.loader_inner.show();
			if (info === "all") 
			{
				appointmentList.getData($my.propertyid,index,'',0);
			} else
			{
				appointmentList.getData($my.propertyid,index,info,0);
			};			
		};	
	}
}

var appointmentList = new AppointmentList();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		propertyid: sessionStorage.getItem("propertyID"), //获取楼盘ID
		num:0, //页码
		wrap: document.querySelector("#wrap"),		
		loader_inner: $(".loader-inner"),
		lodingText: document.querySelector(".lodingText"),
		countType: document.querySelector("#countType"),
		saleuserListID: document.querySelector("#saleuserListID"),
		totalNum: document.querySelector("#totalNum"),
		flag: false //滑动标志位
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	appointmentList.getSaleUserList($my.propertyid,6); //获取组id

	//默认数据加载
	var globaltimeSelect = sessionStorage.getItem("globaltimeSelect");
	var saleuserListIDActive = sessionStorage.getItem("saleuserListIDActive");

	if (globaltimeSelect != null && globaltimeSelect != "null") {
		globaltimeSelect = JSON.parse(globaltimeSelect);
		var countTypeList = $my.countType.querySelectorAll("li[data-index]");
		countTypeList = Array.prototype.slice.call(countTypeList);

		for (var i = 0; i < countTypeList.length; i++) {
			if (countTypeList[i].dataset["index"] === globaltimeSelect) {
				$(countTypeList[i]).addClass('optionListActive').siblings("li").removeClass('optionListActive');

				var item_offset_left = $(countTypeList[i]).offset().left;
				var saleuserListID_offset_left = $($my.countType).offset().left;

				$($my.countType).stop().animate({
					scrollLeft: item_offset_left - saleuserListID_offset_left - 8
				}, 500);//500ms滑动到指定位置
			};
		};

		if (saleuserListIDActive != null && saleuserListIDActive != "null") {
			saleuserListIDActive = JSON.parse(saleuserListIDActive);
			var saleuserList = $my.saleuserListID.querySelectorAll("li[data-info]");
			saleuserList = Array.prototype.slice.call(saleuserList);

			for (var i = 0; i < saleuserList.length; i++) {
				if (saleuserList[i].dataset["info"] === saleuserListIDActive) {
					$(saleuserList[i]).addClass('activeSelect').siblings("li").removeClass('activeSelect');

					var item_offset_left = $(saleuserList[i]).offset().left;
					var saleuserListID_offset_left = $($my.saleuserListID).offset().left;

					$($my.saleuserListID).stop().animate({
						scrollLeft: item_offset_left - saleuserListID_offset_left - 8
					}, 500);//500ms滑动到指定位置
				};
			};
		};

		appointmentList.buffer(); 
	}else{
		appointmentList.getData($my.propertyid,1,'',0); 
	};

	//时间维度点击事件
	var countTypeList = $my.countType.querySelectorAll("li");
	Array.prototype.forEach.call(countTypeList,function(item){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();

			$(this).addClass('optionListActive').siblings('li').removeClass('optionListActive');
			$my.num = 0; //将页码数回归到0
			$my.wrap.innerHTML = ""; //清空内容

			appointmentList.throttle(appointmentList.buffer, this);
		}, false);
	});

	//下滑加载更多事件
	$my.wrap.addEventListener("touchmove",appointmentList.touchThrottle(appointmentList.scrollEvent, 500,1000));

	// 组别点击事件
	var saleuserList = $my.saleuserListID.querySelectorAll("li");
	Array.prototype.forEach.call(saleuserList,function(item){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();

			$(this).addClass('activeSelect').siblings('li').removeClass('activeSelect');
			$my.num = 0; //将页码数回归到0
			$my.wrap.innerHTML = ""; //清空内容

			appointmentList.throttle(appointmentList.buffer, this);
		}, false);
	});

	appointmentList.pipeFn(); //组别trigger
});