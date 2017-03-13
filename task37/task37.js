var btn = document.getElementById('btn');
var mask = document.getElementById('mask');
var popup = document.getElementById('popup');

btn.onclick = function () {
    mask.style.display = 'block';
    popup.style.display = 'block';
};
mask.onclick = function () {
    mask.style.display = 'none';
    popup.style.display = 'none';
};


window.onscroll = abatvent;
window.onresize = abatvent;
popup.onmousedown = drag;
//位置固定
abatvent();     //初始化
function abatvent() {
    mask.style.width = '100%';
    mask.style.height = '100%';
    popup.style.left = document.body.scrollLeft + document.documentElement.clientWidth/2-150 + 'px';
    popup.style.top = document.body.scrollTop + document.documentElement.clientHeight/2-100 + 'px';
}



//拖拽
function drag(e) {
    var ev = e || event;
    //边距
    var disX = popup.offsetWidth -(ev.pageX - this.offsetLeft);
    var disY = popup.offsetHeight - (ev.pageY - this.offsetTop);
    ev.preventDefault();    //阻止默认
    if (disX < 20 && disX > 0) {
        document.addEventListener('mousemove',level)
    }
    if (disY < 20 && disY > 0) {
        document.addEventListener('mousemove',vertical);
    }
    //水平缩放
    function level (e) {
        var ev = e || event;
        popup.style.width = ev.clientX - popup.offsetLeft + disX + 'px';
        popup.style.cursor = 'e-resize';
    }
    //垂直缩放
    function vertical(e) {
        var ev = e || event;
        popup.style.height = ev.clientY - popup.offsetTop + disY + 'px';
        popup.style.cursor = 's-resize';
    }
    document.onmouseup = unbundle;
    //解绑拖拽
    function unbundle() {
        document.removeEventListener('mousemove',level);
        document.removeEventListener('mousemove',vertical);
        popup.style.cursor = 'default';
    }
}
