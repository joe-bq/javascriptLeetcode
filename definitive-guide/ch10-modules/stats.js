const sum = (x, y) => x + y;
const square = x => x * x;
const mean = function(data) {
    return data.reduce(sum) / data.length;
}
const stddev = function(data) {
    const m = mean(data);
    return Math.sqrt(data.map(x => square(x - m)).reduce(sum) / (data.length - 1));
}

module.exports = { mean, stddev };