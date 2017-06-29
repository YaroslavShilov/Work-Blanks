
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//
//// 
//
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/*
function sum() { //function деклорейшн - классический способо объявления
	let result = 0;

	for (let i = 0; i < arguments.length; i++) {
		result += arguments[i];
	}

	return result;
}

let res = sum(4, 5);

console.log(res); //выведет 9, т.к. из-за "arguments" они превращаются в псевдо массив arguments[4,5];

////////////////////////////////////////////////////////////////////////////////////////

let sum = function() { //function экспрешн
	let result = 0;

	for (let i = 0; i < arguments.length; i++) {
		result += arguments[i];
	}

	return result;
}

let res = sum(4, 5);

console.log(res); //выдает 9;

/////////////////////////////////////////////////////////////////////////////////

function filter(source) {
	let result = [];

	for(let i=0; i<source.length; i++) {
		if(source[i] > 4) {
			result.push(source[i]);
		}
	}

	return result;
}

let array = [1,2,3,4,5,6,7,8];
let res = filter(array); // выдает [5,6,7,8]

console.log(res);

////////////////////////////////////////////////////////////////////////////

function greaterThan4(value) {
	return value > 4;
}

let res = greaterThan4(10); //выдает true (10 больше чем 4? true)
console.log(res);

////////////////////////////////////////////////////////////////////////////

function filter(source, fn) {
	let result = [];

	for (let i = 0; i < source.length; i++) {
		if (fn(source[i])) {
			result.push(source[i]);
		}
	}
}

function greaterThan4(value) {
	return value > 4;
}

let array = [4, 2, 10, 100, 5, 200]
let res = filter(array, greaterThan4); // выведет [10, 100, 5, 200]
console.log(res);

////////////////////////////////////////////////////////////////////////////

function func1() {
	let func2 = function() {
		console.log("hello");
	}

	return func2;
}

console.log(func1()()); // выведет "hello" ( console.log(func2());  )

////////////////////////////////////////////////////////////////////////////////

function rec(number) {
	console.log(number);
	number -= 1;

	if (number > 0) {
		rec(number);
	}
}

rec(10); // выведет цифры от 1 до 10

//можно записать короче 

function rec(number) {
	console.log(number--);

	if (number > 0) {
		rec(number);
	}
}

rec(10);

/////////////////////////////////////////////////////////////////////////////////////////
*/

/*
let sum = (source) => {
	let result = 0;

	for( let i=0; i < source.length; i++) {
		result += source[i];
	}

	return result;
}

let array = [1, 2, 3];
console.log(sum(array)) //выдает 6. называется "стрелочная функция" 
//если параметр один, то можно писать без скобок
//если без параметров, то скобки обязательно ставим

let array1 = [2, 3, 4];

let array2 = array1.map(function(number) {
	return number*number;
}); // можно сделать запись короче при помощи стрелочной функции

let array3 = array1.map(number => number*number);

// функция map() возвращает массив проганяя каждый параметр через квадрат

console.log(array1); //выдает [2, 3, 4]
console.log(array2); //выдает [4, 9, 16]
console.log(array3); // выдает [4, 9, 16]

*/


/////////////////////////////////////////////////////////////////////////////////////////

/*
function sum() {
	let f1 = () => {
		let result = 0;

		for (let i = 0; i < arguments.length; i++) {
			result += arguments[i];
		}

		return result;
	}

	return f1();
}

console.log(sum(1,2,3,4)); //возвращает 10, стрелочная функция не имея аргументов поднимается выше и берет их там
// у стрелочных функций не бывает аргументов
*/

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//
//// дз
//
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


function consoleRec(source) {
	
	let i = 0;

	function func1(source) {
		console.log(source[i]);
		i++;
		if (i<source.length) {
			func1(source);
		}
	}

	func1(source);
	
}

consoleRec(['я', 'умею', 'писать', 'рекурсивные', 'функции']);