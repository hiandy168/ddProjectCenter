/*
* @Author: Administrator
* @Date:   2017-04-13 14:21:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-12 16:59:51
*/

'use strict';
function Login(){
};

Login.prototype = {
	constructor: Login,
	_throttle:function(method,context){ //节流函数
        clearTimeout(method.tId);
        method.tId=setTimeout(function(){
            method.call(context);
        },500);
    },
	_getPropertyIDarr: function() { //获取楼盘id
		var url = window.location.href;
		
		if (url.indexOf("propertyIDarr") != -1) 
		{
			var propertyIDarr = window.location.search;
			propertyIDarr = propertyIDarr.split("=")[1];
			sessionStorage.setItem("propertyIDarr",propertyIDarr);

			return propertyIDarr;
		} else
		{
			// $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};			
	},
	getAllProperty: function() { //获取所有楼盘
		var getAllPropertyIDarr = login._getPropertyIDarr();

		if (getAllPropertyIDarr !== false) 
		{
			$.ajax({
			    url: getRoothPath+'/overview/getAllProperty.json',
			    data: { "PropertyIDarr": getAllPropertyIDarr},
			    async: false, //同步
			    success:function(data){
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		var propertyArr = data.AllProperty;

			    		if (propertyArr.length !== 0) 
			    		{
			    			var str = "";
			    			for (var i = 0,len = propertyArr.length; i < len; i++) {
			    				str += "<li class='list-group-item' data-id="+propertyArr[i].ID+">"+propertyArr[i].PropertyName+"</li>";
			    			};
			    			housesList.innerHTML = str;
			    		} else
			    		{
			    			$my.messageInfo.html("楼盘数据为空").fadeIn("fast").delay("1000").fadeOut("slow");
			    			return false;
			    		};		    		
			    	} else
			    	{
			    		$my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
			    		return false;
			    	};
			    }
			})
		} else
		{
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	selectProperty: function(){ //选择楼盘
		var myModal = document.querySelector("#myModal");
		var allProperty = housesList.querySelectorAll("li[data-id]"); //Nodelist
			// allProperty = Array.prototype.slice.call(allProperty); //Array

		Array.prototype.forEach.call(allProperty,function(item){
			item.addEventListener("click", function(event){
				event.preventDefault();
				event.stopPropagation();

				var val = this.innerHTML;
				var propertyid = this.dataset["id"];

				$(this).addClass('activeSelect').siblings("li").removeClass('activeSelect');

				setTimeout(function() {$(myModal).modal('hide');}, 500);

				property.value = val;
				property.dataset["propertyid"] = propertyid;
				sessionStorage.setItem("propertyID",propertyid); //楼盘ID存入sessionStorage
			}, false);
		});
	},
	enter: function(){ //登录事件
		var submit = document.querySelector("#submit");
		var click = function() {
			var val = property.value;
			if (!val) 
			{
				$my.messageInfo.html("请选择楼盘").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			} else
			{
				// var id = property.dataset["propertyid"];
				property.value = "";
				// window.location.href = "src/html/index_xzyj.html?propertyID="+id;
				window.location.href = "src/html/index_xzyj.html";
			};			
		};

		submit.addEventListener("touchend", function(event){
			event.preventDefault();
			event.stopPropagation();

			login._throttle(click, this);
		}, false);
	},
	init: function() {
		this.getAllProperty();
		this.selectProperty();
		this.enter();
	}
}

var login = new Login();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo")
	}
	var housesList = document.querySelector("#housesList");
	var property = document.getElementById("property");

	!function(){// 清除sessionStorage
		sessionStorage.removeItem('anchangSaleUserList');
		sessionStorage.removeItem('saleuserListIDActive');
		sessionStorage.removeItem('anchangGroupData');
		sessionStorage.removeItem('acGroupActive');

		sessionStorage.removeItem('liandongSaleUserList');
		sessionStorage.removeItem('saleuserListID_ld_Active');
		sessionStorage.removeItem('liandongGroupData');
		sessionStorage.removeItem('ldGroupActive');
		sessionStorage.removeItem('globaltimeSelect');
		sessionStorage.removeItem('globalPeopleID');
	}()

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	login.init(); //调用init
});