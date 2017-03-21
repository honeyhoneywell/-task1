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
    deg:0       //记录旋转的角度(-360~360);
};

//旋转
function turn(obj,deg,endfn) {
    obj.style.transform = 'rotate('+ deg +'deg)';
    endfn&&endfn();
}
//运转
function control() {
    var box = document.getElementById('box');
    var command = this.value.trim();
    var btnBox = document.getElementById('btnBox');
    var n;  //记录当前方向和上次方向的差值
    switch (command){
        /*只转向,不前进*/
        case "TUN LEF":
            data.deg -= 90;
            if(data.deg < -270){
                data.deg += 360;
            }
            turn(box,data.deg);
            break;
        case "TUN RIG":
            data.deg += 90;
            if(data.deg > 270){
                data.deg -= 360;
            }
            turn(box,data.deg);
            break;
        case "TUN BAC":
            data.deg -= 180;
            if(data.deg < -270){
                data.deg += 360;
            }
            turn(box,data.deg);
            break;
        case "GO":
            doGo(box,data.deg);
            break;
        /*不方块按当前的朝向前进*/
        case "TRA LEF":
            doGo(box,180);
            break;
        case "TRA TOP":
            doGo(box,270);
            break;
        case "TRA RIG":
            doGo(box,0);
            break;
        case "TRA BOT":
            doGo(box,90);
            break;
        /*转向之后接着前进*/
        case "MOV LEF":
            turn(box,180,function () {
                doGo(box,180);
            });
            break;
        case "MOV RIG":
            turn(box,0,function () {
                doGo(box,0);
            });
            break;
        case "MOV TOP":
            turn(box,270,function () {
                doGo(box,270);
            });
            break;
        case "MOV BOT":
            turn(box,90,function () {
                doGo(box,90);
            });
            break;
    }
}

//前进
function go(obj,deg,endfn) {
    var disX = obj.offsetLeft;
    var disY = obj.offsetTop;
    switch(true){
        case deg === 0:
            obj.style.left = disX + 30 + 'px';
            break;
        case deg === 90||deg === -270:
            obj.style.top = disY + 30 + 'px';
            break;
        case deg === -90||deg === 270:
            obj.style.top = disY - 30 + 'px';
            break;
        case deg === 180||deg ===-180:
            obj.style.left = disX - 30 + 'px';
            break;
    }
    endfn&&endfn();
}
//边界判定
function doGo(obj,deg) {
    var disX = obj.offsetLeft;
    var disY = obj.offsetTop;
    switch (true){
        case deg === 0 && disX >= 300:
        case (deg === 90||deg === -270)&&(disY >= 300):
        case (deg === -90||deg === 270)&&(disY <= 30):
        case (deg === 180||deg ===-180)&&(disX <= 30):
            alert("到头了!");
            break;
        default:
            go(obj,deg);
            break;
    }
}
