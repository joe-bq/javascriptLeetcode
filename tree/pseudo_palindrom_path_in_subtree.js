/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var pseudoPalindromicPaths  = function(root) {
    let pathDict = [0,0,0,0,0,0,0,0,0,0];
    let pathPalindrome = 0;
    var visit = function(node) {
        if (node !== null) {
            pathDict[node.val] += 1;
            if (node.left === null && node.right === null) {
                let cnt = pathDict.reduce((a, v) => (a + (v % 2)), 0);
                if (cnt <= 1) {
                    pathPalindrome += 1;
                }
            } else { 
                visit(node.left);
                visit(node.right);
            }
            pathDict[node.val] -= 1;
        }
    }

    visit(root);
    return pathPalindrome;
};




function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}


let root = new TreeNode(2, new TreeNode(3, new TreeNode(3), new TreeNode(1)), new TreeNode(1, null, new TreeNode(1)));

let ans = pseudoPalindromicPaths(root);
console.log("ans = " + ans);