
  function _Carousel($ct){
  this.$ct = $ct;
  this.init();
  this.bind();
  this.windowR();
  this.autoPlay();
}
_Carousel.prototype.windowR = function(){
  var _this = this;
  $(window).resize(function() {
     _this.$imgCt.width($(window).width()*_this.$imgCt.children().length);
     _this.$imgCt.css('left',-_this.curIndex*$(window).width())

  })
}

_Carousel.prototype.init = function(){
  
  var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),

      $bullet = this.$bullet = this.$ct.find('.bullet-ct ul li')
      this.$firstImg =  $imgCt.find('li').first();
      this.imgWidth = this.$firstImg.width();
      this.$lastImg = $imgCt.find('li').last();
      this.isAnimit = false;
      this.curIndex = 0;
      $imgCt.append(this.$firstImg.clone());
      $imgCt.prepend(this.$lastImg.clone());
      $length = this.$length = $imgCt.children().length;
      $imgCt.width($(window).width()*$imgCt.children().length);
      $imgCt.css('left','-100%');

}
_Carousel.prototype.bind = function(){
      var _this = this;
      this.$bullet.on('click',function(){
        _this.playTo($(this).index());

      })
}   
_Carousel.prototype.playTo = function (n){
            var _this = this;
            if(this.isAnimate === true) return;
            this.isAnimate = true;
            this.$bullet.removeClass('active').eq(n).addClass('active');
            this.$imgCt.animate({
                left:  (-n-1)*$(window).width()
            },function(){
                _this.curIndex = n;
                _this.isAnimate = false;
            })
        }
_Carousel.prototype.next = function(){
     var _this = this;
      if(this.isAnimit) return;
      this.isAnimit = true;
      this.$imgCt.animate({left: '-=100%'},function(){
          _this.curIndex++;
          if (_this.curIndex===_this.$length-2) {
            _this.$imgCt.css('left','-100%');
            _this.curIndex = 0;
          }
          
          _this.isAnimit = false;
          _this.setBullet() 
        });   
         
}
_Carousel.prototype.pre = function(){
     var _this = this;
     
      if(this.isAnimit) return;
      this.isAnimit = true;
      this.$imgCt.animate({left: '+=100%'},function(){
        _this.curIndex--;
        if (_this.curIndex<0) {
           _this.$imgCt.animate({left: -(_this.$length*$(window).width())},function(){
             _this.curIndex = _this.$length-1;
           })
 
          
        }
        console.log(_this.curIndex);
        _this.isAnimit = false;
        _this.setBullet()  
       });   
        
}

_Carousel.prototype.setBullet = function(){
    this.$bullet.removeClass('active').eq(this.curIndex).addClass('active');
}
_Carousel.prototype.autoPlay = function(){
    var _this = this;
    clock=setInterval(function(){
      _this.next();
    },3000);
  }
  Carousel = (function(){
    return {
      init : function($ct){
        $ct.each(function(index,node){
          new _Carousel($(node));
        })
      }
    }
  })();
 module.exports = Carousel;

 

