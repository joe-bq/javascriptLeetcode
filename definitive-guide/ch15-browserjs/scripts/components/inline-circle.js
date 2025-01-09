// 定义一个inline-circle组件


customElements.define('inline-circle', class InlineCircle extends HTMLElement {
    // 浏览器会在一个<inline-circle>元素被创建时调用这个构造函数
    connectedCallback() {
        this.style.display = 'inline-block';
        this.style.borderRadius = '50%';
        this.style.border = '1px solid black';
        this.style.transform = 'translateY(10%)';


        // 如果还没有定义大小，定义一个新的大小
        if (!this.style.width) {
            this.style.width = '0.8em';
            this.style.height = '0.8em';
        }
    }

    // 通过一个方法告诉我们在哪个属性变化时候收到通知 (这里使用了)获取 方法
    static get observedAttributes() {
        return ['diameter', 'color'];
    }


    // 回调
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'diameter':
                // 如果是大小发生了变化
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case 'color':
                // 如果是颜色发生了变化
                this.style.backgroundColor = newValue;
                break;
        }
    }
    // 定义一些元素的javascript属性
    get diameter() {
        return this.getAttribute('diameter');
    }
    set diameter(value) {
        this.setAttribute('diameter', value);
    }

    get color() {
        return this.getAttribute('color');
    }
    set color(value) {
        this.setAttribute('color', value);
    }
});