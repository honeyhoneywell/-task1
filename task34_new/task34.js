function create() {
    var oTable = document.getElementById('table');
    var str = '';
    for(var i = 0; i<100; i++){
        str += '<li></li>';
    }
    oTable.innerHTML += str;
}
create();   //创建格子

var ball = document.getElementById('ball');
var data = {
    deg: 0,     //记录角度
    flag: true  //开关防止动画连续多次触发
};

function control() {
    var command = this.value;
    switch (command){
        case 'GO':
            go(data.deg);
            break;
        case 'TUN LEF':
            data.deg -= 90;
            turn();
            break;
        case 'TUN RIG':
            data.deg += 90;
            turn();
            break;
        case 'TUN BAC':
            data.deg += 180;
            turn();
            break;

        case 'TRA LEF':
            go(180);
            break;
        case 'TRA TOP':
            go(270);
            break;
        case 'TRA RIG':
            go(0);
            break;
        case 'TRA BOT':
            go(90);
            break;

        case 'MOV LEF':
            if(dirJudge(data.deg) ===0){
                data.deg +=180;
            }else  if(dirJudge(data.deg) ===1){
                data.deg +=90;
            }else if(dirJudge(data.deg) ===3){
                data.deg -=90;
            }
            go(data.deg);
            turn();
            break;
        case 'MOV TOP':
            if(dirJudge(data.deg) ===0){
                data.deg -=90;
            }else  if(dirJudge(data.deg) ===1){
                data.deg +=180;
            }else if(dirJudge(data.deg) ===2){
                data.deg +=90;
            }
            go(data.deg);
            turn();
            break;
        case 'MOV RIG':
            if(dirJudge(data.deg) ===1){
                data.deg -=90;
            }else  if(dirJudge(data.deg) ===2){
                data.deg +=180;
            }else if(dirJudge(data.deg) ===3){
                data.deg +=90;
            }
            go(data.deg);
            turn();
            break;
        case 'MOV BOT':
            if(dirJudge(data.deg) ===0){
                data.deg +=90;
            }else  if(dirJudge(data.deg) ===2){
                data.deg -=90;
            }else if(dirJudge(data.deg) ===3){
                data.deg +=180;
            }
            go(data.deg);
            turn();
            break;
    }
}

//转向
function turn() {
    ball.style.transform = 'rotate(' + data.deg + 'deg)';
}
//方向判定
function dirJudge(deg) {
    var dir = deg % 360;
    switch (true){
        case dir === 0:
            return 0;
        case dir === 90 || dir === -270:
            return 1;
        case Math.abs(dir) === 180:
            return 2;
        case dir === -90 || dir === 270:
            return 3;
    }
}
//前进
function go(deg) {
    if(!data.flag){
        return;
    }
    data.flag = false;      //开关防止动画连续多次触发
    var disX = ball.offsetLeft;
    var disY = ball.offsetTop;
    if(dirJudge(deg) === 0){
        ball.style.left = disX + 30 +'px';
    }else if(dirJudge(deg) === 1){
        ball.style.top = disY + 30 +'px';
    }else if(dirJudge(deg) === 2){
        ball.style.left = disX - 30 +'px';
    }else if(dirJudge(deg) === 3){
        ball.style.top = disY - 30 +'px';
    }
    ball.addEventListener('transitionend',function () {
        data.flag = true;
    })
}
//边界判定
function confineJudge(deg) {
    var disX = ball.offsetLeft;
    var disY = ball.offsetTop;
    switch (true){
        case dirJudge(deg) === 0 || disX>=270:
        case dirJudge(deg) === 1 || disY>=270:
        case dirJudge(deg) === 2 || disX<=30:
        case dirJudge(deg) === 3 || disY<=30:
            alert('到头了');
            return;
    }
}

