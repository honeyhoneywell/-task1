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

var data = {
    dir:0,
    border:"4px solid #4752ff",
    deg:0
};

//运转
function control() {
    var box = document.getElementById('box');
    var command = document.getElementsByTagName('input')[0].value.trim();
    switch (command){
        case "TUN LEF":
            data.dir--;
            if(data.dir<0){data.dir += 4}
            turn(-10,9);
            break;
        case "TUN RIG":
            data.dir++;
            if(data.dir>3){data.dir = data.dir-4}
            box.style.transform = "rotate(90deg)";
            turn(10,9);
            break;
        case "TUN BAC":
            data.dir += 2;
            turn(10,18);
            break;
        case "GO":
            doGo(data.dir);
            break;
        case "TRA LEF":
            doGo(2);
            break;
        case "TRA TOP":
            doGo(3);
            break;
        case "TRA RIG":
            doGo(0);
            break;
        case "TRA BOT":
            doGo(1);
            break;
        case "MOV LEF":
            data.dir=2;
            break;
        case "MOV RIG":
            data.dir=0;
            break;
        case "MOV TOP":
            data.dir=3;
            break;
        case "MOV BOT":
            data.dir=1;
            break;
    }
}

//前进
function doGo(dir){
    var box = document.getElementById('box');
    var disX = parseFloat(getStyle(box,'left'));
    var disY = parseFloat(getStyle(box,'top'));
    switch(true){
        case (dir===2 && disX<=30):
        /*合并下方*/
        case (dir===1 && disY>=300):
        /*合并下方*/
        case (dir===0 && disX>=300):
        /*合并下方*/
        case (dir===3 && disY<=30):
            alert('到头了');
            break;
        case (dir===0 || dir===2):
            goTo(box,'left',dir);
            break;
        case (dir===1 || dir===3):
            goTo(box,'top',dir);
            break;
    }
}
//前进动画
function goTo(obj,attr,dir){
    if(dir===2||dir===3){dir=-1}else{dir=1}
    var target = 0;
    var dis = parseFloat(getStyle(obj,attr));
    var timer = setInterval(function () {
        target += 2;
        if(target===30){
            clearInterval(timer);
        }
        obj.style[attr] = (dis + target*dir) + 'px';
    },20)
}
//旋转动画
function turn(speed,target,endFn){
    var box = document.getElementById('box');
    var dir = 0;
    var timer = setInterval(function () {
        dir += speed;
        data.deg += speed;
        box.style.transform = "rotate("+ data.deg +"deg)";
        if(Math.abs(dir/speed)===target){
            clearInterval(timer);
            endFn&&endFn();
        }
    },20)
}

//获取属性值
function getStyle(obj,attr) {
    return obj.currentStyle? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr];
}