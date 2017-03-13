
var data = {
    dir:0,
    border:"4px solid #4752ff"
};

function create() {
    var table = document.getElementById('table');
    var str = '';
    for (var i=0; i<100; i++){
        var oLi = '<li></li>';
        str += oLi;
    }
    table.innerHTML += str;
}
create();   //创建格子

//方向渲染
function render(dir){
    var box = document.getElementById('box');
    switch(dir){
        case 0:
            box.style.border = "none";
            box.style.borderRight = data.border;
            break;
        case 1:
            box.style.border = "none";
            box.style.borderBottom = data.border;
            break;
        case 2:
            box.style.border = "none";
            box.style.borderLeft = data.border;
            break;
        case 3:
            box.style.border = "none";
            box.style.borderTop = data.border;
    }
}
//运转以及转向判断
function control() {
    var command = this.value;
    switch (command){
        case "TUN LEF":
            data.dir--;
            if(data.dir<0){data.dir += 4};
            render(data.dir);
            break;
        case "TUN RIG":
            data.dir++;
            if(data.dir>3){data.dir = data.dir-4}
            render(data.dir);
            break;
        case "TUN BAC":
            data.dir += 2;
            if(data.dir>3){data.dir = data.dir-4}
            render(data.dir);
            break;
        case "GO":
            doGo(data.dir);
    }
}
//前进
function doGo(dir){
    var box = document.getElementById('box');
    var disX = getStyle(box,'left');
    var disY = getStyle(box,'top');
    switch(true){
        case (dir===0 && disX<300):
            disX += 30;
            box.style.left = disX +'px';
            break;
        case (dir===1 && disY<300):
            disY += 30;
            box.style.top = disY +'px';
            break;
        case (dir===2 && disX>30):
            disX -= 30;
            box.style.left = disX +'px';
            break;
        case (dir===3 && disY>30):
            disY -= 30;
            box.style.top = disY +'px';
            break;
        case (dir===2 && disX<=30):
        /*合并下方*/
        case (dir===1 && disY>=300):
        /*合并下方*/
        case (dir===0 && disX>=300):
        /*合并下方*/
        case (dir===3 && disY<=30):
            alert('到头了');
    }
}

//获取属性值
function getStyle(obj,attr) {
    return obj.currentStyle? parseFloat(obj.currentStyle[attr]) : parseFloat(window.getComputedStyle(obj)[attr]);
}

render(data.dir);   //方向初始渲染