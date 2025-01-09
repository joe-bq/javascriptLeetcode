// 如下的类是所需要类的实现

//这里构建一个类层次和抽象类的例子 
class AbstractSet {
    has(x) { throw new Error("Abstract method"); }
}

/** 
 * AbstractEnumerableSet是 AbstractSet的一个具体的子类
 */

class AbstractEnumerableSet extends AbstractSet {
    get size() { throw new Error("Abstract method"); }
    [Symbol.iterator]() { throw new Error("Abstract method"); }
    isEmpty() { return this.size === 0; }
    toString() { return Array.from(this).join(", "); }
    equals(set) {
        if (!(set instanceof AbstractEnumerableSet)) return false;
        if (this.size !== set.size) return false;
        for (let element of this) {
            if (!set.has(element)) return false;
        }
        return true;
    }
}

class AbstractWritableSet extends AbstractEnumerableSet {
    insert(x) { throw new Error("Abstract method"); }
    remove(x) { throw new Error("Abstract method"); }
    add(set) {
        for (let element of set) {
            this.add(element);
        }
    }

    substract(set) {
        for (let element of set) {
            this.remove(element);
        }
    }

    intersect(set) {
        for (let element of this) {
            if (!set.has(element)) this.remove(element);
        }
    }
}



class BitSet extends AbstractWritableSet {
    constructor(max) {
        super();
        this.max = max;
        this.n = 0;
        this.numBytes = Math.floor(this.max / 8) + 1;
        this.data =
            new Uint8Array(this.numBytes);
    }

    _valid(x) {
        if (x < 0 || x > this.max) {
            //throw new TypeError(`Invalid set element: ${x}`);
            return false;
        }
        return true;
    }

    _has(x) {
        if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            return (this.data[byte] & (1 << (x % 8))) !== 0;
        } else {
            return false;
        }
    }

    insert(x) {
        if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            if ((this.data[byte] & (1 << (x % 8))) === 0) {
                // console.log('insert', x, ' at ' , byte);
                this.data[byte] |= 1 << (x % 8);
                this.n++;
                // console.log('done ', this.data[byte]);
            }
        }
    }

    remove(x) {
        if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            if ((this.data[byte] & (1 << (x % 8))) !== 0) {
                this.data[byte] &= ~(1 << (x % 8));
                this.n--;
            }
        }
    }

    get size() {
        return this.n;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i <= this.max; i++) {
            if (this._has(i)) yield i;
        }
    }
}

// Helper functions
function isValid(set, value) {
    return Number.isInteger(value) && value >= 0 && value < set.size;
}

function has(set, value) {
    return isValid(set, value) && Boolean(set.data[value]);
}

// 如果只导出一个symbol， 可以是使用 export default方法
module.exports = { BitSet };
