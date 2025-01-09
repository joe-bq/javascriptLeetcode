/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
    let uniqueArr = new Array();
    let uniqueArrLen = new Array();
    for (let x of arr) {
        let xSet = new Set(x);
        if (xSet.size == x.length) { 
            let mask = 0;
            for (let c of xSet) {
                mask |= (1 << c.charCodeAt(0));
            }
            uniqueArr.push(mask);
            uniqueArrLen.push(x.length);
        }
    }

    var backtrack = function(index, length, current) { 
        let maxLength = length;
        for (let i = index; i < uniqueArr.length; ++i ) {
            if ((current & uniqueArr[i]) == 0) {
                maxLength = Math.max(maxLength, backtrack(i, length+uniqueArrLen[i], current | uniqueArr[i]));
            }
        }
        return maxLength;
    }
    let maxLength = backtrack(0, 0, 0);
    return maxLength;
    
};


let ans = maxLength(["un","iq","ue"]);
console.log("ans = " + ans);