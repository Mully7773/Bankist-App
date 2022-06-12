'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
//returns new array with extracted parts
console.log(arr.slice(2)); //['c', 'd', 'e']
console.log(arr.slice(2, 4)); //['c', 'd'] - end parameter is not included
console.log(arr.slice(-1)); //['e'] - starts at end. Useful trick to get the last element of an array
console.log(arr.slice(1, -2)); //['b', 'c'];
console.log(arr.slice()); //makes shallow copy same as console.log([...arr]);

//SPLICE
//mutates original array
console.log(arr.splice(2)); //splice takes out the spliced parts of the array returns ['c', 'd', 'e'] - splice is typically used to delete parts of an array - like the last element
console.log(arr.splice(-1)); // ['e']
console.log(arr); // ['a', 'b', 'c', 'd', 'e'];
arr.splice(1, 2); //first argument is the start position, second argument is the number of elements you want to delete from that start position

//REVERSE
//mutates original ray
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //['f', 'g', 'h', 'i', 'j']
console.log(arr2); //same of above

//CONCAT
//doesn't mutate original array
//combines two arrays
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2); //same as above

//JOIN
console.log(letters.join(' - ')); //result is string with separator we specify

//The New AT METHOD
const arr3 = [23, 11, 64];
console.log(arr3[0]); //23
console.log(arr3.at(0)); //23 //new way to specify an element

//getting last array method
console.log(arr3[arr3.length - 1]); // 64
console.log(arr3.slice(-1)[0]); // [64] then 64
console.log(arr3.at(-1)); //64 - new way - good for method chaining

//can use it on strings
console.log('jonas'.at(0)); //j
console.log('jonas'.at(-1)); //s

//Looping Arrays: forEach():
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
//first destructured parameter is index, second is current element
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}.`);
  } else {
    //Math.abs() removes negative
    console.log(`You withdrew ${i + 1} ${Math.abs(movement)}.`);
  }
}

//movement is each element in the array
// in each iteration it should do whatever code is written in the code block to each individual element in the array
//first parameter is individual element, second is index, and third is the entire array that we are looping over. Order matters here.
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}.`);
  } else {
    //Math.abs() removes negative
    console.log(`You withdrew ${i + 1} ${Math.abs(mov)}.`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ..
//continue and break statements do not work in forEach()

//forEach on Maps and Sets:

//MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//parameters are set up the same way arrays are set up
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
//no 'key' for sets, so the second parameter is actually set to the first parameter. We use _ to set a throwaway value
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
