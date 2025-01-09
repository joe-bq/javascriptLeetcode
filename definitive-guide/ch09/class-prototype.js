// 类和原型
function range(from, to) {
    var r = Object.create(range.methods);
    r.from = from;
    r.to = to;
    return r;
}




range.methods = {
    includes: function(x) { return this.from <= x && x <= this.to; },
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    [Symbol.iterator]: function*() {
        for(var x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

let r = range(1, 3);
r.includes(2);
r.toString();
[...r];




// 如上的代码说明的是如何使用原型的方式， 构建类似于类的对象，这种方式是ES5的方式，ES6的方式是使用class关键字
// 如下个代码和上面类似， 利用了runction的内部属性和prototype属性

function Range(from, to) {
    this.from = from;
    this.to = to;
}
Range.prototype = {
    // 如果x在范围内则返回true，否则返回false
    includes: function(x) { return this.from <= x && x <= this.to; },

    [Symbol.iterator]: function*() {
        for(var x = Math.ceil(this.from); x <= this.to; x++) yield x;
    },
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }

};

let r1 = new Range(1, 3);
r1.includes(2);
r1.toString();
[...r1];


// 关于 constructor 属性, prototype属性和__proto__属性的关系
// constructor属性有一个指向prototype属性的指针， prototype属性有一个指向constructor属性的指针


let F = function() {};
let p = F.prototype;
let c = p.constructor;

c === F; // true


//使用class关键字的类
class Range1 {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    includes(x) { return this.from <= x && x <= this.to; }
    *[Symbol.iterator]() {
        for(var x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }
    toString() { return `(${this.from}...${this.to})`; }
    static parse(s) {
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if (!matches) {
            throw new TypeError(`Cannot parse Range from "${s}".`);
        }
        return new Range1(parseInt(matches[1]), parseInt(matches[2]));
    }
}

let r2 = new Range1(1, 3);
r2.includes(2);
r2.toString();
[...r2];
// 验证静态方法
let r3 = Range1.parse('(1...10)');
// 不可以这么使用
r2.parse('(1...10)'); // TypeError: r2.parse is not a function


// 关键字extends的使用

class Span extends Range1 {
    constructor(start, length) {
        if (length >= 0) {
            super(start, start + length);
        } else {
            super(start + length, start);
        }
    }
}


let square = function(x) { return x * x; }
square(3);
// 类也支持使用声明式的方式
let square2 = class { constructor(x) { this.area = x * x; } };
new square2(3).area;



// 获取方法， 设置方法， 及其他形式的方法
// 这里只是说明， 一些get， set方法的使用， 以及一些其他形式的方法， 可以使用字面量的方式在函数中定义
class Range2 {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    // 字面量定义方法 get
    get length() { return this.to - this.from + 1; }
    includes(x) { return this.from <= x && x <= this.to; }
    *[Symbol.iterator]() {
        for(var x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }
    toString() { return `(${this.from}...${this.to})`; }
    static parse(s) {
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if (!matches) {
            throw new TypeError(`Cannot parse Range from "${s}".`);
        }
        return new Range1(parseInt(matches[1]), parseInt(matches[2]));
    }
}

// 关于公有， 私有和静态字段
class Buffer {
    constructor() {
        this.size = 0;
        this.capacity = 0;
        this.buffer = new Uint8Array(this.capacity)
    }
}

class Buffer2 {
    #size = 0;
    #capacity = 0;
    #buffer = new Uint8Array(this.#capacity);
    get size() { return this.#size; }
}
// 新实例字段语法
class Buffer3 {
    size = 0;
    capacity = 0;
    buffer = new Uint8Array(this.capacity);
}

// 静态字段
class Range4 {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    includes(x) { return this.from <= x && x <= this.to; }
    *[Symbol.iterator]() {
        for(var x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }
    toString() { return `(${this.from}...${this.to})`; }
    static integerRangePattern = /^\((\d+)\.\.\.(\d+)\)$/;
    static parse(s) {
        let matches = s.match(this.integerRangePattern);
        if (!matches) {
            throw new TypeError(`Cannot parse Range from "${s}".`);
        }
        return new Range1(parseInt(matches[1]), parseInt(matches[2]));
    }
}

let r4 = new Range4(1, 3);
r4.includes(2);
r4.toString();
[...r4];

// 例子 - 一个复数类
class Complex {
    constructor(real, imaginary) {
        this.r = real;
        this.i = imaginary;
    }
    get real() { return this.r; }
    get imaginary() { return this.i; }
    get magnitude() { return Math.hypot(this.r, this.i); }
    plus(that) {
        return new Complex(this.r + that.r, this.i + that.i);
    }
    times(that) {
        return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
    }
    static sum(c, d) { return c.plus(d); }
    static product(c, d) { return c.times(d); }
    toString() { return `{${this.r}, ${this.i}}`; }
    equals(that) {
        return that instanceof Complex &&
            this.r === that.r &&
            this.i === that.i;
    }
}

// 静态字段 （或者说是勒属性） - 可以在在类定义语句外定义
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);


// 为已有类添加方法
Complex.prototype.conj = function() { return new Complex(this.r, -this.i); };

function extendStringStartsWith() {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(s) {
            return this.indexOf(s) === 0;
        };
    }
}

function extendNumberTimes() {
    Number.prototype.times = function(f, context) {
        let n = Number(this);
        for(let i = 0; i < n; i++) f.call(context, i);
    }
}

//对已有的类的对象添加方法 

function extendStringMethods() {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(s) {
            return this.indexOf(s) === 0;
        };
    }
}

extendStringMethods();
"JavaScript".startsWith("Java");    // true


// 另一个对已有的方法做扩展的例子
Number.prototype.times = function(f, context) {
    let n = Number(this);
    for(let i = 0; i < n; i++) f.call(context, i);
} 

// 使用
Number(5).times(console.log, console);
Number(5).times(console.log, null);



// ==
// 子类
// 

// 这是一个用代码展示不使用class语句， extends等关键词的class的扩展的代码如何编写的例子
function Span(start, span) { 
    if (span >= 0) {
        this.start = start;
        this.end = start + span;
    } else {
        this.start = start + span;
        this.end = start;
    }
}
Span.prototype = Object.create(Range.prototype);
Span.prototype.constructor = Span;
Span.prototype.toString = function() {
    return `(${this.start}...${this.end})`;
}; 

let span = new Span(2, 3);
span.includes(2); // true
console.log(span.toString()); // (2...5)



// 使用 extends 和 super创建子类 
class EZArry extends Array {
    get first() { return this[0]; }
    get last() { return this[this.length - 1]; }
}
let a = new EZArry(1, 2, 3);
a instanceof EZArry;
a instanceof Array;
a.push(4);
a.pop();
a.first
a.last
a[1];
Array.isArray(a);
EZArry.isArray(a); // 说明这样的静态的方法也收到了继承


// 以上的调用说明
// 1. 实例方法是另一个实例方法的原型， 所以可以  EZArray 实例可以调用Array的方法
Array.prototype.isPropotypeOf(EZArry.prototype); // false
// 2. 如下是ES6特有的实现， 说明，EZArray可以调用 Arrray的方法
Array.isPropotypeOf(EZArry); // true



// TypedMap的实现 
class TypedMap extends Map {
    constructor(keyType, valueType, entries) {
        // 如果entries有值， 那么可以检查他们的类型
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`key and value must be of type ${keyType}`);
                }
            }
        }

        super(entries);
        this.keyType = keyType;
        this.valueType = valueType;
    }
    set(key, value) {
        if (typeof key !== this.keyType) {
            throw new TypeError(`key must be of type ${this.keyType}`);
        }
        if (typeof value !== this.valueType) {
            throw new TypeError(`value must be of type ${this.valueType}`);
        }
        return super.set(key, value);
    }
}

// 使用委托， 而不是继承 
// 这是一种推荐的变成方式，即使用composition而不是inheritance
class Histogram {
    constructor() {
        this.map = new Map();
    }
    count(key) {
        return this.map.get(key) || 0;
    }
    has(key) { 
        //return this.map.has(key);
        return this.count(key) > 0;
    }

    get size() { 
        return this.map.size; 
    }

    add(key) { 
        this.map.set(key, this.count(key) + 1);
    }

    delete(key) {
        let count = this.count(key);
        if (count === 1) {
            this.map.delete(key);
        } else if (count > 1) {
            this.map.set(key, count - 1);
        }
    }
    [Symbol.iterator]() { 
        //return this.map[Symbol.iterator]();
        // 或者可以使用如下的方式
        return this.map.keys();
    }

    keys() { 
        return this.map.keys();
    }

    values() { 
        return this.map.values();
    }

    entries() { 
        return this.map.entries();
    }
}

//这里构建一个类层次和抽象类的例子 
class AbstractSet { 
    has(x) { throw new Error("Abstract method"); }
}

/**
 * NotSet是AbstractSet的一个子类， 它的实例代表一个包含所有非负整数的集合
 */
class NotSet extends AbstractSet {
    constructor(set) { 
        super();
        this.set = set;
    }
    has() {
        return !this.set.has(x);
    }
    toString() {
        return `{ x | x ∉ ${this.set.toString()} }`;
    }
}


/** RangeSet是  AbstractSet的一个具体的子类  
*/
class RangeSet extends AbstractSet {
    constructor(from, to) {
        super();
        this.from = from;
        this.to = to;
    }

    has(x) {
        return x >= this.from && x <= this.to;
    }

    toString() {
        return `{ x | ${this.from} ≤ x ≤ ${this.to} }`;
    }
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

/**
 * SingletonSet 是 AbstractEnumerableSet的一个具体的子类
 */
class SingletonSet extends AbstractEnumerableSet {
    constructor(member) {
        super();
        this.member = member;
    }
    has(x) { return x === this.member; }
    get size() { return 1; }
    *[Symbol.iterator]() { yield this.member; }
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

class BitSet extends AbstractEnumerableSet {
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
            // throw new TypeError(`Invalid set element: ${x}`);
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
                this.data[byte] |= 1 << (x % 8);
                this.n++;
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



BitSet.bits = new Uint8Array([1,2,4,8,16,32,128]);
BitSet.masks = new Uint8Array([~1,~2,~4,~8,~16,~32,~128]);