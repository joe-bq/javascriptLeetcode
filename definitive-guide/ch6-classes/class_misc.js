// 扩展对象 
//
// 通过枚举每个source的元素
let target = {x:1}, source = {y:2, z:3};
for (let key of Object.keys(source)) {
    target[key] = source[key];
}



// 通过Object.assign方法
let o = {x:1}, p = {y:2, z:3};
o = Object.assign(o, p);
// 或者
o = Object.assign({}, o, p);

// 通过扩展运算符
let a = {x:1}, b = {y:2, z:3};
a = {...a, ...b};

// 如果只想复制那些不存在的属性
function merge(target, ...sources) {
    for (let source of sources) {
        for (let key of Object.keys(source)) {
            if (!(key in target)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

// 如果只想复制自有可枚举属性，可以使用Object.getOwnPropertyDescriptors和Object.defineProperties


// 序列化对象
let o1 = {x:1, y:{z:[false, null, ""]}}; // 定义一个测试对象
let s1 = JSON.stringify(o1); // 将其序列化为JSON
let p1 = JSON.parse(s1); // 再将其解析为一个JavaScript对象


//
// string对象方法 
//

// toString() 
let s = {x: 1, y : 1}.toString(); // 输出是 [object Object] -- 类型和类名
let point = {
    x: 1, 
    y: 2,
    toString() { return `(${this.x}, ${this.y})`; }
};

String(point); // 调用point.toString()方法

// toLocaleString()
let point1 = {
    x: 1,
    y: 2,
    toString() { return `(${this.x}, ${this.y})`; },
    toLocaleString() { return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`; }
}
point1.toString(); // => "(1, 2)"
point1.toLocaleString(); // => "(1, 2)"


// valueOf() 
// 自定义一个将对象转换为数值的方法
let point2 = {
    x: 3,
    y: 4,
    valueOf() { return Math.hypot(this.x, this.y); }
};
Number(point2); // => 5: 调用point.valueOf()方法
point2 > 4; // => true: 调用point.valueOf()方法
point2 > 5; // => false: 调用point.valueOf()方法
point2 > 6; // => false: 调用point.valueOf()方法


// toJSON()
let point3 = {
    x: 1,
    y: 2,
    toString() { return `(${this.x}, ${this.y})`; },
    toJSON() { return this.toString(); }
};

JSON.stringify([point3]); // => '["(1, 2)"]'

// 简写属性

let x = 1, y = 2;
let o2 = {x, y}; // 等价于 {x: x, y: y}
o2.x + o2.y; // => 3


// 计算的属性名 
const PROPERTY_NAME = "p1";
function computePropertyName() {
    return "p" + 2;
}
let o3 = {};
o3[PROPERTY_NAME] = 1;
o3[computePropertyName()] = 2;


// 也可以直接放到对象字面属性中
let p2 = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};
p2.p1 + p2.p2; // => 3


// 符号作为属性名
const extension = Symbol("my extension symbol");
let o3 = {
    [extension]: { /* extension data */ }
};
o[extension].x = 0; // => { /* extension data */ }

// symbol是一种Javascript对象定义安全的扩展机制 - “用于定义对象的新属性，而不会与现有属性冲突”


// spread运算符, ... 操作符， 用于把已有的对象属性复制到新对象中
let position = {x: 0, y: 0};
let dimensions = {width: 100, height: 75};
let rect = {...position, ...dimensions};
rect.x + rect.y + rect.width + rect.height; // => 175

// 扩展操作符只能操作自由属性
let o4 = Object.create({x: 1, y: 2});
let p3 = {...o4}; 
p3.x; // undefined

// 简写方法

let square = {
    area() { return this.side * this.side; },
    side: 10
};

square.area(); // => 100


// 简写方法和属性名的结合
let square1 = {
    area() { return this.side * this.side; },
    side: 10
};
square1.area(); // => 100

// 字符计算量和计算的属性名
const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
    "method With Spaces"() { return true; },
    [METHOD_NAME + "ethod"](x) { return x; },
    [symbol](x) { return x; }
};
weirdMethods["method With Spaces"](); // => true
weirdMethods[METHOD_NAME + "ethod"](1); // => 1
weirdMethods[symbol](2); // => 2

