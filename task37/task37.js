var btn = document.getElementById('btn');
var mask = document.getElementById('mask');
var popup = document.getElementById('popup');
var data = {
    "innerTop":0,
    "innerBottom":0,
    "innerLeft":0,
    "innerRight":0,
    "mouseX":0,
    "mouseY":0,
    "left":0,
    "right":0
};

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
//位置固定
abatvent();     //初始化
function abatvent() {
    mask.style.width = '100%';
    mask.style.height = '100%';
    popup.style.left = document.body.scrollLeft + document.documentElement.clientWidth/2-150 + 'px';
    popup.style.top = document.body.scrollTop + document.documentElement.clientHeight/2-100 + 'px';
}

//位置拖动
popup.addEventListener('mousedown',dragMove);
function dragMove(e) {
    var ev = e || event;
    //阻止默认
    ev.preventDefault();
    //点击时,弹窗距离屏幕左和上的距离
    data.top = popup.offsetTop;
    data.left = popup.offsetLeft;
    //点击时,鼠标的位置
    data.mouseX = ev.pageX;
    data.mouseY = ev.pageY;
    //点击时,鼠标在弹窗的内边距
    data.innerTop = ev.pageY - popup.offsetTop;
    data.innerLeft = ev.pageX - popup.offsetLeft;
    data.innerRight = popup.offsetWidth -(ev.pageX - popup.offsetLeft);
    data.innerBottom = popup.offsetHeight - (ev.pageY - popup.offsetTop);

    if (data.innerRight < 20 && data.innerRight > 0 && data.innerTop > 20) {
        document.addEventListener('mousemove',level);
    }
    if (data.innerBottom < 20 && data.innerBottom > 0) {
        document.addEventListener('mousemove',vertical);
    }
    if(data.innerTop<=20){
        document.addEventListener('mousemove',posMove);
    }
    //解绑
    document.onmouseup = unbundle;
}

//移动函数
function posMove(e) {
    var ev = e || event;
    popup.style.cursor = 'move';
    popup.style.left = data.left + ev.pageX - data.mouseX + 'px';
    popup.style.top = data.top + ev.pageY - data.mouseY + 'px';
}
//水平缩放
function level (e) {
    var ev = e || event;
    var width = ev.pageX - popup.offsetLeft + data.innerRight;
    if(width <= 300){
        popup.style.width = '300px';    //最小宽度
    }else{
        popup.style.width = width + 'px';
    }
    popup.style.cursor = 'e-resize';
}
//垂直缩放
function vertical(e) {
    var ev = e || event;
    var height = ev.pageY - popup.offsetTop + data.innerBottom;
    if(height <= 200){
        popup.style.height = '200px';    //最小高度
    }else {
        popup.style.height = height + 'px';
    }
    popup.style.cursor = 's-resize';
}
//解绑函数
function unbundle() {
    document.removeEventListener('mousemove',level);
    document.removeEventListener('mousemove',vertical);
    document.removeEventListener('mousemove',posMove);
    document.onmouseup = null;
    popup.style.cursor = 'default';
}