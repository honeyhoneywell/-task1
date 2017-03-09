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
    deg:0,
    flag:true
};

//运转
function control() {
    var box = document.getElementById('box');
    var command = document.getElementsByTagName('input')[0].value.trim();
    switch (command){
        case "TUN LEF":
            data.dir--;
            if(data.dir<0){data.dir += 4}
            turn(box,-10,90);
            break;
        case "TUN RIG":
            data.dir++;
            if(data.dir>3){data.dir = data.dir-4}
            turn(box,10,90);
            break;
        case "TUN BAC":
            data.dir += 2;
            if(data.dir>3){data.dir = data.dir-4}
            turn(box,10,180);
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
            var n = Math.abs(data.dir-2);
            data.dir=2;
            turn(box,10,90*n,function () {
                doGo(data.dir);
            });
            break;
        case "MOV RIG":
            var n = Math.abs(data.dir-0);
            data.dir=0;
            turn(box,10,90*n,function () {
                doGo(data.dir);
            });
            break;
        case "MOV TOP":
            var n = Math.abs(data.dir-3);
            data.dir=3;
            turn(box,10,90*n,function () {
                doGo(data.dir);
            });
            break;
        case "MOV BOT":
            var n = Math.abs(data.dir-1);
            data.dir=1;
            turn(box,10,90*n,function () {
                doGo(data.dir);
            });
            break;
    }
}

//边界判定前进
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
    if(!data.flag){return;}
    data.flag = false;
    if(dir===2||dir===3){dir=-1}else{dir=1}
    var target = 0;
    var dis = parseFloat(getStyle(obj,attr));
    var timer = setInterval(function () {
        target += 2;
        obj.style[attr] = (dis + target*dir) + 'px';
        if(target===30){
            clearInterval(timer);
            data.flag = true;
        }
    },20)
}
//旋转动画
function turn(obj,speed,target,endFn){
    if(target===0){
        endFn&&endFn();
        return;
    }
    if(!data.flag){return;}
    data.flag = false;
    var dir = 0;
    var timer = setInterval(function () {
        dir += speed;
        data.deg = (data.deg + speed)%360;
        obj.style.transform = "rotate("+ data.deg +"deg)";
        if(Math.abs(dir)===target){
            clearInterval(timer);
            data.flag = true;
            endFn&&endFn();
        }
    },20)
}

//获取属性值
function getStyle(obj,attr) {
    return obj.currentStyle? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr];
}