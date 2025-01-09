
var MyQueue = function() {
    this.t = [];
    this.h = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.t.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    this._ensureH();
    return this.h.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    this._ensureH();
    return this.h[this.h.length-1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.t.length === 0 && this.h.length === 0;
};

MyQueue.prototype._ensureH = function() { 
    if (this.h.length == 0) { 
        while (this.t.length != 0) {
            this.h.push(this.t.pop());
        }
    }
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */