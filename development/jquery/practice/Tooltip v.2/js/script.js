$(document).ready(function() {

	var $parent, windowWidth, windowHeight;

	//get widndow size

	function winSize() {
		widndowWidth = $(window).width();
		windowHeight = $(window).height();
	}

	winSize();
	$(window).resize(winSize);	


	//hover
	$(".tooltip").each(function() {

		$(this).parent().hover(function() {
			$(this).find(".tooltip").show();

		}, function() {
			$(this).find(".tooltip").hide();
		});

	});

	//toltip position

	$(document).mousemove(function(e) {
		var mouseY = e.clientY,
				mouseX = e.clientX,
				tooltipHeight,
				tooltipWidth;

		$(".tooltip").each(function() {

			var $tooltip = $(this),
			$parent = $tooltip.parent()
			tooltipHeight = $tooltip.outerHeight();
			tooltipWidth = $tooltip.outerWidth();

			$tooltip.css({
				'left':mouseX,
				'top':mouseY+25
			});


			//reposition 
			if (tooltipWidth + mouseX > widndowWidth) {
				$tooltip.css('left',mouseX - tooltipWidth -20);
			};

			if (tooltipHeight + mouseY + 20 > windowHeight) {
				$tooltip.css('top',mouseY - tooltipHeight - 20);
			};


		});//END each
	});//END mousemove

});//End Ready