/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let stack = [];
    for (let x of tokens) {
        switch (x) { 
            case '+':
                let op2 = stack.pop();
                let op1 = stack.pop();
                stack.push(op1+op2);
                break;
            case '-':
                op2 = stack.pop();
                op1 = stack.pop();
                stack.push(op1-op2);
                break;
            case '*':
                op2 = stack.pop();
                op1 = stack.pop();
                stack.push(op1*op2);
                break;
            case '/':
                op2 = stack.pop();
                op1 = stack.pop();
                stack.push(~~(op1/op2));
                break;
            default:
                stack.push(~~x);
                break;
            
        }
    }
    return stack.pop();
};