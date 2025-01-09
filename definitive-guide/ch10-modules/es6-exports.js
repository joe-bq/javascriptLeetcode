//这个文件主要是展示如何而是用es6的导入和导出功能
export const PI = Math.PI;
export function degreesToRadians(degrees) {
    return degrees / 180 * PI;
}
export class Circle {
    constructor(r) {
        this.r = r;
    }
    area() {
        return PI * this.r * this.r;
    }
}
export { Circle, degreesToRadians, PI };

// 如果一个模块只需要一个默认导出，那么可以使用export default语法
export default class BitSet { 
}

// 说明： 虽然同时使用 export default + export语句是合法的， 但是不推荐
