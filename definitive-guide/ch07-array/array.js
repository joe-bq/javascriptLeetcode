// array

// 创建数组


let empty = [];
let primes = [2, 3, 5, 7, 11];
let misc = [1.1, true, "a", ];


let base = 1024;
let table = [base, base + 1, base + 2, base + 3];

// sparse 
let count =  [1,,3];
let undefs = [,,];



// ... spread operator
let a  = [1, 2, 3];
let b = [0, ...a, 4];

let original = [1, 2, 3];
let copy = [...original];
copy[0] = 0;
console.log(original[0]); 


// the array constructor

let a1 = new Array(); // empty 
let a2 = new Array(10); // length 10 
let a3 = new Array(5, 4, 3, 2, 1, "testing, testing"); // create array with elements


// array.of 
Array.of();
Array.of(10);
Array.of(1, 2, 3);

// array.from  - to create an array from an array-like or iterable object
let copy = Array.from(original);
// from array-like object
let a4 = Array.from({length: 5}, (v, k) => k);


