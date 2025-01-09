/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let anagramMap = new Map();
    for (let str of strs) { 
        let countMap = new Map();
        for (let c of str) {
            countMap.set(c, (countMap.get(c) || 0) + 1);
        }
        let key = Array.from(countMap.keys()).sort().map(x => x + String(countMap.get(x))).join('');
        if (!anagramMap.has(key)) {
            anagramMap.set(key, [])
        }
        let l = anagramMap.get(key);
        l.push(str);
    }

    return [...anagramMap.values()];
};


groupAnagrams(["eat","tea","tan","ate","nat","bat"]);