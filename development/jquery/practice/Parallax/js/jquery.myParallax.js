;(function($) {

	$.fn.myParallax = function() {

		return this.each(function() {

			ths = $(this);

			ths
				.css({
					'min-height': '400px',
					'postion': 'relative',
					'overflow': 'hidden'
				})
				.wrapInner('<div class="parallax-content" style="position:relative; z-index:9999"></div>')
				.prepend('<div class="image-parallax" style="z-index:999;background-image:url(' + ths.data('parallax-image') +');background-size: cover;backgroun-position:top;postion: absolute; top: 0; width: 100%;"></div>');


				function parallaxInit() {

					var pheight = ths.height();

					ths.children('.image-parallax').css({
						'height': pheight*2,
						'top': -pheight*.5
					});

				};


				$(window).scroll(function() {
					parallaxInit() 
				}).load(function() {
					parallaxInit()
				});
				$('*').resize(function() {
					parallaxInit()
				})
		

		});
	};
})(jQuery);//End Ready