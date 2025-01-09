// 以下是两个基于匿名函数或者基于闭包的实现
const BitSet = (function() {
   // 
   function isValid(set, value) {
      return (typeof value === "number" && value >= 0 && value < set.size);
   }
   function has(set, value) {
      return isValid(set, value) && set.data[value];
   }
   const BITS = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
   const MASKS = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
   return class BitSet extends AbstractWritableSet {
        constructor(size = 8, data = new Uint8Array(Math.ceil(size / 8))) {
             super();
             this.size = size;
             this.data = data;
        }
        has(value) {
             return has(this, value);
        }
        add(value) {
             if (isValid(this, value)) {
                this.data[value] = 1;
             }
             return this;
        }
        delete(value) {
             if (isValid(this, value)) {
                this.data[value] = 0;
             }
             return this;
        }
        clear() {
             this.data.fill(0);
        }
        * [Symbol.iterator]() {
             for (let i = 0; i < this.size; i++) {
                if (has(this, i)) {
                 yield i;
                }
             }
        }
   }
}());



const stats = (function() {
    // the helper functions to the module
    const sum = (x, y) => x + y;
    const square = x => x * x;
    function mean(data) {
        return data.reduce(sum) / data.length;
    }
    function stddev(data) {
        const m = mean(data);
        return Math.sqrt(data.map(x => square(x - m)).reduce(sum) / (data.length - 1));
    }

    return {mean, stddev};
}());

stats.mean([1, 3, 5, 7, 9]); // 5
stats.stddev([1, 3, 5, 7, 9]); // 3.1622776601683795



// 如下的类是所需要类的实现

//这里构建一个类层次和抽象类的例子 
class AbstractSet { 
    has(x) { throw new Error("Abstract method"); }
}

/** 
 * AbstractEnumerableSet是 AbstractSet的一个具体的子类
 */

class AbstractEnumerableSet extends AbstractSet {
    get size() { throw new Error("Abstract method"); }
    [Symbol.iterator]() { throw new Error("Abstract method"); }
    isEmpty() { return this.size === 0; }
    toString() { return Array.from(this).join(", "); }
    equals(set) {
        if (!(set instanceof AbstractEnumerableSet)) return false;
        if (this.size !== set.size) return false;
        for (let element of this) {
            if (!set.has(element)) return false;
        }
        return true;
    }
}

class AbstractWritableSet extends AbstractEnumerableSet {
    insert(x) { throw new Error("Abstract method"); }
    remove(x) { throw new Error("Abstract method"); }
    add(set) { 
        for (let element of set) {
            this.add(element);
        }
    }

    substract(set) {
        for (let element of set) {
            this.remove(element);
        }
    }

    intersect(set) {
        for (let element of this) {
            if (!set.has(element)) this.remove(element);
        }
    }
}




// 基于闭包的自动模块化
const modules = {};
function require(moduleName) {
    return modules[moduleName];
}

modules["sets.js"] = (function() {
    const exports = {};

    exports.BitSet = class BitSet extends AbstractWritableSet {
        constructor(max) { 
            super();
            this.max = max;
            this.n = 0;
            this.numBytes = Math.floor(this.max / 8) + 1;
            this.data = 
            new Uint8Array(this.numBytes);
        }
    
        _valid(x) {
            if (x < 0 || x > this.max) {
                //throw new TypeError(`Invalid set element: ${x}`);
                return false;
            }
            return true;
        }
    
        _has(x) { 
            if (this._valid(x)) {
                let byte = Math.floor(x / 8);
                return (this.data[byte] & (1 << (x % 8))) !== 0;
            } else {
                return false;
            }
        }
    
        insert(x) {
            if (this._valid(x)) {
                let byte = Math.floor(x / 8);
                if ((this.data[byte] & (1 << (x % 8))) === 0) {
                    // console.log('insert', x, ' at ' , byte);
                    this.data[byte] |= 1 << (x % 8);
                    this.n++;
                    // console.log('done ', this.data[byte]);
                }
            }
        }
    
        remove(x) {
            if (this._valid(x)) {
                let byte = Math.floor(x / 8);
                if ((this.data[byte] & (1 << (x % 8))) !== 0) {
                    this.data[byte] &= ~(1 << (x % 8));
                    this.n--;
                }
            }
        }
    
        get size() { 
            return this.n;
        }
    
        *[Symbol.iterator]() {
            for (let i = 0; i <= this.max; i++) {
                if (this._has(i)) yield i;
            }
        }  
    }

    // Helper functions
    function isValid(set, value) {
        return Number.isInteger(value) && value >= 0 && value < set.size;
    }

    function has(set, value) {
        return isValid(set, value) && Boolean(set.data[value]);
    }

    return exports;
}());

modules["stats.js"] = (function() {
    const exports = {};

    const sum = (x, y) => x + y;
    const square = x => x * x;
    exports.mean = function(data) {
        return data.reduce(sum) / data.length;
    }
    exports.stddev = function(data) {
        const m = exports.mean(data);
        return Math.sqrt(data.map(x => square(x - m)).reduce(sum) / (data.length - 1));
    }

    return exports;
}());

// 使用

const stats = require("stats.js");
const BitSet = require("sets.js").BitSet;
let s = new BitSet(50);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]);




// 串行期约
// 示例如何通过串行期约来获取多个URL的内容
// 创建一个初始的期约， 然后通过多个串行的方式， 依次获取URL的内容
// 这个例子展示了如何通过串行期约处理的方式
function fetchSequentially(urls) { 
    const bodies = [];

    function fetchOne(url) {
        return fetch(url)
            .then(response => response.text())
            .then(body => {
                bodies.push(body);
            });
    }
    let p = Promise.resolve(undefined);

    for (url of urls) {
        p = p.then(() => fetchOne(url));
    }

    return p.then(() => bodies);
}


fetchSequentially(["https://phemex.com", "https://baidu.com"])
.then(bodies => { /* */ })
.catch(error => { /* */ });



// 另一个使用promiseMaker的例子， 创建promiseSequence的例子

function promiseSequence(inputs, promiseMaker) {
    inputs = [...inputs];
    function handleNextInput(outputs) {
        if (inputs.length === 0) {
            return outputs;
        }
        let input = inputs.shift();
        return promiseMaker(input).then(output => {
            outputs.push(output);
            return handleNextInput(outputs);
        });
    }
    return Promise.resolve([]).then(handleNextInput);
}


// 定一个处理的promise
function fetchBody(url) {
    return fetch(url).then(response => response.text());
}

promiseSequence(["https://phemex.com", "https://baidu.com"], fetchBody);

// async/await的版本

// ES2017版本开始， 可以使用async/await来简化串行期约的处理

// 首先我们看看await表达式 , 例子
let response = await fetch("https://phemex.com");
let body = await response.text();

// async函数 

async function getHighScore() { 
    let response = await fetch("/api/user/profile");
    let profile = await response.json();
    return profile.highScore;
}

// 那么对这个async函数的调用， 可以使用await方式来调用 
displayHighScore(await getHighScore());

// 但是这个函数只能在另一个async函数中调用
// 你可以在async函数中嵌套await 表达式， 多深多没有关系
// 如果你在一个非async函数内部， 只能使用如下的方式返回的服务
getHighScore().then(displayHighScore).catch(console.error);


// 等待多个期约 
// 假设用async方式重写了  getJSON函数

async function getJSON(url) {
    let response = await fetch(url);
    return await response.json();
}

let value1 = await getJSON("https://phemex.com");
let value2 = await getJSON("https://phemex.com");
// 以上的代码， 一个误解在于认为它是 并行的， 但是实际上是串行的
// 如果你期望并行的话， 可以使用Promise.all

let [value3, value4] = await Promise.all([getJSON("https://phemex.com"), getJSON("https://phemex.com")]);

// 实现细节 


async function f(x) { 
    /** 函数体 */
}
// 它实际上的会返回一个包含期约的函数体
function f(x) { 
    // 需要返回一个返回期约的包装函数
    return new Promise((resolve, reject) => {
        try { 
            return resolve((function() { /** 函数体 */ })(x));
        } catch (e) {
            reject(e);
        }
    });
}


// 异步迭代
// for/await 
const fs = require("fs");

async function parseFile(filename) {
    let stream = fs.createReadStream(filename, {encoding: "utf8"});
    for await (let chunk of stream) {
        console.log(chunk);
    }
}


const urls = [url1, url2, url3];
const promises = urls.map(url => fetch(url));

for (const promise of promises) {
    const response = await promise;
    handle(response);
}


// for await of 语句
// 其实下面的代码和上面的代码是类似的 
for await (const response of promises) {
    handle(response);
}

// 异步生成器
// 主要是用到了 async function 和 async function* 语法
function elapsedTime(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function* clock(interval, max = Infinity) {
    for (let count = 1; count <= max; count++) {
        await elapsedTime(interval);
        yield count;
    }
}

async function test() { 
    for await (const tick of clock(1000, 5)) {
        console.log(tick);
    }
}





// 实现异步迭代器
// 关键是这个 asyncIterator 方法
function clock(interval, max = Infinity) {
    let count = 1;
    return {
        async next() {
            if (count > max) {
                return {done: true};
            }
            await elapsedTime(interval);
            return {value: count++, done: false};
        },
        [Symbol.asyncIterator]() { return this; }
    };
}

// 一个通过计算绝对要发生时间的 asyncIterator的方法 
function clock2(interval, max = Infinity) {
    // set a time in the future, and set timeout to fire base on the current ts
    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }

    let startTime = Date.now();
    let count = 0;

    // 返回一个可异步迭代的对象
    return { 
        async next() { 
            if (++count > max) {
                return {done: true};
            }
            // calc next time for the iteratoin
            let targetTime = startTime + count * interval;
            await until(targetTime);
            // return the iterator value
            return {value: count, done: false};
        }
    },
    [Symbol.asyncIterator]() { return this; }
}



// 我们再看个Async的例子 
// 这里使用async Queue来实现了一个异步队列
// 一个基于生产和消费的例子
class AsyncQueue { 
    constructor() { 
        // 已经入队列， 但是还未出队列的值在这里
        this.values = [];
        // 如果期约出队列的时候他们对应的值尚未入队列 
        // 就把那些期约的解决方法保存在这里
        this.resolvers = [];
        // 一旦关闭， 任何值都不能再入队列
        // 也不会再返回任何未兑现的期约
        this.closed = false;
    }

    enqueue() {
        if (this.closed) {
            throw new Error("AsyncQueue is closed");
        }
        if (this.resolvers.length > 0) {
            // 如果有对应的期约， 让它来解决期约
            let resolve = this.resolvers.shift();
            resolve();
        } else {
            // 否则， 让它去排队
            this.values.push(value);
        }
    }

    dequeue() {
        if (this.values.length > 0) {
            // 如果有排队中的期约， 返回一个解决的期约
            const value = this.values.shift();
            return Promise.resolve(value);
        }
        else if (this.closed) {
            // 如果队列已经关闭， 返回一个解决的期约
            return Promise.resolve(AsyncQueue.EOS);
        } else { 
            return new Promise(resolve => this.resolvers.push(resolve));
        }
    }
    close() { 
        while (this.resolvers.length > 0) {
            this.resolvers.shift()(AsyncQueue.EOS);
        }
    }
    // 定义这个方法， 让这个类成为异步可迭代的额对象
    [Symbol.asyncIterator]() { return this; }

    // 定义这个方法 ， 让这个类成为异步迭代器
    // dequeue()返回的期约会解决成一个值
    // 或者在关闭时解决为EOS的标记， 这里， 我们需要返回一个解决为迭代器对象的期约
    next() {
        return this.dequeue().then(value => {
            if (value === AsyncQueue.EOS) {
                return {value, done: true};
            } else {
                return {value, done: false};
            }
        });
    }
}
// dequeue()返回的标记值， 在表示关闭时候的“流终止"
AsyncQueue.EOS = Symbol("end-of-stream");


function eventStream(elt, type) {
    const queue = new AsyncQueue();
    // elt.addEventListener(type, queue.enqueue.bind(queue), false);
    elt.addEventListener(type, () => queue.enqueue(), false);
    return queue;
}

async function handleKeys() {
    for await (const event of eventStream(document, "keypress")) {
        console.log(event.key);
    }
}   