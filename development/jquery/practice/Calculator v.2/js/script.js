$(document).ready(function() {

	//.change() - проверяет, меняется ли селект
	$('.calc select').change(function() {
		var $edition 			= $('select#card_edition').val(),
				$paper 				= $('select#card_paper').val(),
				$color 				= $('select#card_color').val(),
				$print_file   = $('select#card_color option:selected').attr('data-print-file'),
				$paper_ratio  = $('select#card_paper option:selected').attr('data-paper-ratio'),
				$color_format = $('select#card_color option:selected').attr('data-color'),
				$print        = $('select#card_color option:selected').attr('data-print'),
				$division 		= 30,
				$final_edition = $edition / $division,
				$price         = $final_edition * $paper_ratio + parseInt($print_file) + $final_edition * $print;

				$('#final_price').text($price);

		//изменение картинок
		if ($color_format == 1) {
			$('.card-images img').hide();
			$('#card_1_0').show();
		} else if ($color_format == 2) {
			$('.card-images img').hide();
			$('#card_1_1').show();
		} else if ($color_format == 3) {
			$('.card-images img').hide();
			$('#card_4_0').show();
		} else if ($color_format == 4) {
			$('.card-images img').hide();
			$('#card_4_1').show();
		} else if ($color_format == 5) {
			$('.card-images img').hide();
			$('#card_4_4').show();
		}
	});

});//End Ready