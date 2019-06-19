<?php
	$name = $_POST["name"] ? $_POST["name"] : 0;
	$email = $_POST["email"] ? $_POST["email"] : 0;
	$number = $_POST["number"] ? $_POST["number"] : 0;
	$text = $_POST["textarea"] ? $_POST["textarea"] : 0;
	$title = $_POST["title"];
	$form = $_POST["form"];
	
	if ( ($form == '1' or $form == '2') and ((mb_strlen($name) < 2) or (mb_strlen($name) > 80 )) ) {
		$resData['status'] = 0;
		$resData['massage'] = 'Ошибка<hr class="hr_message">Пожалуйста, введите корректное имя!';
	}
	elseif ( $form == '1' and !preg_match("/^(?:[a-z0-9]+(?:[-_.]?[a-z0-9]+)?@[a-z0-9_.-]+(?:\.?[a-z0-9]+)?\.[a-z]{2,5})$/i", $email) )  {
		$resData['status'] = 0;
		$resData['massage'] = 'Ошибка<hr class="hr_message">Пожалуйста, введите почту!';
	}
	elseif ($form == '2' and (mb_strlen($number) != 17)) {
		$resData['status'] = 0;
		$resData['massage'] = 'Ошибка<hr class="hr_message">Пожалуйста, введите контактный телефон!';
	}
	elseif (($form == '1') and (mb_strlen($text) <= 3) ) {
		//d($text);
		$resData['status'] = 0;
		$resData['massage'] = 'Ошибка<hr class="hr_message">Нужно использовать не менее 10 символов!';
	}
	elseif (($form == '1') and (mb_strlen($text) > 700) ) {
		$resData['status'] = 0;
		$resData['massage'] = 'Ошибка<hr class="hr_message">Можно использовать не более 700 символов!';
	}
	else {
		$to = 'fodesign@gmail.com';
		$from = 'info@fodesign.ru';
		$title = "Клиент $name, $number";
	
		// Текст письма 'Я работаю над '.$name.' "Я работаю над $name"
		$mess = "
				<h1>Новая заявка!</h1>
				<p style='text-align: center'>$title</p>
				<p>Имя: <b>$name</b></p>
				<p>Емейл: <b>$email</b></p>
				<p>Номер: <b>$number</b></p>
				<p>Текст: $text</p>
			";
		$time = date('H:i d.m.Y', time());
	
		// функция, которая отправляет наше письмо
		$headers = 'From: u-modno.ru <' . $from . '>' . "\r\n";
		$headers .= "Content-type: text/html; charset=\"utf-8\"";
		mail($to, $title, $mess, $headers);
	
		$resData['status'] = 1;
		$resData['massage'] = 'Спасибо, заявка отправлена!<hr class="hr_message">Мы свяжемся с вами в течение 5-10 минут';
	}
	
	
	echo json_encode($resData);
	
	
	function d($value = null, $die = 1){
		echo 'Debug: <br /><pre>';
		print_r($value);
		echo '</pre>';
		if($die) die;
	}

?>