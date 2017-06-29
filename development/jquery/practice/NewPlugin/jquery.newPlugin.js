;(function($) {
	$.fn.newPlugin = function(options) {
		options = $.extend({
			textDecoration: "none",
			bgColor: "#000",
			color: "#fff"
		}, options);
		return this.each(function() {
			$(this).css({
				"text-decoration": options.textDecoration,
				"background": options.bgColor,
				"color": options.color
			});
		});
	};
})(jQuery);

