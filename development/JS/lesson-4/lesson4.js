/*
let obj1 = {
	name: 'Сергей',
	lastName: 'Мелюков'
};

console.log(obj1.name);
console.log(obj1['lastName']);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// key/value;
let key = 'LastName';

console.log(obj1[key]);
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
let obj1 = {
	name: 'Сергей',
	lastName: 'Мелюков'
}

//delete obj1.lastName;//удаляет свойство объекта

//console.log(obj1);

for(let prop1 in obj1) { //не обязательно писать prop1, можно написать любое слово
	//console.log(prop1) // выводим все свойства объекта
	console.log(obj1[prop1]) //выводим все значения свойств
}
*/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
let obj1 = {
	name: 'Сергей',
	lastName: 'Мелюков',
	old: 0
}
*/
/*

//obj1.hasOwnProperty('name') - определяет имеет ли объект свойство 'name'

if(obj1.hasOwnProperty('old')) { // имеет ли объект свойство "old"
	console.log('в объекте есть такое свойство');
}
else {
	console.log('в объекте нет такого свойства')
}
*/



/*
// Object.keys(объект) выводит массив список имен свойств

console.log(Object.keys(obj1)) //выводит массив из списка имен свойств

// let keys = Object.keys(obj1);
// for(let i=0; i<keys.length; i++) {
// 	let key = keys[i];
// 	console.log(obj1[key]) //выводим значения свойств объекта
// };
//можно заменить на 
Object.keys(obj1).forEach(key => console.log(obj1[key]));

*/

/////////////////////////////////////////////////////////////////////////////////////////////////////


let obj1 = {
	name: 'Сергей',
	lastName: 'Мелюков',
	old: 10,
	valueOf() {
		return this.old
	}
}

let obj2 = {
	name: 'Сергей',
	lastName: 'Мелюков',
	old: 11,
	valueOf() {
		return this.old
	},
	toString() {
		//return '[' + this.name + '] - [' + this.lastName + ']'
		return `[${this.name}] - [${this.lastName}]`// ES6
	}
}

if (obj1 < obj2) {
	console.log('obj1 < obj2')
}

console.log(obj2.toString());