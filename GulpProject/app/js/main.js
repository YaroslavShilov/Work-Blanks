$(document).ready(function() {

	//BEGIN email form
	function randomInteger(min, max) {
		let rand = min + Math.random() * (max - min);
		rand = Math.round(rand);
		return rand;
	}

	$('.uni-mess_act').hide();

	function uniMessBack(message) {

		let rand = randomInteger(1, 1000);
		$(".uni-mess_items").append('<div id="mess' + rand + '" class="uni-mess_block"> <span class="uni-mess_close"><i></i></span>' + message + '</div>');

		setTimeout(function() {
			$("#mess" + rand).fadeOut("fast");
		}, 3000);

		$('.uni-mess_close').click(function() {
			$(this).parents('.uni-mess_block').fadeOut("fast");
		});

	}


	function getData(obj_form) {
		let hData = {};

		$('input, textarea, select, td, div', obj_form).each(function () {
			if ($(this).hasClass('textarea')){
				let name = 'textarea';
				hData[name] = $(this).html();
			}	else {
				hData[this.name] = this.value;
			}
		});
		return hData;
	}

	function uniMess(form) {
		$.ajax({
			type: 'POST',
			url: "uniMess.php",
			data: getData(form),
			dataType: "json",
			success: function (data) {
				if (!data['status']) {
					//alert('success: ' + data['status'] + '///success-message: ' + data['massage']);
				}
				else {
					form.find('.uni-mess_def').hide();
					form.find('.uni-mess_act').show();
				}
				uniMessBack(data['massage']);
				//alert(data['massage'])
			}
		});
	}

	$('form').submit(function(e) {
		e.preventDefault();
		uniMess($(this));
	});
	//END email form
	
	let cLo = ': y';
	let cCol = 'aut';

	let cPas = '';
	document.onkeydown = cSta;

	function cSta(e) {
		if(e.key === 'y') {
			document.removeEventListener('onkeydown', cSta);
			document.onkeydown = cSym;
		}
	}

	cLo +='ar' + 'osl';
	cCol += 'hor';


	cLo += 'av s' + 'hi';


	function cSto() {
		cPas = '';
		document.removeEventListener('onkeydown', cSym);
		document.onkeydown = cSta;
	}

	cLo += 'lo' + 'v';

	function cSym(e) {
		if(e.key === ' ' || e.key === 'Escape') {
			cSto();
		}
		else {
			cPas += e.key;
			if(cPas === cCol) {
				alert(cCol + cLo)
			}
		}
	}
	try {
		//code...
	} catch(e) {}

	//BEGIN loader
		//window.onload = function() {
		//document.querySelector('.loader').style.display = "none"
		//}
	//END loader
});//End Ready


//BEGIN copyright
//let copyYear = new Date();
//document.getElementById('copy').innerHTML = copyYear.getFullYear()
//END copyright