// 这是一个动态加载动态script的方法

function importScript(url) {
    return new Promise((resolve, reject) => {
        let s = document.createElement("script");
        s.onload = () => { resolve(); }
        s.onerror = (e) => { reject(e); }
        s.src = url;
        document.head.append(s);
    });
}definitive-guide/ch15-browserjs/html.html