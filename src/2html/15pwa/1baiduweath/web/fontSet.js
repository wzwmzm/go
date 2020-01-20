(function() {
    // 页面宽度
    let htmlWidth = document.documentElement.clientWidth;
    // dom节点
    let htmlDom = document.getElementsByTagName('html')[0];

    // 设置html的fontsize
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
})()