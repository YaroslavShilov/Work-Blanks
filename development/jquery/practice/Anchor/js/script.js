
	function slowScroll(id) {
			var offset = 0;//количество отступов сверху, если шапка сайта фиксированная
			$('html, body').animate({
				scrollTop: $(id).offset().top - offset
			}, 500);
			return false;
		}
