$.fn.xRay = function() {

	return this.each(function() {

		var th            = $(this),
				dataImage     = th.data('image'),
				dataImageZoom = th.data('image-zoom'),
				dataSize      = th.data('size');

		th.addClass('xRay')
			 .append('<img class="data-image" src="'+ dataImage +'"><div class="xRay-zoom"><img src="'+ dataImageZoom +'"></div>')
			 .find('.data-image')
			 		.css({
			 			'width': th.width()
			 		})
			 .parent()
			 .find('.xRay-zoom')
			 		.css({
			 			'width': dataSize,
			 			'height': dataSize
			 		})
			 		.find('img')
			 			.css({
			 				'position':'absolute',
			 				'width': th.width
			 			})
			 		.parent()
			 	.parent()
			 	.hover(function() {
			 		th.find('.xRay-zoom').stop().fadeIn();
			 	}, function() {
			 		th.find('.xRay-zoom').stop().fadeOut();
			 	});

		

		th.mousemove(function(e) {
			var elemPos = {},
				offset  = th.offset();
				
			elemPos = {
				left: e.pageX - offset.left - dataSize/2,
				top: e.pageY - offset.top - dataSize/2
			}

			th
			.find('.xRay-zoom').css({
				'top' : elemPos['top'],
				'left': elemPos['left']
			})
				.find('img').css({
					'top'  : -elemPos['top'],
					'left' : -elemPos['left'],
					'width': th.width()
				})

		});

	});//END return
};
