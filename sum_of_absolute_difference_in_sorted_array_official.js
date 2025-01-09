/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSumAbsoluteDifferences = function(nums) {
    const n = nums.length;
    let prefix_sum = new Array(n);
    let suffix_sum = new Array(n);
    let result = new Array(n);

    // init prefix_sum[0] and suffix_sum[n-1]
    prefix_sum[0] = nums[0];
    suffix_sum[n-1] = nums[n-1];

    // do the prefix_sum[i] and suffix_sum[n-1-i] iteratively
    for (let i = 1; i < n; ++i) { 
        prefix_sum[i] = prefix_sum[i-1] + nums[i];
        suffix_sum[n-1-i] = suffix_sum[n-i] + nums[n-1-i];
    }

    for (const [i, value] of nums.entries()) {
        let current_absolute_diff = (nums[i] * i - prefix_sum[i]) + (suffix_sum[i] - nums[i] * (n-1-i));
        result[i]= current_absolute_diff;
    }

    return result;
};

let res = getSumAbsoluteDifferences([2,3,5]);
console.log('[' + res.join(',') + ']');