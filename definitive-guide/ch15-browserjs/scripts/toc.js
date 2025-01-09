// 这个用来展示对一页面构建TOC


/**
 * 通过计算toc- 生成TOC的函数
 * 与例子中的不同， 这里不假设文章只有一个H1的章节
 * 所有的都可以通过h1-h6来表示
 */
function toc() {
    let toc = document.querySelector("#TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    // 查找所有的标题元素
    let headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

    //  分别用来记录各级标题的数量
    let sectionNumbers = [0, 0, 0, 0, 0, 0];  

    for (let heading of headings) {
        // 如果标题在TOC容器中，则跳过
        if (heading.parentNode == toc) {
            continue;
        }

        // 
        let level = parseInt(heading.tagName.charAt(1))-1;

        // 重置这个标题的标题号
        sectionNumbers[level]++;
        for (let i = level+1; i < sectionNumbers.length; i++) {
            sectionNumbers[i] = 0;
        }

        // 组合所有的标题级别的节号
        //
        let sectionNumber = sectionNumbers.slice(0, level+1).join(".");

        // 把节号添加到节标题中
        let span = document.createElement("span");
        span.className = "TOCSectNum";
        span.textContent = sectionNumber;
        heading.prepend(span);


        // 创建一个锚点
        let anchor = document.createElement("a");
        let fragmentName = `TOC${sectionNumber}`;
        anchor.name = fragmentName;
        heading.before(anchor); // 在标题前插入到锚点
        anchor.append(heading); // 把标题移动到锚元素内


        // 创建对这个节点的链接
        let link = document.createElement("a");
        link.href = `#${fragmentName}`; // #链接的名字

        // 把文本复制到链接中
        link.innerHTML = heading.innerHTML;


        // 吧链接放到一个div中，以便根据级别添加样式
        let entry = document.createElement("div");
        entry.classList.add("TOCEntry", `TOCLevel${level}`);
        entry.append(link);

        // 把div添加到TOC容器中
        toc.append(entry);
    }


}