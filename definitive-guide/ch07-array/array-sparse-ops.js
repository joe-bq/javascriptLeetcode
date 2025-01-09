let a = [];
a[0] = "zero";
a[1] = "one";


// javascrip 没有append方法
// push, pop - 操作的是数组的尾部
// shift, unshift - 操作的是数组的头部
//
let a = [];
a.push("zero");
a.push("one", "two");


let a = [1, 2, 3];
delete a[2];
2 in a;
a.length;


// 数组的迭代

let letters = [..."Hello world"];
let string = "";
// 简单for..of循环
for (let letter of letters) {
    string += letter;
}


// 迭代使用 entries (支持let解构)
let everyother = "";
for (let [index, letter] of letters.entries()) {
    if (index % 2 === 0) {
        everyother += letter;
    }
}
everyother;


// 老式的for循环
let vowels = "";
for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    if (/[aoeiu]/.test(letter)) {
        vowels += letter;
    }
}

vowels;


// 一般常见的性能提升的循环写法
for (let i = 0, len =  letters.length; i < len; i++) {
    let letter = letters[i];
    if (/[aoeiu]/.test(letter)) {
        vowels += letter;
    }
}

// 还有采用逆向顺序循环的写法
for (let i = letters.length - 1; i >= 0; i--) {
    let letter = letters[i];
    if (/[aoeiu]/.test(letter)) {
        vowels += letter;
    }
}

// 假设有稀疏矩阵 
for (let i = 0; i < a.length; i++) {
    if (a[i] === undefined) continue;
}