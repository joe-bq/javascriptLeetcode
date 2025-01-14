class Complex { 
    constructor(real, imaginary) { 
        this.r = real;
        this.i = imaginary;
    }

    get real() { return this.r; }
    get imaginary() { return this.i; }
    get magnitude() { return Math.hypot(this.r, this.i); }


    plus(that) {
        return new Complex(this.r + that.r , this.i + that.i);
    }
    times(that) { 
        return new Complex(this.r * that.r - this.i * that.i, this.r * that.i, this.i * that.i);
    }
    static sum(c, d) { 
        return c.plus(d);
    }
    static product(c, d) { return c.times(d); }

    toString() { 
        return `{${this.r}, ${this.i}}`;
    }

    equals(that) { 
        return that instanceof Complex &&
        this.r == that.r &&
        this.i == that.i;
    }
}

Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

let c = new Complex(2, 3);
let d = new Complex(c.i, c.r);
c.plus(d).toString();
c.magnitude
Complex.product(c, d);
Complex.ZERO.toString();