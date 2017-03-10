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

//数据记录
var data = {
    dir:0,      //记录方向,left=0 ,bottom=1, right=2, top=3;
    deg:0,      //记录旋转的角度(-360~360);
    flag:true   //防止定时器反复多次触发的开关
};

//运转
function control() {
    var box = document.getElementById('box');
    var command = document.getElementsByTagName('input')[0].value.trim();
    var n;  //记录当前方向和上次方向的差值
    switch (command){
        /*只转向,不前进*/
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
        /*按当前方向前进*/
        case "GO":
            doGo(box,data.dir);
            break;
        /*不方块按当前的朝向前进*/
        case "TRA LEF":
            doGo(box,2);
            break;
        case "TRA TOP":
            doGo(box,3);
            break;
        case "TRA RIG":
            doGo(box,0);
            break;
        case "TRA BOT":
            doGo(box,1);
            break;
        /*转向之后接着前进*/
        case "MOV LEF":
            n = 2 - data.dir;   //两次朝向的差值
            data.dir=2;         //记录当前朝向
            turn(box,10,90*n,function () {
                doGo(box,data.dir);
            });
            break;
        case "MOV RIG":
            n = 0 - data.dir;
            data.dir=0;
            turn(box,10,90*n,function () {
                doGo(box,data.dir);
            });
            break;
        case "MOV TOP":
            n = 3 - data.dir;
            data.dir=3;
            turn(box,10,90*n,function () {
                doGo(box,data.dir);
            });
            break;
        case "MOV BOT":
            n = 1 - data.dir;
            data.dir=1;
            turn(box,10,90*n,function () {
                doGo(box,data.dir);
            });
            break;
    }
}

//边界判定&前进
function doGo(obj,dir){
    var disX = parseFloat(getStyle(obj,'left'));
    var disY = parseFloat(getStyle(obj,'top'));
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
            goTo(obj,'left',dir);
            break;
        case (dir===1 || dir===3):
            goTo(obj,'top',dir);
            break;
    }
}
//前进动画
function goTo(obj,attr,dir){
    if(!data.flag){return;}
    data.flag = false;      //关闭开关,防止反复
    if(dir===2||dir===3){dir=-1}else{dir=1}
    var target = 0;
    var dis = parseFloat(getStyle(obj,attr));
    var timer = setInterval(function () {
        target += 2;
        obj.style[attr] = (dis + target*dir) + 'px';
        if(target===30){
            clearInterval(timer);
            data.flag = true;   //运转结束,打开开关
        }
    },20)
}
//旋转动画
function turn(obj,speed,target,endFn){
    if(target===0){     //target为0,说明不用旋转,直接结束
        endFn&&endFn();
        return;
    }
    if(!data.flag){return;}     //关闭开关,防止反复
    data.flag = false;
    if(target<0){speed=-speed;target = Math.abs(target)}    //根据target的值来改变旋转方向
    if(target===270){speed=-speed;target=90}
    var dir = 0;    //记录旋转了多少度,来设置结束动画的点(90或180)
    var timer = setInterval(function () {
        dir += speed;
        data.deg = (data.deg + speed)%360;      //角度控制在(-360~360)方便计算
        obj.style.transform = "rotate("+ data.deg +"deg)";
        if(Math.abs(dir)===target){
            clearInterval(timer);
            data.flag = true;       //运转结束,打开开关
            endFn&&endFn();
        }
    },20)
}

//获取属性值
function getStyle(obj,attr) {
    return obj.currentStyle? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr];
}