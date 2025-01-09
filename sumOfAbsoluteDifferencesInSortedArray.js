/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSumAbsoluteDifferences = function(nums) {
    let diff = [];
    diff.push(0);
    for (let i = 1; i < nums.length; i++) {
        diff.push(nums[i]-nums[i-1]);
    }

    let res = [];
    let sum = 0, acc_sum = 0;
    for (let i = 1; i < diff.length; i++) {
        acc_sum += diff[i];
        sum += acc_sum;
    }

    res.push(sum);
    for (let i = 1; i < diff.length; ++i) {
        res.push(res[i-1] - diff[i] * (diff.length - i - i));
    }

    return res;
};

let res = getSumAbsoluteDifferences([2,3,5]);
res.forEach(element => {
    console.log(element + ',')
});

