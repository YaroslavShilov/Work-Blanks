$(document).ready(function() {
	$('.sl').slick({
		autoplay: true,
		autoplaySpeed: 2000,
		initialSlide: 11,//начальный слайд (отсчет с нуля, если поставить 11, то будет 12слайд)
		speed: 1000,//скорость анимации
		cssEase: 'ease-in',//тип анимации, стандарт ease
		centerMode: false,//картинка по центру
		centerPadding: '50px',//количество пикселей след и пред картинки которые видно по бокам
		dots: true, //включить ли точки
		arrows: true,//включить ли стрелки
		fade: false,//слайд исчезает и появляется при помощи fadeIn() и fadeOut()
		draggable: true,//сенсерное перелистывание
		infinite: true, //бесконечное пролистывание
		edgeFriction: '0.15',// на сколько процентов можно оттянуть последний слайд если отключено бесконечное пролистывание
		pauseOnDotsHover: true,//останавливать при наведении курсора на точки
		pauseOnHover: true,//останавливать при наведении на картинку
		rtl: false,//усли чтение справа на лево, так же нужно главному диву (в этом примере это .sl) задать атрибут dir="rtl"
		vertical: false,//слайдер станет вертикальным
		rows: 1,//во сколько строк будет слайдер
		slidesPerRow: 1,//по сколько слайдов в 1 строке(работает если rows > 1)
		slidesToShow: 1,//сколько слайдов видно одновременно
		slidesToScroll: 1,//по сколько слайдов перелистывается (не работает если centerMode: true)
		zindex: 999,//как z-index в css
		focusOnSelect: true,//при нажатии на слайд, перематывается к нему
		responsive: [//как будет работать слайдер при адаптиве
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					dots: false
				}
			}
		],
		asNavFor: '.sl2'//для связи с вторым слайдером
	});




	$(".sl2").slick({
		asNavFor: '.sl',
		initialSlide: 11,
		arrows: false,
		dots: true,
		slidesToShow: 7,
		centerMode: true,
		centerPadding: '40px',
		focusOnSelect: true,//при нажатии на слайд, перематывается к нему
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 6
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					dots: false,
					centerMode: false
				}
			}
		]
	});


});//End Ready