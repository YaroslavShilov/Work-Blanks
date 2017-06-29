$(document).ready(function() {

	$(".tab-content>div:not(:first-child)").hide();
	$("<div class='line'></div>").appendTo(".tab-menu li");
	$(".tab-menu li:first-child").find(":first").width("100%");

	$(".tab-menu li").each(function(i) {
		$(this).attr("data-tab", "tab"+i);
	});
	$(".tab-content > div").each(function(i) {
		$(this).attr("data-tab", "tab"+i);
	});

	$(".tab-menu li").on("click",function() {

		var dataTab = $(this).data("tab");
		var getWrapper = $(this).closest(".tab-wrapper");
		var line = $(this).find(".line");

		getWrapper.find(".tab-menu li").removeClass("active");
		$(this).addClass("active");

		getWrapper.find(".line").width(0);
		line.animate({"width":"100%"}, "fast");

		getWrapper.find(".tab-content>div").hide();
		getWrapper.find(".tab-content>div[data-tab="+dataTab+"]").show();

	});
});//End Ready