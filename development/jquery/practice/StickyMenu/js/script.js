$(document).ready(function() {

$(".show-navPos, .show-winPos").css("display","block");

var navPos, winPos, navHeight;

function refresVar() {

	navPos = $("nav").offset().top;
	navHeight = $("nav").outerHeight(true);// outerHeight() - без учета margin, outerHeight(true) - с учетом margin
	$(".show-navPos").text(navPos);
	
};

refresVar();
$(window).resize(refresVar);//отслеживает изменения окна и выполняет функцию

	$("<div class='clone-nav'></div>").insertBefore("nav").css("height", navHeight).hide();//Вставляем перед "nav"


$(window).scroll(function() {//отслеживает изменения скрола окна и выполняет функцию
	winPos = $(window).scrollTop();
	$(".show-winPos").text(winPos);

	if (winPos >= navPos) {
		$("nav").addClass("fixed shadow");
		$(".clone-nav").show();
	} else {
		$("nav").removeClass("fixed shadow");
		$(".clone-nav").hide();
	};
});



});//End Ready