$(document).ready(()=>{const s=()=>$("html, body").animate({scrollTop:0},"200"),o=$(".scroll-top"),e=$(".menu"),t=()=>{(()=>{const s=$(window).scrollTop();s>110?$(".header").addClass("header__sticky"):0===s&&$(".header").removeClass("header__sticky")})(),$(window).scrollTop()>1300?o.addClass("show"):o.removeClass("show")};$(".works-carousel").owlCarousel({loop:!0,margin:15,nav:!0,navText:['<img src="res/icons/arrow-left.svg" alt="left button">','<img src="res/icons/arrow-right.svg" alt="right button">'],dots:!1,autoHeight:!1,responsive:{0:{items:1.3}}}),$(".contributor-carousel").owlCarousel({loop:!0,margin:50,nav:!0,navText:['<img src="res/icons/arrow-left.svg" alt="arrow left">','<img src="res/icons/arrow-right.svg" alt="arrow right">'],dots:!1,responsive:{0:{items:1}}}),$("ul.tabs__caption").on("click","li:not(.active)",(function(){$(this).addClass("active").siblings().removeClass("active").closest("section.tabs").find("div.tabs__content").removeClass("active").eq($(this).index()).addClass("active")})),o.on("click",s),$(".logo").on("click",s),$(window).scroll(()=>{t()}),e.on("click",()=>$(".aside-menu").toggleClass("show"))});
//# sourceMappingURL=out.js.map