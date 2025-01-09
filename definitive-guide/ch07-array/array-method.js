// 这里主要介绍一些数组的方法 
// 这个非常类似在java里面的Stream API

// forEach方法
let data = [1, 2, 3, 4, 5], sum = 0;
data.forEach(value => sum += value);
data.forEach((v, i, a) => a[i] = v + 1);
// 传统的写法 
data.forEach(function(v, i, a) { a[i] = v + 1; });

// map
let a = [1, 2, 3];
a.map(x => x * x);
a;


// filter
let a1 = [5,4,3,2,1];
a1.filter(x => x < 3);
a1.filter((x, i) => i % 2 === 0);

// 这里的一个小技巧
// filter会忽略稀疏矩阵里面的未定义元素 , 它返回的书稠密的
let sparse = [1, , 3, , 5];
let dense = sparse.filter(() => true);
dense;

// 但是如果数组中有稀疏矩阵，又想删除值为undefined的元素或是null，可以这样
a = [1, null, 3, undefined, 5];
a.filter(x => x !== undefined && x !== null);


// every 和 some
//他们分别是全称量词和存在量词
// 
let a2 = [1, 2, 3, 4, 5];
a2.every(x => x < 10); // true
a2.every(x => Number.isInteger(x));
a2.every(x => x % 2 === 0); // false



//some方法
let a3 = [1, 2, 3, 4, 5];
a3.some(x => x % 2 === 0); // true
// 它们也接受和java一样的方法引用 (isNaN)
a3.some(x => x < 0); // false
a3.some(isNaN); // false


// reduce 和 reduceRight
let a4 = [1, 2, 3, 4, 5];
// 累加的例子
a4.reduce((sum, x) => sum += x, 0);
// 求最大值
a4.reduce((max, x) => x > max ? x : max);
// 求积
a4.reduce((product, x) => product *= x, 1);
// reduce和reduceRight也支持第二个参数，表示初始值， 这里没有例子说明

// reduceRight
let a5 = [2,3,4];
a5.reduceRight((acc, val) => Math.pow(val, acc));


// flat 和 flatMap
[1,[2,3]].flat();
[1,[2,[3]]].flat(2); // 打平多少层
[1,2,3].flatMap(x => [x, x * 2]); // 支持multiMap的使用

// 类似的一个比较实用的例子 
let phrases = ["hello world", "the quick brown fox"];
let words = phrases.flatMap(phrase => phrase.split(" "));
words; // ["hello", "world", "the", "quick", "brown", "fox"]

// shift 和 unshift, push 和 pop
// 这些操作bu在本例子中展开

// slice(), splice(), fill(), reverse(), sort()
// slice主要的作用是切片
let a6 = [1,2,3,4,5];
a6.slice(0, 3); // [1,2,3]
a6.slice(3); // [4,5]
a6.slice(-2); // [4,5]
a6.slice(1, -1); // [2,3,4]
a6.slice(-3, -2); // [3]

// splice - 既做删除，也做插入的通用算法
let a7 = [1,2,3,4,5,6,7,8];
a7.splice(4); // 删除4以后的元素
a7.splice(1, 2); // 删除1,2
a7.splice(1, 1, "one", "two"); // 删除1，插入one, two

// fill - 填充
let a8 = new Array(5);
a.fill(0); // 全部填充0
a.fill(9, 1); // 从1开始填充9
a.fill(8, 2, -1); // 从2开始到4填充8

// copyWithin - 复制
let a9 = [1,2,3,4,5];
a9.copyWithin(1); // [1,1,2,3,4]: 把数组元素复制到索引1及以后
a9.copyWithin(2,3,5); // [1,1,4,5,4]: 把索引3和4的元素复制到索引2和3
a9.copyWithin(0, -2); // [4,5,4,5,4]: 把最后两个元素复制到前面, 支持负偏移量

// 数组索引和排序算法
// indexOf, lastIndexOf, findIndex, find, includes
// indexOf, lastIndexOf
let a10 = [0,1,2,1,0];
a10.indexOf(1); // 1
a10.lastIndexOf(1); // 3
a10.indexOf(3); // -1


// 下面的例子演示了如何从数组a找到所有的x值，返回匹配索引的数组 
function findAll(a, x) {
    let results = [], len = a.length, pos = 0;
    while ((pos = a.indexOf(x, pos)) !== -1) {
        results.push(pos);
        pos = pos + 1;
    }
    return results;
}

// includes() 
// ES2016引入了includes方法，它是indexOf的简化版，返回true或false
// 要说明的是 includes()方法区分NaN
let a11 = [1, true, 3, NaN];
a11.includes(true); // true
a11.includes(2);
a11.includes(NaN); // true
a11.indexOf(NaN); // -1, 判断NaN，使用isNaN方法 


// sort() - 排序
// sort()方法默认按照字母顺序排序 ，如果你需要按照数字顺序排序，需要传入一个比较函数
let a12 =["banana", "cherry", "apple"];
a12.sort();

let a13 = [33, 4, 1111, 222];
a13.sort(); // [1111, 222, 33, 4]
a13.sort((a, b) => a - b); // [4, 33, 222, 1111]
a13.sort((a, b) => b - a); // [1111, 222, 33, 4]
let a14 = ["ant", "Bug", "cat", "Dog"];
a14.sort(); // ["Bug", "Dog", "ant", "cat"]
a14.sort((a, b) => a.localeCompare(b)); // ["ant", "Bug", "cat", "Dog"]
// reverse() - 反转
let a15 = [1,2,3];
a.reverse(); // [3,2,1]


// 数组的转换
// 比如一个简单的连接数组返回字符串的方式，可以选择连接的字符串的方法
let a16 = [1,2,3];
a16.join();
a16.join(" ");
a16.join("");
let b = new Array(10); // 类似其他语言的repeat算法的时候
b.join("-");

// toString()方法
[1,2,3].toString(); // "1,2,3"
[1, [2, [3]]].toString(); // "1,2,3"
["a", "b", "c"].toString(); // "a,b,c"
[1,[2,"c"]].toString(); // "1,2,c"


// 数组的静态方法
// Array.of, Array.from, Array.isArray
Array.isArray([]); // true
Array.isArray({}); // false


// 什么是类数组成员
// length属性会在新元素加入的时候自动更新
// 设置为更小的值会截断数组
// 数组Array.prototype()对数组返回true 
// Array.isArray() 对类数组返回false

// 创建一个类数组对象
let a18 = {};
let i = 0;
// 添加属性让其变成类数组对象
while (i < 10) {
    a18[i] = i * i;
    i++;
}
a18.length = i;

//现在可以像真正的数组一样遍历这个对象 
let total = 0;
for (let j = 0; j < a18.length; j++) {
    total += a18[j];
}




//数组举例
function isArrayLike(o) {
    if (o &&
        typeof o === "object" &&
        isFinite(o.length) &&
        o.length >= 0 &&
        Number.isInteger(o.length) &&
        o.length < 4294967296) {
        return true;
    } else {
        return false;
    }
}

// 数组的方法被设计成了范型方法，所以可以作用在类数组方法上面，例子
let a19 = {0: "a", 1: "b", 2: "c", length: 3};
Array.prototype.join.call(a19, "+"); // "a+b+c"
Array.prototype.slice.call(a19, 0); // ["a", "b", "c"]
Array.from(a); // ["a", "b", "c"]



// 作为数组的字符串 
let s = "test";
s.charAt(0); // "t"
s[1]; // "e"

Array.prototype.join.call(s, "-"); // "t-e-s-t"