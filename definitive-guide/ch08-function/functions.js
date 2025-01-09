// 函数可以嵌套
//
// 1. 函数声明
// 3. 函数表达式
// 4. 箭头函数 

//
function printprops(o) {
  for (let p in o) {
    console.log(`${p}: ${o[p]}`);
  }
}
function distance(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x - 1);
}

const square = function(x) { return x * x; };
const f = function fact(x) { if (x <= 1) return 1; else return x * fact(x-1); };
//作为参数调用
[3,2,1].sort(function(a, b) { return a - b; });
// IIFE - 立即调用函数表达式 - immediately invoked function expression
let tensquared = (function(x) { return x * x; }(10));

const sum1 = (x, y) => { return x + y; }
const sum = (x, y) => x + y;
const polynomial = x => x*x + 2*x + 3;
const constantFunc = () => 42;


const f1 = x => { return { value: x }; } // 返回对象时候，需要用括号包裹
const g = x => ({ value: x }); // 返回对象时候，需要用括号包裹

// 他可以访问自己或者是父函数的参数和变量
function hypotenuse(a, b) {
  function square(x) {
    return x * x;
  }
  return Math.sqrt(square(a) + square(b));
}




// 函数调用
// 
printprops({x: 1});
let total = distance(0, 0, 2, 1) + distance(2, 1, 3, 5);
let probability = factorial(5) / factorial(13);

// 一个特殊的函数，判定是不是严格模式
const strict = (function() { return !this; }());

// 方法调用的一个常用误区 - this作用机制
// 以下的代码被认为是javascript中的一个常见错误 
// (我觉得是一个设计的缺陷), 它违反的规则是方法调用时候的外部函数延迟绑定，但是内部函数是立即绑定的
let o = {
    m: function() {
        let self = this;
        console.log(this === o); // => true
        f(); // 调用f()函数
        function f() {
            console.log(this === o); // => false
            console.log(self === o); // => true
            }
    }
}

// 解决办法，可以使用箭头函数
let o1 = {
    m: function() {
        let self = this;
        console.log(this === o1); // => true
        f(); // 调用f()函数
        let f = () => {
            console.log(this === o1); // => true
            console.log(self === o1); // => true
            }
    }
}

// 构造函数
o = new Object();
o = new Object; // 可以省略括号

// 间接调用
// call()和apply()方法


// 隐式调用
// 如下的隐式调用
// 1.getter/setter
// 2.字符串上下文的toString()方法,数值上下问题中的valueOf()方法
// 3.迭代器
// 4.标签模板字面量
// 5.代理对象


// 函数参数
// 可选形参和默认值 - ES6之前
function getPropertyNames(o, a) {
    if (a === undefined) a = [];
    for (let property in o) a.push(property);
    return a;
}

let o2 = {x: 1}, p = {y: 2, z: 3};
let a = getPropertyNames(o2);
getPropertyNames(p, a);

// ES6之后
function getPropertyNames1(o, a = []) {
    for (let property in o) a.push(property);
    return a;
}
// 可选参数 - 后面定义的形参的默认值可以使用前面定义的形参
const rectangle = (width = 1, height = width * 2) => ({width, height});
rectangle(2); // => {width: 2, height: 4}

// 剩余形参于可变长度实参列表 
function max(first, ...rest) {
    let maxValue = first;
    for (let n of rest) {
        if (n > maxValue) {
            maxValue = n;
        }
    }
    return maxValue;
}


max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6, 7, 8, 9, 10);


// 可变参数函数 - 也可以称为是
// variadic function 可变参数函数
// variable arity function 可变参数数量函数
// varargs function 变长函数

// 在ES6之前，可以使用arguments对象
function max1(/* number... */){
    let maxValue = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] > maxValue) {
            maxValue = arguments[i];
        }
    }
    return maxValue;
}
max1(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6, 7, 8, 9, 10);


//在函数调用或者是函数定义的时候，可以使用...操作符来表示可变参数
let numbers = [5, 2, 10, -1, 9, 100, 1];
Math.min(...numbers); // => -1

// 函数定义第时候也可以使用...将多个函数实参数手机到一个数组中
function timed(f) {
    return function(...args) {
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
            return f(...args);
        } finally {
            console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
        }
    }
}

function benchmark(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
}

timed(benchmark)(1000000);


// 函数实参解构为形参
// 传递参数，约定格式
function vectorAdd1(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
}
// 传递参数，解构 （数组解构）
function vectorAdd([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2];
}


// 传递参数，结构 （对象解构）
function vectorMultiply({x, y}, scalar) {
    return {x: x * scalar, y: y * scalar};
}


// 传递参数，解构 （对象解构）
function vectorAdd2({x: x1, y: y1}, {x: x2, y: y2}) {
    return {x: x1 + x2, y: y1 + y2};
}

// 传递参数，解构 （对象解构） - 有默认值
function vectorMultiply1({x, y, z = 0}, scalar) {
    return {x: x * scalar, y: y * scalar, z: z * scalar};
}
vectorMultiply1({x: 1, y: 2, z: 3}, 2);



function arraycopy({from, to = from, n = from.length, fromIndex = 0, toIndex = 0}) {
    let valuesToCopy = from.slice(fromIndex, fromIndex + n);
    to.splice(toIndex, 0, ...valuesToCopy);
    return to;
}
let a1 = [1, 2, 3, 4 ,5], b = [9, 8, 7, 6, 5];
arraycopy({from: a1, n: 3, to: b, toIndex: 4}); // => [9, 8, 7, 6, 1, 2, 3, 5]

// 传递参数 - 解构对象时也可以使用剩余形参
function vectorMultiply2({x , y, z = 0, ...props}, scalar) {
    return {x: x * scalar, y: y * scalar, z: z * scalar, ...props};
}

//编程最佳实践 - 参数类型检查 
// 可以使用javascript的扩展 - typescript来检查，在pure javascript中， 可以defensive programming
function sum(a) {
    let total = 0;
    for (let element of a) {
        if (typeof element !== "number") {
            throw new TypeError("sum(): elements must be numbers");
        }
        total += element;
    }
}
// 使用数组方法来实现
function sum1(a) {
    if (Array.isArray(a)) {
        return a.reduce((x, y) => {
            if (typeof y !== "number") {
                throw new TypeError("sum(): elements must be numbers");
            }
            x + y
        }, 0);
    } else {
        throw new TypeError("sum(): argument must be array");
    }
}
sum1([1, 2, 3]);
sum1([1, 2, "3"]);


// 函数作为值
//function square1(x) { return x * x; }

let s = square;
square(4);
s(4);

// 一个基于函数作为值的例子
function add(x, y) { return x + y; }
function substract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }

function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5)); // （2+3）+（4*5）= 25

// 函数作为对象的属性
// 下面展示一个
let operators = {
    add: (x, y) => x + y,
    substract: (x, y) => x - y,
    multiply: (x, y) => x * y,
    divide: (x, y) => x / y,
    pow: Math.pow
};

function operate1(operation, operand1, operand2) {
    if (typeof operators[operation] === "function") {
        return operators[operation](operand1, operand2);
    } else {
        throw "unknown operator";
    }
}
operate1("add", "hello", operate1("add", " ", "world")); // => "hello world"
operate1("pow", 2, 3); // => 8

// 函数作为命名空间
function chunkNamespace() {
    function chunk(array, process, context) {
        let items = array.splice(0, 1000);
        process(items);
        if (array.length > 0) {
            setTimeout(() => {
                chunk(array, process, context);
            }, 0);
        }
    }

    return {
        chunk: chunk
    };
}
chunkNamespace().chunk([1,2,3,4,5,6,7,8,9,10], items => console.log(items));


// 作为命名空间的方法一般和IEEF(立即调用函数表达式)结合使用
(function() {
    // 这里是命名空间
})();


// 闭包
let scope = "global scope";
function checkscope() {
    let scope = "local scope";
    function f() { return scope; }
    return f();
}

checkscope(); // => "local scope"

// 这样写的话，返回还是 "local scope"
function checkscope1() {
    let scope = "local scope";
    function f() { return scope; }
    return f;
}
checkscope1()(); // => "local scope"


// 之前有说过，一般的函数，存在着外部函数延迟绑定，和内部函数静态绑定的问题，但是箭头函数是没有这个问题的
let uniqueInteger = (function() {
    let counter = 0;
    return () => counter++;
}());
uniqueInteger(); // => 0
uniqueInteger(); // => 1

// 闭包和变量共享
function counter() {
    let count = 0;
    return {
        count: () => count++,
        reset: () => count = 0
    };
}

let c = counter(), d = counter();
c.count(); // => 0
d.count(); // => 0
c.reset();
c.count(); // => 0
d.count(); // => 1

// 闭包实践  - 使用闭包保存私有状态
function counter1(n) {
    return {
        get count() { return n++; },
        set count(m) {
            if (m >= n) n = m;
            else throw new Error("count can only be set to a larger value");
        }
    }
}


//闭包实践之一 - 使用闭包来实现私有属性（getter和setter）
function addPrivateProperty(o, name, predicate) {
    let value;
    o[`get${name}`] = () => value;
    o[`set${name}`] = (v) => {
        if (predicate && !predicate(v)) {
            throw new TypeError(`set${name}: invalid value ${v}`);
        } else {
            value = v;
        }
    };
}
let o3 = {};
addPrivateProperty(o3, "Name", x => typeof x === "string");
o3.setName("Frank");
o3.getName();
o3.setName(0); // => TypeError: setName: invalid value 0

addPrivateProperty(o3, "Age", x => typeof x === "number" && x > 0);


// 编程实践 - 闭包和循环
function constfuncs(v) { return () => v; }
let funcs = [];
for (let i = 0; i < 10; i++) funcs[i] = constfuncs(i);
funcs[5](); // => 5

// 闭包和循环的问题 - 闭包共享同一个变量
function constfuncs1() {
    let funcs = [];
    for (let i = 0; i < 10; i++) funcs[i] = () => i;
    return funcs;
}
let funcs1 = constfuncs1();
funcs1[5](); // => 10 想想看为什么?

// 要知道，this是一个关键词，不是一个变量，所以使用普通函数的时候，如果它需要使用包含函数的this值，需要使用变量来保存
// const self = this;


// 函数调用
// 函数的属性
// length
// name
// prototype
// call()和apply()


// call参数依次传递， apply参数是一个数组
function trace(o, m) {
    let original = o[m];
    o[m] = function(...args) {
        console.log(new Date(), "Entering:", m);
        let result = original.apply(this, args);
        console.log(new Date(), "Exiting:", m);
        return result;
    };
}

// bind()方法
// bind()方法创建一个新的函数，它的this值会被绑定到bind()的第一个参数
function f1(y) { return this.x + y; }
let o4 = {x: 1};
let g1 = f1.bind(o4);
g1(2); // => 3
let p1 = {x: 10, g1};
p1.g1(2); // => 12


// 注意 - 如果是箭头函数，那么绑定this值是不会生效的，但是bind()最常见的作用是让箭头函数像箭头函数，所以一般也不会有问题

// 使用bind()函数来实现偏函数 (currying)
let sum2 = (x, y) => x + y;
let succ = sum2.bind(null, 1);
succ(2); // => 3

function f2(y, z) { return this.x + y + z; }
let g2 = f2.bind({x: 1}, 2);
g2(3); // => 6


// toString()方法

const f1 = new Function("x", "y", "return x*y;"); // const f2 = function(x, y) { return x * y; }

// 关于定义函数的
// 始终编译为顶级函数一样，如下面的例子;
let scope1 = "global";
function constrctFunction() {
    let scope1 = "local";
    return new Function("return scope1");
}
constrctFunction()(); // => "global"



// 函数式编程
let data = [1, 1, 3, 5, 5];

let total1 = 0;
for (let i = 0; i < data.length; i++) total1 += data[i];
let mean = total1 / data.length;


// 计算方差
total1 = 0;
for (let i = 0; i < data.length; i++) {
    let deviation = data[i] - mean;
    total1 += deviation * deviation;
}
let stddev = Math.sqrt(total1 / (data.length - 1));


const map = function(a, ...args) { return a.map(...args); };
const reduce = function(a, ...args) { return a.reduce(...args); };

// 使用数组方法来实现
const sum1 = (x, y) => x + y;
const square1 = x => x * x;
let data1 = [1, 1, 3, 5, 5];
// let mean1 = data1.reduce(sum1) / data1.length;
// let deviations = data1.map(x => x - mean1);
let mean1 = reduce(data1, sum1) / data1.length;
let deviations = map(data1, x => x - mean1);
let stddev1 = Math.sqrt(deviations.map(square1).reduce((x, y) => x + y) / (data1.length - 1));
stddev1;


// 高阶函数
// - not
function not(f) {
    return function(...args) {
        let result = f.apply(this, args);
        return !result;
    };
}
const even = x => x % 2 === 0;
const odd = not(even);
[1, 1, 3, 5, 5].every(odd); // => true

// 函数组合
function mapper(f) {
    return a => a.map(f);
}
const increment = x => x + 1;
const increamentAll = mapper(increment);
increamentAll([1, 2, 3]); // => [2, 3, 4]


// 
function compose(f, g) {
    return function(...args) {
        return f(g(...args));
    };
}
const sum3 = (x, y) => x + y;
const square3 = x => x * x;
compose(square3, sum3)(2, 3); // => 25


// 函数的部分应用
function partialLeft(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs, ...innerArgs];
        return f.apply(this, args);
    };
}

function partialRight(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...innerArgs, ...outerArgs];
        return f.apply(this, args);
    };
}

// 函数参数作为一个模板，这个参数中的undefined值会被替换
function partial(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs];
        let innerIndex = 0;
        for (let i = 0; i < args.length; i++) {
            if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}
// 一个例子
const f2 = (x, y, z) => x * (y - z);
partialLeft(f2, 2)(3, 4); // => 2 * (3 - 4) = -2
partialRight(f2, 2)(3, 4); // => 3 * (4 - 2) = 6
partial(f2, undefined, 2)(3, 4); // => 3 * (2 - 4) = -6
// 另一个使用partial组合的函数的例子
const increment1 = partialLeft(sum, 1);
const cuberoot = partialRight(Math.pow, 1/3);
cuberoot(increment1(26)); // => 3

// 使用partial,compose,partialLeft,partialRight,构建其他函数
const not = partialLeft(compose, x => !x);
const even1 = x => x % 2 === 0;
const odd1 = not(even1);
const isNumber = not(isNaN);
odd1(3) && isNumber(2); // => true



// 组合和部分应用
const product = (x, y) => x * y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, 0.5);
const reciprocal = partial(Math.pow, undefined, -1);
// define reduce


let data2 = [1, 1, 3, 5, 5];
// let mean2 = data2.reduce(sum) / data2.length;
let mean2 = product(reduce(data2, sum), reciprocal(data2.length));
// let stddev2 = Math.sqrt(data2.map(partial(square, mean2)).reduce(sum) / (data2.length - 1));
let stddev2 = sqrt(product(reduce(map(data2, compose(square, partial(sum, neg(mean2)))), sum), 
        reciprocal(sum(data2.length, neg(1)))));
[mean, stddev2]; // => [3, 2]



// 函数记忆

function memorize(f) {
    let cache = new Map();
    return function(...args) {
        let key = args.length + args.join("+");
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            let result = f.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}

function gcd(a, b) {
    if (a < b) [a, b] = [b, a];
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

const gcdmemo = memorize(gcd);
gcdmemo(85, 187); // => 17

const factorial1 = memorize(function(n) {
    return (n <= 1) ? 1 : n * factorial1(n - 1);
});
factorial1(5); // => 120
// 一个简单的记忆函数