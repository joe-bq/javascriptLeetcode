/**
 * @param {number[][]} points
 * @return {number}
 */

/*
var minTimeToVisitAllPoints = function(points) {
    let sum = 0;
    for (let i = 0; i < points.length; ++i) {
        sum += Math.max(Math.abs(points[i][0] - points[i-1][0]), Math.abs(points[i][1] - points[i-1][1])));
    }
    return sum;
};
*/

var minTimeToVisitAllPoints = function(points) {
    let [c, d] = [null, null];
    let sum = 0;
    for (let [a, b] of points)  {
        if (c == null) {
            [c, d] = [a, b];
        } else { 
            sum += Math.max(Math.abs(c-a), Math.abs(d-b));
            [c, d] = [a, b];
        }
    }
    return sum;
};
