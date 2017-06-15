var getRoothPath = "";//本地
//var getRoothPath = "";//正式库
// var getRoothPath = "";//测试库

$(function() { 
	// var userId = document.getElementById("userId").innerHTML;
	
	//tab栏切换
	var navList = $("#nav li");

    navList.on('click', function () {
	    $(this).addClass('active').siblings("li").removeClass('active');
	    var num = "";
	    num = $(this).children('a').attr("data-info");
	    if(num == 4){
	        window.location.href = "index_qdzx.html";
	    }else if(num == 3){
	        window.location.href = "index_jczs.html";
	    }else if(num == 2){
	        window.location.href = "index_fyxk.html";
	    }else if(num == 1){
	        window.location.href = "index_xzyj.html";
	    }
	});

	// //回到顶部
	var topBtn = document.querySelector(".topBtn");

	topBtn.addEventListener("touchstart", function(event){
		event.preventDefault();
		event.stopPropagation();

		$("html,body").stop().animate({
		"scrollTop":0
		},300);

		this.style.opacity = "1";
	}, false);

	topBtn.addEventListener("touchend", function(event){
		event.preventDefault();
		event.stopPropagation();

		var self = this;
		setTimeout(function(){
			self.style.opacity = "0.3";
		}, 1000);
	}, false);
	
});
