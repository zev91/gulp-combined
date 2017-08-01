
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

