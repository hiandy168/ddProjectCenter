/*
 *搜索关键字高亮显示
 */
function encode(s) {
  return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/([\\\.\*\[\]\(\)\$\^])/g, "\\$1");
};

function decode(s) {
  return s.replace(/\\([\\\.\*\[\]\(\)\$\^])/g, "$1").replace(/>/g, ">").replace(/</g, "<").replace(/&/g, "&");
};

function highlight(s) {
  if (s.length == 0) {
    // alert('搜索关键词未填写！');
    return false;
  };

  s = encode(s);
  var obj = document.getElementById("qdCompanyList");
  var t = obj.innerHTML.replace(/<span\s+class=.?highlight.?>([^<>]*)<\/span>/gi, "$1");
  obj.innerHTML = t;
  var cnt = loopSearch(s, obj);
  t = obj.innerHTML;
  var r = /{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g;
  t = t.replace(r, "<span class='highlight'}>$1</span>");
  obj.innerHTML = t;
  // alert("搜索到关键词" + cnt + "处")
};

function loopSearch(s, obj) {
  var cnt = 0;
  if (obj.nodeType == 3) {
    cnt = replace(s, obj);
    return cnt;
  };
  for (var i = 0, c; c = obj.childNodes[i]; i++) {
    if (!c.className || c.className != "highlight")
      cnt += loopSearch(s, c);
  };
  return cnt;
};

function replace(s, dest) {
  var r = new RegExp(s, "g");
  var tm = null;
  var t = dest.nodeValue;
  var cnt = 0;
  if (tm = t.match(r)) {
    cnt = tm.length;
    t = t.replace(r, "{searchHL}" + decode(s) + "{/searchHL}")
    dest.nodeValue = t;
  };
  return cnt;
};


function SearchList() {  
}

SearchList.prototype = {
  renderEle: function(data) { //渲染DOM
    var str = "";

    for (var i = 0; i < data.length; i++) {
      str += "<li class='list-group-item' data-id="+data[i].ID+">"+data[i].AgencyName+"</li>";
    };

    $my.qdCompanyList.innerHTML = str;

    $my.searchBtnHidden.trigger('click'); //触发高亮事件
  },
  throttle: function(method,delay,duration){ //input节流
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
  bindEvent: function(){ //搜索事件
    var val = this.value;
    var noCompany = document.querySelector(".noCompany");

    if ($my.propertyid != null && $my.propertyid != "null") {
      $.ajax({
          url: getRoothPath+'/agencycompanycontroller/getAgencyName.json',
          // async: false, //同步
          data: {"agencyName": val,"propertyID":$my.propertyid},
          success:function(data){
            console.log(data);
            if (JSON.stringify(data) != "{}") 
            {
              var json = data.data;
              if (json.length != 0) 
              {
                noCompany.style.display = "none";
                searchList.renderEle(json);
              } else
              {
                $my.qdCompanyList.innerHTML = "";
                noCompany.style.display = "block";
              };
            } else
            {
              noCompany.style.display = "block";
            };
          }
      })
    } else{
      $my.messageInfo.html("楼盘参数丢失").stop().fadeIn("fast").delay("1000").fadeOut("slow");
      return false;
    };  
  },
  inputClear:function(){ //搜索框清除点击事件
    var cancelFont = document.querySelector(".cancelFont");

    cancelFont.addEventListener("touchend", function(e){
      e.preventDefault();
      e.stopPropagation();

      s.value = "";
      // searchList.bindEvent();
    }, false);
  },
  cancelEvent:function(){ //取消点击
    var cancelBtn = document.querySelector("#cancelBtn");

    cancelBtn.addEventListener("touchend", function(e){
      e.preventDefault();
      e.stopPropagation();

      window.history.go(-1);
    }, false);
  },
  agencyCompany: function(){
    $($my.qdCompanyList).on('click', 'li', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var agencyID = this.dataset["id"];
      
      window.location.href = "newChannel_detail.html?agencyid="+agencyID;
    });
  }
}

var searchList = new SearchList();

$(function() {
  var s = document.querySelector("#s");

  window.$my={
    messageInfo:$(".messageInfo"),
    qdCompanyList: document.querySelector("#qdCompanyList"),
    searchBtnHidden:$(".searchBtnHidden"),
    propertyid: sessionStorage.getItem("propertyID")
  }

  //设置全局ajax
  $.ajaxSetup({
    type: 'POST',
    dataType: 'json',
    error: function() {
      $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
    }
  });

  //input框搜索事件
  s.addEventListener("input", searchList.throttle(searchList.bindEvent,500,1000), false);  

  //搜索框清除点击事件
  searchList.inputClear();

  //取消点击 
  searchList.cancelEvent();

  //渠道公司点击事件
  searchList.agencyCompany();
});