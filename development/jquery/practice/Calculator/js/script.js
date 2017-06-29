$(document).ready(function() {

	function calcul() {

		$(".calcul div input").keydown(function(event) {
        // Разрешаем: backspace, delete, tab и escape
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
             // Разрешаем: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // Ничего не делаем
                 return;
        }
        else {
            // Обеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });


		//Задаем значения		
		var doc   = $('#doc').val() * 200,
		    peopl = $('#peopl').val() * 500,
		    cofe  = $('#cofe:checked').val();

		    if (cofe == undefined) {
		     	cofe = 0;
		    }


		//Преобразуем в числа
		doc   = parseInt(doc);
		peopl = parseInt(peopl);
		cofe  = parseInt(cofe);

		
		//Начинаем считать и выводим
		price = cofe+doc+peopl;

		$('.calcul span').text(price);
	
	}//end function


	$('.calcul div input').change(function() {calcul()});

});//End Ready