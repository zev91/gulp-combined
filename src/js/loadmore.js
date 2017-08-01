
  function _Loadmore($btn){
   this.$btn = $btn;
   this.fragment = [];
   this.curIndex = 0;
   this.ajaxNews();
 }
  _Loadmore.prototype.ajaxNews= function(){
    var _this =this;
    $.ajax({
    url: "news.json",//json文件位置
    type: "GET",//请求方式为get
    dataType: "json", 
    success: function(news) {
     _this.appendHtml(news);
   }
})
  }
 _Loadmore.prototype.appendHtml = function(data){
     var _this =this;
      var html = '';
      this.$btn.on('click',function(){
          for(i=0;i<3;i++){
             html = '<div class="col-md-4 col-sm-6 portfolio-cell isVisible">'
             + '<div class="portfolio-hover">'
             +'<div class="portfolio-hover-body">'
            +'<i class="fa fa-plus fa-3x"></i></div>'
             +'<img src="'+data.news[_this.curIndex+i].img+'"></div>'
            +'<div class="portfolio-info"><h4>'+data.news[_this.curIndex+i].title+'</h4>'
            +' <p class="text-muted">'+data.news[_this.curIndex+i].brif+'</p></div></div>';
             _this.fragment.push(html);
      }
      _this.curIndex +=3;
      if(_this.curIndex>=9){
          _this.$btn.attr({"disabled":"disabled"}).text('加载完毕');
        }

        $('.addrow').append(_this.fragment);  
         _this.fragment = [];
      })
    };
    var Loadmore = (function(){
      return {
      init : function($ct){
        $ct.each(function(index,node){
          new _Loadmore($(node));
        })
      }
    }
    })();
     module.exports =  Loadmore;

 
    

