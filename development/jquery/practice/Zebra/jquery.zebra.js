;(function($){
	$.fn.zebra = function(options) {
		var options = $.extend({
			bgEven: "#c2c2c2",
			bgOdd: "yellow",
			bgEvenHover: "red",
			bgOddHover: "green",
			colorHover: "#fff"
		}, options);

		return this.each(function() {
			//Четные строки
			$(this).find("tr:even").css({
				"background": options.bgEven
			}).hover(
								function(){
									color = $(this).css("color");
									$(this).css({
										"background": options.bgEvenHover,
										"color": options.colorHover
									});
								},
								function(){
									$(this).css({
										"background": options.bgEven,
										"color": color
									});
								}
							);

			//Нечетные строки
			$(this).find("tr:odd").css({
				"background": options.bgOdd
			}).hover(
								function(){
									color = $(this).css("color");
									$(this).css({
										"background": options.bgOddHover,
										"color": options.colorHover
									});
								},
								function(){
									$(this).css({
										"background": options.bgOdd,
										"color": color
									});
								}
							);;
		});
	};
})(jQuery);