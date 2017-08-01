
  function Exposure($target,callback){
       this.$target = $target;
       this.callback = callback;
       this.bind();
       this.check();
   }

   Exposure.prototype.isShow = function(){
      var windowHeight = $(window).height(),
      scrollTop = $(window).scrollTop(),
      offsetTop = this.$target.offset().top,
      nodeHeight = this.$target.outerHeight(true);
      navHeight = $('.small-nav').height()+20;
      if(navHeight + scrollTop > offsetTop && navHeight + scrollTop < offsetTop + nodeHeight) {
                return true;
            }
            else {
                return false;
            }
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

    var Lazy = (function(){
      return {
        init: function($target,callback){
          $target.each(function(idx,img){
            new Exposure($(img),callback);
          })
        }
      }
    })();
     module.exports =  Lazy;

    

