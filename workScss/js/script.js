$(document).ready(function() {
	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Ваша заявка успешно отправлена!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
	//END E-mail

});//End Ready



//BEGIN loader
window.onload = function() {
	document.querySelector('.loader').style.display = "none"
}
//END loader

//BEGIN copyright
var copyYear = new Date();
document.getElementById('copy').innerHTML = copyYear.getFullYear()
//END copyright