// 导入的最简洁的形式如下
import BitSet from '.bitset.js';

// 一次导入多个值的方式
import { mean, stddev } from './stats.js';


// 也可以导入所有的值， 使用通配符
import * as stats from './stats.js';

// 模块要么定义一个默认导出， 要么定义多个命名导出， 虽然可以同时定义两者， 但是不推荐这样做
// 如下的代码演示如何使用
import Histogram, { mean, stddev } from './histogram-stats.js';

// 对于只运行一次， 不需要非默认导出或者是命名的导出
// 可以没有导出命名 
import "./analytics.js";



// == 
// 如下的方式展示了如何导入和导出的时候重名 
// 特别是如果有命名冲突的时候使用
import { render as renderImage } from './imageutils.js';
import { render as renderUI } from './ui.js';

// 默认模块也支持重命名 
import { default as Histogram, mean, stddev } from './histogram-stats.js';

//  导出也支持重命名， 下面是一个例子
export { 
    layout as calculateLayout, 
    render as renderLayout
};


// 再导出
// 使用导入 + 导出的方式
import { mean } from "./stats/mean.js";
import { stddev } from "./stats/stddev.js";
export { mean, stddev };

// ES6模块设计者预料到了这个问题， 所以支持导入和导出合二为一的语法
export { mean } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";
export * from "./stats/mean.js";
export * from "./stats/stddev.js";

// 再导出重命名导出
export { mean, mean as average } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";
// 再导出重命名导出， 假设mean.js 和 stddev.js 都使用了默认导出 
export { default as mean} from "./stats/mean.js";
export { default as stddev } from "./stats/stddev.js";

// 再导出的时候，如果希望把命名导出为default， 可以这么写
// 由于冲突， 所以下面的来个语句被注释掉了
// export { mean as default } from "./stats.js";
// export { default } from "./stats/mean.js";


