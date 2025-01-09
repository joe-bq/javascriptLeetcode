// import * as stats from "./stats.js";

// 改成是动态的写法，可以是这样 
import("./stats.js").then(stats => {
    let average = stats.mean(data);
});

// import 不是方法调用， 是一个操作符 



// 另外， aysnc 函数也可以使用import
async function analyze(data) {
    let stats = await import ("./stats.js");
    return { 
        average: stats.mean(data),
        stddev: stats.stddev(data)
    };
}