$(document).ready(function() {

	var width = $(".slider-container").width();

	$(".slides>li").width(width);
	$(".slides").width(width*$(".slides>li").length);

	//positioning

	$(".slides").css("left",-width);
	$(".slides>li:last-child").prependTo(".slides");

	//move slides forward

	function nextSlide() {
		$(".slides").animate({
			"margin-left": -width
		},500, function() {
			$(".slides>li:first-child").appendTo(".slides");
			$(".slides").css("margin-left", 0);
		});
	}

	//move slides backwards

	function prevSlide() {
		$(".slides").animate({
			"margin-left": width
		},500, function() {
			$(".slides>li:last-child").prependTo(".slides");
			$(".slides").css("margin-left", 0);
		});
	}


	//controls
	$(".next").click(nextSlide);
	$(".prev").click(prevSlide);

});//End Ready