$(document).ready(function() {
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