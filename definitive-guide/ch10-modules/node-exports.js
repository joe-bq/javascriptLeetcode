// nodes exports


const sum = (x, y) => x + y;
const square = x => x * x;


// exports.mean = function(data) {
//     return data.reduce(sum) / data.length;
// }

// 方法一： 是用全局对象
exports.mean = data => data.reduce(sum) / data.length;
exports.stddev = function(data) {
    let m = exports.mean(data);
    return Math.sqrt(data.map(x => x - m).map(square).reduce(sum) / (data.length - 1));
}

//或者是写成如下的方式
// 方法二， 使用module.exports 属性
const mean = data => data.reduce(sum) / data.length;
const stddev = data => {
    let m = mean(data);
    return Math.sqrt(data.map(x => x - m).map(square).reduce(sum) / (data.length - 1));
}
module.exports = { mean, stddev };



