
  function _Totop($btn){
      this.$btn = $btn;
      this.scroll();
      this.btnclick();
  }
  _Totop.prototype.scroll = function(){
      var _this =this;
      $(window).on('scroll',function(){
         console.log($(window).scrollTop())
      if($(window).scrollTop()>700){
          // console.log($(window).scrollTop())
          _this.$btn.addClass('right-show');
          console.log('no');
      }else{
          if(_this.$btn.hasClass("right-show")){
            _this.$btn.removeClass("right-show")
          }else{
            return;
          }
      }
      })
      
  }
  _Totop.prototype.btnclick = function(){
      this.$btn.on('click',function(){
    	$('html,body').animate({ scrollTop: 0 }, 700);
      })
  }
  Totop = (function(){
    return {
      init : function($ct){
        $ct.each(function(index,node){
          new _Totop($(node));
        })
      }
    }
  })();
 Totop.init($('#totop'));



