let p = {
    x: 1.0,
    y: 1.0,
    get r() {
        return Math.hypot(this.x, this.y);
    },
    set r(value) {
        let oldValue = Math.hypot(this.x, this.y);
        let ratio = value / oldValue;
        this.x *= ratio;
        this.y *= ratio;
    },

    get theta() {
        return Math.atan2(this.y, this.x);
    },
};

p.r;
p.theta;



//编码规范，使用 _表示是内部的属性
const serialNum = {
    _n: 0,
    get next() {
        return this._n++;
    },
    set next(n) {
        if (n >= this._n) this._n = n;
        else throw new Error("serial number can only be set to a larger value");
    }
};

serialNum.next = 10;
serialNum.next;
serialNum.next;
serialNum.next = 5;
serialNum.next = 15;




const random = {
    get octet() {
        return Math.floor(Math.random() * 256);
    },
    get uint16() {
        return Math.floor(Math.random() * 65536);
    },
    get int16() {
        return Math.floor(Math.random() * 65536) - 32768;
    }
};