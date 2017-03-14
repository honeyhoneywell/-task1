var data = [
    {
        "name":"零零一",
        "语文":56,
        "数学":89,
        "英语":32,
        "总分":-1
    },
    {
        "name":"零零二",
        "语文":88,
        "数学":65,
        "英语":74,
        "总分":-1
    },
    {
        "name":"零零三",
        "语文":90,
        "数学":93,
        "英语":99,
        "总分":-1
    },
    {
        "name":"零零四",
        "语文":64,
        "数学":65,
        "英语":61,
        "总分":-1
    },
    {
        "name":"零零五",
        "语文":54,
        "数学":59,
        "英语":32,
        "总分":-1
    },
    {
        "name":"零零六",
        "语文":76,
        "数学":72,
        "英语":74,
        "总分":-1
    },
    {
        "name":"零零七",
        "语文":46,
        "数学":98,
        "英语":21,
        "总分":-1
    }
];
//得到学生总分
summation();
function summation() {
    for(var n in data){
        var total = 0;
        for(var m in data[n]){
            if(Number(data[n][m])>=0){
                total += Number(data[n][m]);
            }
            if(m==="总分"){
                data[n][m] = total;
            }
        }
    }
}
//添加到表格
add();
function add() {
    var oTbody = document.getElementsByTagName('tbody')[0];
    for(var i in data){
        var oTr = document.createElement('tr');
        for(var j in data[i]){
            var oTd = document.createElement('td');
            oTd.innerHTML = data[i][j];
            oTr.appendChild(oTd);
        }
        oTbody.appendChild(oTr);
    }
}

var table = document.getElementsByTagName('table')[0];
for(var i = 1, len = table.tHead.rows[0].cells.length; i<len; i++){
    table.tHead.rows[0].cells[i].onclick = function (e) {
        var ev = e || event;
        var attr = ev.currentTarget.children[0].innerHTML;
        if(ev.target.className === 'up'){
            data.sort(function (a,b) {
                return a[attr]  - b[attr];
            });
            table.tBodies[0].innerHTML = '';
            add();
        }else if(ev.target.className === 'down'){
            data.sort(function (a,b) {
                return b[attr]  - a[attr];
            });
            table.tBodies[0].innerHTML = '';
            add();
        }
    }
}
