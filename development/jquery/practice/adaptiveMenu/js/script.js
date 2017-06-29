$(document).ready(function() {

	$(".menu-trigger").click(function() {
		$("nav ul").slideToggle(500);
	});
	$(window).resize(function() {
		if($(window).width() > 480) {
			$("nav ul").removeAttr("style");
			//$("nav ul").css("display","block");
		};
	});

});//End Ready