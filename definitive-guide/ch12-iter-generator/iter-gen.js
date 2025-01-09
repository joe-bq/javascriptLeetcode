// 迭代器和生成器的使用示例


// for-of循环 使用了迭代器
let sum = 0;
for (let i of [1,2,3,]) {
  sum += i;
}
sum;


// ...可以扩展可迭代对象
let chars = [...'abcd'];
let data = [1,2,3,4,5];
Math.max(...data);


// 迭代器可以用于解构赋值
let purpleHaze = Uint8Array.of(255, 0, 255, 128);
let [r,g,b,a] = purpleHaze;


// 赋值解构也适用于复杂对象，比如说如下的方式
let m = new Map([["one", 1], ["two", 2], ["three", 3]]);
for (let [k,v] of m) {
  console.log(k, v);
}


// 展示如何使用赋值解构在 keys(), values()等方法上
[...m];
[...m.entries()];
[...m.keys()];
[...m.values()];



// ==
// == 解开迭代器
let iterable = [99];;
let iterator = iterable[Symbol.iterator]();
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value);
}

let list = [1,2,3,4,5];
let iter = list[Symbol.iterator]();
let head = iter.next();
let tail = [...iter];



// == 用一个可以迭代的对戏那个来说明可迭代对象舍实现 
class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    // range对象像数值的集合一样
    has(x) { return typeof(x) === "number" && this.from <= x && x <= this.to; }
    toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }
    [Symbol.iterator]() {
        let next = Math.ceil(this.from);
        let last = this.to;
        return {
            next() {
                return (next <= last) ? {value: next++} : {done: true};
            },
            // 特殊使用， 让迭代器本身也可以迭代
            [Symbol.iterator]() { return this; }
        };
    }
}
// demo the use of the Range class 
for (let x of new Range(1,10)) {
  console.log(x);
}
[...new Range(1,10)];




// 除了把对象变成是可迭代的对象以外， 返回可迭代对象也是一个很有用的编程技巧 

function map(iterable, f) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() { return this; },
        next() {
            let v = iterator.next();
            if (v.done) {
                return v;
            } else {
                return {value: f(v.value)};
            }
        }
    };
}

// 通过上面的方式平方根方式 
[...map(new Range(1,10), x => x*x)];


function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() { return this; },
        next() {
            for (;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    };
}

// 通过如上的方式处理过滤问题
[...filter(new Range(1,10), x => x % 2 === 0)];

// iterator天生是懒惰的， 也就是说只有在需要的时候才会计算， 也就是说只有在需要的时候才会调用next()方法
// function words(s) {
//     var r = s.match(/[^ ]/).index;
//     return {
//         [Symbol.iterator]() { return this; },
//         next() {
//             if (r < s.length) {
//                 let start = r;
//                 while (r < s.length && s[r] !== " ") r++;
//                 return {value: s.substring(start, r++), done: false};
//             } else {
//                 return {done: true};
//             }
//         }
//     };
// }

function words(s) {
    var r = /\s+|$/g;
    r.lastIndex = s.match(/[^ ]/).index;
    return {
        [Symbol.iterator]() { return this; },
        next() {
            let start = r.lastIndex;
            if (start < s.length) {
                let match = r.exec(s);
                if (match) {
                    return {value: s.substring(start, match.index), done: false};
                }
            }
            return {done: true};
        }
    };
}

[...words("   abc def  ghi  ")];


// 注意说明
// 迭代器可以有一个return()方法， 用于在迭代过程中提前终止迭代


// 生成器
function* oneDigitPrimes() {
    yield 2;
    yield 3;
    yield 5;
    yield 7;
}

let primes = oneDigitPrimes();
primes.next().value; // => 2
primes.next().value; // => 3
primes.next().value; // => 5
primes.next().value; // => 7
primes.next().done;


// primes[Symbol.iterator] === primes; // => true
// 生成器返回它自身
primes[Symbol.iterator](); // => primes


[...oneDigitPrimes()]; // => [2,3,5,7]
let sum1 = 0;
for (let prime of oneDigitPrimes()) {
    sum1 += prime;
}  
sum1;

// 生成器的字面量方法 

const seq = function*(from, to) {
    for (let i = from; i <= to; i++) {
        yield i;
    }
};
[...seq(3,5)]; // => [3,4,5]

let o = {
    x: 1, y: 2, z: 3,
    *g() {
        for (let key of Object.keys(this)) {
            yield key;
        }
    }
};

[...o.g()]; // => ["x", "y", "z", "g"]


// 生成器示例
// 使用生成器的fibonacci数列 
function* fibonacciSequence() {
    let x = 0, y = 1;
    for (;;) {
        yield y;
        [x, y] = [y, x+y];
    }
}

function fibonacci(n) { 
    for (let f of fibonacciSequence()) {
        if (n-- <= 0) return f;
    }
}

fibonacci(20); // => 10946


// take生成器函数 
function* take(n, iterable) {
    let iterator = iterable[Symbol.iterator]();
    while (n-- > 0) {
        let v = iterator.next();
        if (v.done) return;
        yield v.value;
    }
}
[...take(5, fibonacciSequence())]; // => [1,1,2,3,5]


// 使用生成器， 定义zip函数
function* zip(...iterables) {
    let iterators = iterables.map(i => i[Symbol.iterator]());
    let index = 0;
    while (iterators.length > 0) {
        let item = iterators[index].next();
        if (item.done) {
            iterators.splice(index, 1);
        }
        else {
            yield item.value;
            index++;
        }
        if (index >= iterators.length) {
            index = 0;
        }
    }
}

[...zip(oneDigitPrimes(), "ab", [0])]; // => [[2,"a",0],[3,"b"]]


// yield* 与递归
// yield*只可以用于生成器函数
// yield*操作对象是一个可迭代的对象

function* sequence(...iterables) {
    for (let iterable of iterables) {
        yield* iterable;
    }
}

[...sequence( "abc",oneDigitPrimes())]; // => ["a","b","c",2,3,5,7]

//这样写不行
// 因为不是在生成器函数中使用yield*操作
// forEach是一个常规函数
function* sequence(...iterables) {
    iterables.forEach(iterable => yield* iterable);
}




// 高级 生成器特性
// 一个是生成器的返回值 
function* oneAndDone() {
    yield 1;
    return "done";
}

[...oneAndDone()]; // => [1]   

// 但是， 如果使用next函数调用
let generator = oneAndDone();
generator.next(); // => {"value": 1, "done": false }
generator.next(); // => {"value": "done", "done": true }
generator.next(); // => {"value": undefined, "done": true }



// yield表达式的的值
function* smallNumbers() {
    console.log("next() invoked the first time, the argument is ignored");
    let y1 = yield 1;
    console.log("next() invoked the second time with argument", y1);
    let y2 = yield 2;
    console.log("next() invoked the third time with argument", y2);
    let y3  = yield 3;
    console.log("next() invoked the fourth time with argument", y3);
    return 4;
}

// 这个例子说明了 yield表达式的值是由next()方法的参数决定的
// 程序会在求值的时候停止， 等待下一次next()方法的调用
// 生成器通过yield向调用者返回值， 调用者通过参数向生成器传递值
// 注意： yield表达式的传递值和返回值是不对称的 
let g1 = smallNumbers();
console.log("created generator: code not run");
let n1 = g1.next("a");
console.log("generator yielded", n1.value);
let n2 = g1.next("b");
console.log("generator yielded", n2.value);
let n3 = g1.next("c");
console.log("generator yielded", n3.value);
let n4 = g1.next("d");
console.log("generator yielded", n4.value);



// 最后
/// return() 和  throw() 方法
// return() 提供一个方法， 让那个迭代器来关闭资源
// throw() 方法提供一个方法， 让调用者向生成器发送异常信号 - 生成器可以捕获异常，响应事件 例子：计数器可以捕获异常， 重置计数器的值
