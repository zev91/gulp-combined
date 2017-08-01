var Carousel = require('./carousel');
var Lazyload = require('./lazyload');
var Loadmore = require('./loadmore');
var Nav = require('./nav-animate');
var Scroll = require('./scroll');
var Toptop = require('./totop');
  Carousel.init($('.carousel'));
  Lazyload.init($('.portfolio-cell img'),function($node){
      var _this =this;
      setTimeout(function(){
        _this.showImg($node);
      },800)
      
    });
  Lazyload.init($('.isHidden'),function($div){
      var _this =this;
      setTimeout(function(){
        _this.setClass($div);
      },100)
    });

    Loadmore.init($('#change'));
   Nav.init($('body > .section'),function($node){
        var index = $node.index('.section');
        var oNav = $('.navbar-right');
        var aNav = oNav.find('li');
        aNav.removeClass('active');
		  	aNav.eq(index-1).addClass('active');
       if(!index){
        aNav.removeClass('active');
       }
    });

 Scroll.init($('body .section'),$('.navbar-right'));
 Totop.init($('#totop'));
  


 