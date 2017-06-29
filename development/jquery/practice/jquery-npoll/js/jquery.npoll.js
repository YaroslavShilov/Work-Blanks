;(function($){

	var defaults = {
		question: "Какая ваша любимая JS библиотека?",
		url: "",
		buttonText: "Ответить",
		categories: ["jQuery", "YUI", "Dojo", "ExtJS", "Zepto"]
	};
	$.fn.npoll = function() {

		return this.each(function(options) {

			var config = $.extend({},defaults, options);

			var jfirst = $(this).first();

			$("<h1/>",{
				text: config.question
			}).appendTo(jfirst);

			var form = $("<form/>").appendTo(jfirst);
			
			var x, y, categories = config.categories;

			for(x = 0, y = categories.length; x < y; x++ ) {

				$("<input/>",{
					type: "radio",
					name: "categories",
					id: categories[x],
					value: categories[x]
				}).appendTo(form);

				$("<label/>",{
					text: categories[x],
					"for": categories[x]
				}).appendTo(form);

			};

			$("<button/>",{
				text: config.buttonText
			}).appendTo(jfirst);

		});
	};
})(jQuery);