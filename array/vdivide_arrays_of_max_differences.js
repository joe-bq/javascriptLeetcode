/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[][]}
 */
var divideArray = function(nums, k) {
    nums.sort((a,b) => a-b);
    let lists = new Array();
    let l = new Array();
    let cnt = 0;
    let groupMax = 0;
    let groupMin = 1e5 + 1;

    lists.push(l);
    for (let i = 0; i < nums.length; ++i) { 
        let v = nums[i];
        groupMax = Math.max(groupMax, v);
        groupMin = Math.min(groupMin, v);
        if (groupMax - groupMin > k) { 
            return new Array();
        }
        l.push(v);
        cnt += 1;
        if (cnt === 3) {
            cnt = 0;
            l = new Array();
            groupMax = 0;
            groupMin = 1e5 + 1;
            if (i + 1 > nums.length) { 
                lists.push(l);
            }
        }
    }
    return lists;

};


divideArray([1,3,4,8,7,9,3,5,1], 3);
