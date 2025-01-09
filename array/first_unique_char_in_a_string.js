var firstUniqChar = function(s) {
    let pos =new Array(26).fill(-1);
    for (let i = 0; i < s.length; ++i) { 
        let c = s.charCodeAt(i) - 'a'.charCodeAt(0);

        // -1 means unitialized
        // -2 means found duplicated
        if (pos[c] == -1) {
            pos[c] = i;
        } else if (pos[c] != -2) { 
            pos[c] = -2;
        } 
    }


    for (let i = 0; i < s.length; ++i)  {
        let c = s.charCodeAt(i) - 'a'.charCodeAt(0);
        if (pos[c] >= 0) {
            return i;
        }
    }
    return -1;
};

// let ans = firstUniqChar('leetcode');
let ans =  firstUniqChar('loveleetcode');
console.log('ans = ' + ans);