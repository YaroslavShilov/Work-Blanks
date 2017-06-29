$(document).ready(function() {

//var 
var $nav = $('.nav-underline'),
	$line = $('<div></div>').appendTo($nav),
	$activeLi,
	lineWidth,
	liPos;


function refresh() {
	$activeLi = $nav.find("li.active");
	lineWidth = $activeLi.width();
	liPos = $activeLi.position().left;
}

refresh();

$nav.css('position','relative');

//line setup 
function lineSet() {
	$line.css({
		'position':'absolute',
		'background-color':'black',
		'bottom':'0',
		'height':'3px'
	}).animate({
		'left':liPos,
		'width':lineWidth
	}, 400);
}
lineSet();

//on click
$nav.find('li').click(function() {
	$activeLi.removeClass('active');
	$(this).addClass('active');
	refresh();
	lineSet();
});

});//End Ready