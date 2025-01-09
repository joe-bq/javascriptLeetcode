// 定义一个函数，显示当前的时间
function displayTime() {
    let clock = document.querySelector("#clock");
    let now = new Date();
    clock.textContent = now.toLocaleTimeString();
}


displayTime();
setInterval(displayTime, 1000);