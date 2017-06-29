$(document).ready(function() {

	var $hero  = $('#hero'),
			$laser = $hero.find('.laser');


	$laser.removeClass('laser');
	function scan() {
		$hero.removeClass('idle').addClass('attack');

		setTimeout(function() {
			$laser.addClass('laser');
			$('#hero.attack .attack').css({'top':'-30px', 'right':'-10px'})
		}, 1000);
		setTimeout(function() {
			$laser.removeClass('laser');
			$('#hero.attack .attack').css({'top':'0px', 'right':'0px'});
		}, 5000);
		setTimeout(function() {
			$hero.removeClass('attack').addClass('idle');
		}, 5500)
	}

	setInterval(scan, 10000)

});