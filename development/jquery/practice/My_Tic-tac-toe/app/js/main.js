$(document).ready(function() {

	$('.button').click(function() {
		$('.block').html("");
		$('.block').removeClass('horiz');
		$('.block').removeClass('vert');
		$('.game').removeClass('diagL');
		$('.game').removeClass('diagR');
	});

	var block1 = $('.block1'),
			block2 = $('.block2'),
			block3 = $('.block3'),
			block4 = $('.block4'),
			block5 = $('.block5'),
			block6 = $('.block6'),
			block7 = $('.block7'),
			block8 = $('.block8'),
			block9 = $('.block9'),
			user   = '<div class="user"><span></span></div>';

	function testing(parent) {
		var restesting = $(parent).children().html();
		return restesting;
	};
	function tUser(parent) {
		var restUser = $(parent).children('.user').html();
		return restUser;
	}
	function tBrain(parent) {
		var restBrain = $(parent).children('.brain').html();
		return restBrain;
	}
	function step(position) {
		$(position).html('<div class="brain"><span></span></div>');
	}

	$('.block').click(function() {

		if($(this).children().html()) {
			return false;
		};

		//BEGIN win
		if ( (tBrain(block1) && tBrain(block2) && tBrain(block3)) || (tUser(block1) && tUser(block2) && tUser(block3)) ) {$('.block1, .block2, .block3').addClass('horiz'); return false}
		else if ( (tBrain(block4) && tBrain(block5) && tBrain(block6)) || (tUser(block4) && tUser(block5) && tUser(block6)) ) {$('.block4, .block5, .block6').addClass('horiz'); return false}
		else if ( (tBrain(block7) && tBrain(block8) && tBrain(block9)) || (tUser(block7) && tUser(block8) && tUser(block9)) ) {$('.block7, .block8, .block9').addClass('horiz'); return false}
		else if ( (tBrain(block1) && tBrain(block4) && tBrain(block7)) || (tUser(block1) && tUser(block4) && tUser(block7)) ) {$('.block1, .block4, .block7').addClass('vert'); return false}
		else if ( (tBrain(block2) && tBrain(block5) && tBrain(block8)) || (tUser(block2) && tUser(block5) && tUser(block8)) ) {$('.block2, .block5, .block8').addClass('vert'); return false}
		else if ( (tBrain(block3) && tBrain(block6) && tBrain(block9)) || (tUser(block3) && tUser(block6) && tUser(block9)) ) {$('.block3, .block6, .block9').addClass('vert'); return false}
		else if ( (tBrain(block1) && tBrain(block5) && tBrain(block9)) || (tUser(block1) && tUser(block5) && tUser(block9)) ) {$('.game').addClass('diagL'); return false}
		else if ( (tBrain(block3) && tBrain(block5) && tBrain(block7)) || (tUser(block3) && tUser(block5) && tUser(block7)) ) {$('.game').addClass('diagR'); return false}
		
		//END win

		$(this).html(user);

		//Brain Win
		if (tBrain(block1) && tBrain(block2) && !testing(block3)) step(block3);

		else if (tBrain(block2) && tBrain(block3) && !testing(block1)) step(block1);

		else if (tBrain(block1) && tBrain(block4) && !testing(block7)) step(block7);

		else if (tBrain(block2) && tBrain(block5) && !testing(block8)) step(block8);

		else if (tBrain(block3) && tBrain(block6) && !testing(block9)) step(block9);

		else if (tBrain(block1) && tBrain(block3) && !testing(block2)) step(block2);

		else if (tBrain(block1) && tBrain(block7) && !testing(block4)) step(block4);

		else if (tBrain(block2) && tBrain(block8) && !testing(block5)) step(block5);

		else if (tBrain(block3) && tBrain(block9) && !testing(block6)) step(block6);

		else if (tBrain(block1) && tBrain(block9) && !testing(block5)) step(block5);

		else if (tBrain(block7) && tBrain(block3) && !testing(block5)) step(block5);

		else if (tBrain(block4) && tBrain(block7) && !testing(block1)) step(block1);

		else if (tBrain(block5) && tBrain(block8) && !testing(block2)) step(block2);

		else if (tBrain(block6) && tBrain(block9) && !testing(block3)) step(block3);

		else if (tBrain(block7) && tBrain(block8) && !testing(block9)) step(block9);

		else if (tBrain(block8) && tBrain(block9) && !testing(block7)) step(block7);

		else if (tBrain(block7) && tBrain(block5) && !testing(block3)) step(block3);

		else if (tBrain(block3) && tBrain(block5) && !testing(block7)) step(block7);

		else if (tBrain(block1) && tBrain(block5) && !testing(block9)) step(block9);

		else if (tBrain(block5) && tBrain(block9) && !testing(block1)) step(block1);

		else if (tBrain(block4) && tBrain(block5) && !testing(block6)) step(block6);

		else if (tBrain(block5) && tBrain(block6) && !testing(block4)) step(block4);

		//User step
		
		else if (tUser(block1) && tUser(block2) && !testing(block3)) step(block3);

		else if (tUser(block2) && tUser(block3) && !testing(block1)) step(block1);

		else if (tUser(block1) && tUser(block4) && !testing(block7)) step(block7);

		else if (tUser(block2) && tUser(block5) && !testing(block8)) step(block8);

		else if (tUser(block3) && tUser(block6) && !testing(block9)) step(block9);

		else if (tUser(block1) && tUser(block3) && !testing(block2)) step(block2);

		else if (tUser(block1) && tUser(block7) && !testing(block4)) step(block4);

		else if (tUser(block3) && tUser(block9) && !testing(block6)) step(block6);

		else if (tUser(block1) && tUser(block9) && testing(block5) && !testing(block7)) step(block7);

		else if (tUser(block1) && tUser(block9) && !testing(block5) && !testing(block5)) step(block5);

		else if (tUser(block4) && tUser(block7) && !testing(block1)) step(block1);

		else if (tUser(block5) && tUser(block8) && !testing(block2)) step(block2);

		else if (tUser(block6) && tUser(block9) && !testing(block3)) step(block3);

		else if (tUser(block7) && tUser(block8) && !testing(block9)) step(block9);

		else if (tUser(block8) && tUser(block9) && !testing(block7)) step(block7);

		else if (tUser(block7) && tUser(block5) && !testing(block3)) step(block3);

		else if (tUser(block5) && tUser(block3) && !testing(block7)) step(block7);

		else if (tUser(block1) && tUser(block5) && !testing(block9)) step(block9);

		else if (tUser(block9) && tUser(block5) && !testing(block1)) step(block1);

		else if (tUser(block5) && tUser(block4) && !testing(block6)) step(block6);

		else if (tUser(block5) && tUser(block6) && !testing(block4)) step(block4);

		else if (tUser(block7) && tUser(block9) && !testing(block8)) step(block8);

		//Traps
		else if (tUser(block5) && tUser(block9) && testing(block1) && !testing(block7)) step(block3);

		else if (tUser(block1) && tUser(block8) && !testing(block7)) step(block7);

		// the End
		else if (!testing(block5)) step(block5);

		else if (!testing(block1)) step(block1);

		else if (!testing(block2)) step(block2);

		else if (!testing(block3)) step(block3);

		else if (!testing(block4)) step(block4);

		else if (!testing(block6)) step(block6);

		else if (!testing(block7)) step(block7);

		else if (!testing(block8)) step(block8);

		else if (!testing(block9)) step(block9);
		

	});//END $('.block').click(function() {

});