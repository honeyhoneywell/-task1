function create() {
    var oTable = document.getElementById('table');
    var str = '';
    for(var i = 0; i<100; i++){
        str += '<li></li>';
    }
    oTable.innerHTML += str;
}
create();

var ball = document.getElementById('ball');
var data = {
    deg: 0
};

function control() {
    var command = this.value;
    switch (command){
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
function turn() {
    ball.classList.add('actived');
    ball.style.transform = 'rotate(' + data.deg + 'deg)';
}

function dirJudge(deg) {
    var dir = deg % 360;
    switch (true){
        case dir === 0:
            return 0;
            break;
        case dir === 90 || dir === -270:
            return 1;
            break;
        case Math.abs(dir) === 180:
            return 2;
            break;
        case dir === -90 || dir === 270:
            return 3;
            break;
    }
}

function go(deg) {
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
}
