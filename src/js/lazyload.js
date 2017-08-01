
  function Exposure($target,callback){
       this.$target = $target;
       this.callback = callback;
       this.bind();
       this.check();
   }
    Exposure.prototype.bind = function(){
      var _this = this;
      $(window).on('scroll',function(){
        _this.check();
      });
    }
    Exposure.prototype.check = function(){
                if(this.isShow(this.$target)){
                    this.callback(this.$target);
                }
    }
    Exposure.prototype.isShow = function(){
      var windowHeight = $(window).height(),
      scrollTop = $(window).scrollTop(),
      offsetTop = this.$target.offset().top,
      nodeHeight = this.$target.outerHeight(true);
      if(windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight) {
                return true;
            }
            else {
                return false;
            }
    }
    Exposure.prototype.showImg= function($img){
      var imgUrl = $img.attr('data-src');
      $img.attr('src', imgUrl);
    }
    Exposure.prototype.setClass= function($div){
      $div.removeClass('isHidden').addClass('isVisible');
    }
   
    var Lazy = (function(){
      return {
        init: function($target,callback){
          $target.each(function(idx,img){
            new Exposure($(img),callback);
          })
        }
      }
    })();
     module.exports = Lazy;


   
    
 