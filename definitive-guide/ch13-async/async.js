// 异步编程

const { response } = require("express");

// setTimeout 
let checkForUpdates = () => { console.log('update'); };
let updateIntervalId = setInterval(checkForUpdates, 60000);

// setInterval返回一个值, 把这个值传递给 clearInterval可以停止定时器
function stopCheckingForUpdates() {
    clearInterval(updateIntervalId);
}


// 事件 
let okay = document.querySelector('#confirmUpdateDialog button.okay');
let applyUpdate = () => { ole.log('update confirmed'); };
okay.addEventListener('click', applyUpdate);



// 网络事件 
// 通过XMLHttpRequest对象来实现异步请求
// 这里说明一下， 在新的APD里面， fetch函数已经替代了 XMLHttpRequest对象
function getCurrentVersionNumber(versionCallback) {
    let request = new XMLHttpRequest();
    request.open('GET', 'version.json');
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            let version = JSON.parse(request.responseText).version;
            versionCallback(version);
        } else { 
            versionCallback(response.statusText, null);
        }
    };

    request.onerror = request.timeout = function(e) {
        versionCallback(e.type, null);
    }
}



// Node事件中的回调
const fs = require('fs');
// to receive the data from the file
let options = {
};

fs.readFile("context.json", 'utf-8', (err, data) => {
    if (err) {
        console.error("could not read config fle: ", err);
    } else {
        Object.assign(options, JSON.parse(data));
    }

    // to start the program
    startProgram(options);
});


// 再来一段http请求获取URL内容的事情


const http = require('http');
const { Network } = require("inspector/promises");
function getText(url, callback) {
    // 发送一个请求
    request = https.get(url);

    // 注册一个函数，处理 response事件
    request.on("response", response => {
        // 获取状态码, 意味着收到了响应头
        let httpStatus = response.statusCode;

        // 设置编码 , 注意还需要注册响应事件， 处理收到响应体的时候的回调
        response.setEncoding('utf-8');
        let body = '';

        // 注册一个函数，处理data事件
        response.on('data', chunk => {
            body += chunk;
        });

        // 响应完成的时候， 会调用这个处理程序
        response.on("end", () => {
            if (httpStatus === 200) {
                callback(null, body);
            } else { 
                callback(httpStatus, null);
            }
        });
    });

    // 注册一个函数，处理错误事件
    request.on("error", e => {
        callback(e, null);
    });
}





// 期约  
// 期约是一个对象， 代表一个异步操作的最终结果
// 解释期约相关的术语， 还有展示期约相关的实现
// 展示如何连缀期约，
// 如何使用期约来创建自己的API


// 使用期约

getJSON(url).then(jsonData =>{
    console.log(jsonData);
});

// 假设你有一个类似的函数处理显示用户的简介 
function displayUserProfile(profile) {
    /* 省略实现细节 */
}
getJSON("/api/user/profile").then(displayUserProfile);


// 使用期约处理错误
getJSON("/api/user/profile").then(displayUserProfile, handleProfileError);

// 但是更常见的做法是通过catch处理错误
getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);



// 期约链

fetch(documentURL)
.then(response => response.json())
.then(document => { return render(document); })
.then(rendered => {
    cacheInDatabase(rendered);
})
.catch(e => {
    handle(error);
});



// 通过新的fetch的API处理这个 

fetch("/api/user/profile").then(response => {
    // 在解决期约的时候， 访问HTTP的状态和头部
    if (response.ok && response.headers.get('Content-Type').startsWith('application/json')) {
        // 头部到了 ， 但是响应体还不一定到达 
        // return response.json();
    } 
});




fetch("/api/user/profile").then(response => {
    response.json().then(profile => {
        // 通过这个方法处理响应体到达的时候， 数据会被自动的解析成 json， 并传入这个函数
        displayUserProfile(profile);
    });
});




// 一个正确的使用 期约的方式 


fetch("/api/user/profile")
.then(response => {
    return response.json();
})
.then(profile => {
    displayUserProfile(profile);
});




// 期约的解决
function c1(response) {
    let p4 = response.json
    return p4;
}
function c2(profile) {
    displayUserProfile(profile);
}



let p1 = fetch("/api/user/profile");
let p2 = p1.then(c1);
let p3 = p2.then(c2);


//从 ES2018开始， 期约对象还定义了一个 .finally() 方法


fetch("/api/user/profile")
.then(response => {
    if (!response.ok) {
        throw null;
    }

    // 
    let type = response.headers.get('Content-Type');
    if (!type || !type.startsWith('application/json')) {
        throw new TypeError("expected JSON response. got ${type}");
    }

    // 检查通过， 返回状态码为2xx，内容也是JSON， 
    return response.json();
})
.then(profile => {
    if (profile) {
        displayUserProfile(profile);
    } else { 
        displyaLoggedOutProfile();
    }
})
.catch(e => {
    if (e instanceof NetworkError) {
        displyaErrorMessage("check your internet connection.");
    } else if (e instanceof TypeError) { 
        displyaErrorMessage("Something went wrong with the server!");
    } else { 
        // here ,we have an unexpected error
        console.error(e);
    }
});




// 我们再来看一个例子
startAsyncOperation()
.then(doStageTwo)
.catch(handleStageTwoError)
.then(doStageThree)
.then(doStageFour)
.catch(logStageThreeAndFourErrors);

// 注意上面的catch和处理的顺序 



queryDatabase()
.then(displayTable)
.catch(displyaDatabaseError);


// 另一个例子， 通过.catch的方式来重试发送请求
queryDatabase()
.catch(e => wait(500).then(queryDatabase))
.then(displayTable)
.catch(displyaDatabaseError);



// 并行期约
const urls = [ /* 0或者多个URL */ ];
promises  = urls.map(url => fetch(url).then(response => response.text()));

Promise.all(promises)
.then(bodies => { 
    /* 处理所有的响应体 */
})
.catch(e => console.error(e));


// 除了这个  Promise.all, 之外， 还有一个 allSettled

Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(results => {
    console.log(results[0]); // =>  {status: "fulfilled", value: 1}
    console.log(results[1]); // =>  {status: "rejected", reason: 1}
    console.log(results[2]); // =>  {status: "fulfilled", value: 3}
});



// 如何创建一些期约 

// 创建期约
let p = new Promise((resolve, reject) => {
    // 异步操作
    if (true/* 异步操作成功 */) {
        resolve(value);
    } else { 
        reject(reason);
    }
});


// 基于其他期约的期约
function getJSON() {
    return fetch(url).then(response => { response.json(); });
}

function getHighScose() {
    return getJSON("/api/user/highscore").then(profile => profile.highScore);
}


// 基于同步值的期约
let p4 = Promise.resolve(value);
let r4 = Promise.reject(reason);


// 从头开始期约 

function wait(duration) {
    // 创建斌返回期约 
    return new Promise(resolve => {
        if (duration <= 0) {
            reject(new Error("Time travel not yet implemented"));
        }


        // 否则， 一步等待， 然后解决期约
        // setTimeout(resolve, duration);
        setTimeout(resolve, duration);
    });
}

// 这里再使用个node的例子说明如何使用 

const http = require('http');
const https = require('https');
function getJSON(url) {
    return new Promise((resolve, reject) => {
        http.request(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume();
            }
            else if (response.headers['content-type'] !== 'application/json') {
                reject(new Error('Invalid content-type'));
                response.resume();
            } else { 
                let body = "";
                response.setEncoding('utf-8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    try {
                        let parsed = JSON.parse(body);
                        resolve(parsed);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            // 如果我们之前的请求失败， 如网络故障， 
            // 拒绝期约
            request.on('error', error => reject(error));
        });
    });
}

function getJSONByHttps(url) {
    return new Promise((resolve, reject) => {
        https.request(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume();
            }
            else if (response.headers['content-type'] !== 'application/json') {
                reject(new Error('Invalid content-type'));
                response.resume();
            } else { 
                let body = "";
                response.setEncoding('utf-8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    try {
                        let parsed = JSON.parse(body);
                        resolve(parsed);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            // 如果我们之前的请求失败， 如网络故障， 
            // 拒绝期约
            request.on('error', error => reject(error));
        });
    });
}


function getTextByHttps(url) {
    return new Promise((resolve, reject) => {
        https.request(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume();
            }
            else if (response.headers['content-type'] !== 'text/html') {
                reject(new Error('Invalid content-type'));
                response.resume();
            } else { 
                let body = "";
                response.setEncoding('utf-8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    try {
                        resolve(body);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            // 如果我们之前的请求失败， 如网络故障， 
            // 拒绝期约
            request.on('error', error => reject(error));

            // send the request
            request.end();
        });
    });
}


getTextByHttps('https://phemex.com/').then(data => { console.log(data); });


function getTextByHttps(url) {
    return new Promise((resolve, reject) => {
        const request = https.request(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume();
            } else if (response.headers['content-type'] !== 'text/html') {
                reject(new Error('Invalid content-type'));
                response.resume();
            } else {
                let body = "";
                response.setEncoding('utf-8');
                response.on('data', chunk => body += chunk);
                response.on('end', () => {
                    try {
                        resolve(body);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });

        request.on('error', error => reject(error));
        request.setTimeout(10000); // 10 seconds
        request.end(); // Send the request
    });
}
getTextByHttps('https://phemex.com/').then(data => { console.log(data); });


// 串行期约

function fetchSequentially(urls) {
    // 抓取URL时候，要把响应体存在里面
    let bodies = [];

    // 函数返回一个期约，抓取一个URL的响应体
    function fetchOne(url) {
        return fetch(url)
        .then(response => response.text())
        .then(body => bodies.push(body));
    }
    
    // 从一个兑现的期约开始
    let p = Promise.resolve(undefined);

    // 现在循环目标URLS， 为每一个URL创建一个期约
    for (let url of urls) {
        p = p.then(() => fetchOne(url));
    }


    // 期约的最后一个期约兑现以后，响应体数组(bodies)也已经ready
    return p.then(() => bodies);
}

// 调用举例
fetchSequentially(["url1", "url2", "url3"])
.then(bodies => {
    console.log(bodies);
})
.catch(e => {
    console.error(e);
});


// 在期约的回调中创建下一个期约
function promiseSequence(inputs, promiseMaker) {
    inputs = [...inputs];

    function handleNextInput(outputs) {
        if (inputs.length === 0) {
            // 如果没有输入了，返回输出值的数组
            return outputs;
        } else {
            let nextInput = inputs.shift();
            return promiseMaker(nextInput)
                .then(output => {
                    // bug => Array.concat() 返回的是一个新的数组 
                    outputs.concat(output);
                })
                .then(() => handleNextInput(outputs));
        }
    }
    return Promise.resolve([]).then(handleNextInput);
}


// 在期约的回调中创建下一个期约
function promiseSequence(inputs, promiseMaker) {
    inputs = [...inputs];

    function handleNextInput(outputs) {
        if (inputs.length === 0) {
            // 如果没有输入了，返回输出值的数组
            return outputs;
        } else {
            let nextInput = inputs.shift();
            return promiseMaker(nextInput)
                .then(output => {
                    // bug => Array.concat() 返回的是一个新的数组 
                    outputs.concat(output);
                })
                //  This implicitly passes the result of the previous promise as an argument to handleNextInput
                .then(handleNextInput);
        }
    }
    return Promise.resolve([]).then(handleNextInput);
}

// 在期约的回调中创建下一个期约
// 这个是处理了concat错误的版本 
function promiseSequence(inputs, promiseMaker) {
    inputs = [...inputs];

    function handleNextInput(outputs) {
        if (inputs.length === 0) {
            // 如果没有输入了，返回输出值的数组
            return outputs;
        } else {
            let nextInput = inputs.shift();
            return promiseMaker(nextInput)
                .then(output => {
                    // bug => Array.concat() 返回的是一个新的数组 
                    outputs = outputs.concat(output);
                    return handleNextInput(outputs);
                });
        }
    }
    return Promise.resolve([]).then(handleNextInput);
}



function fetchBody(url) {
    return fetch(url).then(response => response.text());
}

promiseSequence(["url1", "url2", "url3"], fetchBody)
.then(bodies => {
    console.log(bodies);
})
.catch(e => {
    console.error(e);
});


// async和await
// await表达式

let response = await fetch("/api/user/profile");
let profile = await response.json();



// async函数

async function fetchProfile() {
    let response = await fetch("/api/user/profile");
    return response.json();
}

async function fetchHighScore() {
    let profile = await fetchProfile();
    return profile.highScore;
}   


function displayHighScore(highScore) {
    console.log(`High score: ${highScore}`);
    
}

// 以下的代码只可以在另一个async函数中调用
//你可以在async函数中嵌套await表达式 
// 多深都没有关系 
//
displayHighScore(await fetchHighScore());

// 如果你在顶级上下文或者是在一个非async函数中使用await表达式， 会抛出一个语法错误
// 这个时候必须使用常规的方式来处理期约
getHighScose().then(displayHighScore).catch(console.error);



// 等待多个期约 
// 假设我们使用了async重写了getJSON()函数 
async function getJSON(url) {
    let response = await fetch(url);
    let body = await response.json();
    return body;
}


// 如下的多代码的问题在于，他们的值不必要顺序执行
let value1 =  await getJSON("/api/value/1");
let value2 =  await getJSON("/api/value/2");

// 它不必顺序执行
// 所以我们可以使用Promise.all来并行执行
let [value3, value4] = await Promise.all([getJSON("/api/value/1"), getJSON("/api/value/2")]);



// 实现细节
// 如何理解async函数
async function f(x) { /* 函数体 */}
// 等价于
function f(x) {
    return new Promise(function(resolve, reject) {
        try {
            resolve((function(x) {/* 函数体 */})(x));
        } catch(e) {
            reject(e);
        }
    });
}


// 使用上面的方式来理解await比较难 
// 但是可以想象成分分隔代码体的记号、他们把函数体分隔成相对独立的独立模块 
// 每个子函数都将被传递给位于它前面的已await标记的那个期约的then()方法


// 异步迭代

// for/await循环

// node 上的流实现了异步可迭代
const fs = require('fs');
const { url } = require("inspector");

async function parseFile(filename) {
    let stream = fs.createReadStream(filename, {encoding: 'utf-8'});
    for await(let chunk of stream) {
        console.log(chunk);
    }
}

const urls1 = [url1, url2, url3];
const promises = urls1.map(url => fetch(url));

for await(let response of promises) {
    //console.log(await response.json());
    handle(response)
}

// 等同于如下的实现 
for (const promise of promises) {
    // const response = await promise;
    // console.log(await response.json());
    const response = await promise;
    handle(response);
}


// 异步迭代器

// 异步迭代器是一个对象， 它实现了一个[Symbol.asyncIterator]方法， 返回一个异步迭代器对象



// 异步生成器的例子 
function elapsedTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// 一个异步迭代器函数，按照固定的时间间隔递增并生成指定(或无穷)个数的计数器
async function* clock(interval, max = Infinity) {
    for (let i = 1; i <= max; i++) {
        await elapsedTime(interval);
        yield i;
    }
}

// z这是一个测试函数，使用异步迭代器和for/await

async function test() {
    for await(let tick of clock(1000, 5)) {
        console.log(tick);
    }
}



// 实现异步迭代器
// 这是一个比较精准的设置到期时间的方法 
function clock(interval, max = Infinity) {

    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }


    let startTime = Date.now();
    let count = 0;

    return {
        async next() {
            if (count >= max) {
                return {done: true};
            }

            await until(startTime + ++count * interval);
            return {value: count, done: false};
        },
        [Symbol.asyncIterator]() {
            return this;
        }
    }
}


// 实现了一个用来等待和入栈队列的方法
class AsyncQueue {
    constructor() {
        this.value = [];
        this.resolvers = [];
        this.closed = false;
    }

    enqueue(value) {
        if (this.closed) {
            throw new Error('AsyncQueue is closed');
        }
        if (this.resolvers.length > 0) {
            let resolver = this.resolvers.shift();
            resolver(value);
        } else { 
            this.value.push(value);
        }
    }
    dequeue() {
        if (this.value.length > 0) {
            // 如果欧一个排队的值，为它返回一个解决期约
            return Promise.resolve(this.value.shift());
        } else if (this.closed) {
            // 如果没有排队的值，request队列已关闭
            // 返回个解决未EOS（end-of-stream）的期约
            return Promise.resolve(undefined);
        } else { 
            // 返回一个未解决的期约
            // 将解决方法排队，以便后面使用
            return new Promise(resolve => this.resolvers.push(resolve));
        }
    }

    close() {
        while (this.resolvers.length > 0) {
            this.resolvers.shift()(AsyncQueue.EOS);
        }
        this.closed = true;
    }


    [Symbol.asyncIterator]() {
        return this;
    }


    next() {
        return this.dequeue().then(value => {
            if (value === AsyncQueue.EOS) {
                return {done: true};
            } else { 
                return {value, done: false};
            }
        });
    }
}

AsyncQueue.EOS = Symbol('end-of-stream');





// 一个例子
function eventStream(elt, type) {
    let queue = new AsyncQueue();
    elt.addEventListener(type, queue.enqueue.bind(queue));
    return queue;
}


async function handleKeys() {
    let keypresses = eventStream(document, 'keypress');
    for await(let event of keypresses) {
        console.log(event.key);
    }
}


// 小结
// 1. 实际上大部分javascript编程都是异步编程
/// 过去，异步操作都是以实践或者是回调函数的方式处理
// 期约提供了一种结构话回调函数的心方式
// async的await关键字可以让我们用同步代码的形式写出基于期约的异步代码
// 异步迭代对象可以在 for/await 循环中使用 

