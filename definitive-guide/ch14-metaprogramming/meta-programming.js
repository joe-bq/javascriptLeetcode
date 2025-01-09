// 属性的特征 

// 一般的属性有如下的几种 


// - writable: 表示属性是否可以被修改
// - enumerable: 表示属性是否可以被枚举
// - configurable: 表示属性是否可以被删除或者是否可以再次修改特性
// - 
Object.geetOwnPropertyDescriptor({x: 1}, 'x'); // {value: 1, writable: true, enumerable: true, configurable: true}

const random = {
  get octet() {
        return Math.floor(Math.random() * 256);
    }
};

//
Object.getOwnPropertyDescriptor(random, 'octet'); // {get: function, set: undefined, enumerable: true, configurable: true}  

// 对于继承的属性或者是不存在的属性返回udefined
Object.getOwnPropertyDescriptor({}, 'x'); // undefined
Object.getOwnPropertyDescriptor({}, 'toString'); // {value: function, writable: true, enumerable: false, configurable: true}

// 
let o = {};
Object.defineProperty(o, 'x', {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});


o.x; // 1
Object.keys(o); // []



// 现在修改这个属性 x， 把它改成是只读
Object.defineProperty(o, 'x', {
    writable: false
});
o.x = 2; // 在严格模式下失败，静默模式下不会报错
o.x; // 1


// 但是这个属性依然是可以配置的， 可以通过这个方法修改它的值
Object.defineProperty(o, 'x', {
    value: 2
});
o.x; // 2

// 把这个x从数据属性，修改成是可访问属性
Object.defineProperty(o, 'x', {
    get: function() {
        return 0;
    }
});
o.x; // 0


// 现在修改这个属性 x， 把它改成是不可配置
Object.defineProperty(o, 'x', {
    configurable: false
});
o.x; // 1


// 如果一次需要创建或者是修改多个属性 ， 可以使用  Object.defineProperties
let p = Object.defineProperties({}, {
    x: {value: 1, writable: true, enumerable: true, configurable: true},
    y: {value: 1, writable: true, enumerable: true, configurable: true},
    r: {get: function() {return Math.sqrt(this.x * this.x + this.y * this.y)}, enumerable: true, configurable: true}
});


p.r; // Math.sqrt(2)


// 下面的方法可以用来将对象的属性做复制 
// 使用了Object.defineProperties
// 这个方法与Object.assign的方法类似
// 它与一般的对象拷贝的区别在于这个方法不仅仅是靠这对象， 它还会将对象的属性的特性也一并拷贝
// 并且如果 Object.defineProperty抛出的异常，也会被抛出 
Object.defineProperty(Object, "assignDescriptors", {
    value: function(target, source) {
        if (source) {
            // Object.keys(source).forEach(function(key) {
            //     Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            // });
            for (let name of Object.getOwnPropertyNames(source)) {
                let desc = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, desc);
            }

            for (let symbol of Object.getOwnPropertySymbols(source)) {
                let desc = Object.getOwnPropertyDescriptor(source, symbol);
                Object.defineProperty(target, symbol, desc);
            }
        }
        return target;
    },
    writable: true,
    configurable: true,
    enumerable: false
});


let o4 = { c: 1, get count() { return this.c++; } };
let p4 = Object.assign({}, o4);
let q4 = Object.assignDescriptors({}, o4);

p4.count; // 1
p4.count; // 1
q4.count; // 2
q4.count; // 3 原因： 不仅仅拷贝了值， 它的设置方法也一起拷贝了 


// 对象扩展能力 


// 使得对象不能再添加新的属性
// 但是如果对象的原型可以添加属性，不可扩展对象依旧可以继承到这个新的属性
Object.preventExtensions(); 

// Object.preventExtensions() 使得对象不能再添加新的属性
// Objects.seal() 让对象不可以扩展， 同时也让对象的自由属性不可以扩展
// 不可以扩展的意思是: 不能添加新的属性， 不能删除已有的属性， 不能修改属性的特性, 但是可以修改的属性依旧可以修改
Objects.seal();
// Objects.freeze() 更加严格的锁定对象， 除了让对象不可以扩展， 还让让对象把所有的自由属性变成只读的
Objects.freeze();



// Prototype特性
Object.getPrototypeOf({}); // Object.prototype
Object.getPrototypeOf([]); // Array.prototype
Object.getPrototypeOf(() => {}); // Function.prototype


// 如何去判定一个对象是不是另一个对象的原型
let p5 = {x: 1};
let o5 = Object.create(p5);
p5.isPrototypeOf(o5); // true
Object.prrototype.isPrototypeOf(p5); // true






//14.4 公认符号

// Symbol.iterator
// Symbol.asyncIterator
// Symbol.hasInstance


let uint8 = {
    [Symbol.toStringTag]: "Uint8Array",
    [Symbol.hasInstance](instance) {
        return Number.isInteger(instance) && instance >= 0 && instance < 256;
    }
}

128 instanceof uint8; // true
-1 instanceof uint8; // false
Math.PI instanceof uint8; // false




// Symbol.toStringTag

Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(/./); // [object RegExp]
// ...

function classof() {
    return Object.prototype.toString.call(this).slice(8, -1);
}


classof(null); // => "Null"
classof(undefined); // => "Undefined"
// ...


// ES6之前的 Object.prototype.toString.call() 方法的缺点 - 只对内置方法有效， 对于自定义的对象无效
// ES6之后， 可以通过Symbol.toStringTag属性来解决这个问题

class Range {
    get [Symbol.toStringTag]() {
        return "Range";
    }
}

let r = new Range(1, 10);
Object.prototype.toString.call(r); // [object Range]
classof.call(r); // "Range"


// Symbol.species

// ES6 默认返回的是子类的对象
class ZArray extends Array {
    get first() { return this[0]; }
    get last() { return this[this.length - 1]; }
}

let e = new ZArray(1, 2, 3);
let r1 = e.map(x => x * x);
e.last; // 3 
r1.last; // 9


// 但是如果想让EZArray继承的返回数组的方法都返回常规的Array的对象
// 可以通过Symbol.species来实现 - 只需要把[Symbol.species]属性设置为Array
class EZArary extends Array {
    static get [Symbol.species]() { return Array; }
    get first() { return this[0]; }
    get last() { return this[this.length - 1]; }
}



let e1 = new ZArray(1, 2, 3);
let f1 = e1.map(x => x * x);
e1.last; // 3
f1.last; // 9



// Symbol.isConcatSpreadable
// 这个值主要是来控制是否可以被展开
let arrayLike = { length: 1, 0: 1, [Symbol.isConcatSpreadable]: true };
[].concat(arrayLike); // [1]


// 模式匹配符号

// Symbol.match, Symbol.replace, Symbol.search, Symbol.split


class Glob {
    constructor(glob) {
        this.glob = glob;
        let regexpText = glob.replace("?", "([^/])").replace("*", "([^/]*)");
        this.regexp = new RegExp(`^${regexpText}$`, "u");
    }

    toString() { return this.glob; }

    [Symbol.search](s) { return s.search(this.regexp); }
    [Symbol.match](s) { return s.match(this.regexp); }
    [Symbol.replace](s, replacement) { return s.replace(this.regexp, replacement); }
}

// 这是一个模拟文件glob的功能
let pattern = new Glob("docs/*.txt");
"docs/js.txt".search(pattern); // => 0
"docs/js.htm".search(pattern); // => -1
let match = "docs/js.txt".match(pattern);
match[0]; // "docs/js.txt"
match[1]; // "js"
match.index; // 0
"docs/js.txt".replace(pattern, "web/$1.html"); // "web/js.html"

// Symbol.toPrimitive
// 我们先来看看之前说的javascript如何做的到原始对象的转换 
// 如果预期是一个字符串， 那么会调用toString方法， 如果预期是一个数字， 那么会调用valueOf方法
// Symbol.toPrimitive可以让我们自定义这个转换的过程
// 如果参数是  string, 在字符的上下文做这个转换
// 如果参数是 number, 在数字的上下文做这个转换
// 如果是 "default"， 在默认的上下文做这个转换


// Symbol.unscopables
// 这里不解释

// 模板标签
// 如果一个求值为函数的表达式后面跟着一个模板字面量，那就会转换为一个函数调用 
// 我们称其为“标签化模板字面量”
// 它的作用主要用来定义DSL (domain-Specific Language) 语言


// 例子： 我们来定义i个html的转换的模板
function html(strings, ...values) {
    let escaped = values.map(v => String(v)
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;"));

    // 返回拼接在一起的字符串和转宜符号
    let result = strings[0];
    for (let i = 0; i < escaped.length; i++) {
        result += escaped[i] + strings[i + 1];
    }
    return result;
}
let operator = "<";
htmp`<b>x ${operator} y</b>`; // "<b>x &lt; y</b>"
let kind = "game", name = "D&D";

html`<div class="${kind}">${name}</div>`; // "<div class="game">D&amp;D</div>"


// 另一个例子
function glob(strings, ...values) {
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
        result += values[i] + strings[i + 1];
    }
    return new Glob(result);
}

let root = "/tmp";
let filePattern = glob`${root}/*.html`;
"/tmp/test.html".match(filePattern)[1]; // test



// reflection API


//有如下的的reflection API

//Reflect.apply
// Reflect.construct
// Reflect.defineProperty
// Reflect.deleteProperty
// Reflect.get
// Reflect.getOwnPropertyDescriptor
// Reflect.getPrototypeOf
// Reflect.has
// Reflect.isExtensible
// Reflect.ownKeys
// Reflect.preventExtensions
// Reflect.set
// Reflect.setPrototypeOf


// 一个简单的代理对象
// 返回请求它的名字

let identity = new Proxy({}, {
    get(o, name, target) {
        return name;
    },
    has(o, name) {
        return true;
    },
    ownKeys(o) {
        return new RangeError("Infinite numer of properties");
    },
    getOwnPropertyDescriptor(o, name) {
        return {value: name, enumerable: false, writable: false, configurable: false};
    },
    // 所有的属性都是只读的，
    set(o, name, value) {
        return false;
    },
    deleteProperty(o, name) {
        return false;
    },
    defineProperty(o, name, desc) {
        return false;
    },
    isExtensible(o) {
        return false;
    },
    getPropertyOf(o) {
        return null;
    },
    setPrototypeOf(o, proto) {
        return false;
    },
});

// 现在我们来检查这个对象的定义和值
identity.x; // "x"
identity.toString; // "toString"
identity[0]; // "0"
identity.x = 1; // false
identity.x
delete identity.x; // false
identity.x; // "x"
Object.keys(identity); // RangeError: Infinite number of properties
for (let p of identity) { console.log(p); } // x toString 0



//  代理对象 
let proxy = new Proxy(target, handlers);
/**
 * 返回一个封装o的代理对象，基于任何操作记录他的操作日志
 * @param {对象} o 
 * @param {对象的名字} objname 
 * @returns 
 */
function loggingProxy(o, objname) { 
    // 为日志代理定义处理器
    // 每个处理器都先打印一条消息，再委托到目标对象
    const handler = {
        get(target, prop, receiver) {
            console.log(` Handler get(${objname}, ${prop.toString()})`);
            let value = Reflect.get(target, prop, receiver);

            // 如果是目标的自有属性，而且值
            // 为对象或者是函数，、则返回这个对象值的代理
            if (Reflect.ownKeys(Reflect).includes(prop) && (typeof value === "object" || typeof value === "function")) {
                return loggingProxy(value, `${objname}.${prop.toString()}`);
            }

            // 否则原封不动的返回值
            return value;
        },
        set(target, prop, value, receiver) {
            console.log(` Handler set(${objname}.${prop} = ${value})`);
            return Reflect.set(target, prop, value, receiver);
        },
        apply(target, receiver, args) {
            console.log(` Handler apply(${objname}(${args.join(", ")})`);
            return Reflect.apply(target, receiver, args);
        },
        construct(target, args, newTarget) {
            console.log(` Handler construct(new ${objname}(${args.join(", ")})`);
            return Reflect.construct(target, args, newTarget);
        }
    };

    // 剩下的处理器可以自动生成
    //
    Reflect.ownKeys(Reflect).forEach(handlerName => {
        if (!handlerName in handler) {
            handler[handlerName] = function(...args) {
                console.log(`${objname}.${handlerName}(${args.join(", ")})`);
                return Reflect[handlerName](...args);
            };
        }
    });

    // 返回代理
    return new Proxy(o, handler);
}


// 哦们来验证这个结果
let data = [10, 20];
let methods = { square: x => x * x };

// 构建日志代理
let proxyData = loggingProxy(data, "data");
let proxyMethods = loggingProxy(methods, "methods");

data.map(methods.square);

// 通过下面的方法可以看到代理对象的操作日志
proxyData.map(methods.square);

// 查看代理方法对象
proxyData.map(proxyMethods.square);


for (let x of proxyData) {
    console.log(x);
}

