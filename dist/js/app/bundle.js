
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

    



  function _Scroll(section,nav){
       this.aDiv = section;
       this.oNav = nav;
       this.aNav = this.oNav.find('li');
       this.scroll();
       this.navClick();
}
  _Scroll.prototype.scroll = function(){
    	$(window).scroll(function(){
				 if($(window).scrollTop()>=$('#scrollTop').height()){
				 	$("#topNav").addClass('small-nav');
           	}else{
               $("#topNav").removeClass('small-nav');
             }
      });
}
  _Scroll.prototype.navClick = function(){
      var _this = this;
      this.aNav.click(function(){
				var t = _this.aDiv.eq($(this).index()+1).offset().top;
				$('body').animate({"scrollTop":t},800);

			});
 }
  var Scroll = (function(){
    return {
      init: function(section,nav){
            new _Scroll(section,nav);
        }
    }
  })();
  module.exports = Scroll;



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



